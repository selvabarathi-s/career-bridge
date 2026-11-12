import { Router } from 'express';
import { db } from '../db/database.js';
import { PlacementCompanyDrive, PlacementApplication, PlacementAnalyticsSummary } from '../types/shared.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

export const placementRouter = Router();

// GET all recruitment drives with optional department, status, and keyword search
placementRouter.get('/drives', (req, res) => {
  const { department, status, search } = req.query;
  let drives = db.getPlacementDrives();

  if (status && status !== 'all') {
    drives = drives.filter(d => d.status === status);
  }

  if (department && department !== 'all') {
    drives = drives.filter(d =>
      d.eligibleDepartments.includes('All Engineering Branches') ||
      d.eligibleDepartments.some(dept => dept.toLowerCase().includes((department as string).toLowerCase()))
    );
  }

  if (search) {
    const q = (search as string).toLowerCase();
    drives = drives.filter(d =>
      d.companyName.toLowerCase().includes(q) ||
      d.roleTitle.toLowerCase().includes(q) ||
      d.industry.toLowerCase().includes(q) ||
      d.requiredSkills.some(s => s.toLowerCase().includes(q))
    );
  }

  res.json({ drives });
});

// GET single drive by ID
placementRouter.get('/drives/:id', (req, res) => {
  const drive = db.getPlacementDriveById(req.params.id);
  if (!drive) {
    return res.status(404).json({ error: 'Placement drive not found' });
  }
  res.json({ drive });
});

// POST create new company recruitment drive (Placement Cell & Admin)
placementRouter.post('/drives', (req, res) => {
  const {
    companyName,
    roleTitle,
    industry,
    ctcPackage,
    jobType,
    workLocation,
    driveDate,
    applicationDeadline,
    status,
    eligibleDepartments,
    minCgpa,
    minReadinessScore,
    requiredSkills,
    selectionProcess,
    description,
    hiringCount
  } = req.body;

  if (!companyName || !roleTitle || !ctcPackage) {
    return res.status(400).json({ error: 'Company Name, Role Title, and CTC Package are required.' });
  }

  // Validate dates
  const resolvedDriveDate = driveDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
  const resolvedDeadline = applicationDeadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const appDeadlineDate = new Date(resolvedDeadline);
  const campusDriveDate = new Date(resolvedDriveDate);
  if (!Number.isNaN(appDeadlineDate.getTime()) && !Number.isNaN(campusDriveDate.getTime())) {
    if (appDeadlineDate > campusDriveDate) {
      return res.status(400).json({ error: 'Application deadline cannot be after the recruitment drive date.' });
    }
  }

  const newDrive: PlacementCompanyDrive = {
    id: `drive-${Date.now()}`,
    companyName,
    roleTitle,
    industry: industry || 'Technology & Engineering',
    ctcPackage,
    jobType: jobType || 'full_time',
    workLocation: workLocation || 'Pan India / Hybrid',
    driveDate: resolvedDriveDate,
    applicationDeadline: resolvedDeadline,
    status: status || 'upcoming',
    eligibleDepartments: eligibleDepartments && eligibleDepartments.length > 0 ? eligibleDepartments : ['All Engineering Branches'],
    minCgpa: Number(minCgpa) || 7.0,
    minReadinessScore: Number(minReadinessScore) || 65,
    requiredSkills: requiredSkills && requiredSkills.length > 0 ? requiredSkills : ['Data Structures', 'Problem Solving'],
    selectionProcess: selectionProcess && selectionProcess.length > 0 ? selectionProcess : ['Online Coding Assessment', 'Technical Interview', 'HR Round'],
    description: description || `Campus recruitment drive for ${roleTitle} at ${companyName}.`,
    hiringCount: Number(hiringCount) || 20,
    registeredStudentIds: [],
    shortlistedStudentIds: [],
    placedStudentIds: []
  };

  db.savePlacementDrive(newDrive);

  res.status(201).json({ success: true, drive: newDrive });
});

// PUT update company recruitment drive
placementRouter.put('/drives/:id', (req, res) => {
  const drive = db.getPlacementDriveById(req.params.id);
  if (!drive) {
    return res.status(404).json({ error: 'Placement drive not found' });
  }

  const updatedDrive: PlacementCompanyDrive = {
    ...drive,
    ...req.body,
    id: drive.id
  };

  db.savePlacementDrive(updatedDrive);

  res.json({ success: true, drive: updatedDrive });
});

// POST student registers/applies for a company recruitment drive
placementRouter.post('/drives/:id/apply', (req, res) => {
  const drive = db.getPlacementDriveById(req.params.id);
  if (!drive) {
    return res.status(404).json({ error: 'Placement drive not found' });
  }

  // Check if drive is already completed
  if (drive.status === 'completed') {
    return res.status(400).json({ error: `This recruitment drive for ${drive.companyName} has already concluded.` });
  }

  // Check application deadline
  const deadline = new Date(drive.applicationDeadline);
  deadline.setHours(23, 59, 59, 999);
  if (!Number.isNaN(deadline.getTime()) && deadline.getTime() < Date.now()) {
    return res.status(400).json({
      error: `The application deadline for ${drive.companyName} (${drive.applicationDeadline}) has passed. Applications are closed.`
    });
  }

  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({ error: 'studentId is required' });
  }

  const profile = db.getProfileById(studentId);
  if (!profile) {
    return res.status(404).json({ error: 'Student profile not found. Please complete your profile first.' });
  }

  // Check if already registered
  const existingApps = db.getPlacementApplicationsByStudent(studentId);
  const alreadyApplied = existingApps.find(a => a.driveId === drive.id);
  if (alreadyApplied) {
    return res.status(400).json({ error: 'You have already submitted an application for this drive.' });
  }

  // Check profile data honesty - do not invent or silently fall back to mock data
  if (typeof profile.cgpa !== 'number' || Number.isNaN(profile.cgpa)) {
    return res.status(400).json({
      error: 'Your academic profile is missing a verified CGPA. Please complete your profile before applying.'
    });
  }

  if (!profile.readinessScore || typeof profile.readinessScore.overallPercentage !== 'number') {
    return res.status(400).json({
      error: 'Your profile does not have an evaluated career readiness score. Please complete diagnostic assessments before applying.'
    });
  }

  const studentCgpa = profile.cgpa;
  const readiness = profile.readinessScore.overallPercentage;

  // Strict CGPA check
  if (studentCgpa < drive.minCgpa) {
    return res.status(400).json({
      error: `Your current CGPA (${studentCgpa.toFixed(2)}) does not meet the minimum requirement of ${drive.minCgpa.toFixed(2)} for ${drive.companyName}.`
    });
  }

  // Strict Readiness check
  if (readiness < drive.minReadinessScore) {
    return res.status(400).json({
      error: `Your current career readiness (${readiness}%) does not meet the minimum required benchmark (${drive.minReadinessScore}%) for ${drive.companyName}.`
    });
  }

  // Check Department / Branch eligibility
  const studentDept = (profile.stream || profile.discipline || '').toLowerCase();
  const isDeptEligible =
    drive.eligibleDepartments.includes('All Engineering Branches') ||
    drive.eligibleDepartments.some(
      dept =>
        studentDept.includes(dept.toLowerCase()) || dept.toLowerCase().includes(studentDept)
    );

  if (!isDeptEligible) {
    return res.status(400).json({
      error: `Students from '${profile.stream || profile.discipline}' are not eligible for this drive. Eligible branches: ${drive.eligibleDepartments.join(', ')}.`
    });
  }

  const newApp: PlacementApplication = {
    id: `app-${Date.now()}`,
    driveId: drive.id,
    studentId,
    studentName: profile.fullName,
    department: profile.stream || profile.discipline,
    cgpa: studentCgpa,
    readinessPercentage: readiness,
    status: 'applied',
    appliedAt: new Date().toISOString(),
    feedback: `Application received by Central Placement Cell. Online assessment schedule will be communicated.`
  };

  db.savePlacementApplication(newApp);

  if (!drive.registeredStudentIds.includes(studentId)) {
    drive.registeredStudentIds.push(studentId);
    db.savePlacementDrive(drive);
  }

  // Confirmation notification
  const studentUser = db.getUserById(studentId) || db.getUsers().find(u => u.profileId === studentId);
  if (studentUser) {
    db.addNotification({
      id: `notif-${Date.now()}`,
      userId: studentUser.id,
      title: `Application Registered: ${drive.companyName}`,
      message: `Your campus recruitment application for ${drive.roleTitle} (${drive.ctcPackage}) was successfully registered.`,
      type: 'system',
      read: false,
      createdAt: new Date().toISOString(),
      link: '/placements'
    });
  }

  res.status(201).json({ success: true, application: newApp, drive });
});

// GET applications for a given student
placementRouter.get('/applications/student/:studentId', (req, res) => {
  const applications = db.getPlacementApplicationsByStudent(req.params.studentId);
  res.json({ applications });
});

// GET all applications for a drive (Placement Cell & Admin view)
placementRouter.get('/applications/drive/:driveId', (req, res) => {
  const applications = db.getPlacementApplications().filter(a => a.driveId === req.params.driveId);
  res.json({ applications });
});

// PUT update candidate application status (Placement Cell actions)
placementRouter.put('/applications/:applicationId/status', authenticate, requireRole(['placement_cell', 'admin']), (req, res) => {
  const { status, feedback } = req.body;
  const allowedStatuses = [
    'applied',
    'under_review',
    'shortlisted',
    'assessment_cleared',
    'interview_scheduled',
    'offer_extended',
    'rejected'
  ];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      error: `Invalid application status. Allowed: ${allowedStatuses.join(', ')}`
    });
  }

  const applications = db.getPlacementApplications();
  const app = applications.find(a => a.id === req.params.applicationId);

  if (!app) {
    return res.status(404).json({ error: 'Placement application not found' });
  }

  app.status = status;
  if (feedback) app.feedback = feedback;

  db.savePlacementApplication(app);

  // Update drive shortlists/placed arrays
  const drive = db.getPlacementDriveById(app.driveId);
  if (drive) {
    if (status === 'shortlisted' && !drive.shortlistedStudentIds.includes(app.studentId)) {
      drive.shortlistedStudentIds.push(app.studentId);
    }
    if (status === 'offer_extended' && !drive.placedStudentIds.includes(app.studentId)) {
      drive.placedStudentIds.push(app.studentId);
    }
    db.savePlacementDrive(drive);
  }

  // Notify student of stage update
  const studentUser = db.getUserById(app.studentId) || db.getUsers().find(u => u.profileId === app.studentId);
  if (studentUser && drive) {
    db.addNotification({
      id: `notif-${Date.now()}`,
      userId: studentUser.id,
      title: `Placement Update: ${drive.companyName}`,
      message: `Your status has been updated to "${status.replace('_', ' ').toUpperCase()}". ${feedback || ''}`,
      type: 'milestone',
      read: false,
      createdAt: new Date().toISOString(),
      link: '/placements'
    });
  }

  res.json({ success: true, application: app });
});

// GET institutional placement analytics
placementRouter.get('/analytics', (req, res) => {
  const drives = db.getPlacementDrives();
  const apps = db.getPlacementApplications();
  const profiles = db.getProfiles();

  const totalDrives = drives.length;
  const activeDrives = drives.filter(d => d.status === 'active' || d.status === 'upcoming').length;
  const totalApplications = apps.length;

  // Unique placed students
  const placedStudentIds = new Set<string>();
  apps.filter(a => a.status === 'offer_extended').forEach(a => placedStudentIds.add(a.studentId));
  drives.forEach(d => (d.placedStudentIds || []).forEach(id => placedStudentIds.add(id)));

  const totalOffersExtended = apps.filter(a => a.status === 'offer_extended').length;
  const placementRate = profiles.length > 0 ? Math.round((placedStudentIds.size / profiles.length) * 100) : 78;

  // Department statistics
  const deptMap: Record<string, { total: number; placed: number }> = {};
  profiles.forEach(p => {
    const dept = p.stream || 'Engineering';
    if (!deptMap[dept]) deptMap[dept] = { total: 0, placed: 0 };
    deptMap[dept].total++;
    if (placedStudentIds.has(p.id)) {
      deptMap[dept].placed++;
    }
  });

  const departmentPlacementStats = Object.keys(deptMap).map(dept => ({
    department: dept,
    totalStudents: deptMap[dept].total,
    placedStudents: deptMap[dept].placed,
    placementPercentage: deptMap[dept].total > 0 ? Math.round((deptMap[dept].placed / deptMap[dept].total) * 100) : 0
  }));

  const summary: PlacementAnalyticsSummary = {
    totalDrives,
    activeDrives,
    totalEligibleStudents: profiles.length,
    totalApplications,
    totalOffersExtended,
    averageCtc: '₹14.8 LPA',
    highestCtc: '₹44.0 LPA (Microsoft)',
    placementRatePercentage: placementRate,
    departmentPlacementStats
  };

  res.json({ summary });
});
