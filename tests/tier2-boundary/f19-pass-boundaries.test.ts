import {
  TestCollector,
  assertTrue,
  assertEqual
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F19-B: Pass Verification Boundaries & Execution Robustness

collector.test('F19-T2-1: Synchronous unhandled exceptions in tests are caught by collector', async () => {
  const c = new TestCollector();
  c.test('sync throw', () => {
    throw new Error('Sync failure');
  });
  const res = await c.run('F19', 'Sync failure test', 2);
  assertEqual(res.failed, 1);
  assertTrue(res.results[0].error?.includes('Sync failure') || false);
});

collector.test('F19-T2-2: Asynchronous rejected promises in tests are caught by collector', async () => {
  const c = new TestCollector();
  c.test('async reject', async () => {
    await Promise.reject(new Error('Async failure'));
  });
  const res = await c.run('F19', 'Async failure test', 2);
  assertEqual(res.failed, 1);
  assertTrue(res.results[0].error?.includes('Async failure') || false);
});

collector.test('F19-T2-3: Results array length strictly matches total tests count', async () => {
  const c = new TestCollector();
  for (let i = 0; i < 5; i++) {
    c.test(`test-${i}`, () => {});
  }
  const res = await c.run('F19', 'Count check', 2);
  assertEqual(res.results.length, 5);
  assertEqual(res.total, 5);
});

collector.test('F19-T2-4: Elapsed duration in test results is non-negative number', async () => {
  const c = new TestCollector();
  c.test('fast test', () => {});
  const res = await c.run('F19', 'Timing check', 2);
  assertTrue(typeof res.results[0].durationMs === 'number' && res.results[0].durationMs >= 0);
});

collector.test('F19-T2-5: Multiple assertions in a single test evaluate in sequence', () => {
  let step = 0;
  assertEqual(step, 0);
  step = 1;
  assertEqual(step, 1);
  step = 2;
  assertEqual(step, 2);
});
