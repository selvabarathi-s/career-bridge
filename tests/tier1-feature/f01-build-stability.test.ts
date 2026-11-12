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

// F01: Client Build Blocker Resolution
// Verify clean compilation, absence of broken/dangling imports, and production client bundle integrity.

collector.test('F01-T1-1: App.tsx has no dangling ReviewThreePage imports', () => {
  const appTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/App.tsx'), 'utf-8');
  assertNotIncludes(appTsx, 'ReviewThreePage', 'App.tsx must not import deleted ReviewThreePage');
  assertNotIncludes(appTsx, './pages/ReviewThreePage', 'App.tsx must not reference ./pages/ReviewThreePage');
});

collector.test('F01-T1-2: Sidebar.tsx has no dangling ReviewThreePage imports', () => {
  const sidebarTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/layout/Sidebar.tsx'), 'utf-8');
  assertNotIncludes(sidebarTsx, 'ReviewThreePage', 'Sidebar.tsx must not import ReviewThreePage');
  assertNotIncludes(sidebarTsx, 'Review 3', 'Sidebar.tsx navigation must not include Review 3 presentation link');
});

collector.test('F01-T1-3: Client package.json defines standard build scripts', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(CONFIG.clientPath, 'package.json'), 'utf-8'));
  assertTrue(Boolean(pkg.scripts?.build), 'Client package.json must define a build script');
  assertIncludes(pkg.scripts.build, 'vite build', 'Build script must execute vite build');
});

collector.test('F01-T1-4: Client production dist contains index.html and compiled bundles', () => {
  const distPath = path.join(CONFIG.clientPath, 'dist');
  assertTrue(fs.existsSync(distPath), 'Client dist folder must exist after build');
  assertTrue(fs.existsSync(path.join(distPath, 'index.html')), 'dist/index.html must exist');
  
  const files = fs.readdirSync(path.join(distPath, 'assets'));
  const hasJs = files.some(f => f.endsWith('.js'));
  const hasCss = files.some(f => f.endsWith('.css'));
  assertTrue(hasJs, 'Compiled assets must include JS bundle');
  assertTrue(hasCss, 'Compiled assets must include CSS stylesheet');
});

collector.test('F01-T1-5: Root routes in App.tsx map to existing page components', () => {
  const appTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/App.tsx'), 'utf-8');
  const requiredPages = [
    'HomePage',
    'LoginPage',
    'StudentDashboard',
    'CareerExplorer',
    'AdaptiveRoadmapPage',
    'AIMentorPage',
    'LivePlacementDrivesPage'
  ];
  for (const page of requiredPages) {
    assertIncludes(appTsx, page, `App.tsx must import and route to ${page}`);
  }
});
