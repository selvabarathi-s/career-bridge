import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentProfile, Career, SkillGapItem, UserRole, NotificationItem } from '../../../shared/types.js';
import { api } from '../api/client.js';

export interface UserSession {
  id: string;
  profileId?: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  discipline?: string;
  studentId?: string;
  targetCareer?: string;
}

interface AuthContextType {
  user: UserSession | null;
  profile: StudentProfile | null;
  targetCareer: Career | null;
  skillGaps: SkillGapItem[];
  role: UserRole;
  loading: boolean;
  theme: 'light' | 'dark';
  notifications: NotificationItem[];
  unreadCount: number;
  login: (email: string, password?: string, requestedRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    discipline: string;
    stream?: string;
    specialization?: string;
    degree: string;
    yearOfStudy: number;
    cgpa?: number;
    targetCareerId?: string;
    studentId?: string;
    priorSkills?: string[];
    skillProficiencyLevel?: string;
    learningStyle?: string;
    weeklyHoursCommitted?: number;
    targetTimeline?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggleTheme: () => void;
  markNotificationRead: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  updateStudentProfile: (updates: Partial<StudentProfile>) => Promise<void>;
  setTargetCareer: (careerId: string) => Promise<void>;
  refreshProfileData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [targetCareer, setTargetCareerState] = useState<Career | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [role, setRole] = useState<UserRole>('student');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Theme Management (Default: 'light')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('careerbridge_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('careerbridge_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Fetch notifications helper
  const fetchUserNotifications = async (userId?: string) => {
    try {
      const res = await api.getNotifications(userId);
      if (res && res.notifications) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  // Initial Auth Hydration
  useEffect(() => {
    const init = async () => {
      try {
        const savedUserId = localStorage.getItem('careerbridge_user_id');
        const savedRole = (localStorage.getItem('careerbridge_role') as UserRole) || 'student';
        const savedUserJson = localStorage.getItem('careerbridge_user');

        if (savedUserJson) {
          try {
            const parsedUser: UserSession = JSON.parse(savedUserJson);
            if (parsedUser.name === 'Dr. Alan Vance' || parsedUser.email === 'alan.vance@university.edu') {
              parsedUser.name = 'Dr. Balu Prasath';
              parsedUser.email = 'balu.prasath@university.edu';
            }
            if (parsedUser.name === 'Sarah Jenkins' || parsedUser.email === 'admin@institution.edu') {
              parsedUser.name = 'Ms. Anjali Govindh';
              parsedUser.email = 'admin@careerbridge.io';
            }
            delete parsedUser.avatarUrl;
            localStorage.setItem('careerbridge_user', JSON.stringify(parsedUser));

            setUser(parsedUser);
            setRole(parsedUser.role || savedRole);

            if (parsedUser.profileId && parsedUser.role === 'student') {
              const profileData = await api.getProfile(parsedUser.profileId);
              setProfile(profileData.profile);
              setTargetCareerState(profileData.targetCareer);
              setSkillGaps(profileData.skillGaps);
            }

            await fetchUserNotifications(parsedUser.id);
          } catch (e) {
            console.error('Error parsing stored user:', e);
          }
        } else if (savedUserId) {
          // Fallback initial load
          const { users } = await api.getCredentialsGuide().then(res => ({
            users: res.credentials.map(c => ({
              id: c.email,
              name: c.name,
              email: c.email,
              role: c.role,
              discipline: c.stream,
              studentId: c.studentId
            }))
          })).catch(() => ({ users: [] }));

          const matched = users.find(u => u.id === savedUserId || u.email === savedUserId);
          if (matched) {
            setUser(matched as any);
            setRole(matched.role);
          }
        }
      } catch (err) {
        console.error('Failed to initialize auth state:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (email: string, password?: string, requestedRole?: UserRole): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const res = await api.login(email, password, requestedRole);
      if (res.success && res.user) {
        setUser(res.user);
        setRole(res.user.role);
        localStorage.setItem('careerbridge_user_id', res.user.id);
        localStorage.setItem('careerbridge_role', res.user.role);
        localStorage.setItem('careerbridge_user', JSON.stringify(res.user));
        if (res.token) {
          localStorage.setItem('careerbridge_token', res.token);
        } else {
          localStorage.setItem('careerbridge_token', res.user.id);
        }

        if (res.user.profileId && res.user.role === 'student') {
          try {
            const profileData = await api.getProfile(res.user.profileId);
            setProfile(profileData.profile);
            setTargetCareerState(profileData.targetCareer);
            setSkillGaps(profileData.skillGaps);
          } catch (err) {
            console.error('Failed to load profile details:', err);
          }
        }

        await fetchUserNotifications(res.user.id);
        return { success: true };
      }
      return { success: false, error: res.error || 'Authentication failed. Please check your credentials.' };
    } catch (err: any) {
      console.error('Login error:', err);
      return { success: false, error: err.message || 'Server connection error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    password: string;
    discipline: string;
    stream?: string;
    specialization?: string;
    degree: string;
    yearOfStudy: number;
    cgpa?: number;
    targetCareerId?: string;
    studentId?: string;
    priorSkills?: string[];
    skillProficiencyLevel?: string;
    learningStyle?: string;
    weeklyHoursCommitted?: number;
    targetTimeline?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const res = await api.register(data);
      if (res.success && res.user) {
        setUser(res.user);
        setRole(res.user.role);
        localStorage.setItem('careerbridge_user_id', res.user.id);
        localStorage.setItem('careerbridge_role', res.user.role);
        localStorage.setItem('careerbridge_user', JSON.stringify(res.user));
        if (res.token) {
          localStorage.setItem('careerbridge_token', res.token);
        } else {
          localStorage.setItem('careerbridge_token', res.user.id);
        }

        if (res.profile) {
          setProfile(res.profile);
          if (res.user.profileId) {
            const profileData = await api.getProfile(res.user.profileId);
            setTargetCareerState(profileData.targetCareer);
            setSkillGaps(profileData.skillGaps);
          }
        }

        await fetchUserNotifications(res.user.id);
        return { success: true };
      }
      return { success: false, error: res.error || 'Registration failed.' };
    } catch (err: any) {
      console.error('Registration error:', err);
      return { success: false, error: err.message || 'Server connection error during registration.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setTargetCareerState(null);
    setSkillGaps([]);
    setNotifications([]);
    localStorage.removeItem('careerbridge_user_id');
    localStorage.removeItem('careerbridge_role');
    localStorage.removeItem('careerbridge_user');
    localStorage.removeItem('careerbridge_token');
  };

  const markNotificationRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  };

  const refreshNotifications = async () => {
    if (user?.id) {
      await fetchUserNotifications(user.id);
    }
  };

  const updateStudentProfile = async (updates: Partial<StudentProfile>) => {
    if (!profile) return;
    try {
      const res = await api.updateProfile(profile.id, updates);
      if (res.success) {
        setProfile(res.profile);
        setTargetCareerState(res.targetCareer);
        setSkillGaps(res.skillGaps);
      }
    } catch (err) {
      console.error('Failed to update student profile:', err);
    }
  };

  const setTargetCareer = async (careerId: string) => {
    if (!profile) return;
    await updateStudentProfile({ targetCareerId: careerId });
  };

  const refreshProfileData = async () => {
    if (!profile) return;
    try {
      const profileData = await api.getProfile(profile.id);
      setProfile(profileData.profile);
      setTargetCareerState(profileData.targetCareer);
      setSkillGaps(profileData.skillGaps);
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        targetCareer,
        skillGaps,
        role,
        loading,
        theme,
        notifications,
        unreadCount,
        login,
        register,
        logout,
        toggleTheme,
        markNotificationRead,
        refreshNotifications,
        updateStudentProfile,
        setTargetCareer,
        refreshProfileData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
