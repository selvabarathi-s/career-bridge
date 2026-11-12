import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F20-B: Adversarial Stress Testing & Boundary Injection Resistance

collector.test('F20-T2-1: SQL injection string in query param does not execute or crash server', async () => {
  const res = await api.get("/api/careers?discipline=' OR '1'='1");
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.careers));
});

collector.test('F20-T2-2: Null byte characters in string fields are safely sanitized or rejected', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: 'Hello\0world with null bytes'
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.message));
});

collector.test('F20-T2-3: Negative minCgpa in drive creation is handled without corruption', async () => {
  const res = await api.post('/api/placements/drives', {
    companyName: 'Adversarial Cutoff Corp',
    roleTitle: 'Developer',
    ctcPackage: '8 LPA',
    minCgpa: -5.0
  });
  assertStatusCode(res.status, [200, 201, 400]);
});

collector.test('F20-T2-4: Extremely large numeric inputs do not cause overflow crashes', async () => {
  const res = await api.post('/api/placements/drives', {
    companyName: 'Huge Package Corp',
    roleTitle: 'Developer',
    ctcPackage: '999999999 LPA',
    hiringCount: 999999999999
  });
  assertStatusCode(res.status, [200, 201, 400]);
});

collector.test('F20-T2-5: Rapid repeated requests to health check endpoint remain stable', async () => {
  const pings = Array.from({ length: 10 }, () => api.get('/api/health'));
  const responses = await Promise.all(pings);
  for (const r of responses) {
    assertStatusCode(r.status, 200);
  }
});
