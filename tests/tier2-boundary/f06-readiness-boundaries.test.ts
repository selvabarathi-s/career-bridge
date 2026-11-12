import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertStatusCode,
  assertNumberInRange
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F06-B: Readiness Scoring Boundary & Extreme Values
// Tests edge cases while maintaining state isolation by restoring profile properties.

collector.test('F06-T2-1: Profile with empty skills array computes readiness without division-by-zero or NaN', async () => {
  await api.login();
  const orig = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  try {
    const res = await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
      skills: []
    });
    assertStatusCode(res.status, 200);
    const score = res.data.profile.readinessScore;
    assertTrue(typeof score.overallPercentage === 'number' && !Number.isNaN(score.overallPercentage));
    assertNumberInRange(score.overallPercentage, 0, 100);
  } finally {
    if (orig.data?.profile?.skills) {
      await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
        skills: orig.data.profile.skills
      });
    }
  }
});

collector.test('F06-T2-2: Extreme CGPA 10.0 produces capped score without overflow', async () => {
  await api.login();
  const orig = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  try {
    const res = await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
      cgpa: 10.0
    });
    assertStatusCode(res.status, 200);
    const score = res.data.profile.readinessScore;
    assertTrue(score.overallPercentage <= 100, 'Score must never exceed 100%');
  } finally {
    if (orig.data?.profile?.cgpa) {
      await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
        cgpa: orig.data.profile.cgpa
      });
    }
  }
});

collector.test('F06-T2-3: Minimum CGPA 0.0 does not produce negative score', async () => {
  await api.login();
  const orig = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  try {
    const res = await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
      cgpa: 0.0
    });
    assertStatusCode(res.status, 200);
    const score = res.data.profile.readinessScore;
    assertTrue(score.overallPercentage >= 0, 'Score must never be negative');
  } finally {
    await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
      cgpa: orig.data?.profile?.cgpa || 8.85
    });
  }
});

collector.test('F06-T2-4: Profile update preserves targetCareer association even with empty projects', async () => {
  await api.login();
  const orig = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  try {
    const res = await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
      projects: []
    });
    assertStatusCode(res.status, 200);
    assertTrue(Boolean(res.data.profile?.targetCareerId || res.data.targetCareer));
  } finally {
    if (orig.data?.profile?.projects) {
      await api.put(`/api/profiles/${CONFIG.credentials.student.profileId}`, {
        projects: orig.data.profile.projects
      });
    }
  }
});

collector.test('F06-T2-5: Readiness status remains one of standard enum values across boundary inputs', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const status = res.data.profile.readinessScore.status;
  const valid = ['starting', 'building', 'competent', 'career_ready', 'placement_ready', 'in_progress'];
  assertTrue(valid.includes(status), `Status must be valid enum, got: ${status}`);
});
