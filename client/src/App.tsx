import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileCompanionModal } from './components/mobile/MobileCompanionModal';
import { QRScannerModal } from './components/mobile/QRScannerModal';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CareerExplorer } from './pages/CareerExplorer';
import { CareerSimulatorPage } from './pages/CareerSimulatorPage';
import { SkillGapStudio } from './pages/SkillGapStudio';
import { AdaptiveRoadmapPage } from './pages/AdaptiveRoadmapPage';
import { AssessmentArena } from './pages/AssessmentArena';
import { ResourceHubPage } from './pages/ResourceHubPage';
import { AIMentorPage } from './pages/AIMentorPage';
import { MentorPortalPage } from './pages/MentorPortalPage';
import { AdminHubPage } from './pages/AdminHubPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { RealTimeGuidancePage } from './pages/RealTimeGuidancePage';
import { LivePlacementDrivesPage } from './pages/LivePlacementDrivesPage';
import { PlacementCellPortalPage } from './pages/PlacementCellPortalPage';

import {
  Compass,
  Briefcase,
  Sparkles,
  QrCode,
  Home
} from 'lucide-react';

const AppLayout: React.FC = () => {
  const [mobileCompanionOpen, setMobileCompanionOpen] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  const isPublicPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-white">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          Preparing your career workspace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Header Navbar */}
      <Navbar
        onOpenMobileCompanion={() => setMobileCompanionOpen(true)}
        onOpenQRScanner={() => setQrScannerOpen(true)}
      />

      <div className="flex flex-1">
        {/* Desktop Sidebar (Render on portal / dashboard pages) */}
        {!isPublicPage && (
          <Sidebar onOpenMobileCompanion={() => setMobileCompanionOpen(true)} />
        )}

        {/* Main Content Viewport */}
        <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full mb-16 md:mb-0 ${isPublicPage ? 'max-w-6xl' : ''}`}>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage onOpenMobileCompanion={() => setMobileCompanionOpen(true)} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Core Features */}
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/explore" element={<CareerExplorer />} />
            <Route path="/simulator" element={<CareerSimulatorPage />} />
            <Route path="/skills" element={<SkillGapStudio />} />
            <Route path="/roadmap" element={<AdaptiveRoadmapPage />} />
            <Route path="/assessments" element={<AssessmentArena />} />
            <Route path="/resources" element={<ResourceHubPage />} />
            <Route path="/ai-mentor" element={<AIMentorPage />} />
            <Route path="/mentor" element={<MentorPortalPage />} />
            <Route path="/admin" element={<AdminHubPage />} />
            <Route path="/profile" element={<StudentProfilePage />} />
            <Route path="/guidance" element={<RealTimeGuidancePage />} />
            <Route path="/placements" element={<LivePlacementDrivesPage />} />
            <Route path="/placement-cell" element={<PlacementCellPortalPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on small mobile screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-[#0c1220]/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg flex items-center justify-around px-2 transition-colors">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to={user ? (user.role === 'admin' ? '/admin' : user.role === 'mentor' ? '/mentor' : user.role === 'placement_cell' ? '/placement-cell' : '/dashboard') : '/login'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Compass className="h-5 w-5" />
          <span>Portal</span>
        </NavLink>

        <button
          onClick={() => setMobileCompanionOpen(true)}
          className="flex flex-col items-center justify-center h-11 w-11 -mt-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 border-2 border-white dark:border-[#090d16]"
        >
          <QrCode className="h-5 w-5" />
        </button>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Briefcase className="h-5 w-5" />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/ai-mentor"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Sparkles className="h-5 w-5" />
          <span>AI Mentor</span>
        </NavLink>
      </div>

      {/* Modals */}
      <MobileCompanionModal
        isOpen={mobileCompanionOpen}
        onClose={() => setMobileCompanionOpen(false)}
      />

      <QRScannerModal
        isOpen={qrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
};

export default App;
