import { Career, Skill, Assessment, Resource, StudentProfile, MentorIntervention, CurriculumGapInsight, UserAccount, NotificationItem, DoubtQuery, DoubtReply, PlacementCompanyDrive, PlacementApplication, CourseRecommendation } from '../types/shared.js';

export const SEED_SKILLS: Skill[] = [
  // --- Data & Software Skills (Engineering) ---
  {
    id: 'skill-python',
    name: 'Python Programming',
    category: 'Programming',
    discipline: 'engineering',
    difficulty: 'beginner',
    prerequisites: [],
    description: 'Core syntax, control flow, functions, OOP, and data handling libraries (Pandas, NumPy).',
    tags: ['python', 'coding', 'automation', 'backend']
  },
  {
    id: 'skill-sql',
    name: 'SQL & Relational Databases',
    category: 'Data Management',
    discipline: 'engineering',
    difficulty: 'beginner',
    prerequisites: [],
    description: 'Querying, joins, aggregations, window functions, indexing, schema design, and stored procedures.',
    tags: ['sql', 'database', 'queries', 'postgres']
  },
  {
    id: 'skill-stats',
    name: 'Applied Statistics & Probability',
    category: 'Mathematics',
    discipline: 'engineering',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Descriptive statistics, hypothesis testing, probability distributions, regression, and p-values.',
    tags: ['math', 'statistics', 'analytics', 'probability']
  },
  {
    id: 'skill-data-viz',
    name: 'Data Visualization & BI',
    category: 'Visualization',
    discipline: 'engineering',
    difficulty: 'intermediate',
    prerequisites: ['skill-sql'],
    description: 'Designing executive dashboards, charting best practices, PowerBI/Tableau and Python visualization.',
    tags: ['powerbi', 'tableau', 'matplotlib', 'charts']
  },
  {
    id: 'skill-ml',
    name: 'Machine Learning Algorithms',
    category: 'AI & Data Science',
    discipline: 'engineering',
    difficulty: 'advanced',
    prerequisites: ['skill-python', 'skill-stats'],
    description: 'Supervised/unsupervised models, scikit-learn, cross-validation, feature engineering, and metrics.',
    tags: ['ml', 'scikit-learn', 'deep learning', 'predictive']
  },
  {
    id: 'skill-cloud',
    name: 'Cloud Architecture & DevOps',
    category: 'Infrastructure',
    discipline: 'engineering',
    difficulty: 'intermediate',
    prerequisites: ['skill-python'],
    description: 'Docker containers, Kubernetes, CI/CD pipelines, AWS/GCP services, microservices.',
    tags: ['cloud', 'aws', 'docker', 'devops', 'kubernetes']
  },
  {
    id: 'skill-cybersec',
    name: 'Network & Cloud Security',
    category: 'Security',
    discipline: 'engineering',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Network protocols, vulnerability assessment, cryptography, zero-trust architectures, SIEM.',
    tags: ['security', 'network', 'firewall', 'crypto', 'soc']
  },
  {
    id: 'skill-embedded-iot',
    name: 'Embedded Systems & Microcontrollers',
    category: 'Hardware Engineering',
    discipline: 'engineering',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'ARM Cortex, Arduino/ESP32, RTOS, GPIO interfaces, serial communication (I2C, SPI, UART).',
    tags: ['embedded', 'iot', 'c++', 'esp32', 'hardware']
  },
  {
    id: 'skill-biomed-devices',
    name: 'Biomedical Instrumentation & Sensors',
    category: 'Bioengineering',
    discipline: 'engineering',
    difficulty: 'advanced',
    prerequisites: ['skill-embedded-iot'],
    description: 'Biosensors, ECG/EEG telemetry circuits, medical device FDA standards, signal filtering.',
    tags: ['biomedical', 'sensors', 'instrumentation', 'hardware']
  },
  {
    id: 'skill-robotics-control',
    name: 'Robotics Kinematics & Control Systems',
    category: 'Robotics',
    discipline: 'engineering',
    difficulty: 'advanced',
    prerequisites: ['skill-python', 'skill-stats'],
    description: 'PID control, ROS2 (Robot Operating System), inverse kinematics, trajectory planning.',
    tags: ['robotics', 'ros2', 'control-systems', 'automation']
  },

  // --- Agriculture & AgTech Skills ---
  {
    id: 'skill-soil-sensors',
    name: 'Soil Sensor & Telemetry Integration',
    category: 'AgTech',
    discipline: 'agriculture',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Deploying moisture, NPK sensors, LoRaWAN IoT telemetry, and data logging.',
    tags: ['iot', 'sensors', 'agtech', 'hardware', 'lora']
  },
  {
    id: 'skill-crop-analytics',
    name: 'GIS & Crop Yield Predictive Modeling',
    category: 'AgTech Analytics',
    discipline: 'agriculture',
    difficulty: 'advanced',
    prerequisites: ['skill-stats'],
    description: 'Satellite imagery NDVI analysis, QGIS mapping, and climate-yield forecasting models.',
    tags: ['gis', 'ndvi', 'satellite', 'yield-prediction']
  },
  {
    id: 'skill-smart-irrigation',
    name: 'Automated Irrigation & Climate Control',
    category: 'AgTech Engineering',
    discipline: 'agriculture',
    difficulty: 'intermediate',
    prerequisites: ['skill-soil-sensors'],
    description: 'Micro-controller irrigation valves, evapotranspiration algorithms, greenhouse climate loops.',
    tags: ['irrigation', 'automation', 'agtech', 'greenhouse']
  },
  {
    id: 'skill-hydroponics',
    name: 'Hydroponics & Controlled Environment Agriculture',
    category: 'Precision Farming',
    discipline: 'agriculture',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Nutrient film technique (NFT), aeroponics, EC/pH monitoring, vertical farming LED spectrums.',
    tags: ['hydroponics', 'vertical-farming', 'urban-agri', 'nutrients']
  },
  {
    id: 'skill-food-qa',
    name: 'Food Safety & Quality Assurance (HACCP)',
    category: 'Food Technology',
    discipline: 'agriculture',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'HACCP protocols, microbial safety assays, ISO 22000 compliance, nutritional spectrometry.',
    tags: ['food-safety', 'haccp', 'quality-control', 'iso']
  },

  // --- Paramedical & Health Sciences Skills ---
  {
    id: 'skill-ehr-systems',
    name: 'EHR & Health Protocols (HL7/FHIR)',
    category: 'Health Informatics',
    discipline: 'paramedical',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'HL7 v2/v3, FHIR JSON APIs, HIPAA patient privacy standards, medical terminology (SNOMED-CT/ICD-10).',
    tags: ['fhir', 'hl7', 'ehr', 'healthtech', 'hipaa']
  },
  {
    id: 'skill-clinical-stats',
    name: 'Biostatistics & Clinical Trial Analytics',
    category: 'Clinical Research',
    discipline: 'paramedical',
    difficulty: 'intermediate',
    prerequisites: ['skill-stats'],
    description: 'Survival analysis, Kaplan-Meier curves, odds ratios, randomized controlled trial statistical plans.',
    tags: ['biostatistics', 'clinical-trials', 'epidemiology', 'research']
  },
  {
    id: 'skill-biomed-diagnostics',
    name: 'Biomedical Diagnostic Systems & Quality',
    category: 'Laboratory Science',
    discipline: 'paramedical',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Clinical biochemistry auto-analyzers, ELISA, hematology diagnostics, internal quality control (IQC).',
    tags: ['laboratory', 'diagnostics', 'pathology', 'biochemistry']
  },
  {
    id: 'skill-telemed-protocols',
    name: 'Telemedicine & Remote Patient Monitoring (RPM)',
    category: 'Digital Health',
    discipline: 'paramedical',
    difficulty: 'beginner',
    prerequisites: ['skill-ehr-systems'],
    description: 'Remote vital monitoring protocols, virtual consultation triage, telehealth compliance.',
    tags: ['telehealth', 'telemedicine', 'rpm', 'patient-care']
  },
  {
    id: 'skill-physio-biomech',
    name: 'Biomechanics & Movement Analysis',
    category: 'Physiotherapy',
    discipline: 'paramedical',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Gait kinematics, electromyography (EMG) analysis, musculoskeletal rehabilitation protocols.',
    tags: ['biomechanics', 'physiotherapy', 'rehab', 'kinematics']
  },

  // --- Commerce, Finance & Management Skills ---
  {
    id: 'skill-fin-modeling',
    name: 'Financial Modeling & Valuation',
    category: 'Corporate Finance',
    discipline: 'commerce',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'DCF valuation, 3-statement modeling, sensitivity tables, LBO analysis, scenario forecasting.',
    tags: ['excel', 'valuation', 'dcf', 'investment', 'm&a']
  },
  {
    id: 'skill-algo-trading',
    name: 'Quantitative Risk & Algorithmic Trading',
    category: 'FinTech',
    discipline: 'commerce',
    difficulty: 'advanced',
    prerequisites: ['skill-python', 'skill-stats'],
    description: 'VaR calculation, portfolio optimization, backtesting alpha strategies, FIX protocol execution.',
    tags: ['fintech', 'quant', 'trading', 'risk-management', 'python']
  },
  {
    id: 'skill-fin-compliance',
    name: 'Anti-Money Laundering & RegTech Compliance',
    category: 'Regulatory Tech',
    discipline: 'commerce',
    difficulty: 'intermediate',
    prerequisites: ['skill-sql'],
    description: 'KYC workflows, transaction anomaly detection, Basel III compliance, sanctions screening.',
    tags: ['aml', 'regtech', 'compliance', 'fraud', 'risk']
  },
  {
    id: 'skill-supply-chain-erp',
    name: 'Supply Chain Analytics & SAP/ERP',
    category: 'Operations',
    discipline: 'commerce',
    difficulty: 'intermediate',
    prerequisites: ['skill-sql'],
    description: 'Inventory optimization, demand forecasting, logistics routing, SAP S/4HANA workflows.',
    tags: ['supply-chain', 'erp', 'sap', 'logistics', 'operations']
  },
  {
    id: 'skill-growth-analytics',
    name: 'Digital Growth & Customer Analytics',
    category: 'Marketing Analytics',
    discipline: 'commerce',
    difficulty: 'intermediate',
    prerequisites: ['skill-data-viz'],
    description: 'Funnel attribution, churn prediction, CAC/LTV modeling, Google Analytics 4, A/B testing.',
    tags: ['growth', 'marketing-analytics', 'a/b-testing', 'churn']
  },

  // --- Design, Media & Creative Arts Skills ---
  {
    id: 'skill-ux-research',
    name: 'User Research & Journey Mapping',
    category: 'Design Strategy',
    discipline: 'design_media',
    difficulty: 'beginner',
    prerequisites: [],
    description: 'Qualitative user interviews, usability testing, persona definition, empathy mapping.',
    tags: ['ux', 'research', 'personas', 'figma', 'wireframing']
  },
  {
    id: 'skill-design-systems',
    name: 'Figma & Design Systems Engineering',
    category: 'UI/UX Design',
    discipline: 'design_media',
    difficulty: 'intermediate',
    prerequisites: ['skill-ux-research'],
    description: 'Component architecture, responsive tokens, auto-layout, atomic design systems, WCAG accessibility.',
    tags: ['figma', 'design-systems', 'ui', 'prototyping', 'accessibility']
  },
  {
    id: 'skill-3d-modeling',
    name: '3D Spatial Modeling & Shader VFX',
    category: 'Interactive Media',
    discipline: 'design_media',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'Blender 3D modeling, UV unwrapping, PBR material creation, real-time shader pipelines.',
    tags: ['blender', '3d', 'vfx', 'shaders', 'cgi']
  },
  {
    id: 'skill-game-engines',
    name: 'Unity & Unreal Interactive Systems',
    category: 'Game Development',
    discipline: 'design_media',
    difficulty: 'advanced',
    prerequisites: ['skill-python'],
    description: 'C# scripting in Unity, Unreal Blueprints, physics engines, spatial audio, VR/AR interactions.',
    tags: ['unity', 'unreal', 'game-dev', 'c#', 'ar-vr']
  },

  // --- Pure & Applied Sciences Skills (Arts & Science) ---
  {
    id: 'skill-comp-bio',
    name: 'Computational Genomics & Bioinformatics',
    category: 'Life Sciences',
    discipline: 'arts_science',
    difficulty: 'advanced',
    prerequisites: ['skill-python', 'skill-stats'],
    description: 'Next-Generation Sequencing (NGS) analysis, BLAST alignment, Biopython, variant calling.',
    tags: ['bioinformatics', 'genomics', 'ngs', 'biopython']
  },
  {
    id: 'skill-econometrics',
    name: 'Econometric Modeling & Quantitative Policy',
    category: 'Economics',
    discipline: 'arts_science',
    difficulty: 'advanced',
    prerequisites: ['skill-stats', 'skill-python'],
    description: 'Time series forecasting (ARIMA/GARCH), instrumental variables, panel data regression.',
    tags: ['econometrics', 'economics', 'policy', 'stata', 'r']
  },

  // --- Law, Governance & Policy Skills ---
  {
    id: 'skill-cyber-law',
    name: 'Cyber Law, GDPR & Data Privacy Governance',
    category: 'Tech Law',
    discipline: 'law_governance',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'GDPR, CCPA, Digital Personal Data Protection (DPDP), data transfer agreements, breach response.',
    tags: ['privacy', 'gdpr', 'law', 'compliance', 'cyber-law']
  },
  {
    id: 'skill-ai-ethics',
    name: 'AI Ethics, Governance & Model Auditing',
    category: 'AI Policy',
    discipline: 'law_governance',
    difficulty: 'intermediate',
    prerequisites: [],
    description: 'EU AI Act compliance, algorithmic bias mitigation, model explainability, AI risk frameworks.',
    tags: ['ai-ethics', 'governance', 'eu-ai-act', 'bias-auditing']
  },

  // --- Hospitality & Tourism Management Skills ---
  {
    id: 'skill-hospitality-pms',
    name: 'Hospitality PMS & Revenue Yield Management',
    category: 'Hospitality Management',
    discipline: 'hospitality',
    difficulty: 'intermediate',
    prerequisites: ['skill-data-viz'],
    description: 'Property Management Systems (Opera), dynamic pricing algorithms, RevPAR optimization, channel managers.',
    tags: ['pms', 'revenue-management', 'hospitality', 'hotels', 'revpar']
  },
  {
    id: 'skill-event-logistics',
    name: 'Event Operations & Luxury Guest Experience',
    category: 'Event Management',
    discipline: 'hospitality',
    difficulty: 'beginner',
    prerequisites: [],
    description: 'VIP guest workflows, event vendor contract negotiation, crowd management protocols, luxury CX.',
    tags: ['events', 'luxury-management', 'logistics', 'cx']
  }
];

export const SEED_CAREERS: Career[] = [
  {
    "id": "career-ai-engineer",
    "title": "AI & Machine Learning Engineer",
    "discipline": "engineering",
    "department": "Artificial Intelligence & Machine Learning",
    "roleCategory": "Technology/Electronics",
    "category": "Artificial Intelligence & Emerging Tech",
    "description": "Design, train, fine-tune, and deploy deep neural networks, generative AI models, computer vision systems, and autonomous intelligence pipelines into production.",
    "growthRate": "+38% (High Demand)",
    "medianSalary": "$145,000 / \u20b916-32 LPA",
    "scope": "Spans LLM fine-tuning, computer vision, NLP, edge AI inference, and autonomous systems.",
    "subCareers": [
      "Data Scientist",
      "Data Analyst",
      "ML Engineer",
      "Data Engineer",
      "AI/ML Engineer",
      "NLP Engineer",
      "Computer Vision Engineer",
      "Generative AI Engineer"
    ],
    "roles": [
      {
        "id": "role-data-scientist",
        "title": "Data Scientist",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Scientist.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-data-analyst",
        "title": "Data Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Analyst.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-ml-engineer",
        "title": "ML Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in ML Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-data-engineer",
        "title": "Data Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-ai-ml-engineer",
        "title": "AI/ML Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in AI/ML Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-nlp-engineer",
        "title": "NLP Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in NLP Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-computer-vision-engineer",
        "title": "Computer Vision Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Computer Vision Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      },
      {
        "id": "role-generative-ai-engineer",
        "title": "Generative AI Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Generative AI Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$145,000 / \u20b916-32 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-python",
      "skill-sql",
      "skill-statistics",
      "skill-pandas",
      "skill-scikit-learn"
    ],
    "prerequisites": [
      "Python",
      "Statistics",
      "Linear Algebra",
      "ML"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-python",
          "skillName": "Python",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-sql",
          "skillName": "SQL",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-statistics",
          "skillName": "statistics",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-pandas",
          "skillName": "pandas",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-scikit-learn",
          "skillName": "scikit-learn",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Python",
        "Statistics",
        "Linear Algebra",
        "ML"
      ],
      "recommendedProjects": [
        "End-to-End AI & Machine Learning Engineer Capstone System",
        "Production Optimization using Python"
      ],
      "emergingSkills": [
        "GenAI",
        "LLMs",
        "MLOps",
        "data governance"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Python",
      "Statistics",
      "Linear Algebra",
      "ML",
      "DBMS",
      "Data Visualization",
      "Deep Learning",
      "NLP",
      "Computer Vision"
    ],
    "placementSkills": [
      "Python",
      "SQL",
      "statistics",
      "pandas",
      "scikit-learn",
      "visualization",
      "ML",
      "model evaluation",
      "PyTorch/TensorFlow",
      "deployment"
    ],
    "futureSkills": [
      "GenAI",
      "LLMs",
      "MLOps",
      "data governance",
      "AI agents",
      "RAG",
      "multimodal AI"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "Kaggle Learn",
        "url": "https://www.kaggle.com/learn"
      },
      {
        "title": "Google Data Analytics",
        "url": "https://www.coursera.org/professional-certificates/google-data-analytics"
      },
      {
        "title": "SQLBolt",
        "url": "https://sqlbolt.com/"
      },
      {
        "title": "Microsoft Learn",
        "url": "https://learn.microsoft.com/training/"
      },
      {
        "title": "Coursera",
        "url": "https://www.coursera.org/"
      },
      {
        "title": "Google Career Certificates",
        "url": "https://grow.google/certificates/"
      },
      {
        "title": "DeepLearning.AI",
        "url": "https://www.deeplearning.ai/"
      },
      {
        "title": "Hugging Face Learn",
        "url": "https://huggingface.co/learn"
      }
    ]
  },
  {
    "id": "career-data-analyst",
    "title": "Data Analyst & BI Specialist",
    "discipline": "engineering",
    "department": "Computer Science & Data Analytics",
    "roleCategory": "Technology/Electronics",
    "category": "Data Science & Enterprise Intelligence",
    "description": "Transform massive structured and unstructured datasets into strategic business intelligence, predictive dashboards, automated ETL workflows, and quantitative insights.",
    "growthRate": "+32% (Very High Demand)",
    "medianSalary": "$95,000 / \u20b910-22 LPA",
    "scope": "Cross-functional data modeling, SQL optimization, statistical inference, and enterprise dashboard engineering.",
    "subCareers": [
      "Data Scientist",
      "Data Analyst",
      "ML Engineer",
      "Data Engineer",
      "Software Engineer",
      "Backend Developer",
      "AI/ML Engineer",
      "Business Analyst",
      "Product Analyst"
    ],
    "roles": [
      {
        "id": "role-data-scientist",
        "title": "Data Scientist",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Scientist.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-data-analyst",
        "title": "Data Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Analyst.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-ml-engineer",
        "title": "ML Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in ML Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-data-engineer",
        "title": "Data Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-software-engineer",
        "title": "Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Software Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-backend-developer",
        "title": "Backend Developer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Backend Developer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-ai-ml-engineer",
        "title": "AI/ML Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in AI/ML Engineer.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-business-analyst",
        "title": "Business Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Business Analyst.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-product-analyst",
        "title": "Product Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Product Analyst.",
          "Apply core principles of Python, Statistics, Linear Algebra in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python, SQL, statistics and completion of 2-3 portfolio projects.",
        "entrySalary": "$95,000 / \u20b910-22 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-python",
      "skill-sql",
      "skill-statistics",
      "skill-pandas",
      "skill-scikit-learn"
    ],
    "prerequisites": [
      "Python",
      "Statistics",
      "Linear Algebra",
      "ML"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-python",
          "skillName": "Python",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-sql",
          "skillName": "SQL",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-statistics",
          "skillName": "statistics",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-pandas",
          "skillName": "pandas",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-scikit-learn",
          "skillName": "scikit-learn",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Python",
        "Statistics",
        "Linear Algebra",
        "ML"
      ],
      "recommendedProjects": [
        "End-to-End Data Analyst & BI Specialist Capstone System",
        "Production Optimization using Python"
      ],
      "emergingSkills": [
        "GenAI",
        "LLMs",
        "MLOps",
        "data governance"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Python",
      "Statistics",
      "Linear Algebra",
      "ML",
      "DBMS",
      "Data Visualization",
      "DSA",
      "OOP",
      "OS",
      "Computer Networks",
      "Software Engineering",
      "Programming",
      "Business Analytics"
    ],
    "placementSkills": [
      "Python",
      "SQL",
      "statistics",
      "pandas",
      "scikit-learn",
      "visualization",
      "DSA",
      "Java/Python/C++",
      "Git",
      "REST APIs",
      "aptitude",
      "Excel/BI",
      "communication",
      "case studies"
    ],
    "futureSkills": [
      "GenAI",
      "LLMs",
      "MLOps",
      "data governance",
      "AI agents",
      "cloud",
      "cybersecurity",
      "AI-assisted analytics",
      "product analytics"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "Kaggle Learn",
        "url": "https://www.kaggle.com/learn"
      },
      {
        "title": "Google Data Analytics",
        "url": "https://www.coursera.org/professional-certificates/google-data-analytics"
      },
      {
        "title": "SQLBolt",
        "url": "https://sqlbolt.com/"
      },
      {
        "title": "Microsoft Learn",
        "url": "https://learn.microsoft.com/training/"
      },
      {
        "title": "Coursera",
        "url": "https://www.coursera.org/"
      },
      {
        "title": "Google Career Certificates",
        "url": "https://grow.google/certificates/"
      },
      {
        "title": "freeCodeCamp",
        "url": "https://www.freecodecamp.org/"
      },
      {
        "title": "GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/"
      },
      {
        "title": "LeetCode",
        "url": "https://leetcode.com/"
      },
      {
        "title": "DeepLearning.AI",
        "url": "https://www.deeplearning.ai/"
      },
      {
        "title": "Hugging Face Learn",
        "url": "https://huggingface.co/learn"
      }
    ]
  },
  {
    "id": "career-cloud-devops",
    "title": "Cloud DevOps & Site Reliability Engineer",
    "discipline": "engineering",
    "department": "Computer Science & Cloud Infrastructure",
    "roleCategory": "Technology/Electronics",
    "category": "Cloud Infrastructure & SRE",
    "description": "Architect zero-downtime distributed infrastructure, automate multi-region Kubernetes deployments, establish DevSecOps pipelines, and ensure 99.999% system availability.",
    "growthRate": "+35% (High Demand)",
    "medianSalary": "$138,000 / \u20b914-28 LPA",
    "scope": "Kubernetes clusters, Infrastructure-as-Code (Terraform), CI/CD automation, and cloud monitoring.",
    "subCareers": [
      "Software Engineer",
      "Full Stack Developer",
      "Cloud Engineer",
      "QA Automation Engineer",
      "Backend Developer",
      "AI/ML Engineer",
      "Data Engineer",
      "Systems Engineer",
      "Embedded Software Engineer",
      "Network Engineer"
    ],
    "roles": [
      {
        "id": "role-software-engineer",
        "title": "Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Software Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-full-stack-developer",
        "title": "Full Stack Developer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Full Stack Developer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-cloud-engineer",
        "title": "Cloud Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Cloud Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-qa-automation-engineer",
        "title": "QA Automation Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in QA Automation Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-backend-developer",
        "title": "Backend Developer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Backend Developer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-ai-ml-engineer",
        "title": "AI/ML Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in AI/ML Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-data-engineer",
        "title": "Data Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-systems-engineer",
        "title": "Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Systems Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-embedded-software-engineer",
        "title": "Embedded Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Embedded Software Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      },
      {
        "id": "role-network-engineer",
        "title": "Network Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Network Engineer.",
          "Apply core principles of DBMS, Web Technologies, OS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Java/Python/JS and completion of 2-3 portfolio projects.",
        "entrySalary": "$138,000 / \u20b914-28 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-dsa",
      "skill-sql",
      "skill-java-python-js",
      "skill-testing",
      "skill-git"
    ],
    "prerequisites": [
      "DBMS",
      "Web Technologies",
      "OS",
      "Networks"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-dsa",
          "skillName": "DSA",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-sql",
          "skillName": "SQL",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-java-python-js",
          "skillName": "Java/Python/JS",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-testing",
          "skillName": "testing",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-git",
          "skillName": "Git",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "DBMS",
        "Web Technologies",
        "OS",
        "Networks"
      ],
      "recommendedProjects": [
        "End-to-End Cloud DevOps & Site Reliability Engineer Capstone System",
        "Production Optimization using DSA"
      ],
      "emergingSkills": [
        "Cloud",
        "DevSecOps",
        "AI-assisted development",
        "data engineering"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "DBMS",
      "Web Technologies",
      "OS",
      "Networks",
      "Software Engineering",
      "DSA",
      "OOP",
      "Computer Networks",
      "Microprocessors",
      "Embedded Systems"
    ],
    "placementSkills": [
      "DSA",
      "SQL",
      "Java/Python/JS",
      "testing",
      "Git",
      "aptitude",
      "Java/Python/C++",
      "REST APIs",
      "C/C++",
      "Linux",
      "networking",
      "debugging"
    ],
    "futureSkills": [
      "Cloud",
      "DevSecOps",
      "AI-assisted development",
      "data engineering",
      "GenAI",
      "LLMs",
      "MLOps",
      "cloud",
      "cybersecurity",
      "Edge AI",
      "embedded AI"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "freeCodeCamp",
        "url": "https://www.freecodecamp.org/"
      },
      {
        "title": "GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/"
      },
      {
        "title": "LeetCode",
        "url": "https://leetcode.com/"
      },
      {
        "title": "AWS Skill Builder",
        "url": "https://skillbuilder.aws/"
      },
      {
        "title": "Microsoft Learn",
        "url": "https://learn.microsoft.com/training/"
      },
      {
        "title": "Google Cloud Skills Boost",
        "url": "https://www.cloudskillsboost.google/"
      },
      {
        "title": "Siemens SCE",
        "url": "https://www.siemens.com/sce"
      },
      {
        "title": "Rockwell Automation Learning+",
        "url": "https://www.rockwellautomation.com/en-us/support/learning.html"
      },
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "Kaggle Learn",
        "url": "https://www.kaggle.com/learn"
      },
      {
        "title": "DeepLearning.AI",
        "url": "https://www.deeplearning.ai/"
      },
      {
        "title": "Hugging Face Learn",
        "url": "https://huggingface.co/learn"
      },
      {
        "title": "Google Data Analytics",
        "url": "https://www.coursera.org/professional-certificates/google-data-analytics"
      },
      {
        "title": "SQLBolt",
        "url": "https://sqlbolt.com/"
      },
      {
        "title": "Arduino Docs",
        "url": "https://docs.arduino.cc/"
      },
      {
        "title": "ARM Learning Paths",
        "url": "https://learn.arm.com/"
      },
      {
        "title": "FreeRTOS Docs",
        "url": "https://www.freertos.org/Documentation/"
      },
      {
        "title": "Keysight University",
        "url": "https://learn.keysight.com/"
      },
      {
        "title": "Cisco Networking Academy",
        "url": "https://www.netacad.com/"
      }
    ]
  },
  {
    "id": "career-cybersec-architect",
    "title": "Cybersecurity Architect & SOC Analyst",
    "discipline": "engineering",
    "department": "Cybersecurity & Network Systems",
    "roleCategory": "Technology/Electronics",
    "category": "Cyber Defense & Security Architecture",
    "description": "Defend enterprise digital assets through continuous threat hunting, zero-trust network segmentation, automated SIEM incident triage, and application penetration testing.",
    "growthRate": "+36% (Critical Demand)",
    "medianSalary": "$135,000 / \u20b914-30 LPA",
    "scope": "SOC telemetry, threat intelligence, cloud IAM fortification, and regulatory compliance.",
    "subCareers": [
      "Cybersecurity Analyst",
      "SOC Analyst",
      "Application Security Engineer",
      "Penetration Tester",
      "Software Engineer",
      "Full Stack Developer",
      "Cloud Engineer",
      "QA Automation Engineer"
    ],
    "roles": [
      {
        "id": "role-cybersecurity-analyst",
        "title": "Cybersecurity Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Cybersecurity Analyst.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-soc-analyst",
        "title": "SOC Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in SOC Analyst.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-application-security-engineer",
        "title": "Application Security Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Application Security Engineer.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-penetration-tester",
        "title": "Penetration Tester",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Penetration Tester.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-software-engineer",
        "title": "Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Software Engineer.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-full-stack-developer",
        "title": "Full Stack Developer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Full Stack Developer.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-cloud-engineer",
        "title": "Cloud Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Cloud Engineer.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      },
      {
        "id": "role-qa-automation-engineer",
        "title": "QA Automation Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in QA Automation Engineer.",
          "Apply core principles of Networks, OS, Cryptography in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Linux, networking, Python and completion of 2-3 portfolio projects.",
        "entrySalary": "$135,000 / \u20b914-30 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-linux",
      "skill-networking",
      "skill-python",
      "skill-owasp",
      "skill-siem"
    ],
    "prerequisites": [
      "Networks",
      "OS",
      "Cryptography",
      "Cybersecurity"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-linux",
          "skillName": "Linux",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-networking",
          "skillName": "networking",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-python",
          "skillName": "Python",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-owasp",
          "skillName": "OWASP",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-siem",
          "skillName": "SIEM",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Networks",
        "OS",
        "Cryptography",
        "Cybersecurity"
      ],
      "recommendedProjects": [
        "End-to-End Cybersecurity Architect & SOC Analyst Capstone System",
        "Production Optimization using Linux"
      ],
      "emergingSkills": [
        "Cloud security",
        "zero trust",
        "AI security",
        "threat intelligence"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Networks",
      "OS",
      "Cryptography",
      "Cybersecurity",
      "Web Security",
      "DBMS",
      "Web Technologies",
      "Software Engineering"
    ],
    "placementSkills": [
      "Linux",
      "networking",
      "Python",
      "OWASP",
      "SIEM",
      "incident response",
      "DSA",
      "SQL",
      "Java/Python/JS",
      "testing",
      "Git",
      "aptitude"
    ],
    "futureSkills": [
      "Cloud security",
      "zero trust",
      "AI security",
      "threat intelligence",
      "Cloud",
      "DevSecOps",
      "AI-assisted development",
      "data engineering"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "Cisco Networking Academy",
        "url": "https://www.netacad.com/"
      },
      {
        "title": "PortSwigger Web Security Academy",
        "url": "https://portswigger.net/web-security"
      },
      {
        "title": "TryHackMe",
        "url": "https://tryhackme.com/"
      },
      {
        "title": "freeCodeCamp",
        "url": "https://www.freecodecamp.org/"
      },
      {
        "title": "GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/"
      },
      {
        "title": "LeetCode",
        "url": "https://leetcode.com/"
      },
      {
        "title": "AWS Skill Builder",
        "url": "https://skillbuilder.aws/"
      },
      {
        "title": "Microsoft Learn",
        "url": "https://learn.microsoft.com/training/"
      },
      {
        "title": "Google Cloud Skills Boost",
        "url": "https://www.cloudskillsboost.google/"
      },
      {
        "title": "Siemens SCE",
        "url": "https://www.siemens.com/sce"
      },
      {
        "title": "Rockwell Automation Learning+",
        "url": "https://www.rockwellautomation.com/en-us/support/learning.html"
      },
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      }
    ]
  },
  {
    "id": "career-biomedical-engineer",
    "title": "Biomedical Devices & Robotics Engineer",
    "discipline": "engineering",
    "department": "Biomedical Engineering & Medical Devices",
    "roleCategory": "Life/Chemical/Process",
    "category": "Healthcare Technology & Medical Devices",
    "description": "Pioneer life-saving medical instrumentation, wearable biometric sensors, robotic surgical systems, and FDA/CE-compliant diagnostic software.",
    "growthRate": "+28% (Steady Growth)",
    "medianSalary": "$112,000 / \u20b910-24 LPA",
    "scope": "Biosignal processing, wearable telehealth firmware, ISO 13485 standards, and clinical instrumentation.",
    "subCareers": [
      "Biomedical Engineer",
      "Medical Device Engineer",
      "Clinical Engineering Associate",
      "Biomedical Signal Processing Engineer",
      "Bioprocess Engineer",
      "Bioinformatics Analyst",
      "Biomanufacturing Associate",
      "Quality/Validation Associate"
    ],
    "roles": [
      {
        "id": "role-biomedical-engineer",
        "title": "Biomedical Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Biomedical Engineer.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-medical-device-engineer",
        "title": "Medical Device Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Medical Device Engineer.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-clinical-engineering-associate",
        "title": "Clinical Engineering Associate",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Clinical Engineering Associate.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-biomedical-signal-processing-engineer",
        "title": "Biomedical Signal Processing Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Biomedical Signal Processing Engineer.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-bioprocess-engineer",
        "title": "Bioprocess Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Bioprocess Engineer.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-bioinformatics-analyst",
        "title": "Bioinformatics Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Bioinformatics Analyst.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-biomanufacturing-associate",
        "title": "Biomanufacturing Associate",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Biomanufacturing Associate.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      },
      {
        "id": "role-quality-validation-associate",
        "title": "Quality/Validation Associate",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Quality/Validation Associate.",
          "Apply core principles of Biomedical Instrumentation, Anatomy, Physiology in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in MATLAB/Python, signal processing, medical devices and completion of 2-3 portfolio projects.",
        "entrySalary": "$112,000 / \u20b910-24 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-matlab-python",
      "skill-signal-processing",
      "skill-medical-devices",
      "skill-validation",
      "skill-lab-techniques"
    ],
    "prerequisites": [
      "Biomedical Instrumentation",
      "Anatomy",
      "Physiology",
      "Signals"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-matlab-python",
          "skillName": "MATLAB/Python",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-signal-processing",
          "skillName": "signal processing",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-medical-devices",
          "skillName": "medical devices",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-validation",
          "skillName": "validation",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-lab-techniques",
          "skillName": "Lab techniques",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Biomedical Instrumentation",
        "Anatomy",
        "Physiology",
        "Signals"
      ],
      "recommendedProjects": [
        "End-to-End Biomedical Devices & Robotics Engineer Capstone System",
        "Production Optimization using MATLAB/Python"
      ],
      "emergingSkills": [
        "AI medical imaging",
        "wearables",
        "digital health",
        "med-device cybersecurity"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Biomedical Instrumentation",
      "Anatomy",
      "Physiology",
      "Signals",
      "Imaging",
      "Biomaterials",
      "Molecular Biology",
      "Biochemistry",
      "Microbiology",
      "Genetic Engineering",
      "Bioprocess"
    ],
    "placementSkills": [
      "MATLAB/Python",
      "signal processing",
      "medical devices",
      "validation",
      "Lab techniques",
      "statistics",
      "Python/R",
      "GMP/GLP",
      "documentation"
    ],
    "futureSkills": [
      "AI medical imaging",
      "wearables",
      "digital health",
      "med-device cybersecurity",
      "Bioinformatics",
      "computational biology",
      "precision medicine",
      "automation"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "LearnChemE",
        "url": "https://learncheme.com/"
      },
      {
        "title": "AspenTech Learning",
        "url": "https://www.aspentech.com/en/learning"
      }
    ]
  },
  {
    "id": "career-ece-embedded-vlsi",
    "title": "Embedded Systems & VLSI Design Engineer",
    "discipline": "engineering",
    "department": "Electronics & Communication (ECE / VLSI)",
    "roleCategory": "Technology/Electronics",
    "category": "Semiconductors & Embedded Electronics",
    "description": "Architect high-performance silicon chips, FPGA hardware accelerators, real-time operating systems (RTOS), and edge telemetry microcontrollers.",
    "growthRate": "+30% (High Growth)",
    "medianSalary": "$128,000 / \u20b912-26 LPA",
    "scope": "RTL Verilog design, physical synthesis, FreeRTOS firmware, and wireless 5G/IoT transceivers.",
    "subCareers": [
      "Embedded Systems Engineer",
      "VLSI Design Engineer",
      "Verification Engineer",
      "IoT Engineer",
      "RTL Design Engineer",
      "Design Verification Engineer",
      "Physical Design Engineer",
      "FPGA Engineer",
      "Embedded Software Engineer",
      "Firmware Engineer",
      "RTOS Engineer",
      "IoT Edge Engineer",
      "Telecom Engineer",
      "RF Engineer",
      "Network Engineer"
    ],
    "roles": [
      {
        "id": "role-embedded-systems-engineer",
        "title": "Embedded Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Embedded Systems Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-vlsi-design-engineer",
        "title": "VLSI Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in VLSI Design Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-verification-engineer",
        "title": "Verification Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Verification Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-iot-engineer",
        "title": "IoT Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in IoT Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-rtl-design-engineer",
        "title": "RTL Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in RTL Design Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-design-verification-engineer",
        "title": "Design Verification Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Design Verification Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-physical-design-engineer",
        "title": "Physical Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Physical Design Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-fpga-engineer",
        "title": "FPGA Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in FPGA Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-embedded-software-engineer",
        "title": "Embedded Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Embedded Software Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-firmware-engineer",
        "title": "Firmware Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Firmware Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-rtos-engineer",
        "title": "RTOS Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in RTOS Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-iot-edge-engineer",
        "title": "IoT Edge Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in IoT Edge Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-telecom-engineer",
        "title": "Telecom Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Telecom Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-rf-engineer",
        "title": "RF Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in RF Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      },
      {
        "id": "role-network-engineer",
        "title": "Network Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Network Engineer.",
          "Apply core principles of Digital, Analog, Microprocessors in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in C/C++, Verilog/SystemVerilog, MATLAB and completion of 2-3 portfolio projects.",
        "entrySalary": "$128,000 / \u20b912-26 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-c-c",
      "skill-verilog-systemverilog",
      "skill-matlab",
      "skill-embedded-debugging",
      "skill-uvm"
    ],
    "prerequisites": [
      "Digital",
      "Analog",
      "Microprocessors",
      "Communication"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-c-c",
          "skillName": "C/C++",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-verilog-systemverilog",
          "skillName": "Verilog/SystemVerilog",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-matlab",
          "skillName": "MATLAB",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-embedded-debugging",
          "skillName": "embedded debugging",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-uvm",
          "skillName": "UVM",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Digital",
        "Analog",
        "Microprocessors",
        "Communication"
      ],
      "recommendedProjects": [
        "End-to-End Embedded Systems & VLSI Design Engineer Capstone System",
        "Production Optimization using C/C++"
      ],
      "emergingSkills": [
        "Edge AI",
        "advanced SoC",
        "FPGA",
        "5G/6G"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Digital",
      "Analog",
      "Microprocessors",
      "Communication",
      "DSP",
      "Control Systems",
      "Digital VLSI",
      "CMOS",
      "Computer Architecture",
      "Verilog",
      "SystemVerilog",
      "Microcontrollers",
      "Embedded C",
      "RTOS",
      "Device Drivers",
      "Communication Systems",
      "RF",
      "Antennas",
      "Networks"
    ],
    "placementSkills": [
      "C/C++",
      "Verilog/SystemVerilog",
      "MATLAB",
      "embedded debugging",
      "UVM",
      "STA",
      "Linux",
      "digital design",
      "UART/I2C/SPI/CAN",
      "RTOS",
      "embedded Linux",
      "debugging",
      "Networking",
      "RF basics",
      "embedded C",
      "troubleshooting"
    ],
    "futureSkills": [
      "Edge AI",
      "advanced SoC",
      "FPGA",
      "5G/6G",
      "IoT security",
      "AI accelerators",
      "chiplets",
      "RISC-V",
      "low-power VLSI",
      "automotive software",
      "secure embedded systems",
      "Open RAN",
      "edge computing",
      "network automation"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "Arduino Docs",
        "url": "https://docs.arduino.cc/"
      },
      {
        "title": "ARM Learning Paths",
        "url": "https://learn.arm.com/"
      },
      {
        "title": "FreeRTOS Docs",
        "url": "https://www.freertos.org/Documentation/"
      },
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "HDLBits",
        "url": "https://hdlbits.01xz.net/wiki/Main_Page"
      },
      {
        "title": "VerilogPro",
        "url": "https://www.verilogpro.com/"
      },
      {
        "title": "Microsoft Learn",
        "url": "https://learn.microsoft.com/training/"
      },
      {
        "title": "Coursera",
        "url": "https://www.coursera.org/"
      },
      {
        "title": "Google Career Certificates",
        "url": "https://grow.google/certificates/"
      },
      {
        "title": "Keysight University",
        "url": "https://learn.keysight.com/"
      },
      {
        "title": "Cisco Networking Academy",
        "url": "https://www.netacad.com/"
      }
    ]
  },
  {
    "id": "career-eee-power-ev",
    "title": "Power Systems & EV Powertrain Engineer",
    "discipline": "engineering",
    "department": "Electrical & Electronics Engineering (EEE / EV)",
    "roleCategory": "Core/Manufacturing",
    "category": "Electric Vehicles & Clean Energy",
    "description": "Engineer electric vehicle battery management systems (BMS), high-voltage motor inverters, renewable microgrids, and smart grid automation protocols.",
    "growthRate": "+34% (Rapid Expansion)",
    "medianSalary": "$118,000 / \u20b911-25 LPA",
    "scope": "EV motor controllers, MATLAB/Simulink simulation, grid-tied battery storage, and power electronics.",
    "subCareers": [
      "Electrical Design Engineer",
      "Power Systems Engineer",
      "EV Systems Engineer",
      "Renewable Energy Engineer",
      "Automotive Design Engineer",
      "Automotive Test Engineer",
      "Automotive Software/ECU Engineer",
      "Instrumentation Engineer",
      "Control Systems Engineer",
      "Automation Engineer",
      "PLC/SCADA Engineer"
    ],
    "roles": [
      {
        "id": "role-electrical-design-engineer",
        "title": "Electrical Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Electrical Design Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-power-systems-engineer",
        "title": "Power Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Power Systems Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-ev-systems-engineer",
        "title": "EV Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in EV Systems Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-renewable-energy-engineer",
        "title": "Renewable Energy Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Renewable Energy Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-automotive-design-engineer",
        "title": "Automotive Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automotive Design Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-automotive-test-engineer",
        "title": "Automotive Test Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automotive Test Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-automotive-software-ecu-engineer",
        "title": "Automotive Software/ECU Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automotive Software/ECU Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-instrumentation-engineer",
        "title": "Instrumentation Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Instrumentation Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-control-systems-engineer",
        "title": "Control Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Control Systems Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-automation-engineer",
        "title": "Automation Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automation Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      },
      {
        "id": "role-plc-scada-engineer",
        "title": "PLC/SCADA Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in PLC/SCADA Engineer.",
          "Apply core principles of Circuits, Machines, Power Systems in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Electrical machines, MATLAB, protection and completion of 2-3 portfolio projects.",
        "entrySalary": "$118,000 / \u20b911-25 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-electrical-machines",
      "skill-matlab",
      "skill-protection",
      "skill-power-electronics",
      "skill-catia-solidworks"
    ],
    "prerequisites": [
      "Circuits",
      "Machines",
      "Power Systems",
      "Power Electronics"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-electrical-machines",
          "skillName": "Electrical machines",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-matlab",
          "skillName": "MATLAB",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-protection",
          "skillName": "protection",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-power-electronics",
          "skillName": "power electronics",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-catia-solidworks",
          "skillName": "CATIA/SolidWorks",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Circuits",
        "Machines",
        "Power Systems",
        "Power Electronics"
      ],
      "recommendedProjects": [
        "End-to-End Power Systems & EV Powertrain Engineer Capstone System",
        "Production Optimization using Electrical machines"
      ],
      "emergingSkills": [
        "EV powertrains",
        "battery systems",
        "smart grids",
        "renewable integration"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Circuits",
      "Machines",
      "Power Systems",
      "Power Electronics",
      "Measurements",
      "Automotive",
      "Vehicle Dynamics",
      "CAD",
      "Electronics",
      "Control",
      "Sensors",
      "Control Systems",
      "Instrumentation",
      "PLC/SCADA"
    ],
    "placementSkills": [
      "Electrical machines",
      "MATLAB",
      "protection",
      "power electronics",
      "CATIA/SolidWorks",
      "CAN",
      "MATLAB/Simulink",
      "testing",
      "PLC",
      "SCADA",
      "PID",
      "sensors",
      "industrial communication"
    ],
    "futureSkills": [
      "EV powertrains",
      "battery systems",
      "smart grids",
      "renewable integration",
      "EV",
      "ADAS",
      "autonomous driving",
      "automotive cybersecurity",
      "Industrial IoT",
      "digital twins",
      "predictive maintenance",
      "OT security"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "MATLAB/Simulink",
        "url": "https://www.mathworks.com/learn/"
      },
      {
        "title": "Electrical Engineering Portal",
        "url": "https://electrical-engineering-portal.com/"
      },
      {
        "title": "Arduino Docs",
        "url": "https://docs.arduino.cc/"
      },
      {
        "title": "ARM Learning Paths",
        "url": "https://learn.arm.com/"
      },
      {
        "title": "FreeRTOS Docs",
        "url": "https://www.freertos.org/Documentation/"
      },
      {
        "title": "MathWorks Automotive",
        "url": "https://www.mathworks.com/solutions/automotive.html"
      },
      {
        "title": "Vector Academy",
        "url": "https://www.vector.com/int/en/know-how/academy/"
      },
      {
        "title": "Siemens SCE",
        "url": "https://www.siemens.com/sce"
      },
      {
        "title": "Rockwell Automation Learning+",
        "url": "https://www.rockwellautomation.com/en-us/support/learning.html"
      }
    ]
  },
  {
    "id": "career-mech-design-cae",
    "title": "Mechanical Design & CAE Simulation Engineer",
    "discipline": "engineering",
    "department": "Mechanical & Aerospace Engineering",
    "roleCategory": "Core/Manufacturing",
    "category": "Mechanical Design & Digital Simulation",
    "description": "Model complex structural assemblies using CAD/SolidWorks, perform finite element analysis (FEA) and computational fluid dynamics (CFD), and automate manufacturing.",
    "growthRate": "+24% (Steady Demand)",
    "medianSalary": "$105,000 / \u20b99-20 LPA",
    "scope": "GD&T, generative structural design, additive manufacturing, and thermal/stress simulations.",
    "subCareers": [
      "Design Engineer",
      "Manufacturing Engineer",
      "Production Engineer",
      "CAE Engineer",
      "Automotive Design Engineer",
      "Automotive Test Engineer",
      "EV Systems Engineer",
      "Automotive Software/ECU Engineer",
      "Aerospace Design Engineer",
      "Systems Engineer",
      "Propulsion Engineer",
      "Avionics Engineer",
      "Aerodynamics Engineer",
      "Flight Test Engineer",
      "UAV Engineer"
    ],
    "roles": [
      {
        "id": "role-design-engineer",
        "title": "Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Design Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-manufacturing-engineer",
        "title": "Manufacturing Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Manufacturing Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-production-engineer",
        "title": "Production Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Production Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-cae-engineer",
        "title": "CAE Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in CAE Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-automotive-design-engineer",
        "title": "Automotive Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automotive Design Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-automotive-test-engineer",
        "title": "Automotive Test Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automotive Test Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-ev-systems-engineer",
        "title": "EV Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in EV Systems Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-automotive-software-ecu-engineer",
        "title": "Automotive Software/ECU Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automotive Software/ECU Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-aerospace-design-engineer",
        "title": "Aerospace Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Aerospace Design Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-systems-engineer",
        "title": "Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Systems Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-propulsion-engineer",
        "title": "Propulsion Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Propulsion Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-avionics-engineer",
        "title": "Avionics Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Avionics Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-aerodynamics-engineer",
        "title": "Aerodynamics Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Aerodynamics Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-flight-test-engineer",
        "title": "Flight Test Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Flight Test Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      },
      {
        "id": "role-uav-engineer",
        "title": "UAV Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in UAV Engineer.",
          "Apply core principles of Engineering Mechanics, Thermodynamics, Machine Design in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD/SolidWorks, GD&T, manufacturing and completion of 2-3 portfolio projects.",
        "entrySalary": "$105,000 / \u20b99-20 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-autocad-solidworks",
      "skill-gd-t",
      "skill-manufacturing",
      "skill-quality",
      "skill-aptitude"
    ],
    "prerequisites": [
      "Engineering Mechanics",
      "Thermodynamics",
      "Machine Design",
      "Manufacturing"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-autocad-solidworks",
          "skillName": "AutoCAD/SolidWorks",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-gd-t",
          "skillName": "GD&T",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-manufacturing",
          "skillName": "manufacturing",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-quality",
          "skillName": "quality",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-aptitude",
          "skillName": "aptitude",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Engineering Mechanics",
        "Thermodynamics",
        "Machine Design",
        "Manufacturing"
      ],
      "recommendedProjects": [
        "End-to-End Mechanical Design & CAE Simulation Engineer Capstone System",
        "Production Optimization using AutoCAD/SolidWorks"
      ],
      "emergingSkills": [
        "Additive manufacturing",
        "digital twins",
        "robotics",
        "CAE automation"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Engineering Mechanics",
      "Thermodynamics",
      "Machine Design",
      "Manufacturing",
      "CAD/CAM",
      "Automotive",
      "Vehicle Dynamics",
      "CAD",
      "Electronics",
      "Control",
      "Aerodynamics",
      "Propulsion",
      "Structures",
      "Flight Mechanics",
      "Avionics",
      "Aircraft Structures"
    ],
    "placementSkills": [
      "AutoCAD/SolidWorks",
      "GD&T",
      "manufacturing",
      "quality",
      "aptitude",
      "CATIA/SolidWorks",
      "CAN",
      "MATLAB/Simulink",
      "testing",
      "CAD/CAE",
      "CFD/FEA",
      "systems engineering",
      "CATIA/NX",
      "MATLAB",
      "documentation"
    ],
    "futureSkills": [
      "Additive manufacturing",
      "digital twins",
      "robotics",
      "CAE automation",
      "EV",
      "ADAS",
      "autonomous driving",
      "automotive cybersecurity",
      "Autonomous systems",
      "space systems",
      "digital engineering",
      "UAV autonomy",
      "advanced composites"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "Autodesk Learning",
        "url": "https://www.autodesk.com/learning"
      },
      {
        "title": "ASQ Learning",
        "url": "https://asq.org/training"
      },
      {
        "title": "MathWorks Automotive",
        "url": "https://www.mathworks.com/solutions/automotive.html"
      },
      {
        "title": "Vector Academy",
        "url": "https://www.vector.com/int/en/know-how/academy/"
      },
      {
        "title": "Arduino Docs",
        "url": "https://docs.arduino.cc/"
      },
      {
        "title": "ARM Learning Paths",
        "url": "https://learn.arm.com/"
      },
      {
        "title": "FreeRTOS Docs",
        "url": "https://www.freertos.org/Documentation/"
      },
      {
        "title": "NASA STEM",
        "url": "https://www.nasa.gov/stem/"
      },
      {
        "title": "MIT OpenCourseWare",
        "url": "https://ocw.mit.edu/"
      }
    ]
  },
  {
    "id": "career-robotics-automation",
    "title": "Robotics & Autonomous Systems Engineer",
    "discipline": "engineering",
    "department": "Robotics, Mechatronics & Automation",
    "roleCategory": "Core/Manufacturing",
    "category": "Robotics & Industrial Automation",
    "description": "Build autonomous mobile robots (AMRs), robotic manipulator control loops in ROS 2, collaborative assembly robots, and industrial PLC/SCADA systems.",
    "growthRate": "+37% (High Demand)",
    "medianSalary": "$132,000 / \u20b913-28 LPA",
    "scope": "ROS 2 nodes, SLAM navigation, Gazebo digital twins, and industrial robot arms.",
    "subCareers": [
      "Robotics Engineer",
      "ROS Developer",
      "Robotics Software Engineer",
      "Computer Vision Engineer",
      "Mechatronics Engineer",
      "Automation Engineer",
      "Controls Engineer",
      "Instrumentation Engineer",
      "Control Systems Engineer",
      "PLC/SCADA Engineer"
    ],
    "roles": [
      {
        "id": "role-robotics-engineer",
        "title": "Robotics Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Robotics Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-ros-developer",
        "title": "ROS Developer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in ROS Developer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-robotics-software-engineer",
        "title": "Robotics Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Robotics Software Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-computer-vision-engineer",
        "title": "Computer Vision Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Computer Vision Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-mechatronics-engineer",
        "title": "Mechatronics Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Mechatronics Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-automation-engineer",
        "title": "Automation Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Automation Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-controls-engineer",
        "title": "Controls Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Controls Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-instrumentation-engineer",
        "title": "Instrumentation Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Instrumentation Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-control-systems-engineer",
        "title": "Control Systems Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Control Systems Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      },
      {
        "id": "role-plc-scada-engineer",
        "title": "PLC/SCADA Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in PLC/SCADA Engineer.",
          "Apply core principles of Robotics, Control, ROS in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Python/C++, ROS2, Linux and completion of 2-3 portfolio projects.",
        "entrySalary": "$132,000 / \u20b913-28 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-python-c",
      "skill-ros2",
      "skill-linux",
      "skill-kinematics",
      "skill-simulation"
    ],
    "prerequisites": [
      "Robotics",
      "Control",
      "ROS",
      "Sensors"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-python-c",
          "skillName": "Python/C++",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-ros2",
          "skillName": "ROS2",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-linux",
          "skillName": "Linux",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-kinematics",
          "skillName": "kinematics",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-simulation",
          "skillName": "simulation",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Robotics",
        "Control",
        "ROS",
        "Sensors"
      ],
      "recommendedProjects": [
        "End-to-End Robotics & Autonomous Systems Engineer Capstone System",
        "Production Optimization using Python/C++"
      ],
      "emergingSkills": [
        "Autonomous systems",
        "AI robotics",
        "reinforcement learning",
        "Collaborative robots"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Robotics",
      "Control",
      "ROS",
      "Sensors",
      "Embedded",
      "Computer Vision",
      "Mechanisms",
      "PLC",
      "Embedded Systems",
      "Measurements",
      "Control Systems",
      "Instrumentation",
      "PLC/SCADA"
    ],
    "placementSkills": [
      "Python/C++",
      "ROS2",
      "Linux",
      "kinematics",
      "simulation",
      "PLC",
      "robotics",
      "C/C++",
      "MATLAB/Simulink",
      "sensors",
      "SCADA",
      "PID",
      "industrial communication"
    ],
    "futureSkills": [
      "Autonomous systems",
      "AI robotics",
      "reinforcement learning",
      "Collaborative robots",
      "computer vision",
      "digital twins",
      "edge AI",
      "Industrial IoT",
      "predictive maintenance",
      "OT security"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "Siemens SCE",
        "url": "https://www.siemens.com/sce"
      },
      {
        "title": "Rockwell Automation Learning+",
        "url": "https://www.rockwellautomation.com/en-us/support/learning.html"
      },
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "Kaggle Learn",
        "url": "https://www.kaggle.com/learn"
      },
      {
        "title": "DeepLearning.AI",
        "url": "https://www.deeplearning.ai/"
      },
      {
        "title": "Hugging Face Learn",
        "url": "https://huggingface.co/learn"
      },
      {
        "title": "Autodesk Learning",
        "url": "https://www.autodesk.com/learning"
      },
      {
        "title": "ASQ Learning",
        "url": "https://asq.org/training"
      },
      {
        "title": "ROS 2 Documentation",
        "url": "https://docs.ros.org/"
      },
      {
        "title": "The Construct",
        "url": "https://www.theconstruct.ai/"
      },
      {
        "title": "Arduino Docs",
        "url": "https://docs.arduino.cc/"
      },
      {
        "title": "ARM Learning Paths",
        "url": "https://learn.arm.com/"
      },
      {
        "title": "FreeRTOS Docs",
        "url": "https://www.freertos.org/Documentation/"
      }
    ]
  },
  {
    "id": "career-civil-bim-smart",
    "title": "Civil Infrastructure & BIM Digital Twin Specialist",
    "discipline": "engineering",
    "department": "Civil, Construction & Geomatics",
    "roleCategory": "Infrastructure/Environment",
    "category": "Smart Infrastructure & Built Environment",
    "description": "Design resilient mega-structures, generate 4D/5D Building Information Models (BIM) with Revit, and monitor smart urban infrastructure using GIS spatial telemetry.",
    "growthRate": "+22% (Core Industry)",
    "medianSalary": "$98,000 / \u20b98-18 LPA",
    "scope": "Structural STAAD.Pro analysis, Revit digital twin coordination, and remote sensing GIS.",
    "subCareers": [
      "Structural Engineer",
      "Site Engineer",
      "Planning Engineer",
      "Quantity Surveyor",
      "Construction Engineer",
      "BIM Engineer",
      "Quantity/Contracts Engineer",
      "GIS Analyst",
      "Survey Engineer",
      "Remote Sensing Analyst",
      "Geospatial Data Analyst"
    ],
    "roles": [
      {
        "id": "role-structural-engineer",
        "title": "Structural Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Structural Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-site-engineer",
        "title": "Site Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Site Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-planning-engineer",
        "title": "Planning Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Planning Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-quantity-surveyor",
        "title": "Quantity Surveyor",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Quantity Surveyor.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-construction-engineer",
        "title": "Construction Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Construction Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-bim-engineer",
        "title": "BIM Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in BIM Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-quantity-contracts-engineer",
        "title": "Quantity/Contracts Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Quantity/Contracts Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-gis-analyst",
        "title": "GIS Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in GIS Analyst.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-survey-engineer",
        "title": "Survey Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Survey Engineer.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-remote-sensing-analyst",
        "title": "Remote Sensing Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Remote Sensing Analyst.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      },
      {
        "id": "role-geospatial-data-analyst",
        "title": "Geospatial Data Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Geospatial Data Analyst.",
          "Apply core principles of Structural Analysis, RCC, Steel in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in AutoCAD, STAAD.Pro/ETABS, estimation and completion of 2-3 portfolio projects.",
        "entrySalary": "$98,000 / \u20b98-18 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-autocad",
      "skill-staad-pro-etabs",
      "skill-estimation",
      "skill-surveying",
      "skill-primavera-ms-project"
    ],
    "prerequisites": [
      "Structural Analysis",
      "RCC",
      "Steel",
      "Geotechnical"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-autocad",
          "skillName": "AutoCAD",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-staad-pro-etabs",
          "skillName": "STAAD.Pro/ETABS",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-estimation",
          "skillName": "estimation",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-surveying",
          "skillName": "surveying",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-primavera-ms-project",
          "skillName": "Primavera/MS Project",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Structural Analysis",
        "RCC",
        "Steel",
        "Geotechnical"
      ],
      "recommendedProjects": [
        "End-to-End Civil Infrastructure & BIM Digital Twin Specialist Capstone System",
        "Production Optimization using AutoCAD"
      ],
      "emergingSkills": [
        "BIM",
        "digital twins",
        "smart infrastructure",
        "climate-resilient construction"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Structural Analysis",
      "RCC",
      "Steel",
      "Geotechnical",
      "Transportation",
      "Surveying",
      "Construction Technology",
      "Estimation",
      "Planning",
      "Contracts",
      "GIS",
      "Remote Sensing",
      "Photogrammetry",
      "GNSS"
    ],
    "placementSkills": [
      "AutoCAD",
      "STAAD.Pro/ETABS",
      "estimation",
      "surveying",
      "Primavera/MS Project",
      "BIM/Revit",
      "BOQ",
      "project controls",
      "QGIS/ArcGIS",
      "AutoCAD/Civil 3D",
      "GIS",
      "GNSS",
      "Python basics"
    ],
    "futureSkills": [
      "BIM",
      "digital twins",
      "smart infrastructure",
      "climate-resilient construction",
      "BIM automation",
      "construction analytics",
      "Geospatial AI",
      "UAV mapping",
      "satellite analytics"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "Autodesk Learning",
        "url": "https://www.autodesk.com/learning"
      },
      {
        "title": "Bentley Learn",
        "url": "https://learn.bentley.com/"
      },
      {
        "title": "Autodesk Construction Cloud Learning",
        "url": "https://www.autodesk.com/learn/ondemand"
      },
      {
        "title": "Primavera training via Oracle",
        "url": "https://www.oracle.com/industries/construction-engineering/"
      },
      {
        "title": "QGIS Training Manual",
        "url": "https://docs.qgis.org/latest/en/docs/training_manual/"
      },
      {
        "title": "Esri Academy",
        "url": "https://www.esri.com/training/"
      },
      {
        "title": "NASA ARSET",
        "url": "https://appliedsciences.nasa.gov/what-we-do/capacity-building/arset"
      },
      {
        "title": "Kaggle Learn",
        "url": "https://www.kaggle.com/learn"
      },
      {
        "title": "Google Data Analytics",
        "url": "https://www.coursera.org/professional-certificates/google-data-analytics"
      },
      {
        "title": "SQLBolt",
        "url": "https://sqlbolt.com/"
      }
    ]
  },
  {
    "id": "career-chemical-process",
    "title": "Chemical Process & Sustainable Energy Engineer",
    "discipline": "engineering",
    "department": "Chemical, Environmental & Materials",
    "roleCategory": "Life/Chemical/Process",
    "category": "Process Engineering & Green Energy",
    "description": "Model continuous industrial chemical reactors in Aspen Plus, design carbon capture systems, scale green hydrogen synthesis, and optimize refinery thermodynamics.",
    "growthRate": "+26% (Emerging Sector)",
    "medianSalary": "$110,000 / \u20b910-22 LPA",
    "scope": "Thermodynamic mass/heat balances, Aspen HYSYS simulations, green hydrogen, and process safety.",
    "subCareers": [
      "Process Engineer",
      "Production Engineer",
      "Process Safety Engineer",
      "Process Design Engineer",
      "Reservoir Engineer",
      "Drilling Engineer",
      "Petrophysicist",
      "Environmental Engineer",
      "Water/Wastewater Engineer",
      "EHS Engineer",
      "Sustainability Analyst",
      "Materials Engineer",
      "Metallurgy Engineer",
      "Failure Analysis Engineer",
      "Quality Engineer"
    ],
    "roles": [
      {
        "id": "role-process-engineer",
        "title": "Process Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Process Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-production-engineer",
        "title": "Production Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Production Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-process-safety-engineer",
        "title": "Process Safety Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Process Safety Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-process-design-engineer",
        "title": "Process Design Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Process Design Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-reservoir-engineer",
        "title": "Reservoir Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Reservoir Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-drilling-engineer",
        "title": "Drilling Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Drilling Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-petrophysicist",
        "title": "Petrophysicist",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Petrophysicist.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-environmental-engineer",
        "title": "Environmental Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Environmental Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-water-wastewater-engineer",
        "title": "Water/Wastewater Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Water/Wastewater Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-ehs-engineer",
        "title": "EHS Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in EHS Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-sustainability-analyst",
        "title": "Sustainability Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Sustainability Analyst.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-materials-engineer",
        "title": "Materials Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Materials Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-metallurgy-engineer",
        "title": "Metallurgy Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Metallurgy Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-failure-analysis-engineer",
        "title": "Failure Analysis Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Failure Analysis Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      },
      {
        "id": "role-quality-engineer",
        "title": "Quality Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Quality Engineer.",
          "Apply core principles of Material/Energy Balances, Thermodynamics, Heat/Mass Transfer in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in Aspen basics, process calculations, safety and completion of 2-3 portfolio projects.",
        "entrySalary": "$110,000 / \u20b910-22 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-aspen-basics",
      "skill-process-calculations",
      "skill-safety",
      "skill-excel",
      "skill-troubleshooting"
    ],
    "prerequisites": [
      "Material/Energy Balances",
      "Thermodynamics",
      "Heat/Mass Transfer",
      "Reaction Engineering"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-aspen-basics",
          "skillName": "Aspen basics",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-process-calculations",
          "skillName": "process calculations",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-safety",
          "skillName": "safety",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-excel",
          "skillName": "Excel",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-troubleshooting",
          "skillName": "troubleshooting",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Material/Energy Balances",
        "Thermodynamics",
        "Heat/Mass Transfer",
        "Reaction Engineering"
      ],
      "recommendedProjects": [
        "End-to-End Chemical Process & Sustainable Energy Engineer Capstone System",
        "Production Optimization using Aspen basics"
      ],
      "emergingSkills": [
        "Green hydrogen",
        "carbon capture",
        "sustainable chemicals",
        "AI process optimization"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Material/Energy Balances",
      "Thermodynamics",
      "Heat/Mass Transfer",
      "Reaction Engineering",
      "Control",
      "Reservoir Engineering",
      "Drilling",
      "Production",
      "Petrophysics",
      "Well Testing",
      "Environmental Chemistry",
      "Water Treatment",
      "Air Pollution",
      "Waste Management",
      "EIA",
      "Materials Science",
      "Physical Metallurgy",
      "Heat Treatment",
      "Corrosion",
      "Characterization"
    ],
    "placementSkills": [
      "Aspen basics",
      "process calculations",
      "safety",
      "Excel",
      "troubleshooting",
      "Petrel/industry tools",
      "numerical methods",
      "data analysis",
      "Environmental standards",
      "GIS",
      "sampling",
      "reporting",
      "Materials testing",
      "microscopy",
      "failure analysis",
      "quality systems"
    ],
    "futureSkills": [
      "Green hydrogen",
      "carbon capture",
      "sustainable chemicals",
      "AI process optimization",
      "Digital oilfield",
      "carbon management",
      "geothermal",
      "energy analytics",
      "Climate analytics",
      "circular economy",
      "carbon accounting",
      "environmental AI",
      "Advanced materials",
      "composites",
      "additive manufacturing",
      "battery materials"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects",
    "learningResources": [
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "LearnChemE",
        "url": "https://learncheme.com/"
      },
      {
        "title": "AspenTech Learning",
        "url": "https://www.aspentech.com/en/learning"
      },
      {
        "title": "Autodesk Learning",
        "url": "https://www.autodesk.com/learning"
      },
      {
        "title": "ASQ Learning",
        "url": "https://asq.org/training"
      },
      {
        "title": "EPA Resources",
        "url": "https://www.epa.gov/education"
      },
      {
        "title": "QGIS Training Manual",
        "url": "https://docs.qgis.org/latest/en/docs/training_manual/"
      }
    ]
  },
  {
    "id": "career-csbs-business-product",
    "title": "Business Systems & Product Engineering Analyst",
    "discipline": "engineering",
    "department": "Computer Science & Business Systems",
    "roleCategory": "Cross-Domain",
    "category": "Cross-Domain Product & Analytics",
    "description": "Bridge technical software architecture and executive business strategy through product requirement roadmaps, quantitative revenue analysis, and systems workflow modeling.",
    "growthRate": "+31% (High Demand)",
    "medianSalary": "$115,000 / \u20b912-24 LPA",
    "scope": "Agile product roadmaps, cohort retention metrics, enterprise software evaluation, and technical leadership.",
    "subCareers": [
      "Software Engineer",
      "Business Analyst",
      "Data Analyst",
      "Product Analyst",
      "Industrial Engineer",
      "Operations Analyst",
      "Supply Chain Analyst",
      "Process Improvement Engineer",
      "Technical Support Engineer",
      "Project Coordinator",
      "Technical Sales Engineer"
    ],
    "roles": [
      {
        "id": "role-software-engineer",
        "title": "Software Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Software Engineer.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-business-analyst",
        "title": "Business Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Business Analyst.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-data-analyst",
        "title": "Data Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Data Analyst.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-product-analyst",
        "title": "Product Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Product Analyst.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-industrial-engineer",
        "title": "Industrial Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Industrial Engineer.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-operations-analyst",
        "title": "Operations Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Operations Analyst.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-supply-chain-analyst",
        "title": "Supply Chain Analyst",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Supply Chain Analyst.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-process-improvement-engineer",
        "title": "Process Improvement Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Process Improvement Engineer.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-technical-support-engineer",
        "title": "Technical Support Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Technical Support Engineer.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-project-coordinator",
        "title": "Project Coordinator",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Project Coordinator.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      },
      {
        "id": "role-technical-sales-engineer",
        "title": "Technical Sales Engineer",
        "responsibilities": [
          "Develop and deploy verified engineering solutions in Technical Sales Engineer.",
          "Apply core principles of Programming, DBMS, Software Engineering in industry workflows.",
          "Collaborate in cross-functional technical teams and maintain documentation standards."
        ],
        "requiredSkillIds": [
          "skill-python",
          "skill-sql"
        ],
        "readinessCriteria": "Proficiency in DSA, SQL, Excel/BI and completion of 2-3 portfolio projects.",
        "entrySalary": "$115,000 / \u20b912-24 LPA"
      }
    ],
    "requiredSkillIds": [
      "skill-dsa",
      "skill-sql",
      "skill-excel-bi",
      "skill-communication",
      "skill-case-studies"
    ],
    "prerequisites": [
      "Programming",
      "DBMS",
      "Software Engineering",
      "Statistics"
    ],
    "relatedCareerIds": [],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-dsa",
          "skillName": "DSA",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-sql",
          "skillName": "SQL",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-excel-bi",
          "skillName": "Excel/BI",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-communication",
          "skillName": "communication",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-case-studies",
          "skillName": "case studies",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Programming",
        "DBMS",
        "Software Engineering",
        "Statistics"
      ],
      "recommendedProjects": [
        "End-to-End Business Systems & Product Engineering Analyst Capstone System",
        "Production Optimization using DSA"
      ],
      "emergingSkills": [
        "AI-assisted analytics",
        "product analytics",
        "cloud",
        "AI operations"
      ],
      "readinessThreshold": 75
    },
    "coreCourses": [
      "Programming",
      "DBMS",
      "Software Engineering",
      "Statistics",
      "Business Analytics",
      "Operations Research",
      "Supply Chain",
      "Quality",
      "Optimization",
      "Aptitude",
      "Communication",
      "Excel",
      "Business Fundamentals",
      "Project Management"
    ],
    "placementSkills": [
      "DSA",
      "SQL",
      "Excel/BI",
      "communication",
      "case studies",
      "aptitude",
      "Excel",
      "Power BI",
      "Lean Six Sigma",
      "optimization",
      "Quantitative aptitude",
      "logical reasoning",
      "PowerPoint",
      "problem solving"
    ],
    "futureSkills": [
      "AI-assisted analytics",
      "product analytics",
      "cloud",
      "AI operations",
      "supply-chain analytics",
      "digital twins",
      "automation",
      "digital transformation"
    ],
    "futureRelevance": "Very High",
    "placementPreparation": "Aptitude; logical reasoning; quantitative ability; communication; resume; interview; role-specific technical test; 2-3 projects; Aptitude; verbal ability; case studies; group discussion; resume; HR interview",
    "learningResources": [
      {
        "title": "freeCodeCamp",
        "url": "https://www.freecodecamp.org/"
      },
      {
        "title": "GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/"
      },
      {
        "title": "LeetCode",
        "url": "https://leetcode.com/"
      },
      {
        "title": "Microsoft Learn",
        "url": "https://learn.microsoft.com/training/"
      },
      {
        "title": "Coursera",
        "url": "https://www.coursera.org/"
      },
      {
        "title": "Google Career Certificates",
        "url": "https://grow.google/certificates/"
      },
      {
        "title": "Kaggle Learn",
        "url": "https://www.kaggle.com/learn"
      },
      {
        "title": "Google Data Analytics",
        "url": "https://www.coursera.org/professional-certificates/google-data-analytics"
      },
      {
        "title": "SQLBolt",
        "url": "https://sqlbolt.com/"
      },
      {
        "title": "NPTEL",
        "url": "https://nptel.ac.in/"
      },
      {
        "title": "ASQ Learning",
        "url": "https://asq.org/training"
      }
    ]
  },
  {
    "id": "career-agtech-analyst",
    "title": "Precision AgTech & IoT Specialist",
    "discipline": "agriculture",
    "category": "Smart Agriculture",
    "description": "Bridge agronomy with IoT sensors, drone multispectral GIS imagery, and automated irrigation systems for climate-resilient farming.",
    "growthRate": "+24% (Rapid Growth)",
    "medianSalary": "$82,000 / \u20b98-16 LPA",
    "scope": "Modern agricultural enterprises, food-tech corporations, drone survey firms, and sustainable farming initiatives.",
    "subCareers": [
      "Drone Agronomy Surveyor",
      "Smart Farm Automation Engineer",
      "Agronomic Data Strategist"
    ],
    "roles": [
      {
        "id": "role-agtech-field",
        "title": "Smart Farm Telemetry Engineer",
        "responsibilities": [
          "Install and calibrate soil moisture IoT nodes",
          "Maintain LoRa mesh networks",
          "Monitor irrigation telemetry"
        ],
        "requiredSkillIds": [
          "skill-soil-sensors",
          "skill-smart-irrigation"
        ],
        "readinessCriteria": "Hands-on sensor calibration and automated control system testing.",
        "entrySalary": "$60,000"
      },
      {
        "id": "role-agtech-gis",
        "title": "GIS Crop Analytics Specialist",
        "responsibilities": [
          "Process satellite NDVI indices",
          "Build yield estimation heatmaps",
          "Advise on fertilizer optimization"
        ],
        "requiredSkillIds": [
          "skill-crop-analytics",
          "skill-data-viz",
          "skill-stats"
        ],
        "readinessCriteria": "GIS spatial analysis + predictive yield modeling.",
        "entrySalary": "$90,000"
      }
    ],
    "requiredSkillIds": [
      "skill-soil-sensors",
      "skill-crop-analytics",
      "skill-smart-irrigation",
      "skill-stats",
      "skill-data-viz"
    ],
    "prerequisites": [
      "Agricultural science fundamentals",
      "Basic electronics/computing"
    ],
    "relatedCareerIds": [
      "career-data-analyst",
      "career-sustainable-agronomy"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-soil-sensors",
          "skillName": "Soil Sensor & Telemetry Integration",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-smart-irrigation",
          "skillName": "Automated Irrigation & Climate Control",
          "importance": "mandatory",
          "targetProficiency": 75
        },
        {
          "skillId": "skill-crop-analytics",
          "skillName": "GIS & Crop Yield Predictive Modeling",
          "importance": "mandatory",
          "targetProficiency": 70
        },
        {
          "skillId": "skill-stats",
          "skillName": "Applied Statistics & Probability",
          "importance": "recommended",
          "targetProficiency": 60
        }
      ],
      "prerequisiteCourses": [
        "Soil Physics & Crop Physiology",
        "Introduction to Geoinformatics"
      ],
      "recommendedProjects": [
        "Automated LoRa Soil Moisture Telemetry Station",
        "NDVI Crop Health Index Dashboard"
      ],
      "emergingSkills": [
        "Hyperspectral Drone Imaging",
        "Autonomous Tractor Telematics"
      ],
      "readinessThreshold": 72
    },
    "iconName": "Sprout"
  },
  {
    "id": "career-sustainable-agronomy",
    "title": "Sustainable Agronomy & Climate Specialist",
    "discipline": "agriculture",
    "category": "Environmental Agronomy",
    "description": "Design regenerative cropping systems, carbon sequestration audits, and hydroponic controlled environment farming.",
    "growthRate": "+22% (Steady)",
    "medianSalary": "$78,000 / \u20b98-15 LPA",
    "scope": "Agri-consultancies, greenhouse operators, organic certification agencies, and carbon credit brokers.",
    "subCareers": [
      "Hydroponics Facility Manager",
      "Soil Carbon Verification Auditor"
    ],
    "roles": [
      {
        "id": "role-hydro-mgr",
        "title": "Controlled Environment Farm Manager",
        "responsibilities": [
          "Formulate closed-loop nutrient solutions",
          "Calibrate LED spectrums for leafy greens",
          "Manage biosecurity"
        ],
        "requiredSkillIds": [
          "skill-hydroponics",
          "skill-smart-irrigation"
        ],
        "readinessCriteria": "Nutrient formulation calculation and automated climate loop maintenance.",
        "entrySalary": "$58,000"
      }
    ],
    "requiredSkillIds": [
      "skill-hydroponics",
      "skill-soil-sensors",
      "skill-smart-irrigation",
      "skill-crop-analytics"
    ],
    "prerequisites": [
      "Plant biochemistry",
      "Soil fertility"
    ],
    "relatedCareerIds": [
      "career-agtech-analyst",
      "career-food-tech-qa"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-hydroponics",
          "skillName": "Hydroponics & Controlled Environment Agriculture",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-smart-irrigation",
          "skillName": "Automated Irrigation & Climate Control",
          "importance": "mandatory",
          "targetProficiency": 75
        },
        {
          "skillId": "skill-soil-sensors",
          "skillName": "Soil Sensor & Telemetry Integration",
          "importance": "recommended",
          "targetProficiency": 65
        }
      ],
      "prerequisiteCourses": [
        "Plant Nutrition & Metabolism",
        "Greenhouse Systems Engineering"
      ],
      "recommendedProjects": [
        "Automated Recirculating Deep Water Culture Hydroponic System"
      ],
      "emergingSkills": [
        "Aeroponic Fogging Systems",
        "Biochar Soil Amendment Verification"
      ],
      "readinessThreshold": 72
    },
    "iconName": "Sprout"
  },
  {
    "id": "career-food-tech-qa",
    "title": "Food Processing & Quality Assurance Engineer",
    "discipline": "agriculture",
    "category": "Food Technology",
    "description": "Ensure food safety standards, microbial quality controls, aseptic packaging lines, and novel nutritional formulation.",
    "growthRate": "+20% (Consistent)",
    "medianSalary": "$75,000 / \u20b97-14 LPA",
    "scope": "FMCG food processing giants, dairy networks, beverage breweries, and food safety regulatory bodies.",
    "subCareers": [
      "HACCP Food Safety Auditor",
      "Sensory & Formulation Scientist"
    ],
    "roles": [
      {
        "id": "role-food-qa-officer",
        "title": "Quality Assurance Technologist",
        "responsibilities": [
          "Conduct microbial pathogen swabs",
          "Verify shelf-life acceleration curves",
          "Audit supplier compliance"
        ],
        "requiredSkillIds": [
          "skill-food-qa",
          "skill-stats"
        ],
        "readinessCriteria": "ISO 22000 standard adherence and microbial lab assay execution.",
        "entrySalary": "$55,000"
      }
    ],
    "requiredSkillIds": [
      "skill-food-qa",
      "skill-stats",
      "skill-data-viz"
    ],
    "prerequisites": [
      "Food microbiology",
      "Organic chemistry"
    ],
    "relatedCareerIds": [
      "career-diagnostic-lab-spec",
      "career-sustainable-agronomy"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-food-qa",
          "skillName": "Food Safety & Quality Assurance (HACCP)",
          "importance": "mandatory",
          "targetProficiency": 90
        },
        {
          "skillId": "skill-stats",
          "skillName": "Applied Statistics & Probability",
          "importance": "mandatory",
          "targetProficiency": 65
        }
      ],
      "prerequisiteCourses": [
        "Food Microbiology",
        "Thermal Processing & Preservation"
      ],
      "recommendedProjects": [
        "Plant-wide HACCP Risk Map & Critical Control Point Dashboard"
      ],
      "emergingSkills": [
        "High-Pressure Processing (HPP)",
        "Blockchain Food Traceability"
      ],
      "readinessThreshold": 75
    },
    "iconName": "Award"
  },
  {
    "id": "career-health-informatics",
    "title": "Clinical Health Informatics Specialist",
    "discipline": "paramedical",
    "category": "Healthcare Technology",
    "description": "Unify clinical hospital operations with digital health standards (HL7/FHIR), electronic health records, and clinical outcome analytics.",
    "growthRate": "+31% (High Demand)",
    "medianSalary": "$92,000 / \u20b911-22 LPA",
    "scope": "Hospitals, medical diagnostic networks, health-tech startups, and pharma clinical research organizations.",
    "subCareers": [
      "Medical EHR Systems Specialist",
      "Clinical Trial Data Manager",
      "Telemedicine Systems Engineer"
    ],
    "roles": [
      {
        "id": "role-health-ehrs",
        "title": "Hospital Systems Informatics Officer",
        "responsibilities": [
          "Maintain EHR data flow and compliance",
          "Ensure FHIR protocol integrations",
          "Audit patient data security"
        ],
        "requiredSkillIds": [
          "skill-ehr-systems",
          "skill-sql"
        ],
        "readinessCriteria": "HL7/FHIR standard compliance and hospital database query handling.",
        "entrySalary": "$72,000"
      }
    ],
    "requiredSkillIds": [
      "skill-ehr-systems",
      "skill-clinical-stats",
      "skill-sql",
      "skill-biomed-diagnostics",
      "skill-stats"
    ],
    "prerequisites": [
      "Paramedical / Anatomy fundamentals",
      "Information systems basics"
    ],
    "relatedCareerIds": [
      "career-data-analyst",
      "career-telemedicine-coord"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-ehr-systems",
          "skillName": "EHR & Health Protocols (HL7/FHIR)",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-sql",
          "skillName": "SQL & Relational Databases",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-clinical-stats",
          "skillName": "Biostatistics & Clinical Trial Analytics",
          "importance": "mandatory",
          "targetProficiency": 70
        },
        {
          "skillId": "skill-biomed-diagnostics",
          "skillName": "Biomedical Diagnostic Systems & Quality",
          "importance": "recommended",
          "targetProficiency": 65
        }
      ],
      "prerequisiteCourses": [
        "Medical Terminology & Ethics",
        "Healthcare Data Standards"
      ],
      "recommendedProjects": [
        "FHIR REST API Medical Record Interoperability Bridge",
        "Clinical Trial Patient Retention Dashboard"
      ],
      "emergingSkills": [
        "AI-assisted Radiology Triage",
        "Genomic Data Pipelines"
      ],
      "readinessThreshold": 75
    },
    "iconName": "HeartPulse"
  },
  {
    "id": "career-diagnostic-lab-spec",
    "title": "Biomedical Diagnostic Lab Specialist",
    "discipline": "paramedical",
    "category": "Diagnostic Medicine",
    "description": "Manage automated clinical pathology laboratories, molecular diagnostic assays, quality control indices, and biomarker interpretation.",
    "growthRate": "+25% (High)",
    "medianSalary": "$72,000 / \u20b97-15 LPA",
    "scope": "Diagnostic lab chains, tertiary hospital pathology departments, blood banks, and clinical CROs.",
    "subCareers": [
      "Molecular Diagnostics Technologist",
      "Clinical Biochemistry Lead"
    ],
    "roles": [
      {
        "id": "role-mlt-lead",
        "title": "Senior Medical Laboratory Technologist",
        "responsibilities": [
          "Run ELISA & PCR panels",
          "Calibrate automated hematology analyzers",
          "Sign off on IQC deviations"
        ],
        "requiredSkillIds": [
          "skill-biomed-diagnostics",
          "skill-clinical-stats"
        ],
        "readinessCriteria": "Precision pipetting, auto-analyzer troubleshooting, and Westgard rule application.",
        "entrySalary": "$52,000"
      }
    ],
    "requiredSkillIds": [
      "skill-biomed-diagnostics",
      "skill-clinical-stats",
      "skill-ehr-systems"
    ],
    "prerequisites": [
      "Pathology fundamentals",
      "Medical biochemistry"
    ],
    "relatedCareerIds": [
      "career-health-informatics",
      "career-food-tech-qa"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-biomed-diagnostics",
          "skillName": "Biomedical Diagnostic Systems & Quality",
          "importance": "mandatory",
          "targetProficiency": 90
        },
        {
          "skillId": "skill-clinical-stats",
          "skillName": "Biostatistics & Clinical Trial Analytics",
          "importance": "mandatory",
          "targetProficiency": 70
        },
        {
          "skillId": "skill-ehr-systems",
          "skillName": "EHR & Health Protocols (HL7/FHIR)",
          "importance": "recommended",
          "targetProficiency": 60
        }
      ],
      "prerequisiteCourses": [
        "Clinical Hematology & Immuno-hematology",
        "Molecular Pathology"
      ],
      "recommendedProjects": [
        "Laboratory Westgard QC Deviation & Calibration Tracker"
      ],
      "emergingSkills": [
        "Next-Gen Molecular Diagnostics (ddPCR)",
        "Digital Pathology Image Analysis"
      ],
      "readinessThreshold": 76
    },
    "iconName": "HeartPulse"
  },
  {
    "id": "career-telemedicine-coord",
    "title": "Telemedicine & Remote Care Coordinator",
    "discipline": "paramedical",
    "category": "Digital Health",
    "description": "Orchestrate virtual clinical triage, remote patient physiological telemetry, and chronic disease digital monitoring protocols.",
    "growthRate": "+34% (Explosive)",
    "medianSalary": "$75,000 / \u20b98-16 LPA",
    "scope": "Telehealth providers, health insurance digital programs, home-health agencies, and chronic care networks.",
    "subCareers": [
      "Virtual Health Triage Nurse",
      "RPM Device Implementation Specialist"
    ],
    "roles": [
      {
        "id": "role-telemed-officer",
        "title": "Remote Patient Monitoring Coordinator",
        "responsibilities": [
          "Monitor daily cardiac & diabetic telemetry feeds",
          "Trigger urgent clinician interventions",
          "Educate patients on RPM wearables"
        ],
        "requiredSkillIds": [
          "skill-telemed-protocols",
          "skill-ehr-systems"
        ],
        "readinessCriteria": "Virtual triage protocols, telemetry alert escalations, and empathetic patient engagement.",
        "entrySalary": "$58,000"
      }
    ],
    "requiredSkillIds": [
      "skill-telemed-protocols",
      "skill-ehr-systems",
      "skill-clinical-stats"
    ],
    "prerequisites": [
      "Clinical nursing / paramedical care",
      "Communication"
    ],
    "relatedCareerIds": [
      "career-health-informatics",
      "career-physiotherapy-rehab"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-telemed-protocols",
          "skillName": "Telemedicine & Remote Patient Monitoring (RPM)",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-ehr-systems",
          "skillName": "EHR & Health Protocols (HL7/FHIR)",
          "importance": "mandatory",
          "targetProficiency": 75
        }
      ],
      "prerequisiteCourses": [
        "Virtual Clinical Care Standards",
        "Patient Health Engagement"
      ],
      "recommendedProjects": [
        "Chronic Heart Failure Remote Telemetry Escalation Workflow"
      ],
      "emergingSkills": [
        "AI-driven Symptom Checkers",
        "Continuous Glucose Monitor (CGM) Streaming"
      ],
      "readinessThreshold": 72
    },
    "iconName": "HeartPulse"
  },
  {
    "id": "career-physiotherapy-rehab",
    "title": "Physiotherapy & Movement Rehabilitation Specialist",
    "discipline": "paramedical",
    "category": "Rehabilitation Medicine",
    "description": "Evaluate musculoskeletal kinematics, craft evidence-based physical rehabilitation protocols, and utilize EMG motion feedback.",
    "growthRate": "+24% (Strong)",
    "medianSalary": "$80,000 / \u20b98-18 LPA",
    "scope": "Sports injury clinics, orthopedic hospitals, neuro-rehabilitation centers, and professional sports franchises.",
    "subCareers": [
      "Sports Kinematics Specialist",
      "Neuro-Rehabilitation Clinician"
    ],
    "roles": [
      {
        "id": "role-physio-lead",
        "title": "Clinical Movement Specialist",
        "responsibilities": [
          "Conduct dynamic gait analysis",
          "Design progressive resistance exercise regimens",
          "Apply therapeutic modalities"
        ],
        "requiredSkillIds": [
          "skill-physio-biomech",
          "skill-clinical-stats"
        ],
        "readinessCriteria": "Biomechanical gait assessment and individualized rehabilitation protocol design.",
        "entrySalary": "$60,000"
      }
    ],
    "requiredSkillIds": [
      "skill-physio-biomech",
      "skill-clinical-stats",
      "skill-telemed-protocols"
    ],
    "prerequisites": [
      "Anatomy & Physiology",
      "Exercise Physiology"
    ],
    "relatedCareerIds": [
      "career-telemedicine-coord",
      "career-biomedical-engineer"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-physio-biomech",
          "skillName": "Biomechanics & Movement Analysis",
          "importance": "mandatory",
          "targetProficiency": 88
        },
        {
          "skillId": "skill-clinical-stats",
          "skillName": "Biostatistics & Clinical Trial Analytics",
          "importance": "recommended",
          "targetProficiency": 65
        }
      ],
      "prerequisiteCourses": [
        "Kinesiology & Biomechanics",
        "Orthopedic Physical Therapy"
      ],
      "recommendedProjects": [
        "Post-ACL Reconstruction Return-to-Sport Motion Assessment Protocol"
      ],
      "emergingSkills": [
        "Wearable IMU Gait Sensors",
        "Virtual Reality Motor Rehabilitation"
      ],
      "readinessThreshold": 75
    },
    "iconName": "HeartPulse"
  },
  {
    "id": "career-fintech-quant",
    "title": "FinTech Quantitative Analyst",
    "discipline": "commerce",
    "category": "Finance & Technology",
    "description": "Apply computational modeling, financial valuation, and regulatory automation to capital markets and digital payment systems.",
    "growthRate": "+25% (High)",
    "medianSalary": "$115,000 / \u20b914-28 LPA",
    "scope": "Investment banking, hedge funds, neobanks, payment gateways, and risk rating institutions.",
    "subCareers": [
      "Credit Risk Modeler",
      "Financial Valuation Analyst",
      "RegTech & AML Officer"
    ],
    "roles": [
      {
        "id": "role-fin-quant",
        "title": "Quantitative Risk Analyst",
        "responsibilities": [
          "Build credit scoring algorithms",
          "Perform Monte Carlo simulations",
          "Automate regulatory risk reports"
        ],
        "requiredSkillIds": [
          "skill-fin-modeling",
          "skill-stats",
          "skill-python",
          "skill-algo-trading"
        ],
        "readinessCriteria": "Strong DCF + stochastic modeling + algorithmic backtesting.",
        "entrySalary": "$90,000"
      }
    ],
    "requiredSkillIds": [
      "skill-fin-modeling",
      "skill-algo-trading",
      "skill-fin-compliance",
      "skill-stats",
      "skill-python",
      "skill-sql"
    ],
    "prerequisites": [
      "Corporate finance principles",
      "Probability and statistics"
    ],
    "relatedCareerIds": [
      "career-data-analyst",
      "career-supply-chain-analyst"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-fin-modeling",
          "skillName": "Financial Modeling & Valuation",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-algo-trading",
          "skillName": "Quantitative Risk & Algorithmic Trading",
          "importance": "mandatory",
          "targetProficiency": 75
        },
        {
          "skillId": "skill-fin-compliance",
          "skillName": "Anti-Money Laundering & RegTech Compliance",
          "importance": "recommended",
          "targetProficiency": 70
        },
        {
          "skillId": "skill-python",
          "skillName": "Python Programming",
          "importance": "mandatory",
          "targetProficiency": 70
        }
      ],
      "prerequisiteCourses": [
        "Financial Accounting & Statements",
        "Derivatives & Risk Analytics"
      ],
      "recommendedProjects": [
        "Dynamic DCF Valuation Engine with Sensitivity Tables",
        "Algorithmic Pairs Trading Backtester"
      ],
      "emergingSkills": [
        "High-Frequency Order Routing",
        "DeFi Liquidity Pool Modeling"
      ],
      "readinessThreshold": 78
    },
    "iconName": "TrendingUp"
  },
  {
    "id": "career-supply-chain-analyst",
    "title": "Global Supply Chain & Operations Analyst",
    "discipline": "commerce",
    "category": "Operations & Logistics",
    "description": "Optimize global procurement, warehouse throughput, freight cost models, and enterprise SAP inventory allocations.",
    "growthRate": "+23% (High)",
    "medianSalary": "$84,000 / \u20b99-18 LPA",
    "scope": "E-commerce giants, international shipping lines, manufacturing plants, and retail supply chains.",
    "subCareers": [
      "Demand Planning Specialist",
      "Logistics Freight Optimization Lead"
    ],
    "roles": [
      {
        "id": "role-supply-analyst",
        "title": "Supply Chain Optimization Engineer",
        "responsibilities": [
          "Build safety-stock replenishment models",
          "Map supplier lead-time variances",
          "Configure SAP inventory modules"
        ],
        "requiredSkillIds": [
          "skill-supply-chain-erp",
          "skill-sql",
          "skill-data-viz"
        ],
        "readinessCriteria": "Economic Order Quantity (EOQ) modeling, safety stock calculation, and ERP query fluency.",
        "entrySalary": "$64,000"
      }
    ],
    "requiredSkillIds": [
      "skill-supply-chain-erp",
      "skill-sql",
      "skill-data-viz",
      "skill-stats"
    ],
    "prerequisites": [
      "Operations management",
      "Spreadsheet modeling"
    ],
    "relatedCareerIds": [
      "career-data-analyst",
      "career-fintech-quant"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-supply-chain-erp",
          "skillName": "Supply Chain Analytics & SAP/ERP",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-sql",
          "skillName": "SQL & Relational Databases",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-data-viz",
          "skillName": "Data Visualization & BI",
          "importance": "mandatory",
          "targetProficiency": 75
        }
      ],
      "prerequisiteCourses": [
        "Operations Research",
        "Global Logistics Management"
      ],
      "recommendedProjects": [
        "Multi-Echelon Inventory Optimization Model in Python & SQL"
      ],
      "emergingSkills": [
        "Digital Twin Supply Chains",
        "Real-time GPS Freight Telematics"
      ],
      "readinessThreshold": 75
    },
    "iconName": "TrendingUp"
  },
  {
    "id": "career-digital-growth-strat",
    "title": "Digital Growth & Customer Analytics Strategist",
    "discipline": "commerce",
    "category": "Digital Strategy",
    "description": "Drive customer acquisition and lifecycle retention through multi-channel attribution modeling, A/B experiments, and user cohort science.",
    "growthRate": "+26% (Rapid)",
    "medianSalary": "$88,000 / \u20b910-20 LPA",
    "scope": "Direct-to-consumer (D2C) brands, SaaS tech startups, digital agencies, and media powerhouses.",
    "subCareers": [
      "Performance Marketing Lead",
      "Retention & Lifecycle Manager"
    ],
    "roles": [
      {
        "id": "role-growth-lead",
        "title": "Growth Marketing Analyst",
        "responsibilities": [
          "Run statistical A/B test experiments",
          "Model customer lifetime value (LTV)",
          "Optimize conversion funnels"
        ],
        "requiredSkillIds": [
          "skill-growth-analytics",
          "skill-data-viz",
          "skill-stats"
        ],
        "readinessCriteria": "Hypothesis testing, multi-touch attribution, and retention cohort analysis.",
        "entrySalary": "$66,000"
      }
    ],
    "requiredSkillIds": [
      "skill-growth-analytics",
      "skill-data-viz",
      "skill-stats",
      "skill-sql"
    ],
    "prerequisites": [
      "Principles of marketing",
      "Basic data visualization"
    ],
    "relatedCareerIds": [
      "career-data-analyst",
      "career-uiux-systems-designer"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-growth-analytics",
          "skillName": "Digital Growth & Customer Analytics",
          "importance": "mandatory",
          "targetProficiency": 88
        },
        {
          "skillId": "skill-data-viz",
          "skillName": "Data Visualization & BI",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-stats",
          "skillName": "Applied Statistics & Probability",
          "importance": "recommended",
          "targetProficiency": 70
        }
      ],
      "prerequisiteCourses": [
        "Digital Marketing & SEO",
        "Applied Marketing Analytics"
      ],
      "recommendedProjects": [
        "SaaS Acquisition Funnel & Churn Predictor Dashboard"
      ],
      "emergingSkills": [
        "AI-driven Copy Personalization",
        "First-Party Data Clean Rooms"
      ],
      "readinessThreshold": 76
    },
    "iconName": "TrendingUp"
  },
  {
    "id": "career-uiux-systems-designer",
    "title": "Product & UI/UX Systems Designer",
    "discipline": "design_media",
    "category": "Product Design",
    "description": "Architect scalable multi-platform design systems, conduct empirical user research, and craft high-fidelity interactive digital experiences.",
    "growthRate": "+22% (High)",
    "medianSalary": "$95,000 / \u20b911-22 LPA",
    "scope": "Tech companies, digital product studios, consumer software apps, and fin-tech platforms.",
    "subCareers": [
      "Design Systems Engineer",
      "UX Researcher",
      "Interaction Designer"
    ],
    "roles": [
      {
        "id": "role-uiux-senior",
        "title": "Senior Product Designer",
        "responsibilities": [
          "Create multi-brand design tokens in Figma",
          "Execute usability test interviews",
          "Ensure WCAG AAA accessibility"
        ],
        "requiredSkillIds": [
          "skill-design-systems",
          "skill-ux-research"
        ],
        "readinessCriteria": "Figma component variables, interactive prototyping, and empirical user testing.",
        "entrySalary": "$75,000"
      }
    ],
    "requiredSkillIds": [
      "skill-design-systems",
      "skill-ux-research",
      "skill-data-viz"
    ],
    "prerequisites": [
      "Visual design principles",
      "Human-computer interaction basics"
    ],
    "relatedCareerIds": [
      "career-digital-growth-strat",
      "career-game-vfx-developer"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-design-systems",
          "skillName": "Figma & Design Systems Engineering",
          "importance": "mandatory",
          "targetProficiency": 90
        },
        {
          "skillId": "skill-ux-research",
          "skillName": "User Research & Journey Mapping",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-data-viz",
          "skillName": "Data Visualization & BI",
          "importance": "recommended",
          "targetProficiency": 60
        }
      ],
      "prerequisiteCourses": [
        "Human-Centered Design",
        "Information Architecture"
      ],
      "recommendedProjects": [
        "End-to-End Enterprise SaaS Design System & Interactive Prototype in Figma"
      ],
      "emergingSkills": [
        "Spatial UI for Apple Vision Pro",
        "Design-to-Code Token Automation"
      ],
      "readinessThreshold": 78
    },
    "iconName": "Layout"
  },
  {
    "id": "career-game-vfx-developer",
    "title": "Game Systems & Interactive VFX Developer",
    "discipline": "design_media",
    "category": "Interactive Media",
    "description": "Develop physics-driven game mechanics, real-time procedural shaders, and 3D spatial environments in Unity and Unreal Engine.",
    "growthRate": "+27% (Surging)",
    "medianSalary": "$96,000 / \u20b912-25 LPA",
    "scope": "AAA gaming studios, indie game publishers, virtual production film sets, and architectural VR visualization.",
    "subCareers": [
      "Technical Artist",
      "Gameplay Systems Programmer",
      "3D Environment Artist"
    ],
    "roles": [
      {
        "id": "role-gameplay-prog",
        "title": "Gameplay Programmer",
        "responsibilities": [
          "Code character movement physics in Unity C#",
          "Author Niagara particle systems in Unreal",
          "Optimize draw calls"
        ],
        "requiredSkillIds": [
          "skill-game-engines",
          "skill-3d-modeling"
        ],
        "readinessCriteria": "Real-time 60fps frame budgeting, C# gameplay architecture, and PBR shader compilation.",
        "entrySalary": "$72,000"
      }
    ],
    "requiredSkillIds": [
      "skill-game-engines",
      "skill-3d-modeling",
      "skill-python"
    ],
    "prerequisites": [
      "Object-oriented programming",
      "3D math (vectors & quaternions)"
    ],
    "relatedCareerIds": [
      "career-uiux-systems-designer",
      "career-ai-engineer"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-game-engines",
          "skillName": "Unity & Unreal Interactive Systems",
          "importance": "mandatory",
          "targetProficiency": 88
        },
        {
          "skillId": "skill-3d-modeling",
          "skillName": "3D Spatial Modeling & Shader VFX",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Computer Graphics & Shaders",
        "Game Mechanics Design"
      ],
      "recommendedProjects": [
        "Action-Adventure Game Vertical Slice with Custom HLSL Shaders"
      ],
      "emergingSkills": [
        "Procedural World Generation with Houdini",
        "Real-time Raytracing Optimization"
      ],
      "readinessThreshold": 78
    },
    "iconName": "Layout"
  },
  {
    "id": "career-computational-biologist",
    "title": "Computational Biologist & Genomics Scientist",
    "discipline": "arts_science",
    "category": "Bioinformatics",
    "description": "Analyze high-throughput DNA sequencing, model macromolecular protein structures, and accelerate drug target discovery using code.",
    "growthRate": "+29% (High Growth)",
    "medianSalary": "$105,000 / \u20b914-26 LPA",
    "scope": "Biotech pharma firms, genome research institutes, precision oncology centers, and agricultural genetics labs.",
    "subCareers": [
      "NGS Pipeline Developer",
      "Structural Bioinformatician"
    ],
    "roles": [
      {
        "id": "role-comp-bio",
        "title": "Bioinformatics Pipeline Scientist",
        "responsibilities": [
          "Run RNA-seq differential expression",
          "Variant call whole-exome sequencing files",
          "Model protein-ligand docks"
        ],
        "requiredSkillIds": [
          "skill-comp-bio",
          "skill-python",
          "skill-stats"
        ],
        "readinessCriteria": "NGS pipeline orchestration, Biopython scripting, and statistical significance testing.",
        "entrySalary": "$82,000"
      }
    ],
    "requiredSkillIds": [
      "skill-comp-bio",
      "skill-python",
      "skill-stats",
      "skill-sql"
    ],
    "prerequisites": [
      "Genetics & Molecular Biology",
      "Python programming"
    ],
    "relatedCareerIds": [
      "career-ai-engineer",
      "career-health-informatics"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-comp-bio",
          "skillName": "Computational Genomics & Bioinformatics",
          "importance": "mandatory",
          "targetProficiency": 90
        },
        {
          "skillId": "skill-python",
          "skillName": "Python Programming",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-stats",
          "skillName": "Applied Statistics & Probability",
          "importance": "mandatory",
          "targetProficiency": 80
        }
      ],
      "prerequisiteCourses": [
        "Molecular Genetics",
        "Algorithmic Bioinformatics"
      ],
      "recommendedProjects": [
        "Automated Cancer RNA-Seq Differential Expression & Pathway Enrichment Pipeline"
      ],
      "emergingSkills": [
        "Single-Cell Spatial Transcriptomics",
        "AlphaFold Protein Folding Pipelines"
      ],
      "readinessThreshold": 80
    },
    "iconName": "Atom"
  },
  {
    "id": "career-applied-math-quant",
    "title": "Applied Quantitative Economist & Policy Analyst",
    "discipline": "arts_science",
    "category": "Quantitative Science",
    "description": "Model macro-economic trends, evaluate public policy impact through econometrics, and forecast monetary market liquidity.",
    "growthRate": "+21% (Steady)",
    "medianSalary": "$94,000 / \u20b911-22 LPA",
    "scope": "Central banks, international development agencies (World Bank/IMF), economic think tanks, and policy consulting.",
    "subCareers": [
      "Macroeconomic Forecaster",
      "Public Policy Impact Evaluator"
    ],
    "roles": [
      {
        "id": "role-quant-econ",
        "title": "Quantitative Policy Researcher",
        "responsibilities": [
          "Estimate econometric panel regressions",
          "Conduct difference-in-differences impact assessments",
          "Publish policy briefs"
        ],
        "requiredSkillIds": [
          "skill-econometrics",
          "skill-stats",
          "skill-python"
        ],
        "readinessCriteria": "Stochastic economic modeling, instrumental variables, and econometric causal inference.",
        "entrySalary": "$72,000"
      }
    ],
    "requiredSkillIds": [
      "skill-econometrics",
      "skill-stats",
      "skill-python",
      "skill-data-viz"
    ],
    "prerequisites": [
      "Micro & Macro economics",
      "Calculus and linear algebra"
    ],
    "relatedCareerIds": [
      "career-fintech-quant",
      "career-data-analyst"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-econometrics",
          "skillName": "Econometric Modeling & Quantitative Policy",
          "importance": "mandatory",
          "targetProficiency": 88
        },
        {
          "skillId": "skill-stats",
          "skillName": "Applied Statistics & Probability",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-python",
          "skillName": "Python Programming",
          "importance": "recommended",
          "targetProficiency": 70
        }
      ],
      "prerequisiteCourses": [
        "Intermediate Econometrics",
        "Mathematical Economics"
      ],
      "recommendedProjects": [
        "Empirical Policy Impact Analysis of Renewable Energy Subsidies on Industrial Output"
      ],
      "emergingSkills": [
        "Machine Learning in Causal Inference",
        "High-Frequency Inflation Nowcasting"
      ],
      "readinessThreshold": 78
    },
    "iconName": "Atom"
  },
  {
    "id": "career-cyber-law-analyst",
    "title": "Cyber Law & AI Governance Analyst",
    "discipline": "law_governance",
    "category": "Technology Law",
    "description": "Ensure corporate compliance with international data privacy statutes (GDPR/DPDP), audit AI models for algorithmic bias, and draft tech IP agreements.",
    "growthRate": "+32% (Surging Need)",
    "medianSalary": "$110,000 / \u20b914-28 LPA",
    "scope": "Tech corporations, international law firms, privacy consulting practices, and regulatory oversight authorities.",
    "subCareers": [
      "Data Protection Officer (DPO)",
      "AI Ethics & Model Compliance Auditor"
    ],
    "roles": [
      {
        "id": "role-privacy-counsel",
        "title": "Data Privacy Compliance Specialist",
        "responsibilities": [
          "Draft Data Protection Impact Assessments (DPIAs)",
          "Audit AI model training datasets for copyright and bias",
          "Manage cross-border data transfer compliance"
        ],
        "requiredSkillIds": [
          "skill-cyber-law",
          "skill-ai-ethics"
        ],
        "readinessCriteria": "GDPR/DPDP statutory fluency and algorithmic audit framework application.",
        "entrySalary": "$85,000"
      }
    ],
    "requiredSkillIds": [
      "skill-cyber-law",
      "skill-ai-ethics",
      "skill-cybersec"
    ],
    "prerequisites": [
      "Jurisprudence / legal fundamentals",
      "Basic understanding of computer systems"
    ],
    "relatedCareerIds": [
      "career-cybersec-architect",
      "career-fintech-quant"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-cyber-law",
          "skillName": "Cyber Law, GDPR & Data Privacy Governance",
          "importance": "mandatory",
          "targetProficiency": 90
        },
        {
          "skillId": "skill-ai-ethics",
          "skillName": "AI Ethics, Governance & Model Auditing",
          "importance": "mandatory",
          "targetProficiency": 85
        },
        {
          "skillId": "skill-cybersec",
          "skillName": "Network & Cloud Security",
          "importance": "recommended",
          "targetProficiency": 65
        }
      ],
      "prerequisiteCourses": [
        "Cyber Law & Internet Governance",
        "Intellectual Property in Digital Age"
      ],
      "recommendedProjects": [
        "Comprehensive GDPR & AI Act Compliance Framework for Generative AI SaaS"
      ],
      "emergingSkills": [
        "Synthetic Data Privacy Licensing",
        "Autonomous Agent Liability Audits"
      ],
      "readinessThreshold": 78
    },
    "iconName": "Shield"
  },
  {
    "id": "career-smart-hospitality-mgr",
    "title": "Smart Hospitality & Revenue Strategy Manager",
    "discipline": "hospitality",
    "category": "Hospitality Management",
    "description": "Leverage property management systems (PMS), dynamic room pricing algorithms, and luxury guest experience analytics to maximize hotel RevPAR.",
    "growthRate": "+23% (Strong Rebound)",
    "medianSalary": "$82,000 / \u20b99-18 LPA",
    "scope": "Luxury hotel chains, integrated mega-resorts, airline hospitality networks, and boutique travel conglomerates.",
    "subCareers": [
      "Hotel Revenue Director",
      "Luxury Guest Experience Architect"
    ],
    "roles": [
      {
        "id": "role-rev-mgr",
        "title": "Hospitality Revenue Strategist",
        "responsibilities": [
          "Set dynamic room pricing matrices",
          "Audit OTA channel commission costs",
          "Monitor guest satisfaction Net Promoter Scores"
        ],
        "requiredSkillIds": [
          "skill-hospitality-pms",
          "skill-data-viz"
        ],
        "readinessCriteria": "RevPAR optimization, Opera PMS reporting, and yield management forecasting.",
        "entrySalary": "$62,000"
      }
    ],
    "requiredSkillIds": [
      "skill-hospitality-pms",
      "skill-event-logistics",
      "skill-data-viz",
      "skill-stats"
    ],
    "prerequisites": [
      "Hospitality operations fundamentals",
      "Commercial arithmetic"
    ],
    "relatedCareerIds": [
      "career-digital-growth-strat",
      "career-supply-chain-analyst"
    ],
    "benchmark": {
      "requiredSkills": [
        {
          "skillId": "skill-hospitality-pms",
          "skillName": "Hospitality PMS & Revenue Yield Management",
          "importance": "mandatory",
          "targetProficiency": 88
        },
        {
          "skillId": "skill-event-logistics",
          "skillName": "Event Operations & Luxury Guest Experience",
          "importance": "mandatory",
          "targetProficiency": 80
        },
        {
          "skillId": "skill-data-viz",
          "skillName": "Data Visualization & BI",
          "importance": "recommended",
          "targetProficiency": 70
        }
      ],
      "prerequisiteCourses": [
        "Hotel Revenue Management",
        "Luxury Brand Customer Experience"
      ],
      "recommendedProjects": [
        "Dynamic Hotel RevPAR Yield Pricing Model with Channel Distribution Matrix"
      ],
      "emergingSkills": [
        "Keyless IoT Mobile Guest Journeys",
        "AI Concierge Conversational Agents"
      ],
      "readinessThreshold": 75
    },
    "iconName": "Award"
  }
];

export const SEED_ASSESSMENTS: Assessment[] = [
  // 1. SQL Diagnostic
  {
    id: 'assess-sql-diagnostic',
    skillId: 'skill-sql',
    title: 'SQL & Relational Querying Diagnostic',
    type: 'diagnostic',
    discipline: 'engineering',
    passingScore: 70,
    questions: [
      {
        id: 'q-sql-1',
        question: 'Which SQL clause is used to filter aggregated group results rather than individual table rows?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        correctIndex: 1,
        explanation: 'The HAVING clause filters aggregated rows produced by GROUP BY, while WHERE filters raw rows before grouping.',
        skillTopic: 'Aggregations & Filtering',
        difficulty: 'easy'
      },
      {
        id: 'q-sql-2',
        question: 'What is the key difference between ROW_NUMBER() and DENSE_RANK() window functions when handling ties?',
        options: [
          'ROW_NUMBER assigns distinct consecutive integers, while DENSE_RANK assigns the same rank to ties without skipping subsequent ranks.',
          'DENSE_RANK skips rank numbers after a tie (e.g. 1, 2, 2, 4).',
          'ROW_NUMBER requires a PARTITION BY clause while DENSE_RANK does not.',
          'There is no difference between them.'
        ],
        correctIndex: 0,
        explanation: 'ROW_NUMBER always produces unique consecutive numbers (1, 2, 3), whereas DENSE_RANK gives tied rows identical ranks and proceeds to the next integer without gaps (1, 2, 2, 3).',
        skillTopic: 'Window Functions',
        difficulty: 'medium'
      },
      {
        id: 'q-sql-3',
        question: 'Which index type is best suited for accelerating equality and range queries on high-cardinality primary keys in B-Tree relational storage?',
        options: ['Clustered B-Tree Index', 'Bitmap Index', 'Hash Index (for range queries)', 'Full-text Inverted Index'],
        correctIndex: 0,
        explanation: 'Clustered B-Tree indexes physically organize table data in sorted order, providing optimal O(log N) lookups for both equality and range scans.',
        skillTopic: 'Index Optimization',
        difficulty: 'hard'
      }
    ]
  },

  // 2. Python Diagnostic
  {
    id: 'assess-python-diagnostic',
    skillId: 'skill-python',
    title: 'Python Core & Data Manipulation Diagnostic',
    type: 'diagnostic',
    discipline: 'engineering',
    passingScore: 70,
    questions: [
      {
        id: 'q-py-1',
        question: 'In Pandas, what is the most memory-efficient method to filter and compute a column across a 10M row DataFrame without Python-level iteration overhead?',
        options: ['df.iterrows()', 'df.apply(lambda x: ...)', 'Vectorized NumPy/Pandas boolean indexing and operations', 'for loop with df.iloc[]'],
        correctIndex: 2,
        explanation: 'Vectorized operations leverage underlying C/SIMD instructions, running orders of magnitude faster than Python-level loops or apply.',
        skillTopic: 'Vectorization & Performance',
        difficulty: 'medium'
      },
      {
        id: 'q-py-2',
        question: 'What happens when a mutable default parameter (like a list `def fn(x=[])`) is used in a Python function?',
        options: [
          'A new list is created each time the function is called.',
          'The default list is created once at function definition time and shared across all calls that omit the parameter.',
          'Python raises a SyntaxError at compile time.',
          'The list is automatically cleared after function return.'
        ],
        correctIndex: 1,
        explanation: 'Default argument values in Python are evaluated once when the function definition is executed, mutating across subsequent invocations.',
        skillTopic: 'Object Reference & Functions',
        difficulty: 'medium'
      }
    ]
  },

  // 3. AgTech Telemetry Diagnostic
  {
    id: 'assess-agtech-telemetry',
    skillId: 'skill-soil-sensors',
    title: 'AgTech IoT Sensors & Telemetry Diagnostic',
    type: 'topic',
    discipline: 'agriculture',
    passingScore: 70,
    questions: [
      {
        id: 'q-ag-1',
        question: 'Why is LoRaWAN preferred over standard Wi-Fi or Bluetooth for field-wide agricultural soil moisture telemetry?',
        options: [
          'LoRaWAN provides ultra-high 4K video bandwidth.',
          'LoRaWAN offers long-range (10-15 km) low-power transmission on sub-GHz frequencies, enabling multi-year battery operation in remote farms.',
          'LoRaWAN requires high-voltage AC power.',
          'Wi-Fi has longer physical penetration range through thick soil.'
        ],
        correctIndex: 1,
        explanation: 'LoRaWAN provides long-range sub-GHz RF modulation with minimal power draw, ideal for sending periodic sensor readings across large acreage.',
        skillTopic: 'Wireless Telemetry',
        difficulty: 'easy'
      },
      {
        id: 'q-ag-2',
        question: 'When computing Normalized Difference Vegetation Index (NDVI) from multispectral satellite imagery, which optical bands are combined?',
        options: [
          '(NIR - Red) / (NIR + Red)',
          '(Blue - Green) / (Blue + Green)',
          '(Red - Thermal) / (Red + Thermal)',
          '(Green - NIR) / (Green + NIR)'
        ],
        correctIndex: 0,
        explanation: 'Healthy chlorophyll strongly absorbs Red light and reflects Near-Infrared (NIR), making (NIR - Red) / (NIR + Red) the standardized index for vegetation density.',
        skillTopic: 'GIS Crop Analytics',
        difficulty: 'medium'
      }
    ]
  },

  // 4. Health Informatics FHIR Diagnostic
  {
    id: 'assess-health-fhir',
    skillId: 'skill-ehr-systems',
    title: 'HL7 & FHIR Health Informatics Diagnostic',
    type: 'topic',
    discipline: 'paramedical',
    passingScore: 70,
    questions: [
      {
        id: 'q-hl-1',
        question: 'In modern FHIR (Fast Healthcare Interoperability Resources) architectures, how are clinical entities modeled and exchanged?',
        options: [
          'As discrete RESTful JSON/XML Resources (e.g. Patient, Observation, MedicationRequest) with standard REST verbs (GET, POST, PUT).',
          'As unparsed flat-file pipe-delimited text files over serial cables.',
          'As raw binary memory dumps directly into relational databases.',
          'As proprietary encrypted binary blobs without standard schemas.'
        ],
        correctIndex: 0,
        explanation: 'FHIR defines modular data building blocks (Resources) that can be queried and modified over standard HTTP/REST endpoints with standardized JSON schemas.',
        skillTopic: 'FHIR Standards',
        difficulty: 'medium'
      },
      {
        id: 'q-hl-2',
        question: 'Which medical terminology ontology is primarily used to encode clinical findings, procedures, and anatomical concepts for global EHR interoperability?',
        options: ['SNOMED-CT', 'ASCII-7', 'ISO-9001', 'RGB-Alpha'],
        correctIndex: 0,
        explanation: 'SNOMED-CT is the comprehensive multilingual clinical healthcare terminology used worldwide for structured EHR capture.',
        skillTopic: 'Clinical Ontologies',
        difficulty: 'easy'
      }
    ]
  },

  // 5. FinTech Valuation & Risk Diagnostic
  {
    id: 'assess-fin-quant',
    skillId: 'skill-fin-modeling',
    title: 'Financial Valuation & Risk Analytics Diagnostic',
    type: 'topic',
    discipline: 'commerce',
    passingScore: 70,
    questions: [
      {
        id: 'q-fin-1',
        question: 'In a Discounted Cash Flow (DCF) model, what rate is universally used to discount Unlevered Free Cash Flows to Enterprise Value?',
        options: [
          'Weighted Average Cost of Capital (WACC)',
          'Risk-Free Treasury Yield alone',
          'Cost of Equity without debt weighting',
          'Nominal Inflation Rate'
        ],
        correctIndex: 0,
        explanation: 'Unlevered cash flows belong to both debt and equity providers, requiring the Weighted Average Cost of Capital (WACC) as the blended discount rate.',
        skillTopic: 'DCF Valuation',
        difficulty: 'medium'
      },
      {
        id: 'q-fin-2',
        question: 'What does a 1-day 99% Value at Risk (VaR) of $1,000,000 mean for an investment portfolio?',
        options: [
          'There is a 1% probability that the portfolio will lose more than $1,000,000 over a single trading day under normal market conditions.',
          'The portfolio will definitely lose $1,000,000 tomorrow.',
          'The portfolio maximum profit is capped at $1,000,000.',
          'There is a 99% chance the portfolio will lose $1,000,000.'
        ],
        correctIndex: 0,
        explanation: 'A 99% 1-day VaR measures the maximum expected loss at a 99% confidence level, meaning losses will exceed $1M only on 1 out of 100 trading days.',
        skillTopic: 'Quantitative Risk',
        difficulty: 'medium'
      }
    ]
  },

  // 6. UI/UX Design Systems Diagnostic
  {
    id: 'assess-uiux-systems',
    skillId: 'skill-design-systems',
    title: 'Figma & Design Systems Diagnostic',
    type: 'topic',
    discipline: 'design_media',
    passingScore: 70,
    questions: [
      {
        id: 'q-ux-1',
        question: 'Under WCAG 2.1 Level AA standards, what is the minimum required color contrast ratio for normal body text against its background?',
        options: ['4.5:1', '3:1', '7:1', '2:1'],
        correctIndex: 0,
        explanation: 'WCAG 2.1 Level AA mandates a minimum contrast ratio of 4.5:1 for standard body text (under 18pt regular) and 3:1 for large text.',
        skillTopic: 'Accessibility & WCAG',
        difficulty: 'easy'
      },
      {
        id: 'q-ux-2',
        question: 'What is the primary architectural purpose of utilizing Semantic Design Tokens (e.g. `color.surface.primary`) over Hardcoded Hex Values?',
        options: [
          'Tokens abstract values into logical roles, enabling automated theme swapping (light/dark mode) and cohesive brand synchronization across web and mobile platforms.',
          'Tokens decrease the file size of the React app bundle by 50%.',
          'Tokens prevent users from inspecting the CSS in developer tools.',
          'Tokens force all buttons to remain blue regardless of context.'
        ],
        correctIndex: 0,
        explanation: 'Design tokens provide a platform-agnostic semantic layer connecting design tools (Figma) and codebases (CSS/Tailwind/Swift/Compose).',
        skillTopic: 'Design Tokens',
        difficulty: 'medium'
      }
    ]
  },

  // 7. Cyber Law & GDPR Diagnostic
  {
    id: 'assess-cyber-law',
    skillId: 'skill-cyber-law',
    title: 'Cyber Law, GDPR & Privacy Diagnostic',
    type: 'topic',
    discipline: 'law_governance',
    passingScore: 70,
    questions: [
      {
        id: 'q-law-1',
        question: 'Under GDPR Article 33, within how many hours must an enterprise notify the relevant supervisory authority after becoming aware of a personal data breach posing risk to individuals?',
        options: ['72 hours', '24 hours', '30 days', '7 days'],
        correctIndex: 0,
        explanation: 'GDPR mandates that data controllers notify the supervisory authority without undue delay and, where feasible, not later than 72 hours after becoming aware of the breach.',
        skillTopic: 'Data Breach Governance',
        difficulty: 'easy'
      }
    ]
  },

  // 8. Hospitality Revenue Management Diagnostic
  {
    id: 'assess-hospitality-pms',
    skillId: 'skill-hospitality-pms',
    title: 'Hospitality PMS & RevPAR Optimization Diagnostic',
    type: 'topic',
    discipline: 'hospitality',
    passingScore: 70,
    questions: [
      {
        id: 'q-hosp-1',
        question: 'How is RevPAR (Revenue Per Available Room) calculated in hotel revenue yield management?',
        options: [
          'Occupancy Rate (%) × Average Daily Rate (ADR) OR Total Room Revenue / Total Available Rooms',
          'Total F&B Revenue ÷ Total Number of Guests',
          'Total Booking Inquiries ÷ Marketing Spend',
          'Average Daily Rate ÷ Total Hotel Staff Count'
        ],
        correctIndex: 0,
        explanation: 'RevPAR equals Occupancy % multiplied by ADR, serving as the benchmark metric balancing price and room volume.',
        skillTopic: 'RevPAR Yield Math',
        difficulty: 'easy'
      }
    ]
  }
];

export const SEED_RESOURCES: Resource[] = [
  {
    "id": "res-ext-arm-learning-paths",
    "title": "ARM Learning Paths: Verified Courseware",
    "type": "course",
    "provider": "ARM Learning Paths",
    "url": "https://learn.arm.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for ARM Learning Paths.",
    "embedType": "external"
  },
  {
    "id": "res-ext-asq-learning",
    "title": "ASQ Learning: Verified Courseware",
    "type": "course",
    "provider": "ASQ Learning",
    "url": "https://asq.org/training",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for ASQ Learning.",
    "embedType": "external"
  },
  {
    "id": "res-ext-aws-skill-builder",
    "title": "AWS Skill Builder: Verified Courseware",
    "type": "video",
    "provider": "AWS Skill Builder",
    "url": "https://skillbuilder.aws/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for AWS Skill Builder.",
    "embedType": "external"
  },
  {
    "id": "res-ext-arduino-docs",
    "title": "Arduino Docs: Verified Courseware",
    "type": "documentation",
    "provider": "Arduino Docs",
    "url": "https://docs.arduino.cc/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Arduino Docs.",
    "embedType": "external"
  },
  {
    "id": "res-ext-aspentech-learning",
    "title": "AspenTech Learning: Verified Courseware",
    "type": "course",
    "provider": "AspenTech Learning",
    "url": "https://www.aspentech.com/en/learning",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for AspenTech Learning.",
    "embedType": "external"
  },
  {
    "id": "res-ext-autodesk-construction-cloud-learning",
    "title": "Autodesk Construction Cloud Learning: Verified Courseware",
    "type": "interactive",
    "provider": "Autodesk Construction Cloud Learning",
    "url": "https://www.autodesk.com/learn/ondemand",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Autodesk Construction Cloud Learning.",
    "embedType": "external"
  },
  {
    "id": "res-ext-autodesk-learning",
    "title": "Autodesk Learning: Verified Courseware",
    "type": "course",
    "provider": "Autodesk Learning",
    "url": "https://www.autodesk.com/learning",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Autodesk Learning.",
    "embedType": "external"
  },
  {
    "id": "res-ext-bentley-learn",
    "title": "Bentley Learn: Verified Courseware",
    "type": "course",
    "provider": "Bentley Learn",
    "url": "https://learn.bentley.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Bentley Learn.",
    "embedType": "external"
  },
  {
    "id": "res-ext-cisco-networking-academy",
    "title": "Cisco Networking Academy: Verified Courseware",
    "type": "course",
    "provider": "Cisco Networking Academy",
    "url": "https://www.netacad.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Cisco Networking Academy.",
    "embedType": "external"
  },
  {
    "id": "res-ext-coursera",
    "title": "Coursera: Verified Courseware",
    "type": "course",
    "provider": "Coursera",
    "url": "https://www.coursera.org/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Coursera.",
    "embedType": "external"
  },
  {
    "id": "res-ext-deeplearning-ai",
    "title": "DeepLearning.AI: Verified Courseware",
    "type": "course",
    "provider": "DeepLearning.AI",
    "url": "https://www.deeplearning.ai/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for DeepLearning.AI.",
    "embedType": "external"
  },
  {
    "id": "res-ext-epa-resources",
    "title": "EPA Resources: Verified Courseware",
    "type": "video",
    "provider": "EPA Resources",
    "url": "https://www.epa.gov/education",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for EPA Resources.",
    "embedType": "external"
  },
  {
    "id": "res-ext-electrical-engineering-portal",
    "title": "Electrical Engineering Portal: Verified Courseware",
    "type": "video",
    "provider": "Electrical Engineering Portal",
    "url": "https://electrical-engineering-portal.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Electrical Engineering Portal.",
    "embedType": "external"
  },
  {
    "id": "res-ext-esri-academy",
    "title": "Esri Academy: Verified Courseware",
    "type": "course",
    "provider": "Esri Academy",
    "url": "https://www.esri.com/training/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Esri Academy.",
    "embedType": "external"
  },
  {
    "id": "res-ext-fao-elearning-academy",
    "title": "FAO eLearning Academy: Verified Courseware",
    "type": "course",
    "provider": "FAO eLearning Academy",
    "url": "https://elearning.fao.org/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for FAO eLearning Academy.",
    "embedType": "external"
  },
  {
    "id": "res-ext-freertos-docs",
    "title": "FreeRTOS Docs: Verified Courseware",
    "type": "documentation",
    "provider": "FreeRTOS Docs",
    "url": "https://www.freertos.org/Documentation/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for FreeRTOS Docs.",
    "embedType": "external"
  },
  {
    "id": "res-ext-geeksforgeeks",
    "title": "GeeksforGeeks: Verified Courseware",
    "type": "video",
    "provider": "GeeksforGeeks",
    "url": "https://www.geeksforgeeks.org/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for GeeksforGeeks.",
    "embedType": "external"
  },
  {
    "id": "res-ext-google-career-certificates",
    "title": "Google Career Certificates: Verified Courseware",
    "type": "video",
    "provider": "Google Career Certificates",
    "url": "https://grow.google/certificates/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Google Career Certificates.",
    "embedType": "external"
  },
  {
    "id": "res-ext-google-cloud-skills-boost",
    "title": "Google Cloud Skills Boost: Verified Courseware",
    "type": "course",
    "provider": "Google Cloud Skills Boost",
    "url": "https://www.cloudskillsboost.google/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Google Cloud Skills Boost.",
    "embedType": "external"
  },
  {
    "id": "res-ext-google-data-analytics",
    "title": "Google Data Analytics: Verified Courseware",
    "type": "video",
    "provider": "Google Data Analytics",
    "url": "https://www.coursera.org/professional-certificates/google-data-analytics",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Google Data Analytics.",
    "embedType": "external"
  },
  {
    "id": "res-ext-hdlbits",
    "title": "HDLBits: Verified Courseware",
    "type": "interactive",
    "provider": "HDLBits",
    "url": "https://hdlbits.01xz.net/wiki/Main_Page",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for HDLBits.",
    "embedType": "external"
  },
  {
    "id": "res-ext-hugging-face-learn",
    "title": "Hugging Face Learn: Verified Courseware",
    "type": "course",
    "provider": "Hugging Face Learn",
    "url": "https://huggingface.co/learn",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Hugging Face Learn.",
    "embedType": "external"
  },
  {
    "id": "res-ext-kaggle-learn",
    "title": "Kaggle Learn: Verified Courseware",
    "type": "course",
    "provider": "Kaggle Learn",
    "url": "https://www.kaggle.com/learn",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Kaggle Learn.",
    "embedType": "external"
  },
  {
    "id": "res-ext-keysight-university",
    "title": "Keysight University: Verified Courseware",
    "type": "course",
    "provider": "Keysight University",
    "url": "https://learn.keysight.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Keysight University.",
    "embedType": "external"
  },
  {
    "id": "res-ext-learncheme",
    "title": "LearnChemE: Verified Courseware",
    "type": "course",
    "provider": "LearnChemE",
    "url": "https://learncheme.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for LearnChemE.",
    "embedType": "external"
  },
  {
    "id": "res-ext-leetcode",
    "title": "LeetCode: Verified Courseware",
    "type": "interactive",
    "provider": "LeetCode",
    "url": "https://leetcode.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for LeetCode.",
    "embedType": "external"
  },
  {
    "id": "res-ext-matlab-simulink",
    "title": "MATLAB/Simulink: Verified Courseware",
    "type": "video",
    "provider": "MATLAB/Simulink",
    "url": "https://www.mathworks.com/learn/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for MATLAB/Simulink.",
    "embedType": "external"
  },
  {
    "id": "res-ext-mit-opencourseware",
    "title": "MIT OpenCourseWare: Verified Courseware",
    "type": "course",
    "provider": "MIT OpenCourseWare",
    "url": "https://ocw.mit.edu/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for MIT OpenCourseWare.",
    "embedType": "external"
  },
  {
    "id": "res-ext-mathworks-automotive",
    "title": "MathWorks Automotive: Verified Courseware",
    "type": "video",
    "provider": "MathWorks Automotive",
    "url": "https://www.mathworks.com/solutions/automotive.html",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for MathWorks Automotive.",
    "embedType": "external"
  },
  {
    "id": "res-ext-microsoft-learn",
    "title": "Microsoft Learn: Verified Courseware",
    "type": "course",
    "provider": "Microsoft Learn",
    "url": "https://learn.microsoft.com/training/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Microsoft Learn.",
    "embedType": "external"
  },
  {
    "id": "res-ext-nasa-arset",
    "title": "NASA ARSET: Verified Courseware",
    "type": "video",
    "provider": "NASA ARSET",
    "url": "https://appliedsciences.nasa.gov/what-we-do/capacity-building/arset",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for NASA ARSET.",
    "embedType": "external"
  },
  {
    "id": "res-ext-nasa-stem",
    "title": "NASA STEM: Verified Courseware",
    "type": "video",
    "provider": "NASA STEM",
    "url": "https://www.nasa.gov/stem/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for NASA STEM.",
    "embedType": "external"
  },
  {
    "id": "res-ext-nptel",
    "title": "NPTEL: Verified Courseware",
    "type": "course",
    "provider": "NPTEL",
    "url": "https://nptel.ac.in/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for NPTEL.",
    "embedType": "external"
  },
  {
    "id": "res-ext-portswigger-web-security-academy",
    "title": "PortSwigger Web Security Academy: Verified Courseware",
    "type": "course",
    "provider": "PortSwigger Web Security Academy",
    "url": "https://portswigger.net/web-security",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for PortSwigger Web Security Academy.",
    "embedType": "external"
  },
  {
    "id": "res-ext-primavera-training-via-oracle",
    "title": "Primavera training via Oracle: Verified Courseware",
    "type": "video",
    "provider": "Primavera training via Oracle",
    "url": "https://www.oracle.com/industries/construction-engineering/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Primavera training via Oracle.",
    "embedType": "external"
  },
  {
    "id": "res-ext-qgis-training-manual",
    "title": "QGIS Training Manual: Verified Courseware",
    "type": "documentation",
    "provider": "QGIS Training Manual",
    "url": "https://docs.qgis.org/latest/en/docs/training_manual/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for QGIS Training Manual.",
    "embedType": "external"
  },
  {
    "id": "res-ext-ros-2-documentation",
    "title": "ROS 2 Documentation: Verified Courseware",
    "type": "documentation",
    "provider": "ROS 2 Documentation",
    "url": "https://docs.ros.org/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for ROS 2 Documentation.",
    "embedType": "external"
  },
  {
    "id": "res-ext-rockwell-automation-learning",
    "title": "Rockwell Automation Learning+: Verified Courseware",
    "type": "course",
    "provider": "Rockwell Automation Learning+",
    "url": "https://www.rockwellautomation.com/en-us/support/learning.html",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Rockwell Automation Learning+.",
    "embedType": "external"
  },
  {
    "id": "res-ext-sqlbolt",
    "title": "SQLBolt: Verified Courseware",
    "type": "interactive",
    "provider": "SQLBolt",
    "url": "https://sqlbolt.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for SQLBolt.",
    "embedType": "external"
  },
  {
    "id": "res-ext-siemens-sce",
    "title": "Siemens SCE: Verified Courseware",
    "type": "video",
    "provider": "Siemens SCE",
    "url": "https://www.siemens.com/sce",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Siemens SCE.",
    "embedType": "external"
  },
  {
    "id": "res-ext-the-construct",
    "title": "The Construct: Verified Courseware",
    "type": "interactive",
    "provider": "The Construct",
    "url": "https://www.theconstruct.ai/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for The Construct.",
    "embedType": "external"
  },
  {
    "id": "res-ext-tryhackme",
    "title": "TryHackMe: Verified Courseware",
    "type": "interactive",
    "provider": "TryHackMe",
    "url": "https://tryhackme.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for TryHackMe.",
    "embedType": "external"
  },
  {
    "id": "res-ext-vector-academy",
    "title": "Vector Academy: Verified Courseware",
    "type": "course",
    "provider": "Vector Academy",
    "url": "https://www.vector.com/int/en/know-how/academy/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for Vector Academy.",
    "embedType": "external"
  },
  {
    "id": "res-ext-verilogpro",
    "title": "VerilogPro: Verified Courseware",
    "type": "video",
    "provider": "VerilogPro",
    "url": "https://www.verilogpro.com/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for VerilogPro.",
    "embedType": "external"
  },
  {
    "id": "res-ext-freecodecamp",
    "title": "freeCodeCamp: Verified Courseware",
    "type": "interactive",
    "provider": "freeCodeCamp",
    "url": "https://www.freecodecamp.org/",
    "durationMinutes": 90,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Verified industry platform cited in engineering placement benchmarks for freeCodeCamp.",
    "embedType": "external"
  },
  {
    "id": "res-sql-mastery",
    "title": "Production SQL for Analytics & Data Engineering",
    "type": "interactive",
    "provider": "CareerBridge Interactive Lab",
    "url": "https://sandbox.careerbridge.io/sql-lab",
    "durationMinutes": 45,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Hands-on browser query sandbox with instant feedback on aggregations and window partitions.",
    "embedType": "sandbox"
  },
  {
    "id": "res-py-pandas",
    "title": "Fast-Track Python & Pandas Vectorization",
    "type": "video",
    "provider": "DataCamp & CareerBridge Pro",
    "url": "https://learn.careerbridge.io/python-vectorization",
    "durationMinutes": 35,
    "difficulty": "intermediate",
    "rating": 4.8,
    "whyRecommended": "Essential for accelerating DataFrame ETL pipelines by 50x without Python loop overhead."
  },
  {
    "id": "res-agtech-iot",
    "title": "Deploying LoRaWAN Soil Telemetry Nodes in the Field",
    "type": "article",
    "provider": "AgTech Engineering Quarterly",
    "url": "https://research.careerbridge.io/agtech-lora-blueprint",
    "durationMinutes": 25,
    "difficulty": "intermediate",
    "rating": 4.7,
    "whyRecommended": "Complete wiring schematic, sensor calibration curve formulas, and MQTT gateway code."
  },
  {
    "id": "res-fhir-starter",
    "title": "Building Modern Health Applications with FHIR REST APIs",
    "type": "repo",
    "provider": "HealthIT Open Source & CareerBridge",
    "url": "https://github.com/careerbridge-templates/fhir-health-bridge",
    "durationMinutes": 60,
    "difficulty": "advanced",
    "rating": 4.9,
    "whyRecommended": "Production-ready TypeScript FHIR client with SMART-on-FHIR OAuth2 authentication."
  },
  {
    "id": "res-dcf-valuation",
    "title": "Wall Street 3-Statement & DCF Financial Modeling Masterclass",
    "type": "video",
    "provider": "CFI & FinTech Academy",
    "url": "https://learn.careerbridge.io/fin-modeling-dcf",
    "durationMinutes": 50,
    "difficulty": "intermediate",
    "rating": 4.9,
    "whyRecommended": "Step-by-step Excel and Python valuation template with sensitivity tables."
  },
  {
    "id": "res-figma-tokens",
    "title": "Architecting Scalable Design Tokens in Figma & Tailwind",
    "type": "interactive",
    "provider": "Design Systems Collective",
    "url": "https://sandbox.careerbridge.io/design-tokens-sandbox",
    "durationMinutes": 40,
    "difficulty": "intermediate",
    "rating": 4.8,
    "whyRecommended": "Live playground to configure semantic color, typography, and spacing variables."
  },
  {
    "id": "res-comp-bio-ngs",
    "title": "RNA-Seq Differential Expression with Biopython & DESeq2",
    "type": "repo",
    "provider": "Genomics Data Science Hub",
    "url": "https://github.com/careerbridge-templates/comp-bio-rnaseq",
    "durationMinutes": 55,
    "difficulty": "advanced",
    "rating": 4.9,
    "whyRecommended": "End-to-end bioinformatics pipeline from FASTQ alignment to volcano plot visualization."
  },
  {
    "id": "res-cyber-gdpr",
    "title": "AI Governance & GDPR DPIA Risk Assessment Playbook",
    "type": "article",
    "provider": "International Tech Law Review",
    "url": "https://learn.careerbridge.io/ai-governance-playbook",
    "durationMinutes": 30,
    "difficulty": "intermediate",
    "rating": 4.8,
    "whyRecommended": "Essential legal risk checklist for launching AI and LLM products in the EU & US."
  },
  {
    "id": "res-hotel-revpar",
    "title": "Hotel RevPAR Yield Algorithms & Dynamic Pricing Blueprint",
    "type": "article",
    "provider": "Hospitality Analytics Institute",
    "url": "https://learn.careerbridge.io/hotel-revpar-blueprint",
    "durationMinutes": 30,
    "difficulty": "intermediate",
    "rating": 4.7,
    "whyRecommended": "Learn mathematical optimization for seasonal occupancy curves and OTA channel allocation."
  }
];

export const SEED_USERS: UserAccount[] = [
  // 7 Male Students
  {
    id: 'user-selva',
    profileId: 'student-selva',
    name: 'Selva',
    email: 'selva@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Artificial Intelligence & Data Science',
    studentId: 'STU-ENG-2024-001',
    avatarUrl: '',
    createdAt: '2024-01-10T08:00:00.000Z'
  },
  {
    id: 'user-sabari',
    profileId: 'student-sabari',
    name: 'Sabari',
    email: 'sabari@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    studentId: 'STU-ENG-2024-002',
    avatarUrl: '',
    createdAt: '2024-01-12T08:00:00.000Z'
  },
  {
    id: 'user-ram',
    profileId: 'student-ram',
    name: 'Ram',
    email: 'ram@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    studentId: 'STU-ENG-2024-003',
    avatarUrl: '',
    createdAt: '2024-01-15T08:00:00.000Z'
  },
  {
    id: 'user-gokul',
    profileId: 'student-gokul',
    name: 'Gokul',
    email: 'gokul@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Electrical & Electronics Engineering (EEE)',
    studentId: 'STU-ENG-2024-004',
    avatarUrl: '',
    createdAt: '2024-01-18T08:00:00.000Z'
  },
  {
    id: 'user-sanjay',
    profileId: 'student-sanjay',
    name: 'Sanjay',
    email: 'sanjay@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Mechanical & Robotics Engineering',
    studentId: 'STU-ENG-2024-005',
    avatarUrl: '',
    createdAt: '2024-01-20T08:00:00.000Z'
  },
  {
    id: 'user-kishore',
    profileId: 'student-kishore',
    name: 'Kishore',
    email: 'kishore@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Electronics & Communication (ECE)',
    studentId: 'STU-ENG-2024-006',
    avatarUrl: '',
    createdAt: '2024-01-22T08:00:00.000Z'
  },
  {
    id: 'user-karthick',
    profileId: 'student-karthick',
    name: 'Karthick',
    email: 'karthick@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    studentId: 'STU-ENG-2024-007',
    avatarUrl: '',
    createdAt: '2024-01-25T08:00:00.000Z'
  },

  // 5 Female Students
  {
    id: 'user-kalai',
    profileId: 'student-kalai',
    name: 'Kalai',
    email: 'kalai@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    studentId: 'STU-ENG-2024-008',
    avatarUrl: '',
    createdAt: '2024-01-28T08:00:00.000Z'
  },
  {
    id: 'user-deepa',
    profileId: 'student-deepa',
    name: 'Deepa',
    email: 'deepa@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Artificial Intelligence & Data Science',
    studentId: 'STU-ENG-2024-009',
    avatarUrl: '',
    createdAt: '2024-02-01T08:00:00.000Z'
  },
  {
    id: 'user-seetha',
    profileId: 'student-seetha',
    name: 'Seetha',
    email: 'seetha@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Electronics & Communication (ECE)',
    studentId: 'STU-ENG-2024-010',
    avatarUrl: '',
    createdAt: '2024-02-03T08:00:00.000Z'
  },
  {
    id: 'user-sathya',
    profileId: 'student-sathya',
    name: 'Sathya',
    email: 'sathya@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    studentId: 'STU-ENG-2024-011',
    avatarUrl: '',
    createdAt: '2024-02-05T08:00:00.000Z'
  },
  {
    id: 'user-saranya',
    profileId: 'student-saranya',
    name: 'Saranya',
    email: 'saranya@college.edu',
    password: 'password123',
    role: 'student',
    discipline: 'engineering',
    stream: 'Civil & Environmental Engineering',
    studentId: 'STU-ENG-2024-012',
    avatarUrl: '',
    createdAt: '2024-02-08T08:00:00.000Z'
  },

  // Faculty Mentor & Admin
  {
    id: 'user-mentor-1',
    profileId: '',
    name: 'Dr. Balu Prasath',
    email: 'balu.prasath@university.edu',
    password: 'password123',
    role: 'mentor',
    discipline: 'engineering',
    stream: 'Department of Computing & Engineering Sciences',
    studentId: 'FAC-ENG-904',
    avatarUrl: '',
    createdAt: '2023-09-01T08:00:00.000Z'
  },
  {
    id: 'user-admin-1',
    profileId: '',
    name: 'Ms. Anjali Govindh',
    email: 'admin@careerbridge.io',
    password: 'password123',
    role: 'admin',
    discipline: 'engineering',
    stream: 'Dean of Academic Intelligence & Curriculum Alignment',
    studentId: 'ADM-EXEC-001',
    avatarUrl: '',
    createdAt: '2023-08-01T08:00:00.000Z'
  },
  {
    id: 'user-placement-1',
    profileId: '',
    name: 'Mr. K. Senthil Kumar',
    email: 'placement@college.edu',
    password: 'password123',
    role: 'placement_cell',
    discipline: 'engineering',
    stream: 'Central Placement & Corporate Relations Directorate',
    studentId: 'OFF-PLC-001',
    avatarUrl: '',
    createdAt: '2023-08-15T08:00:00.000Z'
  }
];

export const SEED_PROFILES: StudentProfile[] = [
  // 1. Selva - AI & Data Science
  {
    id: 'student-selva',
    userId: 'user-selva',
    fullName: 'Selva',
    email: 'selva@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Artificial Intelligence & Data Science',
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    yearOfStudy: 3,
    cgpa: 8.85,
    targetCareerId: 'career-ai-engineer',
    interests: ['Deep Learning', 'Generative AI', 'Computer Vision', 'PyTorch Automation'],
    skills: [
      { skillId: 'skill-python', skillName: 'Python Programming', level: 85, verified: true, lastAssessedAt: '2024-03-01' },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 80, verified: true, lastAssessedAt: '2024-03-05' },
      { skillId: 'skill-data-viz', skillName: 'Data Visualization & BI', level: 70, verified: true },
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 65, verified: false }
    ],
    projects: [
      {
        id: 'proj-selva-1',
        title: 'Transformer-Based Code Comprehension Engine',
        description: 'Fine-tuned open-source small language models with LoRA and evaluated inference speed with vLLM.',
        technologies: ['Python', 'PyTorch', 'HuggingFace', 'Transformers'],
        verified: true,
        link: 'https://github.com/selva/code-llm'
      }
    ],
    certifications: ['DeepLearning.AI Machine Learning Specialization', 'NVIDIA Deep Learning Institute Certificate'],
    assessmentScores: {
      'assess-python-diagnostic': 88,
      'assess-sql-diagnostic': 70
    },
    uncertaintyScore: 10,
    readinessScore: {
      overallPercentage: 78,
      technicalScore: 82,
      projectScore: 75,
      problemSolvingScore: 80,
      softSkillScore: 75,
      status: 'competent'
    },
    learningPace: 'accelerated',
    weeklyHoursCommitted: 14,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate',
    completedMilestoneIds: ['ms-ai-1', 'ms-ai-2'],
    completedResourceIds: ['res-py-1', 'res-math-1']
  },

  // 2. Sabari - Computer Science & Engineering (Cloud DevOps)
  {
    id: 'student-sabari',
    userId: 'user-sabari',
    fullName: 'Sabari',
    email: 'sabari@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    degree: 'B.Tech in Computer Science & Engineering',
    yearOfStudy: 4,
    cgpa: 8.4,
    targetCareerId: 'career-cloud-devops',
    interests: ['Cloud Architecture', 'Kubernetes Clusters', 'CI/CD Pipelines', 'Site Reliability'],
    skills: [
      { skillId: 'skill-cloud', skillName: 'Cloud Architecture & DevOps', level: 85, verified: true, lastAssessedAt: '2024-03-02' },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 78, verified: true },
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 72, verified: true },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 60, verified: false }
    ],
    projects: [
      {
        id: 'proj-sabari-1',
        title: 'GitOps Continuous Deployment on Multi-Node K8s',
        description: 'Built zero-downtime Canary release pipelines using ArgoCD, Prometheus alerts, and Terraform.',
        technologies: ['Kubernetes', 'Docker', 'Terraform', 'ArgoCD'],
        verified: true,
        link: 'https://github.com/sabari/gitops-infra'
      }
    ],
    certifications: ['AWS Certified Solutions Architect - Associate', 'Certified Kubernetes Administrator (CKA)'],
    assessmentScores: {
      'assess-cloud-k8s': 86,
      'assess-python-diagnostic': 80
    },
    uncertaintyScore: 12,
    readinessScore: {
      overallPercentage: 82,
      technicalScore: 85,
      projectScore: 84,
      problemSolvingScore: 80,
      softSkillScore: 78,
      status: 'career_ready'
    },
    learningPace: 'steady',
    weeklyHoursCommitted: 12,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate',
    completedMilestoneIds: ['ms-cloud-1'],
    completedResourceIds: ['res-cloud-1']
  },

  // 3. Ram - Cybersecurity & Network Systems
  {
    id: 'student-ram',
    userId: 'user-ram',
    fullName: 'Ram',
    email: 'ram@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    degree: 'B.Tech in Cybersecurity & Network Systems',
    yearOfStudy: 3,
    cgpa: 8.1,
    targetCareerId: 'career-cybersec-architect',
    interests: ['Ethical Hacking', 'SOC Monitoring', 'Incident Triage', 'Cloud Security'],
    skills: [
      { skillId: 'skill-python', skillName: 'Python Programming', level: 70, verified: true },
      { skillId: 'skill-cloud', skillName: 'Cloud Architecture & DevOps', level: 60, verified: false },
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 55, verified: false },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 50, verified: false }
    ],
    projects: [
      {
        id: 'proj-ram-1',
        title: 'SOC Telemetry Pipeline & Suspicious Packet Analyzer',
        description: 'Developed real-time network traffic sniffer with automated Suricata IDS signature matches.',
        technologies: ['Python', 'Suricata', 'Wireshark', 'Elasticsearch'],
        verified: true
      }
    ],
    certifications: ['CompTIA Security+', 'Cisco Certified CyberOps Associate'],
    assessmentScores: {
      'assess-cyber-soc': 74
    },
    uncertaintyScore: 18,
    readinessScore: {
      overallPercentage: 65,
      technicalScore: 68,
      projectScore: 62,
      problemSolvingScore: 65,
      softSkillScore: 72,
      status: 'building'
    },
    learningPace: 'accelerated',
    weeklyHoursCommitted: 10,
    learningStyle: 'hands_on',
    targetTimeline: 'skill_building'
  },

  // 4. Gokul - Electrical & Electronics Engineering
  {
    id: 'student-gokul',
    userId: 'user-gokul',
    fullName: 'Gokul',
    email: 'gokul@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Electrical & Electronics Engineering (EEE)',
    degree: 'B.Tech in Electrical & Electronics Engineering',
    yearOfStudy: 2,
    cgpa: 7.6,
    targetCareerId: 'career-biomedical-engineer',
    interests: ['Embedded Systems', 'Microcontrollers', 'IoT Sensors', 'Power Electronics'],
    skills: [
      { skillId: 'skill-soil-sensors', skillName: 'Soil Sensor & Telemetry Integration', level: 50, verified: false },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 45, verified: false },
      { skillId: 'skill-smart-irrigation', skillName: 'Automated Irrigation & Climate Control', level: 40, verified: false }
    ],
    projects: [],
    certifications: [],
    assessmentScores: {
      'assess-ee-circuits': 52
    },
    uncertaintyScore: 38,
    readinessScore: {
      overallPercentage: 48,
      technicalScore: 50,
      projectScore: 40,
      problemSolvingScore: 50,
      softSkillScore: 65,
      status: 'starting'
    },
    learningPace: 'steady',
    weeklyHoursCommitted: 8,
    learningStyle: 'interactive',
    targetTimeline: 'skill_building'
  },

  // 5. Sanjay - Mechanical & Robotics Engineering
  {
    id: 'student-sanjay',
    userId: 'user-sanjay',
    fullName: 'Sanjay',
    email: 'sanjay@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Mechanical & Robotics Engineering',
    degree: 'B.Tech in Mechanical & Robotics Engineering',
    yearOfStudy: 3,
    cgpa: 8.2,
    targetCareerId: 'career-ai-engineer',
    interests: ['Autonomous Robotics', 'Kinematics', 'ROS 2', 'Computer Vision'],
    skills: [
      { skillId: 'skill-python', skillName: 'Python Programming', level: 74, verified: true },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 65, verified: true },
      { skillId: 'skill-data-viz', skillName: 'Data Visualization & BI', level: 60, verified: false }
    ],
    projects: [
      {
        id: 'proj-sanjay-1',
        title: '6-DOF Robotic Arm Inverse Kinematics Controller',
        description: 'Simulated Pick-and-Place trajectories in Gazebo with Python kinematic solvers.',
        technologies: ['ROS 2', 'Gazebo', 'Python', 'C++'],
        verified: true
      }
    ],
    certifications: ['Certified SOLIDWORKS Associate (CSWA)'],
    assessmentScores: {
      'assess-python-diagnostic': 76
    },
    uncertaintyScore: 15,
    readinessScore: {
      overallPercentage: 68,
      technicalScore: 70,
      projectScore: 68,
      problemSolvingScore: 72,
      softSkillScore: 70,
      status: 'building'
    },
    learningPace: 'accelerated',
    weeklyHoursCommitted: 12,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate'
  },

  // 6. Kishore - Electronics & Communication Engineering
  {
    id: 'student-kishore',
    userId: 'user-kishore',
    fullName: 'Kishore',
    email: 'kishore@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Electronics & Communication (ECE)',
    degree: 'B.Tech in Electronics & Communication Engineering',
    yearOfStudy: 3,
    cgpa: 8.0,
    targetCareerId: 'career-cloud-devops',
    interests: ['Embedded Linux', 'Edge Computing', 'Wireless Telemetry', 'Docker Containers'],
    skills: [
      { skillId: 'skill-cloud', skillName: 'Cloud Architecture & DevOps', level: 62, verified: true },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 68, verified: true },
      { skillId: 'skill-soil-sensors', skillName: 'Soil Sensor & Telemetry Integration', level: 65, verified: false }
    ],
    projects: [
      {
        id: 'proj-kishore-1',
        title: 'LoRaWAN Edge Gateway with Cellular Failover',
        description: 'Deployed an open-source gateway transmitting field telemetry to cloud time-series DB.',
        technologies: ['Raspberry Pi', 'LoRaWAN', 'Python', 'MQTT'],
        verified: true
      }
    ],
    certifications: ['AWS Certified Cloud Practitioner'],
    assessmentScores: {
      'assess-cloud-k8s': 65
    },
    uncertaintyScore: 20,
    readinessScore: {
      overallPercentage: 61,
      technicalScore: 64,
      projectScore: 60,
      problemSolvingScore: 62,
      softSkillScore: 70,
      status: 'building'
    },
    learningPace: 'steady',
    weeklyHoursCommitted: 10,
    learningStyle: 'hands_on',
    targetTimeline: 'skill_building'
  },

  // 7. Karthick - Computer Science & Business Systems
  {
    id: 'student-karthick',
    userId: 'user-karthick',
    fullName: 'Karthick',
    email: 'karthick@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    degree: 'B.Tech in Computer Science & Business Systems',
    yearOfStudy: 4,
    cgpa: 8.6,
    targetCareerId: 'career-data-analyst',
    interests: ['Business Intelligence', 'Enterprise SQL', 'Cohort Retention', 'Financial Modeling'],
    skills: [
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 78, verified: true, lastAssessedAt: '2024-03-04' },
      { skillId: 'skill-data-viz', skillName: 'Data Visualization & BI', level: 75, verified: true },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 70, verified: true },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 68, verified: false }
    ],
    projects: [
      {
        id: 'proj-karthick-1',
        title: 'SaaS Churn and Net Revenue Retention Engine',
        description: 'Constructed recursive SQL views and automated Tableau dashboards to pinpoint churn triggers.',
        technologies: ['PostgreSQL', 'Tableau', 'Python', 'Pandas'],
        verified: true
      }
    ],
    certifications: ['Microsoft Certified: Power BI Data Analyst Associate'],
    assessmentScores: {
      'assess-sql-diagnostic': 82
    },
    uncertaintyScore: 14,
    readinessScore: {
      overallPercentage: 74,
      technicalScore: 76,
      projectScore: 72,
      problemSolvingScore: 75,
      softSkillScore: 78,
      status: 'building'
    },
    learningPace: 'accelerated',
    weeklyHoursCommitted: 12,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate'
  },

  // 8. Kalai - Computer Science & Engineering
  {
    id: 'student-kalai',
    userId: 'user-kalai',
    fullName: 'Kalai',
    email: 'kalai@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    degree: 'B.Tech in Computer Science & Engineering',
    yearOfStudy: 3,
    cgpa: 8.9,
    targetCareerId: 'career-data-analyst',
    interests: ['Data Analytics', 'Business Intelligence', 'Python Automation', 'Executive Dashboards'],
    skills: [
      { skillId: 'skill-python', skillName: 'Python Programming', level: 80, verified: true, lastAssessedAt: '2024-03-01' },
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 62, verified: false, lastAssessedAt: '2024-02-15' },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 74, verified: true, lastAssessedAt: '2024-03-05' },
      { skillId: 'skill-data-viz', skillName: 'Data Visualization & BI', level: 68, verified: false }
    ],
    projects: [
      {
        id: 'proj-kalai-1',
        title: 'Customer Churn Analysis in Retail Banking',
        description: 'Exploratory data analysis using Pandas, Matplotlib, and scikit-learn on a Kaggle customer dataset.',
        technologies: ['Python', 'Pandas', 'Matplotlib'],
        verified: true,
        link: 'https://github.com/kalai/churn-analysis'
      }
    ],
    certifications: ['Google Data Analytics Professional Certificate'],
    assessmentScores: {
      'assess-sql-diagnostic': 72,
      'assess-python-diagnostic': 84
    },
    uncertaintyScore: 12,
    readinessScore: {
      overallPercentage: 72,
      technicalScore: 74,
      projectScore: 68,
      problemSolvingScore: 75,
      softSkillScore: 80,
      status: 'building'
    },
    learningPace: 'accelerated',
    weeklyHoursCommitted: 12,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate',
    completedMilestoneIds: ['ms-da-1'],
    completedResourceIds: ['res-sql-1']
  },

  // 9. Deepa - AI & Machine Learning
  {
    id: 'student-deepa',
    userId: 'user-deepa',
    fullName: 'Deepa',
    email: 'deepa@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Artificial Intelligence & Data Science',
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    yearOfStudy: 4,
    cgpa: 9.2,
    targetCareerId: 'career-ai-engineer',
    interests: ['Natural Language Processing', 'Computer Vision', 'PyTorch', 'MLOps'],
    skills: [
      { skillId: 'skill-python', skillName: 'Python Programming', level: 90, verified: true, lastAssessedAt: '2024-03-06' },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 88, verified: true },
      { skillId: 'skill-data-viz', skillName: 'Data Visualization & BI', level: 75, verified: true },
      { skillId: 'skill-cloud', skillName: 'Cloud Architecture & DevOps', level: 70, verified: false }
    ],
    projects: [
      {
        id: 'proj-deepa-1',
        title: 'Real-Time Medical Image Segmentation with U-Net',
        description: 'Trained neural networks for CT-scan lesion segmentation reaching 0.91 Dice coefficient.',
        technologies: ['PyTorch', 'OpenCV', 'FastAPI', 'Docker'],
        verified: true
      }
    ],
    certifications: ['TensorFlow Developer Certificate', 'AWS Certified Machine Learning - Specialty'],
    assessmentScores: {
      'assess-python-diagnostic': 94
    },
    uncertaintyScore: 8,
    readinessScore: {
      overallPercentage: 86,
      technicalScore: 90,
      projectScore: 85,
      problemSolvingScore: 88,
      softSkillScore: 82,
      status: 'career_ready'
    },
    learningPace: 'intensive',
    weeklyHoursCommitted: 15,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate'
  },

  // 10. Seetha - Biomedical Engineering
  {
    id: 'student-seetha',
    userId: 'user-seetha',
    fullName: 'Seetha',
    email: 'seetha@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Electronics & Communication (ECE)',
    degree: 'B.Tech in Biomedical Engineering',
    yearOfStudy: 3,
    cgpa: 8.5,
    targetCareerId: 'career-biomedical-engineer',
    interests: ['Biosensors', 'Medical Instrumentation', 'Digital Signal Processing', 'Telehealth Devices'],
    skills: [
      { skillId: 'skill-soil-sensors', skillName: 'Soil Sensor & Telemetry Integration', level: 70, verified: true },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 65, verified: false },
      { skillId: 'skill-stats', skillName: 'Applied Statistics & Probability', level: 60, verified: false }
    ],
    projects: [
      {
        id: 'proj-seetha-1',
        title: 'Bluetooth Low Energy PPG Heart-Rate Monitor',
        description: 'Engineered filtering algorithms in Python to suppress motion artifacts in optical pulse readings.',
        technologies: ['C++', 'Python', 'BLE', 'Digital Signal Processing'],
        verified: true
      }
    ],
    certifications: ['Biomedical Device Quality & Regulatory Compliance'],
    assessmentScores: {
      'assess-health-fhir': 70
    },
    uncertaintyScore: 16,
    readinessScore: {
      overallPercentage: 64,
      technicalScore: 66,
      projectScore: 65,
      problemSolvingScore: 62,
      softSkillScore: 74,
      status: 'building'
    },
    learningPace: 'steady',
    weeklyHoursCommitted: 10,
    learningStyle: 'hands_on',
    targetTimeline: 'skill_building'
  },

  // 11. Sathya - Information Technology
  {
    id: 'student-sathya',
    userId: 'user-sathya',
    fullName: 'Sathya',
    email: 'sathya@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Computer Science & Engineering / IT',
    degree: 'B.Tech in Information Technology',
    yearOfStudy: 4,
    cgpa: 8.7,
    targetCareerId: 'career-cybersec-architect',
    interests: ['Cloud Infrastructure Defense', 'Penetration Testing', 'Identity & Access Management', 'DevSecOps'],
    skills: [
      { skillId: 'skill-cloud', skillName: 'Cloud Architecture & DevOps', level: 80, verified: true },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 78, verified: true },
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 70, verified: false }
    ],
    projects: [
      {
        id: 'proj-sathya-1',
        title: 'Automated IAM Least Privilege Analyzer in AWS',
        description: 'Parsed CloudTrail access logs to flag over-permissive IAM roles and suggest surgical policies.',
        technologies: ['AWS IAM', 'Python', 'CloudTrail', 'Boto3'],
        verified: true
      }
    ],
    certifications: ['Certified Information Systems Security Professional (Associate)', 'AWS Certified Security - Specialty'],
    assessmentScores: {
      'assess-cloud-k8s': 78
    },
    uncertaintyScore: 11,
    readinessScore: {
      overallPercentage: 79,
      technicalScore: 82,
      projectScore: 78,
      problemSolvingScore: 78,
      softSkillScore: 82,
      status: 'competent'
    },
    learningPace: 'accelerated',
    weeklyHoursCommitted: 12,
    learningStyle: 'hands_on',
    targetTimeline: 'immediate'
  },

  // 12. Saranya - Civil & Environmental Engineering
  {
    id: 'student-saranya',
    userId: 'user-saranya',
    fullName: 'Saranya',
    email: 'saranya@college.edu',
    avatarUrl: '',
    discipline: 'engineering',
    stream: 'Civil & Environmental Engineering',
    degree: 'B.Tech in Civil & Smart Infrastructure Technology',
    yearOfStudy: 2,
    cgpa: 7.4,
    targetCareerId: 'career-data-analyst',
    interests: ['Smart City Sensors', 'GIS Mapping', 'Spatial Analytics', 'Infrastructure BI'],
    skills: [
      { skillId: 'skill-data-viz', skillName: 'Data Visualization & BI', level: 55, verified: false },
      { skillId: 'skill-sql', skillName: 'SQL & Relational Databases', level: 40, verified: false },
      { skillId: 'skill-python', skillName: 'Python Programming', level: 42, verified: false }
    ],
    projects: [],
    certifications: ['AutoCAD Certified User'],
    assessmentScores: {
      'assess-sql-diagnostic': 45
    },
    uncertaintyScore: 42,
    readinessScore: {
      overallPercentage: 45,
      technicalScore: 46,
      projectScore: 38,
      problemSolvingScore: 48,
      softSkillScore: 68,
      status: 'starting'
    },
    learningPace: 'steady',
    weeklyHoursCommitted: 8,
    learningStyle: 'visual',
    targetTimeline: 'skill_building'
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-selva',
    title: 'New Advanced Milestone Ready',
    message: 'Your Deep Learning & LLM Fine-Tuning roadmap module is waiting. Take the diagnostic drill to benchmark your skills.',
    type: 'milestone',
    read: false,
    createdAt: '10 mins ago',
    link: '/roadmap'
  },
  {
    id: 'notif-2',
    userId: 'user-selva',
    title: 'Faculty Intervention: Advisor Note',
    message: 'Dr. Balu Prasath reviewed your profile and recommended focusing on distributed model inference architectures.',
    type: 'mentor',
    read: false,
    createdAt: '2 hours ago',
    link: '/skills'
  },
  {
    id: 'notif-3',
    userId: 'user-kalai',
    title: 'SQL Milestone Unlocked',
    message: 'Advanced Window Functions & CTE practice is ready in your Adaptive Roadmap.',
    type: 'milestone',
    read: false,
    createdAt: '1 day ago',
    link: '/roadmap'
  }
];

export const SEED_INTERVENTIONS: MentorIntervention[] = [
  {
    id: 'int-1',
    studentId: 'student-gokul',
    studentName: 'Gokul',
    studentEmail: 'gokul@college.edu',
    targetCareer: 'Biomedical Devices & Robotics Engineer',
    reason: 'high_uncertainty',
    status: 'open',
    notes: 'High uncertainty flagged (38) with stalled project building. Scheduled 1-on-1 mentoring to review embedded electronics fundamentals and bridge microcontroller labs into biomedical robotics prototyping.',
    createdAt: '2024-03-08T10:30:00.000Z'
  },
  {
    id: 'int-2',
    studentId: 'student-saranya',
    studentName: 'Saranya',
    studentEmail: 'saranya@college.edu',
    targetCareer: 'Data Analyst & BI Specialist',
    reason: 'persistent_gap',
    status: 'open',
    notes: 'Low readiness score (45%) on foundational SQL and spatial analytics. Assigned the SQL Practice Sandbox and recommended pairing with Kalai for peer-assisted learning.',
    createdAt: '2024-03-09T14:15:00.000Z'
  },
  {
    id: 'int-3',
    studentId: 'student-selva',
    studentName: 'Selva',
    studentEmail: 'selva@college.edu',
    targetCareer: 'AI & Machine Learning Engineer',
    reason: 'persistent_gap',
    status: 'addressed',
    notes: 'Exceptional progress across PyTorch and Deep Learning (78% readiness). Recommended advancing to high-scale model serving and exploring national hackathon challenges.',
    createdAt: '2024-03-10T11:00:00.000Z'
  }
];

export const SEED_CURRICULUM_GAPS: CurriculumGapInsight[] = [
  {
    id: 'gap-1',
    discipline: 'engineering',
    careerTitle: 'Data Analyst & BI Specialist',
    skillName: 'SQL & Relational Databases (Window Functions & dbt)',
    deficiencyPercentage: 42,
    studentCount: 142,
    suggestedIntervention: 'Integrate 3 weeks of hands-on dbt transformation labs into CSE Database Systems course.',
    priority: 'high'
  },
  {
    id: 'gap-2',
    discipline: 'agriculture',
    careerTitle: 'Precision AgTech & IoT Specialist',
    skillName: 'GIS & Crop Yield Predictive Modeling',
    deficiencyPercentage: 58,
    studentCount: 88,
    suggestedIntervention: 'Deploy an on-campus smart farm IoT telemetry bed and introduce a dedicated Geoinformatics elective.',
    priority: 'critical'
  },
  {
    id: 'gap-3',
    discipline: 'paramedical',
    careerTitle: 'Clinical Health Informatics Specialist',
    skillName: 'EHR & Health Protocols (HL7/FHIR)',
    deficiencyPercentage: 48,
    studentCount: 65,
    suggestedIntervention: 'Introduce a modular Digital Health Records seminar for 3rd year paramedical students with hospital IT shadowing.',
    priority: 'high'
  },
  {
    id: 'gap-4',
    discipline: 'commerce',
    careerTitle: 'FinTech Quantitative Analyst',
    skillName: 'Quantitative Risk & Algorithmic Trading',
    deficiencyPercentage: 38,
    studentCount: 110,
    suggestedIntervention: 'Embed computational finance workshops into Corporate Accounting and Valuation curriculum.',
    priority: 'medium'
  },
  {
    id: 'gap-5',
    discipline: 'law_governance',
    careerTitle: 'Cyber Law & AI Governance Analyst',
    skillName: 'AI Ethics, Governance & Model Auditing',
    deficiencyPercentage: 52,
    studentCount: 45,
    suggestedIntervention: 'Offer interdisciplinary joint seminars between Computer Science and Law faculties on algorithmic accountability.',
    priority: 'high'
  }
];


export const SEED_DOUBTS: DoubtQuery[] = [
  {
    "id": "doubt-1",
    "studentId": "student-selva",
    "studentName": "Selva",
    "studentEmail": "selva@college.edu",
    "title": "How to handle CUDA Out-of-Memory (OOM) during LoRA fine-tuning on 16GB VRAM?",
    "queryText": "I am fine-tuning a 7B parameter LLM using Hugging Face PEFT + LoRA on an RTX 4080 (16GB), but experiencing CUDA Out-Of-Memory during the backward pass at step 42. What gradient accumulation and quantization flags should I set to stabilize training without losing perplexity?",
    "codeSnippet": "from transformers import TrainingArguments\n\ntraining_args = TrainingArguments(\n    output_dir='./results',\n    per_device_train_batch_size=4,\n    gradient_accumulation_steps=1,\n    learning_rate=2e-4,\n    fp16=True,\n    logging_steps=10\n)",
    "domain": "AI & Machine Learning",
    "category": "technical",
    "tags": [
      "PyTorch",
      "LoRA",
      "LLMs",
      "CUDA",
      "PEFT"
    ],
    "urgency": "normal",
    "status": "answered",
    "createdAt": "2026-09-10T10:15:00.000Z",
    "upvotes": 12,
    "replies": [
      {
        "id": "reply-1-1",
        "doubtId": "doubt-1",
        "authorId": "exp-google-vikram",
        "authorName": "Dr. Vikram Nair",
        "authorRole": "industrial_expert",
        "authorTitle": "Principal Research Scientist",
        "authorOrg": "Google DeepMind",
        "content": "Switch to QLoRA with 4-bit NormalFloat (NF4) quantization and enable gradient checkpointing. By dropping per_device_train_batch_size to 1 and setting gradient_accumulation_steps to 8 (effective batch size 8), your VRAM usage will plummet from ~14.8GB to ~6.4GB with zero observable loss in downstream benchmark accuracy.",
        "codeSnippet": "from transformers import BitsAndBytesConfig\n\nbnb_config = BitsAndBytesConfig(\n    load_in_4bit=True,\n    bnb_4bit_quant_type='nf4',\n    bnb_4bit_compute_dtype=torch.bfloat16,\n    bnb_4bit_use_double_quant=True\n)\n\n# Also enable in training_args:\ntraining_args.gradient_checkpointing = True\ntraining_args.optim = 'paged_adamw_8bit'",
        "verified": true,
        "upvotes": 18,
        "createdAt": "2026-09-10T11:40:00.000Z"
      },
      {
        "id": "reply-1-2",
        "doubtId": "doubt-1",
        "authorId": "user-balu",
        "authorName": "Dr. Balu Prasath",
        "authorRole": "mentor",
        "authorTitle": "Department Faculty Advisor & Mentor",
        "authorOrg": "College Department of CSE / AI",
        "content": "Great question Selva. Dr. Vikram's advice on paged 8-bit AdamW is exact. Also ensure you target only the projection query and value matrices (q_proj, v_proj) initially to keep trainable parameters under 0.2% of the base model.",
        "verified": true,
        "upvotes": 9,
        "createdAt": "2026-09-10T13:10:00.000Z"
      }
    ]
  },
  {
    "id": "doubt-2",
    "studentId": "student-sabari",
    "studentName": "Sabari",
    "studentEmail": "sabari@college.edu",
    "title": "Preventing WebSocket connection drops during Kubernetes Canary rollouts in Argo",
    "queryText": "When triggering an automated Canary step-weight promotion from 20% to 50% in Argo Rollouts, our ingress controller drops ~0.5% of persistent WebSocket sessions. How can we ensure graceful termination of long-lived connections during pod eviction?",
    "codeSnippet": "apiVersion: argoproj.io/v1alpha1\nkind: Rollout\nmetadata:\n  name: realtime-gateway\nspec:\n  strategy:\n    canary:\n      steps:\n      - setWeight: 20\n      - pause: {duration: 5m}\n      - setWeight: 50",
    "domain": "Cloud DevOps & SRE",
    "category": "technical",
    "tags": [
      "Kubernetes",
      "ArgoCD",
      "WebSockets",
      "SRE",
      "DevOps"
    ],
    "urgency": "urgent",
    "status": "answered",
    "createdAt": "2026-09-11T09:00:00.000Z",
    "upvotes": 15,
    "replies": [
      {
        "id": "reply-2-1",
        "doubtId": "doubt-2",
        "authorId": "exp-aws-sundar",
        "authorName": "Sundar Ramanathan",
        "authorRole": "industrial_expert",
        "authorTitle": "Staff SRE & Cloud Architect",
        "authorOrg": "Amazon Web Services",
        "content": "In Kubernetes, when a pod is marked Terminating, endpoint removal and SIGTERM delivery happen asynchronously. To fix WebSocket connection drops:\n1. Add a container preStop hook with a 15-20s sleep to let AWS ALB / NGINX remove the pod from routing.\n2. Increase `terminationGracePeriodSeconds: 75`.\n3. In your app process, catch SIGTERM and stop accepting new sockets while draining existing connections.",
        "codeSnippet": "lifecycle:\n  preStop:\n    exec:\n      command: ['/bin/sh', '-c', 'sleep 15']\nterminationGracePeriodSeconds: 75",
        "verified": true,
        "upvotes": 22,
        "createdAt": "2026-09-11T10:15:00.000Z"
      }
    ]
  },
  {
    "id": "doubt-3",
    "studentId": "student-gokul",
    "studentName": "Gokul",
    "studentEmail": "gokul@college.edu",
    "title": "50Hz powerline hum interference in biomedical lead-II ECG instrumentation amplifiers",
    "queryText": "Our custom AD8232 lead-II ECG sensor telemetry board is picking up massive 50Hz mains powerline hum noise even when battery-powered. Should we add an analog Twin-T notch filter before the ADC or handle it purely in digital FIR filtering on the ESP32?",
    "codeSnippet": "// ADC sampling at 500 Hz on ESP32\nint rawSample = analogRead(ECG_PIN);\n// Heavy 50Hz periodic sinusoidal ripple obscuring P-wave",
    "domain": "Biomedical & Hardware",
    "category": "academic_concept",
    "tags": [
      "ECG",
      "Biosensors",
      "Noise Filtering",
      "DSP",
      "Biomedical"
    ],
    "urgency": "normal",
    "status": "answered",
    "createdAt": "2026-09-11T14:30:00.000Z",
    "upvotes": 8,
    "replies": [
      {
        "id": "reply-3-1",
        "doubtId": "doubt-3",
        "authorId": "exp-bosch-karthik",
        "authorName": "Karthikeyan M.",
        "authorRole": "industrial_expert",
        "authorTitle": "Senior Embedded Hardware Specialist",
        "authorOrg": "Bosch Engineering",
        "content": "Always prioritize hardware common-mode rejection first. Implement a Right-Leg Drive (RLD) active feedback loop to invert patient common-mode body voltage back into the body. This boosts CMRR >100dB. Then, in MCU firmware, apply a 2nd-order IIR Notch filter centered at 50Hz (Q=30) sampled at 500Hz. Digital-only filtering without RLD will saturate your ADC frontend.",
        "verified": true,
        "upvotes": 14,
        "createdAt": "2026-09-11T16:00:00.000Z"
      }
    ]
  },
  {
    "id": "doubt-4",
    "studentId": "student-kalai",
    "studentName": "Kalai",
    "studentEmail": "kalai@college.edu",
    "title": "Eliminating expensive Disk Sorts in PostgreSQL Window Aggregations on 10M rows",
    "queryText": "Running `DENSE_RANK() OVER (PARTITION BY customer_segment ORDER BY total_spend DESC)` takes 14.8 seconds and spills 480MB into temporary disk files. How do we structure composite indexes so the planner avoids the external merge sort?",
    "codeSnippet": "SELECT customer_id, customer_segment, total_spend,\n       DENSE_RANK() OVER (PARTITION BY customer_segment ORDER BY total_spend DESC) as rank\nFROM enterprise_transactions\nWHERE transaction_year = 2025;",
    "domain": "Data Analytics & SQL",
    "category": "technical",
    "tags": [
      "PostgreSQL",
      "WindowFunctions",
      "Indexing",
      "Performance",
      "ETL"
    ],
    "urgency": "normal",
    "status": "answered",
    "createdAt": "2026-09-11T17:20:00.000Z",
    "upvotes": 11,
    "replies": [
      {
        "id": "reply-4-1",
        "doubtId": "doubt-4",
        "authorId": "exp-msft-anand",
        "authorName": "Anand Kumar",
        "authorRole": "industrial_expert",
        "authorTitle": "Lead Analytics Architect",
        "authorOrg": "Microsoft Azure Data",
        "content": "Create a composite B-tree index matching the exact partitioning and ordering keys:\n`CREATE INDEX idx_trans_window ON enterprise_transactions(transaction_year, customer_segment, total_spend DESC);`\nThis allows PostgreSQL to stream pre-sorted records directly into the window accumulator node, dropping execution time from 14.8s to 82ms!",
        "verified": true,
        "upvotes": 19,
        "createdAt": "2026-09-11T18:45:00.000Z"
      },
      {
        "id": "reply-4-2",
        "doubtId": "doubt-4",
        "authorId": "user-balu",
        "authorName": "Dr. Balu Prasath",
        "authorRole": "mentor",
        "authorTitle": "Department Faculty Advisor & Mentor",
        "authorOrg": "College Department of CSE / AI",
        "content": "Kalai, also consider running `SET work_mem = '64MB';` for that session to give the in-memory window buffer adequate room if running multi-tenant queries.",
        "verified": true,
        "upvotes": 7,
        "createdAt": "2026-09-11T19:10:00.000Z"
      }
    ]
  },
  {
    "id": "doubt-5",
    "studentId": "student-ram",
    "studentName": "Ram",
    "studentEmail": "ram@college.edu",
    "title": "How should 2026 engineering graduates prepare for Tier-1 coding & system design rounds?",
    "queryText": "For upcoming on-campus drives like Amazon AWS, Qualcomm, and Zoho, what is the right split between dynamic programming and system design? How critical are CS fundamentals (OS, DBMS, Computer Networks)?",
    "domain": "Placement Preparation",
    "category": "interview_prep",
    "tags": [
      "Placements",
      "InterviewPrep",
      "DSA",
      "SystemDesign",
      "CoreCS"
    ],
    "urgency": "urgent",
    "status": "answered",
    "createdAt": "2026-09-12T07:15:00.000Z",
    "upvotes": 24,
    "replies": [
      {
        "id": "reply-5-1",
        "doubtId": "doubt-5",
        "authorId": "user-placement-cell",
        "authorName": "Mr. K. Senthil Kumar",
        "authorRole": "placement_cell",
        "authorTitle": "Head of Corporate Relations & Placement Directorate",
        "authorOrg": "College Central Placement Cell",
        "content": "Here is the official hiring rubric from our visiting recruiters this semester:\n1. Round 1 Online Test: 100% DSA (Trees, Graphs, Sliding Window, DP, Binary Search).\n2. Technical Interview 1: DSA live whiteboard coding + time/space complexity proof.\n3. Technical Interview 2: Core CS (OS process scheduling, virtual memory, ACID transactions, TCP 3-way handshake) + applied projects.\n4. We have 8 recruitment drives live now on the portal. Make sure your readiness score is above 70% to unlock direct shortlisting!",
        "verified": true,
        "upvotes": 31,
        "createdAt": "2026-09-12T08:00:00.000Z"
      },
      {
        "id": "reply-5-2",
        "doubtId": "doubt-5",
        "authorId": "exp-msft-pooja",
        "authorName": "Pooja Sharma",
        "authorRole": "industrial_expert",
        "authorTitle": "Senior Security Software Engineer",
        "authorOrg": "Microsoft",
        "content": "Master the Blind 75 questions first. When given a problem in interview, do NOT jump straight to code: talk through brute-force in 2 mins, identify trade-offs, state target O(N) complexity, and write modular clean code with descriptive variable names.",
        "verified": true,
        "upvotes": 25,
        "createdAt": "2026-09-12T08:45:00.000Z"
      }
    ]
  },
  {
    "id": "doubt-6",
    "studentId": "student-saranya",
    "studentName": "Saranya",
    "studentEmail": "saranya@college.edu",
    "title": "Preserving 3D rebar spatial geometry during IFC export from Revit to Navisworks for 4D simulation",
    "queryText": "When linking Revit structural column reinforcements to MS Project schedule items in Navisworks Timeliner, certain 3D rebar meshes vanish. What IFC export profile ensures clash detection doesn't produce false negatives?",
    "domain": "Civil & Infrastructure",
    "category": "project_help",
    "tags": [
      "BIM",
      "Revit",
      "Navisworks",
      "DigitalTwins",
      "Civil"
    ],
    "urgency": "normal",
    "status": "answered",
    "createdAt": "2026-09-12T09:30:00.000Z",
    "upvotes": 9,
    "replies": [
      {
        "id": "reply-6-1",
        "doubtId": "doubt-6",
        "authorId": "exp-lt-rajesh",
        "authorName": "Rajesh V.",
        "authorRole": "industrial_expert",
        "authorTitle": "BIM Lead & Digital Twin Engineer",
        "authorOrg": "L&T Construction",
        "content": "Use `IFC4 Design Transfer View` rather than IFC2x3 Coordination View. In Revit IFC Export options:\n1. Enable 'Export Rebar Elements as BRep Solid Geometry'.\n2. Turn on 'Include Internal Revit Property Sets'.\nThis eliminates mesh clipping in Navisworks 2024 and links seamlessly to Primavera P6 / MS Project time nodes.",
        "verified": true,
        "upvotes": 16,
        "createdAt": "2026-09-12T10:15:00.000Z"
      }
    ]
  }
];

export const SEED_PLACEMENT_DRIVES: PlacementCompanyDrive[] = [
  {
    "id": "drive-amazon-aws",
    "companyName": "Amazon Web Services (AWS)",
    "logoUrl": "",
    "industry": "Cloud Computing & Enterprise Software",
    "roleTitle": "Cloud Software Development Engineer (SDE-1)",
    "ctcPackage": "\u20b924 - 32 LPA (\u20b918L Base + \u20b98L Stock + Joining Bonus)",
    "jobType": "full_time",
    "workLocation": "Bengaluru / Hyderabad (Hybrid)",
    "driveDate": "2026-10-15",
    "applicationDeadline": "2026-10-05",
    "status": "active",
    "eligibleDepartments": [
      "AI & DS",
      "AI & ML",
      "CSE",
      "IT",
      "CSBS",
      "ECE"
    ],
    "minCgpa": 7.5,
    "minReadinessScore": 72,
    "requiredSkills": [
      "Data Structures & Algorithms",
      "Python / Java",
      "Cloud Infrastructure",
      "System Design",
      "SQL"
    ],
    "selectionProcess": [
      "Online Assessment: 2 LeetCode Medium/Hard Algorithmic Problems (90 mins)",
      "Technical Round 1: Data Structures, Complexity Analysis & Live Whiteboard Coding",
      "Technical Round 2: Low-Level System Design, Object-Oriented Modeling & Clean Code",
      "Bar Raiser & Leadership Principles Interview"
    ],
    "description": "Join the core AWS infrastructure engineering team developing hyperscale distributed cloud services, high-throughput caching layers, and fault-tolerant storage engines powering millions of global customers.",
    "hiringCount": 25,
    "registeredStudentIds": [
      "student-selva",
      "student-sabari",
      "student-kalai"
    ],
    "shortlistedStudentIds": [
      "student-sabari"
    ],
    "placedStudentIds": []
  },
  {
    "id": "drive-tata-elxsi",
    "companyName": "Tata Elxsi",
    "logoUrl": "",
    "industry": "Automotive Electronics & Autonomous Systems",
    "roleTitle": "Embedded Systems & Autonomous Drive Engineer",
    "ctcPackage": "\u20b912.5 - 16 LPA",
    "jobType": "full_time",
    "workLocation": "Bengaluru / Chennai",
    "driveDate": "2026-10-22",
    "applicationDeadline": "2026-10-12",
    "status": "active",
    "eligibleDepartments": [
      "ECE",
      "EEE",
      "Mechatronics",
      "Robotics & Automation",
      "Automobile",
      "Mechanical"
    ],
    "minCgpa": 7.0,
    "minReadinessScore": 65,
    "requiredSkills": [
      "Embedded C/C++",
      "RTOS",
      "CAN / LIN Protocol",
      "MATLAB Simulink",
      "Microcontrollers"
    ],
    "selectionProcess": [
      "Online Technical Test: C/C++ Bitwise Algorithms & Automotive Microcontrollers",
      "Firmware Simulation Round: FreeRTOS Task Synchronization Drill",
      "Technical Interview: AUTOSAR architecture & Hardware-in-the-loop (HIL) testing",
      "HR & Culture Fitment"
    ],
    "description": "Engineer next-generation ADAS (Advanced Driver Assistance Systems), EV electronic control units (ECUs), and connected vehicle telematics firmware for premier global automotive OEMs.",
    "hiringCount": 40,
    "registeredStudentIds": [
      "student-gokul",
      "student-sanjay",
      "student-kishore"
    ],
    "shortlistedStudentIds": [
      "student-sanjay"
    ],
    "placedStudentIds": []
  },
  {
    "id": "drive-bosch-mobility",
    "companyName": "Bosch Global Software Technologies",
    "logoUrl": "",
    "industry": "Electric Mobility & Smart IoT Systems",
    "roleTitle": "EV Powertrain & Smart Mobility Firmware Engineer",
    "ctcPackage": "\u20b914 - 18.5 LPA",
    "jobType": "full_time",
    "workLocation": "Bengaluru / Coimbatore",
    "driveDate": "2026-11-05",
    "applicationDeadline": "2026-10-28",
    "status": "upcoming",
    "eligibleDepartments": [
      "EEE",
      "ECE",
      "Automobile",
      "Mechanical",
      "EIE"
    ],
    "minCgpa": 7.2,
    "minReadinessScore": 68,
    "requiredSkills": [
      "Power Electronics",
      "Battery Management Systems (BMS)",
      "Embedded C",
      "Simulink",
      "Sensors"
    ],
    "selectionProcess": [
      "Online Hardware & Firmware MCQ Test",
      "Simulink / MATLAB Thermal & Battery Circuit Simulation Case Study",
      "Technical Panel Interview: Inverter circuits & Field-Oriented Motor Control",
      "Managerial Round"
    ],
    "description": "Architect mission-critical battery management software, regenerative braking controllers, and high-voltage inverter firmware for high-efficiency electric two-wheelers and passenger vehicles.",
    "hiringCount": 30,
    "registeredStudentIds": [
      "student-gokul"
    ],
    "shortlistedStudentIds": [],
    "placedStudentIds": []
  },
  {
    "id": "drive-microsoft-ai",
    "companyName": "Microsoft Corporation",
    "logoUrl": "",
    "industry": "Artificial Intelligence & Enterprise Cloud",
    "roleTitle": "Software Engineer - AI Platform & Intelligent Cloud",
    "ctcPackage": "\u20b928 - 44 LPA (\u20b921L Base + Stocks + Relocation Allowance)",
    "jobType": "full_time",
    "workLocation": "Hyderabad / Bengaluru / Noida",
    "driveDate": "2026-11-12",
    "applicationDeadline": "2026-11-02",
    "status": "upcoming",
    "eligibleDepartments": [
      "AI & DS",
      "AI & ML",
      "CSE",
      "IT",
      "Computer Engineering"
    ],
    "minCgpa": 8.0,
    "minReadinessScore": 78,
    "requiredSkills": [
      "Data Structures",
      "Python / C#",
      "Deep Learning",
      "Distributed Systems",
      "SQL"
    ],
    "selectionProcess": [
      "Online Assessment: 3 Algorithmic Coding Challenges (110 mins)",
      "Technical Virtual Onsite 1: Advanced Graph Algorithms & Memory Optimization",
      "Technical Virtual Onsite 2: System Architecture for Multi-Region Data Pipelines",
      "Executive 'As-Appropriate' (AA) Leadership Interview"
    ],
    "description": "Build high-throughput inference backends, Azure OpenAI enterprise integrations, and scalable vector search pipelines serving billions of global requests daily.",
    "hiringCount": 15,
    "registeredStudentIds": [
      "student-selva",
      "student-deepa"
    ],
    "shortlistedStudentIds": [
      "student-deepa"
    ],
    "placedStudentIds": []
  },
  {
    "id": "drive-qualcomm-vlsi",
    "companyName": "Qualcomm India",
    "logoUrl": "",
    "industry": "Semiconductors & 5G Wireless Systems",
    "roleTitle": "VLSI Physical Design & RTL Verification Engineer",
    "ctcPackage": "\u20b918 - 25 LPA",
    "jobType": "full_time",
    "workLocation": "Bengaluru / Hyderabad / Chennai",
    "driveDate": "2026-11-18",
    "applicationDeadline": "2026-11-08",
    "status": "upcoming",
    "eligibleDepartments": [
      "ECE",
      "VLSI",
      "Embedded Systems",
      "Telecommunication"
    ],
    "minCgpa": 7.5,
    "minReadinessScore": 70,
    "requiredSkills": [
      "Verilog / SystemVerilog",
      "Digital Electronics",
      "Static Timing Analysis (STA)",
      "FPGA",
      "UVM"
    ],
    "selectionProcess": [
      "Digital Electronics, Setup/Hold Time & Verilog Coding Test",
      "Technical Interview 1: Logic Synthesis, Clock Domain Crossing (CDC) & FSM Design",
      "Technical Interview 2: SystemVerilog Testbenches & UVM Protocol Verification",
      "HR Round"
    ],
    "description": "Design and verify cutting-edge Snapdragon 5G system-on-chip (SoC) architectures, AI hardware accelerators, and low-power mobile modem sub-systems on 3nm/4nm silicon processes.",
    "hiringCount": 20,
    "registeredStudentIds": [
      "student-kishore"
    ],
    "shortlistedStudentIds": [],
    "placedStudentIds": []
  },
  {
    "id": "drive-zoho-corp",
    "companyName": "Zoho Corporation",
    "logoUrl": "",
    "industry": "SaaS & Enterprise Business Cloud",
    "roleTitle": "Member Technical Staff (MTS) - Full Stack & Systems",
    "ctcPackage": "\u20b98.5 - 14 LPA",
    "jobType": "full_time",
    "workLocation": "Chennai / Tenkasi / Coimbatore",
    "driveDate": "2026-10-18",
    "applicationDeadline": "2026-10-10",
    "status": "active",
    "eligibleDepartments": [
      "All Engineering Branches"
    ],
    "minCgpa": 6.5,
    "minReadinessScore": 60,
    "requiredSkills": [
      "Programming (Java/C++/Python)",
      "Data Structures",
      "Web Technologies",
      "Logical Problem Solving"
    ],
    "selectionProcess": [
      "Round 1: General Aptitude & Mental Arithmetic (45 mins)",
      "Round 2: Basic Programming & Syntax Debugging (5 Questions)",
      "Round 3: Advanced DSA & Problem Solving (3 Questions)",
      "Round 4: On-Spot Application Prototyping in 3 Hours",
      "Round 5: Technical Fitment & Leadership Interview"
    ],
    "description": "Build high-speed database engines, enterprise CRM workflows, and real-time collaboration suites for 100+ million global users across 150+ countries.",
    "hiringCount": 80,
    "registeredStudentIds": [
      "student-karthick",
      "student-sathya",
      "student-kalai"
    ],
    "shortlistedStudentIds": [
      "student-karthick",
      "student-sathya"
    ],
    "placedStudentIds": [
      "student-sabari"
    ]
  },
  {
    "id": "drive-lt-smartcities",
    "companyName": "Larsen & Toubro (L&T)",
    "logoUrl": "",
    "industry": "Smart Infrastructure, BIM & Digital Construction",
    "roleTitle": "Graduate Engineer Trainee - Smart Cities & Digital Twins",
    "ctcPackage": "\u20b99.5 - 13.5 LPA",
    "jobType": "full_time",
    "workLocation": "Chennai / Mumbai / Delhi NCR",
    "driveDate": "2026-11-25",
    "applicationDeadline": "2026-11-15",
    "status": "upcoming",
    "eligibleDepartments": [
      "Civil",
      "Construction",
      "Environmental",
      "Mechanical",
      "EEE"
    ],
    "minCgpa": 6.8,
    "minReadinessScore": 62,
    "requiredSkills": [
      "BIM (Revit / Navisworks)",
      "Structural Analysis (STAAD.Pro)",
      "AutoCAD",
      "GIS Telemetry"
    ],
    "selectionProcess": [
      "Online Engineering Aptitude & Core Structural Domain Test",
      "Group Discussion on Sustainable Mega-Projects & Smart Cities",
      "Technical Panel Interview: 4D BIM Clash Resolution & Concrete Technology",
      "HR Interview & Medical Evaluation"
    ],
    "description": "Participate in India's landmark mega-infrastructure developments: high-speed rail corridors, underground metro networks, smart airport terminals, and green hydrogen synthesis facilities.",
    "hiringCount": 50,
    "registeredStudentIds": [
      "student-saranya"
    ],
    "shortlistedStudentIds": [],
    "placedStudentIds": []
  },
  {
    "id": "drive-infosys-sp",
    "companyName": "Infosys Limited",
    "logoUrl": "",
    "industry": "Enterprise Digital Transformation & AI",
    "roleTitle": "Specialist Programmer (SP) & Digital Specialist Engineer",
    "ctcPackage": "\u20b99.5 - 12 LPA (SP: \u20b99.5L, DSE: \u20b96.5L)",
    "jobType": "full_time",
    "workLocation": "Pan India / Mysore Training Campus",
    "driveDate": "2026-10-29",
    "applicationDeadline": "2026-10-19",
    "status": "active",
    "eligibleDepartments": [
      "All Engineering Branches"
    ],
    "minCgpa": 6.5,
    "minReadinessScore": 55,
    "requiredSkills": [
      "Algorithms & Data Structures",
      "Python / Java",
      "Database Systems",
      "Problem Solving"
    ],
    "selectionProcess": [
      "National Coding Challenge: 3 Hard Algorithmic Problems (180 mins)",
      "Technical Interview: Dynamic Programming & Complexity Optimization",
      "HR Fitment & Offer Rollout"
    ],
    "description": "Elite development cohort working on generative AI solutions, cloud-native enterprise microservices, and automated blockchain settlement networks.",
    "hiringCount": 120,
    "registeredStudentIds": [
      "student-ram",
      "student-seetha",
      "student-karthick"
    ],
    "shortlistedStudentIds": [
      "student-ram",
      "student-seetha"
    ],
    "placedStudentIds": [
      "student-kalai"
    ]
  }
];

export const SEED_PLACEMENT_APPLICATIONS: PlacementApplication[] = [
  {
    "id": "app-1",
    "driveId": "drive-amazon-aws",
    "studentId": "student-sabari",
    "studentName": "Sabari",
    "department": "Computer Science & Engineering",
    "cgpa": 8.92,
    "readinessPercentage": 82,
    "status": "shortlisted",
    "appliedAt": "2026-09-08T14:30:00.000Z",
    "feedback": "Cleared Online Coding Assessment (100% test cases passed). Technical Interview 1 scheduled for Oct 15."
  },
  {
    "id": "app-2",
    "driveId": "drive-amazon-aws",
    "studentId": "student-selva",
    "studentName": "Selva",
    "department": "Artificial Intelligence & Data Science",
    "cgpa": 8.85,
    "readinessPercentage": 78,
    "status": "applied",
    "appliedAt": "2026-09-10T11:00:00.000Z",
    "feedback": "Application registered. Online Assessment link dispatched to selva@college.edu."
  },
  {
    "id": "app-3",
    "driveId": "drive-zoho-corp",
    "studentId": "student-sabari",
    "studentName": "Sabari",
    "department": "Computer Science & Engineering",
    "cgpa": 8.92,
    "readinessPercentage": 82,
    "status": "offer_extended",
    "appliedAt": "2026-08-28T09:00:00.000Z",
    "feedback": "Outstanding performance in On-Spot Prototyping. Official offer letter issued for Member Technical Staff (\u20b912 LPA)."
  },
  {
    "id": "app-4",
    "driveId": "drive-zoho-corp",
    "studentId": "student-karthick",
    "studentName": "Karthick",
    "department": "Computer Science & Business Systems",
    "cgpa": 8.1,
    "readinessPercentage": 74,
    "status": "shortlisted",
    "appliedAt": "2026-09-02T16:00:00.000Z",
    "feedback": "Advanced DSA round cleared. Application Development round scheduled for Oct 18."
  },
  {
    "id": "app-5",
    "driveId": "drive-microsoft-ai",
    "studentId": "student-deepa",
    "studentName": "Deepa",
    "department": "AI & Machine Learning",
    "cgpa": 9.15,
    "readinessPercentage": 86,
    "status": "interview_scheduled",
    "appliedAt": "2026-09-05T10:00:00.000Z",
    "feedback": "OA score 300/300. Virtual Onsite Technical Interview scheduled for Nov 12."
  },
  {
    "id": "app-6",
    "driveId": "drive-tata-elxsi",
    "studentId": "student-sanjay",
    "studentName": "Sanjay",
    "department": "Mechanical & Robotics Engineering",
    "cgpa": 8.2,
    "readinessPercentage": 68,
    "status": "shortlisted",
    "appliedAt": "2026-09-06T15:30:00.000Z",
    "feedback": "Cleared C/C++ bitwise drill. Firmware simulation round scheduled for Oct 22."
  },
  {
    "id": "app-7",
    "driveId": "drive-infosys-sp",
    "studentId": "student-kalai",
    "studentName": "Kalai",
    "department": "Computer Science & Engineering",
    "cgpa": 8.45,
    "readinessPercentage": 72,
    "status": "offer_extended",
    "appliedAt": "2026-08-25T11:00:00.000Z",
    "feedback": "Specialist Programmer offer confirmed (\u20b99.5 LPA). Welcome to Infosys SP cohort!"
  },
  {
    "id": "app-8",
    "driveId": "drive-lt-smartcities",
    "studentId": "student-saranya",
    "studentName": "Saranya",
    "department": "Civil & Smart Infrastructure",
    "cgpa": 7.9,
    "readinessPercentage": 64,
    "status": "applied",
    "appliedAt": "2026-09-11T12:00:00.000Z",
    "feedback": "Application submitted. Document verification under review by Central Placement Cell."
  }
];

export const SEED_COURSE_RECOMMENDATIONS: CourseRecommendation[] = [
  {
    "id": "rec-1",
    "studentId": "student-selva",
    "studentName": "Selva",
    "studentEmail": "selva@college.edu",
    "department": "Computer Science & Engineering",
    "targetCareer": "Data Analyst",
    "skillGapName": "PyTorch & Deep Learning Fundamentals",
    "courseTitle": "Deep Learning Specialization with PyTorch",
    "provider": "DeepLearning.AI / Coursera",
    "courseUrl": "https://www.coursera.org/specializations/deep-learning",
    "type": "course",
    "durationMinutes": 720,
    "difficulty": "intermediate",
    "rating": 4.9,
    "aiRationale": "AI Diagnostic detected Selva scored 54% in Advanced Neural Architectures assessment. This course directly addresses tensor manipulation, gradient descent optimizations, and convolutional layers needed for the target benchmark.",
    "status": "pending_approval",
    "requestedAt": "2026-09-11T10:15:00.000Z"
  },
  {
    "id": "rec-2",
    "studentId": "student-sabari",
    "studentName": "Sabari",
    "studentEmail": "sabari@college.edu",
    "department": "Computer Science & Engineering",
    "targetCareer": "Cloud & DevOps Architect",
    "skillGapName": "Kubernetes Custom Resource Definitions (CRDs)",
    "courseTitle": "Kubernetes Operator SDK & Controller Runtime Deep Dive",
    "provider": "Linux Foundation Training",
    "courseUrl": "https://training.linuxfoundation.org/",
    "type": "interactive",
    "durationMinutes": 360,
    "difficulty": "advanced",
    "rating": 4.8,
    "aiRationale": "AI evaluated Sabari's milestone completion rate at 82%, but flagged an 18% competency deficit in production K8s operator patterns required for senior cloud architect roles.",
    "status": "pending_approval",
    "requestedAt": "2026-09-12T08:30:00.000Z"
  },
  {
    "id": "rec-3",
    "studentId": "student-gokul",
    "studentName": "Gokul",
    "studentEmail": "gokul@college.edu",
    "department": "Biomedical Engineering",
    "targetCareer": "Biomedical Instrumentation Engineer",
    "skillGapName": "Biosignal Processing & Filtering",
    "courseTitle": "Real-Time Biosignal DSP with MATLAB & Embedded C",
    "provider": "MIT OpenCourseWare / edX",
    "courseUrl": "https://ocw.mit.edu",
    "type": "course",
    "durationMinutes": 480,
    "difficulty": "intermediate",
    "rating": 4.9,
    "aiRationale": "Student demonstrated strong circuit fundamentals but needs applied DSP filtering for EMG/ECG artifact rejection.",
    "status": "approved",
    "mentorId": "user-mentor-1",
    "mentorName": "Dr. Balu Prasath",
    "mentorFeedback": "Curriculum vetted against Semester 6 Biomedical DSP syllabus. Excellent rigor and practical simulation assignments.",
    "requestedAt": "2026-09-08T09:00:00.000Z",
    "reviewedAt": "2026-09-09T14:20:00.000Z"
  },
  {
    "id": "rec-4",
    "studentId": "student-kalai",
    "studentName": "Kalai",
    "studentEmail": "kalai@college.edu",
    "department": "Computer Science & Engineering",
    "targetCareer": "Data Analyst",
    "skillGapName": "Advanced SQL Window Functions & Execution Plans",
    "courseTitle": "High-Performance SQL Query Tuning & Optimization",
    "provider": "Udacity Enterprise",
    "courseUrl": "https://www.udacity.com",
    "type": "interactive",
    "durationMinutes": 300,
    "difficulty": "intermediate",
    "rating": 4.8,
    "aiRationale": "AI assessment highlighted slow CTE and partition scan formulation in large analytical queries.",
    "status": "approved",
    "mentorId": "user-mentor-1",
    "mentorName": "Dr. Balu Prasath",
    "mentorFeedback": "Approved for credit completion. Focus on EXPLAIN ANALYZE modules 3 and 4.",
    "requestedAt": "2026-09-07T11:00:00.000Z",
    "reviewedAt": "2026-09-08T16:45:00.000Z"
  },
  {
    "id": "rec-5",
    "studentId": "student-ram",
    "studentName": "Ram",
    "studentEmail": "ram@college.edu",
    "department": "Cyber Security & Forensics",
    "targetCareer": "SOC Analyst & Incident Responder",
    "skillGapName": "Memory Forensics & Volatility Framework",
    "courseTitle": "Hands-on Enterprise RAM Extraction & Volatility 3",
    "provider": "Cybrary Defense Labs",
    "courseUrl": "https://www.cybrary.it",
    "type": "interactive",
    "durationMinutes": 420,
    "difficulty": "advanced",
    "rating": 4.9,
    "aiRationale": "AI identified deficit in kernel rootkit detection during the latest SOC mock incident simulation.",
    "status": "approved",
    "mentorId": "user-mentor-1",
    "mentorName": "Dr. Balu Prasath",
    "mentorFeedback": "Critical skill for Tier-2 SOC placement interviews. Approved.",
    "requestedAt": "2026-09-06T13:30:00.000Z",
    "reviewedAt": "2026-09-07T10:15:00.000Z"
  },
  {
    "id": "rec-6",
    "studentId": "student-deepa",
    "studentName": "Deepa",
    "studentEmail": "deepa@college.edu",
    "department": "AI & Machine Learning",
    "targetCareer": "AI Research Engineer",
    "skillGapName": "Transformer Attention Mechanics & LoRA Fine-Tuning",
    "courseTitle": "Full Stack LLM Fine-Tuning and PEFT Architecture",
    "provider": "Hugging Face Deep RL Course",
    "courseUrl": "https://huggingface.co/learn",
    "type": "course",
    "durationMinutes": 540,
    "difficulty": "advanced",
    "rating": 4.95,
    "aiRationale": "Deepa demonstrated 86% readiness for Microsoft AI drive; this courseware bridges open-source weights fine-tuning for edge LLMs.",
    "status": "pending_approval",
    "requestedAt": "2026-09-12T09:10:00.000Z"
  }
];
