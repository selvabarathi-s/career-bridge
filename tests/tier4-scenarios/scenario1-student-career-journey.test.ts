import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode,
  assertNumberInRange
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// Scenario 1: Student Career-Readiness & Transition Journey
// Simulates complete student persona lifecycle from registration through skill mastery and placement application.

collector.test('Scenario 1: Full Student Persona Lifecycle', async () => {
  // Step 1: Sign in with student account
  console.log('  [Step 1] Student authentication...');
  const loginRes = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(loginRes.status, 200);
  const student = loginRes.data.user;
  assertEqual(student.role, 'student');
  const token = loginRes.data.token;
  api.setToken(token);

  // Step 2: Explore careers and verify target career
  console.log('  [Step 2] Career exploration...');
  const careersRes = await api.get('/api/careers');
  assertStatusCode(careersRes.status, 200);
  const targetCareer = careersRes.data.careers.find((c: any) => c.id === 'career-ai-ml') || careersRes.data.careers[0];
  assertTrue(Boolean(targetCareer));

  // Step 3: Diagnostic Skill Gap Analysis
  console.log('  [Step 3] Skill gap diagnosis...');
  const targetProfileId = student.profileId || student.studentId;
  const profileRes = await api.get(`/api/profiles/${targetProfileId}`);
  assertStatusCode(profileRes.status, 200);
  const gaps = profileRes.data.skillGaps;
  assertTrue(Array.isArray(gaps) && gaps.length > 0);
  const topGap = gaps[0];
  assertTrue(topGap.gapScore >= 0);

  // Step 4: Generate Adaptive Learning Roadmap
  console.log('  [Step 4] Learning roadmap generation...');
  const roadmapRes = await api.get(`/api/roadmaps/${targetProfileId}`);
  assertStatusCode(roadmapRes.status, 200);
  const milestones = roadmapRes.data.milestones;
  assertTrue(milestones.length >= 3);
  const firstMilestone = milestones[0];

  // Step 5: Complete Learning Milestone
  console.log('  [Step 5] Milestone progression...');
  const updateRes = await api.post(`/api/roadmaps/${targetProfileId}/milestones/${firstMilestone.id}/status`, {
    status: 'completed'
  });
  assertStatusCode(updateRes.status, 200);
  assertTrue(updateRes.data.success);

  // Step 6: AI Career Coach Consultation
  console.log('  [Step 6] AI Coach consultation...');
  const chatRes = await api.post('/api/ai-mentor/chat', {
    studentId: targetProfileId,
    message: `I just completed ${firstMilestone.title}. What practical portfolio project should I build next?`
  });
  assertStatusCode(chatRes.status, 200);
  assertTrue(Boolean(chatRes.data.message));

  // Step 7: Check Placement Opportunities
  console.log('  [Step 7] Placement opportunities check...');
  const drivesRes = await api.get('/api/placements/drives');
  assertStatusCode(drivesRes.status, 200);
  assertTrue(Array.isArray(drivesRes.data.drives));
});
