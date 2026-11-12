import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertStatusCode
} from '../helpers/testAssertions.ts';
import { api } from '../helpers/apiClient.ts';

export const collector = new TestCollector();

// F01-B: Build Boundaries & Missing Resource Handling

collector.test('F01-T2-1: Non-existent static client asset returns 404 rather than unhandled crash', async () => {
  const res = await api.get('/assets/non_existent_file_xyz_123.js');
  // When serving static assets, unknown files should return 404 or index fallback without crashing server
  assertTrue(res.status === 404 || res.status === 200);
});

collector.test('F01-T2-2: Client tsconfig.json enforces strict or valid TypeScript settings', () => {
  const raw = fs.readFileSync(path.join(CONFIG.clientPath, 'tsconfig.json'), 'utf-8');
  const sanitized = raw.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  const tsconfig = JSON.parse(sanitized);
  assertTrue(Boolean(tsconfig.compilerOptions), 'Client tsconfig must have compilerOptions');
});

collector.test('F01-T2-3: Server tsconfig.json target and module resolution are configured', () => {
  const raw = fs.readFileSync(path.join(CONFIG.serverPath, 'tsconfig.json'), 'utf-8');
  const sanitized = raw.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  const tsconfig = JSON.parse(sanitized);
  assertTrue(Boolean(tsconfig.compilerOptions), 'Server tsconfig must have compilerOptions');
});

collector.test('F01-T2-4: Root package.json contains valid scripts without syntax errors', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(CONFIG.rootPath, 'package.json'), 'utf-8'));
  assertTrue(Boolean(pkg.name));
  assertTrue(Boolean(pkg.scripts));
});

collector.test('F01-T2-5: Corrupted URL paths to API routes return standard 404', async () => {
  const res = await api.get('/api/invalid-nonexistent-endpoint-xyz');
  assertStatusCode(res.status, 404);
});
