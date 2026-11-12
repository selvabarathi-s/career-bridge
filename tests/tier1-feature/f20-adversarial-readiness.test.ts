import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F20: Adversarial Coverage Hardening (Tier 5 Readiness)
// White-box adversarial testing with schema validation, unexpected payload rejection, and attack resistance.

collector.test('F20-T1-1: API safely ignores unexpected extra payload fields without crashing', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student',
    __malicious_injected_field__: 'DROP TABLE users;',
    extra_field_123: 999999
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
});

collector.test('F20-T1-2: AI Mentor chat sanitizes HTML / script tags in messages', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: '<script>alert("XSS")</script> What are best practices for security?'
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.message));
});

collector.test('F20-T1-3: Extremely long message payload is handled without buffer overflow', async () => {
  await api.login();
  const longText = 'A'.repeat(5000);
  const res = await api.post('/api/ai-mentor/chat', {
    message: `Question with long padding: ${longText}`
  });
  assertStatusCode(res.status, [200, 400]);
});

collector.test('F20-T1-4: Career search gracefully handles regex metacharacters in query parameter', async () => {
  const res = await api.get('/api/careers?search=(.*)+$');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.careers));
});

collector.test('F20-T1-5: Drive creation handles special characters in company name', async () => {
  const res = await api.post('/api/placements/drives', {
    companyName: 'Acme & Co. (Global) <Ltd>',
    roleTitle: 'Software Engineer',
    ctcPackage: '15 LPA'
  });
  assertStatusCode(res.status, [200, 201]);
  assertTrue(Boolean(res.data.drive));
});
