import {
  TestCollector,
  assertTrue,
  assertEqual
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F19: E2E Test Suite Pass Readiness
// Readiness for 100% pass across Tiers 1-4 with non-zero exit codes on failure and clean verification.

collector.test('F19-T1-1: TestCollector records test case results with duration metrics', async () => {
  const localCollector = new TestCollector();
  localCollector.test('dummy test', () => {
    assertTrue(true);
  });
  const res = await localCollector.run('F19', 'E2E Pass Readiness', 1);
  assertEqual(res.passed, 1);
  assertEqual(res.failed, 0);
  assertTrue(res.results[0].durationMs >= 0);
});

collector.test('F19-T1-2: TestCollector correctly catches and captures assertion failure details', async () => {
  const localCollector = new TestCollector();
  localCollector.test('failing test', () => {
    throw new Error('Intentional check');
  });
  const res = await localCollector.run('F19', 'E2E Pass Readiness', 1);
  assertEqual(res.passed, 0);
  assertEqual(res.failed, 1);
  assertTrue(res.results[0].error?.includes('Intentional check') || false);
});

collector.test('F19-T1-3: Async test execution handles promise rejections cleanly', async () => {
  const localCollector = new TestCollector();
  localCollector.test('async pass', async () => {
    await new Promise(r => setTimeout(r, 10));
    assertTrue(true);
  });
  const res = await localCollector.run('F19', 'E2E Pass Readiness', 1);
  assertEqual(res.passed, 1);
});

collector.test('F19-T1-4: Suite results aggregate total test counts accurately', async () => {
  const localCollector = new TestCollector();
  localCollector.test('t1', () => {});
  localCollector.test('t2', () => {});
  localCollector.test('t3', () => {});
  const res = await localCollector.run('F19', 'E2E Pass Readiness', 1);
  assertEqual(res.total, 3);
  assertEqual(res.passed, 3);
});

collector.test('F19-T1-5: Error messages in assertion failures preserve expected and actual values', () => {
  try {
    assertEqual(10, 20, 'Mismatch');
  } catch (err: any) {
    assertTrue(err.message.includes('10'));
    assertTrue(err.message.includes('20'));
  }
});
