import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Career, DisciplineType } from '../../../shared/types';
import {
  Briefcase,
  Search,
  Check,
  TrendingUp,
  Award,
  GitCompare,
  ExternalLink,
  GraduationCap,
  Filter,
  Layers,
  Sparkles,
  BookOpen,
  Rocket,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const CareerExplorer: React.FC = () => {
  const { profile, user, role, targetCareer, setTargetCareer } = useAuth();
  const navigate = useNavigate();

  const isStudent = role === 'student';
  const studentDiscipline = profile?.discipline || (user as any)?.discipline || 'engineering';

  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(isStudent ? studentDiscipline : 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [showAllDisciplines, setShowAllDisciplines] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  // Keep student discipline locked to their academic discipline unless they explicitly opt into cross-disciplinary viewing
  useEffect(() => {
    if (isStudent && !showAllDisciplines && profile?.discipline) {
      setSelectedDiscipline(profile.discipline);
    }
  }, [isStudent, showAllDisciplines, profile?.discipline]);

  useEffect(() => {
    setLoading(true);
    const queryDisc = (isStudent && !showAllDisciplines) ? studentDiscipline : selectedDiscipline;
    api.getCareers(queryDisc, searchQuery).then(data => {
      setCareers(data.careers || []);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load careers:', err);
      setLoading(false);
    });
  }, [isStudent, showAllDisciplines, studentDiscipline, selectedDiscipline, searchQuery]);

  const disciplines: { id: string; label: string }[] = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'engineering', label: 'Engineering & Tech' },
    { id: 'agriculture', label: 'Agriculture & AgTech' },
    { id: 'paramedical', label: 'Medical & Paramedical' },
    { id: 'commerce', label: 'Commerce & FinTech' },
    { id: 'design_media', label: 'Design & Media' },
    { id: 'arts_science', label: 'Arts & Pure Sciences' },
    { id: 'law_governance', label: 'Law & Governance' },
    { id: 'hospitality', label: 'Hospitality & Tourism' }
  ];

  const getDisciplineLabel = (id: string) => {
    return disciplines.find(d => d.id === id)?.label || id;
  };

  // Distinct departments available within current careers
  const availableDepartments = ['all', ...Array.from(new Set(careers.map(c => c.department).filter(Boolean) as string[]))];

  // Distinct categories within current careers
  const availableCategories = ['all', ...Array.from(new Set(careers.map(c => c.category).filter(Boolean)))];

  const filteredCareers = careers.filter(c => {
    if (selectedDepartment !== 'all' && c.department !== selectedDepartment) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const handleSelectTarget = async (career: Career) => {
    await setTargetCareer(career.id);
    setSelectedCareer(null);
    navigate('/roadmap');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isStudent && !showAllDisciplines ? 'Career Explorer' : 'Explore Career Pathways'}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {isStudent && !showAllDisciplines
            ? `Career options and skill benchmarks tailored to your discipline (${getDisciplineLabel(studentDiscipline)}).`
            : 'Discover high-demand career pathways, benchmark requirements, and skill hierarchies across diverse academic streams.'}
        </p>
      </div>

      {/* Student Personal Discipline Banner */}
      {isStudent && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Enrolled Discipline:</span>
                <span className="capitalize text-blue-700 dark:text-blue-300 font-extrabold">
                  {getDisciplineLabel(studentDiscipline)}
                </span>
                <span className="rounded-md bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:text-blue-200 uppercase">
                  Personal Stream Aligned
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {profile?.stream || profile?.degree || 'Targeted Academic Stream'} • Non-relevant fields (Agri, Arts, Paramedic, etc.) hidden.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const next = !showAllDisciplines;
              setShowAllDisciplines(next);
              if (!next) {
                setSelectedDiscipline(studentDiscipline);
                setSelectedCategory('all');
                setSelectedDepartment('all');
              }
            }}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
          >
            {showAllDisciplines ? '← Lock back to My Discipline' : 'Explore Cross-Disciplinary Options (Optional)'}
          </button>
        </div>
      )}

      {/* Filter Bars */}
      <div className="space-y-2.5">
        {/* Discipline Tabs (when not locked to single discipline) */}
        {(!isStudent || showAllDisciplines) && (
          <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-none">
            {disciplines.map(d => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDiscipline(d.id);
                  setSelectedDepartment('all');
                }}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedDiscipline === d.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}

        {/* Granular Department Filters (from 35 Engineering Departments dataset) */}
        {availableDepartments.length > 2 && (
          <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-none items-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
              <Compass className="h-3.5 w-3.5" /> Department:
            </span>
            {availableDepartments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 ${
                  selectedDepartment === dept
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </button>
            ))}
          </div>
        )}

        {/* Search & Specialization Categories */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex overflow-x-auto pb-1 md:pb-0 gap-1.5 scrollbar-none items-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
              <Layers className="h-3 w-3" /> Specialization:
            </span>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Roles' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Careers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-900/60 animate-pulse border border-slate-200 dark:border-slate-800"></div>
          ))}
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-500 dark:text-slate-400">
          No career pathways matching your current search and department filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCareers.map(career => {
            const isTarget = targetCareer?.id === career.id;

            return (
              <div
                key={career.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition-all glass-panel-hover ${
                  isTarget
                    ? 'border-blue-500 dark:border-blue-500/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-lg shadow-blue-500/10'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {career.discipline}
                      </span>
                      {career.department && (
                        <span className="rounded-md bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 truncate max-w-[150px]" title={career.department}>
                          {career.department}
                        </span>
                      )}
                    </div>
                    {isTarget && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                        <Check className="h-3 w-3" /> Active Target
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {career.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {career.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 py-1 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Projected Growth:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{career.growthRate}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Salary Benchmark:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{career.medianSalary}</strong>
                    </div>
                  </div>

                  {/* Benchmark Skills Preview */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
                      Required Core Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {career.benchmark.requiredSkills.slice(0, 3).map(s => (
                        <span
                          key={s.skillId}
                          className="rounded-md bg-slate-50 dark:bg-slate-950 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {s.skillName}
                        </span>
                      ))}
                      {career.benchmark.requiredSkills.length > 3 && (
                        <span className="rounded-md bg-slate-50 dark:bg-slate-950 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                          +{career.benchmark.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Future Skill Preview */}
                  {career.futureSkills && career.futureSkills.length > 0 && (
                    <div className="pt-1.5 flex items-center gap-1 text-[10px] text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-3 w-3 shrink-0" />
                      <span className="truncate">Next-Gen: {career.futureSkills.slice(0, 2).join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCareer(career)}
                    className="flex-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    View Benchmark Details
                  </button>

                  {!isTarget ? (
                    <button
                      onClick={() => handleSelectTarget(career)}
                      className="rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-bold text-white transition-colors"
                      title="Set as my target career"
                    >
                      Set Target
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/roadmap')}
                      className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition-colors"
                    >
                      Roadmap
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Career Details Benchmark Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md bg-blue-50 dark:bg-blue-600/20 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                    {selectedCareer.discipline}
                  </span>
                  {selectedCareer.department && (
                    <span className="rounded-md bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 text-[10px] font-bold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                      {selectedCareer.department}
                    </span>
                  )}
                  {selectedCareer.roleCategory && (
                    <span className="rounded-md bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                      {selectedCareer.roleCategory}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">{selectedCareer.title}</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{selectedCareer.description}</p>
              </div>
              <button
                onClick={() => setSelectedCareer(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Scope & Market */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Industry Growth Rate</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedCareer.growthRate}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400">Compensation Benchmark</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedCareer.medianSalary}</div>
              </div>
            </div>

            {/* University Core Courses (From Excel Dataset) */}
            {selectedCareer.coreCourses && selectedCareer.coreCourses.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>University Core Academic Courses</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.coreCourses.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 text-xs font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Placement Preparation Blueprint (From Excel Dataset) */}
            {selectedCareer.placementPreparation && (
              <div className="space-y-2 p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                  <Award className="h-3.5 w-3.5" />
                  <span>Campus Placement & Interview Preparation</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedCareer.placementPreparation}
                </p>
                {selectedCareer.placementSkills && selectedCareer.placementSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedCareer.placementSkills.map((ps, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-[10px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        {ps}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Future-Ready Skills & Industry Relevance (From Excel Dataset) */}
            {selectedCareer.futureSkills && selectedCareer.futureSkills.length > 0 && (
              <div className="space-y-2 p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                  <Rocket className="h-3.5 w-3.5" />
                  <span>Emerging & Future Skills (5-10 Year Horizon)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.futureSkills.map((fs, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold">
                      {fs}
                    </span>
                  ))}
                </div>
                {selectedCareer.futureRelevance && (
                  <p className="text-[11px] text-purple-700 dark:text-purple-300/80 italic pt-1">
                    Industry Outlook: {selectedCareer.futureRelevance}
                  </p>
                )}
              </div>
            )}

            {/* Benchmark Skills Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Benchmark Required Skill Matrix
              </h3>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-950">
                {selectedCareer.benchmark.requiredSkills.map(s => (
                  <div key={s.skillId} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-200">{s.skillName}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{s.importance} Requirement</div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{s.targetProficiency}%</span>
                      <span className="text-[10px] text-slate-500"> target</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Learning Platforms (From Excel Dataset) */}
            {selectedCareer.learningResources && selectedCareer.learningResources.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Verified Learning Resources & Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.learningResources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors"
                    >
                      <span>{res.title}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Roles */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Specialized Career Roles
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedCareer.roles.map(role => (
                  <div key={role.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="font-bold text-slate-900 dark:text-slate-200">{role.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{role.readinessCriteria}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => {
                  navigate(`/simulator?target=${selectedCareer.id}`);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <GitCompare className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Simulate Pivot from Current Goal</span>
              </button>
              <button
                onClick={() => handleSelectTarget(selectedCareer)}
                className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white transition-colors"
              >
                Set as Target Career & Recalculate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
