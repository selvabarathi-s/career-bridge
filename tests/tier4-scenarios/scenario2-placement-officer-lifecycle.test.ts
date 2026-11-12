import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// Scenario 2: Placement Officer Campus Drive Lifecycle
// Tests complete placement cell workflow from drive creation through application shortlisting and analytics review.

collector.test('Scenario 2: Placement Officer Campus Drive Lifecycle', async () => {
  // Step 1: Sign in with placement officer account
  console.log('  [Step 1] Placement Cell sign in...');
  const loginRes = await api.post('/api/auth/login', {
    email: CONFIG.credentials.placement.email,
    password: CONFIG.credentials.placement.password,
    portalRole: 'placement_cell'
  });
  assertStatusCode(loginRes.status, 200);
  assertEqual(loginRes.data.user.role, 'placement_cell');
  api.setToken(loginRes.data.token);

  // Step 2: Create a new corporate recruitment drive
  console.log('  [Step 2] Corporate drive creation...');
  const futureDeadline = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
  const driveDate = new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0];
  const uniqueCompany = `Scenario2 Tech Solutions ${Date.now()}`;

  const createRes = await api.post('/api/placements/drives', {
    companyName: uniqueCompany,
    roleTitle: 'Full Stack Cloud Engineer',
    industry: 'Enterprise Software',
    ctcPackage: '14.5 LPA',
    jobType: 'Full-time',
    workLocation: 'Bangalore / Hybrid',
    driveDate,
    applicationDeadline: futureDeadline,
    status: 'active',
    eligibleDepartments: ['All Engineering Branches'],
    minCgpa: 7.0,
    minReadinessScore: 50,
    requiredSkills: ['Node.js', 'React', 'Cloud Architectures'],
    selectionProcess: ['Technical Assessment', 'Architecture Interview', 'HR Discussion'],
    hiringCount: 15
  });
  assertStatusCode(createRes.status, [200, 201]);
  assertTrue(createRes.data.success);
  const createdDrive = createRes.data.drive;
  assertTrue(Boolean(createdDrive.id));

  // Step 3: Verify drive appears in public placement opportunities listing
  console.log('  [Step 3] Drive publication verification...');
  const listRes = await api.get('/api/placements/drives');
  assertStatusCode(listRes.status, 200);
  const found = listRes.data.drives.some((d: any) => d.id === createdDrive.id);
  assertTrue(found, 'Created drive must appear in drives catalog');

  // Step 4: Student applies for the newly published drive
  console.log('  [Step 4] Student application submission...');
  const applyRes = await api.post(`/api/placements/drives/${createdDrive.id}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });
  assertStatusCode(applyRes.status, [200, 201]);
  assertTrue(applyRes.data.success);
  const applicationId = applyRes.data.application.id;

  // Step 5: Placement officer reviews student applications
  console.log('  [Step 5] Application review...');
  const appsRes = await api.get(`/api/placements/applications/drive/${createdDrive.id}`);
  assertStatusCode(appsRes.status, 200);
  const studentApp = appsRes.data.applications.find((a: any) => a.id === applicationId);
  assertTrue(Boolean(studentApp), 'Student application must be visible to placement coordinator');

  // Step 6: Placement officer advances candidate stage to 'shortlisted'
  console.log('  [Step 6] Candidate stage update...');
  const updateRes = await api.put(`/api/placements/applications/${applicationId}/status`, {
    status: 'shortlisted',
    feedback: 'Candidate has completed all prerequisite roadmap milestones'
  });
  assertStatusCode(updateRes.status, 200);
  assertEqual(updateRes.data.application.status, 'shortlisted');

  // Step 7: Placement officer inspects drive analytics
  console.log('  [Step 7] Placement analytics review...');
  const analyticsRes = await api.get('/api/placements/analytics');
  assertStatusCode(analyticsRes.status, 200);
  const summary = analyticsRes.data.summary || analyticsRes.data.analytics;
  assertTrue(summary.totalApplications >= 1);
});
