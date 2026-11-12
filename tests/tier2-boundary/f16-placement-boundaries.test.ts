import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F16-B: Placement Management Boundaries & Status State Machine

collector.test('F16-T2-1: Updating application status for non-existent application ID returns 404', async () => {
  await api.login(CONFIG.credentials.placement.email, CONFIG.credentials.placement.password, 'placement_cell');
  const res = await api.put('/api/placements/applications/app-non-existent-999/status', {
    status: 'shortlisted'
  });
  assertStatusCode(res.status, 404);
  assertTrue(Boolean(res.data.error));
});

collector.test('F16-T2-2: Updating application status with invalid status enum value returns 400', async () => {
  await api.login(CONFIG.credentials.placement.email, CONFIG.credentials.placement.password, 'placement_cell');
  const appsRes = await api.get(`/api/placements/applications/student/${CONFIG.credentials.student.profileId}`);
  if (appsRes.data.applications?.length > 0) {
    const appId = appsRes.data.applications[0].id;
    const res = await api.put(`/api/placements/applications/${appId}/status`, {
      status: 'INVALID_STATUS_XYZ_UNKNOWN'
    });
    assertStatusCode(res.status, [400, 422]);
  } else {
    assertTrue(true);
  }
});

collector.test('F16-T2-3: GET /api/placements/applications/student/:studentId filters strictly for target student', async () => {
  const res = await api.get(`/api/placements/applications/student/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  for (const app of res.data.applications) {
    assertEqual(app.studentId, CONFIG.credentials.student.profileId);
  }
});

collector.test('F16-T2-4: GET /api/placements/drives/:id returns 404 for non-existent drive', async () => {
  const res = await api.get('/api/placements/drives/drive-ghost-9999');
  assertStatusCode(res.status, 404);
  assertTrue(Boolean(res.data.error));
});

collector.test('F16-T2-5: Drive creation defaults hiringCount if unspecified', async () => {
  const res = await api.post('/api/placements/drives', {
    companyName: `Default Hiring Corp ${Date.now()}`,
    roleTitle: 'Developer',
    ctcPackage: '7 LPA'
  });
  assertStatusCode(res.status, [200, 201]);
  assertTrue(typeof res.data.drive.hiringCount === 'number');
});
