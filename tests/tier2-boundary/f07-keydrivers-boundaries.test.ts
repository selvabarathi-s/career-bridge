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

// F07-B: Key Drivers Boundary & Edge Calculations

collector.test('F07-T2-1: Skill gap calculation clamps gapScore to non-negative numbers', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  for (const gap of res.data.skillGaps) {
    assertTrue(gap.gapScore >= 0, `gapScore must not be negative for ${gap.skillName}`);
  }
});

collector.test('F07-T2-2: Mastered skills have gapScore 0 and status "mastered"', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const mastered = res.data.skillGaps.filter((g: any) => g.status === 'mastered');
  for (const m of mastered) {
    assertEqual(m.gapScore, 0);
  }
});

collector.test('F07-T2-3: POST /api/admin/curriculum-gaps creates new curriculum gap with defaulted deficiency', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.post('/api/admin/curriculum-gaps', {
    discipline: 'Computer Science',
    careerTitle: 'Cloud Architect',
    skillName: 'Terraform & IaC',
    suggestedIntervention: 'Hands-on lab module'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
  assertNumberInRange(res.data.gap.deficiencyPercentage, 0, 100);
});

collector.test('F07-T2-4: Priority weights strictly maintain order critical >= high >= medium >= low', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  const orderMap: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
  const gaps = res.data.skillGaps;
  for (let i = 0; i < gaps.length - 1; i++) {
    const w1 = orderMap[gaps[i].priority] || 0;
    const w2 = orderMap[gaps[i + 1].priority] || 0;
    assertTrue(w1 >= w2, `Priorities must be sorted monotonically descending (${gaps[i].priority} >= ${gaps[i + 1].priority})`);
  }
});

collector.test('F07-T2-5: Rationale is non-empty string for every gap category', async () => {
  const res = await api.get(`/api/profiles/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  for (const gap of res.data.skillGaps) {
    assertTrue(typeof gap.rationale === 'string' && gap.rationale.length > 5);
  }
});
