"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CloseIcon,
  GithubIcon,
  ArrowIcon,
  SparklesIcon,
  CpuIcon,
  AwardIcon,
  TrophyIcon,
  ActivityIcon,
  PlayStoreIcon,
  GlobeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectInteractivePreview } from "@/components/project-interactive-preview";
import { GpaTrajectoryChart, SkillsRadarChart } from "@/components/interactive-charts";
import { TechMark } from "@/components/tech-mark";
import { AdaptiveImage } from "@/components/adaptive-image";
import { getImageCandidates } from "@/lib/image-candidates";
import type { Project, Certificate } from "@/data/portfolio";

/* ==========================================================================
   1. PROJECT DETAILS MODAL
   ========================================================================== */
const SCREENSHOT_CAPTIONS: Record<string, string> = {
  "/projects/diu-campus-schedule/Dashboard.png": "Academic Dashboard & Upcoming Classes",
  "/projects/diu-campus-schedule/Class_Routine.png": "Interactive Daily & Weekly Routine Filter",
  "/projects/diu-campus-schedule/Class_Notification.png": "Automated 30-Min Lockscreen Class Alert",
  "/projects/diu-campus-schedule/CR_Announcements.png": "Batch CR Notice Board & Cohort Messages",
  "/projects/diu-campus-schedule/Empty_Room.png": "Live Campus Empty Classroom Finder",
  "/projects/diu-campus-schedule/Faculty_Info.png": "116+ Searchable Teacher Directory & Portals",
};

function getScreenshotCaption(src: string): string {
  if (SCREENSHOT_CAPTIONS[src]) return SCREENSHOT_CAPTIONS[src];
  const baseName = src.split("/").pop()?.replace(/\.[^/.]+$/, "");
  if (baseName) {
    for (const [key, caption] of Object.entries(SCREENSHOT_CAPTIONS)) {
      const keyBase = key.split("/").pop()?.replace(/\.[^/.]+$/, "");
      if (keyBase?.toLowerCase() === baseName.toLowerCase()) {
        return caption;
      }
    }
  }
  return baseName ? baseName.replace(/_/g, " ") : "Interface View";
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedScreen, setSelectedScreen] = useState(0);

  useEffect(() => {
    setSelectedScreen(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-project-title">
      <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="project-category-badge">{project.category}</span>
            <span className="project-year-badge">{project.year || "2024–2025"}</span>
            {project.stats && (
              <span className="modal-stats-pill">
                <SparklesIcon className="stats-pill-icon" />
                <span>{project.stats}</span>
              </span>
            )}
          </div>
          <button
            type="button"
            className="modal-close-btn glass-panel"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon className="modal-close-icon" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-scroll-body">
          <div className="modal-top-hero">
            {/* App Icon + Title header if appIcon present */}
            {project.appIcon ? (
              <div className="project-modal-brand-row">
                <div className="project-modal-icon-wrap">
                  <AdaptiveImage
                    src={project.appIcon}
                    alt={`${project.name} App Icon`}
                    className="project-modal-icon-img"
                  />
                </div>
                <div>
                  <h2 id="modal-project-title" className="modal-title" style={{ marginBottom: "4px" }}>
                    {project.name}
                  </h2>
                  <div className="project-modal-badge-line">
                    <span className="verified-badge-pill">
                      <span className="ping-dot" /> Play Store Verified
                    </span>
                    {project.rating && <span className="rating-pill">{project.rating}</span>}
                  </div>
                </div>
              </div>
            ) : (
              <h2 id="modal-project-title" className="modal-title">{project.name}</h2>
            )}

            <p className="modal-lead-summary">{project.summary}</p>

            {/* Play Store Production Metrics Grid */}
            {(project.installs || project.accounts) && (
              <div className="modal-production-stats-grid">
                {project.installs && (
                  <div className="prod-stat-pill">
                    <span className="prod-stat-num text-gradient-iridescent">{project.installs}</span>
                    <span className="prod-stat-lbl">Google Play Installs</span>
                  </div>
                )}
                {project.accounts && (
                  <div className="prod-stat-pill">
                    <span className="prod-stat-num text-gradient-iridescent">{project.accounts}</span>
                    <span className="prod-stat-lbl">Registered Student Accounts</span>
                  </div>
                )}
                {project.rating && (
                  <div className="prod-stat-pill">
                    <span className="prod-stat-num text-gradient-iridescent">{project.rating}</span>
                    <span className="prod-stat-lbl">Community Rating</span>
                  </div>
                )}
              </div>
            )}

            <div className="modal-tech-row">
              {project.technology?.map((tech) => (
                <TechMark name={tech} key={tech} compact glow />
              ))}
            </div>

            <div className="modal-action-bar">
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
              <a
                href={project.githubUrl || "https://github.com/marufrayhan606"}
                target="_blank"
                rel="noreferrer"
                className="button-glass-pill-sm"
              >
                <GithubIcon className="btn-icon-svg" />
                <span>Source Code</span>
                <ArrowIcon className="btn-arrow" />
              </a>
            </div>
          </div>

          {/* Real Screenshots Gallery if available */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="modal-screenshots-card glass-panel">
              <div className="modal-section-head">
                <SparklesIcon className="stat-svg" />
                <h3>Official Updated Web Application Interfaces ({project.screenshots.length} views)</h3>
              </div>

              {/* Featured Selected Screenshot */}
              <div className="featured-screenshot-display">
                <AdaptiveImage
                  src={project.screenshots[selectedScreen]}
                  alt={`${project.name} UI View ${selectedScreen + 1}`}
                  className="screenshot-main-img"
                />
                <div className="screenshot-caption-bar">
                  <span className="screenshot-caption-title">
                    {getScreenshotCaption(project.screenshots[selectedScreen])}
                  </span>
                  <span className="screenshot-caption-counter">
                    {selectedScreen + 1} of {project.screenshots.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails Navigation */}
              <div className="screenshots-thumb-strip">
                {project.screenshots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedScreen(i)}
                    className={`screenshot-thumb-btn ${selectedScreen === i ? "active" : ""}`}
                    aria-label={`View ${getScreenshotCaption(src)}`}
                    title={getScreenshotCaption(src)}
                  >
                    <AdaptiveImage src={src} alt={`Thumbnail ${i + 1}`} className="screenshot-thumb-img" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Production Features */}
          {project.keyFeatures && (
            <div className="modal-section-card glass-panel">
              <div className="modal-section-head">
                <ActivityIcon className="stat-svg" />
                <h3>Core Production Capabilities &amp; Architecture Features</h3>
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

          {/* Architecture & Implementation Details */}
          {project.details && (
            <div className="modal-section-card glass-panel">
              <div className="modal-section-head">
                <CpuIcon className="stat-svg" />
                <h3>System Architecture &amp; Engineering Specifications</h3>
              </div>
              <p className="modal-section-text">{project.details}</p>
            </div>
          )}

          {/* Artwork & Interactive Live Simulator if no screenshots */}
          {(!project.screenshots || project.screenshots.length === 0) && (
            <div className="modal-preview-section">
              <div className="modal-artwork-wrapper">
                <ProjectArtwork visual={project.visual} />
              </div>

              <div className="modal-simulator-wrapper">
                <ProjectInteractivePreview visual={project.visual} />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="button-glass-pill-sm">
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. CERTIFICATE / PROOF LIGHTBOX MODAL WITH MULTI-IMAGE CAROUSEL
   ========================================================================== */
interface CertificateModalProps {
  cert: Certificate | null;
  initialSlide?: number;
  onClose: () => void;
}

export function CertificateModal({ cert, initialSlide = 0, onClose }: CertificateModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const mediaList = cert?.images && cert.images.length > 0 ? cert.images : (cert ? [cert.image] : []);
  const hasMultipleImages = mediaList.length > 1;
  const labelList = cert?.imageLabels && cert.imageLabels.length > 0
    ? cert.imageLabels
    : mediaList.map((_, i) => (i === 0 ? "Official Certificate" : `Proof ${i + 1}`));

  useEffect(() => {
    setActiveSlide(initialSlide || 0);
  }, [cert, initialSlide]);

  const prevSlide = () => {
    if (!hasMultipleImages) return;
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1));
  };

  const nextSlide = () => {
    if (!hasMultipleImages) return;
    setActiveSlide((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasMultipleImages) {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      }
    };
    if (cert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cert, onClose, hasMultipleImages]);

  if (!cert) return null;

  const currentMediaSrc = mediaList[activeSlide] || cert.image;
  const currentMediaLabel = labelList[activeSlide] || "Verification Proof";

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-cert-title">
      <div className="modal-dialog certificate-lightbox glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className={`timeline-badge ${cert.category}`}>{cert.badge}</span>
            <time className="timeline-year">{cert.year}</time>
            {hasMultipleImages && (
              <span className="cert-slide-counter-chip">
                {activeSlide + 1} of {mediaList.length} &middot; {currentMediaLabel}
              </span>
            )}
          </div>
          <button
            type="button"
            className="modal-close-btn glass-panel"
            onClick={onClose}
            aria-label="Close proof viewer"
          >
            <CloseIcon className="modal-close-icon" />
          </button>
        </div>

        <div className="modal-scroll-body">
          {/* Main Display Frame (Carousel if multiple images, clean normal if single) */}
          <div className={`certificate-display-frame ${hasMultipleImages ? "cert-carousel-main-frame" : ""}`}>
            <div className="cert-img-container">
              <AdaptiveImage
                key={currentMediaSrc}
                src={currentMediaSrc}
                alt={`${cert.title} - ${currentMediaLabel}`}
                className="cert-img-element"
                fallbackElement={
                  <div className="cert-placeholder-seal glass-panel">
                    <TrophyIcon className="cert-seal-icon text-gradient-iridescent" />
                    <h4>{cert.title}</h4>
                    <p className="cert-seal-event">{cert.event}</p>
                    <div className="cert-seal-badge">{cert.badge}</div>
                    <small className="cert-placeholder-hint">
                      Official credential item &middot; {cert.issuer}
                    </small>
                  </div>
                }
              />
            </div>

            {/* Carousel Navigation Arrows ONLY if multiple media */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  className="cert-modal-carousel-arrow arrow-prev"
                  onClick={prevSlide}
                  aria-label="Previous image option"
                  title="Previous image option"
                >
                  <ChevronLeftIcon className="arrow-icon" />
                </button>
                <button
                  type="button"
                  className="cert-modal-carousel-arrow arrow-next"
                  onClick={nextSlide}
                  aria-label="Next image option"
                  title="Next image option"
                >
                  <ChevronRightIcon className="arrow-icon" />
                </button>
              </>
            )}
          </div>

          {/* Multiple Image Options Carousel Strip ONLY if multiple media */}
          {hasMultipleImages && (
            <div className="cert-options-thumb-strip" role="tablist" aria-label="Credential Media Options">
              {mediaList.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  className={`cert-option-tab-btn ${activeSlide === idx ? "active" : ""}`}
                  onClick={() => setActiveSlide(idx)}
                >
                  <span className="tab-pill-badge">{idx + 1}</span>
                  <span className="tab-pill-label">{labelList[idx] || `Option ${idx + 1}`}</span>
                </button>
              ))}
            </div>
          )}

          <div className="cert-modal-info">
            <h2 id="modal-cert-title" className="cert-modal-title">{cert.title}</h2>
            <p className="cert-modal-event">
              <strong>Event:</strong> {cert.event}
            </p>
            <p className="cert-modal-issuer">
              <strong>Issuing Body:</strong> {cert.issuer}
            </p>
            <p className="cert-modal-caption">{cert.caption}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="button-glass-pill-sm">
            Close Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. ACADEMIC TRAJECTORY BREAKDOWN MODAL
   ========================================================================== */
interface AcademicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AcademicModal({ isOpen, onClose }: AcademicModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-academic-title">
      <div className="modal-dialog academic-modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="section-badge-pill">
              <AwardIcon className="badge-icon" />
              <span>ACADEMIC VERIFICATION</span>
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn glass-panel"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon className="modal-close-icon" />
          </button>
        </div>

        <div className="modal-scroll-body">
          <div className="modal-top-hero">
            <h2 id="modal-academic-title" className="modal-title">Academic Semester Performance</h2>
            <p className="modal-lead-summary">
              Daffodil International University · B.Sc. in Software Engineering (Major in Data Science). Showing semester-wise GPA trajectory across 8 consecutive university semesters.
            </p>
          </div>

          <GpaTrajectoryChart />
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="button-glass-pill-sm">
            Close Academic Performance
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. SKILLS RADAR MODAL
   ========================================================================== */
interface SkillsRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SkillsRadarModal({ isOpen, onClose }: SkillsRadarModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-radar-title">
      <div className="modal-dialog skills-radar-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="section-badge-pill">
              <ActivityIcon className="badge-icon" />
              <span>COMPETENCY EVALUATION</span>
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn glass-panel"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon className="modal-close-icon" />
          </button>
        </div>

        <div className="modal-scroll-body">
          <div className="modal-top-hero">
            <h2 id="modal-radar-title" className="modal-title">Interactive Competency Radar</h2>
            <p className="modal-lead-summary">
              Multi-axial evaluation across Android native architecture, data science pipelines, backend APIs, and problem solving.
            </p>
          </div>

          <SkillsRadarChart />
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="button-glass-pill-sm">
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
}
