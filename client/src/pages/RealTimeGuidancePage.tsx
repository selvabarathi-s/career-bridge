import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { DoubtQuery, DoubtReply } from '../../../shared/types';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  Sparkles,
  Award,
  CheckCircle2,
  Check,
  Send,
  Code,
  ThumbsUp,
  Search,
  Filter,
  Plus,
  Clock,
  User,
  ShieldCheck,
  ExternalLink,
  Flame,
  AlertCircle,
  Briefcase,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  Building2
} from 'lucide-react';

export const RealTimeGuidancePage: React.FC = () => {
  const { user, profile, role } = useAuth();
  const [doubts, setDoubts] = useState<DoubtQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active query thread modal
  const [activeDoubt, setActiveDoubt] = useState<DoubtQuery | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [replyCode, setReplyCode] = useState<string>('');
  const [submittingReply, setSubmittingReply] = useState(false);

  // New doubt modal
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQueryText, setNewQueryText] = useState('');
  const [newCodeSnippet, setNewCodeSnippet] = useState('');
  const [newDomain, setNewDomain] = useState('AI & Machine Learning');
  const [newCategory, setNewCategory] = useState<'technical' | 'career_guidance' | 'interview_prep' | 'academic_concept' | 'project_help'>('technical');
  const [newUrgency, setNewUrgency] = useState<'normal' | 'urgent'>('normal');
  const [newTags, setNewTags] = useState('Python, PyTorch');
  const [submittingDoubt, setSubmittingDoubt] = useState(false);

  const fetchDoubts = async () => {
    try {
      setLoading(true);
      const res = await api.getDoubts({
        domain: selectedDomain,
        category: selectedCategory,
        status: selectedStatus,
        search: searchQuery
      });
      setDoubts(res.doubts || []);
    } catch (err) {
      console.error('Failed to load doubts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, [selectedDomain, selectedCategory, selectedStatus, searchQuery]);

  const handleUpvote = async (doubtId: string) => {
    try {
      const res = await api.upvoteDoubt(doubtId);
      if (res.success) {
        setDoubts(prev => prev.map(d => d.id === doubtId ? { ...d, upvotes: res.upvotes } : d));
        if (activeDoubt && activeDoubt.id === doubtId) {
          setActiveDoubt(prev => prev ? { ...prev, upvotes: res.upvotes } : null);
        }
      }
    } catch (err) {
      console.error('Failed to upvote doubt:', err);
    }
  };

  const handleResolve = async (doubtId: string) => {
    try {
      const res = await api.resolveDoubt(doubtId);
      if (res.success) {
        setDoubts(prev => prev.map(d => d.id === doubtId ? { ...d, status: res.status as any } : d));
        if (activeDoubt && activeDoubt.id === doubtId) {
          setActiveDoubt(prev => prev ? { ...prev, status: res.status as any } : null);
        }
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Failed to resolve doubt:', err);
    }
  };

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDoubt || !replyText.trim()) return;

    setSubmittingReply(true);
    try {
      const isMentor = role === 'mentor';
      const isPlacement = role === 'placement_cell';
      const isExpert = user?.email.includes('expert') || user?.email.includes('deepmind');

      const authorRole = isMentor ? 'mentor' : isPlacement ? 'placement_cell' : isExpert ? 'industrial_expert' : 'student';
      const authorTitle = isMentor ? 'Faculty Mentor & Academic Advisor' :
                          isPlacement ? 'Head Placement Officer & Corporate Relations' :
                          isExpert ? 'Senior Industrial Practitioner' : 'Peer Engineer';
      const authorOrg = isMentor ? 'College Academic Faculty' :
                        isPlacement ? 'Central Placement Cell' :
                        'Industry Advisory Panel';

      const res = await api.replyToDoubt(activeDoubt.id, {
        authorId: user?.id || 'anon',
        authorName: user?.name || 'Academic Contributor',
        authorRole,
        authorTitle,
        authorOrg,
        content: replyText,
        codeSnippet: replyCode.trim() ? replyCode : undefined
      });

      if (res.success) {
        setActiveDoubt(res.doubt);
        setDoubts(prev => prev.map(d => d.id === res.doubt.id ? res.doubt : d));
        setReplyText('');
        setReplyCode('');
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Failed to post reply:', err);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleCreateDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQueryText.trim()) return;

    setSubmittingDoubt(true);
    try {
      const studentId = profile?.id || user?.profileId || 'student-selva';
      const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean);

      const res = await api.createDoubt({
        studentId,
        title: newTitle,
        queryText: newQueryText,
        codeSnippet: newCodeSnippet.trim() ? newCodeSnippet : undefined,
        domain: newDomain,
        category: newCategory,
        tags: tagsArray,
        urgency: newUrgency
      });

      if (res.success) {
        setDoubts(prev => [res.doubt, ...prev]);
        setIsAskModalOpen(false);
        setNewTitle('');
        setNewQueryText('');
        setNewCodeSnippet('');
        try {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Failed to submit doubt:', err);
    } finally {
      setSubmittingDoubt(false);
    }
  };

  const domains = [
    { id: 'all', label: 'All Domains' },
    { id: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { id: 'Cloud DevOps & SRE', label: 'Cloud DevOps & SRE' },
    { id: 'Biomedical & Hardware', label: 'Biomedical & Hardware' },
    { id: 'Data Analytics & SQL', label: 'Data Analytics & SQL' },
    { id: 'Placement Preparation', label: 'Placement Preparation' },
    { id: 'Civil & Infrastructure', label: 'Civil & Infrastructure' }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'technical', label: 'Technical Doubts' },
    { id: 'interview_prep', label: 'Interview Prep' },
    { id: 'academic_concept', label: 'Academic Concepts' },
    { id: 'project_help', label: 'Project Guidance' }
  ];

  const getAuthorBadge = (role: string) => {
    switch (role) {
      case 'industrial_expert':
        return {
          label: 'Verified Industry Expert',
          className: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800'
        };
      case 'mentor':
        return {
          label: 'Faculty Mentor',
          className: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800'
        };
      case 'placement_cell':
        return {
          label: 'Placement Cell',
          className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      default:
        return {
          label: 'Student Contributor',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800'
        };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Real-Time Guidance & Doubt Clearance Hub
            </h1>
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Live Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Get personalized, real-time replies to your engineering and interview queries from certified faculty mentors (Dr. Balu Prasath) and verified industry practitioners (Google, AWS, Bosch, Microsoft, L&T).
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-blue-600/20 shrink-0 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Ask Doubt / Query</span>
        </button>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Industry Experts Active</div>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            <span>Google, AWS, Bosch, L&T</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Queries Cleared</div>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>{doubts.length} Resolved Threads</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Median Expert Response</div>
          <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>&lt; 45 Minutes</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Faculty Mentorship</div>
          <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" />
            <span>Dr. Balu Prasath Online</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-2.5">
        {/* Domain Chips */}
        <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-none items-center">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Domain:
          </span>
          {domains.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDomain(d.id)}
              className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 ${
                selectedDomain === d.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Category Chips & Search Box */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex overflow-x-auto pb-1 md:pb-0 gap-1.5 scrollbar-none items-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Topic:
            </span>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === c.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search doubts, codes, topics, experts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Doubts Feed */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-900/60 animate-pulse border border-slate-200 dark:border-slate-800"></div>
          ))}
        </div>
      ) : doubts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400">
          No questions found matching your filter criteria. Be the first to ask a doubt!
        </div>
      ) : (
        <div className="space-y-4">
          {doubts.map(doubt => {
            const hasVerifiedReply = doubt.replies.some(r => r.verified);
            const verifiedReply = doubt.replies.find(r => r.verified);

            return (
              <div
                key={doubt.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs transition-all hover:border-blue-300 dark:hover:border-blue-900/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="rounded-md bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 uppercase tracking-wider">
                        {doubt.domain}
                      </span>
                      <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">
                        {doubt.category.replace('_', ' ')}
                      </span>
                      {doubt.urgency === 'urgent' && (
                        <span className="rounded-md bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                          <Flame className="h-3 w-3" /> Urgent
                        </span>
                      )}
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        doubt.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                          : doubt.status === 'answered'
                          ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
                          : 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                      }`}>
                        {doubt.status}
                      </span>
                    </div>

                    <h2
                      onClick={() => setActiveDoubt(doubt)}
                      className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                    >
                      {doubt.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => handleUpvote(doubt.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ThumbsUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{doubt.upvotes}</span>
                    </button>

                    <button
                      onClick={() => setActiveDoubt(doubt)}
                      className="flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-bold text-white transition-colors"
                    >
                      <span>View Thread</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {doubt.queryText}
                </p>

                {/* Code Snippet Preview */}
                {doubt.codeSnippet && (
                  <pre className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-24">
                    <code>{doubt.codeSnippet}</code>
                  </pre>
                )}

                {/* Tags and Verified Solution Banner */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <User className="h-3 w-3" /> Asked by <strong>{doubt.studentName}</strong>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-1 flex-wrap">
                      {doubt.tags.map((t, i) => (
                        <span key={i} className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {hasVerifiedReply && verifiedReply && (
                    <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-900/60 text-[11px] font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                      <span>Verified Solution by {verifiedReply.authorName} ({verifiedReply.authorOrg})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Discussion & Solution Thread Modal */}
      {activeDoubt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 uppercase tracking-wider">
                    {activeDoubt.domain}
                  </span>
                  <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">
                    {activeDoubt.category.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    activeDoubt.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
                  }`}>
                    {activeDoubt.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeDoubt.title}</h2>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Asked by <strong className="text-slate-700 dark:text-slate-300">{activeDoubt.studentName}</strong> • {new Date(activeDoubt.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={() => setActiveDoubt(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Query Body */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 space-y-3 leading-relaxed">
              <MarkdownRenderer content={activeDoubt.queryText} />
              {activeDoubt.codeSnippet && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Attached Code:</span>
                  <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                    <code>{activeDoubt.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Action Buttons for Question */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={() => handleUpvote(activeDoubt.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors font-semibold"
              >
                <ThumbsUp className="h-3.5 w-3.5 text-blue-600" />
                <span>Helpful Question ({activeDoubt.upvotes})</span>
              </button>

              <button
                onClick={() => handleResolve(activeDoubt.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  activeDoubt.status === 'resolved'
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{activeDoubt.status === 'resolved' ? 'Marked as Resolved' : 'Mark as Resolved'}</span>
              </button>
            </div>

            {/* Verified Answers & Discussion Replies */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Replies & Verified Expert Solutions</span>
                  <span className="rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 text-[10px] font-bold">
                    {activeDoubt.replies.length}
                  </span>
                </h3>
              </div>

              {activeDoubt.replies.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-500">
                  No solutions yet. Be the first mentor or expert to respond!
                </div>
              ) : (
                <div className="space-y-4">
                  {activeDoubt.replies.map(reply => {
                    const badge = getAuthorBadge(reply.authorRole);

                    return (
                      <div
                        key={reply.id}
                        className={`rounded-2xl border p-4.5 space-y-3 ${
                          reply.verified
                            ? 'border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                              {reply.authorName.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{reply.authorName}</span>
                                {reply.verified && (
                                  <span className="text-purple-600 dark:text-purple-400" title="Verified Solution by Certified Mentor/Expert">
                                    ✓
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                {reply.authorTitle} • <strong className="text-slate-700 dark:text-slate-300">{reply.authorOrg}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.className}`}>
                              {badge.label}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Reply Content */}
                        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <MarkdownRenderer content={reply.content} />
                        </div>

                        {/* Code snippet if provided */}
                        {reply.codeSnippet && (
                          <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                            <code>{reply.codeSnippet}</code>
                          </pre>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Post Reply Form */}
            <form onSubmit={handlePostReply} className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Post Solution / Mentor Guidance:
              </label>
              <textarea
                rows={3}
                placeholder="Type your explanation, architectural advice, or guidance..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Optional code snippet or terminal command..."
                value={replyCode}
                onChange={(e) => setReplyCode(e.target.value)}
                className="w-full font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={submittingReply || !replyText.trim()}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2 text-xs font-bold text-white transition-colors shadow-md shadow-blue-600/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submittingReply ? 'Posting...' : 'Post Solution'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ask Doubt Modal */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Post to Real-Time Guidance Forum
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ask a Doubt / Query</h2>
              </div>
              <button
                onClick={() => setIsAskModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDoubt} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Question Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to prevent memory leaks in WebSocket goroutines?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Domain:</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud DevOps & SRE">Cloud DevOps & SRE</option>
                    <option value="Biomedical & Hardware">Biomedical & Hardware</option>
                    <option value="Data Analytics & SQL">Data Analytics & SQL</option>
                    <option value="Placement Preparation">Placement Preparation</option>
                    <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                    <option value="Robotics & Autonomous Systems">Robotics & Autonomous Systems</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Category:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="technical">Technical Doubt</option>
                    <option value="interview_prep">Interview Prep</option>
                    <option value="academic_concept">Academic Concept</option>
                    <option value="project_help">Project Guidance</option>
                    <option value="career_guidance">Career Guidance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Detailed Description:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain what you are trying to accomplish, the error you see, and what you have attempted..."
                  value={newQueryText}
                  onChange={(e) => setNewQueryText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Optional Code / Error Log:</label>
                <textarea
                  rows={3}
                  placeholder="// Paste your code block or error snippet here..."
                  value={newCodeSnippet}
                  onChange={(e) => setNewCodeSnippet(e.target.value)}
                  className="w-full font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tags (comma separated):</label>
                  <input
                    type="text"
                    placeholder="e.g. Python, Docker, PyTorch"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Priority Urgency:</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="normal">Normal (Standard queue)</option>
                    <option value="urgent">Urgent (Upcoming interview / imminent submission)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAskModalOpen(false)}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDoubt}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2 text-xs font-bold text-white transition-colors shadow-md shadow-blue-600/20"
                >
                  <span>{submittingDoubt ? 'Submitting...' : 'Post to Forum'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
