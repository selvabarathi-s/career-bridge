import { Router } from 'express';
import { db } from '../db/database.js';
import { AIMentorService } from '../services/aiMentorService.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { StudentProfile } from '../types/shared.js';

export const aiMentorRouter = Router();

// Model Telemetry & Accuracy Benchmarks Endpoint
aiMentorRouter.get('/telemetry', (req, res) => {
  res.json({
    telemetry: AIMentorService.getModelTelemetry()
  });
});

// Get chat history for a specific student profile (authenticated owner or admin only)
aiMentorRouter.get('/history/:studentId', authenticate, (req, res) => {
  const profile = db.getProfileById(req.params.studentId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  // Prevent cross-user chat snooping: must be profile owner or admin
  const isOwner = req.user && (req.user.profileId === profile.id || req.user.id === profile.userId);
  const isAdmin = req.user && req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: 'Insufficient role permissions' });
  }

  const history = db.getChatHistory(profile.id);
  res.json({ history });
});

// Post a question to AI Mentor (requires authentication; owner or admin only for student profile context)
aiMentorRouter.post('/chat', authenticate, async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(400).json({ error: 'Please enter a message.' });
  }

  const requestedStudentId = typeof req.body?.studentId === 'string' ? req.body.studentId.trim() : '';

  let targetProfile: StudentProfile | undefined;

  if (requestedStudentId) {
    const profile = db.getProfileById(requestedStudentId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Prevent cross-user chat history injection: must be verified profile owner or admin
    const isOwner = req.user && (req.user.profileId === profile.id || req.user.id === profile.userId);
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Insufficient role permissions' });
    }

    targetProfile = profile;
  } else if (req.user?.profileId) {
    // Automatically bind to authenticated student's profile if studentId is omitted in body
    targetProfile = db.getProfileById(req.user.profileId);
  }

  try {
    const aiResponse = targetProfile
      ? await AIMentorService.generateGuidance(targetProfile, message)
      : await AIMentorService.generateGeneralGuidance(message);

    return res.json({ message: aiResponse });
  } catch (err: any) {
    console.error('AI Mentor request failed:', err);
    return res.status(500).json({ error: err?.message || 'Failed to generate guidance.' });
  }
});
