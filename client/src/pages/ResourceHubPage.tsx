import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Resource, CourseRecommendation } from '../../../shared/types';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Video,
  Code,
  FileText,
  FolderGit2,
  ExternalLink,
  Star,
  Clock,
  Sparkles,
  CheckCircle2,
  Check,
  Award,
  Zap,
  GraduationCap,
  Search,
  Layers,
  Compass,
  ShieldCheck,
  Plus,
  AlertCircle,
  Filter,
  X
} from 'lucide-react';

export const ResourceHubPage: React.FC = () => {
  const { profile, targetCareer, skillGaps, refreshProfileData } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [pendingRecommendations, setPendingRecommendations] = useState<CourseRecommendation[]>([]);
  const [approvedRecommendations, setApprovedRecommendations] = useState<CourseRecommendation[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Request AI Course Material Modal
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedSkillGap, setSelectedSkillGap] = useState('');
  const [customSkillTopic, setCustomSkillTopic] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const studentId = profile?.id || 'student-selva';

  const loadResources = () => {
    setLoading(true);
    api.getResources(studentId)
      .then(data => {
        setResources(data.resources || []);
        setPendingRecommendations(data.pendingRecommendations || []);
        setApprovedRecommendations(data.approvedRecommendations || []);
        setCompletedIds(data.completedResourceIds || profile?.completedResourceIds || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load curated resources:', err);
        api.getRoadmap(studentId).then(rData => {
          const allRes: Resource[] = [];
          (rData.milestones || []).forEach(m => {
            (m.resources || []).forEach(r => {
              if (!allRes.some(existing => existing.id === r.id)) {
                allRes.push(r);
              }
            });
          });
          setResources(allRes);
          setCompletedIds(profile?.completedResourceIds || []);
          setLoading(false);
        });
      });
  };

  useEffect(() => {
    loadResources();
  }, [studentId, profile?.completedResourceIds]);

  const handleToggleComplete = async (resource: Resource) => {
    if (!profile) return;
    setErrorMsg(null);

    // Frontend pre-check for approval requirement
    if (resource.approvalStatus === 'pending_approval') {
      setErrorMsg('This course material is pending faculty review. Dr. Balu Prasath must approve it before it can be marked complete.');
      return;
    }

    setUpdatingId(resource.id);

    try {
      const res = await api.completeResource(profile.id, resource.id);
      if (res.success) {
        setCompletedIds(res.completedResourceIds);

        if (res.isCompleted) {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 }
            });
          } catch (e) {}
        }

        await refreshProfileData();
      }
    } catch (err: any) {
      console.error('Failed to update course completion:', err);
      setErrorMsg(err.message || 'Course completion requires faculty mentor clearance.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRequestAICourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const gapToTarget = selectedSkillGap === 'custom' ? customSkillTopic.trim() : (selectedSkillGap || skillGaps[0]?.skillName || 'Applied Engineering Mastery');
    if (!gapToTarget) return;

    setIsRequesting(true);
    try {
      const res = await api.requestCourseRecommendation({
        studentId,
        skillGapName: gapToTarget
      });

      if (res.success) {
        setPendingRecommendations(prev => [res.recommendation, ...prev]);
        setRequestSuccess(true);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {}
        setTimeout(() => {
          setShowRequestModal(false);
          setRequestSuccess(false);
          setSelectedSkillGap('');
          setCustomSkillTopic('');
        }, 1800);
      }
    } catch (err) {
      console.error('Failed to request AI course recommendation:', err);
    } finally {
      setIsRequesting(false);
    }
  };

  // Build unified display list combining approved catalog and pending recommendations
  const pendingAsResources: Resource[] = pendingRecommendations.map(rec => ({
    id: rec.id,
    title: rec.courseTitle,
    type: rec.type,
    provider: rec.provider,
    url: rec.courseUrl,
    durationMinutes: rec.durationMinutes,
    difficulty: rec.difficulty,
    rating: rec.rating,
    whyRecommended: `Target Deficit: ${rec.skillGapName}. AI Rationale: ${rec.aiRationale}`,
    embedType: 'external',
    approvalStatus: 'pending_approval',
    approvedByMentorName: undefined,
    aiRationale: rec.aiRationale
  }));

  // Filter catalog according to approvalFilter
  let combinedList: Resource[] = [];
  if (approvalFilter === 'all') {
    // Show pending recommendations at the top, followed by approved catalog
    combinedList = [...pendingAsResources, ...resources];
  } else if (approvalFilter === 'pending') {
    combinedList = [...pendingAsResources];
  } else {
    // 'approved'
    combinedList = resources.filter(r => r.approvalStatus !== 'pending_approval');
  }

  // Deduplicate by ID
  const seenIds = new Set<string>();
  const uniqueDisplayResources = combinedList.filter(item => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  // Distinct providers list
  const availableProviders = ['all', ...Array.from(new Set(uniqueDisplayResources.map(r => r.provider).filter(Boolean)))];

  const filteredResources = uniqueDisplayResources.filter(r => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (providerFilter !== 'all' && r.provider !== providerFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchProvider = r.provider.toLowerCase().includes(q);
      const matchWhy = (r.whyRecommended || '').toLowerCase().includes(q);
      if (!matchTitle && !matchProvider && !matchWhy) return false;
    }
    return true;
  });

  const completedCount = resources.filter(r => completedIds.includes(r.id)).length;
  const progressPercent = resources.length > 0 ? Math.round((completedCount / resources.length) * 100) : 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-rose-500 dark:text-rose-400" />;
      case 'interactive':
        return <Code className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
      case 'article':
        return <FileText className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
      case 'repo':
        return <FolderGit2 className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
      default:
        return <BookOpen className="h-4 w-4 text-amber-500 dark:text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learning Resource Library
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Faculty-governed industry courseware, university MOOCs, and hands-on sandboxes calibrated for{' '}
            <strong className="text-blue-600 dark:text-blue-400">{targetCareer?.title || 'Your Target Career'}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {targetCareer && (
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Target: {targetCareer.title}</span>
            </div>
          )}

          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Request AI Course Suggestion</span>
          </button>
        </div>
      </div>

      {/* Faculty Mentor Approval Governance Banner */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/80 via-slate-50/50 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 mt-0.5 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Academic Quality Assurance & Mentor Approval Mechanism
                </h3>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Active Faculty Review
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                AI evaluates your personal skill gaps and proposes targeted courseware. To safeguard syllabus standards and credit eligibility, all suggestions are submitted to your faculty mentor (<strong className="text-slate-800 dark:text-slate-200">Dr. Balu Prasath</strong>) before unlocking for verified completion.
              </p>
            </div>
          </div>

          {pendingRecommendations.length > 0 && (
            <button
              onClick={() => setApprovalFilter('pending')}
              className="rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shrink-0 transition-colors cursor-pointer"
            >
              {pendingRecommendations.length} Awaiting Mentor Approval
            </button>
          )}
        </div>
      </div>

      {/* Error / Alert Banner if student tries to complete unapproved course */}
      {errorMsg && (
        <div className="rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 p-3 text-xs text-rose-800 dark:text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Dynamic Course Completion Tracker Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Verified Courseware Progress & Readiness Boost
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Mark faculty-approved courses complete to continuously advance your personal career readiness index.
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {completedCount} of {resources.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
              ({progressPercent}% Completed)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        {/* Mentor Approval Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <ShieldCheck className="h-3.5 w-3.5" /> Governance:
          </span>
          {[
            { id: 'all', label: 'All Courseware', count: uniqueDisplayResources.length },
            { id: 'approved', label: 'Mentor Approved & Ready', count: resources.filter(r => r.approvalStatus !== 'pending_approval').length },
            { id: 'pending', label: 'Awaiting Mentor Review', count: pendingRecommendations.length }
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setApprovalFilter(chip.id as any)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                approvalFilter === chip.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{chip.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                approvalFilter === chip.id
                  ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
                {chip.count}
              </span>
            </button>
          ))}
        </div>

        {/* Platform Provider Chips */}
        {availableProviders.length > 2 && (
          <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-none items-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
              <Compass className="h-3.5 w-3.5" /> Platform:
            </span>
            {availableProviders.slice(0, 10).map(prov => (
              <button
                key={prov}
                onClick={() => setProviderFilter(prov)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  providerFilter === prov
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {prov === 'all' ? 'All Platforms' : prov}
              </button>
            ))}
          </div>
        )}

        {/* Resource Format Tabs & Search */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 scrollbar-none items-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
              <Layers className="h-3 w-3" /> Format:
            </span>
            {[
              { id: 'all', label: 'All Formats' },
              { id: 'course', label: 'Accredited Courses' },
              { id: 'interactive', label: 'Interactive Sandboxes' },
              { id: 'video', label: 'Video Masterclasses' },
              { id: 'article', label: 'Technical Guides' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  typeFilter === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search course, platform, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800"></div>
          ))}
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
          <BookOpen className="h-8 w-8 text-slate-400 mx-auto opacity-60" />
          <p className="text-sm font-semibold">No learning materials match your current criteria.</p>
          <button
            onClick={() => {
              setTypeFilter('all');
              setProviderFilter('all');
              setApprovalFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map(resource => {
            const isCompleted = completedIds.includes(resource.id);
            const isBusy = updatingId === resource.id;
            const isPending = resource.approvalStatus === 'pending_approval';
            const mentorName = resource.approvedByMentorName || 'Dr. Balu Prasath';

            return (
              <div
                key={resource.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all ${
                  isPending
                    ? 'border-amber-300 dark:border-amber-700/60 bg-gradient-to-b from-amber-50/20 to-white dark:from-amber-950/20 dark:to-slate-900/90'
                    : isCompleted
                    ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Type and Approval Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {getTypeIcon(resource.type)}
                      <span>{resource.type}</span>
                    </span>

                    {/* Status Pill */}
                    {isPending ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        <Clock className="h-3 w-3" /> Awaiting Mentor Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <ShieldCheck className="h-3 w-3" /> Mentor Approved
                      </span>
                    )}
                  </div>

                  {/* Course Title & Provider */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {resource.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                      <span>Provider: <strong className="text-slate-700 dark:text-slate-300">{resource.provider}</strong></span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Rationale / Why Recommended Callout */}
                  {resource.whyRecommended && (
                    <div className={`rounded-xl p-2.5 border text-[11px] space-y-1 ${
                      isPending
                        ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-200'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>AI Suggestion Rationale</span>
                      </div>
                      <p className="leading-snug text-[11px] opacity-90">{resource.whyRecommended}</p>
                    </div>
                  )}

                  {/* Faculty Mentor Endorsement Seal */}
                  {!isPending && (
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Verified & Approved by {mentorName}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      {resource.durationMinutes} mins
                    </span>
                    <span className="capitalize text-[11px] font-semibold text-slate-400">
                      Level: {resource.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <span>Launch Provider</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {isPending ? (
                      <button
                        disabled
                        title="Your faculty mentor must verify this course material before it can be marked complete."
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 cursor-not-allowed opacity-85"
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span>Pending Review</span>
                      </button>
                    ) : (
                      <button
                        disabled={isBusy}
                        onClick={() => handleToggleComplete(resource)}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Done</span>
                          </>
                        ) : (
                          <>
                            <Zap className="h-3.5 w-3.5" />
                            <span>{isBusy ? 'Saving...' : 'Mark Done'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Request AI Course Recommendation Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Course Suggestion Engine
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Request AI-Curated Courseware
                </h2>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select a skill deficit identified in your diagnostic assessments. The AI will recommend an accredited industry syllabus (Coursera, MIT OCW, Linux Foundation, etc.) and submit it directly to <strong className="text-slate-900 dark:text-white">Dr. Balu Prasath</strong> for faculty approval.
            </p>

            {requestSuccess ? (
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 p-4 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  AI Courseware Queued for Mentor Approval!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Your request has been dispatched to Dr. Balu Prasath. You will receive a notification once reviewed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestAICourse} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-300 font-semibold">
                    Target Skill Gap / Area for AI Remediation:
                  </label>
                  <select
                    value={selectedSkillGap}
                    onChange={(e) => setSelectedSkillGap(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">-- Choose from your active skill gaps --</option>
                    {skillGaps.map(g => (
                      <option key={g.skillId} value={g.skillName}>
                        {g.skillName} (Current: {g.currentLevel}% • Benchmark: {g.targetLevel}%)
                      </option>
                    ))}
                    <option value="custom">Other / Custom Engineering Topic...</option>
                  </select>
                </div>

                {selectedSkillGap === 'custom' && (
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Custom Topic / Engineering Field:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., PyTorch Quantization, Rust for Embedded Systems, FPGA Verilog..."
                      value={customSkillTopic}
                      onChange={(e) => setCustomSkillTopic(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}

                <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-[11px] text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>
                    Course recommendation will be marked <strong>"Pending Mentor Clearance"</strong> until Dr. Balu Prasath verifies academic suitability.
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRequesting}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-2 font-bold text-white transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{isRequesting ? 'Synthesizing with AI...' : 'Generate & Queue for Mentor'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
