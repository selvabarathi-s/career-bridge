import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config.ts';
import { api } from '../helpers/apiClient.ts';
import {
  TestCollector,
  assertTrue,
  assertFalse,
  assertNotIncludes,
  assertStatusCode
} from '../helpers/testAssertions.ts';

export const collector = new TestCollector();

// F11: Demo Artifact & Quick-Fill Removal
// Eliminate TEST_CREDENTIALS, pre-filled form states, test login cards, and mock APK alerts.

collector.test('F11-T1-1: LoginPage.tsx initializes email and password as empty strings', () => {
  const loginTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LoginPage.tsx'), 'utf-8');
  assertTrue(
    loginTsx.includes("const [email, setEmail] = useState('')") ||
    loginTsx.includes('const [email, setEmail] = useState("")'),
    'Email state must initialize empty'
  );
  assertTrue(
    loginTsx.includes("const [password, setPassword] = useState('')") ||
    loginTsx.includes('const [password, setPassword] = useState("")'),
    'Password state must initialize empty'
  );
});

collector.test('F11-T1-2: LoginPage.tsx contains no auto-filling demo credential cards', () => {
  const loginTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/pages/LoginPage.tsx'), 'utf-8');
  assertNotIncludes(loginTsx, 'quickFill', 'Must not have quickFill demo buttons');
  assertNotIncludes(loginTsx, 'Fill Demo Credentials', 'Must not have Fill Demo Credentials button');
  assertNotIncludes(loginTsx, 'Demo Student Login', 'Must not have Demo Student Login quick card');
});

collector.test('F11-T1-3: MobileCompanionModal.tsx contains no fake APK download alerts', () => {
  const modalTsx = fs.readFileSync(path.join(CONFIG.clientPath, 'src/components/mobile/MobileCompanionModal.tsx'), 'utf-8');
  assertNotIncludes(modalTsx, 'apkDownloadMockAlert', 'Must not have mock APK alerts');
  assertNotIncludes(modalTsx, 'alert("APK Downloaded")', 'Must not trigger mock alert popups');
});

collector.test('F11-T1-4: Submitting empty credentials to /api/auth/login returns 400 validation error', async () => {
  const res = await api.post('/api/auth/login', {
    email: '',
    password: ''
  });
  assertStatusCode(res.status, 400);
  assertFalse(res.data.success);
  assertTrue(Boolean(res.data.error), 'Must return an error message for empty login');
});

collector.test('F11-T1-5: Valid credentials successfully authenticate without requiring demo cards', async () => {
  const res = await api.post('/api/auth/login', {
    email: CONFIG.credentials.student.email,
    password: CONFIG.credentials.student.password,
    portalRole: 'student'
  });
  assertStatusCode(res.status, 200);
  assertTrue(res.data.success);
});
