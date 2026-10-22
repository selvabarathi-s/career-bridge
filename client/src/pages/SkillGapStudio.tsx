import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SkillGapItem, PriorityLevel, SkillMasteryStatus } from '../../../shared/types';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';

export const SkillGapStudio: React.FC = () => {
  const { targetCareer, skillGaps } = useAuth();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!targetCareer) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        Please select a target career first from the Career Explorer.
      </div>
    );
  }

  const filteredGaps = skillGaps.filter(g => {
    if (statusFilter === 'all') return true;
    return g.status === statusFilter;
  });

  const getStatusBadge = (status: SkillMasteryStatus) => {
    switch (status) {
      case 'mastered':
        return <span className="bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Mastered</span>;
      case 'strong':
        return <span className="bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Strong</span>;
      case 'developing':
        return <span className="bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Developing</span>;
      case 'weak':
      case 'missing':
        return <span className="bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Critical Gap</span>;
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'critical':
        return <span className="text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase">● Critical Priority</span>;
      case 'high':
        return <span className="text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase">● High Priority</span>;
      case 'medium':
        return <span className="text-blue-600 dark:text-blue-400 font-medium text-[10px] uppercase">● Medium Priority</span>;
      case 'low':
        return <span className="text-slate-500 dark:text-slate-400 font-medium text-[10px] uppercase">● Secondary</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills Analysis
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          In-depth benchmark competency analysis comparing your verified skills against industry hiring standards for <strong>{targetCareer.title}</strong>.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
        {[
          { id: 'all', label: `All Competencies (${skillGaps.length})` },
          { id: 'weak', label: `Critical Deficits (${skillGaps.filter(g => g.status === 'weak' || g.status === 'missing').length})` },
          { id: 'developing', label: `Developing (${skillGaps.filter(g => g.status === 'developing').length})` },
          { id: 'strong', label: `Strong (${skillGaps.filter(g => g.status === 'strong').length})` },
          { id: 'mastered', label: `Mastered (${skillGaps.filter(g => g.status === 'mastered').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gaps List */}
      <div className="space-y-4">
        {filteredGaps.map(gap => (
          <div
            key={gap.skillId}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">{gap.skillName}</span>
                  {getStatusBadge(gap.status)}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Category: <strong className="text-slate-700 dark:text-slate-300">{gap.category}</strong></span>
                  <span>•</span>
                  {getPriorityBadge(gap.priority)}
                </div>
              </div>

              {/* Progress Level */}
              <div className="flex items-center gap-4 shrink-0 bg-slate-50 dark:bg-slate-950/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Current vs Benchmark</div>
                  <div className="text-xs font-bold font-mono">
                    <span className={gap.currentLevel < gap.targetLevel ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {gap.currentLevel}%
                    </span>
                    <span className="text-slate-400"> / </span>
                    <span className="text-slate-700 dark:text-slate-300">{gap.targetLevel}%</span>
                  </div>
                </div>

                <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold font-mono text-xs border border-blue-200 dark:border-blue-500/30">
                  {Math.round((gap.currentLevel / Math.max(1, gap.targetLevel)) * 100)}%
                </div>
              </div>
            </div>

            {/* Explainable Rationale */}
            <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 p-3 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{gap.rationale}</p>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="text-[11px]">
                {gap.prerequisiteFulfilled ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Prerequisites satisfied
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium">
                    <AlertTriangle className="h-3.5 w-3.5" /> Requires prerequisite mastery first
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/assessments')}
                  className="rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Assess
                </button>
                <button
                  onClick={() => navigate('/roadmap')}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors"
                >
                  <span>Learn & Practice</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
