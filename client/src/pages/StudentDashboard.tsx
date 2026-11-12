import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { NextBestAction, RoadmapMilestone, Career } from '../../../shared/types';
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Briefcase,
  GitCompare,
  Zap,
  Target,
  FileCode,
  ShieldCheck
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, role, profile, targetCareer, skillGaps, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([]);
  const [nextAction, setNextAction] = useState<NextBestAction | null>(null);
  const [loading, setLoading] = useState(true);

  // Non-student roles land on their designated portal overview
  useEffect(() => {
    if (role === 'mentor') {
      navigate('/mentor', { replace: true });
    } else if (role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (role === 'placement_cell') {
      navigate('/placement-cell', { replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (profile) {
      api.getRoadmap(profile.id).then(data => {
        setMilestones(data.milestones || []);
        setNextAction(data.nextAction);
        setLoading(false);
      }).catch(err => {
        console.error('Failed to load dashboard roadmap:', err);
        setLoading(false);
      });
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [profile, authLoading]);

  if (authLoading || (loading && profile)) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Loading student career intelligence...</p>
        </div>
      </div>
    );
  }

  if (!profile || !targetCareer) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center max-w-md mx-auto my-12 space-y-3 bg-white dark:bg-slate-900">
        <Compass className="h-10 w-10 text-blue-500 mx-auto" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Profile setup required</h2>
        <p className="text-xs text-slate-500">
          Please set up your academic background and dream career path to unlock your personalized dashboard.
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 cursor-pointer"
        >
          <span>Complete Setup</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  const readiness = profile.readinessScore;
  const criticalGaps = skillGaps.filter(g => g.priority === 'critical' || g.status === 'weak');
  const masteredCount = skillGaps.filter(g => g.status === 'mastered').length;
  const strongCount = skillGaps.filter(g => g.status === 'strong').length;
  const developingCount = skillGaps.filter(g => g.status === 'developing').length;
  const weakCount = skillGaps.filter(g => g.status === 'weak' || g.status === 'missing').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Target Career Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 via-[#0d1629] to-slate-900 p-6 sm:p-8 shadow-xl text-white">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-blue-600/30 px-2.5 py-1 text-xs font-bold text-blue-300 border border-blue-400/30 uppercase tracking-wide">
                Target Career Path
              </span>
              <span className="text-xs text-slate-300 capitalize">
                {targetCareer.discipline} • {targetCareer.category}
              </span>
              {profile.stream && (
                <span className="rounded-md bg-emerald-950/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-800/60">
                  Stream: {profile.stream}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {targetCareer.title}
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-200 leading-relaxed">
              {targetCareer.description}
            </p>
            <div className="text-[11px] text-blue-200">
              Personalized for <strong>{profile.fullName}</strong> • Year {profile.yearOfStudy} ({profile.degree}) • CGPA: {profile.cgpa}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-medium">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Growth: <strong className="text-white">{targetCareer.growthRate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Award className="h-4 w-4 text-blue-300" />
                <span>Market Range: <strong className="text-white">{targetCareer.medianSalary}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-900/60 px-4 py-2 text-xs font-bold text-emerald-300 transition-colors"
            >
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <span>Change Career Goal</span>
            </button>
            <button
              onClick={() => navigate('/assessments')}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all"
            >
              <Award className="h-4 w-4" />
              <span>Take Assessment</span>
            </button>
            <button
              onClick={() => navigate('/simulator')}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-slate-200 transition-colors"
            >
              <GitCompare className="h-4 w-4 text-cyan-400" />
              <span>Simulate Career Pivot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Next Best Action & Multidimensional Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Best Action Card (What should I do next?) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-gradient-to-br dark:from-[#0c162d] dark:to-slate-900 p-6 shadow-md relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                  <Zap className="h-4 w-4 animate-pulse" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Next Best Action
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                ~{nextAction?.estimatedMinutes || 20} mins
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {nextAction?.title || 'Start Recommended SQL Practice Challenge'}
              </h3>
              <div className="mt-2 rounded-xl bg-white/80 dark:bg-slate-950/70 p-3.5 border border-slate-200 dark:border-slate-800/80 text-xs space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Why this action now?</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {nextAction?.reason || 'Targets your highest-priority skill deficit to unlock the next roadmap milestone.'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-5 flex items-center justify-between gap-3 border-t border-blue-200 dark:border-slate-800/80 mt-4">
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Target Competency: <strong className="text-blue-700 dark:text-blue-300">{nextAction?.targetSkill || 'Core Foundation'}</strong>
            </div>
            <button
              onClick={() => {
                if (nextAction?.route) {
                  navigate(nextAction.route);
                } else {
                  navigate('/roadmap');
                }
              }}
              className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Execute Task</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Multidimensional Readiness Gauge */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Multidimensional Career Readiness</span>
            </h3>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
              {readiness.status.replace('_', ' ')}
            </span>
          </div>

          {/* Big Score Gauge */}
          <div className="flex items-center gap-4 py-2">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/10 to-emerald-600/10 dark:from-blue-600/20 dark:to-emerald-600/20 border border-blue-200 dark:border-blue-500/30">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {readiness.overallPercentage}%
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-200">
                {readiness.overallPercentage >= 80 ? 'Job-Ready Benchmark Met' : 'Active Preparation Track'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Derived from verified technical skills, completed portfolio projects, and scenario assessments.
              </p>
            </div>
          </div>

          {/* Sub-Dimension Progress Bars */}
          <div className="space-y-2.5 pt-1 text-xs">
            <div>
              <div className="flex justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Technical Benchmark</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{readiness.technicalScore}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${readiness.technicalScore}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Portfolio & Practical Projects</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{readiness.projectScore}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${readiness.projectScore}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Problem Solving & Scenario Drills</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{readiness.problemSolvingScore}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${readiness.problemSolvingScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Gap Summary Matrix */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Skill Intelligence & Gap Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Benchmark comparison for <strong>{targetCareer.title}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate('/skills')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View Skills Analysis</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Status Count Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 p-3">
            <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Mastered</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">{masteredCount}</div>
          </div>
          <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/30 p-3">
            <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">Strong</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">{strongCount}</div>
          </div>
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-3">
            <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Developing</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">{developingCount}</div>
          </div>
          <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 p-3">
            <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">High Deficit / Weak</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">{weakCount}</div>
          </div>
        </div>

        {/* Top Priority Gaps List */}
        <div className="space-y-3 pt-2">
          {skillGaps.slice(0, 4).map(gap => (
            <div
              key={gap.skillId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{gap.skillName}</span>
                  <span className={`text-[10px] font-bold uppercase rounded px-1.5 py-0.5 border ${
                    gap.priority === 'critical' ? 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800/60' :
                    gap.priority === 'high' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/60' :
                    'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}>
                    {gap.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">{gap.rationale}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Current vs Target</div>
                  <div className="text-xs font-bold font-mono text-slate-900 dark:text-slate-200">
                    <span className={gap.currentLevel < gap.targetLevel ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {gap.currentLevel}%
                    </span>
                    <span className="text-slate-400"> / </span>
                    <span className="text-slate-600 dark:text-slate-300">{gap.targetLevel}%</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/roadmap')}
                  className="rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                >
                  Learn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Mentor CTA Banner */}
      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-900/60 bg-gradient-to-r from-cyan-50 dark:from-cyan-950/40 via-white dark:via-slate-900 to-slate-50 dark:to-slate-900 p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ask your Context-Aware AI Career Mentor</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Get personalized guidance based on your {profile.degree} background and target {targetCareer.title}.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/ai-mentor')}
          className="rounded-xl bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/20 transition-all shrink-0"
        >
          Open AI Mentor
        </button>
      </div>
    </div>
  );
};
