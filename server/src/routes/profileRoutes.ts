import { Router } from 'express';
import { db } from '../db/database.js';
import { SkillGapService } from '../services/skillGapService.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { StudentProfile } from '../types/shared.js';

export const profileRouter = Router();

// Get profile by ID
profileRouter.get('/:id', (req, res) => {
  const profile = db.getProfileById(req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const targetCareer = db.getCareerById(profile.targetCareerId) || db.getCareers()[0];
  const skillGaps = SkillGapService.calculateSkillGaps(profile, targetCareer);

  res.json({
    profile,
    targetCareer,
    skillGaps
  });
});

// Update profile & dynamic recalculation (verified profile owner or admin)
profileRouter.put('/:id', authenticate, (req, res) => {
  const profile = db.getProfileById(req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  // Ensure caller is the verified profile owner or an administrator
  const isOwner = req.user && (req.user.profileId === profile.id || req.user.id === profile.userId);
  const isAdmin = req.user && req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: 'Insufficient role permissions' });
  }

  // Enforce strict immutability of identity fields: reject spoofing attempts
  if (req.body.id !== undefined && req.body.id !== profile.id) {
    return res.status(400).json({ error: 'Cannot modify profile ID or target another profile' });
  }
  if (req.body.userId !== undefined && req.body.userId !== profile.userId) {
    return res.status(400).json({ error: 'Cannot modify user ID' });
  }

  // Strip id, userId, and readinessScore from updates to ensure strict immutability
  const { id: _ignoredId, userId: _ignoredUserId, readinessScore: _ignoredReadiness, ...safeUpdates } = req.body;
  const updatedProfile: StudentProfile = {
    ...profile,
    ...safeUpdates,
    id: profile.id,       // Strictly immutable
    userId: profile.userId // Strictly immutable
  };

  // Defensive array checks
  if (!Array.isArray(updatedProfile.skills)) {
    updatedProfile.skills = profile.skills || [];
  }
  if (!Array.isArray(updatedProfile.projects)) {
    updatedProfile.projects = profile.projects || [];
  }

  // Dynamic recalculation of readiness score
  let totalSkillLevel = 0;
  updatedProfile.skills.forEach((s: { level: number }) => {
    totalSkillLevel += (typeof s.level === 'number' ? s.level : 0);
  });
  const avgSkill = updatedProfile.skills.length > 0 ? Math.round(totalSkillLevel / updatedProfile.skills.length) : 50;
  const projectScore = Math.min(100, updatedProfile.projects.length * 35 + 20);
  const cgpaValue = Number(updatedProfile.cgpa) || 0;
  const overall = Math.round((avgSkill * 0.55) + (projectScore * 0.25) + (cgpaValue * 2));

  updatedProfile.readinessScore = {
    overallPercentage: Math.min(99, Math.max(0, overall)),
    technicalScore: avgSkill,
    projectScore: projectScore,
    problemSolvingScore: Math.min(100, avgSkill + 5),
    softSkillScore: 75,
    status: overall >= 80 ? 'career_ready' : overall >= 65 ? 'competent' : overall >= 45 ? 'building' : 'starting'
  };

  db.saveProfile(updatedProfile);

  const targetCareer = db.getCareerById(updatedProfile.targetCareerId) || db.getCareers()[0];
  const skillGaps = SkillGapService.calculateSkillGaps(updatedProfile, targetCareer);

  res.json({
    success: true,
    profile: updatedProfile,
    targetCareer,
    skillGaps
  });
});
