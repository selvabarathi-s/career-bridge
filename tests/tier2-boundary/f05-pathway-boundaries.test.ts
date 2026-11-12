import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F05-B: Pathway Boundaries & Edge Values

collector.test('F05-T2-1: GET /api/careers/:id returns 404 for non-existent career ID', async () => {
  const res = await api.get('/api/careers/career-non-existent-999');
  assertStatusCode(res.status, 404);
  assertTrue(Boolean(res.data.error));
});

collector.test('F05-T2-2: Simulator with invalid sourceCareerId returns 400', async () => {
  const res = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: 'invalid-source-id',
    targetCareerId: 'career-ai-engineer'
  });
  assertStatusCode(res.status, 400);
});

collector.test('F05-T2-3: Simulator with invalid targetCareerId returns 400', async () => {
  const res = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: 'career-ai-engineer',
    targetCareerId: 'invalid-target-id'
  });
  assertStatusCode(res.status, 400);
});

collector.test('F05-T2-4: Filter careers by non-existent discipline returns empty list without error', async () => {
  const res = await api.get('/api/careers?discipline=quantum_biophysics_novel');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.careers));
  assertEqual(res.data.careers.length, 0);
});

collector.test('F05-T2-5: Simulator comparing career to itself returns high synergy overlap', async () => {
  const res = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: 'career-ai-engineer',
    targetCareerId: 'career-ai-engineer'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.result.skillOverlapPercentage >= 80, 'Self-comparison should yield >= 80% overlap');
});
