import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F17-B: Institutional Aggregates Calculations & Structural Boundaries

collector.test('F17-T2-1: Mentor interventions active count matches actual open interventions', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const analyticsRes = await api.get('/api/admin/analytics');
  assertStatusCode(analyticsRes.status, 200);
  const reportedOpen = analyticsRes.data.metrics.mentorInterventionsActive;
  
  const interventionsRes = await api.get('/api/guidance/interventions');
  if (interventionsRes.status === 200 && Array.isArray(interventionsRes.data.interventions)) {
    const actualOpen = interventionsRes.data.interventions.filter((i: any) => i.status === 'open').length;
    assertEqual(reportedOpen, actualOpen, 'Open interventions count must match DB');
  } else {
    assertTrue(typeof reportedOpen === 'number' && reportedOpen >= 0);
  }
});

collector.test('F17-T2-2: Curriculum gaps array in analytics response is populated with valid items', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.curriculumGaps));
  for (const gap of res.data.curriculumGaps) {
    assertTrue(Boolean(gap.skillName));
    assertTrue(typeof gap.deficiencyPercentage === 'number');
  }
});

collector.test('F17-T2-3: Career distribution counts are strictly non-negative integers', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  const dist = res.data.careerDistribution;
  for (const career of Object.keys(dist)) {
    const count = dist[career];
    assertTrue(Number.isInteger(count) && count >= 0);
  }
});

collector.test('F17-T2-4: High readiness count does not exceed total enrolled count', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  const { totalStudentsEnrolled, highReadinessCount } = res.data.metrics;
  assertTrue(highReadinessCount <= totalStudentsEnrolled, 'High readiness count cannot exceed total students');
});

collector.test('F17-T2-5: Active on roadmap count does not exceed total enrolled count', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  const { totalStudentsEnrolled, activeOnRoadmap } = res.data.metrics;
  assertTrue(activeOnRoadmap <= totalStudentsEnrolled, 'Active on roadmap cannot exceed total students');
});
