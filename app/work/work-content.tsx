"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowIcon,
  ArrowRightIcon,
  CodeIcon,
  GithubIcon,
  SparklesIcon,
  CpuIcon,
  ChevronDownIcon,
  PlayStoreIcon,
  GlobeIcon,
  ActivityIcon,
} from "@/components/icons";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectInteractivePreview } from "@/components/project-interactive-preview";
import { ProjectModal } from "@/components/portfolio-modals";
import { ProjectStackChart } from "@/components/interactive-charts";
import { TechMark } from "@/components/tech-mark";
import { AdaptiveImage } from "@/components/adaptive-image";
import { projects, type Project } from "@/data/portfolio";

const DIU_SCREENSHOT_TITLES: Record<string, string> = {
  "/projects/diu-campus-schedule/Dashboard.png": "Academic Dashboard",
  "/projects/diu-campus-schedule/Class_Routine.png": "Class Routine & Filter",
  "/projects/diu-campus-schedule/Class_Notification.png": "30-Min Class Notification",
  "/projects/diu-campus-schedule/CR_Announcements.png": "CR Notice Board",
  "/projects/diu-campus-schedule/Empty_Room.png": "Empty Classroom Finder",
  "/projects/diu-campus-schedule/Faculty_Info.png": "Faculty Directory",
};

function getDiuScreenshotTitle(src: string): string {
  if (DIU_SCREENSHOT_TITLES[src]) return DIU_SCREENSHOT_TITLES[src];
  const baseName = src.split("/").pop()?.replace(/\.[^/.]+$/, "");
  if (baseName) {
    for (const [key, title] of Object.entries(DIU_SCREENSHOT_TITLES)) {
      const keyBase = key.split("/").pop()?.replace(/\.[^/.]+$/, "");
      if (keyBase?.toLowerCase() === baseName.toLowerCase()) {
        return title;
      }
    }
  }
  return baseName ? baseName.replace(/_/g, " ") : "Interface";
}

export function WorkContent() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [workDiuScreenIdx, setWorkDiuScreenIdx] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  const toggleProject = (slug: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <main id="main" className="work-page-2026 container">
      {/* Intro */}
      <section className="work-intro-block reveal-on-scroll">
        <div className="section-badge-pill">
          <CodeIcon className="badge-icon" />
          <span>PORTFOLIO DIRECTORY</span>
        </div>
        <h1>
          Engineered for Screens.
          <br />
          <span className="text-gradient-iridescent">
            Powered by Data.
          </span>
        </h1>
        <p className="work-lede-text">
          A comprehensive look at native Android apps, full-stack systems, and academic reinforcement learning research engineered by Md. Maruf Rayhan.
        </p>

        <div className="work-domain-pills">
          <span className="domain-pill">ANDROID NATIVE</span>
          <span className="domain-pill-divider">&bull;</span>
          <span className="domain-pill">JETPACK COMPOSE</span>
          <span className="domain-pill-divider">&bull;</span>
          <span className="domain-pill">FASTAPI &amp; REACT</span>
          <span className="domain-pill-divider">&bull;</span>
          <span className="domain-pill">PYTORCH DRL</span>
          <span className="domain-pill-divider">&bull;</span>
          <span className="domain-pill">DATA SCIENCE</span>
        </div>
      </section>

      {/* Domain Distribution Split */}
      <section className="work-distribution-block reveal-on-scroll">
        <ProjectStackChart />
      </section>

      {/* Featured Projects with On-Demand Simulators */}
      <section className="work-featured-stream" aria-label="Featured Software Projects">
        <div className="section-head-2026 reveal-on-scroll">
          <div className="section-badge-pill">
            <SparklesIcon className="badge-icon" />
            <span>01 / FLAGSHIP APPLICATIONS</span>
          </div>
          <h2>Primary Engineering Projects</h2>
        </div>

        <div className="featured-projects-stream">
          {featured.map((project) => {
            const isExpanded = Boolean(expandedProjects[project.slug]);
            const isDiu = project.slug === "diu-campus-schedule";

            return (
              <article
                key={project.slug}
                id={project.slug}
                className={`featured-project-card-2026 glass-panel tilt-card reveal-on-scroll ${isDiu ? "flagship-featured-card" : ""}`}
              >
                <div className="project-card-layout">
                  <div className="project-info-side">
                    <div className="project-meta-top">
                      <span className="project-category-badge">{project.category}</span>
                      <span className="project-year-badge">{project.year}</span>
                      {isDiu && (
                        <span className="flagship-store-pill">
                          <PlayStoreIcon className="flagship-store-icon" />
                          <span>Google Play Verified · {project.rating || "4.8★"}</span>
                        </span>
                      )}
                    </div>

                    {isDiu && project.appIcon ? (
                      <div className="flagship-identity-row" style={{ marginBottom: "14px" }}>
                        <div className="flagship-app-icon-shell">
                          <AdaptiveImage
                            src={project.appIcon}
                            alt={`${project.name} App Icon`}
                            className="flagship-app-icon-img"
                          />
                        </div>
                        <div>
                          <h3 className="project-title" style={{ marginBottom: "2px" }}>{project.name}</h3>
                          <p className="flagship-subtitle">
                            Official Campus Routine &amp; Student Ecosystem · Daffodil International University
                          </p>
                        </div>
                      </div>
                    ) : (
                      <h3 className="project-title">{project.name}</h3>
                    )}

                    <p className="project-summary-text">{project.summary}</p>

                    {/* Real Production Metrics Chips for DIU */}
                    {isDiu && (
                      <div className="flagship-metrics-grid" style={{ marginBottom: "18px" }}>
                        <div className="flagship-metric-chip">
                          <span className="metric-chip-val text-gradient-iridescent">{project.installs || "6,000+"}</span>
                          <span className="metric-chip-label">Downloads</span>
                        </div>
                        <div className="flagship-metric-chip">
                          <span className="metric-chip-val text-gradient-iridescent">{project.accounts || "6,000+"}</span>
                          <span className="metric-chip-label">Active Students</span>
                        </div>
                        <div className="flagship-metric-chip">
                          <span className="metric-chip-val text-gradient-iridescent">{project.rating || "4.8 ★"}</span>
                          <span className="metric-chip-label">Play Store Rating</span>
                        </div>
                        <div className="flagship-metric-chip">
                          <span className="metric-chip-val text-gradient-iridescent">Room DB</span>
                          <span className="metric-chip-label">Offline Engine</span>
                        </div>
                      </div>
                    )}

                    {/* Key Capability Tags for DIU */}
                    {isDiu && project.keyFeatures && (
                      <div className="flagship-features-pills" style={{ marginBottom: "18px" }}>
                        <span className="flagship-feat-tag">⚡ Automated 30-min Class Alerts</span>
                        <span className="flagship-feat-tag">🔍 Routine &amp; Faculty Filter</span>
                        <span className="flagship-feat-tag">🏛️ Portals: BLC, Student &amp; Hall</span>
                        <span className="flagship-feat-tag">🏢 Live Empty Room Finder</span>
                        <span className="flagship-feat-tag">📅 Deadlines Tracker &amp; CR Alerts</span>
                        <span className="flagship-feat-tag">👥 116+ Faculty Directory</span>
                      </div>
                    )}

                    {project.stats && !isDiu && (
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
                      {project.playStoreUrl && (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-neon-sm btn-action-playstore"
                        >
                          <PlayStoreIcon className="btn-icon-svg" />
                          <span>Android (Play Store)</span>
                          <ArrowIcon className="btn-arrow" />
                        </a>
                      )}

                      {project.webAppUrl && (
                        <a
                          href={project.webAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-neon-sm btn-action-webapp"
                        >
                          <GlobeIcon className="btn-icon-svg" />
                          <span>iOS &amp; Web App</span>
                          <ArrowIcon className="btn-arrow" />
                        </a>
                      )}

                      {isDiu && (
                        <button
                          type="button"
                          onClick={() => setSelectedModalProject(project)}
                          className="button-glass-pill-sm"
                        >
                          <ActivityIcon className="btn-icon-svg" />
                          <span>Case Study &amp; Specs</span>
                          <ArrowIcon className="btn-arrow" />
                        </button>
                      )}

                      <a
                        href={project.githubUrl || "https://github.com/marufrayhan606"}
                        target="_blank"
                        rel="noreferrer"
                        className={isDiu ? "btn-github-mini" : "button-neon-sm"}
                        data-cursor="CODE"
                      >
                        <GithubIcon className="btn-icon-svg" />
                        <span>{isDiu ? "Source" : "View Repository"}</span>
                        {!isDiu && <ArrowIcon className="btn-arrow" />}
                      </a>

                      <button
                        type="button"
                        onClick={() => toggleProject(project.slug)}
                        className="expand-panel-trigger"
                        aria-expanded={isExpanded}
                        data-cursor="SPECS"
                      >
                        <SparklesIcon className="btn-icon-subtle" />
                        <span>{isExpanded ? "Hide Specs & Details" : "Interactive Demo & Specs"}</span>
                        <ChevronDownIcon className={`chevron-icon ${isExpanded ? "is-open" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <div className="project-visual-side">
                    {isDiu && project.screenshots && project.screenshots.length > 0 ? (
                      <div className="work-portrait-showcase">
                        <div
                          className="work-portrait-phone-frame"
                          onClick={() => setSelectedModalProject(project)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === "Enter") setSelectedModalProject(project); }}
                          aria-label="Click to open full case study modal"
                        >
                          <AdaptiveImage
                            src={project.screenshots[workDiuScreenIdx]}
                            alt={`${project.name} - ${getDiuScreenshotTitle(project.screenshots[workDiuScreenIdx])}`}
                            className="work-portrait-screen-img"
                          />
                          <div className="work-portrait-caption-pill">
                            <span>{getDiuScreenshotTitle(project.screenshots[workDiuScreenIdx])}</span>
                          </div>
                          <div className="work-portrait-overlay-cta">
                            <SparklesIcon className="btn-icon-svg" />
                            <span>Click to Inspect / Full Tour &rarr;</span>
                          </div>
                        </div>

                        {/* All 6 Official Web App Thumbnails in Portrait Aspect Ratio */}
                        <div className="work-portrait-thumb-strip" role="tablist" aria-label="Web App Interfaces">
                          {project.screenshots.map((src: string, idx: number) => (
                            <button
                              key={src}
                              type="button"
                              role="tab"
                              aria-selected={workDiuScreenIdx === idx}
                              onClick={() => setWorkDiuScreenIdx(idx)}
                              className={`work-portrait-thumb-box ${workDiuScreenIdx === idx ? "active" : ""}`}
                              title={getDiuScreenshotTitle(src)}
                              aria-label={getDiuScreenshotTitle(src)}
                            >
                              <AdaptiveImage src={src} alt={getDiuScreenshotTitle(src)} className="work-portrait-thumb-img" />
                            </button>
                          ))}
                        </div>
                        <span className="work-portrait-thumb-hint">
                          Official Web App Interfaces · Click thumbnail to switch portrait preview
                        </span>
                      </div>
                    ) : (
                      <ProjectArtwork visual={project.visual} />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="project-drawer-panel collapsible-reveal">
                    {project.details && (
                      <div className="project-specs-callout">
                        <span className="project-specs-title">
                          <CpuIcon className="stat-svg" />
                          ARCHITECTURE &amp; IMPLEMENTATION SPECIFICATIONS
                        </span>
                        <p className="project-specs-desc">{project.details}</p>
                      </div>
                    )}

                    {isDiu && project.keyFeatures && (
                      <div className="modal-section-card glass-panel" style={{ marginTop: "16px", padding: "20px" }}>
                        <div className="modal-section-head">
                          <ActivityIcon className="stat-svg" />
                          <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-pure)" }}>
                            Flagship Production Modules &amp; Academic Architecture
                          </h4>
                        </div>
                        <ul className="modal-feature-list">
                          {project.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="modal-feature-item">
                              <span className="feature-check-dot">&#10003;</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isDiu && project.screenshots && project.screenshots.length > 0 ? (
                      <div className="work-portrait-multi-gallery">
                        <div className="multi-gallery-head">
                          <SparklesIcon className="stat-svg" />
                          <h4>Official Web App Module Interfaces ({project.screenshots.length} Portrait Views)</h4>
                        </div>
                        <div className="multi-gallery-track">
                          {project.screenshots.map((src: string, idx: number) => (
                            <div
                              key={src}
                              className="multi-gallery-card"
                              onClick={() => {
                                setWorkDiuScreenIdx(idx);
                                setSelectedModalProject(project);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  setWorkDiuScreenIdx(idx);
                                  setSelectedModalProject(project);
                                }
                              }}
                            >
                              <div className="multi-gallery-phone">
                                <AdaptiveImage src={src} alt={getDiuScreenshotTitle(src)} className="multi-gallery-img" />
                              </div>
                              <span className="multi-gallery-title">
                                {getDiuScreenshotTitle(src)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <ProjectInteractivePreview visual={project.visual} />
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Additional Software Grid */}
      <section className="work-secondary-stream" aria-label="Additional Software Projects">
        <div className="section-head-2026 reveal-on-scroll">
          <div className="section-badge-pill">
            <CodeIcon className="badge-icon" />
            <span>02 / SECONDARY PROJECTS</span>
          </div>
          <h2>Additional Tools &amp; Utilities ({additional.length})</h2>
        </div>

        <div className="secondary-projects-grid">
          {additional.map((project, idx) => (
            <div
              key={project.slug}
              id={project.slug}
              className="secondary-project-card glass-panel tilt-card reveal-on-scroll"
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

                <div className="secondary-card-actions" style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedModalProject(project)}
                    className="btn-details-trigger"
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    <span>Inspect Specs</span>
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* End CTA */}
      <section className="work-end-cta glass-panel reveal-on-scroll">
        <div>
          <span className="section-badge-pill">
            <SparklesIcon className="badge-icon" />
            <span>ACADEMIC FOUNDATION</span>
          </span>
          <h2>Learn more about my education &amp; achievements</h2>
        </div>
        <Link href="/about" className="button-neon-glow">
          <span>View Academic Background</span>
          <ArrowRightIcon className="btn-icon" />
        </Link>
      </section>

      {selectedModalProject && (
        <ProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </main>
  );
}
