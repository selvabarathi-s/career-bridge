import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertEqual,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// Scenario 3: Faculty Mentor Cohort Advising & At-Risk Intervention
// Tests complete mentor workflow from cohort review through intervention creation and resolution.

collector.test('Scenario 3: Faculty Mentor Cohort Advising & Intervention', async () => {
  // Step 1: Sign in with faculty mentor account
  console.log('  [Step 1] Mentor authentication...');
  const loginRes = await api.post('/api/auth/login', {
    email: CONFIG.credentials.mentor.email,
    password: CONFIG.credentials.mentor.password,
    portalRole: 'mentor'
  });
  assertStatusCode(loginRes.status, 200);
  assertEqual(loginRes.data.user.role, 'mentor');
  api.setToken(loginRes.data.token);

  // Step 2: Inspect assigned cohort students
  console.log('  [Step 2] Cohort inspection...');
  const cohortRes = await api.get('/api/mentor/students');
  assertStatusCode(cohortRes.status, 200);
  const students = cohortRes.data.students || cohortRes.data.cohort;
  assertTrue(Array.isArray(students));

  // Step 3: Create an advising intervention for student
  console.log('  [Step 3] Intervention creation...');
  const createRes = await api.post('/api/mentor/interventions', {
    studentId: CONFIG.credentials.student.profileId,
    reason: 'curriculum_pace',
    notes: 'Please schedule extra practice on microservice containers prior to campus recruitment.',
    status: 'open'
  });
  assertStatusCode(createRes.status, 200);
  assertTrue(createRes.data.success);
  const interventionId = createRes.data.intervention?.id;

  // Step 4: Verify mentor can view interventions
  console.log('  [Step 4] Mentor interventions list verification...');
  const mentorViewRes = await api.get('/api/mentor/interventions');
  assertStatusCode(mentorViewRes.status, 200);
  assertTrue(Array.isArray(mentorViewRes.data.interventions));

  // Step 5: Mentor updates intervention to resolved
  if (interventionId) {
    console.log('  [Step 5] Intervention resolution...');
    const updateRes = await api.post('/api/mentor/interventions', {
      studentId: CONFIG.credentials.student.profileId,
      reason: 'curriculum_pace',
      status: 'resolved',
      notes: 'Student completed hands-on container deployment tutorial'
    });
    assertStatusCode(updateRes.status, 200);
    assertTrue(updateRes.data.success);
  }
});
