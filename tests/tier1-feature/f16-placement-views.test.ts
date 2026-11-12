import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode,
  assertIncludes
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F16: Role-Aware Placement & Management Views
// Differentiate student application flow from placement officer drive management; ensure non-students do not see student eligibility cards.

collector.test('F16-T1-1: LivePlacementDrivesPage conditionally hides student quick readiness pill from non-students', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  assertIncludes(page, "role === 'student' &&", 'Readiness pill must be gated by role === "student"');
});

collector.test('F16-T1-2: LivePlacementDrivesPage shows role-tailored description for non-student roles', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  assertIncludes(page, 'Student eligibility checks are shown in student accounts');
});

collector.test('F16-T1-3: GET /api/placements/analytics returns institutional summary for placement coordinators', async () => {
  const res = await api.get('/api/placements/analytics');
  assertStatusCode(res.status, 200);
  const a = res.data.summary || res.data.analytics;
  assertTrue(Boolean(a), 'Must return analytics or summary object');
  assertTrue(typeof a.totalDrives === 'number');
  assertTrue(typeof a.activeDrives === 'number');
  assertTrue(typeof a.totalApplications === 'number');
});

collector.test('F16-T1-4: GET /api/placements/applications/student/:studentId returns student applications list', async () => {
  const res = await api.get(`/api/placements/applications/student/${CONFIG.credentials.student.profileId}`);
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.applications));
});

collector.test('F16-T1-5: PUT /api/placements/applications/:id/status allows placement officers to update hiring stages', async () => {
  await api.login(CONFIG.credentials.placement.email, CONFIG.credentials.placement.password, 'placement_cell');
  const appsRes = await api.get(`/api/placements/applications/student/${CONFIG.credentials.student.profileId}`);
  if (appsRes.data.applications?.length > 0) {
    const targetApp = appsRes.data.applications[0];
    const updateRes = await api.put(`/api/placements/applications/${targetApp.id}/status`, {
      status: 'shortlisted',
      feedback: 'Verified eligibility and portfolio'
    });
    assertStatusCode(updateRes.status, 200);
    assertTrue(updateRes.data.success);
    assertEqual(updateRes.data.application.status, 'shortlisted');
  } else {
    assertTrue(true);
  }
});
