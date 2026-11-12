import { spawn, ChildProcess } from 'child_process';
import { CONFIG } from '../config.ts';
import { api } from './apiClient.ts';

let serverProcess: ChildProcess | null = null;

export async function isServerHealthy(url = CONFIG.baseUrl): Promise<boolean> {
  try {
    const res = await fetch(`${url}/api/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      return data?.status === 'ok';
    }
    return false;
  } catch {
    return false;
  }
}

export async function ensureServerRunning(): Promise<string> {
  // 1. Check if default base URL (e.g. port 4000) is already running
  if (await isServerHealthy(CONFIG.baseUrl)) {
    console.log(`📡 Connected to existing CareerBridge backend at: ${CONFIG.baseUrl}`);
    return CONFIG.baseUrl;
  }

  // 2. Check if ephemeral test port is running
  const ephemeralUrl = `http://localhost:${CONFIG.ephemeralPort}`;
  if (await isServerHealthy(ephemeralUrl)) {
    console.log(`📡 Connected to running test server at: ${ephemeralUrl}`);
    CONFIG.baseUrl = ephemeralUrl;
    api.setBaseUrl(ephemeralUrl);
    return ephemeralUrl;
  }

  // 3. Spawn ephemeral server process
  console.log(`🚀 Spawning ephemeral test server on port ${CONFIG.ephemeralPort}...`);
  serverProcess = spawn('npx', ['tsx', 'src/index.ts'], {
    cwd: CONFIG.serverPath,
    env: { ...process.env, PORT: String(CONFIG.ephemeralPort) },
    stdio: 'pipe',
    shell: true
  });

  serverProcess.stdout?.on('data', (d) => {
    const msg = d.toString();
    if (process.env.DEBUG_SERVER) console.log(`[SERVER]: ${msg.trim()}`);
  });

  serverProcess.stderr?.on('data', (d) => {
    const msg = d.toString();
    if (process.env.DEBUG_SERVER) console.error(`[SERVER ERR]: ${msg.trim()}`);
  });

  // Poll until healthy or timeout
  const start = Date.now();
  const maxWaitMs = 15000;
  while (Date.now() - start < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 600));
    if (await isServerHealthy(ephemeralUrl)) {
      console.log(`✅ Ephemeral test server ready at ${ephemeralUrl} in ${Date.now() - start}ms`);
      CONFIG.baseUrl = ephemeralUrl;
      api.setBaseUrl(ephemeralUrl);
      return ephemeralUrl;
    }
  }

  throw new Error(`Failed to start ephemeral test server within ${maxWaitMs}ms`);
}

export function stopServer(): void {
  if (serverProcess) {
    console.log('🛑 Stopping ephemeral test server...');
    try {
      serverProcess.kill('SIGTERM');
    } catch {
      // Ignore
    }
    serverProcess = null;
  }
}
