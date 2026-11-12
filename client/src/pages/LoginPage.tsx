import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../../../shared/types';
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  Building2,
  Cpu,
  UserPlus,
  HelpCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Active portal tab: 'student' | 'mentor' | 'admin' | 'placement_cell'
  const [activePortal, setActivePortal] = useState<'student' | 'mentor' | 'admin' | 'placement_cell'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePortalSwitch = (portal: 'student' | 'mentor' | 'admin' | 'placement_cell') => {
    setActivePortal(portal);
    setErrorMsg(null);
  };

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your Login ID / Email and Password.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await login(email.trim(), password, activePortal);
      if (res.success) {
        if (activePortal === 'admin') {
          navigate('/admin');
        } else if (activePortal === 'mentor') {
          navigate('/mentor');
        } else if (activePortal === 'placement_cell') {
          navigate('/placement-cell');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please verify your credentials or selected portal.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const portalConfig = {
    student: {
      title: 'Student Learning Portal',
      subtitle: 'Personalized adaptive roadmaps, diagnostic assessments & AI career navigation',
      icon: UserCheck,
      color: 'blue',
      badgeBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
      idPlaceholder: 'student.name@college.edu or STU-2024-001'
    },
    mentor: {
      title: 'Faculty & Mentor Hub',
      subtitle: 'Cohort analytics, at-risk student flags & multi-disciplinary advising interventions',
      icon: GraduationCap,
      color: 'amber',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
      idPlaceholder: 'faculty.advisor@university.edu or FAC-ENG-904'
    },
    placement_cell: {
      title: 'Career & Placement Cell',
      subtitle: 'Manage recruitment drives, corporate partnerships, student shortlisting & offer tracking',
      icon: Building2,
      color: 'emerald',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
      idPlaceholder: 'placement@college.edu or PLC-DIR-001'
    },
    admin: {
      title: 'Institutional Administration',
      subtitle: 'Campus-wide curriculum gap intelligence, industry alignment & accreditation reports',
      icon: Building2,
      color: 'rose',
      badgeBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900',
      idPlaceholder: 'dean.admin@careerbridge.io or ADM-EXEC-001'
    }
  };

  const activeConfig = portalConfig[activePortal];
  const ActiveIcon = activeConfig.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 mb-2">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Sign in to your <span className="text-blue-600 dark:text-blue-400">workspace</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Choose your portal and sign in to continue your career journey.
        </p>
      </div>

      {/* Portal Selection Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/80 p-1.5 shadow-sm max-w-full overflow-x-auto">
          <button
            onClick={() => handlePortalSwitch('student')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
              activePortal === 'student'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-md border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => handlePortalSwitch('mentor')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
              activePortal === 'mentor'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-md border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Faculty / Mentor</span>
          </button>

          <button
            onClick={() => handlePortalSwitch('placement_cell')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
              activePortal === 'placement_cell'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Placement Cell</span>
          </button>

          <button
            onClick={() => handlePortalSwitch('admin')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
              activePortal === 'admin'
                ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-md border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Institution Admin</span>
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-lg mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-9 shadow-xl space-y-6">
        {/* Active Portal Header Banner */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ActiveIcon className={`h-4 w-4 text-${activeConfig.color}-600 dark:text-${activeConfig.color}-400`} />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {activeConfig.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {activeConfig.subtitle}
            </p>
          </div>
          <span className={`text-[10px] font-bold uppercase rounded-md px-2 py-0.5 border shrink-0 ${activeConfig.badgeBg}`}>
            {activePortal}
          </span>
        </div>

        {/* Error Notification Alert */}
        {errorMsg && (
          <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-3.5 text-xs text-rose-600 dark:text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between">
              <span>Institutional Email / ID:</span>
              <span className="text-[10px] text-slate-400 font-normal">e.g. name@college.edu</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder={activeConfig.idPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Password:</label>
              <button
                type="button"
                onClick={() => alert('For testing accounts, default password is "password123".')}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
              />
              <span>Remember my session</span>
            </label>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> 256-bit TLS Encrypted
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all"
          >
            <span>{submitting ? 'Authenticating Credentials...' : `Sign In to ${activeConfig.title}`}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Student Registration Callout */}
        {activePortal === 'student' && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              New undergraduate or postgraduate student?
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Create your student career profile & baseline</span>
            </Link>
          </div>
        )}
      </div>

      {/* Institutional Access & Enterprise Single Sign-On Notice */}
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-5 space-y-2.5 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Institutional Single Sign-On & Centralized Identity Governance</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          CareerBridge workspaces are provisioned by your institution's central IT directory. Enrolled students, faculty advisors, placement coordinators, and academic deans authenticate using institutional email credentials. For account provisioning, SSO troubleshooting, or password resets, contact your campus IT administrator.
        </p>
      </div>
    </div>
  );
};
