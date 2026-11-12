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

// F15: Placement Drive Deadline & Validation
// Timezone-safe UTC deadline expiration check in backend and client; strictly disable actions for expired drives.

collector.test('F15-T1-1: GET /api/placements/drives returns drives with ISO deadline strings', async () => {
  const res = await api.get('/api/placements/drives');
  assertStatusCode(res.status, 200);
  for (const drive of res.data.drives) {
    assertTrue(Boolean(drive.applicationDeadline), 'Drive must have applicationDeadline');
    const deadlineDate = new Date(drive.applicationDeadline);
    assertTrue(!Number.isNaN(deadlineDate.getTime()), 'applicationDeadline must be valid date');
  }
});

collector.test('F15-T1-2: Applying to an expired drive returns 400 with deadline passed error', async () => {
  // Create or find an expired drive
  const pastDeadline = new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0];
  const driveDate = new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0];

  const createRes = await api.post('/api/placements/drives', {
    companyName: 'Expired Test Corp',
    roleTitle: 'Software Engineer',
    industry: 'Technology',
    ctcPackage: '12 LPA',
    jobType: 'Full-time',
    workLocation: 'Bangalore',
    driveDate,
    applicationDeadline: pastDeadline,
    status: 'active',
    eligibleDepartments: ['All Engineering Branches'],
    minCgpa: 6.0,
    minReadinessScore: 50,
    requiredSkills: ['Python'],
    selectionProcess: ['Interview']
  });

  const driveId = createRes.data.drive?.id;
  assertTrue(Boolean(driveId), 'Drive must be created');

  // Attempt to apply to the expired drive
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error, 'deadline', 'Error must state application deadline has passed');
});

collector.test('F15-T1-3: Active drive with future deadline allows eligible student to apply', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveDate = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

  const createRes = await api.post('/api/placements/drives', {
    companyName: `Future Test Corp ${Date.now()}`,
    roleTitle: 'Software Engineer',
    industry: 'Technology',
    ctcPackage: '10 LPA',
    jobType: 'Full-time',
    workLocation: 'Remote',
    driveDate,
    applicationDeadline: futureDeadline,
    status: 'active',
    eligibleDepartments: ['All Engineering Branches'],
    minCgpa: 6.0,
    minReadinessScore: 40,
    requiredSkills: ['Python'],
    selectionProcess: ['Interview']
  });

  const driveId = createRes.data.drive?.id;
  assertTrue(Boolean(driveId));

  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, [200, 201]);
  assertTrue(applyRes.data.success);
});

collector.test('F15-T1-4: Duplicate application submission for the same drive is rejected with 400', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveDate = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

  const createRes = await api.post('/api/placements/drives', {
    companyName: `Dup Test Corp ${Date.now()}`,
    roleTitle: 'Software Engineer',
    industry: 'Technology',
    ctcPackage: '10 LPA',
    driveDate,
    applicationDeadline: futureDeadline,
    status: 'active',
    eligibleDepartments: ['All Engineering Branches'],
    minCgpa: 6.0,
    minReadinessScore: 40,
    requiredSkills: ['Python']
  });

  const driveId = createRes.data.drive?.id;
  // First application
  await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  // Second application
  const dupRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(dupRes.status, 400);
  assertIncludes(dupRes.data.error, 'already', 'Error must reject duplicate application');
});

collector.test('F15-T1-5: Applying to a completed drive is rejected with 400', async () => {
  const pastDeadline = new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0];
  const driveDate = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

  const createRes = await api.post('/api/placements/drives', {
    companyName: `Completed Drive Corp ${Date.now()}`,
    roleTitle: 'Software Engineer',
    industry: 'Technology',
    ctcPackage: '8 LPA',
    driveDate,
    applicationDeadline: pastDeadline,
    status: 'completed',
    eligibleDepartments: ['All Engineering Branches'],
    minCgpa: 6.0,
    minReadinessScore: 40,
    requiredSkills: ['Python']
  });

  const driveId = createRes.data.drive?.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.studentId
  });

  assertStatusCode(applyRes.status, 400);
});
