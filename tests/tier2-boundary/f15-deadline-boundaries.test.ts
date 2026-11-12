import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertStatusCode,
  assertIncludes
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F15-B: Placement Drive Deadline Boundaries & Eligibility Cutoffs

collector.test('F15-T2-1: POST /api/placements/drives rejects missing companyName or roleTitle with 400', async () => {
  const res = await api.post('/api/placements/drives', {
    companyName: '',
    roleTitle: ''
  });
  assertStatusCode(res.status, 400);
  assertIncludes(res.data.error.toLowerCase(), 'required');
});

collector.test('F15-T2-2: Student with CGPA below drive cutoff is rejected with 400', async () => {
  // Create high-cutoff drive (CGPA 9.95)
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `High Cutoff Corp ${Date.now()}`,
    roleTitle: 'Chief Scientist',
    ctcPackage: '45 LPA',
    applicationDeadline: futureDeadline,
    minCgpa: 9.95, // Above standard student CGPA
    minReadinessScore: 50,
    eligibleDepartments: ['All Engineering Branches']
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'cgpa');
});

collector.test('F15-T2-3: Student with readiness below cutoff is rejected with 400', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `High Readiness Corp ${Date.now()}`,
    roleTitle: 'Principal Architect',
    ctcPackage: '50 LPA',
    applicationDeadline: futureDeadline,
    minCgpa: 6.0,
    minReadinessScore: 100, // Strictly above student readiness (99)
    eligibleDepartments: ['All Engineering Branches']
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'readiness');
});

collector.test('F15-T2-4: Student from non-eligible branch is rejected with 400', async () => {
  const futureDeadline = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const driveRes = await api.post('/api/placements/drives', {
    companyName: `Aero Exclusive Corp ${Date.now()}`,
    roleTitle: 'Aerospace Propulsion Engineer',
    ctcPackage: '20 LPA',
    applicationDeadline: futureDeadline,
    minCgpa: 6.0,
    minReadinessScore: 50,
    eligibleDepartments: ['Aerospace Engineering Only'] // Excludes AI & Data Science
  });

  const driveId = driveRes.data.drive.id;
  const applyRes = await api.post(`/api/placements/drives/${driveId}/apply`, {
    studentId: CONFIG.credentials.student.profileId
  });

  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error.toLowerCase(), 'eligible');
});

collector.test('F15-T2-5: Applying without studentId returns 400 studentId required', async () => {
  const drivesRes = await api.get('/api/placements/drives');
  const drive = drivesRes.data.drives[0];
  const applyRes = await api.post(`/api/placements/drives/${drive.id}/apply`, {});
  assertStatusCode(applyRes.status, 400);
  assertIncludes(applyRes.data.error, 'studentId');
});
