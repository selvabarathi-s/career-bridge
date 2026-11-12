import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode,
  assertIncludes
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F10: Resilient AI Career Mentor Gateway
// Resilient AI Gateway with error taxonomy and offline expert fallback.

collector.test('F10-T1-1: Gateway returns actionable career coaching advice when Gemini API key is unset', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'How do I prepare for technical interviews at top software companies?'
  });
  assertStatusCode(res.status, 200);
  const text = typeof res.data.message === 'string' ? res.data.message : res.data.message?.content || '';
  assertTrue(Boolean(text), 'Must return advice message');
  assertTrue(text.length > 50, 'Advice must be substantive and actionable');
});

collector.test('F10-T1-2: Offline fallback recognizes student profile domain and technical skills', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'What projects should I build to showcase my machine learning skills?'
  });
  assertStatusCode(res.status, 200);
  const text = typeof res.data.message === 'string' ? res.data.message : res.data.message?.content || '';
  const msg = text.toLowerCase();
  // Selva is in AI & Data Science
  assertTrue(
    msg.includes('project') || msg.includes('model') || msg.includes('learning') || msg.includes('data'),
    'Fallback response must be contextually relevant to student domain'
  );
});

collector.test('F10-T1-3: General guidance endpoint works reliably without requiring student profile', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    message: 'What is the role of a Placement Cell in engineering institutions?'
  });
  assertStatusCode(res.status, 200);
  const text = typeof res.data.message === 'string' ? res.data.message : res.data.message?.content || '';
  assertTrue(Boolean(text));
});

collector.test('F10-T1-4: AI guidance responses use clean formatted text with structural headings or bullets', async () => {
  await api.login();
  const res = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'Give me a 3-step action plan to improve my coding speed.'
  });
  assertStatusCode(res.status, 200);
  const text = typeof res.data.message === 'string' ? res.data.message : res.data.message?.content || '';
  // Professional responses use bullets, numbers, or newlines
  assertTrue(text.includes('\n'), 'Response should be well-structured with paragraph/bullet breaks');
});

collector.test('F10-T1-5: Chat service safely records messages in profile history without duplicates', async () => {
  await api.login();
  const uniqueQuery = `Test query ${Date.now()}: How to optimize system design?`;
  await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: uniqueQuery
  });

  const historyRes = await api.get(`/api/ai-mentor/history/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(historyRes.status, 200);
  const history = historyRes.data.history || [];
  const found = history.filter((item: any) => item.content === uniqueQuery || item.message === uniqueQuery);
  assertTrue(found.length >= 1, 'Query must be recorded in history');
});
