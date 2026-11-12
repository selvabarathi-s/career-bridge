import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// Tier 3 Combinatorial: Auth & RBAC Pairwise Interaction Matrix
// Tests interactions across 4 primary institutional roles against role-sensitive routes.

const ROLES = [
  { role: 'student', creds: CONFIG.credentials.student },
  { role: 'mentor', creds: CONFIG.credentials.mentor },
  { role: 'placement_cell', creds: CONFIG.credentials.placement },
  { role: 'admin', creds: CONFIG.credentials.admin }
];

collector.test('T3-RBAC-1: Login matrix — all 4 roles receive valid tokens corresponding to registered role', async () => {
  for (const item of ROLES) {
    const res = await api.post('/api/auth/login', {
      email: item.creds.email,
      password: item.creds.password,
      portalRole: item.role
    });
    assertStatusCode(res.status, 200, `Login failed for role ${item.role}`);
    assertTrue(res.data.success);
    assertEqual(res.data.user.role, item.role);
    assertTrue(Boolean(res.data.token));
  }
});

collector.test('T3-RBAC-2: Role portal cross-validation — each role is rejected if attempting an unauthorized portal tab', async () => {
  // Test permutations: student -> admin portal, mentor -> placement portal, etc.
  const crossChecks = [
    { email: CONFIG.credentials.student.email, role: 'admin' },
    { email: CONFIG.credentials.mentor.email, role: 'student' },
    { email: CONFIG.credentials.placement.email, role: 'mentor' }
  ];

  for (const check of crossChecks) {
    const res = await api.post('/api/auth/login', {
      email: check.email,
      password: 'password123',
      portalRole: check.role
    });
    assertStatusCode(res.status, 403, `Must reject role mismatch for ${check.email} at ${check.role} portal`);
  }
});

collector.test('T3-RBAC-3: Session token isolation — different users receive distinct session tokens', async () => {
  const resStudent = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  const resAdmin = await api.post('/api/auth/login', {
    email: CONFIG.credentials.admin.email,
    password: CONFIG.credentials.admin.password,
    portalRole: 'admin'
  });

  assertTrue(resStudent.data.token !== resAdmin.data.token, 'Tokens must be distinct across user accounts');
});

collector.test('T3-RBAC-4: Endpoint accessibility matrix across public vs protected resources', async () => {
  // Public resources should be accessible without credentials
  const healthRes = await api.get('/api/health');
  assertStatusCode(healthRes.status, 200);

  const careersRes = await api.get('/api/careers');
  assertStatusCode(careersRes.status, 200);

  const drivesRes = await api.get('/api/placements/drives');
  assertStatusCode(drivesRes.status, 200);
});

collector.test('T3-RBAC-5: Admin analytics endpoint returns valid data structure when requested with admin token', async () => {
  await api.login(CONFIG.credentials.admin.email, CONFIG.credentials.admin.password, 'admin');
  const res = await api.get('/api/admin/analytics');
  assertStatusCode(res.status, 200);
  assertTrue(Boolean(res.data.metrics));
});
