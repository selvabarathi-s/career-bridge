import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Career, DisciplineType } from '../../../shared/types';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  FolderGit2,
  Clock,
  Save,
  Check,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  Target,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { UserAvatar } from '../components/common/UserAvatar';

export const StudentProfilePage: React.FC = () => {
  const { user, role, profile, updateStudentProfile } = useAuth();
  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [formData, setFormData] = useState<{
    fullName: string;
    degree: string;
    stream: string;
    yearOfStudy: number;
    cgpa: number;
    discipline: DisciplineType;
    targetCareerId: string;
    weeklyHoursCommitted: number;
    learningPace: 'steady' | 'accelerated' | 'intensive';
    learningStyle?: 'hands_on' | 'visual' | 'reading' | 'interactive';
    targetTimeline?: 'immediate' | 'skill_building' | 'higher_studies';
    interests: string[];
    certifications: string[];
  }>({
    fullName: '',
    degree: '',
    stream: '',
    yearOfStudy: 3,
    cgpa: 8.5,
    discipline: 'engineering',
    targetCareerId: '',
    weeklyHoursCommitted: 10,
    learningPace: 'accelerated',
    learningStyle: 'hands_on',
    targetTimeline: 'skill_building',
    interests: [],
    certifications: []
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [newCert, setNewCert] = useState('');

  useEffect(() => {
    api.getCareers().then(data => setAllCareers(data.careers || []));

    if (profile) {
      setFormData({
        fullName: profile.fullName,
        degree: profile.degree,
        stream: profile.stream || '',
        yearOfStudy: profile.yearOfStudy,
        cgpa: profile.cgpa,
        discipline: profile.discipline,
        targetCareerId: profile.targetCareerId,
        weeklyHoursCommitted: profile.weeklyHoursCommitted || 10,
        learningPace: profile.learningPace || 'accelerated',
        learningStyle: profile.learningStyle || 'hands_on',
        targetTimeline: profile.targetTimeline || 'skill_building',
        interests: [...profile.interests],
        certifications: [...profile.certifications]
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudentProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, newInterest.trim()] }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== item) }));
  };

  const handleAddCert = () => {
    if (newCert.trim() && !formData.certifications.includes(newCert.trim())) {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, newCert.trim()] }));
      setNewCert('');
    }
  };

  const handleRemoveCert = (item: string) => {
    setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c !== item) }));
  };

  if (!profile) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4 my-8 max-w-xl mx-auto">
        <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto">
          <User className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Student Profile</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {role === 'student'
            ? 'Your student profile is currently being prepared. If this is a new account, please complete onboarding.'
            : `You are logged in as ${user?.name || 'Faculty / Staff'} (${role.replace('_', ' ')}). Individual profile editing is designed for student accounts.`}
        </p>
        <a
          href={role === 'mentor' ? '/mentor' : role === 'admin' ? '/admin' : role === 'placement_cell' ? '/placement-cell' : '/dashboard'}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
        >
          Return to Portal Overview →
        </a>
      </div>
    );
  }

  const currentCareer = allCareers.find(c => c.id === formData.targetCareerId);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Personalized Student Profile & Baseline
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Keep your academic stream, target career aspiration, and learning pace calibrated for optimal roadmap recommendations.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm animate-pulse">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>Profile & Roadmap Recalibrated!</span>
          </div>
        )}
      </div>

      {/* Top Overview Banner */}
      <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 dark:from-[#0c162d] dark:to-slate-900 p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <UserAvatar name={profile.fullName} size="xl" className="shadow-md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{profile.fullName}</h2>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                {profile.discipline}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {formData.stream || profile.degree} • Year {profile.yearOfStudy} (CGPA: {profile.cgpa})
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <Flame className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Target: <strong className="text-slate-900 dark:text-slate-200">{currentCareer?.title || 'Data Analyst'}</strong></span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0 bg-white dark:bg-slate-950/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400">Career Readiness</div>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            {profile.readinessScore?.overallPercentage || 50}%
          </div>
          <div className="text-[10px] text-slate-500 capitalize font-medium">
            Status: {profile.readinessScore?.status || 'starting'}
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Academic Details */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Academic Background & Stream</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Full Legal Name:</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Broad Discipline:</label>
              <select
                value={formData.discipline}
                onChange={(e) => {
                  const newDisc = e.target.value as DisciplineType;
                  const relevantCareers = allCareers.filter(c => c.discipline === newDisc);
                  setFormData({
                    ...formData,
                    discipline: newDisc,
                    targetCareerId: relevantCareers.length > 0 ? relevantCareers[0].id : formData.targetCareerId
                  });
                }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none capitalize font-semibold"
              >
                <option value="engineering">Engineering & Technology</option>
                <option value="agriculture">Agriculture & Allied Sciences</option>
                <option value="paramedical">Medical & Paramedical</option>
                <option value="commerce">Commerce, Finance & Management</option>
                <option value="design_media">Design & Media Arts</option>
                <option value="arts_science">Arts & Pure Sciences</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Specific Stream / Branch:</label>
              <input
                type="text"
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                placeholder="e.g. Computer Science, Nursing, Agronomy"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Degree Program Name:</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Year of Study:</label>
                <select
                  value={formData.yearOfStudy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, yearOfStudy: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                >
                  <option value={1}>1st Year (Freshman)</option>
                  <option value={2}>2nd Year (Sophomore)</option>
                  <option value={3}>3rd Year (Junior)</option>
                  <option value={4}>Final Year (Senior)</option>
                  <option value={5}>Graduate / Postgrad</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">CGPA (out of 10):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Target Career & Commitments */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Target Career Direction & Pace</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between">
                <span>Personal Target Career Goal:</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold">
                  {formData.discipline} only
                </span>
              </label>
              <select
                value={formData.targetCareerId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, targetCareerId: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none font-semibold"
              >
                {allCareers
                  .filter((c: Career) => c.discipline === formData.discipline)
                  .map((c: Career) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category || c.discipline})
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Weekly Study Hours:</label>
                <input
                  type="number"
                  min="2"
                  max="40"
                  value={formData.weeklyHoursCommitted}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, weeklyHoursCommitted: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Learning Pace:</label>
                <select
                  value={formData.learningPace}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, learningPace: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none capitalize"
                >
                  <option value="steady">Steady (5h/wk)</option>
                  <option value="accelerated">Accelerated (10h/wk)</option>
                  <option value="intensive">Intensive Bootcamp (20h+/wk)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Interests & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interests */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Interests & Domains
            </h3>
            <div className="flex flex-wrap gap-1.5 min-h-[40px]">
              {formData.interests.map((item: string) => (
                <span
                  key={item}
                  className="rounded-lg bg-slate-100 dark:bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5"
                >
                  <span>{item}</span>
                  <button type="button" onClick={() => handleRemoveInterest(item)} className="text-slate-400 hover:text-rose-500">
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add interest tag..."
                value={newInterest}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInterest(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3.5 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Verified Certifications
            </h3>
            <div className="flex flex-wrap gap-1.5 min-h-[40px]">
              {formData.certifications.map((item: string) => (
                <span
                  key={item}
                  className="rounded-lg bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 flex items-center gap-1.5"
                >
                  <span>{item}</span>
                  <button type="button" onClick={() => handleRemoveCert(item)} className="text-blue-400 hover:text-rose-500">
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add certification name..."
                value={newCert}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCert(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCert}
                className="rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3.5 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile & Recalculate Career Readiness</span>
          </button>
        </div>
      </form>
    </div>
  );
};
