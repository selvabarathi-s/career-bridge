import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/authRoutes.js';
import { careerRouter } from './routes/careerRoutes.js';
import { profileRouter } from './routes/profileRoutes.js';
import { assessmentRouter } from './routes/assessmentRoutes.js';
import { roadmapRouter } from './routes/roadmapRoutes.js';
import { simulatorRouter } from './routes/simulatorRoutes.js';
import { aiMentorRouter } from './routes/aiMentorRoutes.js';
import { mentorRouter } from './routes/mentorRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { mobileRouter } from './routes/mobileRoutes.js';
import { guidanceRouter } from './routes/guidanceRoutes.js';
import { placementRouter } from './routes/placementRoutes.js';
import { recommendationRouter } from './routes/recommendationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-session-token', 'x-auth-token']
}));

app.use(express.json());

// API Route Mounts
app.use('/api/auth', authRouter);
app.use('/api/careers', careerRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/assessments', assessmentRouter);
app.use('/api/roadmaps', roadmapRouter);
app.use('/api/simulator', simulatorRouter);
app.use('/api/ai-mentor', aiMentorRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/admin', adminRouter);
app.use('/api/analytics', adminRouter);
app.use('/api/mobile', mobileRouter);
app.use('/api/guidance', guidanceRouter);
app.use('/api/placements', placementRouter);
app.use('/api/recommendations', recommendationRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'CareerBridge API v1.0' });
});

// Production Static Client Asset Hosting & SPA Fallback
const clientDistCandidates = [
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(__dirname, '../client/dist'),
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(process.cwd(), '../client/dist')
];

const clientDistPath = clientDistCandidates.find(p => fs.existsSync(p));

if (clientDistPath) {
  console.log(`📦 Serving production client assets from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 CareerBridge Server running on port ${PORT}`);
});

