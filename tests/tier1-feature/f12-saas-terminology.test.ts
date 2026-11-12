import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertIncludes,
  assertNotIncludes
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F12: Professional SaaS Terminology
// Replace novelty jargon ("Arena", "Studio", "Directorate") across navigation, headers, and pages.

collector.test('F12-T1-1: Sidebar navigation uses direct professional terminology', () => {
  const sidebar = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Sidebar.tsx'), 'utf-8');
  assertIncludes(sidebar, 'Skill assessments', 'Sidebar should use "Skill assessments" instead of "Assessment Arena"');
  assertIncludes(sidebar, 'Learning resources', 'Sidebar should use "Learning resources"');
  assertIncludes(sidebar, 'Placement opportunities', 'Sidebar should use "Placement opportunities"');
  assertIncludes(sidebar, 'Institution insights', 'Sidebar should use "Institution insights"');
});

collector.test('F12-T1-2: Sidebar does NOT contain banned novelty labels ("Arena", "Studio")', () => {
  const sidebar = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Sidebar.tsx'), 'utf-8');
  assertNotIncludes(sidebar, 'Assessment Arena', 'Sidebar must not use "Assessment Arena"');
  assertNotIncludes(sidebar, 'Roadmap Studio', 'Sidebar must not use "Roadmap Studio"');
  assertNotIncludes(sidebar, 'Skill Gap Studio', 'Sidebar must not use "Skill Gap Studio"');
});

collector.test('F12-T1-3: Navbar branding uses clean enterprise SaaS title', () => {
  const navbar = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Navbar.tsx'), 'utf-8');
  assertNotIncludes(navbar, 'Hackathon Demo Mode', 'Navbar must not display demo mode badges');
  assertNotIncludes(navbar, 'Review 3 Directorate', 'Navbar must not reference review directorate');
});

collector.test('F12-T1-4: LivePlacementDrivesPage uses professional placement terms', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  assertNotIncludes(page, 'Placement Arena', 'Page must not use "Placement Arena"');
  assertNotIncludes(page, 'Corporate Arena', 'Page must not use "Corporate Arena"');
});

collector.test('F12-T1-5: StudentDashboard uses professional workspace hierarchy', () => {
  const dash = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/StudentDashboard.tsx'), 'utf-8');
  assertNotIncludes(dash, 'Game Arena', 'Dashboard must not refer to games or arenas');
  assertNotIncludes(dash, 'Gamer Level', 'Dashboard must not use gamified arcade labels');
});
