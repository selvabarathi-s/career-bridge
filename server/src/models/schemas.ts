import mongoose, { Schema } from 'mongoose';
import {
  UserAccount,
  Career,
  Skill,
  Assessment,
  Resource,
  StudentProfile,
  MentorIntervention,
  CurriculumGapInsight,
  NotificationItem,
  DoubtQuery,
  PlacementCompanyDrive,
  PlacementApplication,
  CourseRecommendation,
  AIMessage
} from '../types/shared.js';

// Common schema options: strict false ensures future-proof entity evolution and full compatibility with existing seed catalogs
const schemaOptions = { timestamps: true, strict: false };

// 1. User Account Schema
const UserSchema = new Schema<UserAccount>(
  {
    id: { type: String, required: true, unique: true, index: true },
    profileId: { type: String, default: '' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    discipline: { type: String, required: true },
    stream: { type: String },
    studentId: { type: String },
    avatarUrl: { type: String },
    createdAt: { type: String, default: () => new Date().toISOString() }
  },
  schemaOptions
);

// 2. Career Schema
const CareerSchema = new Schema<Career>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    discipline: { type: String, required: true },
    department: { type: String },
    roleCategory: { type: String },
    category: { type: String, required: true },
    description: { type: String, required: true },
    growthRate: { type: String, default: '15%' },
    medianSalary: { type: String, default: '₹8 - 14 LPA' },
    scope: { type: String, default: '' },
    subCareers: [{ type: String }],
    roles: [
      {
        id: String,
        title: String,
        responsibilities: [String],
        requiredSkillIds: [String],
        readinessCriteria: String,
        entrySalary: String
      }
    ],
    requiredSkillIds: [{ type: String }],
    prerequisites: [{ type: String }],
    relatedCareerIds: [{ type: String }],
    benchmark: {
      requiredSkills: [
        {
          skillId: String,
          skillName: String,
          importance: { type: String },
          targetProficiency: Number
        }
      ],
      prerequisiteCourses: [String],
      recommendedProjects: [String],
      emergingSkills: [String],
      readinessThreshold: Number
    },
    iconName: String,
    coreCourses: [String],
    placementSkills: [String],
    futureSkills: [String],
    futureRelevance: String,
    placementPreparation: String,
    learningResources: [{ title: String, url: String }]
  },
  schemaOptions
);

// 3. Skill Schema
const SkillSchema = new Schema<Skill>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    discipline: { type: String, required: true },
    difficulty: { type: String, required: true },
    prerequisites: [{ type: String }],
    description: { type: String, required: true },
    tags: [{ type: String }]
  },
  schemaOptions
);

// 4. Assessment Schema
const AssessmentSchema = new Schema<Assessment>(
  {
    id: { type: String, required: true, unique: true, index: true },
    skillId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    discipline: { type: String, required: true },
    passingScore: { type: Number, default: 70 },
    questions: [
      {
        id: String,
        question: String,
        options: [String],
        correctIndex: Number,
        explanation: String,
        skillTopic: String,
        difficulty: String
      }
    ]
  },
  schemaOptions
);

// 5. Resource Schema
const ResourceSchema = new Schema<Resource>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    url: { type: String, required: true },
    durationMinutes: { type: Number, default: 60 },
    difficulty: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    whyRecommended: String,
    embedType: String,
    approvalStatus: { type: String, default: 'approved' },
    approvedByMentorName: String,
    approvedAt: String,
    aiRationale: String
  },
  schemaOptions
);

// 6. Student Profile Schema
const StudentProfileSchema = new Schema<StudentProfile>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    avatarUrl: String,
    discipline: { type: String, required: true },
    stream: String,
    specialization: String,
    degree: { type: String, required: true },
    yearOfStudy: { type: Number, default: 3 },
    cgpa: { type: Number, default: 8.0 },
    targetCareerId: { type: String, required: true, index: true },
    targetRoleId: String,
    interests: [{ type: String }],
    skills: [
      {
        skillId: String,
        skillName: String,
        level: Number,
        verified: Boolean,
        lastAssessedAt: String
      }
    ],
    projects: [
      {
        id: String,
        title: String,
        description: String,
        technologies: [String],
        verified: Boolean,
        link: String
      }
    ],
    certifications: [{ type: String }],
    assessmentScores: { type: Map, of: Number, default: {} },
    uncertaintyScore: { type: Number, default: 0.2 },
    readinessScore: {
      overallPercentage: { type: Number, default: 50 },
      technicalScore: { type: Number, default: 50 },
      projectScore: { type: Number, default: 50 },
      problemSolvingScore: { type: Number, default: 50 },
      softSkillScore: { type: Number, default: 50 },
      status: { type: String, default: 'building' }
    },
    learningPace: { type: String, default: 'steady' },
    weeklyHoursCommitted: { type: Number, default: 12 },
    learningStyle: String,
    targetTimeline: String,
    priorExperience: String,
    completedMilestoneIds: [{ type: String }],
    completedResourceIds: [{ type: String }]
  },
  schemaOptions
);

// 7. Mentor Intervention Schema
const MentorInterventionSchema = new Schema<MentorIntervention>(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    targetCareer: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'open' },
    notes: { type: String, default: '' },
    createdAt: { type: String, default: () => new Date().toISOString() },
    lastActionAt: String
  },
  schemaOptions
);

// 8. Curriculum Gap Insight Schema
const CurriculumGapSchema = new Schema<CurriculumGapInsight>(
  {
    id: { type: String, required: true, unique: true, index: true },
    discipline: { type: String, required: true },
    careerTitle: { type: String, required: true },
    skillName: { type: String, required: true },
    deficiencyPercentage: { type: Number, required: true },
    studentCount: { type: Number, default: 0 },
    suggestedIntervention: { type: String, required: true },
    priority: { type: String, default: 'high' }
  },
  schemaOptions
);

// 9. Notification Schema
const NotificationSchema = new Schema<NotificationItem>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: String, default: () => new Date().toISOString() },
    link: String
  },
  schemaOptions
);

// 10. Doubt Query Schema
const DoubtSchema = new Schema<DoubtQuery>(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    title: { type: String, required: true },
    queryText: { type: String, required: true },
    codeSnippet: String,
    domain: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    urgency: { type: String, default: 'normal' },
    status: { type: String, default: 'open' },
    createdAt: { type: String, default: () => new Date().toISOString() },
    upvotes: { type: Number, default: 0 },
    replies: [
      {
        id: String,
        doubtId: String,
        authorId: String,
        authorName: String,
        authorRole: String,
        authorTitle: String,
        authorOrg: String,
        content: String,
        codeSnippet: String,
        verified: Boolean,
        upvotes: Number,
        createdAt: String
      }
    ]
  },
  schemaOptions
);

// 11. Placement Company Drive Schema
const PlacementDriveSchema = new Schema<PlacementCompanyDrive>(
  {
    id: { type: String, required: true, unique: true, index: true },
    companyName: { type: String, required: true },
    logoUrl: String,
    industry: { type: String, required: true },
    roleTitle: { type: String, required: true },
    ctcPackage: { type: String, required: true },
    jobType: { type: String, default: 'full_time' },
    workLocation: { type: String, default: 'Bengaluru / Hybrid' },
    driveDate: { type: String, required: true },
    applicationDeadline: { type: String, required: true },
    status: { type: String, default: 'active' },
    eligibleDepartments: [{ type: String }],
    minCgpa: { type: Number, default: 7.0 },
    minReadinessScore: { type: Number, default: 60 },
    requiredSkills: [{ type: String }],
    selectionProcess: [{ type: String }],
    description: { type: String, default: '' },
    hiringCount: { type: Number, default: 5 },
    registeredStudentIds: [{ type: String }],
    shortlistedStudentIds: [{ type: String }],
    placedStudentIds: [{ type: String }]
  },
  schemaOptions
);

// 12. Placement Application Schema
const PlacementApplicationSchema = new Schema<PlacementApplication>(
  {
    id: { type: String, required: true, unique: true, index: true },
    driveId: { type: String, required: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, required: true },
    department: { type: String, required: true },
    cgpa: { type: Number, default: 8.0 },
    readinessPercentage: { type: Number, default: 60 },
    status: { type: String, default: 'applied' },
    appliedAt: { type: String, default: () => new Date().toISOString() },
    feedback: String
  },
  schemaOptions
);

// 13. Course Recommendation Schema
const CourseRecommendationSchema = new Schema<CourseRecommendation>(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    department: { type: String, required: true },
    targetCareer: { type: String, required: true },
    skillGapName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    provider: { type: String, required: true },
    courseUrl: { type: String, required: true },
    type: { type: String, default: 'course' },
    durationMinutes: { type: Number, default: 180 },
    difficulty: { type: String, default: 'intermediate' },
    rating: { type: Number, default: 4.8 },
    aiRationale: { type: String, required: true },
    status: { type: String, default: 'pending_approval' },
    mentorId: String,
    mentorName: String,
    mentorFeedback: String,
    requestedAt: { type: String, default: () => new Date().toISOString() },
    reviewedAt: String
  },
  schemaOptions
);

// 14. Chat History Schema (Scoped by Student ID)
export interface ChatHistoryDoc {
  studentId: string;
  messages: AIMessage[];
}

const ChatHistorySchema = new Schema<ChatHistoryDoc>(
  {
    studentId: { type: String, required: true, unique: true, index: true },
    messages: [
      {
        id: String,
        sender: String,
        content: String,
        timestamp: String,
        suggestedActions: [String],
        contextSnapshot: {
          careerTitle: String,
          topGapSkill: String,
          readiness: Number
        }
      }
    ]
  },
  schemaOptions
);

// Export Mongoose Models (Using existing collection names if present, or clean defaults)
export const UserModel = mongoose.models.User || mongoose.model<UserAccount>('User', UserSchema);
export const CareerModel = mongoose.models.Career || mongoose.model<Career>('Career', CareerSchema);
export const SkillModel = mongoose.models.Skill || mongoose.model<Skill>('Skill', SkillSchema);
export const AssessmentModel = mongoose.models.Assessment || mongoose.model<Assessment>('Assessment', AssessmentSchema);
export const ResourceModel = mongoose.models.Resource || mongoose.model<Resource>('Resource', ResourceSchema);
export const ProfileModel = mongoose.models.Profile || mongoose.model<StudentProfile>('Profile', StudentProfileSchema);
export const InterventionModel = mongoose.models.Intervention || mongoose.model<MentorIntervention>('Intervention', MentorInterventionSchema);
export const CurriculumGapModel = mongoose.models.CurriculumGap || mongoose.model<CurriculumGapInsight>('CurriculumGap', CurriculumGapSchema);
export const NotificationModel = mongoose.models.Notification || mongoose.model<NotificationItem>('Notification', NotificationSchema);
export const DoubtModel = mongoose.models.Doubt || mongoose.model<DoubtQuery>('Doubt', DoubtSchema);
export const PlacementDriveModel = mongoose.models.PlacementDrive || mongoose.model<PlacementCompanyDrive>('PlacementDrive', PlacementDriveSchema);
export const PlacementApplicationModel = mongoose.models.PlacementApplication || mongoose.model<PlacementApplication>('PlacementApplication', PlacementApplicationSchema);
export const CourseRecommendationModel = mongoose.models.CourseRecommendation || mongoose.model<CourseRecommendation>('CourseRecommendation', CourseRecommendationSchema);
export const ChatHistoryModel = mongoose.models.ChatHistory || mongoose.model<ChatHistoryDoc>('ChatHistory', ChatHistorySchema);
