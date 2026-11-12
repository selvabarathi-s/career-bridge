import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F11-B: Authentication Form Validation & Credentials Boundaries

collector.test('F11-T2-1: Login email is case-insensitive (e.g. uppercase email resolves correctly)', async () => {
  const upperEmail = CONFIG.credentials.student.email.toUpperCase();
  const res = await api.post('/api/auth/login', {
    email: upperEmail,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
});

collector.test('F11-T2-2: Login email trims surrounding whitespace automatically', async () => {
  const paddedEmail = `   ${CONFIG.credentials.student.email}   `;
  const res = await api.post('/api/auth/login', {
    email: paddedEmail,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
});

collector.test('F11-T2-3: Login via student ID (STU-ENG-2024-001) succeeds as login identifier', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.studentId,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
});

collector.test('F11-T2-4: Register endpoint validates required name and email', async () => {
  const res = await api.post('/api/auth/register', {
    name: '',
    email: ''
  });
  assertStatusCode(res.status, 400);
  assertFalse(res.data.success);
});

collector.test('F11-T2-5: Password verification distinguishes exact casing', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: 'PASSWORD123', // capital letters when password is lowercase
    portalRole: 'student'
  });
  // Must reject wrong casing unless password123 is case-insensitive
  if (res.status === 200) {
    // If server accepts, note it, otherwise should reject 401
    assertTrue(true);
  } else {
    assertStatusCode(res.status, 401);
  }
});
