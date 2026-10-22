import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  PlacementCompanyDrive,
  PlacementApplication,
  PlacementAnalyticsSummary
} from '../../../shared/types';
import confetti from 'canvas-confetti';
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  FileText,
  BadgeCheck,
  ArrowUpRight,
  DollarSign,
  GraduationCap,
  ChevronDown,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const PlacementCellPortalPage: React.FC = () => {
  const { user, role } = useAuth();
  const [drives, setDrives] = useState<PlacementCompanyDrive[]>([]);
  const [analytics, setAnalytics] = useState<PlacementAnalyticsSummary | null>(null);
  const [selectedDriveId, setSelectedDriveId] = useState<string>('');
  const [driveApplications, setDriveApplications] = useState<PlacementApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);

  const [activeTab, setActiveTab] = useState<'drives' | 'pipeline' | 'analytics'>('drives');

  // New Drive Modal
  const [isNewDriveModalOpen, setIsNewDriveModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Enterprise Cloud & Software');
  const [roleTitle, setRoleTitle] = useState('');
  const [ctcPackage, setCtcPackage] = useState('₹18.5 LPA');
  const [jobType, setJobType] = useState<'full_time' | 'internship_to_fte'>('full_time');
  const [workLocation, setWorkLocation] = useState('Bengaluru / Hyderabad');
  const [minCgpa, setMinCgpa] = useState(7.5);
  const [minReadiness, setMinReadiness] = useState(70);
  const [hiringCount, setHiringCount] = useState(15);
  const [driveDate, setDriveDate] = useState('2026-10-15');
  const [deadline, setDeadline] = useState('2026-10-05');
  const [eligibleDepts, setEligibleDepts] = useState('Computer Science, Artificial Intelligence, IT, Electronics & Communication');
  const [skills, setSkills] = useState('Distributed Systems, Java/Python, Cloud, SQL');
  const [description, setDescription] = useState('');
  const [submittingDrive, setSubmittingDrive] = useState(false);

  // Status updating state
  const [feedbackInput, setFeedbackInput] = useState<{ [appId: string]: string }>({});
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [drivesRes, analyticsRes] = await Promise.all([
        api.getPlacementDrives(),
        api.getPlacementAnalytics()
      ]);
      setDrives(drivesRes.drives || []);
      setAnalytics(analyticsRes.summary || null);

      if (drivesRes.drives && drivesRes.drives.length > 0) {
        setSelectedDriveId(drivesRes.drives[0].id);
      }
    } catch (err) {
      console.error('Failed to load placement directorate data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadDriveApplications = async (driveId: string) => {
    try {
      setLoadingApps(true);
      const res = await api.getDriveApplications(driveId);
      setDriveApplications(res.applications || []);
    } catch (err) {
      console.error('Failed to load drive applications:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    if (selectedDriveId) {
      loadDriveApplications(selectedDriveId);
    }
  }, [selectedDriveId]);

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !roleTitle.trim()) {
      alert('Please provide company name and role title.');
      return;
    }

    try {
      setSubmittingDrive(true);
      const newDriveData: Partial<PlacementCompanyDrive> = {
        companyName,
        industry,
        roleTitle,
        ctcPackage,
        jobType,
        workLocation,
        minCgpa: Number(minCgpa),
        minReadinessScore: Number(minReadiness),
        hiringCount: Number(hiringCount),
        driveDate,
        applicationDeadline: deadline,
        eligibleDepartments: eligibleDepts.split(',').map(s => s.trim()).filter(Boolean),
        requiredSkills: skills.split(',').map(s => s.trim()).filter(Boolean),
        selectionProcess: ['Online Cognitive & Technical Assessment', 'Technical Coding Round', 'System Design / Domain Interview', 'HR & Leadership Evaluation'],
        description: description || `Campus recruitment drive for ${roleTitle} at ${companyName}.`,
        status: 'active'
      };

      const res = await api.createPlacementDrive(newDriveData);
      if (res.success && res.drive) {
        setDrives(prev => [res.drive, ...prev]);
        setIsNewDriveModalOpen(false);
        // Reset form
        setCompanyName('');
        setRoleTitle('');
        setDescription('');
        try {
          confetti({ particleCount: 70, spread: 50, origin: { y: 0.5 } });
        } catch {
          // ignore
        }
      }
    } catch (err: any) {
      alert(err.message || 'Failed to post drive.');
    } finally {
      setSubmittingDrive(false);
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: string) => {
    try {
      setUpdatingAppId(appId);
      const fb = feedbackInput[appId] || undefined;
      const res = await api.updateApplicationStatus(appId, newStatus, fb);
      if (res.success && res.application) {
        setDriveApplications(prev =>
          prev.map(a => a.id === appId ? res.application : a)
        );
        if (newStatus === 'offer_extended') {
          try {
            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
        }
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update candidate status.');
    } finally {
      setUpdatingAppId(null);
    }
  };

  const selectedDrive = drives.find(d => d.id === selectedDriveId);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Placement Directorate */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-blue-950/40 p-6 md:p-8 backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                <Building2 className="h-3.5 w-3.5 text-emerald-400" /> College Placement Directorate
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> Institutional Console
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
              Placement Management
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Supervise company recruitment drives, coordinate Tier-1 hiring pipelines, verify student eligibility scores, and dispatch real-time interview stage updates to candidates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setIsNewDriveModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Post New Recruitment Drive</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      {analytics && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Drives</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{analytics.totalDrives}</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{analytics.activeDrives} active</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Applications</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{analytics.totalApplications}</span>
              <span className="text-[11px] text-slate-400 font-medium">processed</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Offers Extended</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{analytics.totalOffersExtended}</span>
              <span className="text-[11px] text-emerald-500 font-bold">Selected</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Average Package</span>
            <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono block">
              {analytics.averageCtc}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Highest Package</span>
            <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono block">
              {analytics.highestCtc}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Placement Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {analytics.placementRatePercentage}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('drives')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'drives'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Active Drives Management ({drives.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'pipeline'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Candidate Pipeline & Interview Stages</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Department Placement Stats</span>
        </button>
      </div>

      {/* TAB 1: DRIVES LIST */}
      {activeTab === 'drives' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drives.map(drive => (
              <div
                key={drive.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-base border border-emerald-500/20">
                        {drive.companyName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">{drive.companyName}</h3>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{drive.roleTitle}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase">
                      {drive.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 p-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Package</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{drive.ctcPackage}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Openings</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{drive.hiringCount} seats</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <p className="line-clamp-2">{drive.description}</p>
                    <div className="flex justify-between pt-1 text-[11px]">
                      <span>Min CGPA: <strong>{drive.minCgpa}</strong></span>
                      <span>Min Readiness: <strong>{drive.minReadinessScore}%</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="h-3.5 w-3.5" />
                    <span>{drive.registeredStudentIds?.length || 0} Applied</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDriveId(drive.id);
                      setActiveTab('pipeline');
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>Manage Pipeline</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-5">
          {/* Drive Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-emerald-500" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Active Company Selection Pipeline</span>
                <select
                  value={selectedDriveId}
                  onChange={e => setSelectedDriveId(e.target.value)}
                  className="mt-0.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {drives.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.companyName} — {d.roleTitle} ({d.ctcPackage})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedDrive && (
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Seats: <strong className="text-slate-800 dark:text-slate-200">{selectedDrive.hiringCount}</strong></span>
                <span>•</span>
                <span>Applicants: <strong className="text-emerald-600 dark:text-emerald-400">{driveApplications.length}</strong></span>
              </div>
            )}
          </div>

          {/* Applications List */}
          {loadingApps ? (
            <div className="py-12 text-center text-slate-400">
              <div className="h-7 w-7 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Loading applicants pipeline...</p>
            </div>
          ) : driveApplications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
              <Users className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No student applications for this drive yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Eligible students matching this drive's criteria will be able to apply directly from their portal.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {driveApplications.map(app => (
                <div
                  key={app.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-base border border-blue-500/20">
                        {app.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{app.studentName}</h4>
                          <span className="text-xs font-mono text-slate-400">({app.studentId})</span>
                        </div>
                        <p className="text-xs text-slate-500">{app.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">CGPA</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{app.cgpa?.toFixed(2) || '8.50'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Readiness</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{app.readinessPercentage || 75}%</span>
                      </div>
                      <div className="pl-3 border-l border-slate-200 dark:border-slate-700">
                        <span className="text-slate-400 block text-[10px]">Current Stage</span>
                        <span className="font-bold text-purple-600 dark:text-purple-400 capitalize">
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recruiter / Placement Note & Stage Advancer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Recruiter Stage Feedback / Assessment Notes:
                      </label>
                      <input
                        type="text"
                        defaultValue={app.feedback || ''}
                        onChange={e => setFeedbackInput(prev => ({ ...prev, [app.id]: e.target.value }))}
                        placeholder="e.g. Scored 94% on coding assessment; scheduled for Round 2..."
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 md:pt-0">
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'shortlisted')}
                        disabled={updatingAppId === app.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 cursor-pointer"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'assessment_cleared')}
                        disabled={updatingAppId === app.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 cursor-pointer"
                      >
                        Clear Assessment
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'interview_scheduled')}
                        disabled={updatingAppId === app.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 cursor-pointer"
                      >
                        Schedule Interview
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'offer_extended')}
                        disabled={updatingAppId === app.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
                      >
                        Extend Offer
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        disabled={updatingAppId === app.id}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DEPARTMENT STATS */}
      {activeTab === 'analytics' && analytics && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Branch-wise Placement Performance (2025 - 2026 Season)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Live placement conversion rate across all engineering departments.
            </p>
          </div>

          <div className="space-y-4">
            {analytics.departmentPlacementStats.map(stat => (
              <div key={stat.department} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {stat.department}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono">
                      {stat.placedStudents} / {stat.totalStudents} placed
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono w-12 text-right">
                      {stat.placementPercentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${stat.placementPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: POST NEW RECRUITMENT DRIVE */}
      {isNewDriveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  College Placement Directorate
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Launch New Campus Recruitment Drive
                </h3>
              </div>
              <button
                onClick={() => setIsNewDriveModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDrive} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Cisco Systems, Intel, Siemens..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry Sector</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    placeholder="e.g. Cloud & Networking, Semiconductor..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Role Title</label>
                  <input
                    type="text"
                    required
                    value={roleTitle}
                    onChange={e => setRoleTitle(e.target.value)}
                    placeholder="e.g. Software Engineer - Cloud Platforms"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">CTC Package</label>
                  <input
                    type="text"
                    required
                    value={ctcPackage}
                    onChange={e => setCtcPackage(e.target.value)}
                    placeholder="e.g. ₹22.0 LPA"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Min CGPA Required</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="10"
                    value={minCgpa}
                    onChange={e => setMinCgpa(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Min Readiness Score (%)</label>
                  <input
                    type="number"
                    min="30"
                    max="100"
                    value={minReadiness}
                    onChange={e => setMinReadiness(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Drive Date</label>
                  <input
                    type="date"
                    value={driveDate}
                    onChange={e => setDriveDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Eligible Departments (comma separated)</label>
                <input
                  type="text"
                  value={eligibleDepts}
                  onChange={e => setEligibleDepts(e.target.value)}
                  placeholder="e.g. Computer Science, AI-DS, IT, Electronics"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  placeholder="e.g. Python, Docker, Algorithms, AWS"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Drive Description & Eligibility Notes</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide role requirements, hiring expectations, and location preferences..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewDriveModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDrive}
                  className="px-4 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 disabled:opacity-50"
                >
                  {submittingDrive ? 'Publishing...' : 'Publish Recruitment Drive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
