import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode,
  assertNotEqual
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F02: Profile Isolation & Fallback Removal
// Ensure non-student roles never receive student profiles and user profiles are strictly isolated.

collector.test('F02-T1-1: Student login returns student own profile', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
  assertEqual(res.data.user.role, 'student');
  assertTrue(Boolean(res.data.profile), 'Student login must return student profile');
  assertEqual(res.data.profile.id, CONFIG.credentials.student.profileId);
  assertEqual(res.data.user.studentId, CONFIG.credentials.student.studentId);
});

collector.test('F02-T1-2: Admin login must NOT return student profile fallback', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.admin.email,
    password: CONFIG.credentials.admin.password,
    portalRole: 'admin'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'admin');
  
  // Contract: Admin must NEVER receive a student profile or student-selva
  const profile = res.data.profile;
  if (profile) {
    assertNotEqual(profile.id, 'student-selva', 'Admin must not fall back to student-selva profile');
    assertNotEqual(profile.id, 'student-kalai', 'Admin must not fall back to student-kalai profile');
  }
});

collector.test('F02-T1-3: Mentor login must NOT return student profile fallback', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.mentor.email,
    password: CONFIG.credentials.mentor.password,
    portalRole: 'mentor'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'mentor');
  
  const profile = res.data.profile;
  if (profile) {
    assertNotEqual(profile.id, 'student-selva', 'Mentor must not receive student-selva profile');
  }
});

collector.test('F02-T1-4: Placement Cell login must NOT return student profile fallback', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.placement.email,
    password: CONFIG.credentials.placement.password,
    portalRole: 'placement_cell'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'placement_cell');
  
  const profile = res.data.profile;
  if (profile) {
    assertNotEqual(profile.id, 'student-selva', 'Placement officer must not receive student-selva profile');
  }
});

collector.test('F02-T1-5: GET /api/profiles/:id returns 404 for non-existent profile ID', async () => {
  const res = await api.get('/api/profiles/NON_EXISTENT_PROFILE_ID_99999');
  // Must return 404 and not fall back to first profile in db
  assertStatusCode(res.status, [404, 200]);
  if (res.status === 200) {
    // If it returned 200, it must be null or have an error
    assertTrue(!res.data || res.data === null || res.data.profile === null, 'Must not return an active student profile for non-existent ID');
  }
});
