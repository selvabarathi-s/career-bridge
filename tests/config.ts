import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CONFIG = {
  // API base URL - defaults to local server or environment variable
  baseUrl: process.env.API_BASE_URL || 'http://localhost:4000',
  ephemeralPort: 4005,
  rootPath: path.resolve(__dirname, '..'),
  clientPath: path.resolve(__dirname, '../client'),
  serverPath: path.resolve(__dirname, '../server'),
  timeoutMs: 15000,
  
  // Reference test credentials matching authRoutes.ts
  credentials: {
    student: {
      email: 'selva@college.edu',
      password: 'password123',
      role: 'student',
      profileId: 'student-selva',
      studentId: 'STU-ENG-2024-001'
    },
    mentor: {
      email: 'balu.prasath@university.edu',
      password: 'password123',
      role: 'mentor',
      studentId: 'FAC-ENG-904'
    },
    placement: {
      email: 'placement@college.edu',
      password: 'password123',
      role: 'placement_cell',
      studentId: 'OFF-PLC-001'
    },
    admin: {
      email: 'admin@careerbridge.io',
      password: 'password123',
      role: 'admin',
      studentId: 'ADM-EXEC-001'
    }
  }
};
