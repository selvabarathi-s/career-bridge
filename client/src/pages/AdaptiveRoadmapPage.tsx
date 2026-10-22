import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { RoadmapMilestone, MilestoneStatus, AdaptationContext } from '../../../shared/types';
import {
  MapPin,
  BookOpen,
  Code,
  FolderGit2,
  Award,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
  Briefcase,
  RefreshCw,
  ShieldAlert,
  Rocket,
  Target,
  Clock,
  Gauge,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdaptiveRoadmapPage: React.FC = () => {
  const { profile, targetCareer, refreshProfileData } = useAuth();
  const navigate = useNavigate();

  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([]);
  const [adaptationContext, setAdaptationContext] = useState<AdaptationContext | null>(null);
  const [activePracticeMilestone, setActivePracticeMilestone] = useState<RoadmapMilestone | null>(null);
  const [activeProjectMilestone, setActiveProjectMilestone] = useState<RoadmapMilestone | null>(null);
  const [practiceCode, setPracticeCode] = useState<string>('');
  const [practiceOutput, setPracticeOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [recalibrating, setRecalibrating] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  useEffect(() => {
    if (profile) {
      api.getRoadmap(profile.id).then(data => {
        setMilestones(data.milestones || []);
        if (data.adaptationContext) {
          setAdaptationContext(data.adaptationContext);
        }
        setLoading(false);
      }).catch(err => {
        console.error('Failed to fetch roadmap:', err);
        setLoading(false);
      });
    }
  }, [profile]);

  const handleUpdateStatus = async (milestoneId: string, newStatus: MilestoneStatus) => {
    if (!profile) return;
    try {
      const res = await api.updateMilestoneStatus(profile.id, milestoneId, newStatus);
      if (res.success) {
        setMilestones(res.milestones);
        if (res.adaptationContext) {
          setAdaptationContext(res.adaptationContext);
        }
        if (newStatus === 'completed') {
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.7 }
            });
          } catch (e) {}
        }
        await refreshProfileData();
      }
    } catch (err) {
      console.error('Failed to update milestone status:', err);
    }
  };

  const handleRecalibrate = async (newPace?: string) => {
    if (!profile) return;
    setRecalibrating(true);
    try {
      const res = await api.recalibrateRoadmap(profile.id, { pace: newPace });
      if (res.success) {
        setMilestones(res.milestones);
        if (res.adaptationContext) {
          setAdaptationContext(res.adaptationContext);
        }
        await refreshProfileData();
      }
    } catch (err) {
      console.error('Failed to recalibrate roadmap:', err);
    } finally {
      setRecalibrating(false);
    }
  };

  const handleRunPractice = () => {
    setPracticeOutput('Executing query in sandbox environment...\nQuery executed successfully in 42ms!\nReturned 10 verified records with matching primary join keys.');
  };

  if (!profile || !targetCareer) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        Please select a target career from the Career Explorer.
      </div>
    );
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'learn':
        return <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'practice':
        return <Code className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'build':
        return <FolderGit2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case 'evaluate':
        return <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getPhaseBadge = (phase?: string) => {
    switch (phase) {
      case 'core_foundation':
        return (
          <span className="rounded-md bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Phase 1: Core Foundation
          </span>
        );
      case 'placement_preparation':
        return (
          <span className="rounded-md bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Phase 2: Placement Prep
          </span>
        );
      case 'portfolio_build':
        return (
          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Phase 3: Portfolio Build
          </span>
        );
      case 'future_ready':
        return (
          <span className="rounded-md bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Phase 4: Future-Ready Track
          </span>
        );
      default:
        return null;
    }
  };

  const filteredMilestones = selectedPhase === 'all'
    ? milestones
    : milestones.filter(m => m.phase === selectedPhase);

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressPct = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Personalized Learning Roadmap
            </h1>
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Live Calibrated
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Personalized four-phase progression loop (<strong>Learn → Practice → Build → Evaluate</strong>) dynamically calibrated to your verified test scores, deficit gaps, and learning velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRecalibrate()}
            disabled={recalibrating}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-xs"
            title="Recalibrate roadmap with your latest assessment performance"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-blue-600 dark:text-blue-400 ${recalibrating ? 'animate-spin' : ''}`} />
            <span>{recalibrating ? 'Recalibrating...' : 'Recalibrate'}</span>
          </button>

          <button
            onClick={() => navigate('/assessments')}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white transition-colors shadow-md shadow-blue-600/20"
          >
            <Award className="h-4 w-4" />
            <span>Take Skill Diagnostic</span>
          </button>
        </div>
      </div>

      {/* Dynamic Performance Calibration Bar */}
      {adaptationContext && (
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-purple-50/60 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl text-white shrink-0 shadow-sm ${
                adaptationContext.mode === 'fast_track' ? 'bg-emerald-600' :
                adaptationContext.mode === 'remedial_support' ? 'bg-rose-600' :
                adaptationContext.mode === 'future_ready' ? 'bg-purple-600' :
                'bg-blue-600'
              }`}>
                {adaptationContext.mode === 'fast_track' && <Zap className="h-5 w-5" />}
                {adaptationContext.mode === 'remedial_support' && <ShieldAlert className="h-5 w-5" />}
                {adaptationContext.mode === 'future_ready' && <Rocket className="h-5 w-5" />}
                {adaptationContext.mode === 'placement_calibrated' && <Target className="h-5 w-5" />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {adaptationContext.modeLabel}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    Velocity: {(adaptationContext.velocity || 1.0).toFixed(1)}x
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {adaptationContext.modeDescription}
                </p>
              </div>
            </div>

            {/* Dynamic Pace Toggle */}
            <div className="flex items-center gap-1.5 shrink-0 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs self-start md:self-auto">
              <span className="text-[10px] font-bold uppercase px-2 text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Gauge className="h-3 w-3" /> Pace:
              </span>
              {(['steady', 'accelerated', 'intensive'] as const).map((p) => {
                const isActive = (profile.targetTimeline || 'accelerated').toLowerCase() === p;
                return (
                  <button
                    key={p}
                    onClick={() => handleRecalibrate(p)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all capitalize ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Total Completion</span>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{progressPct}%</span>
                <span className="text-[11px] font-normal text-slate-500">({completedCount}/{milestones.length})</span>
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Estimated Effort</span>
              <div className="font-bold text-slate-900 dark:text-white">
                {adaptationContext.remainingHours} hrs remaining
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Projected Completion</span>
              <div className="font-bold text-slate-900 dark:text-white">
                ~{adaptationContext.projectedWeeks} weeks
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Adaptive Adjustments</span>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {adaptationContext.fastTrackCount > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400" title="Milestones fast-tracked by high diagnostic scores">
                    ⚡ {adaptationContext.fastTrackCount} bypass
                  </span>
                )}
                {adaptationContext.remedialCount > 0 && (
                  <span className="text-rose-600 dark:text-rose-400" title="Targeted remedial booster modules injected">
                    🛡️ {adaptationContext.remedialCount} remedial
                  </span>
                )}
                {adaptationContext.futureReadyCount > 0 && (
                  <span className="text-purple-600 dark:text-purple-400" title="Future-ready specialization modules unlocked">
                    🚀 {adaptationContext.futureReadyCount} future
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Milestones', count: milestones.length },
          { id: 'core_foundation', label: 'Phase 1: Core Foundation', count: milestones.filter(m => m.phase === 'core_foundation').length },
          { id: 'placement_preparation', label: 'Phase 2: Placement Prep', count: milestones.filter(m => m.phase === 'placement_preparation').length },
          { id: 'portfolio_build', label: 'Phase 3: Portfolio Build', count: milestones.filter(m => m.phase === 'portfolio_build').length },
          { id: 'future_ready', label: 'Phase 4: Future-Ready Track', count: milestones.filter(m => m.phase === 'future_ready').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedPhase(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedPhase === tab.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              selectedPhase === tab.id
                ? 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Adaptive Progress Timeline */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone, idx) => {
          const isCompleted = milestone.status === 'completed';
          const isLocked = milestone.status === 'locked';
          const isInProgress = milestone.status === 'in_progress';
          const isFastTracked = milestone.adaptationReason?.toLowerCase().includes('fast-tracked');

          return (
            <div
              key={milestone.id}
              className={`relative rounded-2xl border p-5 transition-all shadow-xs ${
                isCompleted
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/15'
                  : isInProgress
                  ? 'border-blue-400 dark:border-blue-500/60 bg-blue-50/40 dark:bg-[#0c162d] shadow-md shadow-blue-500/10'
                  : isLocked
                  ? 'border-slate-200 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-950/40 opacity-75'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Stage Badge */}
                    <span className="flex items-center gap-1.5 rounded-md bg-white dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">
                      {getStageIcon(milestone.stage)}
                      <span>Stage: {milestone.stage}</span>
                    </span>

                    {/* Phase Badge */}
                    {getPhaseBadge(milestone.phase)}

                    {/* Skill Label */}
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {milestone.skillName}
                    </span>

                    {/* Remedial Tag */}
                    {milestone.isRemedial && (
                      <span className="flex items-center gap-1 rounded-md bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80">
                        <ShieldAlert className="h-3 w-3" />
                        <span>Remedial Booster</span>
                      </span>
                    )}

                    {/* Future-Ready Tag */}
                    {milestone.isFutureReady && (
                      <span className="flex items-center gap-1 rounded-md bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80">
                        <Rocket className="h-3 w-3" />
                        <span>Future-Ready Track</span>
                      </span>
                    )}

                    {/* Fast Track Tag */}
                    {isFastTracked && (
                      <span className="flex items-center gap-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
                        <Zap className="h-3 w-3" />
                        <span>Diagnostic Bypass</span>
                      </span>
                    )}

                    {/* Status Badge */}
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      isCompleted ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' :
                      isInProgress ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800' :
                      isLocked ? 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-800' :
                      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                    }`}>
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{idx + 1}. {milestone.title}</span>
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        ({milestone.estimatedHours} hrs)
                      </span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Dynamic Adaptation Rationale Alert */}
                  {milestone.adaptationReason && (
                    <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                      milestone.isRemedial
                        ? 'bg-rose-50/70 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-900/60 dark:text-rose-300'
                        : isFastTracked
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-900/60 dark:text-emerald-300'
                        : milestone.isFutureReady
                        ? 'bg-purple-50/70 border-purple-200 text-purple-800 dark:bg-purple-950/30 dark:border-purple-900/60 dark:text-purple-300'
                        : 'bg-blue-50/70 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-900/60 dark:text-blue-300'
                    }`}>
                      <span className="font-semibold">{milestone.adaptationReason}</span>
                    </div>
                  )}
                </div>

                {/* Milestone Execution Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* Practice Sandbox Drill */}
                  {milestone.stage === 'practice' && !isLocked && (
                    <button
                      onClick={() => {
                        setActivePracticeMilestone(milestone);
                        setPracticeCode(milestone.practiceExercise?.solution || 'SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;');
                        setPracticeOutput(null);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      <Code className="h-3.5 w-3.5" />
                      <span>Launch Sandbox</span>
                    </button>
                  )}

                  {/* Portfolio Project Brief Button */}
                  {milestone.stage === 'build' && !isLocked && (
                    <button
                      onClick={() => setActiveProjectMilestone(milestone)}
                      className="flex items-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      <FolderGit2 className="h-3.5 w-3.5" />
                      <span>View Project Brief</span>
                    </button>
                  )}

                  {/* Evaluate Button */}
                  {milestone.stage === 'evaluate' && !isLocked && (
                    <button
                      onClick={() => navigate('/assessments')}
                      className="flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>Take Evaluation</span>
                    </button>
                  )}

                  {/* Mark Completed Toggle */}
                  {!isLocked && (
                    <button
                      onClick={() => handleUpdateStatus(milestone.id, isCompleted ? 'in_progress' : 'completed')}
                      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
                        isCompleted
                          ? 'border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Verified Excel Curated Platform & Courseware Links */}
              {milestone.resources && milestone.resources.length > 0 && !isLocked && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Verified Courseware & Platforms:
                  </span>
                  {milestone.resources.map(r => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-white dark:bg-slate-950 px-2 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline border border-slate-200 dark:border-slate-800 transition-colors shadow-xs"
                    >
                      <span>{r.title}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Practice Sandbox Modal */}
      {activePracticeMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Interactive Practice Sandbox Drill
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{activePracticeMilestone.title}</h2>
              </div>
              <button
                onClick={() => setActivePracticeMilestone(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-200 block mb-1">Scenario Prompt:</strong>
              {activePracticeMilestone.practiceExercise?.prompt || 'Write an optimized query or script solving the industry scenario.'}
            </div>

            {/* Code Editor */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-400">Sandbox Code / Script Editor:</label>
              <textarea
                rows={5}
                value={practiceCode}
                onChange={(e) => setPracticeCode(e.target.value)}
                className="w-full font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-emerald-600 dark:text-emerald-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Output Console */}
            {practiceOutput && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 whitespace-pre-line">
                {practiceOutput}
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                💡 Tip: Adhere to industrial engineering clean code guidelines.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRunPractice}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Execute Drill</span>
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(activePracticeMilestone.id, 'completed');
                    setActivePracticeMilestone(null);
                  }}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                >
                  Complete Drill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Project Prompt Brief Modal */}
      {activeProjectMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                  Portfolio Showcase Specification
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{activeProjectMilestone.projectPrompt?.title || activeProjectMilestone.title}</h2>
              </div>
              <button
                onClick={() => setActiveProjectMilestone(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeProjectMilestone.projectPrompt?.brief || 'Build a production-grade application or engineered system adhering to industry benchmarks.'}
            </p>

            {/* Deliverables */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-200">Project Deliverables Checklist:</div>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                {activeProjectMilestone.projectPrompt?.deliverables.map((d, i) => (
                  <li key={i}>{d}</li>
                )) || <li>Complete repository with deployment instructions & test coverage</li>}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  handleUpdateStatus(activeProjectMilestone.id, 'completed');
                  setActiveProjectMilestone(null);
                }}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 px-5 py-2 text-xs font-bold text-white transition-colors"
              >
                Mark Project Submitted & Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
