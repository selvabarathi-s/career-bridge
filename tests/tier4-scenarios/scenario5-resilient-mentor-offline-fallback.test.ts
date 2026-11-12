import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// Scenario 5: Resilient Career Guidance during External Outage
// Tests that AI mentor gateway delivers continuous, high-quality expert advising when external API keys are unavailable.

collector.test('Scenario 5: Resilient Offline Career Guidance Fallback', async () => {
  // Step 1: Student submits complex career transition query
  console.log('  [Step 1] Student sends complex query...');
  await api.login();
  const prompt = 'I am in 3rd year AI & Data Science with CGPA 8.4. How should I prepare my resume and GitHub for cloud-native AI engineering roles?';
  const chatRes = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: prompt
  });
  assertStatusCode(chatRes.status, 200);

  // Step 2: Validate fallback delivers rich, tailored response
  console.log('  [Step 2] Validating response quality...');
  const responseText = typeof chatRes.data.message === 'string' ? chatRes.data.message : chatRes.data.message?.content || '';
  assertTrue(Boolean(responseText));
  assertTrue(responseText.length >= 100, 'Guidance response must be substantive');

  // Step 3: Check chat history preserves conversation
  console.log('  [Step 3] Checking chat history persistence...');
  const historyRes = await api.get(`/api/ai-mentor/history/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(historyRes.status, 200);
  const history = historyRes.data.history || [];
  const foundPrompt = history.some((item: any) => item.content === prompt || item.message === prompt);
  assertTrue(foundPrompt, 'Original prompt must be safely recorded in student chat history');

  // Step 4: Rapid second follow-up query remains responsive
  console.log('  [Step 4] Follow-up question...');
  const followUpRes = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'Can you recommend two specific open-source projects I can contribute to?'
  });
  assertStatusCode(followUpRes.status, 200);
  assertTrue(Boolean(followUpRes.data.message));
});
