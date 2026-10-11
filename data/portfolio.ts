export type ExternalLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  domain: "android" | "fullstack" | "research" | "utility";
  summary: string;
  visual: "schedule" | "naptrap" | "pharma" | "civic" | "traffic" | "hackathon" | "bloodbank" | "quran" | "farmassist";
  technology?: string[];
  featured?: boolean;
  year?: string;
  stats?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  webAppUrl?: string;
  appIcon?: string;
  screenshots?: string[];
  installs?: string;
  accounts?: string;
  activeUsers?: string;
  rating?: string;
  keyFeatures?: string[];
  details?: string;
};

export const profile = {
  name: "Md. Maruf Rayhan",
  shortName: "MARUF RAYHAN",
  role: "Android Developer & Data Science Enthusiast",
  headline: "Crafting High-Performance Android Systems & Applied Machine Learning",
  status: "Available for Software Engineering & Android Roles",
  institution: "Daffodil International University",
  degree: "B.Sc. in Software Engineering (Major in Data Science)",
  location: "Dhaka, Bangladesh",
  bio: "I am a Software Engineering undergraduate at Daffodil International University, specializing in modern Android development (Kotlin, Jetpack Compose, Clean Architecture) and applied Data Science & Machine Learning. I engineer high-performance mobile applications and explore on-device intelligence to solve real-world problems.",
  email: "marufrayhan606@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/marufrayhan606" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marufrayhan606" },
    { label: "Facebook", href: "https://www.facebook.com/marufrayhan606/" },
    { label: "Instagram", href: "https://www.instagram.com/marufrayhan606/" },
    { label: "Discord", href: "https://discord.com/users/756564894073094285" },
  ] satisfies ExternalLink[],
};

export const statsMetrics = [
  { label: "Cumulative GPA", value: "3.93", sub: "Out of 4.00 · 8 Semesters", icon: "award" },
  { label: "Active Student Users", value: "6,000+", sub: "DIU Campus Schedule Ecosystem", icon: "code" },
  { label: "National Hackathon", value: "Top 6", sub: "5th National Data Science Summit", icon: "trophy" },
  { label: "Core Foundation", value: "Kotlin & ML", sub: "Compose, PyTorch & Clean Arch", icon: "cpu" },
];

export const projects: Project[] = [
  {
    slug: "diu-campus-schedule",
    name: "DIU Campus Schedule",
    category: "FLAGSHIP PRODUCTION ANDROID APP · 6K+ USERS",
    domain: "android",
    summary: "The all-in-one campus ecosystem companion for Daffodil International University. Serves 6,000+ active students and faculty with smart routine management, 30-min class alerts, deadlines tracking, 116+ faculty directory, and offline Room DB persistence.",
    visual: "schedule",
    technology: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Room DB", "Hilt", "Firebase", "Coroutines & Flow", "WorkManager"],
    featured: true,
    year: "2024–2025",
    stats: "6,000+ Downloads · 6,000+ Active Students · 4.8★ Rating",
    githubUrl: "https://github.com/marufrayhan606/DIU-Campus-Schedule",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.om.diucampusschedule",
    webAppUrl: "https://diucampusschedule.web.app/",
    appIcon: "/images/diu-schedule-icon.png",
    installs: "6,000+ Downloads",
    accounts: "6,000+ Active Students",
    activeUsers: "6,000+ Users",
    rating: "4.8 ★",
    screenshots: [
      "/projects/diu-campus-schedule/Dashboard.png",
      "/projects/diu-campus-schedule/Class_Routine.png",
      "/projects/diu-campus-schedule/Class_Notification.png",
      "/projects/diu-campus-schedule/CR_Announcements.png",
      "/projects/diu-campus-schedule/Empty_Room.png",
      "/projects/diu-campus-schedule/Faculty_Info.png",
    ],
    keyFeatures: [
      "Class Routine Engine: Daily & weekly schedules with section/course/teacher filters, PDF export & QR code sharing",
      "Smart Notifications: Automated background alerts 30 minutes before classes start with room numbers and course codes",
      "Real-Time Class Updates: Instant alerts on class cancellations, rescheduling & makeup classes managed by CRs",
      "Deadlines & Task Tracker: Quizzes, assignments, presentations, lab tasks & project milestone countdowns",
      "CR Announcements & Directory: Pinned critical cohort messages and contact directory across batches and sections",
      "Exam Routine & Past Questions: Midterm, final, lab performance routines and previous year question papers bank",
      "Empty Classroom Finder: Real-time vacancy locator across DIU Daffodil Smart City campus buildings & floors",
      "Faculty Directory & Portals: 116+ searchable teachers plus integrated DIU Student, Teacher, BLC & Hall Portals",
    ],
    details: "Co-architected with Ismam Hasan Ovi & Md Maruf Rayhan (SWE-41). Solved the university's legacy 50-page routine PDF chaos by engineering an offline-first Android client and official web companion (https://diucampusschedule.web.app/). Features Room DB caching, reactive Kotlin Flows, background WorkManager notification triggers, Firebase real-time synchronization, and a modern Jetpack Compose UI now powering daily academic schedules for over 6,000 registered university students.",
  },

  {
    slug: "naptrap",
    name: "NapTrap",
    category: "ANDROID NATIVE · SMART GEOFENCING",
    domain: "android",
    summary: "An intelligent commute alarm application leveraging transit geofencing to wake traveling passengers before arriving at their destination stop.",
    visual: "naptrap",
    technology: ["Kotlin", "Jetpack Compose", "Play Services Location", "OSMDroid", "Hilt", "Room DB", "Firebase Auth"],
    featured: true,
    year: "2025",
    stats: "GPS Geofencing · Background Worker Alerts",
    githubUrl: "https://github.com/marufrayhan606/NapTrap",
    keyFeatures: [
      "Geofenced Proximity Alerts: High-accuracy GPS radius triggers notifying commuter passengers prior to arrival",
      "Offline Map Rendering: Integrated OpenStreetMap (OSMDroid) for low-latency map display and route tracking",
      "Background Location Monitoring: Foreground service and WorkManager tracking preventing missed stops even in deep sleep",
      "Local Persistence: Room DB storage for frequent transit stops, customized alarm radii, and ringtone preferences",
    ],
    details: "Engineered in Kotlin using Jetpack Compose and modern Android architecture (Target SDK 36). Combines Google Play Services Location and OSMDroid to provide continuous, battery-optimized proximity calculation. Triggers foreground wake-up alarms as soon as commuter enters the geofenced radius.",
  },

  {
    slug: "citypharma",
    name: "CityPharma",
    category: "FULL-STACK SYSTEM · FASTAPI & REACT 19",
    domain: "fullstack",
    summary: "A full-stack pharmacy management system providing medicine inventory auditing, order dispensing, and role-based staff authentication.",
    visual: "pharma",
    technology: ["FastAPI", "Python", "MySQL", "SQLAlchemy", "JWT Auth", "React 19", "Vite", "Tailwind CSS v4", "Axios"],
    featured: true,
    year: "2026",
    stats: "Role-Based JWT Auth · Interactive Swagger UI",
    githubUrl: "https://github.com/marufrayhan606/CityPharma",
    keyFeatures: [
      "Role-Based Authentication: Granular Manager and Staff access tiers with secure JWT token validation",
      "Inventory & Expiry Auditing: Real-time tracking of medicine batches, low-stock threshold alerts, and expiration flags",
      "FastAPI REST Endpoints: Interactive OpenAPI / Swagger UI documentation with sub-25ms response latency",
      "React 19 & Tailwind Client: High-performance modern web dashboard with React Hook Form validation and Lucide icons",
    ],
    details: "Comprises a decoupled full-stack architecture: a high-speed Python/FastAPI backend (CityPharma-API) backed by MySQL and SQLAlchemy ORM, paired with a modern React 19 + Vite frontend (CityPharma). Implements strict role-based authorization for pharmacy managers and dispensing staff.",
  },

  {
    slug: "civicfeed",
    name: "CivicFeed",
    category: "WEB APPLICATION · REACT & FIREBASE",
    domain: "fullstack",
    summary: "A community news and civic engagement hub enabling residents to report municipal issues, track resolution statuses, and view verified local announcements.",
    visual: "civic",
    technology: ["React 19", "Firebase", "Tailwind CSS", "Recharts", "React Router", "Playwright"],
    featured: true,
    year: "2026",
    stats: "Real-time Firebase Sync · Civic Analytics",
    githubUrl: "https://github.com/marufrayhan606/CivicFeed",
    keyFeatures: [
      "Community Issue Ingestion: Citizen reporting interface for neighborhood sanitation, road hazards, and utility alerts",
      "Live Status Dispatch: Real-time synchronization via Firebase Cloud Firestore tracking issue resolutions",
      "Civic Analytics Dashboard: Recharts data visualization mapping complaint frequency across municipal zones",
      "E2E Test Coverage: Automated browser test suite engineered with Playwright",
    ],
    details: "Designed to bridge communication between citizens and local authorities. Engineered with React 19, Firebase backend persistence, and Tailwind CSS. Features interactive analytical charts powered by Recharts.",
  },

  {
    slug: "trafficflow-edqn",
    name: "TrafficFlow EDQN",
    category: "RESEARCH PAPER · DEEP REINFORCEMENT LEARNING",
    domain: "research",
    summary: "An academic research project implementing an Enhanced Deep Q-Network (Dueling DQN) for intelligent urban traffic signal control using multi-camera video states.",
    visual: "traffic",
    technology: ["Python", "PyTorch 2.5.1", "CUDA 11.8", "Dueling DQN", "OpenCV", "NumPy", "Matplotlib"],
    featured: true,
    year: "2026",
    stats: "~2.3x Reward Gain · 9.5M Param Dueling Architecture",
    githubUrl: "https://github.com/marufrayhan606/TrafficFlowOptimization_EDQN",
    keyFeatures: [
      "12-Channel Visual State: 4 camera angle RGB frames stacked (128x128) capturing real-time intersection density",
      "Dueling DQN Architecture: Decoupled Value stream (FC-512-1) and Advantage stream (FC-512-4) with 9.5M total parameters",
      "Action-Aware MDP Reward: Reward formulation penalizing pixel-derived queue/delay proxies while rewarding congestion clearing",
      "Proven Baseline Superiority: Outperforms standard Random and Fixed-Time traffic controllers by ~2.3x in cumulative reward",
    ],
    details: "Authored as an advanced research paper on autonomous traffic optimization using the SynTraC dataset. Trained on an NVIDIA RTX 2060 SUPER (CUDA 11.8) across 50 episodes. Demonstrates monotonic loss reduction (4.86 -> 0.065) and significant delay reduction compared to conventional cyclic signal timings.",
  },

  {
    slug: "ndss-hackathon-2026",
    name: "NDSS Data Hackathon 2026",
    category: "NATIONAL HACKATHON · 6TH PLACE NATIONWIDE",
    domain: "research",
    summary: "Starship telemetry safety breach binary classification model engineered for the 5th National Data Science Summit 2026 Hackathon, securing 6th place nationwide.",
    visual: "hackathon",
    technology: ["Python", "scikit-learn", "Random Forest", "Jupyter", "Pandas", "NumPy", "joblib"],
    featured: false,
    year: "2026",
    stats: "6th Place Nationwide · 72.0% Precision",
    githubUrl: "https://github.com/marufrayhan606/NDSS-Data-Hackathon-2026",
    keyFeatures: [
      "15-Channel Telemetry Processing: Thermal gradients, power skews, spatial coordinates, and bimodal core telemetry",
      "Robust Predictive Model: Random Forest ensemble tuned with stratified cross-validation achieving 0.696 F1 score",
      "Automated Inference Pipeline: End-to-end preprocessing, one-hot encoding, and serialized joblib model deployment",
    ],
    details: "Developed under tight 24-hour hackathon constraints by Team Toddler at the 5th National Data Science Summit. Outperformed dozens of competitive university teams across Bangladesh to secure 6th place nationally.",
  },

  {
    slug: "bloodbank",
    name: "Blood Bank Management System",
    category: "DESKTOP SOFTWARE · JAVA & MYSQL",
    domain: "utility",
    summary: "A desktop management system for donor registries, blood type inventory auditing, and urgent hospital supply allocation.",
    visual: "bloodbank",
    technology: ["Java 11", "Swing", "FlatLaf UI", "MySQL 8", "JFreeChart", "MigLayout", "Maven"],
    featured: false,
    year: "2025",
    stats: "Modern FlatLaf Dark UI · JFreeChart Analytics",
    githubUrl: "https://github.com/marufrayhan606/BloodBankManagementSystem",
    keyFeatures: [
      "Donor & Inventory Auditing: Track ABO/Rh blood units with real-time expiration monitoring",
      "Modern FlatLaf GUI: Sleek IntelliJ-inspired dark desktop theme with responsive MigLayout",
      "Data Visualization: Interactive blood stock distribution bar charts rendered with JFreeChart",
      "Relational MySQL Engine: ACID-compliant schema with indexed query retrieval",
    ],
    details: "Demonstrates core Object-Oriented Software Engineering (OOP) principles. Uses Java 11, FlatLaf modern UI, and MySQL Connector 8.0 for reliable local enterprise data auditing.",
  },

  {
    slug: "al-quran",
    name: "Al-Quran",
    category: "ANDROID EXPERIMENTAL · JETPACK COMPOSE",
    domain: "android",
    summary: "An experimental Android application engineered to explore modern Media3 ExoPlayer audio recitation streaming and Room DB offline caching.",
    visual: "quran",
    technology: ["Kotlin", "Jetpack Compose", "Material 3", "Media3 ExoPlayer", "Room DB", "Hilt", "Retrofit", "Target SDK 36"],
    featured: false,
    year: "2026",
    stats: "Media3 Streaming · Room DB Offline Engine",
    githubUrl: "https://github.com/marufrayhan606/Al-Quran",
    keyFeatures: [
      "ExoPlayer Audio Recitation: Background audio playback with notification transport controls",
      "Clean Architecture & MVI: Unidirectional data flow with ViewModel, Kotlin Coroutines & Flow",
      "Room DB Ayah Caching: Offline database storing surahs and reading progress",
    ],
    details: "Engineered as an exploratory Jetpack Compose Material 3 project targeting Android 16 (SDK 36) to experiment with the latest AndroidX Media3 streaming architectures and Dagger Hilt dependency injection.",
  },

  {
    slug: "farmassist",
    name: "FarmAssist",
    category: "CONSOLE SOFTWARE · C++ & OOP",
    domain: "utility",
    summary: "A console-based agricultural resource planning and harvest estimation program built with C++ and file persistence.",
    visual: "farmassist",
    technology: ["C++", "Object-Oriented Programming", "File I/O", "CLI"],
    featured: false,
    year: "2024",
    stats: "Modular OOP Architecture · CSV Persistence",
    githubUrl: "https://github.com/marufrayhan606/FarmAssist",
    details: "Engineered in C++ to provide farmers with crop planning calculations, fertilizer dosage recommendations, and inventory ledger tracking.",
  },
];

export const skills = [
  {
    group: "ANDROID DEVELOPMENT",
    icon: "smartphone",
    highlight: "Primary Focus",
    items: ["Kotlin", "Java", "Jetpack Compose", "MVVM", "Clean Architecture", "Hilt", "Room", "Retrofit", "Ktor", "Koin", "Coroutines & Flow"],
  },
  {
    group: "DATA SCIENCE & AI",
    icon: "cpu",
    highlight: "Major Track",
    items: ["Python", "NumPy", "Pandas", "Matplotlib", "scikit-learn", "PyTorch", "Small Language Models", "MCP", "Agentic AI workflows"],
  },
  {
    group: "BACKEND & INFRASTRUCTURE",
    icon: "database",
    highlight: "Full-Stack Bridge",
    items: ["FastAPI", "Spring Boot", "Node.js", "SQLAlchemy", "MySQL", "MongoDB", "SQL", "REST APIs", "Git & GitHub"],
  },
  {
    group: "PROGRAMMING LANGUAGES",
    icon: "code",
    highlight: "Foundations",
    items: ["Kotlin", "Python", "Java", "C++", "C", "SQL"],
  },
];

export const radarMetrics = [
  { axis: "Android Architecture", score: 94, category: "Android" },
  { axis: "Jetpack Compose UI", score: 92, category: "Android" },
  { axis: "Kotlin & Coroutines", score: 96, category: "Languages" },
  { axis: "Data Science & Pandas", score: 86, category: "Data Science" },
  { axis: "PyTorch & On-Device ML", score: 83, category: "Data Science" },
  { axis: "Backend & APIs", score: 81, category: "Full-Stack" },
  { axis: "Problem Solving / Algorithms", score: 88, category: "CS Core" },
  { axis: "Clean Code & Design Patterns", score: 90, category: "Engineering" },
];

export const semesters = [
  { term: "Fall ’23", fullTerm: "Fall 2023", score: 3.91, highlight: "CS Fundamentals & Discrete Math" },
  { term: "Spring ’24", fullTerm: "Spring 2024", score: 3.88, highlight: "Data Structures & OOP with Java" },
  { term: "Fall ’24", fullTerm: "Fall 2024", score: 3.96, highlight: "Algorithms & Android Architecture (Peak GPA)" },
  { term: "Spring ’25", fullTerm: "Spring 2025", score: 3.89, highlight: "Database Management & Software Design" },
  { term: "Summer ’25", fullTerm: "Summer 2025", score: 3.94, highlight: "Data Science Specialization & Statistics" },
  { term: "Fall ’25", fullTerm: "Fall 2025", score: 3.95, highlight: "Machine Learning & Neural Architectures" },
  { term: "Spring ’26", fullTerm: "Spring 2026", score: 3.94, highlight: "Advanced Mobile Systems & Distributed APIs" },
  { term: "Summer ’26", fullTerm: "Summer 2026", score: 3.93, highlight: "Senior Capstone & Agentic Systems" },
];

export const achievements = [
  {
    event: "5th National Data Science Summit",
    detail: "Data Hackathon · 6th Place Nationwide",
    year: "2026",
    type: "placement",
    badge: "6th PLACE",
    description: "Competed in an intensive national data hackathon tackling end-to-end predictive modeling and real-world data pipelines against university teams across Bangladesh.",
  },
  {
    event: "DIU CodeTrap Programming Contest",
    detail: "Competitive Programming Contest Participant",
    year: "2025",
    type: "participation",
    badge: "CONTESTANT",
    description: "Tackled algorithmic and competitive problem solving under tight time constraints.",
  },
  {
    event: "DIU CodeTrap Programming Contest",
    detail: "Ranked 8th Position in University Division",
    year: "2024",
    type: "placement",
    badge: "TOP 10 RANK",
    description: "Secured top-10 university placement solving advanced graph, dynamic programming, and greedy optimization challenges.",
  },
  {
    event: "4th National Data Science Summit",
    detail: "Research Poster: “AI in Education” · 2nd Runner-Up",
    year: "2024",
    type: "placement",
    badge: "2nd RUNNER-UP",
    description: "Presented research methodology on adaptive learning systems and student engagement metrics powered by ML models.",
  },
  {
    event: "NASA Space Apps Challenge",
    detail: "AETHER MARSIS Platform Developer",
    year: "2024",
    type: "placement",
    badge: "GLOBAL CHALLENGE",
    description: "Architected Mars subsurface exploration visualization tool using NASA/ESA telemetry radar sounder datasets.",
  },
  {
    event: "International Collegiate Programming Contest (ICPC)",
    detail: "Preliminary Round Participant",
    year: "2023",
    type: "participation",
    badge: "ICPC CONTESTANT",
    description: "Participated in the premier global university competitive programming event.",
  },
];

export type Certificate = {
  id: string;
  title: string;
  event: string;
  issuer: string;
  year: string;
  badge: string;
  category: "award" | "hackathon" | "participation";
  image: string;
  images?: string[];
  imageLabels?: string[];
  caption: string;
};

export const certificates: Certificate[] = [
  {
    id: "ds-summit-2026",
    title: "6th Place · National Data Hackathon",
    event: "5th National Data Science Summit 2026",
    issuer: "Data Science Network & Academic Summit",
    year: "2026",
    badge: "6th PLACE AWARD",
    category: "hackathon",
    image: "/certificates/data-science-summit-2026.png",
    images: [
      "/certificates/data-science-summit-2026.png",
      "/certificates/data-science-summit-2026_ranking.png",
    ],
    imageLabels: [
      "Official Certificate",
      "National Hackathon Ranking",
    ],
    caption: "Secured 6th place nationwide in the 24-hour predictive modeling data hackathon tackling real-world tabular and multimodal datasets.",
  },
  {
    id: "ds-summit-2024",
    title: "2nd Runner-Up · Research Poster Presentation",
    event: "4th National Data Science Summit 2024",
    issuer: "National Data Summit Committee",
    year: "2024",
    badge: "2nd RUNNER-UP",
    category: "award",
    image: "/certificates/data-science-summit-2024.png",
    caption: "Awarded 2nd Runner-Up for research poster on 'AI in Education: Machine Learning Models for Adaptive Student Progression'.",
  },
  {
    id: "codetrap-2024",
    title: "8th Place · University Division",
    event: "DIU CodeTrap Programming Contest 2024",
    issuer: "DIU Department of Software Engineering",
    year: "2024",
    badge: "TOP 10 RANK",
    category: "award",
    image: "/certificates/codetrap-2024.jpg",
    caption: "Ranked 8th position solving algorithmic, graph, and optimization problems in university-wide contest.",
  },
  {
    id: "nasa-space-apps-2024",
    title: "Global Mission Challenge Developer",
    event: "NASA International Space Apps Challenge 2024",
    issuer: "NASA Space Apps Organizing Committee",
    year: "2024",
    badge: "GLOBAL PARTICIPANT",
    category: "hackathon",
    image: "/certificates/nasa-space-apps-2024.jpg",
    caption: "Engineered the AETHER MARSIS radar subsurface telemetry visualization software for planetary science.",
  },
  {
    id: "icpc-2023",
    title: "Preliminary Contestant",
    event: "ICPC Asia Dhaka Regional Preliminary 2023",
    issuer: "ICPC Asia Regional Council",
    year: "2023",
    badge: "ICPC CONTESTANT",
    category: "participation",
    image: "/certificates/icpc-2023.jpg",
    caption: "Competed in the International Collegiate Programming Contest preliminary round testing algorithmic precision.",
  },
  {
    id: "codetrap-2025",
    title: "Competitive Programming Contestant",
    event: "DIU CodeTrap Programming Contest 2025",
    issuer: "DIU SWE Club & Department",
    year: "2025",
    badge: "CONTESTANT",
    category: "participation",
    image: "/certificates/codetrap-2025.jpg",
    caption: "Participated in the university division competitive programming championship.",
  },
];
