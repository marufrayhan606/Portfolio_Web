export type ExternalLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  domain: "android" | "ai" | "interactive" | "utility";
  summary: string;
  visual: "schedule" | "sentinel" | "mars" | "scribe" | "sync" | "result" | "spend" | "utility";
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
    githubUrl: "https://github.com/marufrayhan606",
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
    slug: "sentinel",
    name: "Sentinel",
    category: "ANDROID · MACHINE LEARNING",
    domain: "ai",
    summary: "An Android defense engine focused on private on-device scam, fraud, and spam classification using real-time machine learning pipelines.",
    visual: "sentinel",
    technology: ["Android", "Kotlin", "Machine Learning", "PyTorch", "ONNX"],
    featured: true,
    year: "2025",
    stats: "Zero-cloud privacy · Real-time inference",
    githubUrl: "https://github.com/marufrayhan606",
    details: "Executes lightweight transformer/NLP classification models locally on Android devices without transferring sensitive user messages to external servers.",
  },
  {
    slug: "aether-marsis",
    name: "AETHER MARSIS",
    category: "INTERACTIVE · EXPLORATION",
    domain: "interactive",
    summary: "An interactive Mars subsurface exploration and telemetry mission-support platform engineered for the global NASA Space Apps Challenge.",
    visual: "mars",
    technology: ["Interactive platform", "Python", "Data Visualization", "WebGL"],
    featured: true,
    year: "2024",
    stats: "NASA Space Apps Challenge Entry",
    githubUrl: "https://github.com/marufrayhan606",
    details: "Synthesizes radar subsurface sounder datasets from Mars Express MARSIS into real-time interactive topographic and geological representations.",
  },
  {
    slug: "aurascribe",
    name: "AuraScribe",
    category: "AI · TEXT PROCESSING",
    domain: "ai",
    summary: "An AI-assisted text-processing and semantic summarization system engineered with Python and natural language intelligence workflows.",
    visual: "scribe",
    technology: ["Python", "FastAPI", "NLP", "PyTorch"],
    featured: false,
    year: "2024",
    stats: "Semantic NLP pipeline",
    githubUrl: "https://github.com/marufrayhan606",
  },
  {
    slug: "syncup",
    name: "SyncUp",
    category: "ANDROID · GROUPS",
    domain: "android",
    summary: "A peer-to-peer student group orchestration and emergency announcements platform designed for academic cohort representatives.",
    visual: "sync",
    technology: ["Android", "Kotlin", "Firebase", "Jetpack"],
    featured: false,
    year: "2024",
    stats: "Instant batch notifications",
    githubUrl: "https://github.com/marufrayhan606",
  },
  {
    slug: "diu-result",
    name: "DIU Result",
    category: "ANDROID · EDUCATION",
    domain: "android",
    summary: "A streamlined client application engineered to securely ingest and visualize university semester examination analytics from student portals.",
    visual: "result",
    technology: ["Kotlin", "Android", "Web Scraping", "Material You"],
    featured: false,
    year: "2023",
    stats: "Automated GPA calculation",
    githubUrl: "https://github.com/marufrayhan606",
  },
  {
    slug: "onespender",
    name: "OneSpender",
    category: "UTILITY · FINANCE",
    domain: "utility",
    summary: "A personal expense tracker emphasizing frictionless ledger entry, visual budget breakdown, and local encrypted persistence.",
    visual: "spend",
    technology: ["Kotlin", "Jetpack Compose", "DataStore"],
    featured: false,
    year: "2023",
    stats: "Encrypted offline ledger",
    githubUrl: "https://github.com/marufrayhan606",
  },
  {
    slug: "naptrap",
    name: "NapTrap",
    category: "UTILITY",
    domain: "utility",
    summary: "A smart commute alarm application leveraging transit geofencing to wake traveling passengers before arriving at their destination stop.",
    visual: "utility",
    technology: ["Android", "Location Services", "Foreground Workers"],
    featured: false,
    year: "2023",
    stats: "Geofenced wake-up triggers",
    githubUrl: "https://github.com/marufrayhan606",
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
