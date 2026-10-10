"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  DiscordIcon,
  AwardIcon,
  CodeIcon,
  TrophyIcon,
  CpuIcon,
  SmartphoneIcon,
  SparklesIcon,
  ActivityIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
} from "@/components/icons";
import { HolographicPortrait } from "@/components/holographic-portrait";
import { Hero3D } from "@/components/hero-3d";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectInteractivePreview } from "@/components/project-interactive-preview";
import { GpaTrajectoryChart, SkillsRadarChart, ProjectStackChart } from "@/components/interactive-charts";
import { TerminalConsole } from "@/components/terminal-console";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import { profile, projects, skills, statsMetrics, achievements } from "@/data/portfolio";

const socialIcons: Record<string, React.ComponentType<any>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Discord: DiscordIcon,
};

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [stageMode, setStageMode] = useState<"hologram" | "3d">("hologram");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredProjects = projects.filter((project) => {
    if (projectFilter === "all") return true;
    return project.domain === projectFilter;
  });

  const featured = projects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

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
            1. HERO SECTION (High-Tech 2026 Glass + 3D Hologram)
        ======================================================== */}
        <section className="home-hero-2026 container" id="top" aria-labelledby="home-title">
          {/* Background Ambient Glow Orbs */}
          <div className="hero-ambient-glow glow-emerald" aria-hidden="true" />
          <div className="hero-ambient-glow glow-cyan" aria-hidden="true" />
          <div className="hero-ambient-glow glow-violet" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-content-column">
              {/* Status capsule */}
              <div className="hero-status-pill glass-panel reveal-on-scroll">
                <span className="status-live-beacon" />
                <span className="pill-text">SOFTWARE ENGINEERING · DIU, DHAKA</span>
                <span className="pill-divider" />
                <span className="pill-sub">AVAILABLE FOR ROLES</span>
              </div>

              {/* Main Headline */}
              <h1 id="home-title" className="hero-glitch-headline reveal-on-scroll">
                Android Native Systems.
                <br />
                <span className="text-gradient-iridescent">
                  Machine Learning in Motion.
                </span>
              </h1>

              <p className="hero-bio-lead reveal-on-scroll">
                I’m <strong className="bio-name">{profile.name}</strong>, a Software Engineering student at Daffodil International University. I engineer reactive, production-grade Android applications with Kotlin &amp; Jetpack Compose, while exploring on-device intelligence and data science models.
              </p>

              {/* Call to Actions */}
              <div className="hero-action-buttons reveal-on-scroll">
                <a href="#work" className="button-neon-glow" data-cursor="EXPLORE">
                  <span>Explore Selected Work</span>
                  <ArrowRightIcon className="btn-icon" />
                </a>
                <a href="#charts" className="button-glass-pill" data-cursor="ANALYTICS">
                  <ActivityIcon className="btn-icon-subtle" />
                  <span>View GPA &amp; Analytics</span>
                </a>
              </div>

              {/* Social and Profile Links */}
              <div className="hero-social-strip reveal-on-scroll">
                {profile.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-badge glass-panel"
                      data-cursor={social.label.toUpperCase()}
                    >
                      {Icon && <Icon className="social-icon" />}
                      <span>{social.label}</span>
                      <ArrowIcon className="social-arrow" />
                    </a>
                  );
                })}
                <Link
                  href="/about"
                  className="social-badge glass-panel"
                  data-cursor="ABOUT"
                >
                  <CpuIcon className="social-icon" />
                  <span>Full Background</span>
                  <ArrowIcon className="social-arrow" />
                </Link>
              </div>
            </div>

            {/* Hero Interactive Stage (Holographic Bio-Portal & 3D Core) */}
            <div className="hero-stage-column reveal-on-scroll" aria-label="Interactive Holographic & 3D Stage">
              <div className="hero-stage-control-bar glass-panel">
                <button
                  type="button"
                  className={`stage-tab-btn ${stageMode === "hologram" ? "is-active" : ""}`}
                  onClick={() => setStageMode("hologram")}
                >
                  <SparklesIcon className="tab-btn-icon" />
                  <span>Holographic Bio-Portal</span>
                </button>
                <button
                  type="button"
                  className={`stage-tab-btn ${stageMode === "3d" ? "is-active" : ""}`}
                  onClick={() => setStageMode("3d")}
                >
                  <SmartphoneIcon className="tab-btn-icon" />
                  <span>3D Cyber Device</span>
                </button>
              </div>

              {stageMode === "hologram" ? (
                <div className="stage-hologram-view">
                  <HolographicPortrait />
                </div>
              ) : (
                <div className="stage-3d-wrapper">
                  <Hero3D />

                  {/* Floating 3D Hologram Feature Chips */}
                  <div className="floating-holo-chip chip-top glass-panel" aria-hidden="true">
                    <span className="chip-indicator green" />
                    <div>
                      <b>Kotlin &amp; Compose</b>
                      <small>Modern Native Architecture</small>
                    </div>
                  </div>

                  <div className="floating-holo-chip chip-mid glass-panel" aria-hidden="true">
                    <span className="chip-indicator cyan" />
                    <div>
                      <b>On-Device ML</b>
                      <small>Zero-Cloud Privacy</small>
                    </div>
                  </div>

                  <div className="floating-holo-chip chip-bot glass-panel" aria-hidden="true">
                    <span className="chip-indicator violet" />
                    <div>
                      <b>3.93 / 4.00</b>
                      <small>Academic GPA Trajectory</small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              STATS METRICS RIBBON (Live KPI Glass Cards)
          ======================================================== */}
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
            2. INTERACTIVE TECH STACK & COMPETENCY RADAR (#skills)
        ======================================================== */}
        <section className="toolkit-section-2026 container" id="skills" aria-labelledby="skills-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <CpuIcon className="badge-icon" />
              <span>01 / SYSTEM TOOLKIT</span>
            </div>
            <h2 id="skills-title">
              Engineered with Precision.
              <br />
              <em>Powered by Modern Architectures.</em>
            </h2>
            <p className="section-subtext">
              Curated toolchains across modern native Android engineering, data pipelines, and machine learning models.
            </p>
          </div>

          {/* 4 Categorized Skill Hubs */}
          <div className="skills-editorial-grid">
            {skills.map((skillGroup, idx) => (
              <div
                key={skillGroup.group}
                className="skill-category-card glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="skill-card-head">
                  <span className="skill-head-icon">
                    {skillGroup.icon === "smartphone" && <SmartphoneIcon />}
                    {skillGroup.icon === "cpu" && <CpuIcon />}
                    {skillGroup.icon === "database" && <CodeIcon />}
                    {skillGroup.icon === "code" && <SparklesIcon />}
                  </span>
                  <div>
                    <span className="skill-highlight-tag">{skillGroup.highlight}</span>
                    <h3>{skillGroup.group}</h3>
                  </div>
                </div>

                <div className="skill-pills-cloud">
                  {skillGroup.items.map((item) => (
                    <TechMark name={item} key={item} glow />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Skills Radar Visualization */}
          <div className="radar-section-anchor">
            <SkillsRadarChart />
          </div>
        </section>

        {/* ========================================================
            3. SELECTED PROJECTS & INTERACTIVE DEMOS (#work)
        ======================================================== */}
        <section className="projects-showcase-2026 container" id="work" aria-labelledby="projects-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <CodeIcon className="badge-icon" />
              <span>02 / SELECTED WORK</span>
            </div>
            <h2 id="projects-title">
              Real-World Applications.
              <br />
              <em>Interactive Simulators &amp; Code.</em>
            </h2>
            <p className="section-subtext">
              From academic mobile platforms to on-device privacy shields and space exploration tools.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="project-filter-dock glass-panel reveal-on-scroll">
            <span className="filter-label">Filter Stack:</span>
            {[
              { id: "all", label: "All Projects" },
              { id: "android", label: "Android Native" },
              { id: "ai", label: "AI & Machine Learning" },
              { id: "interactive", label: "Interactive / Tools" },
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

          {/* Featured Lead Projects with Interactive Simulators */}
          <div className="featured-projects-stream">
            {featured.map((project, idx) => (
              <article
                key={project.slug}
                id={project.slug}
                className="featured-project-card-2026 glass-panel tilt-card reveal-on-scroll"
              >
                <div className="project-card-layout">
                  {/* Copy & Details */}
                  <div className="project-info-side">
                    <div className="project-meta-top">
                      <span className="project-category-badge">{project.category}</span>
                      <span className="project-year-badge">{project.year}</span>
                    </div>

                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-summary-text">{project.summary}</p>

                    {project.details && (
                      <p className="project-deep-note">{project.details}</p>
                    )}

                    {project.stats && (
                      <div className="project-stats-pill">
                        <SparklesIcon className="stats-pill-icon" />
                        <span>{project.stats}</span>
                      </div>
                    )}

                    <div className="project-tech-badges">
                      {project.technology?.map((tech) => (
                        <TechMark name={tech} key={tech} compact glow />
                      ))}
                    </div>

                    <div className="project-action-row">
                      <a
                        href={project.githubUrl || "https://github.com/marufrayhan606"}
                        target="_blank"
                        rel="noreferrer"
                        className="button-neon-sm"
                        data-cursor="CODE"
                      >
                        <GithubIcon className="btn-icon-svg" />
                        <span>Source Repository</span>
                        <ArrowIcon className="btn-arrow" />
                      </a>
                    </div>
                  </div>

                  {/* Interactive Visual & Simulator */}
                  <div className="project-visual-side">
                    <ProjectArtwork visual={project.visual} />
                    <ProjectInteractivePreview visual={project.visual} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Secondary Projects Grid */}
          <div className="secondary-projects-header reveal-on-scroll">
            <h4>Additional Applications &amp; Utilities ({otherProjects.length})</h4>
          </div>

          <div className="secondary-projects-grid">
            {otherProjects.map((project, idx) => (
              <div
                key={project.slug}
                className="secondary-project-card glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="secondary-card-head">
                  <span className="secondary-cat">{project.category}</span>
                  <span className="secondary-num">0{idx + 4}</span>
                </div>
                <div className="secondary-artwork-frame">
                  <ProjectArtwork visual={project.visual} />
                </div>
                <div className="secondary-card-body">
                  <h4>{project.name}</h4>
                  <p>{project.summary}</p>
                  <div className="secondary-tech-row">
                    {project.technology?.map((t) => (
                      <TechMark name={t} key={t} compact />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            4. ACADEMIC PERFORMANCE & ANALYTICS (#charts)
        ======================================================== */}
        <section className="analytics-section-2026 container" id="charts" aria-labelledby="analytics-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <ActivityIcon className="badge-icon" />
              <span>03 / PERFORMANCE ANALYTICS</span>
            </div>
            <h2 id="analytics-title">
              Data-Backed Consistency.
              <br />
              <em>Academic GPA &amp; Domain Velocity.</em>
            </h2>
            <p className="section-subtext">
              Demonstrated rigor through 8 consecutive university semesters at Daffodil International University.
            </p>
          </div>

          {/* Interactive GPA Trajectory Chart */}
          <GpaTrajectoryChart />

          {/* Architecture Split Chart */}
          <div className="stack-split-wrapper">
            <ProjectStackChart />
          </div>
        </section>

        {/* ========================================================
            5. COMPETITIVE RECORD & MILESTONES (#achievements)
        ======================================================== */}
        <section className="achievements-section-2026 container" id="achievements" aria-labelledby="milestones-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <TrophyIcon className="badge-icon" />
              <span>04 / COMPETITIVE RECORD</span>
            </div>
            <h2 id="milestones-title">
              Hackathons &amp; Contests.
              <br />
              <em>Proven Under Pressure.</em>
            </h2>
            <p className="section-subtext">
              Competing in national data summits, algorithm contests, and global hackathons.
            </p>
          </div>

          <div className="achievements-timeline">
            {achievements.map((item, idx) => (
              <div
                key={`${item.event}-${idx}`}
                className="timeline-item-glass glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="timeline-node-dot">
                  <span className="dot-inner" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-header-row">
                    <div className="timeline-event-name">
                      <h3>{item.event}</h3>
                      <p className="timeline-detail-str">{item.detail}</p>
                    </div>
                    <div className="timeline-badge-group">
                      <span className={`timeline-badge ${item.type}`}>
                        {item.badge}
                      </span>
                      <time className="timeline-year">{item.year || "RECENT"}</time>
                    </div>
                  </div>
                  {item.description && (
                    <p className="timeline-desc">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            6. INTERACTIVE DEVELOPER CONSOLE (#terminal)
        ======================================================== */}
        <section className="terminal-section-2026 container" id="terminal" aria-labelledby="terminal-title">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <CodeIcon className="badge-icon" />
              <span>05 / INTERACTIVE TERMINAL</span>
            </div>
            <h2 id="terminal-title">
              Explore the Station.
              <br />
              <em>Live Developer Shell.</em>
            </h2>
            <p className="section-subtext">
              Query skills, projects, and bio interactively from this glass terminal emulator.
            </p>
          </div>

          <TerminalConsole />
        </section>

        {/* ========================================================
            7. INITIATE CONTACT & CONNECT (#contact)
        ======================================================== */}
        <section className="contact-portal-2026 container" id="contact" aria-labelledby="contact-title">
          <div className="contact-glass-hub glass-panel reveal-on-scroll">
            <div className="contact-ambient-light" />
            <div className="contact-hub-header">
              <span className="section-badge-pill">
                <SparklesIcon className="badge-icon" />
                <span>06 / GET IN TOUCH</span>
              </span>
              <h2 id="contact-title">
                Ready to build something
                <br />
                <span className="text-gradient-iridescent">exceptional together?</span>
              </h2>
              <p className="contact-lede">
                I am actively seeking Software Engineering and Android Developer roles. Reach out directly or connect through my profiles.
              </p>
            </div>

            <div className="contact-cards-grid">
              {/* Email Direct Card */}
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

              {/* LinkedIn Card */}
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

              {/* GitHub Card */}
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

              {/* Facebook Card */}
              <a
                href="https://www.facebook.com/marufrayhan606/"
                target="_blank"
                rel="noreferrer"
                className="contact-action-box glass-panel link-box"
              >
                <FacebookIcon className="action-box-icon facebook" />
                <div className="action-box-info">
                  <span className="box-label">FACEBOOK PROFILE</span>
                  <span className="box-val">facebook.com/marufrayhan606</span>
                </div>
                <ArrowIcon className="box-ext-arrow" />
              </a>

              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/marufrayhan606/"
                target="_blank"
                rel="noreferrer"
                className="contact-action-box glass-panel link-box"
              >
                <InstagramIcon className="action-box-icon instagram" />
                <div className="action-box-info">
                  <span className="box-label">INSTAGRAM</span>
                  <span className="box-val">@marufrayhan606</span>
                </div>
                <ArrowIcon className="box-ext-arrow" />
              </a>

              {/* Discord Card */}
              <a
                href="https://discord.com/users/756564894073094285"
                target="_blank"
                rel="noreferrer"
                className="contact-action-box glass-panel link-box"
              >
                <DiscordIcon className="action-box-icon discord" />
                <div className="action-box-info">
                  <span className="box-label">DISCORD ID</span>
                  <span className="box-val">User ID: 756564894073094285</span>
                </div>
                <ArrowIcon className="box-ext-arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
