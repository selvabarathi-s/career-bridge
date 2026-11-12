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

// Tier 3 Combinatorial: Placement Workflow Pairwise Matrix
// Multi-condition evaluation across [Drive Status] x [Deadline Expiration] x [Student Qualification].

collector.test('T3-PLC-1: [Active Drive] x [Future Deadline] x [Eligible Student] -> Application ACCEPTED (200 OK)', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `Matrix Eligible Corp ${Date.now()}`,
    roleTitle: 'Software Engineer',
    ctcPackage: '10 LPA',
    applicationDeadline: futureDeadline,
    status: 'active',
    minCgpa: 6.0,
    minReadinessScore: 40,
    eligibleDepartments: ['All Engineering Branches']
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, [200, 201]);
  assertTrue(applyRes.data.success);
});

collector.test('T3-PLC-2: [Active Drive] x [Past Deadline] x [Eligible Student] -> Application REJECTED (400 Deadline Passed)', async () => {
  const pastDeadline = new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `Matrix Past Deadline Corp ${Date.now()}`,
    roleTitle: 'Software Engineer',
    ctcPackage: '10 LPA',
    applicationDeadline: pastDeadline,
    status: 'active',
    minCgpa: 6.0,
    minReadinessScore: 40,
    eligibleDepartments: ['All Engineering Branches']
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'deadline');
});

collector.test('T3-PLC-3: [Active Drive] x [Future Deadline] x [Low CGPA Student] -> Application REJECTED (400 CGPA Cutoff)', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `Matrix Strict CGPA Corp ${Date.now()}`,
    roleTitle: 'R&D Fellow',
    ctcPackage: '30 LPA',
    applicationDeadline: futureDeadline,
    status: 'active',
    minCgpa: 9.85, // Cutoff above student's CGPA
    minReadinessScore: 40,
    eligibleDepartments: ['All Engineering Branches']
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'cgpa');
});

collector.test('T3-PLC-4: [Completed Drive] x [Future Deadline] x [Eligible Student] -> Application REJECTED (400 Concluded)', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `Matrix Concluded Corp ${Date.now()}`,
    roleTitle: 'Developer',
    ctcPackage: '12 LPA',
    applicationDeadline: futureDeadline,
    status: 'completed',
    minCgpa: 6.0,
    minReadinessScore: 40,
    eligibleDepartments: ['All Engineering Branches']
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'concluded');
});

collector.test('T3-PLC-5: [Active Drive] x [Future Deadline] x [Ineligible Department] -> Application REJECTED (400 Department Mismatch)', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `Matrix Civil Only Corp ${Date.now()}`,
    roleTitle: 'Structural Design Engineer',
    ctcPackage: '9 LPA',
    applicationDeadline: futureDeadline,
    status: 'active',
    minCgpa: 6.0,
    minReadinessScore: 40,
    eligibleDepartments: ['Civil Engineering Only'] // Excludes student's AI & Data Science
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'eligible');
});
