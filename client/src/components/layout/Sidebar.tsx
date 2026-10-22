import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass, Briefcase, GitCompare, Layers, MapPin, Award, BookOpen, Sparkles,
  User, Users, BarChart3, Flame, ArrowRight, MessageSquare, Building2
} from 'lucide-react';

interface SidebarProps {
  onOpenMobileCompanion: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenMobileCompanion }) => {
  const { user, role, profile, targetCareer } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: Compass, roles: ['student'] },
    { to: '/explore', label: 'Career explorer', icon: Briefcase, roles: ['student', 'mentor', 'admin', 'placement_cell'] },
    { to: '/roadmap', label: 'My learning plan', icon: MapPin, roles: ['student'] },
    { to: '/resources', label: 'Learning resources', icon: BookOpen, roles: ['student', 'mentor', 'admin', 'placement_cell'] },
    { to: '/assessments', label: 'Skill assessments', icon: Award, roles: ['student'] },
    { to: '/skills', label: 'Skills analysis', icon: Layers, roles: ['student'] },
    { to: '/simulator', label: 'Career pathways', icon: GitCompare, roles: ['student', 'mentor', 'admin'] },
    { to: '/ai-mentor', label: 'AI career coach', icon: Sparkles, roles: ['student', 'mentor', 'admin'], highlight: true },
    { to: '/guidance', label: 'Guidance & support', icon: MessageSquare, roles: ['student', 'mentor', 'admin', 'placement_cell'] },
    { to: '/placements', label: 'Placement opportunities', icon: Building2, roles: ['student', 'mentor', 'admin', 'placement_cell'] },
    { to: '/placement-cell', label: 'Placement management', icon: Building2, roles: ['placement_cell', 'admin'] },
    { to: '/mentor', label: 'Mentor workspace', icon: Users, roles: ['mentor', 'admin'] },
    { to: '/admin', label: 'Institution insights', icon: BarChart3, roles: ['admin'] },
    { to: '/profile', label: 'My profile', icon: User, roles: ['student'] }
  ];

  const visibleNav = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0d1425] p-4 min-h-[calc(100vh-4rem)] transition-colors duration-200">
      <div className="space-y-6">
        {role === 'student' && targetCareer && user && (
          <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/70 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/50 dark:to-slate-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[.12em] text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" /> Career goal
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {profile?.readinessScore?.overallPercentage || 60}%
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{targetCareer.title}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 capitalize">
              {targetCareer.discipline} · {profile?.readinessScore?.status || 'In progress'}
            </div>
          </div>
        )}

        <nav className="space-y-1">
          <div className="px-3 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 dark:text-slate-500 mb-3">
            Workspace
          </div>
          {visibleNav.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                      : item.highlight
                      ? 'text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-950 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="h-[17px] w-[17px] shrink-0 opacity-90" />
                <span className="truncate">{item.label}</span>
                {item.highlight && <span className="ml-auto rounded-md bg-indigo-100 dark:bg-indigo-500/20 px-1.5 py-0.5 text-[9px] text-indigo-700 dark:text-indigo-200 font-bold">AI</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 p-4 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Take it with you</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
          Continue your career journey on your phone with the mobile companion.
        </p>
        <button
          onClick={onOpenMobileCompanion}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <span>Open mobile companion</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
