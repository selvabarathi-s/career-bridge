import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode,
  assertNumberInRange
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F05: Vector Pathway Matching (AI.SIMILARITY)
// Multi-attribute vector similarity matching student profile to target careers.

collector.test('F05-T1-1: GET /api/careers returns complete catalog of multi-disciplinary careers', async () => {
  const res = await api.get('/api/careers');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.careers), 'Careers must be returned as an array');
  assertTrue(res.data.careers.length >= 4, 'Must have at least 4 seeded career pathways');
});

collector.test('F05-T1-2: POST /api/simulator/simulate computes vector similarity & transferable skills', async () => {
  const careersRes = await api.get('/api/careers');
  const careers = careersRes.data.careers;
  assertTrue(careers.length >= 2, 'Requires at least 2 careers to simulate');

  const sourceId = careers[0].id;
  const targetId = careers[1].id;

  const res = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: sourceId,
    targetCareerId: targetId
  });

  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.result), 'Simulator must return result payload');
  const result = res.data.result;
  
  assertNumberInRange(result.skillOverlapPercentage, 0, 100, 'Overlap percentage must be bounded [0, 100]');
  assertNumberInRange(result.suitabilityScore, 0, 100, 'Suitability score must be bounded [0, 100]');
  assertNumberInRange(result.preferabilityScore, 0, 100, 'Preferability score must be bounded [0, 100]');
  assertTrue(Array.isArray(result.transferableSkills), 'Transferable skills must be an array');
  assertTrue(Array.isArray(result.missingSkills), 'Missing skills must be an array');
});

collector.test('F05-T1-3: Simulator produces deterministic transition difficulty classification', async () => {
  const careersRes = await api.get('/api/careers');
  const careers = careersRes.data.careers;

  const res = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: careers[0].id,
    targetCareerId: careers[1].id
  });

  assertStatusCode(res.status, 200);
  const diff = res.data.result.transitionDifficulty;
  assertTrue(['low', 'moderate', 'high'].includes(diff), `Difficulty must be low/moderate/high, got ${diff}`);
});

collector.test('F05-T1-4: Pathway match includes structured roadmap transition milestones', async () => {
  const careersRes = await api.get('/api/careers');
  const careers = careersRes.data.careers;

  const res = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: careers[0].id,
    targetCareerId: careers[1].id
  });

  assertStatusCode(res.status, 200);
  const roadmap = res.data.result.pivotRoadmapSummary;
  assertTrue(Array.isArray(roadmap), 'Must generate pivot roadmap summary');
  assertTrue(roadmap.length >= 3, 'Must have at least 3 roadmap milestones');
  assertTrue(roadmap.every((step: any) => typeof step.step === 'number' && typeof step.title === 'string'));
});

collector.test('F05-T1-5: Filter careers by discipline returns matching domain careers', async () => {
  const res = await api.get('/api/careers?discipline=engineering');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.careers));
  for (const c of res.data.careers) {
    assertEqual(c.discipline.toLowerCase(), 'engineering');
  }
});
