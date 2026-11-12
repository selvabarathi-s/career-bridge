import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertStatusCode,
  assertNotEqual
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F02-B: Profile Isolation Boundaries & Fallback Rejection

collector.test('F02-T2-1: GET /api/profiles/../malicious path traversal attempt rejected with 404 or sanitized', async () => {
  const res = await api.get('/api/profiles/..%2F..%2Fetc%2Fpasswd');
  assertStatusCode(res.status, [400, 404]);
});

collector.test('F02-T2-2: PUT /api/profiles/:id returns 404 for non-existent profile ID', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.put('/api/profiles/NON_EXISTENT_ID_99999', {
    bio: 'Updated bio for non-existent student'
  });
  assertStatusCode(res.status, 404);
  assertTrue(Boolean(res.data.error));
});

collector.test('F02-T2-3: POST /api/simulator/simulate with non-existent studentId does NOT fall back to student 0', async () => {
  const res = await api.post('/api/simulator/simulate', {
    studentId: 'NON_EXISTENT_FAKE_STUDENT_ID',
    sourceCareerId: 'career-ai-engineer',
    targetCareerId: 'career-data-analyst'
  });
  // Contract: Fallback to db.getProfiles()[0] must be eliminated.
  // It should reject with 400 or 404, or if returned, must NOT use STU-ENG-2024-001 profile
  if (res.status === 200 && res.data?.result) {
    assertStatusCode(res.status, [400, 404], 'Simulator must reject non-existent student ID instead of falling back to student 0');
  } else {
    assertStatusCode(res.status, [400, 404]);
  }
});

collector.test('F02-T2-4: Profile update with empty payload does not corrupt existing profile', async () => {
  await api.login();
  const res = await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {});
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.profile.fullName));
});

collector.test('F02-T2-5: Querying profile with special characters in ID is handled cleanly', async () => {
  const res = await api.get('/api/profiles/%3Cscript%3Ealert(1)%3C%2Fscript%3E');
  assertStatusCode(res.status, 404);
});
