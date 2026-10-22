import { Router } from 'express';
import { db } from '../db/database.js';
import { AIMentorService } from '../services/aiMentorService.js';

export const aiMentorRouter = Router();

// Get chat history for a specific student profile.
aiMentorRouter.get('/history/:studentId', (req, res) => {
  const profile = db.getProfileById(req.params.studentId);
  if (!profile) {
    return res.json({ history: [] });
  }

  const history = db.getChatHistory(profile.id);
  res.json({ history });
});

// Post a question to AI Mentor.
aiMentorRouter.post('/chat', async (req, res) => {
  const studentId = typeof req.body?.studentId === 'string' ? req.body.studentId : '';
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(400).json({ error: 'Please enter a message.' });
  }

  try {
    // Only use a student's profile when the submitted ID matches that profile.
    // Never fall back to the first student record for admins, mentors, or stale IDs.
    const profile = studentId ? db.getProfileById(studentId) : undefined;
    const aiResponse = profile
      ? await AIMentorService.generateGuidance(profile, message)
      : await AIMentorService.generateGeneralGuidance(message);

    return res.json({ message: aiResponse });
  } catch (err: any) {
    console.error('AI Mentor request failed:', err);
    return res.status(500).json({ error: err?.message || 'Failed to generate guidance.' });
  }
});
