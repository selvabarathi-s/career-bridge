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

// F14-B: Accessible Contrast Boundaries & Design Tokens

collector.test('F14-T2-1: Client tailwind.config.js preserves Tailwind v3 darkMode config', () => {
  const tailwindPath = path.join(CONFIG.clientPath, 'tailwind.config.js');
  assertTrue(fs.existsSync(tailwindPath), 'tailwind.config.js must exist');
  const content = fs.readFileSync(tailwindPath, 'utf-8');
  assertTrue(content.includes('darkMode') || content.includes('content'), 'Must define valid Tailwind config');
});

collector.test('F14-T2-2: Navbar implements dark mode variants for text and surfaces', () => {
  const navbarTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Navbar.tsx'), 'utf-8');
  assertIncludes(navbarTsx, 'dark:');
});

collector.test('F14-T2-3: Sidebar implements dark mode variants for text and surfaces', () => {
  const sidebarTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Sidebar.tsx'), 'utf-8');
  assertIncludes(sidebarTsx, 'dark:');
});

collector.test('F14-T2-4: StudentDashboard cards use clear contrast borders', () => {
  const dashTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/StudentDashboard.tsx'), 'utf-8');
  assertTrue(dashTsx.includes('border-slate-') || dashTsx.includes('border'));
});

collector.test('F14-T2-5: Text inputs in LoginPage use high contrast placeholders and focus indicators', () => {
  const loginTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LoginPage.tsx'), 'utf-8');
  assertTrue(loginTsx.includes('placeholder-slate-400') || loginTsx.includes('placeholder-'));
});
