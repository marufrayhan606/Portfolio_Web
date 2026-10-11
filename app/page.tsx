"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowIcon,
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  CodeIcon,
  TrophyIcon,
  CpuIcon,
  SmartphoneIcon,
  SparklesIcon,
  ActivityIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  AwardIcon,
  DatabaseIcon,
  PlayStoreIcon,
  GlobeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { HolographicPortrait } from "@/components/holographic-portrait";
import { AdaptiveImage } from "@/components/adaptive-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import {
  profile,
  projects,
  skills,
  statsMetrics,
  certificates,
  type Project,
  type Certificate,
} from "@/data/portfolio";
import {
  ProjectModal,
  CertificateModal,
  AcademicModal,
  SkillsRadarModal,
} from "@/components/portfolio-modals";

function CertificateCardItem({
  cert,
  idx,
  onOpenDialog,
}: {
  cert: Certificate;
  idx: number;
  onOpenDialog: (cert: Certificate, slideIdx: number) => void;
}) {
  const [slideIdx, setSlideIdx] = useState(0);

  const mediaList = cert.images && cert.images.length > 0 ? cert.images : [cert.image];
  const hasMultipleImages = mediaList.length > 1;
  const labelList = cert.imageLabels && cert.imageLabels.length > 0
    ? cert.imageLabels
    : mediaList.map((_, i) => (i === 0 ? "Official Certificate" : `Proof ${i + 1}`));

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    setSlideIdx((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    setSlideIdx((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0));
  };

  const currentMediaSrc = mediaList[slideIdx] || cert.image;
  const currentMediaLabel = labelList[slideIdx] || "Official Proof";

  return (
    <div
      onClick={() => onOpenDialog(cert, slideIdx)}
      className="certificate-card glass-panel tilt-card reveal-on-scroll"
      style={{ transitionDelay: `${idx * 0.05}s` }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View certificate proof for ${cert.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenDialog(cert, slideIdx);
      }}
    >
      <div>
        <div className="cert-card-top">
          <span className={`timeline-badge ${cert.category}`}>{cert.badge}</span>
          <time className="timeline-year">{cert.year}</time>
        </div>

        {/* Certificate Preview Frame (Carousel if multiple images, clean normal if single) */}
        <div className="cert-card-preview-frame">
          <AdaptiveImage
            key={currentMediaSrc}
            src={currentMediaSrc}
            alt={`${cert.title} - ${currentMediaLabel}`}
            className="cert-card-preview-img"
            fallbackElement={
              <div className="cert-preview-fallback">
                <TrophyIcon className="cert-fallback-icon" />
                <span className="cert-fallback-text">{cert.badge}</span>
              </div>
            }
          />

          {/* Carousel Category Pill ONLY if multiple images */}
          {hasMultipleImages && (
            <div className="cert-carousel-pill">
              <span className="cert-carousel-pill-dot" />
              <span>{currentMediaLabel}</span>
              <span className="cert-carousel-count">
                ({slideIdx + 1}/{mediaList.length})
              </span>
            </div>
          )}

          {/* Carousel Prev/Next Buttons on Card ONLY if multiple images */}
          {hasMultipleImages && (
            <div className="cert-card-carousel-nav" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="cert-card-nav-btn btn-prev"
                onClick={prevSlide}
                aria-label="Previous preview option"
                title="Previous image option"
              >
                <ChevronLeftIcon className="nav-btn-icon" />
              </button>
              <button
                type="button"
                className="cert-card-nav-btn btn-next"
                onClick={nextSlide}
                aria-label="Next preview option"
                title="Next image option"
              >
                <ChevronRightIcon className="nav-btn-icon" />
              </button>
            </div>
          )}

          {/* Dot Indicators ONLY if multiple images */}
          {hasMultipleImages && (
            <div className="cert-card-carousel-dots" onClick={(e) => e.stopPropagation()}>
              {mediaList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`carousel-dot ${slideIdx === dotIdx ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideIdx(dotIdx);
                  }}
                  aria-label={`Switch to option ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

          <div className="cert-preview-overlay">
            <div
              className="cert-inspect-chip"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDialog(cert, slideIdx);
              }}
            >
              <SparklesIcon className="cert-chip-icon" />
              <span>Inspect {hasMultipleImages ? `(${mediaList.length} Options)` : "Proof"} &rarr;</span>
            </div>
          </div>
        </div>

        <div className="cert-card-content">
          <h3>{cert.title}</h3>
          <span className="cert-card-event">{cert.event}</span>
          <p className="cert-card-caption">{cert.caption}</p>
        </div>
      </div>

      <div
        className="cert-view-btn"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDialog(cert, slideIdx);
        }}
      >
        <span>View Details &amp; {hasMultipleImages ? `${mediaList.length} Options` : "Proof"}</span>
        <ArrowIcon className="cert-arrow-icon" />
      </div>
    </div>
  );
}

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showUtilityProjects, setShowUtilityProjects] = useState(false);

  // Active Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedCertSlide, setSelectedCertSlide] = useState(0);
  const [academicModalOpen, setAcademicModalOpen] = useState(false);
  const [skillsRadarModalOpen, setSkillsRadarModalOpen] = useState(false);
  const [flagshipScreenIdx, setFlagshipScreenIdx] = useState(0);

  const flagshipProjects = projects.filter((p) => p.domain !== "utility");
  const utilityProjects = projects.filter((p) => p.domain === "utility");

  const diuProject = projects.find((p) => p.slug === "diu-campus-schedule");
  const isDiuVisible = (projectFilter === "all" || projectFilter === "android") && Boolean(diuProject);

  const diuScreenshots = useMemo(() => {
    return diuProject?.screenshots && diuProject.screenshots.length > 0
      ? diuProject.screenshots
      : [
          "/projects/diu-campus-schedule/Dashboard.png",
          "/projects/diu-campus-schedule/Class_Routine.png",
          "/projects/diu-campus-schedule/Class_Notification.png",
          "/projects/diu-campus-schedule/CR_Announcements.png",
          "/projects/diu-campus-schedule/Empty_Room.png",
          "/projects/diu-campus-schedule/Faculty_Info.png",
        ];
  }, [diuProject]);

  const diuScreenshotTitles = [
    "Academic Dashboard",
    "Class Routine & Filter",
    "30-Min Class Notification",
    "CR Notice Board",
    "Empty Classroom Finder",
    "Faculty Directory",
  ];

  const displayedProjects = flagshipProjects.filter((p) => {
    if (projectFilter === "all") return true;
    return p.domain === projectFilter;
  });

  const gridProjects = displayedProjects.filter((p) =>
    isDiuVisible ? p.slug !== "diu-campus-schedule" : true
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* ========================================================
            1. HERO SECTION (Uncongested, High-Impact First Sight)
        ======================================================== */}
        <section className="home-hero-2026 container" id="top" aria-labelledby="home-title">
          <div className="hero-ambient-glow glow-emerald" aria-hidden="true" />
          <div className="hero-ambient-glow glow-cyan" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-content-column">
              {/* Location & Status Capsule */}
              <div className="hero-status-pill glass-panel reveal-on-scroll">
                <span className="status-live-beacon" />
                <span className="pill-text">DHAKA, BANGLADESH · DIU</span>
                <span className="pill-divider" />
                <span className="pill-sub">AVAILABLE FOR SWE &amp; ANDROID ROLES</span>
              </div>

              {/* Headline */}
              <h1 id="home-title" className="hero-glitch-headline reveal-on-scroll">
                Software Engineer.
                <br />
                <span className="text-gradient-iridescent">
                  Android &amp; Applied Data Science.
                </span>
              </h1>

              <p className="hero-bio-lead reveal-on-scroll">
                I’m <strong className="bio-name">{profile.name}</strong>, a final-year Software Engineering student at Daffodil International University, majoring in Data Science. I engineer reactive, production-grade Android apps with Kotlin &amp; Jetpack Compose, and deploy applied machine learning models.
              </p>

              {/* Primary Call to Actions */}
              <div className="hero-action-buttons reveal-on-scroll">
                <a href="#work" className="button-neon-glow" data-cursor="EXPLORE">
                  <span>Explore Selected Work</span>
                  <ArrowRightIcon className="btn-icon" />
                </a>
                <button
                  type="button"
                  onClick={() => setAcademicModalOpen(true)}
                  className="button-glass-pill"
                  data-cursor="RESULTS"
                >
                  <AwardIcon className="btn-icon-subtle" />
                  <span>Academic Trajectory (3.93)</span>
                </button>
              </div>

              {/* Direct Professional Channels */}
              <div className="hero-social-strip reveal-on-scroll">
                <a
                  href="https://github.com/marufrayhan606"
                  target="_blank"
                  rel="noreferrer"
                  className="social-badge glass-panel"
                  data-cursor="GITHUB"
                >
                  <GithubIcon className="social-icon" />
                  <span>GitHub</span>
                  <ArrowIcon className="social-arrow" />
                </a>
                <a
                  href="https://www.linkedin.com/in/marufrayhan606"
                  target="_blank"
                  rel="noreferrer"
                  className="social-badge glass-panel"
                  data-cursor="LINKEDIN"
                >
                  <LinkedinIcon className="social-icon linkedin" />
                  <span>LinkedIn</span>
                  <ArrowIcon className="social-arrow" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="social-badge glass-panel"
                  data-cursor="EMAIL"
                >
                  <MailIcon className="social-icon" />
                  <span>Email Directly</span>
                  <ArrowIcon className="social-arrow" />
                </a>
              </div>
            </div>

            {/* Clean Executive Holographic Portrait */}
            <div className="hero-stage-column reveal-on-scroll" aria-label="Executive Portrait">
              <HolographicPortrait />
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="hero-stats-ribbon">
            {statsMetrics.map((stat, idx) => (
              <div
                key={stat.label}
                className="stat-card-glass glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="stat-card-top">
                  <span className="stat-icon-wrapper">
                    {stat.icon === "award" && <AwardIcon className="stat-svg" />}
                    {stat.icon === "code" && <CodeIcon className="stat-svg" />}
                    {stat.icon === "trophy" && <TrophyIcon className="stat-svg" />}
                    {stat.icon === "cpu" && <CpuIcon className="stat-svg" />}
                  </span>
                  <span className="stat-tag">METRIC 0{idx + 1}</span>
                </div>
                <div className="stat-val-group">
                  <strong className="stat-val text-gradient-iridescent">{stat.value}</strong>
                  <span className="stat-title">{stat.label}</span>
                </div>
                <p className="stat-sub">{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            2. ABOUT & EDUCATION (High-Signal, Clean Split)
        ======================================================== */}
        <section className="about-overview-section container" id="about" aria-labelledby="about-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <SparklesIcon className="badge-icon" />
              <span>01 / BACKGROUND &amp; EDUCATION</span>
            </div>
            <h2 id="about-title">
              Engineering Foundations.
              <br />
              <em>Driven by Curiosity &amp; Academic Rigor.</em>
            </h2>
          </div>

          <div className="about-split-grid">
            {/* Card 1: Core Focus */}
            <div className="about-info-box glass-panel tilt-card reveal-on-scroll">
              <div>
                <div className="about-box-title">
                  <SmartphoneIcon className="stat-svg text-gradient-iridescent" />
                  <h3>Engineering Focus &amp; Practice</h3>
                </div>
                <p className="about-box-p" style={{ marginTop: "14px" }}>
                  My primary focus is native Android engineering with Kotlin, Jetpack Compose, and Clean Architecture. I specialize in offline-first data synchronization, reactive MVI/MVVM states, and integrating on-device machine learning models with zero-cloud latency.
                </p>
              </div>
              <div className="skill-pills-cloud">
                <TechMark name="Kotlin" compact glow />
                <TechMark name="Jetpack Compose" compact glow />
                <TechMark name="Clean Architecture" compact glow />
                <TechMark name="PyTorch" compact glow />
                <TechMark name="On-Device ML" compact glow />
              </div>
            </div>

            {/* Card 2: Academic Credentials */}
            <div className="about-info-box glass-panel tilt-card reveal-on-scroll">
              <div>
                <div className="about-box-title">
                  <AwardIcon className="stat-svg text-gradient-iridescent" />
                  <h3>Daffodil International University</h3>
                </div>
                <p className="about-box-p" style={{ marginTop: "14px" }}>
                  B.Sc. in Software Engineering, Major in Data Science (2023–2026). Consistently achieved top-tier academic scores across all 8 semesters.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="edu-highlight-pill">
                  <span className="edu-highlight-label">Degree &amp; Major</span>
                  <span className="edu-highlight-val">B.Sc. SWE · Data Science</span>
                </div>
                <div className="edu-highlight-pill">
                  <span className="edu-highlight-label">Semester GPA Average</span>
                  <span className="edu-highlight-val">3.93 / 4.00 Scale</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAcademicModalOpen(true)}
                  className="btn-details-trigger"
                  style={{ alignSelf: "flex-start", marginTop: "4px" }}
                >
                  <ActivityIcon className="btn-icon-subtle" />
                  <span>Semester GPA Breakdown</span>
                  <ArrowIcon className="btn-arrow" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. CORE TECHNICAL SKILLS (Curated, No Fluff)
        ======================================================== */}
        <section className="toolkit-section-2026 container" id="skills" aria-labelledby="skills-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <CpuIcon className="badge-icon" />
              <span>02 / TECHNICAL COMPETENCIES</span>
            </div>
            <h2 id="skills-title">
              Curated Toolchain.
              <br />
              <em>Modern Native &amp; Intelligence Stacks.</em>
            </h2>
            <p className="section-subtext">
              Focused proficiency across modern Android architectures, data science, and backend APIs.
            </p>
          </div>

          <div className="skills-editorial-grid">
            {skills.slice(0, 3).map((skillGroup, idx) => (
              <div
                key={skillGroup.group}
                className="skill-category-card glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="skill-card-head">
                  <span className="skill-head-icon">
                    {skillGroup.icon === "smartphone" && <SmartphoneIcon />}
                    {skillGroup.icon === "cpu" && <CpuIcon />}
                    {skillGroup.icon === "database" && <DatabaseIcon />}
                  </span>
                  <div>
                    <span className="skill-highlight-tag">{skillGroup.highlight}</span>
                    <h3>{skillGroup.group}</h3>
                  </div>
                </div>

                <div className="skill-pills-cloud">
                  {skillGroup.items.map((item) => (
                    <TechMark name={item} key={item} compact glow />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="section-expand-container reveal-on-scroll">
            <button
              type="button"
              onClick={() => setSkillsRadarModalOpen(true)}
              className="toggle-expand-button glass-panel"
            >
              <ActivityIcon className="btn-icon-subtle" />
              <span>Inspect Competency Radar Matrix</span>
              <ArrowIcon className="btn-arrow" />
            </button>
          </div>
        </section>

        {/* ========================================================
            4. CURATED PROJECTS (Clean First Sight + View Details)
        ======================================================== */}
        <section className="projects-showcase-2026 container" id="work" aria-labelledby="projects-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <CodeIcon className="badge-icon" />
              <span>03 / SELECTED WORK</span>
            </div>
            <h2 id="projects-title">
              Featured Software Systems.
              <br />
              <em>Click Any Project to View Case Study &amp; Specs.</em>
            </h2>
            <p className="section-subtext">
              Hand-picked native Android platforms, privacy-focused machine learning systems, and space telemetry applications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="project-filter-dock glass-panel reveal-on-scroll">
            <span className="filter-label">Filter:</span>
            {[
              { id: "all", label: "All Projects" },
              { id: "android", label: "Android Native" },
              { id: "ai", label: "AI & ML" },
              { id: "interactive", label: "Interactive Tools" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-btn ${projectFilter === f.id ? "active" : ""}`}
                onClick={() => setProjectFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Flagship Production Showcase: DIU Campus Schedule */}
          {isDiuVisible && diuProject && (
            <div className="flagship-project-container reveal-on-scroll">
              <div className="flagship-project-card glass-panel tilt-card">
                <div className="flagship-top-ribbon">
                  <div className="flagship-badge-group">
                    <span className="flagship-status-pill">
                      <span className="status-ping-dot" /> PRODUCTION FLAGSHIP
                    </span>
                    <span className="flagship-store-pill">
                      <PlayStoreIcon className="flagship-store-icon" />
                      <span>Google Play Store Verified · 4.8★</span>
                    </span>
                  </div>
                  <span className="flagship-year-tag">{diuProject.year}</span>
                </div>

                <div className="flagship-main-grid">
                  <div className="flagship-info-col">
                    <div className="flagship-identity-row">
                      <div className="flagship-app-icon-shell">
                        <AdaptiveImage
                          src={diuProject.appIcon || "/images/diu-schedule-icon.png"}
                          alt="DIU Campus Schedule Icon"
                          className="flagship-app-icon-img"
                        />
                      </div>
                      <div>
                        <h3 className="flagship-title">{diuProject.name}</h3>
                        <p className="flagship-subtitle">
                          Official Campus Routine &amp; Student Ecosystem · Daffodil International University
                        </p>
                      </div>
                    </div>

                    <p className="flagship-desc">{diuProject.summary}</p>

                    {/* Real Play Store & Production Metrics */}
                    <div className="flagship-metrics-grid">
                      <div className="flagship-metric-chip">
                        <span className="metric-chip-val text-gradient-iridescent">6,000+</span>
                        <span className="metric-chip-label">Downloads</span>
                      </div>
                      <div className="flagship-metric-chip">
                        <span className="metric-chip-val text-gradient-iridescent">6,000+</span>
                        <span className="metric-chip-label">Active Students</span>
                      </div>
                      <div className="flagship-metric-chip">
                        <span className="metric-chip-val text-gradient-iridescent">4.8 ★</span>
                        <span className="metric-chip-label">Play Store Rating</span>
                      </div>
                      <div className="flagship-metric-chip">
                        <span className="metric-chip-val text-gradient-iridescent">Room DB</span>
                        <span className="metric-chip-label">Offline Engine</span>
                      </div>
                    </div>

                    {/* Key Capabilities Pills */}
                    <div className="flagship-features-pills">
                      <span className="flagship-feat-tag">⚡ Automated 30-min Class Alerts</span>
                      <span className="flagship-feat-tag">🔍 Routine &amp; Faculty Filter</span>
                      <span className="flagship-feat-tag">🏛️ Portals: BLC, Student &amp; Hall</span>
                      <span className="flagship-feat-tag">🏢 Live Empty Room Finder</span>
                      <span className="flagship-feat-tag">📅 Deadlines Tracker &amp; CR Alerts</span>
                      <span className="flagship-feat-tag">👥 116+ Faculty Directory</span>
                    </div>

                    <div className="flagship-tech-row">
                      {diuProject.technology?.map((tech) => (
                        <TechMark name={tech} key={tech} compact glow />
                      ))}
                    </div>

                    {/* Action Buttons: Download and Explore links */}
                    <div className="flagship-action-bar">
                      {diuProject.playStoreUrl && (
                        <a
                          href={diuProject.playStoreUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-neon-sm btn-action-playstore"
                        >
                          <PlayStoreIcon className="btn-icon-svg" />
                          <span>Android (Play Store)</span>
                          <ArrowIcon className="btn-arrow" />
                        </a>
                      )}
                      {diuProject.webAppUrl && (
                        <a
                          href={diuProject.webAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-neon-sm btn-action-webapp"
                        >
                          <GlobeIcon className="btn-icon-svg" />
                          <span>iOS &amp; Web App</span>
                          <ArrowIcon className="btn-arrow" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(diuProject)}
                        className="button-glass-pill-sm"
                      >
                        <ActivityIcon className="btn-icon-svg" />
                        <span>Interface Tour &amp; Specs</span>
                        <ArrowIcon className="btn-arrow" />
                      </button>
                      <a
                        href={diuProject.githubUrl || "https://github.com/marufrayhan606"}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-github-mini"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="btn-icon-svg" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>

                  {/* Right side: Real Web App Screenshot Preview Showcase */}
                  <div className="flagship-preview-col">
                    <div
                      className="flagship-device-frame"
                      onClick={() => setSelectedProject(diuProject)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedProject(diuProject); }}
                      aria-label="Open full interface tour & specs modal"
                    >
                      <AdaptiveImage
                        src={diuScreenshots[flagshipScreenIdx]}
                        alt={`DIU Campus Schedule - ${diuScreenshotTitles[flagshipScreenIdx]}`}
                        className="flagship-screen-img"
                      />
                      <div className="flagship-caption-pill">
                        <span>{diuScreenshotTitles[flagshipScreenIdx]}</span>
                      </div>
                      <div className="flagship-overlay-cta">
                        <SparklesIcon className="btn-icon-svg" />
                        <span>Click to Enlarge / Full Specs &rarr;</span>
                      </div>
                    </div>

                    {/* All 6 Official Web App Thumbnails */}
                    <div className="flagship-thumb-strip" role="tablist" aria-label="Web App Interfaces">
                      {diuScreenshots.map((src: string, idx: number) => (
                        <button
                          key={src}
                          type="button"
                          role="tab"
                          aria-selected={flagshipScreenIdx === idx}
                          onClick={() => setFlagshipScreenIdx(idx)}
                          className={`flagship-thumb-box ${flagshipScreenIdx === idx ? "active" : ""}`}
                          title={diuScreenshotTitles[idx]}
                          aria-label={diuScreenshotTitles[idx]}
                        >
                          <AdaptiveImage src={src} alt={diuScreenshotTitles[idx]} className="flagship-thumb-img" />
                        </button>
                      ))}
                    </div>
                    <span className="flagship-thumb-hint">
                      Official Web App Interface · Select to preview module
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Curated Grid of Other Projects */}
          <div className="curated-projects-grid">
            {gridProjects.map((project, idx) => (
              <article
                key={project.slug}
                className="curated-project-card glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="curated-card-head">
                  <span className="project-category-badge">{project.category}</span>
                  <span className="project-year-badge">{project.year || "RECENT"}</span>
                </div>

                <div className="curated-card-body">
                  <h3>{project.name}</h3>
                  <p className="curated-card-summary">{project.summary}</p>

                  <div className="secondary-tech-row">
                    {project.technology?.slice(0, 4).map((tech) => (
                      <TechMark name={tech} key={tech} compact />
                    ))}
                  </div>
                </div>

                <div className="curated-card-actions">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn-details-trigger"
                  >
                    <span>View Details</span>
                    <ArrowIcon className="btn-arrow" />
                  </button>

                  <a
                    href={project.githubUrl || "https://github.com/marufrayhan606"}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-github-mini"
                    aria-label={`GitHub repository for ${project.name}`}
                  >
                    <GithubIcon className="stat-svg" style={{ width: 14, height: 14 }} />
                    <span>Code</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Expandable Utility Apps */}
          <div className="section-expand-container reveal-on-scroll">
            <button
              type="button"
              onClick={() => setShowUtilityProjects(!showUtilityProjects)}
              className="toggle-expand-button glass-panel"
            >
              <CodeIcon className="btn-icon-subtle" />
              <span>{showUtilityProjects ? "Hide Utility Applications" : "View Utility Tools (OneSpender, NapTrap)"}</span>
              <ArrowIcon className={showUtilityProjects ? "rotate-up" : "rotate-down"} />
            </button>
          </div>

          {showUtilityProjects && (
            <div className="curated-projects-grid collapsible-reveal" style={{ marginTop: "24px" }}>
              {utilityProjects.map((project) => (
                <article
                  key={project.slug}
                  className="curated-project-card glass-panel tilt-card"
                >
                  <div className="curated-card-head">
                    <span className="project-category-badge">{project.category}</span>
                    <span className="project-year-badge">{project.year}</span>
                  </div>

                  <div className="curated-card-body">
                    <h3>{project.name}</h3>
                    <p className="curated-card-summary">{project.summary}</p>
                    <div className="secondary-tech-row">
                      {project.technology?.map((tech) => (
                        <TechMark name={tech} key={tech} compact />
                      ))}
                    </div>
                  </div>

                  <div className="curated-card-actions">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn-details-trigger"
                    >
                      <span>View Details</span>
                      <ArrowIcon className="btn-arrow" />
                    </button>
                    <a
                      href={project.githubUrl || "https://github.com/marufrayhan606"}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-github-mini"
                    >
                      <GithubIcon className="stat-svg" style={{ width: 14, height: 14 }} />
                      <span>Code</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            5. ACHIEVEMENTS & CERTIFICATES PROOF GALLERY (#proof)
        ======================================================== */}
        <section className="achievements-section-2026 container" id="achievements" aria-labelledby="proof-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <TrophyIcon className="badge-icon" />
              <span>04 / VERIFIED PROOF &amp; AWARDS</span>
            </div>
            <h2 id="proof-title">
              Achievements &amp; Certificates.
              <br />
              <em>Proven Results with Verifiable Documentation.</em>
            </h2>
            <p className="section-subtext">
              National hackathons, competitive programming milestones, and academic research posters. Click any credential to inspect verification proof.
            </p>
          </div>

          {/* Certificate Proof Grid with Carousel Options */}
          <div className="certificates-proof-grid">
            {certificates.map((cert, idx) => (
              <CertificateCardItem
                key={cert.id}
                cert={cert}
                idx={idx}
                onOpenDialog={(selected, slide) => {
                  setSelectedCert(selected);
                  setSelectedCertSlide(slide);
                }}
              />
            ))}
          </div>
        </section>

        {/* ========================================================
            6. EXECUTIVE CONTACT PORTAL (#contact)
        ======================================================== */}
        <section className="contact-portal-2026 container" id="contact" aria-labelledby="contact-title">
          <div className="contact-glass-hub glass-panel reveal-on-scroll">
            <div className="contact-ambient-light" />
            <div className="contact-hub-header">
              <span className="section-badge-pill">
                <SparklesIcon className="badge-icon" />
                <span>05 / INITIATE CONTACT</span>
              </span>
              <h2 id="contact-title">
                Ready to build something
                <br />
                <span className="text-gradient-iridescent">exceptional together?</span>
              </h2>
              <p className="contact-lede">
                I am actively seeking Software Engineering and Android Developer opportunities. Reach out directly or connect through my profiles.
              </p>
            </div>

            <div className="contact-cards-grid">
              {/* Email Direct */}
              <div className="contact-action-box glass-panel">
                <MailIcon className="action-box-icon" />
                <div className="action-box-info">
                  <span className="box-label">DIRECT INQUIRIES</span>
                  <a href={`mailto:${profile.email}`} className="box-val">
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="copy-btn glass-panel"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <CheckIcon className="copy-icon green" /> : <CopyIcon className="copy-icon" />}
                  <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/marufrayhan606"
                target="_blank"
                rel="noreferrer"
                className="contact-action-box glass-panel link-box"
              >
                <LinkedinIcon className="action-box-icon linkedin" />
                <div className="action-box-info">
                  <span className="box-label">PROFESSIONAL NETWORK</span>
                  <span className="box-val">linkedin.com/in/marufrayhan606</span>
                </div>
                <ArrowIcon className="box-ext-arrow" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/marufrayhan606"
                target="_blank"
                rel="noreferrer"
                className="contact-action-box glass-panel link-box"
              >
                <GithubIcon className="action-box-icon" />
                <div className="action-box-info">
                  <span className="box-label">SOURCE REPOSITORIES</span>
                  <span className="box-val">github.com/marufrayhan606</span>
                </div>
                <ArrowIcon className="box-ext-arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Modals for Deep Details */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        cert={selectedCert}
        initialSlide={selectedCertSlide}
        onClose={() => setSelectedCert(null)}
      />

      <AcademicModal
        isOpen={academicModalOpen}
        onClose={() => setAcademicModalOpen(false)}
      />

      <SkillsRadarModal
        isOpen={skillsRadarModalOpen}
        onClose={() => setSkillsRadarModalOpen(false)}
      />

      <SiteFooter />
    </>
  );
}
