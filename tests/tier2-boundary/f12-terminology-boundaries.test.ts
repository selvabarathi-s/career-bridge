import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertNotIncludes
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F12-B: Professional Terminology Boundary Audits across UI Pages

collector.test('F12-T2-1: LoginPage does not contain arcade or gaming jargon', () => {
  const loginTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LoginPage.tsx'), 'utf-8');
  assertNotIncludes(loginTsx, 'Arcade', 'Login page must not contain Arcade');
  assertNotIncludes(loginTsx, 'Gamer', 'Login page must not contain Gamer');
});

collector.test('F12-T2-2: Navbar component does not contain "Directorate" jargon', () => {
  const navbarTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Navbar.tsx'), 'utf-8');
  assertNotIncludes(navbarTsx, 'Placement Directorate', 'Navbar must not use "Placement Directorate"');
  assertNotIncludes(navbarTsx, 'Academic Directorate', 'Navbar must not use "Academic Directorate"');
});

collector.test('F12-T2-3: AdminHubPage uses professional terminology for curriculum gap management', () => {
  const adminTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/AdminHubPage.tsx'), 'utf-8');
  assertNotIncludes(adminTsx, 'Hacker Mode', 'Admin page must not contain Hacker Mode');
  assertNotIncludes(adminTsx, 'Cheat Code', 'Admin page must not contain Cheat Code');
});

collector.test('F12-T2-4: MentorPortalPage uses professional advising terminology', () => {
  const mentorTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/MentorPortalPage.tsx'), 'utf-8');
  assertNotIncludes(mentorTsx, 'Boss Arena', 'Mentor page must not contain Boss Arena');
});

collector.test('F12-T2-5: RealTimeGuidancePage uses professional counseling titles', () => {
  const guidanceTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/RealTimeGuidancePage.tsx'), 'utf-8');
  assertNotIncludes(guidanceTsx, 'Fortune Teller', 'Guidance page must not use Fortune Teller');
});
