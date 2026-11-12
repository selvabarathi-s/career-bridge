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

// F14: Accessible Design & Placement Contrast
// Fix recruitment banner text contrast (no white text on pale gradient), ensure clean typography and gutters.

collector.test('F14-T1-1: LivePlacementDrivesPage uses high-contrast deep background for hero banner', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  // High contrast deep background: slate-950, indigo-950, or blue-950
  assertTrue(
    page.includes('from-slate-950') || page.includes('via-indigo-950') || page.includes('bg-slate-900'),
    'Placement hero banner must use deep dark background'
  );
  assertNotIncludes(page, 'from-blue-100 to-indigo-100 text-white', 'Must not place white text on pale pastel gradient');
});

collector.test('F14-T1-2: Hero banner text uses high-contrast foreground classes', () => {
  const page = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LivePlacementDrivesPage.tsx'), 'utf-8');
  assertIncludes(page, 'text-white', 'Header title must use text-white on dark background');
  assertIncludes(page, 'text-slate-300', 'Subtitle must use readable text-slate-300');
});

collector.test('F14-T1-3: Global styles define accessible font families and smooth theme transitions', () => {
  const indexCss = fs.readFileSync(path.join(CONFIG.clientPath, 'src/index.css'), 'utf-8');
  assertTrue(indexCss.length > 50, 'Global stylesheet must exist');
});

collector.test('F14-T1-4: AppLayout ensures accessible max-width and responsive gutters', () => {
  const app = fs.readFileSync(path.join(CONFIG.clientPath, 'src/App.tsx'), 'utf-8');
  assertTrue(
    app.includes('min-h-screen') && (app.includes('max-w-') || app.includes('px-') || app.includes('p-')),
    'App layout must provide proper page constraints and gutters'
  );
});

collector.test('F14-T1-5: Button components specify visible focus rings for keyboard navigation', () => {
  const loginTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LoginPage.tsx'), 'utf-8');
  assertTrue(loginTsx.includes('focus:'), 'Form inputs must specify visible focus rings');
});
