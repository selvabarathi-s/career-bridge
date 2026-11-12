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

// F09: Native AI/ML Evaluation Suite
// Mathematical evaluation engine executing NDCG@5, MCC, AUC-ROC, F1, and Cohen's Kappa on model outputs.

collector.test('F09-T1-1: GET /api/admin/model-metrics returns model telemetry suite', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.metrics), 'Must return metrics object');
  assertEqual(res.data.metrics.status, 'production_ready');
});

collector.test('F09-T1-2: Classification evaluation reports valid AUC-ROC, F1-Score, and MCC', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const cls = res.data.metrics.classificationMetrics;
  assertTrue(Boolean(cls), 'Must return classificationMetrics');
  
  // AUC-ROC is typically represented as [0, 100] percentage or [0, 1]
  assertNumberInRange(cls.aucRoc, 50, 100, 'AUC-ROC must be >= 50%');
  assertNumberInRange(cls.f1Score, 50, 100, 'F1 score must be >= 50%');
  // MCC is bounded in [-1, +1]
  assertNumberInRange(cls.matthewsCorrelationCoefficient, -1.0, 1.0, 'MCC must be in [-1.0, 1.0]');
  assertTrue(cls.matthewsCorrelationCoefficient > 0.5, 'Production model MCC must indicate strong correlation > 0.5');
});

collector.test('F09-T1-3: Ranking evaluation reports valid NDCG@5 metric', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const rnk = res.data.metrics.rankingMetrics;
  assertTrue(Boolean(rnk), 'Must return rankingMetrics');
  assertNumberInRange(rnk.ndcgAt5, 0.0, 1.0, 'NDCG@5 must be bounded in [0.0, 1.0]');
  assertTrue(rnk.ndcgAt5 >= 0.80, 'NDCG@5 must be high quality >= 0.80');
});

collector.test('F09-T1-4: Calibration evaluation reports valid Cohen\'s Kappa agreement', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const cal = res.data.metrics.calibrationMetrics;
  assertTrue(Boolean(cal), 'Must return calibrationMetrics');
  assertNumberInRange(cal.cohensKappa, -1.0, 1.0, "Cohen's Kappa must be bounded in [-1.0, 1.0]");
  assertTrue(cal.cohensKappa >= 0.70, "Cohen's Kappa must show substantial agreement >= 0.70");
});

collector.test('F09-T1-5: Confusion matrix elements sum consistently to totalEvaluated', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const cm = res.data.metrics.confusionMatrix;
  assertTrue(Boolean(cm), 'Must return confusionMatrix');
  const sum = cm.truePositive + cm.falsePositive + cm.trueNegative + cm.falseNegative;
  assertEqual(sum, cm.totalEvaluated, 'Confusion matrix cells must sum exactly to totalEvaluated');
});
