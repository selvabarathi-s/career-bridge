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

// F07: Explainable Key Drivers (AI.KEY_DRIVERS)
// Feature contribution analysis identifying specific positive and negative drivers of readiness relative to cohort benchmarks.

collector.test('F07-T1-1: GET /api/profiles/:id returns prioritized skill gap drivers', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.skillGaps), 'Must return skillGaps array');
  assertTrue(res.data.skillGaps.length > 0, 'Must have evaluated skill gaps');
  
  const topGap = res.data.skillGaps[0];
  assertTrue(Boolean(topGap.skillName), 'Gap driver must have skillName');
  assertTrue(typeof topGap.gapScore === 'number', 'Gap driver must have numeric gapScore');
  assertTrue(['critical', 'high', 'medium', 'low'].includes(topGap.priority));
});

collector.test('F07-T1-2: Skill gap drivers contain explainable pedagogical rationales', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const gaps = res.data.skillGaps;
  for (const gap of gaps) {
    assertTrue(typeof gap.rationale === 'string' && gap.rationale.length > 10, 'Each driver must have actionable rationale');
  }
});

collector.test('F07-T1-3: Critical prerequisite blockers are flagged as highest priority', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const gaps = res.data.skillGaps;
  const unfulfilledPrereqs = gaps.filter((g: any) => g.prerequisiteFulfilled === false);
  for (const blocker of unfulfilledPrereqs) {
    assertEqual(blocker.priority, 'critical', 'Unfulfilled prerequisite must be marked critical');
  }
});

collector.test('F07-T1-4: AI evaluation telemetry reports global feature importance contributions', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const importance = res.data.metrics.featureImportance;
  assertTrue(Array.isArray(importance), 'Feature importance must be returned as an array');
  assertTrue(importance.length >= 3, 'Must report at least top 3 model drivers');
  
  const totalPercentage = importance.reduce((acc: number, item: any) => acc + item.importancePercentage, 0);
  assertNumberInRange(totalPercentage, 95, 105, 'Total feature importance percentages must sum to ~100%');
});

collector.test('F07-T1-5: Drivers distinguish mastered competencies from deficit gaps', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const gaps = res.data.skillGaps;
  const statuses = new Set(gaps.map((g: any) => g.status));
  assertTrue(statuses.has('mastered') || statuses.has('strong') || statuses.has('developing') || statuses.has('weak') || statuses.has('missing'));
});
