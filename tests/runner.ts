import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config.ts';
import { api } from './helpers/apiClient.ts';
import { ensureServerRunning, stopServer } from './helpers/serverManager.ts';
import { FeatureSuiteResult } from './helpers/testAssertions.ts';

// Dynamic imports for Tier 1
import { collector as t1_f01 } from './tier1-feature/f01-build-stability.test.ts';
import { collector as t1_f02 } from './tier1-feature/f02-profile-isolation.test.ts';
import { collector as t1_f03 } from './tier1-feature/f03-backend-rbac.test.ts';
import { collector as t1_f04 } from './tier1-feature/f04-private-chat.test.ts';
import { collector as t1_f05 } from './tier1-feature/f05-vector-pathway.test.ts';
import { collector as t1_f06 } from './tier1-feature/f06-readiness-scoring.test.ts';
import { collector as t1_f07 } from './tier1-feature/f07-key-drivers.test.ts';
import { collector as t1_f08 } from './tier1-feature/f08-roadmap-sequencing.test.ts';
import { collector as t1_f09 } from './tier1-feature/f09-model-evaluation.test.ts';
import { collector as t1_f10 } from './tier1-feature/f10-ai-mentor-gateway.test.ts';
import { collector as t1_f11 } from './tier1-feature/f11-demo-artifact-removal.test.ts';
import { collector as t1_f12 } from './tier1-feature/f12-saas-terminology.test.ts';
import { collector as t1_f13 } from './tier1-feature/f13-honest-data-states.test.ts';
import { collector as t1_f14 } from './tier1-feature/f14-accessible-contrast.test.ts';
import { collector as t1_f15 } from './tier1-feature/f15-placement-deadline.test.ts';
import { collector as t1_f16 } from './tier1-feature/f16-placement-views.test.ts';
import { collector as t1_f17 } from './tier1-feature/f17-genuine-aggregates.test.ts';
import { collector as t1_f18 } from './tier1-feature/f18-test-infrastructure.test.ts';
import { collector as t1_f19 } from './tier1-feature/f19-e2e-pass-readiness.test.ts';
import { collector as t1_f20 } from './tier1-feature/f20-adversarial-readiness.test.ts';

// Dynamic imports for Tier 2
import { collector as t2_f01 } from './tier2-boundary/f01-build-boundaries.test.ts';
import { collector as t2_f02 } from './tier2-boundary/f02-profile-boundaries.test.ts';
import { collector as t2_f03 } from './tier2-boundary/f03-rbac-boundaries.test.ts';
import { collector as t2_f04 } from './tier2-boundary/f04-chat-boundaries.test.ts';
import { collector as t2_f05 } from './tier2-boundary/f05-pathway-boundaries.test.ts';
import { collector as t2_f06 } from './tier2-boundary/f06-readiness-boundaries.test.ts';
import { collector as t2_f07 } from './tier2-boundary/f07-keydrivers-boundaries.test.ts';
import { collector as t2_f08 } from './tier2-boundary/f08-roadmap-boundaries.test.ts';
import { collector as t2_f09 } from './tier2-boundary/f09-metrics-boundaries.test.ts';
import { collector as t2_f10 } from './tier2-boundary/f10-gateway-boundaries.test.ts';
import { collector as t2_f11 } from './tier2-boundary/f11-credentials-boundaries.test.ts';
import { collector as t2_f12 } from './tier2-boundary/f12-terminology-boundaries.test.ts';
import { collector as t2_f13 } from './tier2-boundary/f13-emptystates-boundaries.test.ts';
import { collector as t2_f14 } from './tier2-boundary/f14-contrast-boundaries.test.ts';
import { collector as t2_f15 } from './tier2-boundary/f15-deadline-boundaries.test.ts';
import { collector as t2_f16 } from './tier2-boundary/f16-placement-boundaries.test.ts';
import { collector as t2_f17 } from './tier2-boundary/f17-aggregates-boundaries.test.ts';
import { collector as t2_f18 } from './tier2-boundary/f18-suite-boundaries.test.ts';
import { collector as t2_f19 } from './tier2-boundary/f19-pass-boundaries.test.ts';
import { collector as t2_f20 } from './tier2-boundary/f20-adversarial-boundaries.test.ts';

// Dynamic imports for Tier 3
import { collector as t3_rbac } from './tier3-combinatorial/auth-rbac-matrix.test.ts';
import { collector as t3_ai } from './tier3-combinatorial/ai-pipeline-chaining.test.ts';
import { collector as t3_plc } from './tier3-combinatorial/placement-workflow-matrix.test.ts';
import { collector as t3_iso } from './tier3-combinatorial/cross-role-data-isolation.test.ts';

// Dynamic imports for Tier 4
import { collector as t4_s1 } from './tier4-scenarios/scenario1-student-career-journey.test.ts';
import { collector as t4_s2 } from './tier4-scenarios/scenario2-placement-officer-lifecycle.test.ts';
import { collector as t4_s3 } from './tier4-scenarios/scenario3-faculty-mentor-intervention.test.ts';
import { collector as t4_s4 } from './tier4-scenarios/scenario4-admin-institutional-audit.test.ts';
import { collector as t4_s5 } from './tier4-scenarios/scenario5-resilient-mentor-offline-fallback.test.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SuiteDescriptor {
  featureId: string;
  featureName: string;
  tier: number;
  collector: any;
}

const SUITES: SuiteDescriptor[] = [
  // Tier 1: Feature Tests
  { featureId: 'F01', featureName: 'Client Build Blocker Resolution', tier: 1, collector: t1_f01 },
  { featureId: 'F02', featureName: 'Profile Isolation & Fallback Removal', tier: 1, collector: t1_f02 },
  { featureId: 'F03', featureName: 'Backend RBAC & Session Auth', tier: 1, collector: t1_f03 },
  { featureId: 'F04', featureName: 'Private Chat & Data Protection', tier: 1, collector: t1_f04 },
  { featureId: 'F05', featureName: 'Vector Pathway Matching (AI.SIMILARITY)', tier: 1, collector: t1_f05 },
  { featureId: 'F06', featureName: 'Calibrated Readiness Scoring (ML.PREDICT)', tier: 1, collector: t1_f06 },
  { featureId: 'F07', featureName: 'Explainable Key Drivers (AI.KEY_DRIVERS)', tier: 1, collector: t1_f07 },
  { featureId: 'F08', featureName: 'Topological Roadmap Sequencing (AI.FORECAST)', tier: 1, collector: t1_f08 },
  { featureId: 'F09', featureName: 'Native AI/ML Evaluation Suite', tier: 1, collector: t1_f09 },
  { featureId: 'F10', featureName: 'Resilient AI Career Mentor Gateway', tier: 1, collector: t1_f10 },
  { featureId: 'F11', featureName: 'Demo Artifact & Quick-Fill Removal', tier: 1, collector: t1_f11 },
  { featureId: 'F12', featureName: 'Professional SaaS Terminology', tier: 1, collector: t1_f12 },
  { featureId: 'F13', featureName: 'Honest Data States & Empty States', tier: 1, collector: t1_f13 },
  { featureId: 'F14', featureName: 'Accessible Design & Placement Contrast', tier: 1, collector: t1_f14 },
  { featureId: 'F15', featureName: 'Placement Drive Deadline & Validation', tier: 1, collector: t1_f15 },
  { featureId: 'F16', featureName: 'Role-Aware Placement & Management Views', tier: 1, collector: t1_f16 },
  { featureId: 'F17', featureName: 'Genuine Institutional Aggregates', tier: 1, collector: t1_f17 },
  { featureId: 'F18', featureName: 'Dual-Track E2E Test Suite', tier: 1, collector: t1_f18 },
  { featureId: 'F19', featureName: 'E2E Test Suite Pass Readiness', tier: 1, collector: t1_f19 },
  { featureId: 'F20', featureName: 'Adversarial Coverage Hardening (Tier 5)', tier: 1, collector: t1_f20 },

  // Tier 2: Boundary Tests
  { featureId: 'F01', featureName: 'Build & Route Boundaries', tier: 2, collector: t2_f01 },
  { featureId: 'F02', featureName: 'Profile Isolation Boundaries', tier: 2, collector: t2_f02 },
  { featureId: 'F03', featureName: 'RBAC & Auth Boundaries', tier: 2, collector: t2_f03 },
  { featureId: 'F04', featureName: 'Private Chat Boundaries', tier: 2, collector: t2_f04 },
  { featureId: 'F05', featureName: 'Vector Pathway Boundaries', tier: 2, collector: t2_f05 },
  { featureId: 'F06', featureName: 'Readiness Scoring Boundaries', tier: 2, collector: t2_f06 },
  { featureId: 'F07', featureName: 'Key Drivers Boundaries', tier: 2, collector: t2_f07 },
  { featureId: 'F08', featureName: 'Roadmap Sequencing Boundaries', tier: 2, collector: t2_f08 },
  { featureId: 'F09', featureName: 'Model Metrics Boundaries', tier: 2, collector: t2_f09 },
  { featureId: 'F10', featureName: 'AI Mentor Gateway Boundaries', tier: 2, collector: t2_f10 },
  { featureId: 'F11', featureName: 'Auth Form Validation Boundaries', tier: 2, collector: t2_f11 },
  { featureId: 'F12', featureName: 'Professional Terminology Boundaries', tier: 2, collector: t2_f12 },
  { featureId: 'F13', featureName: 'Honest Empty State Boundaries', tier: 2, collector: t2_f13 },
  { featureId: 'F14', featureName: 'Design Token Contrast Boundaries', tier: 2, collector: t2_f14 },
  { featureId: 'F15', featureName: 'Placement Deadline Boundaries', tier: 2, collector: t2_f15 },
  { featureId: 'F16', featureName: 'Placement Management Boundaries', tier: 2, collector: t2_f16 },
  { featureId: 'F17', featureName: 'Institutional Aggregates Boundaries', tier: 2, collector: t2_f17 },
  { featureId: 'F18', featureName: 'Test Infrastructure Boundaries', tier: 2, collector: t2_f18 },
  { featureId: 'F19', featureName: 'Pass Robustness Boundaries', tier: 2, collector: t2_f19 },
  { featureId: 'F20', featureName: 'Adversarial Attack Boundaries', tier: 2, collector: t2_f20 },

  // Tier 3: Combinatorial Tests
  { featureId: 'T3-RBAC', featureName: 'Auth & RBAC Pairwise Matrix', tier: 3, collector: t3_rbac },
  { featureId: 'T3-AI', featureName: 'AI Pipeline Chaining (Similarity -> Roadmap -> Scoring)', tier: 3, collector: t3_ai },
  { featureId: 'T3-PLC', featureName: 'Placement Workflow Pairwise Matrix', tier: 3, collector: t3_plc },
  { featureId: 'T3-ISO', featureName: 'Cross-Role Multi-User Data Isolation Matrix', tier: 3, collector: t3_iso },

  // Tier 4: Real-World Scenarios
  { featureId: 'T4-S1', featureName: 'Scenario 1: Student Career-Readiness Journey', tier: 4, collector: t4_s1 },
  { featureId: 'T4-S2', featureName: 'Scenario 2: Placement Officer Campus Drive Lifecycle', tier: 4, collector: t4_s2 },
  { featureId: 'T4-S3', featureName: 'Scenario 3: Faculty Mentor Cohort Advising & Intervention', tier: 4, collector: t4_s3 },
  { featureId: 'T4-S4', featureName: 'Scenario 4: Institution Admin Curriculum & AI Analytics Audit', tier: 4, collector: t4_s4 },
  { featureId: 'T4-S5', featureName: 'Scenario 5: Resilient Offline Career Guidance Fallback', tier: 4, collector: t4_s5 }
];

async function main() {
  const args = process.argv.slice(2);
  let filterTier: number | null = null;
  let filterFeature: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tier' && args[i + 1]) {
      filterTier = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--feature' && args[i + 1]) {
      filterFeature = args[i + 1].toUpperCase();
      i++;
    } else if (args[i] === '--help') {
      console.log(`
CareerBridge E2E Master Test Runner
Usage:
  npx tsx tests/runner.ts                  Run all tests across Tiers 1-4
  npx tsx tests/runner.ts --tier 1         Run Tier 1 only
  npx tsx tests/runner.ts --tier 2         Run Tier 2 only
  npx tsx tests/runner.ts --tier 3         Run Tier 3 only
  npx tsx tests/runner.ts --tier 4         Run Tier 4 only
  npx tsx tests/runner.ts --feature F02    Run tests for Feature F02
      `);
      process.exit(0);
    }
  }

  console.log('================================================================');
  console.log('       CAREERBRIDGE E2E DUAL-TRACK TEST SUITE RUNNER           ');
  console.log('================================================================\n');

  try {
    await ensureServerRunning();
  } catch (err: any) {
    console.error('❌ Failed to connect to or spawn CareerBridge server:', err.message);
    process.exit(1);
  }

  let selectedSuites = SUITES;
  if (filterTier !== null) {
    selectedSuites = selectedSuites.filter(s => s.tier === filterTier);
  }
  if (filterFeature !== null) {
    selectedSuites = selectedSuites.filter(s => s.featureId.toUpperCase() === filterFeature);
  }

  console.log(`\n📋 Executing ${selectedSuites.length} test suites...\n`);

  const suiteResults: FeatureSuiteResult[] = [];
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const startTime = Date.now();

  for (const suite of selectedSuites) {
    api.clearToken();
    process.stdout.write(`[Tier ${suite.tier}] [${suite.featureId}] ${suite.featureName}: `);
    const result: FeatureSuiteResult = await suite.collector.run(suite.featureId, suite.featureName, suite.tier);
    suiteResults.push(result);
    totalTests += result.total;
    totalPassed += result.passed;
    totalFailed += result.failed;

    if (result.failed === 0) {
      console.log(`✓ ${result.passed}/${result.total} passed`);
    } else {
      console.log(`✗ ${result.passed}/${result.total} passed (${result.failed} FAILED)`);
      for (const t of result.results) {
        if (t.status === 'FAIL') {
          console.log(`    ❌ ${t.name}: ${t.error}`);
        }
      }
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);

  // Group stats by Tier
  const tierStats: Record<number, { total: number; passed: number; failed: number }> = {
    1: { total: 0, passed: 0, failed: 0 },
    2: { total: 0, passed: 0, failed: 0 },
    3: { total: 0, passed: 0, failed: 0 },
    4: { total: 0, passed: 0, failed: 0 }
  };

  for (const r of suiteResults) {
    if (!tierStats[r.tier]) tierStats[r.tier] = { total: 0, passed: 0, failed: 0 };
    tierStats[r.tier].total += r.total;
    tierStats[r.tier].passed += r.passed;
    tierStats[r.tier].failed += r.failed;
  }

  console.log('\n================================================================');
  console.log('                     TEST EXECUTION SUMMARY                     ');
  console.log('================================================================');
  console.log(`Execution Time: ${durationSec}s`);
  console.log(`Target Base URL: ${CONFIG.baseUrl}`);
  console.log('----------------------------------------------------------------');
  console.log('Tier                     | Total | Passed | Failed | Pass Rate  ');
  console.log('-------------------------+-------+--------+--------+------------');
  for (let t = 1; t <= 4; t++) {
    const s = tierStats[t];
    const rate = s.total > 0 ? ((s.passed / s.total) * 100).toFixed(1) : 'N/A';
    const tierName =
      t === 1 ? 'Tier 1 (Feature Tests) ' :
      t === 2 ? 'Tier 2 (Boundary Tests)' :
      t === 3 ? 'Tier 3 (Combinatorial) ' :
                'Tier 4 (Real-World)    ';
    console.log(`${tierName} | ${String(s.total).padStart(5)} | ${String(s.passed).padStart(6)} | ${String(s.failed).padStart(6)} | ${rate.padStart(9)}%`);
  }
  console.log('-------------------------+-------+--------+--------+------------');
  const overallRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : 'N/A';
  console.log(`OVERALL TOTAL            | ${String(totalTests).padStart(5)} | ${String(totalPassed).padStart(6)} | ${String(totalFailed).padStart(6)} | ${overallRate.padStart(9)}%`);
  console.log('================================================================\n');

  // Write results JSON
  const resultsPayload = {
    timestamp: new Date().toISOString(),
    durationSeconds: parseFloat(durationSec),
    baseUrl: CONFIG.baseUrl,
    summary: {
      totalTests,
      totalPassed,
      totalFailed,
      passRate: parseFloat(overallRate)
    },
    tierStats,
    suites: suiteResults
  };

  const resultsPath = path.join(__dirname, 'test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(resultsPayload, null, 2), 'utf-8');
  console.log(`📁 Detailed results saved to: ${resultsPath}`);

  stopServer();

  if (totalFailed > 0) {
    console.log(`\n⚠️  Execution completed with ${totalFailed} failing test(s).`);
    // Exit with 1 to indicate failing tests
    process.exit(1);
  } else {
    console.log('\n🎉 ALL TESTS PASSED CLEANLY (100% PASS RATE).');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error during test execution:', err);
  stopServer();
  process.exit(1);
});
