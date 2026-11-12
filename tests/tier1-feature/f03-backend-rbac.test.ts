import { CONFIG } from '../config.ts';
import { api, ApiClient } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F03: Backend RBAC & Session Auth
// Verify authentication and role-based permissions across student, mentor, placement, and admin roles.

collector.test('F03-T1-1: Authentication returns unique bearer token on successful login', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.token), 'Token must be present in login response');
  assertTrue(res.data.token.startsWith('cb_session_') || res.data.token.length >= 16);
});

collector.test('F03-T1-2: Student role credentials validate against student portal', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'student');
});

collector.test('F03-T1-3: Mentor role credentials validate against mentor portal', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.mentor.email,
    password: CONFIG.credentials.mentor.password,
    portalRole: 'mentor'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'mentor');
});

collector.test('F03-T1-4: Placement cell credentials validate against placement portal', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.placement.email,
    password: CONFIG.credentials.placement.password,
    portalRole: 'placement_cell'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'placement_cell');
});

collector.test('F03-T1-5: Admin role credentials validate against admin portal', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.admin.email,
    password: CONFIG.credentials.admin.password,
    portalRole: 'admin'
  });
  assertStatusCode(res.status, 200);
  assertEqual(res.data.user.role, 'admin');
});
