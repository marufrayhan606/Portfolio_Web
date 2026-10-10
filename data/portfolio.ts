export type ExternalLink = { label: string; href: string };
export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  visual: "schedule" | "sentinel" | "mars" | "scribe" | "sync" | "result" | "spend" | "utility";
  technology?: string[];
  featured?: boolean;
};

export const profile = {
  name: "Md. Maruf Rayhan",
  shortName: "MARUF RAYHAN",
  role: "Android developer",
  focus: "Learning data science & machine learning",
  location: "Dhaka, Bangladesh",
  bio: "I’m a Software Engineering student at Daffodil International University, focused on Android development and learning Data Science. I enjoy building useful mobile products and exploring how machine learning can solve practical problems.",
  socials: [
    { label: "GitHub", href: "https://github.com/marufrayhan606" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marufrayhan606" },
  ] satisfies ExternalLink[],
};

export const projects: Project[] = [
  { slug: "diu-campus-schedule", name: "DIU Campus Schedule", category: "ANDROID · CAMPUS LIFE", summary: "An academic companion for DIU students, bringing class and exam schedules, announcements, and faculty information into one mobile experience.", visual: "schedule", technology: ["Android"], featured: true },
  { slug: "sentinel", name: "Sentinel", category: "ANDROID · MACHINE LEARNING", summary: "An Android application focused on on-device scam and spam protection using machine learning.", visual: "sentinel", technology: ["Android", "Machine learning"], featured: true },
  { slug: "aether-marsis", name: "AETHER MARSIS", category: "INTERACTIVE · EXPLORATION", summary: "An interactive Mars exploration and mission-support platform developed for the NASA Space Apps Challenge.", visual: "mars", technology: ["Interactive platform"], featured: true },
  { slug: "aurascribe", name: "AuraScribe", category: "AI · TEXT PROCESSING", summary: "An AI-assisted text-processing software system.", visual: "scribe", technology: ["Python"] },
  { slug: "syncup", name: "SyncUp", category: "ANDROID · GROUPS", summary: "A group-management and announcements application designed for class representatives and students.", visual: "sync" },
  { slug: "diu-result", name: "DIU Result", category: "ANDROID · EDUCATION", summary: "An application built to access university examination results from the student portal.", visual: "result" },
  { slug: "onespender", name: "OneSpender", category: "UTILITY · FINANCE", summary: "An expense-tracking utility app.", visual: "spend" },
  { slug: "naptrap", name: "NapTrap", category: "UTILITY", summary: "A personal utility app.", visual: "utility" },
];

export const skills = [
  { group: "ANDROID DEVELOPMENT", items: ["Kotlin", "Java", "Jetpack Compose", "MVVM", "Clean Architecture", "Hilt", "Room", "Retrofit", "Ktor", "Koin"] },
  { group: "DATA SCIENCE & AI", items: ["Python", "NumPy", "Pandas", "Matplotlib", "scikit-learn", "PyTorch", "Small Language Models", "MCP", "Agentic AI workflows"] },
  { group: "BACKEND & DATA", items: ["FastAPI", "Spring Boot", "Node.js", "SQLAlchemy", "MySQL", "MongoDB", "SQL"] },
  { group: "PROGRAMMING", items: ["C", "C++", "Java", "Kotlin", "Python", "SQL"] },
];

export const semesters = [
  { term: "Fall ’23", fullTerm: "Fall 2023", score: 3.91 },
  { term: "Spring ’24", fullTerm: "Spring 2024", score: 3.88 },
  { term: "Fall ’24", fullTerm: "Fall 2024", score: 3.96 },
  { term: "Spring ’25", fullTerm: "Spring 2025", score: 3.89 },
  { term: "Summer ’25", fullTerm: "Summer 2025", score: 3.94 },
  { term: "Fall ’25", fullTerm: "Fall 2025", score: 3.95 },
  { term: "Spring ’26", fullTerm: "Spring 2026", score: 3.94 },
  { term: "Summer ’26", fullTerm: "Summer 2026", score: 3.93 },
];

export const achievements = [
  { event: "5th National Data Science Summit", detail: "Data Hackathon · 6th place", year: "2026", type: "placement" },
  { event: "DIU CodeTrap Programming Contest", detail: "Participant", year: "2025", type: "participation" },
  { event: "DIU CodeTrap Programming Contest", detail: "8th position", year: "2024", type: "placement" },
  { event: "4th National Data Science Summit", detail: "Poster: “AI in Education” · 2nd runner-up", year: "2024", type: "placement" },
  { event: "ICPC", detail: "Participant", year: "", type: "participation" },
];
