import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertStatusCode,
  assertIncludes
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F03-B: RBAC & Authentication Boundaries

collector.test('F03-T2-1: Login with unknown email returns 401 Account not found', async () => {
  const res = await api.post('/api/auth/login', {
    email: 'nonexistent.user.999@college.edu',
    password: 'password123',
    portalRole: 'student'
  });
  assertStatusCode(res.status, 401);
  assertFalse(res.data.success);
});

collector.test('F03-T2-2: Login with incorrect password returns 401 Invalid password', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: 'WRONG_PASSWORD_XYZ_123',
    portalRole: 'student'
  });
  assertStatusCode(res.status, 401);
  assertFalse(res.data.success);
});

collector.test('F03-T2-3: Student credentials used on Admin portal are rejected with 403', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'admin' // Role mismatch: student attempting admin portal
  });
  assertStatusCode(res.status, 403);
  assertFalse(res.data.success);
  assertIncludes(res.data.error.toLowerCase(), 'student');
});

collector.test('F03-T2-4: Missing password in login request returns 400 validation error', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email
  });
  assertStatusCode(res.status, 400);
  assertFalse(res.data.success);
});

collector.test('F03-T2-5: Malformed authorization header is handled without server crash', async () => {
  const res = await api.get('/api/admin/analytics', {
    'Authorization': 'MalformedTokenWithoutBearer'
  });
  // Server must return response without 500 error
  assertTrue(res.status === 200 || res.status === 401 || res.status === 403);
});
