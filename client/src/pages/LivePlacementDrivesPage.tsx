import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { PlacementCompanyDrive, PlacementApplication } from '../../../shared/types';
import confetti from 'canvas-confetti';
import {
  Building2,
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  FileText,
  BadgeCheck,
  ArrowUpRight
} from 'lucide-react';

export const LivePlacementDrivesPage: React.FC = () => {
  const { user, profile, role } = useAuth();
  const [drives, setDrives] = useState<PlacementCompanyDrive[]>([]);
  const [applications, setApplications] = useState<PlacementApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'drives' | 'my_applications'>('drives');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [onlyEligible, setOnlyEligible] = useState(false);

  // Modals
  const [selectedDrive, setSelectedDrive] = useState<PlacementCompanyDrive | null>(null);
  const [applyingDrive, setApplyingDrive] = useState<PlacementCompanyDrive | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  const studentId = user?.studentId || profile?.id || (user ? `STU-${user.id}` : 'STU-001');
  const studentCgpa = profile?.cgpa ?? 8.5;
  const studentReadiness = profile?.readinessScore?.overallPercentage ?? 75;
  const studentStream = profile?.stream || 'Computer Science & Engineering';

  const fetchData = async () => {
    try {
      setLoading(true);
      const drivesRes = await api.getPlacementDrives();
      setDrives(drivesRes.drives || []);

      if (user?.studentId || profile?.id || user?.id) {
        const idToQuery = user?.studentId || profile?.id || `STU-${user?.id}`;
        const appsRes = await api.getStudentApplications(idToQuery);
        setApplications(appsRes.applications || []);
      }
    } catch (err) {
      console.error('Failed to load placement data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.studentId, profile?.id, user?.id]);

  // Check student eligibility for a drive
  const checkEligibility = (drive: PlacementCompanyDrive) => {
    const isDeptEligible =
      drive.eligibleDepartments.includes('All Engineering Branches') ||
      drive.eligibleDepartments.some(
        dept =>
          studentStream.toLowerCase().includes(dept.toLowerCase()) ||
          dept.toLowerCase().includes(studentStream.toLowerCase())
      );

    const isCgpaEligible = studentCgpa >= drive.minCgpa;
    const isReadinessEligible = studentReadiness >= drive.minReadinessScore;

    const isFullyEligible = isDeptEligible && isCgpaEligible && isReadinessEligible;
    const isMarginal = isDeptEligible && (
      (!isCgpaEligible && studentCgpa >= drive.minCgpa - 0.5) ||
      (!isReadinessEligible && studentReadiness >= drive.minReadinessScore - 10)
    );

    return {
      isFullyEligible,
      isMarginal,
      isDeptEligible,
      isCgpaEligible,
      isReadinessEligible
    };
  };

  const getApplicationForDrive = (driveId: string) => {
    return applications.find(app => app.driveId === driveId);
  };

  // Submit application
  const handleApply = async (drive: PlacementCompanyDrive) => {
    try {
      setIsApplying(true);
      const res = await api.applyToPlacementDrive(drive.id, studentId);
      if (res.success && res.application) {
        setApplications(prev => [res.application!, ...prev]);
        setDrives(prev =>
          prev.map(d =>
            d.id === drive.id
              ? { ...d, registeredStudentIds: [...(d.registeredStudentIds || []), studentId] }
              : d
          )
        );
        setApplyingDrive(null);
        setApplicationSuccess(drive.companyName);

        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore confetti errors
        }

        setTimeout(() => setApplicationSuccess(null), 5000);
      } else {
        alert(res.error || 'Failed to submit application.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred during application.');
    } finally {
      setIsApplying(false);
    }
  };

  // Filtered drives
  const filteredDrives = drives.filter(drive => {
    if (selectedIndustry !== 'all' && drive.industry !== selectedIndustry) return false;
    if (selectedStatus !== 'all' && drive.status !== selectedStatus) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = drive.companyName.toLowerCase().includes(q);
      const matchesRole = drive.roleTitle.toLowerCase().includes(q);
      const matchesLocation = drive.workLocation.toLowerCase().includes(q);
      const matchesSkills = drive.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!matchesName && !matchesRole && !matchesLocation && !matchesSkills) return false;
    }

    if (onlyEligible) {
      const { isFullyEligible } = checkEligibility(drive);
      if (!isFullyEligible) return false;
    }

    return true;
  });

  const industries = Array.from(new Set(drives.map(d => d.industry)));

  const getStatusBadge = (status: PlacementCompanyDrive['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Drive
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Clock className="h-3 w-3" /> Upcoming
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Users className="h-3 w-3" /> In Selection
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 border border-slate-500/30 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
            Completed
          </span>
        );
    }
  };

  const getAppStageBadge = (status: PlacementApplication['status']) => {
    switch (status) {
      case 'offer_extended':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Award className="h-3.5 w-3.5" /> Offer Extended
          </span>
        );
      case 'interview_scheduled':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <Clock className="h-3.5 w-3.5" /> Interview Scheduled
          </span>
        );
      case 'assessment_cleared':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/15 border border-blue-500/30 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Assessment Cleared
          </span>
        );
      case 'shortlisted':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
            <BadgeCheck className="h-3.5 w-3.5" /> Shortlisted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
            <X className="h-3.5 w-3.5" /> Application Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Clock className="h-3.5 w-3.5" /> Under Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/30 p-6 md:p-8 backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
                <Building2 className="h-3.5 w-3.5 text-blue-400" /> Tier-1 Campus Recruitment
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Placement Season 2026
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
              Placement Opportunities
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time recruitment drives from Fortune 500 engineering and tech enterprises.
              Eligibility dynamically computed against your academic performance, stream, and Career Readiness Score.
            </p>
          </div>

          {/* Student Profile Quick Readiness Pill */}
          {role === 'student' && (
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 min-w-[260px] backdrop-blur-md shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Eligibility Profile</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {studentReadiness}% Ready
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">CGPA:</span>
                  <span className="font-semibold text-white">{studentCgpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Branch:</span>
                  <span className="font-semibold text-white truncate max-w-[150px] text-right" title={studentStream}>
                    {studentStream}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Applications:</span>
                  <span className="font-semibold text-blue-400 font-mono">{applications.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Banner */}
      {applicationSuccess && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-bold">Application Successfully Submitted to {applicationSuccess}!</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                The Placement Cell Directorate has recorded your profile and forwarded your verified credentials to the corporate recruitment team.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('my_applications')}
            className="text-xs font-bold underline hover:no-underline ml-4 whitespace-nowrap"
          >
            View in My Applications
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('drives')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'drives'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Active Recruitment Drives</span>
            <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.2 text-[11px] font-mono">
              {drives.length}
            </span>
          </button>

          {role === 'student' && (
            <button
              onClick={() => setActiveTab('my_applications')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'my_applications'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>My Applications</span>
              <span className="ml-1.5 rounded-full bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.2 text-[11px] font-mono text-blue-700 dark:text-blue-300">
                {applications.length}
              </span>
            </button>
          )}
        </div>

        {activeTab === 'drives' && (
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyEligible}
                onChange={e => setOnlyEligible(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Show Only Eligible Drives</span>
            </label>
          </div>
        )}
      </div>

      {activeTab === 'drives' ? (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by company name, job role, required skills (e.g. AWS, PyTorch, C++)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedIndustry}
                onChange={e => setSelectedIndustry(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Industries</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Now</option>
                <option value="upcoming">Upcoming</option>
                <option value="in_progress">In Selection</option>
              </select>
            </div>
          </div>

          {/* Drives Cards Grid */}
          {loading ? (
            <div className="py-16 text-center text-slate-400">
              <div className="h-8 w-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Fetching live placement drives...</p>
            </div>
          ) : filteredDrives.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
              <Building2 className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No recruitment drives matched</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try adjusting your search criteria, clearing the eligibility filter, or exploring other industrial domains.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDrives.map(drive => {
                const eligibility = checkEligibility(drive);
                const app = getApplicationForDrive(drive.id);
                const isRegistered = !!app || drive.registeredStudentIds?.includes(studentId);

                return (
                  <div
                    key={drive.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 md:p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                  >
                    {/* Top Company Header */}
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-600 dark:text-blue-400 font-extrabold text-lg border border-blue-500/20">
                            {drive.companyName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                {drive.companyName}
                              </h2>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                {drive.industry}
                              </span>
                            </div>
                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                              {drive.roleTitle}
                            </h3>
                          </div>
                        </div>
                        <div>{getStatusBadge(drive.status)}</div>
                      </div>

                      {/* Package & Key Details Bar */}
                      <div className="grid grid-cols-3 gap-2 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-center">
                        <div>
                          <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Package</span>
                          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                            {drive.ctcPackage}
                          </span>
                        </div>
                        <div className="border-x border-slate-200 dark:border-slate-700/60">
                          <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Role Type</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">
                            {drive.jobType === 'internship_to_fte' ? 'Intern + FTE' : 'Full Time'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Openings</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                            {drive.hiringCount} seats
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                        {drive.description}
                      </p>

                      {/* Meta Info: Location, Drive Date */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" /> {drive.workLocation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" /> Drive: {new Date(drive.driveDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-amber-500" /> Deadline: {new Date(drive.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      {/* Dynamic Eligibility Breakdown */}
                      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-3 mb-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700 dark:text-slate-300">Eligibility Status</span>
                          {eligibility.isFullyEligible ? (
                            <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Eligible to Apply
                            </span>
                          ) : eligibility.isMarginal ? (
                            <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 text-xs">
                              <AlertCircle className="h-3.5 w-3.5" /> Marginal Gap
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 font-bold text-slate-500 text-xs">
                              <X className="h-3.5 w-3.5" /> Criteria Not Met
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                          <div className={`p-1.5 rounded-lg border ${eligibility.isDeptEligible ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-700 dark:text-rose-300'}`}>
                            <span className="block font-semibold">Branch</span>
                            <span className="truncate block">{eligibility.isDeptEligible ? 'Eligible' : 'Branch Mismatch'}</span>
                          </div>
                          <div className={`p-1.5 rounded-lg border ${eligibility.isCgpaEligible ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-700 dark:text-rose-300'}`}>
                            <span className="block font-semibold">CGPA ≥ {drive.minCgpa}</span>
                            <span>{studentCgpa.toFixed(1)} {eligibility.isCgpaEligible ? '✓' : '✗'}</span>
                          </div>
                          <div className={`p-1.5 rounded-lg border ${eligibility.isReadinessEligible ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60 text-amber-700 dark:text-amber-300'}`}>
                            <span className="block font-semibold">Readiness ≥ {drive.minReadinessScore}%</span>
                            <span>{studentReadiness}% {eligibility.isReadinessEligible ? '✓' : '✗'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Required Skills Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {drive.requiredSkills.map(skill => (
                          <span
                            key={skill}
                            className="rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => setSelectedDrive(drive)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>

                      {isRegistered ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            {app ? getAppStageBadge(app.status) : 'Applied'}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setApplyingDrive(drive)}
                          disabled={!eligibility.isFullyEligible}
                          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                            eligibility.isFullyEligible
                              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <span>{eligibility.isFullyEligible ? 'Apply for Drive' : 'Ineligible'}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* My Applications Tab */
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
              <FileText className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No applications submitted yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Explore the active recruitment drives above and apply to tier-1 companies matching your engineering specializations.
              </p>
              <button
                onClick={() => setActiveTab('drives')}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700"
              >
                <span>Browse Drives</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map(app => {
                const drive = drives.find(d => d.id === app.driveId);
                return (
                  <div
                    key={app.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 font-extrabold text-lg border border-blue-500/20">
                          {drive ? drive.companyName.charAt(0) : 'C'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {drive ? drive.companyName : 'Engineering Enterprise'}
                            </h3>
                            <span className="text-xs font-mono text-slate-400">
                              App #{app.id.slice(-6)}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {drive?.roleTitle} • {drive?.ctcPackage}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <span className="block text-[11px] text-slate-400">Applied Date</span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        {getAppStageBadge(app.status)}
                      </div>
                    </div>

                    {/* Progress Stepper */}
                    <div className="py-5">
                      <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {[
                          { key: 'applied', label: 'Applied' },
                          { key: 'shortlisted', label: 'Shortlisted' },
                          { key: 'assessment_cleared', label: 'Assessment' },
                          { key: 'interview_scheduled', label: 'Interview' },
                          { key: 'offer_extended', label: 'Offer' }
                        ].map((step, idx) => {
                          const stages = ['applied', 'shortlisted', 'assessment_cleared', 'interview_scheduled', 'offer_extended'];
                          const currentIdx = stages.indexOf(app.status);
                          const isDone = currentIdx >= idx;
                          const isCurrent = currentIdx === idx;

                          return (
                            <div key={step.key} className="flex flex-col items-center flex-1 relative">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all z-10 ${
                                  isCurrent
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                                    : isDone
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                                }`}
                              >
                                {isDone && !isCurrent ? <Check className="h-4 w-4" /> : idx + 1}
                              </div>
                              <span
                                className={`text-[11px] mt-1.5 text-center font-medium ${
                                  isCurrent
                                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                                    : isDone
                                    ? 'text-slate-700 dark:text-slate-300'
                                    : 'text-slate-400'
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Placement Directorate & Recruiter Feedback Note */}
                    {app.feedback && (
                      <div className="rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 p-3.5 text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-bold text-blue-900 dark:text-blue-200">
                            Placement Directorate & Recruiter Feedback
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                          "{app.feedback}"
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Drive Details Modal */}
      {selectedDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-xl border border-blue-500/20">
                  {selectedDrive.companyName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedDrive.companyName}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    {selectedDrive.roleTitle} • {selectedDrive.ctcPackage}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDrive(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Role Description</h4>
                <p className="leading-relaxed">{selectedDrive.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Industry</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDrive.industry}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Location</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDrive.workLocation}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Min CGPA</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDrive.minCgpa}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Min Readiness</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDrive.minReadinessScore}%</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Eligible Engineering Branches</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDrive.eligibleDepartments.map(dept => (
                    <span key={dept} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Selection Process</h4>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  {selectedDrive.selectionProcess.map((step, idx) => (
                    <li key={idx} className="text-slate-700 dark:text-slate-300 font-medium">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDrive.requiredSkills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedDrive(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              {checkEligibility(selectedDrive).isFullyEligible && !getApplicationForDrive(selectedDrive.id) && (
                <button
                  onClick={() => {
                    const d = selectedDrive;
                    setSelectedDrive(null);
                    setApplyingDrive(d);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                >
                  Proceed to Apply
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1-Click Application Confirmation Modal */}
      {applyingDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                  Confirm Drive Application
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {applyingDrive.companyName}
                </h3>
                <p className="text-xs text-slate-500">{applyingDrive.roleTitle} • {applyingDrive.ctcPackage}</p>
              </div>
              <button
                onClick={() => setApplyingDrive(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 space-y-2 text-xs">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                The Placement Cell will transmit your verified credentials:
              </p>
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Candidate:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{profile?.fullName || user?.name || 'Student'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Student ID:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic CGPA:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">{studentCgpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Career Readiness:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">{studentReadiness}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Department:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{studentStream}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              By submitting, you authorize the college Placement Cell Directorate to forward your academic transcript and CareerBridge readiness metrics to {applyingDrive.companyName} for the upcoming selection drive.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setApplyingDrive(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApply(applyingDrive)}
                disabled={isApplying}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 disabled:opacity-50"
              >
                {isApplying ? 'Submitting...' : 'Confirm & Apply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
