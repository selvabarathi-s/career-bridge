import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F04-B: Private Chat Boundaries & Negative Inputs

collector.test('F04-T2-1: Empty chat message string returns 400 error', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: ''
  });
  assertStatusCode(res.status, 400);
  assertTrue(Boolean(res.data.error));
});

collector.test('F04-T2-2: Whitespace-only chat message returns 400 error', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: '     \n\t   '
  });
  assertStatusCode(res.status, 400);
  assertTrue(Boolean(res.data.error));
});

collector.test('F04-T2-3: Chat history for non-existent student ID returns 404 or empty array without 500 crash', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/ai-mentor/history/NON_EXISTENT_ID_9999');
  assertStatusCode(res.status, [200, 404]);
});

collector.test('F04-T2-4: Chat endpoint accepts and preserves UTF-8 emoji and international characters', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: 'Hello! 🚀 How do I prepare for AI interviews? 💻 🌟'
  });
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.message));
});

collector.test('F04-T2-5: Chat with non-existent studentId is safely rejected with 404 or falls back without 500 crash', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    studentId: 'STU-UNKNOWN-GHOST-ID',
    message: 'What is cloud computing?'
  });
  assertStatusCode(res.status, [200, 404]);
});
