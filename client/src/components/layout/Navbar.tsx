import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Smartphone,
  QrCode,
  Sparkles,
  UserCheck,
  ChevronDown,
  Shield,
  GraduationCap,
  Sun,
  Moon,
  LogOut,
  LogIn,
  Bell,
  CheckCircle2,
  ExternalLink,
  User,
  UserPlus,
  Building2
} from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';

interface NavbarProps {
  onOpenMobileCompanion: () => void;
  onOpenQRScanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileCompanion, onOpenQRScanner }) => {
  const { user, role, logout, theme, toggleTheme, notifications, unreadCount, markNotificationRead } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const getRoleBadge = (userRole: string) => {
    switch (userRole) {
      case 'admin':
        return {
          label: 'Institution Admin',
          icon: Shield,
          color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-900/60'
        };
      case 'placement_cell':
        return {
          label: 'Placement Directorate',
          icon: Building2,
          color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60'
        };
      case 'mentor':
        return {
          label: 'Faculty Mentor',
          icon: GraduationCap,
          color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-900/60'
        };
      default:
        return {
          label: 'Student',
          icon: UserCheck,
          color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-900/60'
        };
    }
  };

  const roleInfo = getRoleBadge(role);
  const RoleIcon = roleInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090d16]/90 backdrop-blur-md transition-colors duration-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 text-white font-bold group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-lg font-sans">
                Career<span className="text-blue-600 dark:text-blue-400">Bridge</span>
              </span>
              <span className="rounded-md bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 uppercase tracking-wider">
                PRO
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Career development, skills and placement workspace
            </p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-slate-700" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400" />
            )}
          </button>

          {/* Mobile Companion / QR Button */}
          <button
            onClick={onOpenMobileCompanion}
            className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm group"
            title="Scan QR to open on Mobile APK / PWA"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <QrCode className="h-3.5 w-3.5" />
            </div>
            <span className="hidden md:inline">Mobile companion</span>
            <span className="inline md:hidden">Mobile</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>

          {/* In-App Camera QR Scanner */}
          <button
            onClick={onOpenQRScanner}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
            title="Scan Lesson / Certificate QR Code"
          >
            <Smartphone className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
            <span>Scan QR</span>
          </button>

          {/* If Logged In: Notifications & Real User Account Profile */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Notifications Bell */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 p-3 divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex items-center justify-between pb-2 px-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Notifications
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {unreadCount} Unread
                        </span>
                      )}
                    </div>

                    <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                      {notifications.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              if (!notif.read) markNotificationRead(notif.id);
                              if (notif.link) {
                                setNotifDropdownOpen(false);
                                navigate(notif.link);
                              }
                            }}
                            className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer border ${
                              notif.read
                                ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400'
                                : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-slate-900 dark:text-slate-100 font-medium'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="font-semibold text-slate-900 dark:text-white leading-tight">
                                {notif.title}
                              </div>
                              <span className="text-[10px] text-slate-400 shrink-0">{notif.createdAt}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {notif.message}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Capsule */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
                >
                  <UserAvatar name={user.name} size="xs" role={user.role} />
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-none capitalize">
                      {roleInfo.label}
                    </div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 p-3 space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                    {/* User Header */}
                    <div className="flex items-center gap-3 pt-1">
                      <UserAvatar name={user.name} size="md" role={user.role} />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </div>
                        <span className={`inline-flex items-center gap-1 mt-1 text-[9px] font-bold uppercase rounded-md px-1.5 py-0.5 border ${roleInfo.color}`}>
                          <RoleIcon className="h-3 w-3" />
                          {roleInfo.label}
                        </span>
                      </div>
                    </div>

                    {/* Metadata details */}
                    <div className="pt-2.5 pb-1 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {user.studentId && (
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">ID / Reg No:</span>
                          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                            {user.studentId}
                          </span>
                        </div>
                      )}
                      {user.discipline && (
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">Discipline:</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                            {user.discipline}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Navigation shortcuts */}
                    <div className="pt-2 space-y-1 text-xs">
                      {role === 'student' && (
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                        >
                          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>My profile & settings</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (role === 'admin') navigate('/admin');
                          else if (role === 'mentor') navigate('/mentor');
                          else navigate('/dashboard');
                        }}
                        className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                      >
                        <Compass className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Open my workspace</span>
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div className="pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 py-2.5 text-xs font-bold transition-colors border border-rose-200 dark:border-rose-900/60"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* If Not Logged In: Show Sign In and Register Buttons */
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
              >
                <UserPlus className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Register</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
