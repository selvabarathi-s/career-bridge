export interface TestCaseResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  durationMs: number;
  error?: string;
}

export interface FeatureSuiteResult {
  featureId: string;
  featureName: string;
  tier: number;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  results: TestCaseResult[];
}

export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export function assertTrue(condition: boolean, message = 'Expected condition to be true'): void {
  if (!condition) {
    throw new AssertionError(message);
  }
}

export function assertFalse(condition: boolean, message = 'Expected condition to be false'): void {
  if (condition) {
    throw new AssertionError(message);
  }
}

export function assertEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) {
    const detail = message ? `${message} - ` : '';
    throw new AssertionError(`${detail}Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
  }
}

export function assertNotEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual === expected) {
    const detail = message ? `${message} - ` : '';
    throw new AssertionError(`${detail}Expected value to NOT equal ${JSON.stringify(expected)}`);
  }
}

export function assertNumberInRange(value: number, min: number, max: number, message?: string): void {
  if (typeof value !== 'number' || Number.isNaN(value) || value < min || value > max) {
    const detail = message ? `${message} - ` : '';
    throw new AssertionError(`${detail}Expected ${value} to be in range [${min}, ${max}]`);
  }
}

export function assertIncludes(haystack: string | any[], needle: any, message?: string): void {
  if (typeof haystack === 'string') {
    if (!haystack.includes(needle)) {
      const detail = message ? `${message} - ` : '';
      throw new AssertionError(`${detail}Expected string to include "${needle}"`);
    }
  } else if (Array.isArray(haystack)) {
    if (!haystack.includes(needle)) {
      const detail = message ? `${message} - ` : '';
      throw new AssertionError(`${detail}Expected array to include ${JSON.stringify(needle)}`);
    }
  }
}

export function assertNotIncludes(haystack: string | any[], needle: any, message?: string): void {
  if (typeof haystack === 'string') {
    if (haystack.includes(needle)) {
      const detail = message ? `${message} - ` : '';
      throw new AssertionError(`${detail}Expected string to NOT include "${needle}"`);
    }
  } else if (Array.isArray(haystack)) {
    if (haystack.includes(needle)) {
      const detail = message ? `${message} - ` : '';
      throw new AssertionError(`${detail}Expected array to NOT include ${JSON.stringify(needle)}`);
    }
  }
}

export function assertStatusCode(actual: number, expected: number | number[], message?: string): void {
  const valid = Array.isArray(expected) ? expected.includes(actual) : actual === expected;
  if (!valid) {
    const detail = message ? `${message} - ` : '';
    throw new AssertionError(`${detail}Expected HTTP status ${JSON.stringify(expected)}, but got ${actual}`);
  }
}

export class TestCollector {
  private tests: Array<{ name: string; fn: () => Promise<void> | void }> = [];

  test(name: string, fn: () => Promise<void> | void): void {
    this.tests.push({ name, fn });
  }

  async run(featureId: string, featureName: string, tier: number): Promise<FeatureSuiteResult> {
    const results: TestCaseResult[] = [];
    let passed = 0;
    let failed = 0;

    for (const t of this.tests) {
      const start = Date.now();
      try {
        await t.fn();
        const durationMs = Date.now() - start;
        results.push({ name: t.name, status: 'PASS', durationMs });
        passed++;
      } catch (err: any) {
        const durationMs = Date.now() - start;
        results.push({
          name: t.name,
          status: 'FAIL',
          durationMs,
          error: err?.message || String(err)
        });
        failed++;
      }
    }

    return {
      featureId,
      featureName,
      tier,
      total: this.tests.length,
      passed,
      failed,
      skipped: 0,
      results
    };
  }
}
