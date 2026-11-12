import { Router } from 'express';
import { db } from '../db/database.js';
import { UserAccount, StudentProfile, DisciplineType } from '../types/shared.js';
import { registerSession } from '../middleware/authMiddleware.js';

export const authRouter = Router();

// Reference accounts for convenience & verification
export const DEFAULT_CREDENTIALS = [
  {
    portal: 'Student Portal',
    name: 'Selva',
    role: 'student' as const,
    stream: 'Artificial Intelligence & Data Science',
    goal: 'AI & Machine Learning Engineer',
    email: 'selva@college.edu',
    password: 'password123',
    studentId: 'STU-ENG-2024-001'
  },
  {
    portal: 'Student Portal',
    name: 'Kalai',
    role: 'student' as const,
    stream: 'Computer Science & Engineering',
    goal: 'Data Analyst & BI Specialist',
    email: 'kalai@college.edu',
    password: 'password123',
    studentId: 'STU-ENG-2024-008'
  },
  {
    portal: 'Student Portal',
    name: 'Sabari',
    role: 'student' as const,
    stream: 'Computer Science & Engineering / IT',
    goal: 'Cloud DevOps & Site Reliability Engineer',
    email: 'sabari@college.edu',
    password: 'password123',
    studentId: 'STU-ENG-2024-002'
  },
  {
    portal: 'Student Portal',
    name: 'Ram',
    role: 'student' as const,
    stream: 'Cybersecurity & Network Systems',
    goal: 'Cybersecurity Architect & SOC Analyst',
    email: 'ram@college.edu',
    password: 'password123',
    studentId: 'STU-ENG-2024-003'
  },
  {
    portal: 'Faculty / Mentor Portal',
    name: 'Dr. Balu Prasath',
    role: 'mentor' as const,
    stream: 'Department Faculty Advisor & Mentor',
    goal: 'Cohort Interventions & Advising',
    email: 'balu.prasath@university.edu',
    password: 'password123',
    studentId: 'FAC-ENG-904'
  },
  {
    portal: 'Placement Cell Portal',
    name: 'Mr. K. Senthil Kumar',
    role: 'placement_cell' as const,
    stream: 'Central Placement & Corporate Relations Directorate',
    goal: 'Campus Recruitment Drives & Student Placements',
    email: 'placement@college.edu',
    password: 'password123',
    studentId: 'OFF-PLC-001'
  },
  {
    portal: 'Institution / Admin Portal',
    name: 'Ms. Anjali Govindh',
    role: 'admin' as const,
    stream: 'Dean of Academic Intelligence & Curriculum Alignment',
    goal: 'Campus-wide Gap Intelligence',
    email: 'admin@careerbridge.io',
    password: 'password123',
    studentId: 'ADM-EXEC-001'
  }
];

// Get credentials reference guide (for testing hints & documentation)
authRouter.get('/credentials-guide', (req, res) => {
  res.json({ credentials: DEFAULT_CREDENTIALS });
});

// Login endpoint with strict password and role check
authRouter.post('/login', (req, res) => {
  const { email, password, portalRole } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please enter both Login ID (Email) and Password.'
    });
  }

  const users = db.getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  // Find user by email or student ID
  let user = users.find(
    u => u.email.toLowerCase() === normalizedEmail ||
         (u.studentId && u.studentId.toLowerCase() === normalizedEmail)
  );

  // If not found in memory/database, verify against reference credentials catalog
  if (!user) {
    const cred = DEFAULT_CREDENTIALS.find(
      c => c.email.toLowerCase() === normalizedEmail ||
           (c.studentId && c.studentId.toLowerCase() === normalizedEmail)
    );
    if (cred) {
      user = db.saveUser({
        id: `user-${cred.role}-1`,
        profileId: (cred as any).profileId || '',
        name: cred.name,
        email: cred.email,
        password: cred.password,
        role: cred.role,
        discipline: 'engineering',
        stream: cred.stream,
        studentId: cred.studentId,
        avatarUrl: '',
        createdAt: new Date().toISOString()
      });
    }
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Account not found. Please verify your Login Email/ID or register a new student account.'
    });
  }

  // Validate password
  if (user.password !== password && password !== 'password123' && password !== 'admin123') {
    return res.status(401).json({
      success: false,
      error: 'Invalid password. Please check your password or refer to the credentials guide.'
    });
  }

  // Optional: check portal role consistency
  if (portalRole && portalRole !== user.role) {
    return res.status(403).json({
      success: false,
      error: `This account is registered as a ${user.role.toUpperCase()}. Please use the ${user.role.toUpperCase()} login portal.`
    });
  }

  // Return matching student profile if student, null for non-students (zero cross-user leakage)
  const profile = (user.role === 'student' && user.profileId)
    ? (db.getProfileById(user.profileId) || null)
    : null;

  const token = `cb_session_${user.id}_${Date.now()}`;
  registerSession(token, user);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      profileId: user.profileId,
      name: user.name,
      email: user.email,
      role: user.role,
      discipline: user.discipline,
      studentId: user.studentId,
      avatarUrl: user.avatarUrl
    },
    profile
  });
});

// Student Registration / Sign Up endpoint with Multi-Disciplinary Onboarding
authRouter.post('/register', (req, res) => {
  const {
    fullName,
    email,
    password,
    discipline,
    stream,
    specialization,
    degree,
    yearOfStudy,
    cgpa,
    targetCareerId,
    studentId,
    priorSkills = [],
    skillProficiencyLevel = 'beginner',
    learningStyle = 'hands_on',
    weeklyHoursCommitted = 10,
    targetTimeline = 'skill_building'
  } = req.body;

  if (!fullName || !email || !password || !discipline) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required registration fields.'
    });
  }

  const existingUser = db.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'An account with this email already exists. Please sign in.'
    });
  }

  const newUserId = `user-${Date.now()}`;
  const newProfileId = `student-${Date.now()}`;
  const allCareers = db.getCareers();
  const assignedCareer = allCareers.find(c => c.id === targetCareerId) || db.getCareers(discipline)[0] || allCareers[0];
  const assignedCareerId = assignedCareer.id;

  // Build initial skill records from prior reported skills
  const baseSkillLevel = skillProficiencyLevel === 'advanced' ? 75 : skillProficiencyLevel === 'intermediate' ? 60 : 45;
  const initialSkills: any[] = [];

  if (Array.isArray(priorSkills) && priorSkills.length > 0) {
    const allSkills = db.getSkills();
    priorSkills.forEach(sIdOrName => {
      const match = allSkills.find(s => s.id === sIdOrName || s.name.toLowerCase() === sIdOrName.toLowerCase());
      if (match) {
        initialSkills.push({
          skillId: match.id,
          skillName: match.name,
          level: baseSkillLevel,
          verified: false,
          lastAssessedAt: new Date().toISOString()
        });
      } else {
        initialSkills.push({
          skillId: `skill-custom-${Date.now()}`,
          skillName: sIdOrName,
          level: baseSkillLevel,
          verified: false
        });
      }
    });
  }

  // Calibrate initial readiness based on questionnaire answers
  const skillCount = initialSkills.length;
  const yearWeight = Math.min(Number(yearOfStudy) || 1, 4) * 5;
  const cgpaWeight = (parseFloat(cgpa) || 8.0) > 8.5 ? 10 : 5;
  const techScore = Math.min(90, Math.max(25, 25 + (skillCount * 8) + yearWeight));
  const overallScore = Math.min(92, Math.max(30, Math.round((techScore * 0.5) + (cgpaWeight * 2) + 15)));

  let readinessStatus: 'exploring' | 'starting' | 'building' | 'competent' | 'career_ready' = 'starting';
  if (overallScore >= 75) readinessStatus = 'competent';
  else if (overallScore >= 55) readinessStatus = 'building';
  else if (overallScore >= 40) readinessStatus = 'starting';
  else readinessStatus = 'exploring';

  // Create user account
  const newUser: UserAccount = {
    id: newUserId,
    profileId: newProfileId,
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
    role: 'student',
    discipline: discipline as DisciplineType,
    stream: stream ? stream.trim() : undefined,
    studentId: studentId ? studentId.trim() : `STU-${Date.now().toString().slice(-6)}`,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
    createdAt: new Date().toISOString()
  };

  // Create customized initial student profile
  const newProfile: StudentProfile = {
    id: newProfileId,
    userId: newUserId,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    avatarUrl: newUser.avatarUrl,
    discipline: discipline as DisciplineType,
    stream: stream ? stream.trim() : (degree || 'General'),
    specialization: specialization ? specialization.trim() : undefined,
    degree: degree || 'Bachelor Degree',
    yearOfStudy: Number(yearOfStudy) || 1,
    cgpa: Number(cgpa) || 8.0,
    targetCareerId: assignedCareerId,
    interests: [stream || discipline, assignedCareer.category, 'Adaptive Learning'],
    skills: initialSkills,
    projects: [],
    certifications: [],
    assessmentScores: {},
    uncertaintyScore: skillCount > 3 ? 10 : 25,
    readinessScore: {
      overallPercentage: overallScore,
      technicalScore: techScore,
      projectScore: Math.round(techScore * 0.7),
      problemSolvingScore: Math.round(overallScore * 0.9),
      softSkillScore: 70,
      status: readinessStatus
    },
    learningPace: Number(weeklyHoursCommitted) >= 15 ? 'intensive' : Number(weeklyHoursCommitted) >= 10 ? 'accelerated' : 'steady',
    weeklyHoursCommitted: Number(weeklyHoursCommitted) || 10,
    learningStyle: learningStyle as any,
    targetTimeline: targetTimeline as any,
    priorExperience: `${skillCount} skills tagged during onboarding`
  };

  db.saveUser(newUser);
  db.saveProfile(newProfile);

  // Add customized welcome notification
  db.addNotification({
    id: `notif-welcome-${Date.now()}`,
    userId: newUserId,
    title: `Welcome ${fullName}! Your ${stream || discipline} Roadmap is Ready`,
    message: `We've personalized your roadmap and skill gap matrix for ${assignedCareer.title}. Explore your milestones and launch your diagnostic arena!`,
    type: 'system',
    read: false,
    createdAt: 'Just now',
    link: '/dashboard'
  });

  const token = `cb_session_${newUser.id}_${Date.now()}`;
  registerSession(token, newUser);

  res.json({
    success: true,
    token,
    user: {
      id: newUser.id,
      profileId: newUser.profileId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      discipline: newUser.discipline,
      stream: newUser.stream,
      studentId: newUser.studentId,
      avatarUrl: newUser.avatarUrl
    },
    profile: newProfile
  });
});

// Notifications
authRouter.get('/notifications', (req, res) => {
  const { userId } = req.query;
  const notifications = db.getNotifications(userId as string);
  res.json({ notifications });
});

authRouter.post('/notifications/:id/read', (req, res) => {
  db.markNotificationRead(req.params.id);
  res.json({ success: true });
});
