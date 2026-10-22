import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Career, Skill } from '../../../shared/types';
import {
  Compass,
  User,
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  Flame,
  ShieldCheck,
  Eye,
  EyeOff,
  Building2,
  ChevronRight,
  Cpu,
  Sprout,
  HeartPulse,
  TrendingUp,
  Layout,
  Atom,
  Clock,
  Target,
  Zap,
  Check,
  BrainCircuit,
  BarChart3
} from 'lucide-react';

// Stream and Discipline taxonomy definition
interface StreamOption {
  id: string;
  name: string;
  degreeName: string;
  defaultCareerId: string;
  suggestedSkills: string[];
}

const DISCIPLINE_DATA: Record<string, {
  label: string;
  desc: string;
  icon: any;
  color: string;
  streams: StreamOption[];
}> = {
  engineering: {
    label: 'Engineering & Technology',
    desc: 'Computer Science, AI, Electronics, Mechanical, Civil & Biotech',
    icon: Cpu,
    color: 'blue',
    streams: [
      {
        id: 'cse_it',
        name: 'Computer Science & Engineering / IT',
        degreeName: 'B.Tech / B.E. Computer Science & Engineering',
        defaultCareerId: 'career-data-analyst',
        suggestedSkills: ['skill-python', 'skill-sql', 'skill-cloud', 'skill-data-viz']
      },
      {
        id: 'ai_ds',
        name: 'Artificial Intelligence & Data Science',
        degreeName: 'B.Tech AI & Data Science',
        defaultCareerId: 'career-ai-engineer',
        suggestedSkills: ['skill-python', 'skill-stats', 'skill-ml', 'skill-sql']
      },
      {
        id: 'ece',
        name: 'Electronics & Communication (ECE)',
        degreeName: 'B.Tech Electronics & Communication Engineering',
        defaultCareerId: 'career-ai-engineer',
        suggestedSkills: ['skill-python', 'skill-soil-sensors', 'skill-stats']
      },
      {
        id: 'eee',
        name: 'Electrical & Electronics Engineering (EEE)',
        degreeName: 'B.Tech Electrical & Electronics Engineering',
        defaultCareerId: 'career-ai-engineer',
        suggestedSkills: ['skill-python', 'skill-sql', 'skill-cloud', 'skill-stats']
      },
      {
        id: 'mech',
        name: 'Mechanical & Robotics Engineering',
        degreeName: 'B.Tech Mechanical Engineering',
        defaultCareerId: 'career-data-analyst',
        suggestedSkills: ['skill-python', 'skill-stats', 'skill-data-viz']
      },
      {
        id: 'civil',
        name: 'Civil & Environmental Engineering',
        degreeName: 'B.Tech Civil Engineering',
        defaultCareerId: 'career-cloud-devops',
        suggestedSkills: ['skill-sql', 'skill-data-viz', 'skill-stats']
      }
    ]
  },
  agriculture: {
    label: 'Agriculture & Allied Sciences',
    desc: 'Agronomy, Smart AgTech, Horticulture, Soil Science & IoT',
    icon: Sprout,
    color: 'emerald',
    streams: [
      {
        id: 'agronomy',
        name: 'B.Sc (Hons) Agronomy & Crop Sciences',
        degreeName: 'B.Sc (Hons) Agriculture',
        defaultCareerId: 'career-agtech-analyst',
        suggestedSkills: ['skill-soil-sensors', 'skill-smart-irrigation', 'skill-crop-analytics']
      },
      {
        id: 'agtech_iot',
        name: 'Agricultural Engineering & Smart IoT Telemetry',
        degreeName: 'B.Tech Agricultural & Farm Engineering',
        defaultCareerId: 'career-agtech-analyst',
        suggestedSkills: ['skill-soil-sensors', 'skill-smart-irrigation', 'skill-crop-analytics', 'skill-python']
      },
      {
        id: 'horticulture',
        name: 'Horticulture & Greenhouse Technology',
        degreeName: 'B.Sc Horticulture Science',
        defaultCareerId: 'career-agtech-analyst',
        suggestedSkills: ['skill-smart-irrigation', 'skill-crop-analytics', 'skill-data-viz']
      },
      {
        id: 'soil_science',
        name: 'Soil Science & Agricultural Chemistry',
        degreeName: 'B.Sc Soil & Water Conservation',
        defaultCareerId: 'career-agtech-analyst',
        suggestedSkills: ['skill-soil-sensors', 'skill-crop-analytics', 'skill-stats']
      },
      {
        id: 'agri_business',
        name: 'Agri-Business Management & Supply Chain',
        degreeName: 'B.Sc Agri-Business Management',
        defaultCareerId: 'career-sustainable-agronomy',
        suggestedSkills: ['skill-crop-analytics', 'skill-data-viz', 'skill-stats']
      }
    ]
  },
  paramedical: {
    label: 'Medical & Paramedical Sciences',
    desc: 'Medical Lab Tech (MLT), Nursing, Radiology, Pharma & Informatics',
    icon: HeartPulse,
    color: 'rose',
    streams: [
      {
        id: 'mlt',
        name: 'Medical Laboratory Technology (B.Sc MLT)',
        degreeName: 'B.Sc Medical Laboratory Technology',
        defaultCareerId: 'career-health-informatics',
        suggestedSkills: ['skill-biomed-diagnostics', 'skill-ehr-systems', 'skill-clinical-stats']
      },
      {
        id: 'nursing',
        name: 'Nursing Sciences & Clinical Care',
        degreeName: 'B.Sc Nursing Sciences',
        defaultCareerId: 'career-health-informatics',
        suggestedSkills: ['skill-ehr-systems', 'skill-biomed-diagnostics', 'skill-clinical-stats']
      },
      {
        id: 'radiology',
        name: 'Radiography & Medical Imaging (BMIT)',
        degreeName: 'B.Sc Medical Imaging Technology',
        defaultCareerId: 'career-health-informatics',
        suggestedSkills: ['skill-biomed-diagnostics', 'skill-ehr-systems', 'skill-sql']
      },
      {
        id: 'pharmacy',
        name: 'Pharmacy & Clinical Pharmacology (B.Pharm)',
        degreeName: 'Bachelor of Pharmacy (B.Pharm)',
        defaultCareerId: 'career-health-informatics',
        suggestedSkills: ['skill-clinical-stats', 'skill-ehr-systems', 'skill-sql']
      },
      {
        id: 'health_info',
        name: 'Health Information & Hospital Records',
        degreeName: 'B.Sc Health Informatics & Records',
        defaultCareerId: 'career-health-informatics',
        suggestedSkills: ['skill-ehr-systems', 'skill-sql', 'skill-clinical-stats', 'skill-data-viz']
      }
    ]
  },
  commerce: {
    label: 'Commerce, Finance & Business',
    desc: 'Accounting, FinTech, Quantitative Risk, Business Analytics & MBA',
    icon: TrendingUp,
    color: 'amber',
    streams: [
      {
        id: 'fintech_quant',
        name: 'FinTech & Quantitative Finance',
        degreeName: 'B.Com / BBA Financial Analytics',
        defaultCareerId: 'career-fintech-quant',
        suggestedSkills: ['skill-fin-modeling', 'skill-algo-trading', 'skill-stats', 'skill-python']
      },
      {
        id: 'accounting_finance',
        name: 'Corporate Accounting & Valuation',
        degreeName: 'B.Com (Hons) Accounting & Finance',
        defaultCareerId: 'career-fintech-quant',
        suggestedSkills: ['skill-fin-modeling', 'skill-fin-compliance', 'skill-sql']
      },
      {
        id: 'business_analytics',
        name: 'Business Analytics & Decision Science',
        degreeName: 'BBA Business Analytics & Intelligence',
        defaultCareerId: 'career-digital-growth-strat',
        suggestedSkills: ['skill-growth-analytics', 'skill-data-viz', 'skill-stats', 'skill-fin-modeling']
      },
      {
        id: 'regtech_compliance',
        name: 'Regulatory Tech, Audit & Risk Management',
        degreeName: 'B.Com Risk Management & Compliance',
        defaultCareerId: 'career-fintech-quant',
        suggestedSkills: ['skill-fin-compliance', 'skill-fin-modeling', 'skill-sql']
      }
    ]
  },
  design_media: {
    label: 'Design, Media & Creative Arts',
    desc: 'UI/UX Design, Product Systems, Interactive Media & Animation',
    icon: Layout,
    color: 'purple',
    streams: [
      {
        id: 'ui_ux',
        name: 'UI/UX & Digital Product Design',
        degreeName: 'B.Des Interaction & UX Design',
        defaultCareerId: 'career-uiux-systems-designer',
        suggestedSkills: ['skill-ux-research', 'skill-design-systems', 'skill-data-viz']
      },
      {
        id: 'interactive_media',
        name: 'Interactive Media & Visual Systems',
        degreeName: 'B.Sc Visual Communication & Media',
        defaultCareerId: 'career-game-vfx-developer',
        suggestedSkills: ['skill-game-engines', 'skill-design-systems', 'skill-ux-research']
      }
    ]
  },
  arts_science: {
    label: 'Arts & Pure Sciences',
    desc: 'Applied Mathematics, Statistics, Biotechnology & Quantitative Economics',
    icon: Atom,
    color: 'indigo',
    streams: [
      {
        id: 'math_stats',
        name: 'Applied Mathematics & Statistics',
        degreeName: 'B.Sc (Hons) Mathematics & Statistics',
        defaultCareerId: 'career-applied-math-quant',
        suggestedSkills: ['skill-stats', 'skill-python', 'skill-sql', 'skill-ml']
      },
      {
        id: 'biotech_science',
        name: 'Biotechnology & Computational Biology',
        degreeName: 'B.Sc Biotechnology & Bioinformatics',
        defaultCareerId: 'career-computational-biologist',
        suggestedSkills: ['skill-comp-bio', 'skill-python', 'skill-stats', 'skill-clinical-stats']
      },
      {
        id: 'economics',
        name: 'Quantitative Economics & Policy',
        degreeName: 'B.A. / B.Sc Quantitative Economics',
        defaultCareerId: 'career-applied-math-quant',
        suggestedSkills: ['skill-econometrics', 'skill-stats', 'skill-python', 'skill-fin-modeling']
      }
    ]
  },
  law_governance: {
    label: 'Law, Policy & Governance',
    desc: 'Cyber Law, GDPR Privacy, AI Ethics & Technology Policy',
    icon: ShieldCheck,
    color: 'rose',
    streams: [
      {
        id: 'cyber_law_privacy',
        name: 'Cyber Law, GDPR & Data Privacy',
        degreeName: 'B.A. LL.B (Hons) Cyber & Tech Law',
        defaultCareerId: 'career-cyber-law-analyst',
        suggestedSkills: ['skill-cyber-law', 'skill-ai-ethics', 'skill-cybersec']
      },
      {
        id: 'ai_governance',
        name: 'AI Ethics & Technology Governance',
        degreeName: 'LL.M / M.A. Technology Policy & Governance',
        defaultCareerId: 'career-cyber-law-analyst',
        suggestedSkills: ['skill-ai-ethics', 'skill-cyber-law', 'skill-data-viz']
      }
    ]
  },
  hospitality: {
    label: 'Hospitality & Tourism Management',
    desc: 'Hotel Revenue Management, Luxury Guest CX & Event Logistics',
    icon: Award,
    color: 'amber',
    streams: [
      {
        id: 'hotel_rev_mgmt',
        name: 'Smart Hospitality & Revenue Yield Management',
        degreeName: 'B.Sc / BBA Hotel & Tourism Management',
        defaultCareerId: 'career-smart-hospitality-mgr',
        suggestedSkills: ['skill-hospitality-pms', 'skill-event-logistics', 'skill-data-viz']
      },
      {
        id: 'luxury_event_ops',
        name: 'Event Logistics & Luxury Guest Experience',
        degreeName: 'BBA Luxury Brand & Event Management',
        defaultCareerId: 'career-smart-hospitality-mgr',
        suggestedSkills: ['skill-event-logistics', 'skill-hospitality-pms', 'skill-data-viz']
      }
    ]
  }
};

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Multi-step questionnaire (Steps 1 to 5)
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Questionnaire States
  // Step 1: Account
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState('');

  // Step 2: Discipline & Stream
  const [discipline, setDiscipline] = useState('engineering');
  const [streamId, setStreamId] = useState('cse_it');
  const [streamName, setStreamName] = useState('Computer Science & Engineering / IT');

  // Step 3: Academic Stage & Standing
  const [degree, setDegree] = useState('B.Tech Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState<number>(3);
  const [cgpa, setCgpa] = useState('8.4');

  // Step 4: Career Aspiration & Skills
  const [targetCareerId, setTargetCareerId] = useState('');
  const [availableCareers, setAvailableCareers] = useState<Career[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillProficiency, setSkillProficiency] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  // Step 5: Learning Commitments & Style
  const [learningStyle, setLearningStyle] = useState<'hands_on' | 'visual' | 'reading' | 'interactive'>('hands_on');
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  const [targetTimeline, setTargetTimeline] = useState<'immediate' | 'skill_building' | 'higher_studies'>('skill_building');

  // Load careers
  useEffect(() => {
    const loadCareers = async () => {
      try {
        const { careers } = await api.getCareers();
        setAvailableCareers(careers);
        const match = careers.find(c => c.discipline === discipline);
        if (match) {
          setTargetCareerId(match.id);
        }
      } catch (err) {
        console.error('Failed to load careers:', err);
      }
    };
    loadCareers();
  }, []);

  // Sync stream when discipline changes
  const handleDisciplineSelect = (discKey: string) => {
    setDiscipline(discKey);
    const discInfo = DISCIPLINE_DATA[discKey];
    if (discInfo && discInfo.streams.length > 0) {
      const firstStream = discInfo.streams[0];
      setStreamId(firstStream.id);
      setStreamName(firstStream.name);
      setDegree(firstStream.degreeName);
      setTargetCareerId(firstStream.defaultCareerId);
      setSelectedSkills(firstStream.suggestedSkills);
    }
  };

  const handleStreamSelect = (stream: StreamOption) => {
    setStreamId(stream.id);
    setStreamName(stream.name);
    setDegree(stream.degreeName);
    setTargetCareerId(stream.defaultCareerId);
    setSelectedSkills(stream.suggestedSkills);
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId) ? prev.filter(s => s !== skillId) : [...prev, skillId]
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !password) {
        setErrorMsg('Please complete all account credentials.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password should be at least 6 characters.');
        return;
      }
    }

    if (step === 4) {
      if (!targetCareerId) {
        setErrorMsg('Please select your target career goal from the choices below.');
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const handleFinalSubmit = async () => {
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await register({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        discipline,
        stream: streamName,
        specialization: streamName,
        degree: degree.trim(),
        yearOfStudy: Number(yearOfStudy),
        cgpa: parseFloat(cgpa) || 8.0,
        targetCareerId,
        studentId: studentId.trim() || undefined,
        priorSkills: selectedSkills,
        skillProficiencyLevel: skillProficiency,
        learningStyle,
        weeklyHoursCommitted: weeklyHours,
        targetTimeline
      });

      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(res.error || 'Failed to complete registration and questionnaire.');
        setSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with server.');
      setSubmitting(false);
    }
  };

  const currentDisciplineInfo = DISCIPLINE_DATA[discipline] || DISCIPLINE_DATA.engineering;
  const targetCareerObj = availableCareers.find(c => c.id === targetCareerId) || availableCareers[0];

  const allAvailableSkills: { id: string; name: string; category: string; discipline: string }[] = [
    { id: 'skill-python', name: 'Python Programming', category: 'Coding', discipline: 'engineering' },
    { id: 'skill-sql', name: 'SQL & Database Queries', category: 'Data', discipline: 'engineering' },
    { id: 'skill-stats', name: 'Applied Statistics', category: 'Math', discipline: 'engineering' },
    { id: 'skill-data-viz', name: 'Data Viz & Dashboards', category: 'Analytics', discipline: 'engineering' },
    { id: 'skill-ml', name: 'Machine Learning', category: 'AI', discipline: 'engineering' },
    { id: 'skill-cloud', name: 'Cloud & DevOps (AWS/Docker)', category: 'Cloud', discipline: 'engineering' },
    { id: 'skill-cybersec', name: 'Network & Cloud Security', category: 'Security', discipline: 'engineering' },
    { id: 'skill-soil-sensors', name: 'IoT Sensors & Telemetry', category: 'AgTech / Hardware', discipline: 'agriculture' },
    { id: 'skill-crop-analytics', name: 'GIS & Spatial Analytics', category: 'GIS / AgTech', discipline: 'agriculture' },
    { id: 'skill-smart-irrigation', name: 'Smart Farm Automation', category: 'Automation', discipline: 'agriculture' },
    { id: 'skill-hydroponics', name: 'Hydroponics & CEA Farming', category: 'Agriculture', discipline: 'agriculture' },
    { id: 'skill-food-qa', name: 'Food Safety & HACCP QA', category: 'FoodTech', discipline: 'agriculture' },
    { id: 'skill-ehr-systems', name: 'EHR & Health Protocols (HL7/FHIR)', category: 'HealthTech', discipline: 'paramedical' },
    { id: 'skill-clinical-stats', name: 'Clinical Biostatistics', category: 'Healthcare', discipline: 'paramedical' },
    { id: 'skill-biomed-diagnostics', name: 'Biomedical Diagnostic Systems', category: 'Diagnostics', discipline: 'paramedical' },
    { id: 'skill-telemed-protocols', name: 'Telemedicine & Remote Monitoring', category: 'Digital Health', discipline: 'paramedical' },
    { id: 'skill-physio-biomech', name: 'Biomechanics & Rehabilitation', category: 'Physiotherapy', discipline: 'paramedical' },
    { id: 'skill-fin-modeling', name: 'Financial Valuation & DCF', category: 'Finance', discipline: 'commerce' },
    { id: 'skill-algo-trading', name: 'Algorithmic Trading & Risk', category: 'FinTech', discipline: 'commerce' },
    { id: 'skill-fin-compliance', name: 'RegTech & AML Compliance', category: 'Compliance', discipline: 'commerce' },
    { id: 'skill-supply-chain-erp', name: 'Supply Chain Analytics & SAP', category: 'Logistics', discipline: 'commerce' },
    { id: 'skill-growth-analytics', name: 'Digital Growth & Retention', category: 'Marketing', discipline: 'commerce' },
    { id: 'skill-ux-research', name: 'User Research & Wireframing', category: 'Design', discipline: 'design_media' },
    { id: 'skill-design-systems', name: 'Figma & Design Systems', category: 'UI/UX', discipline: 'design_media' },
    { id: 'skill-game-engines', name: 'Unity & Unreal Engines', category: 'Gaming', discipline: 'design_media' },
    { id: 'skill-comp-bio', name: 'Computational Genomics & NGS', category: 'Bioinformatics', discipline: 'arts_science' },
    { id: 'skill-cyber-law', name: 'Cyber Law & GDPR Governance', category: 'Law', discipline: 'law_governance' },
    { id: 'skill-ai-ethics', name: 'AI Ethics & Model Auditing', category: 'Policy', discipline: 'law_governance' },
    { id: 'skill-hospitality-pms', name: 'Hospitality PMS & RevPAR Yield', category: 'Hospitality', discipline: 'hospitality' }
  ];

  const relevantSkills = allAvailableSkills.filter(sk =>
    sk.discipline === discipline ||
    currentDisciplineInfo.streams.some(s => s.suggestedSkills.includes(sk.id))
  );

  const relevantCareers = availableCareers.filter(c => c.discipline === discipline);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Top Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 mb-2">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Create your career profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Tell us about your interests, education and goals so we can tailor your career plan and learning recommendations.
        </p>
      </div>

      {/* Step Indicator Bar (5 Steps) */}
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {[
          { num: 1, label: 'Account' },
          { num: 2, label: 'Field & Stream' },
          { num: 3, label: 'Academics' },
          { num: 4, label: 'Career Goal' },
          { num: 5, label: 'Personalize' }
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step >= s.num
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-100 dark:ring-blue-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {s.label}
              </span>
            </div>
            {idx < 4 && (
              <div
                className={`flex-1 h-1 mx-1.5 rounded-full transition-all ${
                  step > s.num ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Questionnaire Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-9 shadow-xl space-y-6">
        {errorMsg && (
          <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-3.5 text-xs text-rose-600 dark:text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Account Creation */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Step 1 of 5
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Student Account & Institutional Identity
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your official name and institutional email to create your permanent student login.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Full Legal Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Institutional / College Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="alex.m@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Student ID / Roll No (Optional)</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. STU-2024-889"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Create Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
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
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <Link to="/login" className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
                Already have an account? Sign In
              </Link>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Proceed to Questionnaire</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Field & Stream Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Step 2 of 5: Question 1 & 2
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Select Your Academic Field & Stream
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Which broad discipline and specific academic branch are you currently studying or specializing in?
              </p>
            </div>

            {/* Question 1: Broad Field */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span>1. What is your broad academic field?</span>
                <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(DISCIPLINE_DATA).map(([key, item]) => {
                  const Icon = item.icon;
                  const isSelected = discipline === key;
                  return (
                    <div
                      key={key}
                      onClick={() => handleDisciplineSelect(key)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Specific Stream / Branch */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span>2. Select your specific branch / stream within {currentDisciplineInfo.label}:</span>
                <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentDisciplineInfo.streams.map((str) => {
                  const isSelected = streamId === str.id;
                  return (
                    <div
                      key={str.id}
                      onClick={() => handleStreamSelect(str)}
                      className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{str.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{str.degreeName}</div>
                      </div>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Continue to Academic Stage</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Academic Stage & Performance */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Step 3 of 5: Question 3 & 4
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Academic Standing & Progress Level
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tell us your current semester/year and academic score so we can assess pacing and difficulty.
              </p>
            </div>

            {/* Question 3: Current Year of Study */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                3. What year / semester are you currently in?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { yr: 1, label: '1st Year', sub: 'Freshman / Foundations' },
                  { yr: 2, label: '2nd Year', sub: 'Sophomore / Core Tech' },
                  { yr: 3, label: '3rd Year', sub: 'Junior / Applied Skills' },
                  { yr: 4, label: 'Final Year', sub: 'Senior / Placements' },
                  { yr: 5, label: 'Postgrad', sub: 'Masters / Research' }
                ].map((item) => (
                  <button
                    key={item.yr}
                    type="button"
                    onClick={() => setYearOfStudy(item.yr)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      yearOfStudy === item.yr
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Degree Name & CGPA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Degree Program Name *</label>
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Current Cumulative CGPA (out of 10) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none font-mono"
                  placeholder="e.g. 8.5"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Continue to Career Aspiration</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Target Career Goal & Skill Familiarity */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Step 4 of 5: Question 5 & 6
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Target Career Aspiration & Skill Baseline
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select your primary target job role and mark the skills you already have some experience with.
              </p>
            </div>

            {/* Question 5: Target Career Role */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  5. What is your dream target career role in {currentDisciplineInfo.label}?
                </label>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md uppercase">
                  {discipline} Pathways
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relevantCareers.map((c) => {
                  const isSelected = targetCareerId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setTargetCareerId(c.id)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {c.title}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                            {c.growthRate}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{c.medianSalary}</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase">{c.discipline}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question 6: Prior Familiar Skills Chips */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  6. Select tools & competencies you have prior familiarity with:
                </label>
                <span className="text-[10px] text-slate-400">{selectedSkills.length} selected</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {relevantSkills.map((sk) => {
                  const isChecked = selectedSkills.includes(sk.id);
                  return (
                    <button
                      key={sk.id}
                      type="button"
                      onClick={() => toggleSkill(sk.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        isChecked
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5" />}
                      <span>{sk.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Self-reported proficiency level */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Self-assessed baseline proficiency across your selected skills:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'beginner', title: 'Beginner / Exploring', desc: 'Familiar with concepts & basic syntax' },
                  { id: 'intermediate', title: 'Intermediate / Academic', desc: 'Built coursework & lab projects' },
                  { id: 'advanced', title: 'Advanced / Capable', desc: 'Built end-to-end applications or research' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSkillProficiency(p.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      skillProficiency === p.id
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{p.title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Review & Personalize</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Learning Commitments & Final Personalization Summary */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  Final Step: Personalization Calibrator
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Learning Preferences & Commitment
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize how our adaptive engine sequences your learning milestones and allocates weekly drills.
              </p>
            </div>

            {/* Question 7: Preferred Learning Style */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                7. Preferred Learning Style:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'hands_on', title: 'Hands-on Projects', desc: 'Code sandboxes & hardware drills' },
                  { id: 'visual', title: 'Video & Visuals', desc: 'Step-by-step masterclasses' },
                  { id: 'reading', title: 'Docs & Papers', desc: 'Deep-dive theoretical blueprints' },
                  { id: 'interactive', title: 'Adaptive Quizzes', desc: 'Scenario simulations & tests' }
                ].map((sty) => (
                  <button
                    key={sty.id}
                    type="button"
                    onClick={() => setLearningStyle(sty.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      learningStyle === sty.id
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{sty.title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{sty.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 8: Weekly Time Commitment */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                8. Weekly Hours Committed:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { hrs: 5, title: '5 hrs / week', pace: 'Steady Explorer', desc: 'Ideal for busy semester schedules' },
                  { hrs: 10, title: '10 hrs / week', pace: 'Accelerated Builder', desc: 'Balanced project & diagnostic progression' },
                  { hrs: 20, title: '20 hrs / week', pace: 'Intensive Bootcamp', desc: 'Fast-track career pivot & placements' }
                ].map((h) => (
                  <button
                    key={h.hrs}
                    type="button"
                    onClick={() => setWeeklyHours(h.hrs)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      weeklyHours === h.hrs
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{h.title}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{h.pace}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{h.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Profile Summary Banner */}
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-slate-900 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Personalized Baseline Matrix Ready
                  </span>
                </div>
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  Adaptive Engine v1.0
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Stream</div>
                  <div className="font-bold text-slate-900 dark:text-white truncate">{streamName}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Target Role</div>
                  <div className="font-bold text-blue-600 dark:text-blue-400 truncate">{targetCareerObj?.title}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Prior Skills</div>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedSkills.length} tagged</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Weekly Pace</div>
                  <div className="font-bold text-slate-900 dark:text-white">{weeklyHours} hrs/wk</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 px-7 py-3 text-xs font-bold text-white shadow-xl shadow-blue-600/30 transition-all"
              >
                <span>{submitting ? 'Generating Adaptive Roadmap...' : 'Generate My Adaptive Workspace'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
