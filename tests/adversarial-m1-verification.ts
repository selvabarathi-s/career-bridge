import { CONFIG } from './config.js';

interface TestCaseResult {
  group: string;
  id: string;
  description: string;
  passed: boolean;
  expectedStatus: number | number[];
  actualStatus: number;
  details?: string;
  durationMs: number;
}

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000';

async function request(path: string, options: {
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

async function login(email: string, password = 'password123', portalRole?: string): Promise<{ token: string; user: any; profile: any; status: number }> {
  const res = await request('/api/auth/login', {
    method: 'POST',
    body: { email, password, portalRole }
  });
  return {
    token: res.data?.token,
    user: res.data?.user,
    profile: res.data?.profile,
    status: res.status
  };
}

async function runAdversarialM1Verification() {
  console.log('='.repeat(80));
  console.log('STARTING EMPIRICAL ADVERSARIAL VERIFICATION SUITE — MILESTONE 1');
  console.log(`Target: ${BASE_URL}`);
  console.log('Timestamp: ' + new Date().toISOString());
  console.log('='.repeat(80));

  const results: TestCaseResult[] = [];

  async function testCase(
    group: string,
    id: string,
    description: string,
    expectedStatus: number | number[],
    fn: () => Promise<{ status: number; assertion: boolean; details?: string }>
  ) {
    const start = Date.now();
    try {
      const res = await fn();
      const durationMs = Date.now() - start;
      const validStatus = Array.isArray(expectedStatus)
        ? expectedStatus.includes(res.status)
        : res.status === expectedStatus;
      const passed = validStatus && res.assertion;
      results.push({
        group,
        id,
        description,
        passed,
        expectedStatus,
        actualStatus: res.status,
        details: res.details,
        durationMs
      });
      const mark = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`[${mark}] ${id}: ${description} (${res.status}, ${durationMs}ms)`);
      if (!passed && res.details) {
        console.log(`   └─ Failure: ${res.details}`);
      }
    } catch (err: any) {
      const durationMs = Date.now() - start;
      results.push({
        group,
        id,
        description,
        passed: false,
        expectedStatus,
        actualStatus: -1,
        details: err?.message || String(err),
        durationMs
      });
      console.log(`[❌ EXCEPTION] ${id}: ${description} -> ${err?.message}`);
    }
  }

  // Pre-acquire tokens
  console.log('\n--- ACQUIRING TEST SESSIONS ---');
  const adminLogin = await login('admin@careerbridge.io', 'password123', 'admin');
  const mentorLogin = await login('balu.prasath@university.edu', 'password123', 'mentor');
  const placementLogin = await login('placement@college.edu', 'password123', 'placement_cell');
  const selvaLogin = await login('selva@college.edu', 'password123', 'student');
  const sabariLogin = await login('sabari@college.edu', 'password123', 'student');

  console.log(`Admin token: ${adminLogin.token?.slice(0, 20)}...`);
  console.log(`Mentor token: ${mentorLogin.token?.slice(0, 20)}...`);
  console.log(`Placement token: ${placementLogin.token?.slice(0, 20)}...`);
  console.log(`Selva token: ${selvaLogin.token?.slice(0, 20)}...`);
  console.log(`Sabari token: ${sabariLogin.token?.slice(0, 20)}...`);

  // =========================================================================
  // GROUP 1: Profile Isolation & Elimination of Student Fallback
  // =========================================================================
  console.log('\n--- GROUP 1: Profile Isolation & Elimination of Student Fallback ---');

  await testCase(
    'Profile Isolation',
    'TC-1.1',
    'Admin login returns profile: null and never leaks student data',
    200,
    async () => {
      const res = await login('admin@careerbridge.io', 'password123', 'admin');
      const assertion = res.profile === null && res.user?.role === 'admin';
      return {
        status: res.status,
        assertion,
        details: res.profile !== null ? `Leaked profile: ${JSON.stringify(res.profile)}` : undefined
      };
    }
  );

  await testCase(
    'Profile Isolation',
    'TC-1.2',
    'Mentor login returns profile: null and never leaks student data',
    200,
    async () => {
      const res = await login('balu.prasath@university.edu', 'password123', 'mentor');
      const assertion = res.profile === null && res.user?.role === 'mentor';
      return {
        status: res.status,
        assertion,
        details: res.profile !== null ? `Leaked profile: ${JSON.stringify(res.profile)}` : undefined
      };
    }
  );

  await testCase(
    'Profile Isolation',
    'TC-1.3',
    'Placement Cell login returns profile: null and never leaks student data',
    200,
    async () => {
      const res = await login('placement@college.edu', 'password123', 'placement_cell');
      const assertion = res.profile === null && res.user?.role === 'placement_cell';
      return {
        status: res.status,
        assertion,
        details: res.profile !== null ? `Leaked profile: ${JSON.stringify(res.profile)}` : undefined
      };
    }
  );

  await testCase(
    'Profile Isolation',
    'TC-1.4',
    'Student Selva login returns verified own profile (id: student-selva)',
    200,
    async () => {
      const res = await login('selva@college.edu', 'password123', 'student');
      const assertion = res.profile !== null && res.profile?.id === 'student-selva' && res.profile?.userId === 'user-selva';
      return {
        status: res.status,
        assertion,
        details: !assertion ? `Profile mismatch: id=${res.profile?.id}` : undefined
      };
    }
  );

  await testCase(
    'Profile Isolation',
    'TC-1.5',
    'Student Sabari login returns verified own profile (id: student-sabari, not student-selva)',
    200,
    async () => {
      const res = await login('sabari@college.edu', 'password123', 'student');
      const assertion = res.profile !== null && res.profile?.id === 'student-sabari' && res.profile?.id !== 'student-selva';
      return {
        status: res.status,
        assertion,
        details: !assertion ? `Profile mismatch: id=${res.profile?.id}` : undefined
      };
    }
  );

  await testCase(
    'Profile Isolation',
    'TC-1.6',
    'GET /api/profiles/NON_EXISTENT_ID returns 404 and does not fall back to profiles[0]',
    404,
    async () => {
      const res = await request('/api/profiles/NON_EXISTENT_STUDENT_ID_99999');
      const assertion = res.status === 404 && (!res.data?.profile || res.data?.error);
      return {
        status: res.status,
        assertion,
        details: res.status !== 404 ? `Returned ${res.status}: ${JSON.stringify(res.data)}` : undefined
      };
    }
  );

  // =========================================================================
  // GROUP 2: Simulator Fallback & Input Validation
  // =========================================================================
  console.log('\n--- GROUP 2: Simulator Fallback & Input Validation ---');

  await testCase(
    'Simulator',
    'TC-2.1',
    'POST /api/simulator/simulate with missing studentId returns 400',
    400,
    async () => {
      const res = await request('/api/simulator/simulate', {
        method: 'POST',
        body: { sourceCareerId: 'career-ai-ml', targetCareerId: 'career-data-analyst' }
      });
      const assertion = res.status === 400 && res.data?.error === 'Valid student profile required';
      return {
        status: res.status,
        assertion,
        details: `Returned: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Simulator',
    'TC-2.2',
    'POST /api/simulator/simulate with empty string studentId returns 400',
    400,
    async () => {
      const res = await request('/api/simulator/simulate', {
        method: 'POST',
        body: { studentId: '', sourceCareerId: 'career-ai-ml', targetCareerId: 'career-data-analyst' }
      });
      const assertion = res.status === 400 && res.data?.error === 'Valid student profile required';
      return {
        status: res.status,
        assertion,
        details: `Returned: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Simulator',
    'TC-2.3',
    'POST /api/simulator/simulate with non-existent studentId returns 404 (NEVER fallback to profiles[0])',
    404,
    async () => {
      const res = await request('/api/simulator/simulate', {
        method: 'POST',
        body: { studentId: 'non-existent-student-id-9999', sourceCareerId: 'career-ai-ml', targetCareerId: 'career-data-analyst' }
      });
      const assertion = res.status === 404 && res.data?.error === 'Valid student profile required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Simulator',
    'TC-2.4',
    'POST /api/simulator/simulate with valid studentId and valid career IDs returns 200 simulation result',
    200,
    async () => {
      const res = await request('/api/simulator/simulate', {
        method: 'POST',
        body: { studentId: 'student-selva', sourceCareerId: 'career-ai-engineer', targetCareerId: 'career-data-analyst' }
      });
      const assertion = res.status === 200 && Boolean(res.data?.result);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Simulator',
    'TC-2.5',
    'POST /api/simulator/simulate with valid studentId but invalid career ID returns 400',
    400,
    async () => {
      const res = await request('/api/simulator/simulate', {
        method: 'POST',
        body: { studentId: 'student-selva', sourceCareerId: 'non-existent-career-1', targetCareerId: 'career-data-analyst' }
      });
      const assertion = res.status === 400 && res.data?.error === 'Invalid source or target career ID';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  // =========================================================================
  // GROUP 3: RBAC Enforcement on Protected Mentor Endpoints
  // =========================================================================
  console.log('\n--- GROUP 3: RBAC Enforcement on Protected Mentor Endpoints ---');

  await testCase(
    'Mentor RBAC',
    'TC-3.1',
    'GET /api/mentor/students with NO auth returns 401 Unauthorized',
    401,
    async () => {
      const res = await request('/api/mentor/students');
      const assertion = res.status === 401 && res.data?.error === 'Authentication required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Mentor RBAC',
    'TC-3.2',
    'GET /api/mentor/students with invalid bearer token returns 401 Unauthorized',
    401,
    async () => {
      const res = await request('/api/mentor/students', { token: 'totally-fake-token-xyz' });
      const assertion = res.status === 401 && res.data?.error === 'Authentication required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Mentor RBAC',
    'TC-3.3',
    'GET /api/mentor/students as Student (Selva) returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/mentor/students', { token: selvaLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Mentor RBAC',
    'TC-3.4',
    'GET /api/mentor/students as Placement Cell returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/mentor/students', { token: placementLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Mentor RBAC',
    'TC-3.5',
    'GET /api/mentor/students as Mentor returns 200 OK with students array',
    200,
    async () => {
      const res = await request('/api/mentor/students', { token: mentorLogin.token });
      const assertion = res.status === 200 && Array.isArray(res.data?.students);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: count=${res.data?.students?.length}`
      };
    }
  );

  await testCase(
    'Mentor RBAC',
    'TC-3.6',
    'GET /api/mentor/students as Admin returns 200 OK with students array',
    200,
    async () => {
      const res = await request('/api/mentor/students', { token: adminLogin.token });
      const assertion = res.status === 200 && Array.isArray(res.data?.students);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: count=${res.data?.students?.length}`
      };
    }
  );

  // =========================================================================
  // GROUP 4: RBAC Enforcement on Protected Admin Endpoints
  // =========================================================================
  console.log('\n--- GROUP 4: RBAC Enforcement on Protected Admin Endpoints ---');

  await testCase(
    'Admin RBAC',
    'TC-4.1',
    'GET /api/admin/analytics with NO auth returns 401 Unauthorized',
    401,
    async () => {
      const res = await request('/api/admin/analytics');
      const assertion = res.status === 401 && res.data?.error === 'Authentication required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Admin RBAC',
    'TC-4.2',
    'GET /api/admin/analytics as Student returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/admin/analytics', { token: selvaLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Admin RBAC',
    'TC-4.3',
    'GET /api/admin/analytics as Mentor returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/admin/analytics', { token: mentorLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Admin RBAC',
    'TC-4.4',
    'GET /api/admin/analytics as Placement Cell returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/admin/analytics', { token: placementLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Admin RBAC',
    'TC-4.5',
    'GET /api/admin/analytics as Admin returns 200 OK with analytics metrics',
    200,
    async () => {
      const res = await request('/api/admin/analytics', { token: adminLogin.token });
      const assertion = res.status === 200 && Boolean(res.data?.metrics);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data?.metrics)}`
      };
    }
  );

  await testCase(
    'Admin RBAC',
    'TC-4.6',
    'GET /api/admin/model-metrics as Student returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/admin/model-metrics', { token: selvaLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Admin RBAC',
    'TC-4.7',
    'GET /api/admin/model-metrics as Admin returns 200 OK with evaluation metrics',
    200,
    async () => {
      const res = await request('/api/admin/model-metrics', { token: adminLogin.token });
      const assertion = res.status === 200 && Boolean(res.data?.metrics);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data?.metrics)}`
      };
    }
  );

  // =========================================================================
  // GROUP 5: Private Chat History & IDOR Protection
  // =========================================================================
  console.log('\n--- GROUP 5: Private Chat History & IDOR Protection ---');

  await testCase(
    'Chat Protection',
    'TC-5.1',
    'GET /api/ai-mentor/history/student-selva unauthenticated returns 401',
    401,
    async () => {
      const res = await request('/api/ai-mentor/history/student-selva');
      const assertion = res.status === 401 && res.data?.error === 'Authentication required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Chat Protection',
    'TC-5.2',
    'GET /api/ai-mentor/history/student-selva as Sabari (different student) returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/ai-mentor/history/student-selva', { token: sabariLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Chat Protection',
    'TC-5.3',
    'GET /api/ai-mentor/history/student-selva as Mentor returns 403 Forbidden (cross-role chat isolation)',
    403,
    async () => {
      const res = await request('/api/ai-mentor/history/student-selva', { token: mentorLogin.token });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Chat Protection',
    'TC-5.4',
    'GET /api/ai-mentor/history/student-selva as Selva himself (owner) returns 200 OK',
    200,
    async () => {
      const res = await request('/api/ai-mentor/history/student-selva', { token: selvaLogin.token });
      const assertion = res.status === 200 && Array.isArray(res.data?.history);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: history count=${res.data?.history?.length}`
      };
    }
  );

  await testCase(
    'Chat Protection',
    'TC-5.5',
    'GET /api/ai-mentor/history/student-selva as Admin returns 200 OK (administrative audit)',
    200,
    async () => {
      const res = await request('/api/ai-mentor/history/student-selva', { token: adminLogin.token });
      const assertion = res.status === 200 && Array.isArray(res.data?.history);
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: history count=${res.data?.history?.length}`
      };
    }
  );

  // =========================================================================
  // GROUP 6: Profile Mutation IDOR Protection
  // =========================================================================
  console.log('\n--- GROUP 6: Profile Mutation IDOR Protection ---');

  await testCase(
    'Profile IDOR',
    'TC-6.1',
    'PUT /api/profiles/student-selva unauthenticated returns 401',
    401,
    async () => {
      const res = await request('/api/profiles/student-selva', {
        method: 'PUT',
        body: { interests: ['Hacked'] }
      });
      const assertion = res.status === 401 && res.data?.error === 'Authentication required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Profile IDOR',
    'TC-6.2',
    'PUT /api/profiles/student-selva as Sabari (different student) returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/profiles/student-selva', {
        method: 'PUT',
        token: sabariLogin.token,
        body: { interests: ['Sabari Tampered'] }
      });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Profile IDOR',
    'TC-6.3',
    'PUT /api/profiles/student-selva as Mentor returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/profiles/student-selva', {
        method: 'PUT',
        token: mentorLogin.token,
        body: { interests: ['Mentor Tampered'] }
      });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Profile IDOR',
    'TC-6.4',
    'PUT /api/profiles/student-selva as Selva (owner) returns 200 OK',
    200,
    async () => {
      const res = await request('/api/profiles/student-selva', {
        method: 'PUT',
        token: selvaLogin.token,
        body: { interests: ['AI', 'Data Science', 'Adaptive Learning'] }
      });
      const assertion = res.status === 200 && res.data?.success === true;
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: success=${res.data?.success}`
      };
    }
  );

  // =========================================================================
  // GROUP 7: Placement Candidate Status Mutation RBAC
  // =========================================================================
  console.log('\n--- GROUP 7: Placement Candidate Status Mutation RBAC ---');

  await testCase(
    'Placement RBAC',
    'TC-7.1',
    'PUT /api/placements/applications/app-001/status unauthenticated returns 401',
    401,
    async () => {
      const res = await request('/api/placements/applications/app-001/status', {
        method: 'PUT',
        body: { status: 'shortlisted' }
      });
      const assertion = res.status === 401 && res.data?.error === 'Authentication required';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Placement RBAC',
    'TC-7.2',
    'PUT /api/placements/applications/app-001/status as Student returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/placements/applications/app-001/status', {
        method: 'PUT',
        token: selvaLogin.token,
        body: { status: 'shortlisted' }
      });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Placement RBAC',
    'TC-7.3',
    'PUT /api/placements/applications/app-001/status as Mentor returns 403 Forbidden',
    403,
    async () => {
      const res = await request('/api/placements/applications/app-001/status', {
        method: 'PUT',
        token: mentorLogin.token,
        body: { status: 'shortlisted' }
      });
      const assertion = res.status === 403 && res.data?.error === 'Insufficient role permissions';
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  await testCase(
    'Placement RBAC',
    'TC-7.4',
    'PUT /api/placements/applications/app-001/status as Placement Cell passes RBAC (returns 404 for unknown app, NOT 401/403)',
    404,
    async () => {
      const res = await request('/api/placements/applications/non-existent-app-999/status', {
        method: 'PUT',
        token: placementLogin.token,
        body: { status: 'shortlisted' }
      });
      const assertion = res.status === 404; // Passed role check, failed object existence
      return {
        status: res.status,
        assertion,
        details: `Returned ${res.status}: ${JSON.stringify(res.data)}`
      };
    }
  );

  // =========================================================================
  // GROUP 8: Token Forgery and Header Boundary Stress Testing
  // =========================================================================
  console.log('\n--- GROUP 8: Token Forgery & Header Boundary Stress Testing ---');

  await testCase(
    'Token Security',
    'TC-8.1',
    'Authorization header with empty string returns 401',
    401,
    async () => {
      const res = await request('/api/mentor/students', {
        headers: { 'Authorization': '' }
      });
      const assertion = res.status === 401;
      return { status: res.status, assertion, details: `Returned ${res.status}` };
    }
  );

  await testCase(
    'Token Security',
    'TC-8.2',
    'Authorization: Bearer undefined returns 401',
    401,
    async () => {
      const res = await request('/api/mentor/students', {
        headers: { 'Authorization': 'Bearer undefined' }
      });
      const assertion = res.status === 401;
      return { status: res.status, assertion, details: `Returned ${res.status}` };
    }
  );

  await testCase(
    'Token Security',
    'TC-8.3',
    'Authorization: Bearer null returns 401',
    401,
    async () => {
      const res = await request('/api/mentor/students', {
        headers: { 'Authorization': 'Bearer null' }
      });
      const assertion = res.status === 401;
      return { status: res.status, assertion, details: `Returned ${res.status}` };
    }
  );

  await testCase(
    'Token Security',
    'TC-8.4',
    'Forged session token cb_session_fake_user_123456789 returns 401',
    401,
    async () => {
      const res = await request('/api/mentor/students', {
        headers: { 'Authorization': 'Bearer cb_session_fake_user_123456789' }
      });
      const assertion = res.status === 401;
      return { status: res.status, assertion, details: `Returned ${res.status}` };
    }
  );

  // Summary
  console.log('\n' + '='.repeat(80));
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`SUMMARY: ${passed} / ${total} tests PASSED (${failed} failed)`);
  console.log('='.repeat(80));

  if (failed > 0) {
    console.log('\nFAILED TESTS:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`- ${r.id} (${r.group}): ${r.description} -> Expected ${JSON.stringify(r.expectedStatus)}, got ${r.actualStatus}. ${r.details || ''}`);
    });
  }

  return { total, passed, failed, results };
}

runAdversarialM1Verification()
  .then(res => {
    if (res.failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Test runner error:', err);
    process.exit(1);
  });
