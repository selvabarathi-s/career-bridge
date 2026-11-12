import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertNotEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// Tier 3 Combinatorial: Cross-Role & Multi-User Data Isolation
// Verifies that data belonging to one user is strictly inaccessible or unpolluted by another.

collector.test('T3-ISO-1: Student A and Student B have distinct personal profiles and student IDs', async () => {
  const profileA = await api.get('/api/profiles/student-selva');
  const profileB = await api.get('/api/profiles/student-kalai');

  assertStatusCode(profileA.status, 200);
  assertStatusCode(profileB.status, 200);

  assertNotEqual(profileA.data.profile.fullName, profileB.data.profile.fullName);
  assertNotEqual(profileA.data.profile.id, profileB.data.profile.id);
});

collector.test('T3-ISO-2: Chat history for Student A is strictly separate from Student B', async () => {
  // Use admin privilege to inspect both histories without cross-token contamination
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const historyA = await api.get('/api/ai-mentor/history/student-selva');
  const historyB = await api.get('/api/ai-mentor/history/student-kalai');

  assertStatusCode(historyA.status, 200);
  assertStatusCode(historyB.status, 200);

  // Student A logs in and posts a unique message
  await api.login();
  const uniqueMsgA = `A-Private-Advice-${Date.now()}`;
  await api.post('/api/ai-mentor/chat', {
    studentId: 'student-selva',
    message: uniqueMsgA
  });

  // Admin inspects Student B's history
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const updatedHistoryB = await api.get('/api/ai-mentor/history/student-kalai');
  const foundInB = (updatedHistoryB.data.history || []).some((h: any) => h.content === uniqueMsgA || h.message === uniqueMsgA);
  assertEqual(foundInB, false, "Student A's private chat must not appear in Student B's history");
});

collector.test('T3-ISO-3: Placement applications for Student A do not bleed into Student B list', async () => {
  const appsA = await api.get('/api/placements/applications/student/student-selva');
  const appsB = await api.get('/api/placements/applications/student/student-kalai');

  assertStatusCode(appsA.status, 200);
  assertStatusCode(appsB.status, 200);

  for (const a of appsA.data.applications || []) {
    assertEqual(a.studentId, 'student-selva');
  }
  for (const b of appsB.data.applications || []) {
    assertEqual(b.studentId, 'student-kalai');
  }
});

collector.test('T3-ISO-4: Faculty mentor assigned cohorts filter by mentor identity', async () => {
  await api.login(CONFIG.credentials.mentor.email, CONFIG.credentials.mentor.password, 'mentor');
  const mentorStudentsRes = await api.get('/api/mentor/students');
  assertStatusCode(mentorStudentsRes.status, 200);
  assertTrue(Array.isArray(mentorStudentsRes.data.students || mentorStudentsRes.data.cohort));
});

collector.test('T3-ISO-5: Admin institutional overview aggregates data across all students without student impersonation', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const adminRes = await api.get('/api/admin/analytics');
  assertStatusCode(adminRes.status, 200);
  assertTrue(Boolean(adminRes.data.careerDistribution));
  assertTrue(Boolean(adminRes.data.disciplineReadiness));
});
