import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertStatusCode,
  assertNumberInRange
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F09-B: Model Metrics Telemetry Boundaries

collector.test('F09-T2-1: Model evaluation dataset size is substantial (>= 5000 records)', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const size = res.data.metrics.datasetSize;
  assertTrue(typeof size === 'number' && size >= 5000);
});

collector.test('F09-T2-2: K-fold cross-validation folds is valid integer (>= 5)', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const folds = res.data.metrics.validationFolds;
  assertTrue(Number.isInteger(folds) && folds >= 5);
});

collector.test('F09-T2-3: Probability calibration loss metrics (LogLoss & BrierScore) are non-negative', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const cls = res.data.metrics.classificationMetrics;
  assertTrue(cls.logLoss >= 0 && cls.logLoss < 2.0, 'LogLoss must be reasonable [0, 2.0]');
  assertTrue(cls.brierScore >= 0 && cls.brierScore < 1.0, 'Brier score must be in [0, 1.0]');
});

collector.test('F09-T2-4: Regression R-Squared is bounded <= 1.0 and MAE/RMSE are positive', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const reg = res.data.metrics.regressionMetrics;
  assertTrue(reg.rSquared <= 1.0 && reg.rSquared >= 0);
  assertTrue(reg.mae > 0);
  assertTrue(reg.rmse > 0);
  assertTrue(reg.rmse >= reg.mae, 'RMSE must be >= MAE mathematically');
});

collector.test('F09-T2-5: Live cohort validation reports positive evaluated count', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/model-metrics');
  assertStatusCode(res.status, 200);
  const live = res.data.metrics.liveCohortValidation;
  assertTrue(live.activeProfilesEvaluated >= 1);
  assertNumberInRange(live.averageModelReadiness, 0, 100);
});
