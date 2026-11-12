import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';

dotenv.config();
try {
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFile);
  dotenv.config({ path: path.resolve(currentDir, '../../.env') });
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
} catch {}
import {
  Career,
  Skill,
  Assessment,
  Resource,
  StudentProfile,
  MentorIntervention,
  CurriculumGapInsight,
  AIMessage,
  UserAccount,
  NotificationItem,
  DoubtQuery,
  PlacementCompanyDrive,
  PlacementApplication,
  CourseRecommendation
} from '../types/shared.js';
import {
  SEED_CAREERS,
  SEED_SKILLS,
  SEED_ASSESSMENTS,
  SEED_RESOURCES,
  SEED_PROFILES,
  SEED_INTERVENTIONS,
  SEED_CURRICULUM_GAPS,
  SEED_USERS,
  SEED_NOTIFICATIONS,
  SEED_DOUBTS,
  SEED_PLACEMENT_DRIVES,
  SEED_PLACEMENT_APPLICATIONS,
  SEED_COURSE_RECOMMENDATIONS
} from './seedData.js';
import {
  UserModel,
  CareerModel,
  SkillModel,
  AssessmentModel,
  ResourceModel,
  ProfileModel,
  InterventionModel,
  CurriculumGapModel,
  NotificationModel,
  DoubtModel,
  PlacementDriveModel,
  PlacementApplicationModel,
  CourseRecommendationModel,
  ChatHistoryModel
} from '../models/schemas.js';

// Ensure standard public DNS servers for MongoDB Atlas SRV lookup on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Ignore in restricted environments
}

interface DatabaseSchema {
  users: UserAccount[];
  careers: Career[];
  skills: Skill[];
  assessments: Assessment[];
  resources: Resource[];
  profiles: StudentProfile[];
  interventions: MentorIntervention[];
  curriculumGaps: CurriculumGapInsight[];
  notifications: NotificationItem[];
  doubts: DoubtQuery[];
  placementDrives: PlacementCompanyDrive[];
  placementApplications: PlacementApplication[];
  courseRecommendations: CourseRecommendation[];
  chatHistory: Record<string, AIMessage[]>; // studentId -> AIMessage[]
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function cleanMongoDoc<T>(doc: any): T {
  if (!doc) return doc;
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  delete obj._id;
  delete obj.__v;
  // If assessmentScores is a Map, convert to a plain object
  if (obj.assessmentScores && obj.assessmentScores instanceof Map) {
    obj.assessmentScores = Object.fromEntries(obj.assessmentScores);
  }
  return obj as T;
}

class DatabaseService {
  private data: DatabaseSchema;
  private isMongoConnected: boolean = false;
  private initPromise: Promise<void>;

  constructor() {
    this.data = this.initializeLocal();
    this.initPromise = this.initMongoDB();
  }

  public async ready(): Promise<void> {
    await this.initPromise;
  }

  public getMongoStatus(): { connected: boolean } {
    return { connected: this.isMongoConnected };
  }

  private initializeLocal(): DatabaseSchema {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {}
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.users && parsed.users.length > 0) {
          parsed.careers = SEED_CAREERS;
          parsed.skills = SEED_SKILLS;
          parsed.assessments = SEED_ASSESSMENTS;
          parsed.resources = SEED_RESOURCES;
          parsed.curriculumGaps = SEED_CURRICULUM_GAPS;
          for (const su of SEED_USERS) {
            const idx = parsed.users.findIndex((u: any) => u.email === su.email || u.id === su.id);
            if (idx === -1) {
              parsed.users.push(su);
            } else {
              parsed.users[idx] = { ...su, ...parsed.users[idx] };
            }
          }
          if (!parsed.notifications || parsed.notifications.length === 0) parsed.notifications = SEED_NOTIFICATIONS;
          if (!parsed.doubts || parsed.doubts.length === 0) parsed.doubts = SEED_DOUBTS;
          if (!parsed.placementDrives || parsed.placementDrives.length === 0) parsed.placementDrives = SEED_PLACEMENT_DRIVES;
          if (!parsed.placementApplications || parsed.placementApplications.length === 0) parsed.placementApplications = SEED_PLACEMENT_APPLICATIONS;
          if (!parsed.courseRecommendations || parsed.courseRecommendations.length === 0) parsed.courseRecommendations = SEED_COURSE_RECOMMENDATIONS;
          if (!parsed.chatHistory) parsed.chatHistory = {};
          this.saveLocalData(parsed);
          return parsed;
        }
      } catch (err) {
        console.warn('Failed to parse existing db.json, re-initializing with seed data.', err);
      }
    }

    const initialData: DatabaseSchema = {
      users: SEED_USERS,
      careers: SEED_CAREERS,
      skills: SEED_SKILLS,
      assessments: SEED_ASSESSMENTS,
      resources: SEED_RESOURCES,
      profiles: SEED_PROFILES,
      interventions: SEED_INTERVENTIONS,
      curriculumGaps: SEED_CURRICULUM_GAPS,
      notifications: SEED_NOTIFICATIONS,
      doubts: SEED_DOUBTS,
      placementDrives: SEED_PLACEMENT_DRIVES,
      placementApplications: SEED_PLACEMENT_APPLICATIONS,
      courseRecommendations: SEED_COURSE_RECOMMENDATIONS,
      chatHistory: {}
    };

    this.saveLocalData(initialData);
    return initialData;
  }

  private saveLocalData(dataToSave: DatabaseSchema = this.data): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      // Local file write failure is non-fatal
    }
  }

  private async initMongoDB(): Promise<void> {
    const mongoUri =
      process.env.MONGODB_URI ||
      'mongodb+srv://selvabarathisit_db_user:FuaBPhDJrJK6tRJN@careerbrigde.0i8vqzt.mongodb.net/careerbridge?retryWrites=true&w=majority&appName=careerbrigde';
    if (!mongoUri) {
      console.log('ℹ️ MONGODB_URI not provided; running in local storage mode.');
      return;
    }

    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
      }
      this.isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas successfully.');

      // Check if auto-seed is required
      const userCount = await UserModel.countDocuments();
      if (userCount === 0) {
        console.log('🌱 Seeding MongoDB Atlas collections with comprehensive seed data...');
        await Promise.all([
          UserModel.insertMany(SEED_USERS),
          CareerModel.insertMany(SEED_CAREERS),
          SkillModel.insertMany(SEED_SKILLS),
          AssessmentModel.insertMany(SEED_ASSESSMENTS),
          ResourceModel.insertMany(SEED_RESOURCES),
          ProfileModel.insertMany(SEED_PROFILES),
          InterventionModel.insertMany(SEED_INTERVENTIONS),
          CurriculumGapModel.insertMany(SEED_CURRICULUM_GAPS),
          NotificationModel.insertMany(SEED_NOTIFICATIONS),
          DoubtModel.insertMany(SEED_DOUBTS),
          PlacementDriveModel.insertMany(SEED_PLACEMENT_DRIVES),
          PlacementApplicationModel.insertMany(SEED_PLACEMENT_APPLICATIONS),
          CourseRecommendationModel.insertMany(SEED_COURSE_RECOMMENDATIONS)
        ]);
        console.log('🌱 MongoDB Atlas successfully seeded with all initial data.');
      }

      // Synchronize in-memory cache with MongoDB Atlas
      await this.syncFromMongoDB();
    } catch (err) {
      console.warn('⚠️ MongoDB Atlas connection/initialization error (falling back to local cache):', err);
      this.isMongoConnected = false;
    }
  }

  public async syncFromMongoDB(): Promise<void> {
    if (!this.isMongoConnected) return;

    try {
      const [
        users,
        careers,
        skills,
        assessments,
        resources,
        profiles,
        interventions,
        curriculumGaps,
        notifications,
        doubts,
        placementDrives,
        placementApplications,
        courseRecommendations,
        chats
      ] = await Promise.all([
        UserModel.find({}).lean(),
        CareerModel.find({}).lean(),
        SkillModel.find({}).lean(),
        AssessmentModel.find({}).lean(),
        ResourceModel.find({}).lean(),
        ProfileModel.find({}).lean(),
        InterventionModel.find({}).lean(),
        CurriculumGapModel.find({}).lean(),
        NotificationModel.find({}).lean(),
        DoubtModel.find({}).lean(),
        PlacementDriveModel.find({}).lean(),
        PlacementApplicationModel.find({}).lean(),
        CourseRecommendationModel.find({}).lean(),
        ChatHistoryModel.find({}).lean()
      ]);

      if (users.length > 0) this.data.users = users.map(u => cleanMongoDoc<UserAccount>(u));
      if (careers.length > 0) this.data.careers = careers.map(c => cleanMongoDoc<Career>(c));
      if (skills.length > 0) this.data.skills = skills.map(s => cleanMongoDoc<Skill>(s));
      if (assessments.length > 0) this.data.assessments = assessments.map(a => cleanMongoDoc<Assessment>(a));
      if (resources.length > 0) this.data.resources = resources.map(r => cleanMongoDoc<Resource>(r));
      if (profiles.length > 0) this.data.profiles = profiles.map(p => cleanMongoDoc<StudentProfile>(p));
      if (interventions.length > 0) this.data.interventions = interventions.map(i => cleanMongoDoc<MentorIntervention>(i));
      if (curriculumGaps.length > 0) this.data.curriculumGaps = curriculumGaps.map(g => cleanMongoDoc<CurriculumGapInsight>(g));
      if (notifications.length > 0) this.data.notifications = notifications.map(n => cleanMongoDoc<NotificationItem>(n));
      if (doubts.length > 0) this.data.doubts = doubts.map(d => cleanMongoDoc<DoubtQuery>(d));
      if (placementDrives.length > 0) this.data.placementDrives = placementDrives.map(d => cleanMongoDoc<PlacementCompanyDrive>(d));
      if (placementApplications.length > 0) this.data.placementApplications = placementApplications.map(a => cleanMongoDoc<PlacementApplication>(a));
      if (courseRecommendations.length > 0) this.data.courseRecommendations = courseRecommendations.map(c => cleanMongoDoc<CourseRecommendation>(c));

      this.data.chatHistory = {};
      for (const c of chats) {
        if (c.studentId) {
          this.data.chatHistory[c.studentId] = c.messages || [];
        }
      }

      console.log(`📊 Synchronized state from MongoDB Atlas: ${this.data.users.length} users, ${this.data.profiles.length} profiles, ${this.data.careers.length} careers.`);
    } catch (err) {
      console.error('Failed to sync from MongoDB Atlas:', err);
    }
  }

  // --- Users ---
  public getUsers(): UserAccount[] {
    return this.data.users || [];
  }

  public getUserById(id: string): UserAccount | undefined {
    return (this.data.users || []).find(u => u.id === id);
  }

  public getUserByEmail(email: string): UserAccount | undefined {
    return (this.data.users || []).find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  public saveUser(user: UserAccount): UserAccount {
    if (!this.data.users) this.data.users = [];
    const idx = this.data.users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      this.data.users[idx] = user;
    } else {
      this.data.users.push(user);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      UserModel.findOneAndUpdate({ id: user.id }, user, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveUser error:', err);
      });
    }
    return user;
  }

  // --- Careers ---
  public getCareers(discipline?: string): Career[] {
    if (discipline && discipline !== 'all') {
      return this.data.careers.filter(c => c.discipline === discipline);
    }
    return this.data.careers;
  }

  public getCareerById(id: string): Career | undefined {
    return this.data.careers.find(c => c.id === id);
  }

  public saveCareer(career: Career): Career {
    const idx = this.data.careers.findIndex(c => c.id === career.id);
    if (idx >= 0) {
      this.data.careers[idx] = career;
    } else {
      this.data.careers.push(career);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      CareerModel.findOneAndUpdate({ id: career.id }, career, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveCareer error:', err);
      });
    }
    return career;
  }

  // --- Skills ---
  public getSkills(discipline?: string): Skill[] {
    if (discipline && discipline !== 'all') {
      return this.data.skills.filter(s => s.discipline === discipline);
    }
    return this.data.skills;
  }

  public getSkillById(id: string): Skill | undefined {
    return this.data.skills.find(s => s.id === id);
  }

  public saveSkill(skill: Skill): Skill {
    const idx = this.data.skills.findIndex(s => s.id === skill.id);
    if (idx >= 0) {
      this.data.skills[idx] = skill;
    } else {
      this.data.skills.push(skill);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      SkillModel.findOneAndUpdate({ id: skill.id }, skill, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveSkill error:', err);
      });
    }
    return skill;
  }

  // --- Assessments ---
  public getAssessments(skillId?: string): Assessment[] {
    if (skillId) {
      return this.data.assessments.filter(a => a.skillId === skillId);
    }
    return this.data.assessments;
  }

  public getAssessmentById(id: string): Assessment | undefined {
    return this.data.assessments.find(a => a.id === id);
  }

  // --- Resources ---
  public getResources(): Resource[] {
    return this.data.resources;
  }

  public getResourceById(id: string): Resource | undefined {
    return this.data.resources.find(r => r.id === id);
  }

  public saveResource(resource: Resource): Resource {
    if (!this.data.resources) this.data.resources = [];
    const idx = this.data.resources.findIndex(r => r.id === resource.id);
    if (idx >= 0) {
      this.data.resources[idx] = resource;
    } else {
      this.data.resources.unshift(resource);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      ResourceModel.findOneAndUpdate({ id: resource.id }, resource, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveResource error:', err);
      });
    }
    return resource;
  }

  // --- Profiles ---
  public getProfiles(): StudentProfile[] {
    return this.data.profiles;
  }

  public getProfileById(id: string): StudentProfile | undefined {
    return this.data.profiles.find(p => p.id === id || p.userId === id);
  }

  public saveProfile(profile: StudentProfile): StudentProfile {
    const idx = this.data.profiles.findIndex(p => p.id === profile.id);
    if (idx >= 0) {
      this.data.profiles[idx] = profile;
    } else {
      this.data.profiles.push(profile);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      ProfileModel.findOneAndUpdate({ id: profile.id }, profile, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveProfile error:', err);
      });
    }
    return profile;
  }

  // --- Notifications ---
  public getNotifications(userId?: string): NotificationItem[] {
    if (userId) {
      return (this.data.notifications || []).filter(n => n.userId === userId);
    }
    return this.data.notifications || [];
  }

  public addNotification(item: NotificationItem): NotificationItem {
    if (!this.data.notifications) this.data.notifications = [];
    this.data.notifications.unshift(item);
    this.saveLocalData();

    if (this.isMongoConnected) {
      NotificationModel.findOneAndUpdate({ id: item.id }, item, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas addNotification error:', err);
      });
    }
    return item;
  }

  public markNotificationRead(id: string): void {
    if (!this.data.notifications) return;
    const notif = this.data.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.saveLocalData();
    }

    if (this.isMongoConnected) {
      NotificationModel.updateOne({ id }, { $set: { read: true } }).catch(err => {
        console.error('MongoDB Atlas markNotificationRead error:', err);
      });
    }
  }

  // --- Interventions ---
  public getInterventions(): MentorIntervention[] {
    return this.data.interventions;
  }

  public saveIntervention(intervention: MentorIntervention): MentorIntervention {
    const idx = this.data.interventions.findIndex(i => i.id === intervention.id);
    if (idx >= 0) {
      this.data.interventions[idx] = intervention;
    } else {
      this.data.interventions.push(intervention);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      InterventionModel.findOneAndUpdate({ id: intervention.id }, intervention, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveIntervention error:', err);
      });
    }
    return intervention;
  }

  // --- Curriculum Gaps ---
  public getCurriculumGaps(): CurriculumGapInsight[] {
    return this.data.curriculumGaps;
  }

  public saveCurriculumGap(gap: CurriculumGapInsight): CurriculumGapInsight {
    const idx = this.data.curriculumGaps.findIndex(g => g.id === gap.id);
    if (idx >= 0) {
      this.data.curriculumGaps[idx] = gap;
    } else {
      this.data.curriculumGaps.push(gap);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      CurriculumGapModel.findOneAndUpdate({ id: gap.id }, gap, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveCurriculumGap error:', err);
      });
    }
    return gap;
  }

  // --- Chat History ---
  public getChatHistory(studentId: string): AIMessage[] {
    return this.data.chatHistory[studentId] || [];
  }

  public addChatMessage(studentId: string, message: AIMessage): void {
    if (!this.data.chatHistory[studentId]) {
      this.data.chatHistory[studentId] = [];
    }
    this.data.chatHistory[studentId].push(message);
    this.saveLocalData();

    if (this.isMongoConnected) {
      ChatHistoryModel.findOneAndUpdate(
        { studentId },
        { $push: { messages: message } },
        { upsert: true }
      ).catch(err => {
        console.error('MongoDB Atlas addChatMessage error:', err);
      });
    }
  }

  // --- Real-Time Guidance & Doubts ---
  public getDoubts(): DoubtQuery[] {
    return this.data.doubts || [];
  }

  public getDoubtById(id: string): DoubtQuery | undefined {
    return (this.data.doubts || []).find(d => d.id === id);
  }

  public saveDoubt(doubt: DoubtQuery): DoubtQuery {
    if (!this.data.doubts) this.data.doubts = [];
    const idx = this.data.doubts.findIndex(d => d.id === doubt.id);
    if (idx >= 0) {
      this.data.doubts[idx] = doubt;
    } else {
      this.data.doubts.unshift(doubt);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      DoubtModel.findOneAndUpdate({ id: doubt.id }, doubt, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveDoubt error:', err);
      });
    }
    return doubt;
  }

  // --- Live Placement Drives ---
  public getPlacementDrives(): PlacementCompanyDrive[] {
    return this.data.placementDrives || [];
  }

  public getPlacementDriveById(id: string): PlacementCompanyDrive | undefined {
    return (this.data.placementDrives || []).find(d => d.id === id);
  }

  public savePlacementDrive(drive: PlacementCompanyDrive): PlacementCompanyDrive {
    if (!this.data.placementDrives) this.data.placementDrives = [];
    const idx = this.data.placementDrives.findIndex(d => d.id === drive.id);
    if (idx >= 0) {
      this.data.placementDrives[idx] = drive;
    } else {
      this.data.placementDrives.unshift(drive);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      PlacementDriveModel.findOneAndUpdate({ id: drive.id }, drive, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas savePlacementDrive error:', err);
      });
    }
    return drive;
  }

  // --- Student Placement Applications ---
  public getPlacementApplications(): PlacementApplication[] {
    return this.data.placementApplications || [];
  }

  public getPlacementApplicationsByStudent(studentId: string): PlacementApplication[] {
    return (this.data.placementApplications || []).filter(a => a.studentId === studentId);
  }

  public savePlacementApplication(app: PlacementApplication): PlacementApplication {
    if (!this.data.placementApplications) this.data.placementApplications = [];
    const idx = this.data.placementApplications.findIndex(a => a.id === app.id);
    if (idx >= 0) {
      this.data.placementApplications[idx] = app;
    } else {
      this.data.placementApplications.unshift(app);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      PlacementApplicationModel.findOneAndUpdate({ id: app.id }, app, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas savePlacementApplication error:', err);
      });
    }
    return app;
  }

  // --- Course Recommendations & Mentor Approval ---
  public getCourseRecommendations(filter?: { studentId?: string; status?: string }): CourseRecommendation[] {
    let recs = this.data.courseRecommendations || [];
    if (filter?.studentId) {
      recs = recs.filter(r => r.studentId === filter.studentId);
    }
    if (filter?.status) {
      recs = recs.filter(r => r.status === filter.status);
    }
    return recs;
  }

  public getCourseRecommendationById(id: string): CourseRecommendation | undefined {
    return (this.data.courseRecommendations || []).find(r => r.id === id);
  }

  public saveCourseRecommendation(rec: CourseRecommendation): CourseRecommendation {
    if (!this.data.courseRecommendations) this.data.courseRecommendations = [];
    const idx = this.data.courseRecommendations.findIndex(r => r.id === rec.id);
    if (idx >= 0) {
      this.data.courseRecommendations[idx] = rec;
    } else {
      this.data.courseRecommendations.unshift(rec);
    }
    this.saveLocalData();

    if (this.isMongoConnected) {
      CourseRecommendationModel.findOneAndUpdate({ id: rec.id }, rec, { upsert: true }).catch(err => {
        console.error('MongoDB Atlas saveCourseRecommendation error:', err);
      });
    }
    return rec;
  }

  public async resetToSeed(): Promise<void> {
    this.data = {
      users: SEED_USERS,
      careers: SEED_CAREERS,
      skills: SEED_SKILLS,
      assessments: SEED_ASSESSMENTS,
      resources: SEED_RESOURCES,
      profiles: SEED_PROFILES,
      interventions: SEED_INTERVENTIONS,
      curriculumGaps: SEED_CURRICULUM_GAPS,
      notifications: SEED_NOTIFICATIONS,
      doubts: SEED_DOUBTS,
      placementDrives: SEED_PLACEMENT_DRIVES,
      placementApplications: SEED_PLACEMENT_APPLICATIONS,
      courseRecommendations: SEED_COURSE_RECOMMENDATIONS,
      chatHistory: {}
    };
    this.saveLocalData();

    if (this.isMongoConnected) {
      try {
        await Promise.all([
          UserModel.deleteMany({}),
          CareerModel.deleteMany({}),
          SkillModel.deleteMany({}),
          AssessmentModel.deleteMany({}),
          ResourceModel.deleteMany({}),
          ProfileModel.deleteMany({}),
          InterventionModel.deleteMany({}),
          CurriculumGapModel.deleteMany({}),
          NotificationModel.deleteMany({}),
          DoubtModel.deleteMany({}),
          PlacementDriveModel.deleteMany({}),
          PlacementApplicationModel.deleteMany({}),
          CourseRecommendationModel.deleteMany({}),
          ChatHistoryModel.deleteMany({})
        ]);
        await Promise.all([
          UserModel.insertMany(SEED_USERS),
          CareerModel.insertMany(SEED_CAREERS),
          SkillModel.insertMany(SEED_SKILLS),
          AssessmentModel.insertMany(SEED_ASSESSMENTS),
          ResourceModel.insertMany(SEED_RESOURCES),
          ProfileModel.insertMany(SEED_PROFILES),
          InterventionModel.insertMany(SEED_INTERVENTIONS),
          CurriculumGapModel.insertMany(SEED_CURRICULUM_GAPS),
          NotificationModel.insertMany(SEED_NOTIFICATIONS),
          DoubtModel.insertMany(SEED_DOUBTS),
          PlacementDriveModel.insertMany(SEED_PLACEMENT_DRIVES),
          PlacementApplicationModel.insertMany(SEED_PLACEMENT_APPLICATIONS),
          CourseRecommendationModel.insertMany(SEED_COURSE_RECOMMENDATIONS)
        ]);
      } catch (err) {
        console.error('Error re-seeding MongoDB Atlas on resetToSeed:', err);
      }
    }
  }
}

export const db = new DatabaseService();
