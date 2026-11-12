import { Router } from 'express';
import { db } from '../db/database.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

export const mentorRouter = Router();

// Enforce authentication and mentor/admin role permissions across all mentor endpoints
mentorRouter.use(authenticate, requireRole(['mentor', 'admin']));

// List all students for mentor oversight
mentorRouter.get('/students', (req, res) => {
  const profiles = db.getProfiles();
  const students = profiles.map(p => {
    const career = db.getCareerById(p.targetCareerId);
    return {
      id: p.id,
      name: p.fullName,
      email: p.email,
      avatarUrl: p.avatarUrl,
      degree: p.degree,
      discipline: p.discipline,
      cgpa: p.cgpa,
      yearOfStudy: p.yearOfStudy,
      targetCareer: career ? career.title : 'Unassigned',
      uncertaintyScore: p.uncertaintyScore,
      readiness: p.readinessScore,
      flags: {
        highUncertainty: p.uncertaintyScore > 35,
        lowReadiness: p.readinessScore.overallPercentage < 55,
        stalled: p.projects.length === 0
      }
    };
  });

  res.json({ students });
});

// List mentor interventions
mentorRouter.get('/interventions', (req, res) => {
  const interventions = db.getInterventions();
  res.json({ interventions });
});

// Update or create intervention
mentorRouter.post('/interventions', (req, res) => {
  const { studentId, reason, notes, status } = req.body;
  const profile = db.getProfileById(studentId);

  const newIntervention = {
    id: `interv-${Date.now()}`,
    studentId,
    studentName: profile?.fullName || 'Student',
    studentEmail: profile?.email || '',
    targetCareer: db.getCareerById(profile?.targetCareerId || '')?.title || 'Unknown',
    reason: reason || 'persistent_gap',
    status: status || 'open',
    notes: notes || '',
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.saveIntervention(newIntervention);
  res.json({ success: true, intervention: newIntervention });
});
