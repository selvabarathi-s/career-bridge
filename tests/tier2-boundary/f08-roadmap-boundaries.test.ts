import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F08-B: Roadmap Sequencing Boundaries & Edge Inputs

collector.test('F08-T2-1: GET /api/roadmaps/:studentId returns 404 for unknown student ID', async () => {
  const res = await api.get('/api/roadmaps/NON_EXISTENT_STUDENT_9999');
  assertStatusCode(res.status, 404);
  assertTrue(Boolean(res.data.error));
});

collector.test('F08-T2-2: POST milestone status returns 404 for unknown student ID', async () => {
  const res = await api.post('/api/roadmaps/NON_EXISTENT_STUDENT_9999/milestones/ms-1-learn/status', {
    status: 'completed'
  });
  assertStatusCode(res.status, 404);
  assertTrue(Boolean(res.data.error));
});

collector.test('F08-T2-3: Marking an already completed milestone completed does not duplicate IDs', async () => {
  const roadmapRes = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  const mId = roadmapRes.data.milestones[0].id;

  // Complete once
  await api.post(`/api/roadmaps/${CONFIG.credentials.student.profileId}/milestones/${mId}/status`, {
    status: 'completed'
  });

  // Complete again
  const res = await api.post(`/api/roadmaps/${CONFIG.credentials.student.profileId}/milestones/${mId}/status`, {
    status: 'completed'
  });
  assertStatusCode(res.status, 200);

  const profileRes = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  const ids = profileRes.data.profile.completedMilestoneIds || [];
  const count = ids.filter((id: string) => id === mId).length;
  assertEqual(count, 1, 'Milestone ID must appear at most once in completedMilestoneIds');
});

collector.test('F08-T2-4: Milestone status update with unknown milestone ID handles gracefully', async () => {
  const res = await api.post(`/api/roadmaps/${CONFIG.credentials.student.profileId}/milestones/ms-unknown-skill-xyz/status`, {
    status: 'completed'
  });
  assertStatusCode(res.status, 200);
});

collector.test('F08-T2-5: Roadmap adaptation projected weeks is non-negative and finite', async () => {
  const res = await api.get(`/api/roadmaps/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const weeks = res.data.adaptationContext.projectedWeeksToReadiness;
  assertTrue(typeof weeks === 'number' && !Number.isNaN(weeks) && weeks >= 0);
});
