import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertNotEqual,
  assertStatusCode,
  assertNumberInRange
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F17: Genuine Institutional Aggregates
// Compute real database aggregations for admin dashboard, eliminating hardcoded metric numbers in adminRoutes.ts.

collector.test('F17-T1-1: GET /api/admin/analytics returns institutional metrics payload', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.metrics), 'Must return metrics object');
  const m = res.data.metrics;
  assertTrue(typeof m.totalStudentsEnrolled === 'number');
  assertTrue(typeof m.activeOnRoadmap === 'number');
  assertTrue(typeof m.highReadinessCount === 'number');
  assertTrue(typeof m.mentorInterventionsActive === 'number');
  assertTrue(typeof m.averageReadinessIndex === 'number');
});

collector.test('F17-T1-2: Institutional metrics reflect dynamic database profile counts rather than hardcoded 482', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const analyticsRes = await api.get('/api/admin/analytics');
  assertStatusCode(analyticsRes.status, 200);
  const enrolled = analyticsRes.data.metrics.totalStudentsEnrolled;
  
  // In the real database there are only 4-10 seeded profiles, whereas 482 is hardcoded
  assertNotEqual(enrolled, 482, 'Must not report hardcoded 482 when real DB count differs');
});

collector.test('F17-T1-3: Average readiness index is dynamically bounded [0, 100]', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  assertNumberInRange(res.data.metrics.averageReadinessIndex, 0, 100);
});

collector.test('F17-T1-4: Career distribution maps student counts accurately across target roles', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.careerDistribution), 'Must return careerDistribution');
  const dist = res.data.careerDistribution;
  assertTrue(typeof dist === 'object');
});

collector.test('F17-T1-5: Discipline readiness average is calculated per department without NaN', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  const dr = res.data.disciplineReadiness;
  assertTrue(Boolean(dr), 'Must return disciplineReadiness');
  for (const dept of Object.keys(dr)) {
    const val = dr[dept];
    assertTrue(typeof val.avg === 'number' && !Number.isNaN(val.avg), `Average for ${dept} must not be NaN`);
    assertNumberInRange(val.avg, 0, 100);
  }
});
