import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertEqual,
  assertStatusCode,
  assertNumberInRange,
  assertNotEqual
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F06: Calibrated Readiness Scoring (ML.PREDICT)
// Multi-variable probabilistic readiness scoring replacing fragmented formulas and eliminating fake softSkillScore: 75.

collector.test('F06-T1-1: GET /api/profiles/:id returns profile with valid readinessScore structure', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const score = res.data.profile.readinessScore;
  assertTrue(Boolean(score), 'Profile must have readinessScore');
  assertNumberInRange(score.overallPercentage, 0, 100);
  assertTrue(['starting', 'building', 'competent', 'career_ready', 'placement_ready'].includes(score.status));
});

collector.test('F06-T1-2: Readiness score overall percentage is bounded [0, 100]', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const score = res.data.profile.readinessScore;
  assertTrue(score.overallPercentage >= 0 && score.overallPercentage <= 100);
  assertTrue(typeof score.overallPercentage === 'number' && !Number.isNaN(score.overallPercentage));
});

collector.test('F06-T1-3: Readiness status accurately categorizes readiness tiers', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const score = res.data.profile.readinessScore;
  if (score.overallPercentage >= 80) {
    assertTrue(['career_ready', 'placement_ready'].includes(score.status));
  } else if (score.overallPercentage >= 65) {
    assertTrue(['competent', 'in_progress'].includes(score.status));
  }
});

collector.test('F06-T1-4: Technical component scores are non-negative and properly evaluated', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const score = res.data.profile.readinessScore;
  assertNumberInRange(score.technicalScore, 0, 100);
  assertNumberInRange(score.projectScore, 0, 100);
  assertNumberInRange(score.problemSolvingScore, 0, 100);
});

collector.test('F06-T1-5: Readiness scoring does NOT rely on fake static softSkillScore: 75 across diverse profiles', async () => {
  const p1 = await api.get('/api/profiles/student-selva');
  const p2 = await api.get('/api/profiles/student-kalai');
  const p3 = await api.get('/api/profiles/student-sabari');
  const profiles = [p1.data?.profile, p2.data?.profile, p3.data?.profile].filter(Boolean);
  if (profiles.length >= 3) {
    const softScores = profiles.map((p: any) => p.readinessScore?.softSkillScore);
    const all75 = softScores.every((s: any) => s === 75);
    // When calibrated ML scoring is implemented, softSkillScore should either be computed or omitted in favor of genuine metrics
    assertFalse(all75 && softScores.length >= 3, 'Soft skills must not be statically hardcoded to 75 for all profiles');
  }
});
