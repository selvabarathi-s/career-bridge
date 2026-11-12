import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F04: Private Chat & Data Protection
// Chat histories and advice queries must be strictly isolated to the authenticated profile owner.

collector.test('F04-T1-1: GET /api/ai-mentor/history returns chat history array for student', async () => {
  await api.login();
  const res = await api.get(`/api/ai-mentor/history/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.history), 'History must be returned as an array');
});

collector.test('F04-T1-2: GET /api/ai-mentor/history returns empty or 404 for non-existent profile without leaking other chats', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get(`/api/ai-mentor/history/non-existent-profile-xyz`);
  assertStatusCode(res.status, [200, 404]);
  if (res.status === 200) {
    assertEqual(res.data.history.length, 0, 'Admin/non-student must not receive previous student chats');
  }
});

collector.test('F04-T1-3: POST /api/ai-mentor/chat accepts message and returns guidance response', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'What core skills should I focus on for an AI Engineer role?'
  });
  assertStatusCode(res.status, 200);
  const msgText = typeof res.data.message === 'string' ? res.data.message : res.data.message?.content;
  assertTrue(Boolean(msgText), 'Chat endpoint must return a guidance message');
});

collector.test('F04-T1-4: POST /api/ai-mentor/chat without studentId provides general guidance without crashing', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: 'What are the top skills needed for cloud architecture in 2026?'
  });
  assertStatusCode(res.status, 200);
  const msgText = typeof res.data.message === 'string' ? res.data.message : res.data.message?.content;
  assertTrue(Boolean(msgText), 'General guidance chat must return valid message');
});

collector.test('F04-T1-5: General guidance chat does NOT pollute student chat history', async () => {
  await api.login();
  const historyBefore = await api.get(`/api/ai-mentor/history/${CONFIG.credentials.student.profileId}`);
  const countBefore = historyBefore.data.history?.length || 0;

  // Query general guidance from an administrator account without targeting student profile
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  await api.post('/api/ai-mentor/chat', {
    message: 'General institutional query: What is DevOps?'
  });

  await api.login();
  const historyAfter = await api.get(`/api/ai-mentor/history/${CONFIG.credentials.student.profileId}`);
  const countAfter = historyAfter.data.history?.length || 0;

  assertEqual(countBefore, countAfter, 'General chat message must not be appended to student profile history');
});
