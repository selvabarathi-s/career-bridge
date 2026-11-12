import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F18: Dual-Track E2E Test Suite
// Master test infrastructure, test runner architecture, and execution specifications.

collector.test('F18-T1-1: TEST_INFRA.md exists at project root and specifies 4 tiers', () => {
  const infraPath = path.join(CONFIG.rootPath, 'TEST_INFRA.md');
  assertTrue(fs.existsSync(infraPath), 'TEST_INFRA.md must exist at project root');
  const content = fs.readFileSync(infraPath, 'utf-8');
  assertTrue(content.includes('Tier 1'), 'Must specify Tier 1');
  assertTrue(content.includes('Tier 2'), 'Must specify Tier 2');
  assertTrue(content.includes('Tier 3'), 'Must specify Tier 3');
  assertTrue(content.includes('Tier 4'), 'Must specify Tier 4');
});

collector.test('F18-T1-2: TEST_INFRA.md covers all 20 inventoried features from PROJECT.md', () => {
  const content = fs.readFileSync(path.join(CONFIG.rootPath, 'TEST_INFRA.md'), 'utf-8');
  for (let i = 1; i <= 20; i++) {
    const id = `F${i.toString().padStart(2, '0')}`;
    assertTrue(content.includes(id), `TEST_INFRA.md must cover feature ${id}`);
  }
});

collector.test('F18-T1-3: Test suite helpers are properly initialized and typed', () => {
  assertTrue(Boolean(CONFIG.baseUrl), 'CONFIG.baseUrl must be defined');
  assertTrue(Boolean(api), 'api client must be instantiated');
});

collector.test('F18-T1-4: Health check probe responds with 200 OK', async () => {
  const res = await api.get('/api/health');
  assertStatusCode(res.status, 200);
  assertEqual(res.data.status, 'ok');
});

collector.test('F18-T1-5: Test credentials guide endpoint is available for reference', async () => {
  const res = await api.get('/api/auth/credentials-guide');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.credentials));
});
