import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  MapPin,
  Cpu,
  Sprout,
  HeartPulse,
  TrendingUp,
  Layout,
  Users,
  BarChart3,
  QrCode,
  Smartphone,
  CheckCircle2,
  Lock,
  ChevronRight,
  Atom
} from 'lucide-react';

interface HomePageProps {
  onOpenMobileCompanion: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenMobileCompanion }) => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleLaunchApp = () => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'mentor') navigate('/mentor');
      else navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const disciplines = [
    {
      title: 'Engineering & Tech',
      role: 'AI & Data Engineering',
      growth: '+36% High Demand',
      salary: '$125,000 / ₹16-32 LPA',
      icon: Cpu,
      color: 'blue'
    },
    {
      title: 'Agriculture & AgTech',
      role: 'Precision AgTech & IoT Specialist',
      growth: '+24% Growth',
      salary: '$82,000 / ₹8-16 LPA',
      icon: Sprout,
      color: 'emerald'
    },
    {
      title: 'Paramedical & Health',
      role: 'Clinical Health Informatics',
      growth: '+31% High Need',
      salary: '$92,000 / ₹11-22 LPA',
      icon: HeartPulse,
      color: 'rose'
    },
    {
      title: 'Commerce & FinTech',
      role: 'FinTech Quantitative Analyst',
      growth: '+25% Expanding',
      salary: '$115,000 / ₹14-28 LPA',
      icon: TrendingUp,
      color: 'amber'
    },
    {
      title: 'Design & Media',
      role: 'Product & UX Systems Designer',
      growth: '+22% Steady',
      salary: '$95,000 / ₹11-22 LPA',
      icon: Layout,
      color: 'purple'
    },
    {
      title: 'Arts & Pure Sciences',
      role: 'Computational Genomics Scientist',
      growth: '+29% High Growth',
      salary: '$105,000 / ₹14-26 LPA',
      icon: Atom,
      color: 'indigo'
    },
    {
      title: 'Law & Governance',
      role: 'Cyber Law & AI Policy Analyst',
      growth: '+32% Surging',
      salary: '$110,000 / ₹14-28 LPA',
      icon: ShieldCheck,
      color: 'rose'
    },
    {
      title: 'Hospitality & Tourism',
      role: 'Smart Hospitality & Revenue Mgr',
      growth: '+23% Strong',
      salary: '$82,000 / ₹9-18 LPA',
      icon: Award,
      color: 'amber'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-br dark:from-[#0c1427] dark:to-slate-900 p-8 sm:p-12 lg:p-16 shadow-xl text-center md:text-left">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>CAREER DEVELOPMENT PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Build the skills for your <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">next opportunity</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Career Confidence
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            A connected workspace to explore career options, understand your strengths, build in-demand skills, and prepare for placements with personalized learning plans and guided mentorship.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={handleLaunchApp}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>{user ? `Go to My Dashboard (${user.role})` : 'Sign in to your workspace'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate('/explore')}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <span>Explore careers</span>
            </button>

            <button
              onClick={onOpenMobileCompanion}
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-4 py-3.5 text-sm font-bold text-emerald-700 dark:text-emerald-300 transition-colors"
            >
              <QrCode className="h-4 w-4" />
              <span>Mobile companion</span>
            </button>
          </div>
        </div>
      </section>

      {/* Multi-Disciplinary Career Streams Showcase */}
      <section className="space-y-6">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Explore career pathways
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Discover opportunities across disciplines and industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {disciplines.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                onClick={() => navigate('/explore')}
                className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-3 transition-all hover:border-blue-500 hover:shadow-lg dark:hover:border-blue-500/50 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {d.title}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {d.role}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1 text-xs">
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">{d.growth}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">{d.salary}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Architectural Features Grid */}
      <section className="space-y-6">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Tools for every step of your career journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore, learn, practice, and prepare—all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Skills analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compares current verified student skills against target benchmarks. Classifies gaps into Mastered, Strong, Developing, and Critical Deficits.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Personal learning plan</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step *Learn → Practice → Build → Evaluate* progression with integrated query sandboxes, remedial loops, and portfolio project briefs.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">AI career coach</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              AI guidance that grounds responses in the student's actual degree, CGPA, target career, and top skill deficits rather than generic chatbot responses.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Career pathways</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Run "What-If" career scenarios to evaluate transferable skill overlaps, transition difficulty ratings, and custom bridge timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Stakeholder Triad */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            One workspace for your campus career journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Purpose-built tools for students, faculty mentors, and placement teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student */}
          <div className="rounded-2xl bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              For Students
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Clear, Actionable Readiness</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Daily "Next Best Action" (no searching)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Multidimensional Career Readiness Index</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Interactive sandbox practice drills</span>
              </li>
            </ul>
          </div>

          {/* Mentor */}
          <div className="rounded-2xl bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              For Faculty Mentors
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Proactive Student Guidance</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Cohort overview with career uncertainty flags</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Stalled progress & low readiness alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Direct intervention note dispatch</span>
              </li>
            </ul>
          </div>

          {/* Admin */}
          <div className="rounded-2xl bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              For Institution Teams
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Curriculum Gap Intelligence</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
                <span>Pattern detection (e.g. 62% stats deficits)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
                <span>Department-wide readiness benchmarking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
                <span>Institutional workshop recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="rounded-3xl border border-blue-200 dark:border-blue-900/80 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Take your next career step
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Sign in to access your personalized dashboard, learning plan, mentoring tools, and placement opportunities.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="rounded-xl bg-white hover:bg-slate-100 px-6 py-3 text-sm font-bold text-blue-600 shadow-lg transition-colors"
          >
            Open career workspace
          </button>
        </div>
      </section>
    </div>
  );
};
