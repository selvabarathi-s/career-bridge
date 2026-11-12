import { Router } from 'express';
import { db } from '../db/database.js';
import { ModelEvaluationService } from '../services/modelEvaluationService.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

export const adminRouter = Router();

// Enforce authentication and admin role permissions across all admin endpoints
adminRouter.use(authenticate, requireRole(['admin']));

// Institutional analytics & curriculum gaps
adminRouter.get('/analytics', (req, res) => {
  const profiles = db.getProfiles();
  const careers = db.getCareers();
  const gaps = db.getCurriculumGaps();
  const modelMetrics = ModelEvaluationService.getEvaluationMetrics();

  // Calculate career distribution
  const careerDistribution: Record<string, number> = {};
  profiles.forEach(p => {
    const c = careers.find(car => car.id === p.targetCareerId);
    const title = c ? c.title : 'General Track';
    careerDistribution[title] = (careerDistribution[title] || 0) + 1;
  });

  // Calculate department readiness average
  const disciplineReadiness: Record<string, { total: number; count: number; avg: number }> = {};
  profiles.forEach(p => {
    if (!disciplineReadiness[p.discipline]) {
      disciplineReadiness[p.discipline] = { total: 0, count: 0, avg: 0 };
    }
    disciplineReadiness[p.discipline].total += p.readinessScore.overallPercentage;
    disciplineReadiness[p.discipline].count += 1;
  });

  Object.keys(disciplineReadiness).forEach(d => {
    disciplineReadiness[d].avg = Math.round(
      disciplineReadiness[d].total / disciplineReadiness[d].count
    );
  });

  // Calculate genuine dynamic institutional metrics from database
  const totalStudentsEnrolled = profiles.length;
  const activeOnRoadmap = profiles.filter(p => p.skills && p.skills.length > 0).length;
  const highReadinessCount = profiles.filter(p => (p.readinessScore?.overallPercentage || 0) >= 75).length;
  const averageReadinessIndex = profiles.length > 0
    ? Math.round(profiles.reduce((sum, p) => sum + (p.readinessScore?.overallPercentage || 0), 0) / profiles.length)
    : 0;

  res.json({
    metrics: {
      totalStudentsEnrolled,
      activeOnRoadmap,
      highReadinessCount,
      mentorInterventionsActive: db.getInterventions().filter(i => i.status === 'open').length,
      averageReadinessIndex
    },
    careerDistribution,
    disciplineReadiness,
    curriculumGaps: gaps,
    modelEvaluation: modelMetrics
  });
});

// Dedicated endpoint for BigQuery AI/ML model performance metrics
adminRouter.get('/model-metrics', (req, res) => {
  const modelMetrics = ModelEvaluationService.getEvaluationMetrics();
  res.json({ metrics: modelMetrics });
});

// Update or create curriculum gap action
adminRouter.post('/curriculum-gaps', (req, res) => {
  const { discipline, careerTitle, skillName, deficiencyPercentage, suggestedIntervention, priority } = req.body;
  const newGap = {
    id: `gap-${Date.now()}`,
    discipline,
    careerTitle,
    skillName,
    deficiencyPercentage: Number(deficiencyPercentage) || 60,
    studentCount: 120,
    suggestedIntervention,
    priority: priority || 'high'
  };

  db.saveCurriculumGap(newGap);
  res.json({ success: true, gap: newGap });
});
