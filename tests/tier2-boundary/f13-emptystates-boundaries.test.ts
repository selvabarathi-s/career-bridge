import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F13-B: Honest Empty States & Boundary Data Integrity

collector.test('F13-T2-1: Career search yielding 0 results returns empty array without throwing', async () => {
  const res = await api.get('/api/careers?search=xyz_completely_nonexistent_career_title');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.careers));
  assertEqual(res.data.careers.length, 0);
});

collector.test('F13-T2-2: Placement drives filter by unknown department returns empty list without error', async () => {
  const res = await api.get('/api/placements/drives?department=NonExistentDepartmentX');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.drives));
});

collector.test('F13-T2-3: Recommendations query for non-existent student returns empty array', async () => {
  const res = await api.get('/api/recommendations?studentId=NON_EXISTENT_STUDENT');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.recommendations));
  assertEqual(res.data.recommendations.length, 0);
});

collector.test('F13-T2-4: Assessment questions for unknown skill ID returns empty list', async () => {
  const res = await api.get('/api/assessments?skillId=unknown-skill-xyz');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.assessments));
});

collector.test('F13-T2-5: Mentor interventions returns array without crashing', async () => {
  await api.login(CONFIG.credentials.mentor.email, CONFIG.credentials.mentor.password, 'mentor');
  const res = await api.get('/api/mentor/interventions');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.interventions));
});
