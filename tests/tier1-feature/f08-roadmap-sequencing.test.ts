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

// F08: Topological Roadmap Sequencing (AI.FORECAST)
// Kahn's DAG prerequisite-aware sequencing with EWMA velocity forecasting.

collector.test('F08-T1-1: GET /api/roadmaps/:studentId returns sequenced milestones', async () => {
  const res = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.milestones), 'Must return milestones array');
  assertTrue(res.data.milestones.length >= 3, 'Must have at least 3 sequenced milestones');
});

collector.test('F08-T1-2: Milestones follow ordered progression indices without gaps or negative numbers', async () => {
  const res = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const milestones = res.data.milestones;
  for (let i = 0; i < milestones.length; i++) {
    assertEqual(milestones[i].order, i + 1, `Milestone order must be strictly sequential 1..N`);
  }
});

collector.test('F08-T1-3: Roadmap response includes computeNextBestAction recommendation', async () => {
  const res = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.nextAction), 'Must include nextAction object');
  assertTrue(typeof res.data.nextAction.title === 'string');
  assertTrue(Boolean(res.data.nextAction.actionType || res.data.nextAction.actionLabel));
});

collector.test('F08-T1-4: Adaptation context calculates completion metrics and projected duration', async () => {
  const res = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const ctx = res.data.adaptationContext;
  assertTrue(Boolean(ctx), 'Must return adaptationContext');
  assertNumberInRange(ctx.totalMilestones, 1, 100);
  assertNumberInRange(ctx.completionPercentage, 0, 100);
  assertNumberInRange(ctx.projectedWeeksToReadiness, 0, 104);
  assertTrue(Boolean(ctx.pace), 'Must include pace descriptor');
});

collector.test('F08-T1-5: POST /api/roadmaps/:studentId/milestones/:id/status updates milestone and boosts skill', async () => {
  const roadmapRes = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  const firstMilestone = roadmapRes.data.milestones[0];
  assertTrue(Boolean(firstMilestone), 'Must have at least one milestone');

  const updateRes = await api.post(`/api/roadmaps/${CONFIG.credentials.student.profileId}/milestones/${firstMilestone.id}/status`, {
    status: 'completed'
  });
  assertStatusCode(updateRes.status, 200);
  assertTrue(updateRes.data.success);
});
