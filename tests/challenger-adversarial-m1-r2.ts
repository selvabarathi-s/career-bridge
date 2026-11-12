import { CONFIG } from './config.js';

interface TestResult {
  suite: string;
  id: string;
  description: string;
  passed: boolean;
  expectedStatus: number | number[];
  actualStatus: number;
  error?: string;
  details?: any;
}

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000';

async function req(path: string, options: {
  method?: string;
  token?: string;
  headers?: Record<string, string>;
  body?: any;
} = {}): Promise<{ status: number; data: any; raw: string }> {
  const url = `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined
  });

  const raw = await res.text();
  let data: any = null;
  try {
    data = JSON.parse(raw);
  } catch {
    data = raw;
  }

  return { status: res.status, data, raw };
}

async function loginUser(email: string, password = 'password123', portalRole?: string) {
  const res = await req('/api/auth/login', {
    method: 'POST',
    body: { email, password, portalRole }
  });
  return {
    status: res.status,
    token: res.data?.token,
    user: res.data?.user,
    profile: res.data?.profile
  };
}

async function runEmpiricalChallengerSuite() {
  console.log('='.repeat(80));
  console.log('CHALLENGER EMPIRICAL ADVERSARIAL STRESS TEST SUITE — M1 ITERATION 2');
  console.log('Target Server:', BASE_URL);
  console.log('Time:', new Date().toISOString());
  console.log('='.repeat(80));

  const results: TestResult[] = [];

  async function assertCase(
    suite: string,
    id: string,
    description: string,
    expectedStatus: number | number[],
    fn: () => Promise<{ status: number; pass: boolean; details?: any }>
  ) {
    try {
      const outcome = await fn();
      const statusMatches = Array.isArray(expectedStatus)
        ? expectedStatus.includes(outcome.status)
        : outcome.status === expectedStatus;
      const passed = statusMatches && outcome.pass;

      results.push({
        suite,
        id,
        description,
        passed,
        expectedStatus,
        actualStatus: outcome.status,
        details: outcome.details
      });

      const icon = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`[${icon}] ${id}: ${description} (HTTP ${outcome.status})`);
      if (!passed && outcome.details) {
        console.log(`   └─ Details: ${JSON.stringify(outcome.details)}`);
      }
    } catch (err: any) {
      results.push({
        suite,
        id,
        description,
        passed: false,
        expectedStatus,
        actualStatus: -1,
        error: err?.message || String(err)
      });
      console.log(`[💥 EXCEPTION] ${id}: ${description} -> ${err?.message}`);
    }
  }

  // Pre-acquire session tokens
  console.log('\n--- 1. Acquiring Test Sessions ---');
  const selvaSession = await loginUser('selva@college.edu', 'password123', 'student');
  const sabariSession = await loginUser('sabari@college.edu', 'password123', 'student');
  const mentorSession = await loginUser('balu.prasath@university.edu', 'password123', 'mentor');
  const placementSession = await loginUser('placement@college.edu', 'password123', 'placement_cell');
  const adminSession = await loginUser('admin@careerbridge.io', 'password123', 'admin');

  console.log(`Selva authenticated: ${Boolean(selvaSession.token)} (profile: ${selvaSession.profile?.id})`);
  console.log(`Sabari authenticated: ${Boolean(sabariSession.token)} (profile: ${sabariSession.profile?.id})`);
  console.log(`Mentor authenticated: ${Boolean(mentorSession.token)}`);
  console.log(`Placement authenticated: ${Boolean(placementSession.token)}`);
  console.log(`Admin authenticated: ${Boolean(adminSession.token)}`);

  // Baseline data capture
  const gokulBaseline = await req('/api/profiles/student-gokul');
  const selvaBaseline = await req('/api/profiles/student-selva');
  const selvaHistoryBaseline = await req('/api/ai-mentor/history/student-selva', { token: selvaSession.token });
  const baselineSelvaHistoryCount = selvaHistoryBaseline.data?.history?.length || 0;

  console.log(`Baseline Gokul CGPA: ${gokulBaseline.data?.profile?.cgpa}`);
  console.log(`Baseline Selva CGPA: ${selvaBaseline.data?.profile?.cgpa}`);
  console.log(`Baseline Selva History items: ${baselineSelvaHistoryCount}`);

  // =========================================================================
  // SUITE A: PUT /api/profiles/:id Adversarial Exploits
  // =========================================================================
  console.log('\n--- 2. PUT /api/profiles/:id Adversarial Exploits ---');

  await assertCase(
    'Profile Mutation',
    'EX-PROF-01',
    'Reject body containing spoofed profile ID targeting victim student (student-gokul)',
    400,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: { id: 'student-gokul', cgpa: 9.99, fullName: 'Attacked Gokul' }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Cannot modify profile ID or target another profile',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-02',
    'Verify victim (Gokul) profile was NOT modified after spoofed ID attack',
    200,
    async () => {
      const gokulAfter = await req('/api/profiles/student-gokul');
      const gokulIntact = gokulAfter.data?.profile?.cgpa === gokulBaseline.data?.profile?.cgpa &&
                          gokulAfter.data?.profile?.fullName === gokulBaseline.data?.profile?.fullName;
      return {
        status: gokulAfter.status,
        pass: gokulIntact,
        details: { expectedCgpa: gokulBaseline.data?.profile?.cgpa, actualCgpa: gokulAfter.data?.profile?.cgpa }
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-03',
    'Reject body containing spoofed userId targeting another user (user-gokul)',
    400,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: { userId: 'user-gokul' }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Cannot modify user ID',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-04',
    'Reject body with id: null (spoofed null identity)',
    400,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: { id: null }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Cannot modify profile ID or target another profile',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-05',
    'Reject body with empty string id: "" (spoofed empty identity)',
    400,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: { id: '' }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Cannot modify profile ID or target another profile',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-06',
    'Direct IDOR: Attacker attempts to update Gokuls URL directly with Selvas token',
    403,
    async () => {
      const res = await req('/api/profiles/student-gokul', {
        method: 'PUT',
        token: selvaSession.token,
        body: { bio: 'Hacked by Selva' }
      });
      return {
        status: res.status,
        pass: res.status === 403 && res.data?.error === 'Insufficient role permissions',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-07',
    'Faculty Mentor role cannot directly mutate student profiles',
    403,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: mentorSession.token,
        body: { cgpa: 9.99 }
      });
      return {
        status: res.status,
        pass: res.status === 403 && res.data?.error === 'Insufficient role permissions',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-08',
    'Placement Cell role cannot directly mutate student profiles',
    403,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: placementSession.token,
        body: { cgpa: 9.99 }
      });
      return {
        status: res.status,
        pass: res.status === 403 && res.data?.error === 'Insufficient role permissions',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-09',
    'Unauthenticated profile update attempt returns 401 Unauthorized',
    401,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        body: { cgpa: 9.99 }
      });
      return {
        status: res.status,
        pass: res.status === 401 && res.data?.error === 'Authentication required',
        details: res.data
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-10',
    'Attempt to inject fabricated readinessScore is stripped and dynamically recalculated',
    200,
    async () => {
      // Attacker attempts to inject fabricated score of 100% and career_ready
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: {
          readinessScore: {
            overallPercentage: 100,
            status: 'career_ready',
            technicalScore: 100
          }
        }
      });
      // Verification: the recalculated score must NOT be 100 unless skills/cgpa actually produce it
      const recalculated = res.data?.profile?.readinessScore;
      const notFabricated = recalculated && recalculated.overallPercentage < 100;
      return {
        status: res.status,
        pass: res.status === 200 && notFabricated,
        details: { returnedReadiness: recalculated }
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-11',
    'Defensive handling: malformed skills/projects arrays do not crash server',
    200,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: {
          skills: 'not-an-array-string',
          projects: { invalid: 'object' }
        }
      });
      const validArrays = Array.isArray(res.data?.profile?.skills) && Array.isArray(res.data?.profile?.projects);
      return {
        status: res.status,
        pass: res.status === 200 && validArrays,
        details: { skillsIsArray: validArrays }
      };
    }
  );

  await assertCase(
    'Profile Mutation',
    'EX-PROF-12',
    'Legitimate profile update with matching profile ID succeeds',
    200,
    async () => {
      const res = await req('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaSession.token,
        body: {
          id: 'student-selva',
          userId: 'user-selva',
          bio: 'Verified Empirical Profile'
        }
      });
      const pass = res.status === 200 &&
                   res.data?.profile?.id === 'student-selva' &&
                   res.data?.profile?.bio === 'Verified Empirical Profile';
      return {
        status: res.status,
        pass,
        details: res.data?.profile
      };
    }
  );

  // =========================================================================
  // SUITE B: POST /api/ai-mentor/chat Adversarial Exploits
  // =========================================================================
  console.log('\n--- 3. POST /api/ai-mentor/chat Adversarial Exploits ---');

  await assertCase(
    'Chat Injection',
    'EX-CHAT-01',
    'Reject unauthenticated chat injection attempt with 401 Unauthorized',
    401,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        body: {
          studentId: 'student-selva',
          message: 'CRITICAL_EXPLOIT_UNAUTH_CHAT_INJECTION'
        }
      });
      return {
        status: res.status,
        pass: res.status === 401 && res.data?.error === 'Authentication required',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-02',
    'Reject cross-student chat pollution: Sabari targeting Selvas chat with 403 Forbidden',
    403,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: sabariSession.token,
        body: {
          studentId: 'student-selva',
          message: 'CRITICAL_EXPLOIT_CROSS_STUDENT_TAMPER'
        }
      });
      return {
        status: res.status,
        pass: res.status === 403 && res.data?.error === 'Insufficient role permissions',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-03',
    'Reject chat targeting non-existent student profile with 404 Not Found',
    404,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: selvaSession.token,
        body: {
          studentId: 'student-phantom-nonexistent-9999',
          message: 'Phantom student query'
        }
      });
      return {
        status: res.status,
        pass: res.status === 404 && res.data?.error === 'Profile not found',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-04',
    'Reject Faculty Mentor attempting to inject messages into student private chat with 403',
    403,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: mentorSession.token,
        body: {
          studentId: 'student-selva',
          message: 'CRITICAL_EXPLOIT_MENTOR_INJECTION'
        }
      });
      return {
        status: res.status,
        pass: res.status === 403 && res.data?.error === 'Insufficient role permissions',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-05',
    'Reject Placement Cell attempting to inject messages into student private chat with 403',
    403,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: placementSession.token,
        body: {
          studentId: 'student-selva',
          message: 'CRITICAL_EXPLOIT_PLACEMENT_INJECTION'
        }
      });
      return {
        status: res.status,
        pass: res.status === 403 && res.data?.error === 'Insufficient role permissions',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-06',
    'Reject empty message payload with 400 Bad Request',
    400,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: selvaSession.token,
        body: {
          studentId: 'student-selva',
          message: ''
        }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Please enter a message.',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-07',
    'Reject whitespace-only message payload with 400 Bad Request',
    400,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: selvaSession.token,
        body: {
          studentId: 'student-selva',
          message: '     \n\t   '
        }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Please enter a message.',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-08',
    'Reject non-string message payload (e.g. number/object) with 400 Bad Request',
    400,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: selvaSession.token,
        body: {
          studentId: 'student-selva',
          message: { maliciousPayload: 12345 }
        }
      });
      return {
        status: res.status,
        pass: res.status === 400 && res.data?.error === 'Please enter a message.',
        details: res.data
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-09',
    'Chat history verification: NO exploit strings leaked into Selvas chat history',
    200,
    async () => {
      const historyRes = await req('/api/ai-mentor/history/student-selva', { token: selvaSession.token });
      const history: any[] = historyRes.data?.history || [];
      const historyText = JSON.stringify(history);

      const unauthLeaked = historyText.includes('CRITICAL_EXPLOIT_UNAUTH_CHAT_INJECTION');
      const crossLeaked = historyText.includes('CRITICAL_EXPLOIT_CROSS_STUDENT_TAMPER');
      const mentorLeaked = historyText.includes('CRITICAL_EXPLOIT_MENTOR_INJECTION');
      const placementLeaked = historyText.includes('CRITICAL_EXPLOIT_PLACEMENT_INJECTION');

      const clean = !unauthLeaked && !crossLeaked && !mentorLeaked && !placementLeaked;
      return {
        status: historyRes.status,
        pass: clean,
        details: {
          unauthLeaked,
          crossLeaked,
          mentorLeaked,
          placementLeaked,
          historyCount: history.length
        }
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-10',
    'Authenticated student chatting without studentId automatically binds to own profile',
    200,
    async () => {
      const res = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: selvaSession.token,
        body: {
          message: 'What skills should I prioritize next?'
        }
      });
      const hasMessage = Boolean(res.data?.message);
      return {
        status: res.status,
        pass: res.status === 200 && hasMessage,
        details: { hasMessage }
      };
    }
  );

  await assertCase(
    'Chat Injection',
    'EX-CHAT-11',
    'Non-student (Admin) querying general guidance does NOT pollute student chat histories',
    200,
    async () => {
      const selvaBefore = await req('/api/ai-mentor/history/student-selva', { token: selvaSession.token });
      const selvaCountBefore = selvaBefore.data?.history?.length || 0;

      const adminChat = await req('/api/ai-mentor/chat', {
        method: 'POST',
        token: adminSession.token,
        body: {
          message: 'What is cloud microservices architecture?'
        }
      });

      const selvaAfter = await req('/api/ai-mentor/history/student-selva', { token: selvaSession.token });
      const selvaCountAfter = selvaAfter.data?.history?.length || 0;

      const unpolluted = selvaCountBefore === selvaCountAfter;
      return {
        status: adminChat.status,
        pass: adminChat.status === 200 && unpolluted,
        details: { selvaCountBefore, selvaCountAfter, adminStatus: adminChat.status }
      };
    }
  );

  // Summary
  console.log('\n' + '='.repeat(80));
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`CHALLENGER SUMMARY: ${passed} / ${total} TESTS PASSED (${failed} FAILED)`);
  console.log('='.repeat(80));

  if (failed > 0) {
    console.log('\n❌ FAILING CHALLENGES:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`- [${r.id}] ${r.description} -> Expected ${JSON.stringify(r.expectedStatus)}, got ${r.actualStatus}`);
      if (r.error) console.log(`  Error: ${r.error}`);
      if (r.details) console.log(`  Details: ${JSON.stringify(r.details)}`);
    });
  }

  return { total, passed, failed, results };
}

runEmpiricalChallengerSuite()
  .then(res => {
    if (res.failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Test run failed:', err);
    process.exit(1);
  });
