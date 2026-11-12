import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F10-B: AI Gateway Edge Inputs & Resilience

collector.test('F10-T2-1: Prompt containing code snippets (Python/SQL) is parsed and answered cleanly', async () => {
  await api.login();
  const codePrompt = `How do I optimize this query? SELECT * FROM student_records WHERE cgpa > 8.0 ORDER BY created_at;`;
  const res = await api.post('/api/ai-mentor/chat', {
    message: codePrompt
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.message));
});

collector.test('F10-T2-2: Rapid successive calls to AI mentor gateway do not crash service', async () => {
  await api.login();
  const calls = [
    api.post('/api/ai-mentor/chat', { message: 'Quick question 1' }),
    api.post('/api/ai-mentor/chat', { message: 'Quick question 2' }),
    api.post('/api/ai-mentor/chat', { message: 'Quick question 3' })
  ];
  const results = await Promise.all(calls);
  for (const r of results) {
    assertStatusCode(r.status, 200);
    assertTrue(Boolean(r.data.message));
  }
});

collector.test('F10-T2-3: Guidance requests for non-CS disciplines (Mechanical/ECE) return domain advice', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: 'What skills are required for an Electric Vehicle Powertrain Engineer?'
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.message));
});

collector.test('F10-T2-4: Malformed request body with non-string message returns 400', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: 123456
  });
  assertStatusCode(res.status, 400);
});

collector.test('F10-T2-5: Gateway preserves student context across different questions', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'Can you review my readiness progress for campus placements?'
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.message));
});
