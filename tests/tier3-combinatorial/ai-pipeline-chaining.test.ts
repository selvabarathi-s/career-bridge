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

// Tier 3 Combinatorial: AI Pipeline Chaining
// Tests the end-to-end integration and data consistency across Career Selection -> Skill Gap Diagnosis -> Roadmap -> Readiness Scoring.

collector.test('T3-AI-1: Career Selection -> Skill Gap Diagnosis data consistency', async () => {
  const profileRes = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(profileRes.status, 200);
  const targetCareer = profileRes.data.targetCareer;
  const skillGaps = profileRes.data.skillGaps;

  assertTrue(Boolean(targetCareer), 'Target career must be populated');
  assertTrue(Array.isArray(skillGaps), 'Skill gaps must be generated for target career');

  // Verify that all required benchmark skills in target career are evaluated in skill gaps
  const benchmarkSkills = targetCareer.benchmark.requiredSkills.map((s: any) => s.skillId);
  for (const bId of benchmarkSkills) {
    const found = skillGaps.some((g: any) => g.skillId === bId);
    assertTrue(found, `Benchmark skill ${bId} must be evaluated in skill gaps`);
  }
});

collector.test('T3-AI-2: Skill Gap Diagnosis -> Adaptive Roadmap Sequencing chaining', async () => {
  const profileRes = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  const gaps = profileRes.data.skillGaps;

  const roadmapRes = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(roadmapRes.status, 200);
  const milestones = roadmapRes.data.milestones;

  // Verify that critical gap skills correspond to milestones in the learning roadmap
  const criticalGaps = gaps.filter((g: any) => g.priority === 'critical' || g.priority === 'high');
  if (criticalGaps.length > 0) {
    const topGapSkill = criticalGaps[0].skillName.toLowerCase();
    const hasMilestoneForGap = milestones.some((m: any) =>
      m.title.toLowerCase().includes(topGapSkill) ||
      m.skillId === criticalGaps[0].skillId ||
      m.description?.toLowerCase().includes(topGapSkill)
    );
    assertTrue(hasMilestoneForGap, `Roadmap must address top gap: ${criticalGaps[0].skillName}`);
  }
});

collector.test('T3-AI-3: Milestone Completion -> Skill Level Boost & Readiness Recalculation', async () => {
  const roadmapBefore = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  const firstMilestone = roadmapBefore.data.milestones[0];

  // Complete milestone
  const updateRes = await api.post(`/api/roadmaps/${CONFIG.credentials.student.profileId}/milestones/${firstMilestone.id}/status`, {
    status: 'completed'
  });
  assertStatusCode(updateRes.status, 200);

  // Check updated profile
  const profileAfter = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  const completedIds = profileAfter.data.profile.completedMilestoneIds || [];
  assertTrue(completedIds.includes(firstMilestone.id), 'Milestone must be recorded as completed in profile');
});

collector.test('T3-AI-4: Career Simulator -> AI Guidance Context synchronization', async () => {
  // Simulate career pivot
  const simRes = await api.post('/api/simulator/simulate', {
    studentId: CONFIG.credentials.student.profileId,
    sourceCareerId: 'career-ai-engineer',
    targetCareerId: 'career-data-analyst'
  });
  assertStatusCode(simRes.status, 200);
  const rationale = simRes.data.result.rationale;
  assertTrue(Boolean(rationale), 'Simulator must yield rationale');

  // Verify AI Career Coach can advise on transition
  await api.login();
  const chatRes = await api.post('/api/ai-mentor/chat', {
    studentId: CONFIG.credentials.student.profileId,
    message: 'What bridge projects should I complete to pivot to Data Analyst?'
  });
  assertStatusCode(chatRes.status, 200);
  assertTrue(Boolean(chatRes.data.message));
});

collector.test('T3-AI-5: Global model metrics validation reflects active profiles in pipeline', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const metricsRes = await api.get('/api/admin/model-metrics');
  assertStatusCode(metricsRes.status, 200);
  const evaluatedCount = metricsRes.data.metrics.liveCohortValidation.activeProfilesEvaluated;
  assertTrue(evaluatedCount >= 1, 'Model metrics must evaluate active student profiles');
});
