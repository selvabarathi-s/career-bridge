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

// Scenario 4: Institution Admin Curriculum & AI Analytics Audit
// Tests institutional dean workflow verifying enrollment metrics, BigQuery AI/ML models, and curriculum alignment.

collector.test('Scenario 4: Institution Admin Curriculum & AI Analytics Audit', async () => {
  // Step 1: Sign in with Institution Admin account
  console.log('  [Step 1] Admin authentication...');
  const loginRes = await api.post('/api/auth/login', {
    email: CONFIG.credentials.admin.email,
    password: CONFIG.credentials.admin.password,
    portalRole: 'admin'
  });
  assertStatusCode(loginRes.status, 200);
  assertEqual(loginRes.data.user.role, 'admin');
  api.setToken(loginRes.data.token);

  // Step 2: Access Institutional Analytics Dashboard
  console.log('  [Step 2] Analytics review...');
  const analyticsRes = await api.get('/api/admin/analytics');
  assertStatusCode(analyticsRes.status, 200);
  const m = analyticsRes.data.metrics;
  assertTrue(typeof m.totalStudentsEnrolled === 'number');
  assertTrue(typeof m.activeOnRoadmap === 'number');

  // Step 3: Audit Native AI/ML Evaluation Suite
  console.log('  [Step 3] AI/ML Model audit...');
  const modelRes = await api.get('/api/admin/model-metrics');
  assertStatusCode(modelRes.status, 200);
  const metrics = modelRes.data.metrics;
  assertEqual(metrics.status, 'production_ready');

  // Verify all 5 evaluation metrics for institutional accreditation
  assertNumberInRange(metrics.classificationMetrics.aucRoc, 80, 100);
  assertNumberInRange(metrics.classificationMetrics.f1Score, 80, 100);
  assertNumberInRange(metrics.classificationMetrics.matthewsCorrelationCoefficient, 0.5, 1.0);
  assertNumberInRange(metrics.rankingMetrics.ndcgAt5, 0.8, 1.0);
  assertNumberInRange(metrics.calibrationMetrics.cohensKappa, 0.7, 1.0);

  // Step 4: Propose Institutional Curriculum Gap Action
  console.log('  [Step 4] Proposing curriculum intervention...');
  const gapRes = await api.post('/api/admin/curriculum-gaps', {
    discipline: 'Information Technology',
    careerTitle: 'Cybersecurity SOC Analyst',
    skillName: 'Threat Modeling & SIEM Analytics',
    deficiencyPercentage: 45,
    suggestedIntervention: 'Introduce mandatory Splunk / SIEM lab in Semester 6',
    priority: 'high'
  });
  assertStatusCode(gapRes.status, 200);
  assertTrue(gapRes.data.success);
  assertTrue(Boolean(gapRes.data.gap.id));
});
