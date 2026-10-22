# 🚀 CareerBridge — Personalized Multi-Disciplinary Career Navigation & Institutional Alignment Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/E2E%20Tests-28%2F28%20PASS-brightgreen.svg)](https://playwright.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

> **CareerBridge** is an AI-powered, multi-disciplinary career navigation and institutional alignment ecosystem designed to bridge the gap between higher education curriculums and rapidly evolving industry demands.
>
> Built for **Students**, **Faculty Mentors**, and **Institutional Deans / Academic Administrators**, CareerBridge personalizes skill acquisition roadmaps, simulates cross-discipline career pivots, administers verified diagnostic assessments, and surfaces campus-wide curriculum deficiencies.

---

## 🌟 Key Highlights & Core Capabilities

### 1. 🎓 5-Step Adaptive Student Onboarding & Discovery Wizard
- **Broad Discipline Selection**: Supports **8 core academic faculties** (Engineering, Agriculture, Medical/Paramedical, Commerce & FinTech, Design & Media, Pure Sciences, Law & Tech Governance, Hospitality & Tourism).
- **Dynamic Branch & Stream Resolution**: Select from over 28 specialized academic branches with pre-mapped degree pathways, default aspirational roles, and recommended foundation skills.
- **Academic Standing Calibration**: Collects current year of study, CGPA, and prior technical experience.
- **Goal Alignment & Skill Tagging**: Students select their dream career role and tag existing skill proficiencies (Beginner → Advanced).
- **Learning Style & Time Commitment**: Personalizes study loops (Hands-on, Visual, Interactive) and adjusts pacing based on committed weekly hours (5h → 25h+).

### 2. ⚡ Intelligent Student Dashboard
- **Personalized Stream & Identity Badge**: Immediately displays student name, enrolled stream, degree status, and aspirational benchmark.
- **Live Readiness Gauge**: Multi-factor algorithm synthesizes verified skill levels, completed projects, and academic performance into an overall Career Readiness percentage.
- **Next Best Action Recommendations**: AI computes the single highest-impact next step (e.g., remedial assessment, hands-on drill, portfolio project) to advance career progression.

### 3. 🧭 Multi-Disciplinary Career Explorer (21 Industry Pathways)
- Explore 21 high-growth industry roles with real-time search and discipline filtering.
- Transparent compensation benchmarks (USD & INR LPA), market growth velocity, core technical competencies, and daily role responsibilities.

### 4. 🔄 Career Pivot & Synergy Simulator
- Simulate transitioning from an existing academic discipline into any target industry role.
- Computes **Skill Overlap Percentage**, identifies **Transferable Skills**, isolates **Critical Deficiencies**, and generates a **Step-by-Step Transition Roadmap** with estimated months to transition.

### 5. 📊 Skill Gap Studio & Radar Telemetry
- Multi-dimensional radar chart visualizing student competencies against target role benchmarks.
- Granular breakdown of core skills with status tags (*Mastered*, *Strong*, *Developing*, *Weak*, *Missing*) and prerequisite dependency tracking.

### 6. 🗺️ Adaptive 4-Phase Learning Roadmap
- Personalized four-phase continuous improvement loop: **Learn → Practice → Build → Evaluate**.
- **Interactive In-Browser Practice Sandboxes**: Execute practice queries and code drills directly inside the web interface.
- Targeted remedial tags dynamically adjust milestone sequencing based on quiz performance.

### 7. 🏆 Assessment Arena & Diagnostic Engine
- 8 domain-specific diagnostic assessments with scenario-based multiple-choice evaluations.
- Real-time score calculation, performance threshold benchmarks, answer rationales, and automatic profile/roadmap recalibration upon submission.

### 8. 🤖 Context-Aware AI Career Mentor
- Contextual advisor that addresses students by name, academic discipline, GPA standing, and target career.
- Analyzes the student's highest-priority skill gap to provide tailored guidance, interview strategies, and portfolio project suggestions.

### 9. 👨‍🏫 Faculty / Mentor Advising Hub (`/mentor`)
- Track cohort performance, identify students experiencing career uncertainty, and review assessment failure alerts.
- Issue direct student interventions, assign targeted remediation drills, and review student milestone velocity.

### 10. 🏛️ Institution / Academic Admin Intelligence Hub (`/admin`)
- Aggregated department-wide gap analytics comparing institutional syllabus coverage against real-world employer requirements.
- Track affected student counts per skill deficiency and monitor recommended curriculum interventions.

### 11. 📱 Mobile Companion, QR Live Sync & Android APK
- **QR Code Pairing**: Instant scan to pair desktop session with smartphone companion app.
- **PWA Ready**: Offline caching, service workers, and mobile-optimized touch navigation.
- **Capacitor Android Support**: Direct compilation path to native Android APK.

### 12. 🌓 Dual-Theme Engine
- **Default Light Theme**: Clean, executive, modern enterprise aesthetics.
- **Dark Mode Support**: Seamless toggle for high-contrast low-light environments.

---

## 🌐 Supported Disciplines & Career Pathways Catalog

| # | Career Role | Academic Discipline | Market Growth | Salary Benchmark | Key Competencies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Data Analyst & BI Specialist** | Engineering & CS | `+28% High` | $85,000 / ₹10-18 LPA | SQL, Applied Statistics, Data Viz (PowerBI), Python |
| 2 | **AI & Machine Learning Engineer** | Engineering & CS | `+36% Very High` | $125,000 / ₹16-32 LPA | Python, ML Algorithms, Scikit-Learn, Stats, Cloud |
| 3 | **Cloud DevOps & SRE Engineer** | Engineering & CS | `+30% High` | $118,000 / ₹14-26 LPA | Cloud Architecture, Docker, Kubernetes, CyberSec |
| 4 | **Cybersecurity Architect & SOC Analyst** | Engineering & CS | `+33% Critical` | $120,000 / ₹15-30 LPA | Network Security, SIEM, Cryptography, Cloud, Python |
| 5 | **Biomedical Devices & Robotics Engineer** | Engineering / Med | `+26% High` | $98,000 / ₹12-24 LPA | Biomedical Sensors, Embedded IoT, Robotics Control |
| 6 | **Precision AgTech & IoT Specialist** | Agriculture | `+24% Rapid` | $82,000 / ₹8-16 LPA | Soil Sensors, LoRaWAN, Crop GIS, Smart Irrigation |
| 7 | **Sustainable Agronomy & Climate Specialist** | Agriculture | `+22% Steady` | $78,000 / ₹8-15 LPA | Hydroponics, Smart Irrigation, Soil Carbon |
| 8 | **Food Processing & Quality Assurance** | Agriculture / Bio | `+20% Steady` | $75,000 / ₹7-14 LPA | Food Safety HACCP, Quality Control, Stats |
| 9 | **Clinical Health Informatics Specialist** | Paramedical / Health | `+31% High Demand` | $92,000 / ₹11-22 LPA | EHR Systems, HL7/FHIR, SQL, Biostatistics |
| 10 | **Biomedical Diagnostic Lab Specialist** | Paramedical / Health | `+25% High` | $72,000 / ₹7-15 LPA | Diagnostic Auto-analyzers, Biostatistics, EHR |
| 11 | **Telemedicine & Remote Care Coordinator** | Paramedical / Health | `+34% Explosive` | $75,000 / ₹8-16 LPA | Telehealth Protocols, RPM Wearables, EHR |
| 12 | **Physiotherapy & Rehabilitation Specialist** | Paramedical / Health | `+24% Strong` | $80,000 / ₹8-18 LPA | Biomechanics, Movement Kinematics, Biostats |
| 13 | **FinTech Quantitative Analyst** | Commerce & Finance | `+25% High` | $115,000 / ₹14-28 LPA | Financial Valuation DCF, Algo Trading, Python, Stats |
| 14 | **Global Supply Chain & ERP Analyst** | Commerce & Finance | `+23% High` | $84,000 / ₹9-18 LPA | Supply Chain SAP, SQL, Data Viz, Operations |
| 15 | **Digital Growth & Marketing Strategist** | Commerce & Finance | `+26% Rapid` | $88,000 / ₹10-20 LPA | Growth Analytics, A/B Testing, LTV/CAC, Data Viz |
| 16 | **Product & UI/UX Systems Designer** | Design & Media | `+22% High` | $95,000 / ₹11-22 LPA | Figma Design Systems, UX Research, Tokens |
| 17 | **Game Systems & Interactive VFX Dev** | Design & Media | `+27% Surging` | $96,000 / ₹12-25 LPA | Unity/Unreal Engines, 3D Spatial VFX, C# |
| 18 | **Computational Biologist & Genomics Scientist** | Pure & Applied Sciences | `+29% High Growth` | $105,000 / ₹14-26 LPA | Computational Genomics, Biopython, Stats, NGS |
| 19 | **Applied Quantitative Economist** | Pure & Applied Sciences | `+21% Steady` | $94,000 / ₹11-22 LPA | Econometrics, Panel Regressions, Python, Stats |
| 20 | **Cyber Law & AI Governance Analyst** | Law & Governance | `+32% Surging` | $110,000 / ₹14-28 LPA | Cyber Law, GDPR/DPDP, AI Ethics & Auditing |
| 21 | **Smart Hospitality & Revenue Strategist** | Hospitality & Tourism | `+23% Strong` | $82,000 / ₹9-18 LPA | Hotel PMS (Opera), RevPAR Dynamic Yield, Analytics |

---

## 🏗️ Architecture & Technology Stack

```
Client (React 19 + TypeScript + Vite 6 + Tailwind CSS)
   │
   ▼  RESTful JSON API Requests
Express Backend (Node.js + TypeScript + TSX)
   │
   ├── /api/auth          -> Login & 5-Step Multi-Discipline Registration
   ├── /api/careers       -> 21 Pathways, Benchmarks & Pivot Simulator
   ├── /api/profiles      -> Dynamic Multi-Factor Readiness Recalculation
   ├── /api/assessments   -> 8 Scenario Diagnostic Engines
   ├── /api/roadmap       -> 4-Phase Personalized Milestone Sequencing
   ├── /api/mentor        -> Faculty Intervention Hub & Cohort Analytics
   ├── /api/admin         -> Institutional Curriculum Gap Intelligence
   ├── /api/ai-mentor     -> Context-Aware Career Advisor Chat
   └── /api/mobile        -> QR Sync, Pairing & Device Info
   │
   ▼
Persistent JSON Database (server/data/db.json)
```

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS, Lucide React, Canvas Confetti, QRCode.react.
- **Backend**: Node.js, Express, TypeScript, TSX Watch, CORS, REST API architecture.
- **Database**: Persistent JSON filesystem store (`server/data/db.json`) with auto-seeding sync engine.
- **Testing**: Playwright automated browser test suite (28 automated E2E steps).

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/selvabarathi-s/CMS-Hackathon.git
cd CMS-Hackathon
```

### 2. Install Dependencies
```bash
# Install root, client, and server dependencies
npm run install:all
```

### 3. Launch Development Servers
```bash
# Starts both Backend (port 4000) and Frontend (port 5173) concurrently
npm run dev
```

- **Client Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:4000](http://localhost:4000)

### 4. Run Automated Browser E2E Tests
```bash
cd server
npx tsx src/e2e-browser-test.ts
```

---

## ☁️ Deploying on Render

CareerBridge is fully configured for zero-friction cloud deployment on [Render.com](https://render.com) using the included `render.yaml` specification.

### Option 1: 1-Click Render Blueprint (Recommended)
1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) $\rightarrow$ Click **"New +"** $\rightarrow$ **"Blueprint"**.
3. Select your `CMS-Hackathon` repository and click **Apply**.

### Option 2: Manual Web Service
- **Environment**: `Node`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `PORT`: `10000`
- **Health Check Path**: `/api/health`

📖 *For comprehensive deployment steps, architecture breakdown, and troubleshooting, refer to [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md).*

---

## 🔑 Demo Login Credentials & Personas

| Portal | Role | Name | Login Email / ID | Password | Stream & Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Student Portal** | Student | Selva | `selva@college.edu` | `password123` | B.Tech AI & Data Science → AI Engineer |
| **Student Portal** | Student | Kalai | `kalai@college.edu` | `password123` | B.Tech Computer Science → Data Analyst |
| **Student Portal** | Student | Sabari | `sabari@college.edu` | `password123` | B.Tech CSE / IT → Cloud DevOps Engineer |
| **Student Portal** | Student | Ram | `ram@college.edu` | `password123` | B.Tech Cyber Security → Security Architect |
| **Faculty / Mentor** | Mentor | Dr. Balu Prasath | `balu.prasath@university.edu` | `password123` | Department Advisor → Cohort Interventions |
| **Institution Admin** | Admin | Ms. Anjali Govindh | `admin@careerbridge.io` | `password123` | Dean of Academics → Curriculum Intelligence |

*Note: The platform includes a complete cohort of 12 engineering students (Male: Selva, Sabari, Ram, Gokul, Sanjay, Kishore, Karthick; Female: Kalai, Deepa, Seetha, Sathya, Saranya) across diverse branches (AI&DS, CSE, Cyber Security, EEE, Mechanical & Robotics, ECE, CSBS, AI&ML, Biomedical, IT, Smart Infrastructure & Civil). All student passwords are `password123`.*

---

## 📁 Project Directory Structure

```
├── client/                     # React 19 Frontend Application
│   ├── src/
│   │   ├── api/                # Typed REST API client
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Sidebar, Portal navigation
│   │   │   └── mobile/         # Mobile Companion Modal, QR Scanner
│   │   ├── context/            # AuthContext, ThemeProvider (Light/Dark)
│   │   ├── pages/              # 12 Core Functional Pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── CareerExplorer.tsx
│   │   │   ├── CareerSimulatorPage.tsx
│   │   │   ├── SkillGapStudio.tsx
│   │   │   ├── AdaptiveRoadmapPage.tsx
│   │   │   ├── AssessmentArena.tsx
│   │   │   ├── ResourceHubPage.tsx
│   │   │   ├── AIMentorPage.tsx
│   │   │   ├── MentorPortalPage.tsx
│   │   │   ├── AdminHubPage.tsx
│   │   │   └── StudentProfilePage.tsx
│   │   ├── App.tsx             # Route declarations
│   │   └── main.tsx            # Entry point & PWA registration
│   └── package.json
│
├── server/                     # Node.js + Express Backend API
│   ├── src/
│   │   ├── db/                 # Database service & seed catalogs (21 careers, 35+ skills)
│   │   ├── routes/             # Auth, Careers, Profiles, Assessments, AI Mentor, Admin
│   │   ├── services/           # SkillGapService, AIMentorService, SimulatorService
│   │   ├── e2e-browser-test.ts # 28-Step Playwright automated browser test suite
│   │   └── index.ts            # Express server initialization
│   ├── data/                   # Persistent db.json data storage
│   └── package.json
│
├── shared/                     # Shared TypeScript schemas & contracts
│   └── types.ts                # Disciplines, Careers, Profiles, Milestones, Interventions
│
├── package.json                # Root orchestration workspace
└── README.md                   # Project documentation
```

---
