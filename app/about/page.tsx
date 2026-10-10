import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  ArrowRightIcon,
  AwardIcon,
  CpuIcon,
  TrophyIcon,
  SparklesIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/icons";
import { GpaTrajectoryChart, SkillsRadarChart } from "@/components/interactive-charts";
import { HolographicPortrait } from "@/components/holographic-portrait";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import { achievements, profile, skills } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About — Md. Maruf Rayhan | Android & Data Science",
  description:
    "Software Engineering background, Android development practice, data science learning journey, academic results, and competition record.",
};

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main" className="about-page-2026 container">
        {/* Intro Section */}
        <section className="about-hero-grid reveal-on-scroll">
          <div className="about-bio-column">
            <div className="section-badge-pill">
              <SparklesIcon className="badge-icon" />
              <span>ABOUT THE ENGINEER</span>
            </div>
            <h1>
              Software Engineering.
              <br />
              <span className="text-gradient-iridescent">
                Crafting with Rigor.
              </span>
            </h1>
            <p className="about-bio-text">{profile.bio}</p>
            <p className="about-sub-text">
              My core focus is modern Android development using Kotlin, Jetpack Compose, and Clean Architecture. Simultaneously, I am pursuing my major in Data Science, mastering machine learning workflows, statistical inference, and on-device neural deployments.
            </p>

            <div className="about-connect-badges">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-badge glass-panel"
                >
                  {social.label === "GitHub" ? <GithubIcon className="social-icon" /> : <LinkedinIcon className="social-icon" />}
                  <span>{social.label}</span>
                  <ArrowIcon className="social-arrow" />
                </a>
              ))}
            </div>
          </div>

          <div className="about-portrait-column">
            <HolographicPortrait />
          </div>
        </section>

        {/* Technical Mastery Radar & Grid */}
        <section className="about-section-block">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <CpuIcon className="badge-icon" />
              <span>01 / COMPETENCIES</span>
            </div>
            <h2>Full Technical Toolkit</h2>
            <p className="section-subtext">Categorized toolchains and frameworks utilized across projects.</p>
          </div>

          <div className="skills-editorial-grid">
            {skills.map((skillGroup, idx) => (
              <div
                key={skillGroup.group}
                className="skill-category-card glass-panel tilt-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="skill-card-head">
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

          <div style={{ marginTop: "40px" }}>
            <SkillsRadarChart />
          </div>
        </section>

        {/* Academic Analytics / GPA Trajectory */}
        <section className="about-section-block">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <AwardIcon className="badge-icon" />
              <span>02 / ACADEMIC PERFORMANCE</span>
            </div>
            <h2>Semester-by-Semester GPA Trajectory</h2>
            <p className="section-subtext">
              Daffodil International University · B.Sc. in Software Engineering (Major in Data Science)
            </p>
          </div>

          <GpaTrajectoryChart />
        </section>

        {/* Competitions and Achievements */}
        <section className="about-section-block">
          <div className="section-head-2026 reveal-on-scroll">
            <div className="section-badge-pill">
              <TrophyIcon className="badge-icon" />
              <span>03 / COMPETITIONS &amp; HONORS</span>
            </div>
            <h2>Demonstrated Track Record</h2>
            <p className="section-subtext">Contests, research posters, and hackathon milestones.</p>
          </div>

          <div className="achievements-timeline">
            {achievements.map((item, idx) => (
              <div
                key={`${item.event}-${idx}`}
                className="timeline-item-glass glass-panel tilt-card reveal-on-scroll"
              >
                <div className="timeline-node-dot">
                  <span className="dot-inner" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-header-row">
                    <div>
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

        {/* Next Steps CTA */}
        <section className="about-cta-card glass-panel reveal-on-scroll">
          <div>
            <span className="section-badge-pill">
              <SparklesIcon className="badge-icon" />
              <span>NEXT STEP</span>
            </span>
            <h2>Explore Software Projects &amp; Live Simulators</h2>
          </div>
          <Link href="/work" className="button-neon-glow">
            <span>Browse All Work</span>
            <ArrowRightIcon className="btn-icon" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
