import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { MentorIntervention, CourseRecommendation } from '../../../shared/types';
import { UserAvatar } from '../components/common/UserAvatar';
import confetti from 'canvas-confetti';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  Send,
  Plus,
  Clock,
  ShieldCheck,
  TrendingDown,
  GraduationCap,
  X,
  Check,
  BookOpen,
  ExternalLink,
  Sparkles,
  Filter,
  Layers,
  Award,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

export const MentorPortalPage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [interventions, setInterventions] = useState<MentorIntervention[]>([]);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [activeTab, setActiveTab] = useState<'approvals' | 'cohort' | 'interventions'>('approvals');
  const [recStatusFilter, setRecStatusFilter] = useState<'all' | 'pending_approval' | 'approved' | 'rejected'>('pending_approval');
  const [loading, setLoading] = useState(true);

  // Intervention modal state
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [interventionNotes, setInterventionNotes] = useState('');
  const [interventionReason, setInterventionReason] = useState('high_uncertainty');

  // Approval / Rejection modal state
  const [selectedRecForApprove, setSelectedRecForApprove] = useState<CourseRecommendation | null>(null);
  const [selectedRecForReject, setSelectedRecForReject] = useState<CourseRecommendation | null>(null);
  const [approvalFeedback, setApprovalFeedback] = useState('');
  const [rejectionFeedback, setRejectionFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getMentorStudents(),
      api.getInterventions(),
      api.getCourseRecommendations()
    ]).then(([sData, iData, rData]) => {
      setStudents(sData.students || []);
      setInterventions(iData.interventions || []);
      setRecommendations(rData.recommendations || []);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load mentor portal data:', err);
      setLoading(false);
    });
  }, []);

  const handleCreateIntervention = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !interventionNotes.trim()) return;

    try {
      const res = await api.createIntervention({
        studentId: selectedStudent.id,
        reason: interventionReason,
        notes: interventionNotes.trim()
      });

      if (res.success) {
        setInterventions(prev => [res.intervention, ...prev]);
        setInterventionNotes('');
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error('Failed to create intervention:', err);
    }
  };

  const handleApproveRecommendation = async () => {
    if (!selectedRecForApprove) return;
    setIsSubmitting(true);
    try {
      const res = await api.approveCourseRecommendation(selectedRecForApprove.id, {
        mentorId: 'user-mentor-1',
        mentorName: 'Dr. Balu Prasath',
        mentorFeedback: approvalFeedback.trim() || 'Academically audited and approved for university curriculum progression.'
      });
      if (res.success) {
        setRecommendations(prev => prev.map(r => r.id === selectedRecForApprove.id ? res.recommendation : r));
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {}
        setSelectedRecForApprove(null);
        setApprovalFeedback('');
      }
    } catch (err) {
      console.error('Failed to approve recommendation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectRecommendation = async () => {
    if (!selectedRecForReject) return;
    setIsSubmitting(true);
    try {
      const res = await api.rejectCourseRecommendation(selectedRecForReject.id, {
        mentorId: 'user-mentor-1',
        mentorName: 'Dr. Balu Prasath',
        mentorFeedback: rejectionFeedback.trim() || 'Prerequisite coursework required before this advanced module.'
      });
      if (res.success) {
        setRecommendations(prev => prev.map(r => r.id === selectedRecForReject.id ? res.recommendation : r));
        setSelectedRecForReject(null);
        setRejectionFeedback('');
      }
    } catch (err) {
      console.error('Failed to reject recommendation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingCount = recommendations.filter(r => r.status === 'pending_approval').length;
  const approvedCount = recommendations.filter(r => r.status === 'approved').length;
  const rejectedCount = recommendations.filter(r => r.status === 'rejected').length;

  const filteredRecommendations = recommendations.filter(r => {
    if (recStatusFilter === 'all') return true;
    return r.status === recStatusFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-amber-500" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mentor Workspace
            </h1>
            <span className="rounded-full bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Dr. Balu Prasath
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Academic Curriculum Oversight: Review and approve AI-suggested courseware, track student cohorts, and dispatch personalized interventions.
          </p>
        </div>

        {/* Quick Pending Badge */}
        {pendingCount > 0 && (
          <div className="self-start sm:self-auto rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 px-3.5 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 shadow-xs animate-pulse">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>{pendingCount} AI Course Proposal{pendingCount > 1 ? 's' : ''} Awaiting Approval</span>
          </div>
        )}
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'approvals'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>AI Courseware Approval Desk</span>
          {pendingCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
              activeTab === 'approvals' ? 'bg-white text-amber-700' : 'bg-amber-500 text-white'
            }`}>
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('cohort')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'cohort'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Assigned Student Cohort ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('interventions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'interventions'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Academic Interventions ({interventions.length})</span>
        </button>
      </div>

      {/* TAB 1: AI Courseware Approval Desk */}
      {activeTab === 'approvals' && (
        <div className="space-y-5">
          {/* Institutional Governance Note Banner */}
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/90 via-amber-50/40 to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 border border-amber-300 dark:border-amber-800/80">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Faculty Approval Mechanism for AI Course Suggestions
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  As faculty mentor, you serve as the critical quality filter between students and AI suggestions. Inspect the AI diagnostic rationale, verify provider rigor (Coursera, MIT OCW, Linux Foundation, NPTEL), and approve or request revision before materials unlock on the student roadmap.
                </p>
              </div>
            </div>
          </div>

          {/* Filter Chips & Metrics Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
                <Filter className="h-3 w-3" /> Status:
              </span>
              {[
                { id: 'pending_approval', label: 'Pending Review', count: pendingCount, color: 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 border-amber-300' },
                { id: 'approved', label: 'Approved & Released', count: approvedCount, color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300' },
                { id: 'rejected', label: 'Revision Requested', count: rejectedCount, color: 'text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300 border-rose-300' },
                { id: 'all', label: 'All Proposals', count: recommendations.length, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border-slate-300' }
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setRecStatusFilter(chip.id as any)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                    recStatusFilter === chip.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm border-transparent'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{chip.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black border ${chip.color}`}>
                    {chip.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations List */}
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <div className="h-8 w-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Loading courseware recommendations...</p>
            </div>
          ) : filteredRecommendations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto opacity-70" />
              <p className="text-sm font-semibold">No courseware proposals in this category.</p>
              <p className="text-xs text-slate-400">All student proposals are up to date.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredRecommendations.map(rec => {
                const isPending = rec.status === 'pending_approval';
                const isApproved = rec.status === 'approved';
                const isRejected = rec.status === 'rejected';

                return (
                  <div
                    key={rec.id}
                    className={`flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all space-y-4 ${
                      isPending
                        ? 'border-amber-300/80 dark:border-amber-700/60 bg-white dark:bg-slate-900/90 hover:shadow-md'
                        : isApproved
                        ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 opacity-80'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Student Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={rec.studentName} size="md" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                {rec.studentName}
                              </h3>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                                ({rec.studentEmail})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {rec.department} • Target: <strong className="text-blue-600 dark:text-blue-400 font-semibold">{rec.targetCareer}</strong>
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border shrink-0 ${
                          isPending
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                            : isApproved
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                        }`}>
                          {isPending ? 'Pending Faculty Audit' : isApproved ? 'Approved by Mentor' : 'Revision Requested'}
                        </span>
                      </div>

                      {/* Skill Gap Banner */}
                      <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-xs flex items-center justify-between">
                        <span className="text-amber-800 dark:text-amber-300 font-medium">Targeted Skill Deficit:</span>
                        <strong className="text-amber-900 dark:text-amber-200 font-bold">{rec.skillGapName}</strong>
                      </div>

                      {/* Recommended Courseware Metadata */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-bold text-slate-900 dark:text-white text-sm">
                            {rec.courseTitle}
                          </div>
                          <a
                            href={rec.courseUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                            title="Inspect syllabus externally"
                          >
                            <span>Inspect Syllabus</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          <span>Provider: <strong className="text-slate-700 dark:text-slate-300">{rec.provider}</strong></span>
                          <span>•</span>
                          <span className="capitalize">Format: <strong className="text-slate-700 dark:text-slate-300">{rec.type}</strong></span>
                          <span>•</span>
                          <span>Duration: <strong className="text-slate-700 dark:text-slate-300">{rec.durationMinutes} mins</strong></span>
                          <span>•</span>
                          <span className="capitalize">Level: <strong className="text-slate-700 dark:text-slate-300">{rec.difficulty}</strong></span>
                        </div>
                      </div>

                      {/* AI Diagnostic Rationale Card */}
                      <div className="rounded-xl bg-gradient-to-br from-indigo-50/80 to-blue-50/50 dark:from-indigo-950/40 dark:to-blue-950/30 p-3 border border-indigo-200/80 dark:border-indigo-800/50 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                          <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span>AI Diagnostic Rationale & Matching Engine</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                          "{rec.aiRationale}"
                        </p>
                      </div>

                      {/* Mentor Decision History if Reviewed */}
                      {!isPending && rec.mentorFeedback && (
                        <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                          isApproved
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
                        }`}>
                          <div className="flex items-center justify-between font-bold text-[11px]">
                            <span>Reviewed by {rec.mentorName || 'Dr. Balu Prasath'}</span>
                            <span className="font-mono text-[10px]">{rec.reviewedAt?.split('T')[0]}</span>
                          </div>
                          <p className="leading-snug">{rec.mentorFeedback}</p>
                        </div>
                      )}
                    </div>

                    {/* Mentor Action Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedRecForReject(rec);
                              setRejectionFeedback('');
                            }}
                            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                          >
                            Reject / Revise
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRecForApprove(rec);
                              setApprovalFeedback(`Academically audited and approved for student degree progression. Focus on modules in ${rec.skillGapName}.`);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-bold text-white transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            <span>Approve & Release</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span>Status: <strong className="capitalize text-slate-700 dark:text-slate-300">{rec.status.replace('_', ' ')}</strong></span>
                          {isApproved && (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              Unlocked on Student Hub
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Cohort Overview & Flagged Students */}
      {activeTab === 'cohort' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Assigned Cohort Roster ({students.length} Students)</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <div className="h-8 w-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Loading assigned cohort students...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map(s => {
                const hasFlags = s.flags?.highUncertainty || s.flags?.lowReadiness || s.flags?.stalled;

                return (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={s.name} size="md" />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</h3>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.degree}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Target Career:</span>
                          <strong className="text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[180px] text-right">
                            {s.targetCareer}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Career Readiness:</span>
                          <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            {s.readiness?.overallPercentage || 0}% ({s.readiness?.status || 'exploring'})
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Academic CGPA:</span>
                          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                            {s.cgpa} / 10
                          </span>
                        </div>
                      </div>

                      {/* Warning Flags */}
                      {hasFlags && (
                        <div className="space-y-1">
                          {s.flags?.highUncertainty && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-800/60">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                              <span>High Career Uncertainty ({s.uncertaintyScore}% score)</span>
                            </div>
                          )}
                          {s.flags?.lowReadiness && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-300 dark:border-rose-800/60">
                              <TrendingDown className="h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                              <span>Low Readiness Index (&lt;55%)</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="w-full rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs cursor-pointer"
                      >
                        Dispatch Intervention Note
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Active Mentor Interventions */}
      {activeTab === 'interventions' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Active Mentor Interventions & Case Notes ({interventions.length})</span>
            </h2>
          </div>

          {interventions.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-4">
              No active mentor interventions dispatched yet.
            </p>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-950">
              {interventions.map(interv => (
                <div key={interv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 dark:text-white font-bold">{interv.studentName}</strong>
                      <span className="text-[10px] font-bold uppercase bg-white dark:bg-slate-900 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                        {interv.reason.replace(/_/g, ' ')}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        interv.status === 'open'
                          ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {interv.status}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{interv.notes}</p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Created: {interv.createdAt} • Target: {interv.targetCareer}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Approve Modal */}
      {selectedRecForApprove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Faculty Curriculum Approval
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Approve Course for {selectedRecForApprove.studentName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRecForApprove(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">{selectedRecForApprove.courseTitle}</div>
              <div className="text-slate-500 dark:text-slate-400">
                Provider: {selectedRecForApprove.provider} • Target Deficit: <strong className="text-amber-600 dark:text-amber-400">{selectedRecForApprove.skillGapName}</strong>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Faculty Verification Feedback / Guidance Note:</label>
              <textarea
                rows={3}
                value={approvalFeedback}
                onChange={(e) => setApprovalFeedback(e.target.value)}
                placeholder="Add pedagogical advice or specific chapters for the student to prioritize..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRecForApprove(null)}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleApproveRecommendation}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2 font-bold text-white transition-colors shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{isSubmitting ? 'Verifying...' : 'Confirm Academic Approval'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {selectedRecForReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Prerequisite Review / Revision Request
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Reject Courseware for {selectedRecForReject.studentName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRecForReject(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">{selectedRecForReject.courseTitle}</div>
              <div className="text-slate-500 dark:text-slate-400">
                Target Deficit: <strong className="text-amber-600 dark:text-amber-400">{selectedRecForReject.skillGapName}</strong>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Revision Reason & Alternative Guidance for Student:</label>
              <textarea
                rows={3}
                required
                value={rejectionFeedback}
                onChange={(e) => setRejectionFeedback(e.target.value)}
                placeholder="Explain why this course is rejected (e.g., prerequisite math revision needed, out of syllabus scope, advanced level too steep)..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-slate-200 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRecForReject(null)}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleRejectRecommendation}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 px-5 py-2 font-bold text-white transition-colors shadow-md shadow-rose-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                <X className="h-4 w-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Issue Revision Note'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Intervention Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                  Mentor Academic Intervention
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Intervene for {selectedStudent.name}</h2>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateIntervention} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Intervention Category:</label>
                <select
                  value={interventionReason}
                  onChange={(e) => setInterventionReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="high_uncertainty">High Career Uncertainty / Indecision</option>
                  <option value="persistent_gap">Persistent Critical Skill Deficit</option>
                  <option value="assessment_failure">Repeated Assessment Benchmark Failures</option>
                  <option value="inactivity">Roadmap Inactivity / Stalled Milestones</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Guidance & Actionable Notes for Student:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter specific feedback, suggested revision resources, or counseling schedule..."
                  value={interventionNotes}
                  onChange={(e) => setInterventionNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 hover:bg-amber-500 px-5 py-2 font-bold text-white transition-colors shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  Dispatch Intervention Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
