import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowIcon,
  ArrowRightIcon,
  CodeIcon,
  GithubIcon,
  SparklesIcon,
} from "@/components/icons";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectInteractivePreview } from "@/components/project-interactive-preview";
import { ProjectStackChart } from "@/components/interactive-charts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Work — Md. Maruf Rayhan | Android & Applied ML",
  description:
    "Comprehensive directory of native Android applications, on-device machine learning prototypes, space mission support platforms, and utilities.",
};

export default function WorkPage() {
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

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
            A comprehensive look at native Android apps, on-device machine learning safeguards, and interactive exploration platforms engineered by Md. Maruf Rayhan.
          </p>

          <div className="work-domain-pills">
            <span className="domain-pill">ANDROID NATIVE</span>
            <span className="domain-pill-divider">&bull;</span>
            <span className="domain-pill">JETPACK COMPOSE</span>
            <span className="domain-pill-divider">&bull;</span>
            <span className="domain-pill">ON-DEVICE ML</span>
            <span className="domain-pill-divider">&bull;</span>
            <span className="domain-pill">PYTORCH</span>
          </div>
        </section>

        {/* Domain Distribution Split */}
        <section className="work-distribution-block reveal-on-scroll">
          <ProjectStackChart />
        </section>

        {/* Featured Projects with Interactive Simulators */}
        <section className="work-featured-stream" aria-label="Featured Software Projects">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <SparklesIcon className="badge-icon" />
              <span>01 / FLAGSHIP APPLICATIONS</span>
            </div>
            <h2>Primary Engineering Projects</h2>
          </div>

          <div className="featured-projects-stream">
            {featured.map((project) => (
              <article
                key={project.slug}
                id={project.slug}
                className="featured-project-card-2026 glass-panel tilt-card reveal-on-scroll"
              >
                <div className="project-card-layout">
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
                        <span>View Repository</span>
                        <ArrowIcon className="btn-arrow" />
                      </a>
                    </div>
                  </div>

                  <div className="project-visual-side">
                    <ProjectArtwork visual={project.visual} />
                    <ProjectInteractivePreview visual={project.visual} />
                  </div>
                </div>
              </article>
            ))}
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
      </main>

      <SiteFooter />
    </>
  );
}
