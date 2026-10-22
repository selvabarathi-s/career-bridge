import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Career, CareerComparisonResult } from '../../../shared/types';
import {
  GitCompare,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CareerSimulatorPage: React.FC = () => {
  const { profile, targetCareer, setTargetCareer } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [sourceId, setSourceId] = useState<string>(targetCareer?.id || 'career-data-analyst');
  const [pivotId, setPivotId] = useState<string>(searchParams.get('target') || 'career-ai-engineer');
  const [simulationResult, setSimulationResult] = useState<CareerComparisonResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    api.getCareers().then(data => {
      setAllCareers(data.careers || []);
      const defaultPivot = searchParams.get('target') || (data.careers.find(c => c.id !== sourceId)?.id || 'career-ai-engineer');
      setPivotId(defaultPivot);
    });
  }, [sourceId, searchParams]);

  useEffect(() => {
    if (profile && sourceId && pivotId && sourceId !== pivotId) {
      setLoading(true);
      api.simulatePivot(profile.id, sourceId, pivotId).then(res => {
        setSimulationResult(res.result);
        setLoading(false);
      }).catch(err => {
        console.error('Simulation error:', err);
        setLoading(false);
      });
    }
  }, [profile, sourceId, pivotId]);

  const handleApplyPivot = async () => {
    if (simulationResult?.targetCareer) {
      await setTargetCareer(simulationResult.targetCareer.id);
      navigate('/roadmap');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Career Pathway Planner
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Run "What-If" career transition scenarios, evaluate transferable skill synergies, and preview custom bridge roadmaps.
        </p>
      </div>

      {/* Career Selection Controls */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Source Career */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current / Starting Career Path
            </label>
            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs font-semibold text-slate-900 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
            >
              <optgroup label="Your Discipline Careers">
                {allCareers
                  .filter(c => !profile?.discipline || c.discipline === profile.discipline)
                  .map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category || c.discipline})
                    </option>
                  ))}
              </optgroup>
              {allCareers.some(c => profile?.discipline && c.discipline !== profile.discipline) && (
                <optgroup label="Other Disciplines">
                  {allCareers
                    .filter(c => profile?.discipline && c.discipline !== profile.discipline)
                    .map(c => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.discipline})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Pivot Indicator */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Target Pivot Career */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Target Alternative Career to Test
            </label>
            <select
              value={pivotId}
              onChange={(e) => setPivotId(e.target.value)}
              className="w-full rounded-xl border border-cyan-300 dark:border-cyan-900/80 bg-cyan-50/50 dark:bg-slate-950 p-3 text-xs font-semibold text-cyan-900 dark:text-cyan-300 focus:border-cyan-500 focus:outline-none"
            >
              <optgroup label="In-Discipline Specializations & Tracks">
                {allCareers
                  .filter(c => c.id !== sourceId && (!profile?.discipline || c.discipline === profile.discipline))
                  .map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category || c.discipline})
                    </option>
                  ))}
              </optgroup>
              {allCareers.some(c => profile?.discipline && c.discipline !== profile.discipline) && (
                <optgroup label="Cross-Disciplinary Alternatives">
                  {allCareers
                    .filter(c => c.id !== sourceId && profile?.discipline && c.discipline !== profile.discipline)
                    .map(c => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.discipline})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Simulation Results View */}
      {loading ? (
        <div className="h-72 rounded-2xl bg-slate-100 dark:bg-slate-900/60 animate-pulse border border-slate-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Calculating skill synergies & transition delta...</span>
        </div>
      ) : simulationResult ? (
        <div className="space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Skill Synergy */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-1 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Transferable Skill Synergy</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono flex items-baseline gap-1">
                <span className="text-cyan-600 dark:text-cyan-400">{simulationResult.skillOverlapPercentage}%</span>
                <span className="text-xs text-slate-400 font-normal">overlap</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Directly reusable competencies</p>
            </div>

            {/* Transition Difficulty */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-1 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Transition Effort Level</div>
              <div className="text-xl font-bold uppercase tracking-wider font-mono">
                <span className={
                  simulationResult.transitionDifficulty === 'low' ? 'text-emerald-600 dark:text-emerald-400' :
                  simulationResult.transitionDifficulty === 'moderate' ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
                }>
                  {simulationResult.transitionDifficulty}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Estimated duration: <strong className="text-slate-800 dark:text-slate-200">{simulationResult.estimatedMonths} Months</strong>
              </p>
            </div>

            {/* Suitability Score */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-1 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Academic & Skill Suitability</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {simulationResult.suitabilityScore}%
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Profile compatibility index</p>
            </div>

            {/* Preferability Score */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-1 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Strategic Preferability</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {simulationResult.preferabilityScore}%
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Industry growth & ROI factor</p>
            </div>
          </div>

          {/* Explainable Rationale Banner */}
          <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 p-4 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-blue-700 dark:text-blue-300 font-semibold">AI Transition Rationale:</strong>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{simulationResult.rationale}</p>
            </div>
          </div>

          {/* Skills Breakdown: Transferable vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Transferable Skills */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Transferable Core Competencies ({simulationResult.transferableSkills.length})</span>
                </h3>
              </div>
              <div className="space-y-2">
                {simulationResult.transferableSkills.map(s => (
                  <div key={s.skillId} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{s.skillName}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{s.proficiency}% verified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Priority Skills */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  <span>Missing Priority Competencies ({simulationResult.missingSkills.length})</span>
                </h3>
              </div>
              <div className="space-y-2">
                {simulationResult.missingSkills.map(s => (
                  <div key={s.skillId} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{s.skillName}</div>
                      <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold uppercase">{s.priority} priority</div>
                    </div>
                    <span className="font-mono text-slate-500 dark:text-slate-400 text-xs">Target: {s.targetLevel}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pivot Bridge Roadmap */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>Recommended 4-Step Transition Bridge Roadmap</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {simulationResult.pivotRoadmapSummary.map((step) => (
                <div key={step.step} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-400 text-xs font-bold font-mono">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {step.durationWeeks} Weeks
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={handleApplyPivot}
                className="flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 transition-all"
              >
                <span>Commit Career Pivot to {simulationResult.targetCareer.title}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
