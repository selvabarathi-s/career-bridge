import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertNotIncludes,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F13: Honest Data States & Empty States
// Replace fabricated defaults (CGPA 8.50/8.4, readiness || 60%) with "Not available" and completion guidance.

collector.test('F13-T1-1: LivePlacementDrivesPage does not hardcode fabricated CGPA 8.50 default', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  assertNotIncludes(page, 'studentCgpa = 8.50', 'Placement page must not hardcode default studentCgpa = 8.50');
  assertNotIncludes(page, 'cgpa || 8.5', 'Placement page must not fallback to 8.5 CGPA');
});

collector.test('F13-T1-2: LivePlacementDrivesPage does not hardcode fabricated readiness 78% default', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  assertNotIncludes(page, 'readinessScore || 78', 'Placement page must not fallback to readiness 78%');
  assertNotIncludes(page, 'readinessPercentage = 78', 'Placement page must not assign fake 78% readiness');
});

collector.test('F13-T1-3: Sidebar.tsx does not fall back to fabricated readiness 60%', () => {
  const sidebar = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Sidebar.tsx'), 'utf-8');
  // Notice in current Sidebar.tsx line 45: `{profile?.readinessScore?.overallPercentage || 60}%`
  // An honest system displays "Not available" or "Pending diagnostic" rather than `|| 60%`
  assertNotIncludes(sidebar, '|| 60%', 'Sidebar must not invent a fallback 60% readiness score for incomplete profiles');
});

collector.test('F13-T1-4: GET /api/placements/drives returns genuine eligibility without mock fallback', async () => {
  const res = await api.get('/api/placements/drives');
  assertStatusCode(res.status, 200);
  assertTrue(Array.isArray(res.data.drives));
  for (const drive of res.data.drives) {
    assertTrue(typeof drive.minCgpa === 'number', 'Drive must have genuine minCgpa requirement');
    assertTrue(typeof drive.minReadinessScore === 'number', 'Drive must have genuine minReadinessScore requirement');
  }
});

collector.test('F13-T1-5: Applying without a verified CGPA returns honest validation error', async () => {
  const drivesRes = await api.get('/api/placements/drives');
  const drive = drivesRes.data.drives.find((d: any) => d.status === 'active');
  if (drive) {
    // Create a temporary profile without CGPA
    const res = await api.post(`/api/placements/drives/${drive.id}/apply`, {
      studentId: 'STU-INCOMPLETE-PROFILE'
    });
    // Must return 400 or 404 with honest explanation, never fabricated eligibility
    assertStatusCode(res.status, [400, 404]);
    assertTrue(Boolean(res.data.error));
  }
});
