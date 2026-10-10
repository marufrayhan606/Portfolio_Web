import Link from "next/link";
import { GithubIcon, LinkedinIcon, ArrowIcon, SparklesIcon, MailIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

const socialIcons = { GitHub: GithubIcon, LinkedIn: LinkedinIcon };

export function SiteFooter() {
  return (
    <footer className="site-footer-2026 glass-panel">
      <div className="container footer-content">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link className="footer-brand-name" href="/">
              maruf<span className="dot-neon">.rayhan</span>
            </Link>
            <p className="footer-brand-bio">
              Software Engineering undergraduate at Daffodil International University. Building high-performance Android applications with clean architecture and exploring on-device machine learning.
            </p>
            <div className="footer-status-pill">
              <span className="footer-status-dot" />
              <span>Available for Software Engineering & Android roles</span>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">NAVIGATION</span>
            <div className="footer-links-list">
              <Link href="/#top">Overview</Link>
              <Link href="/#work">Selected Work</Link>
              <Link href="/#skills">Tech Stack</Link>
              <Link href="/#charts">Academic Analytics</Link>
              <Link href="/#achievements">Milestones</Link>
              <Link href="/about">About & Background</Link>
            </div>
          </div>

          <div className="footer-social-col">
            <span className="footer-col-title">CONNECT</span>
            <div className="footer-social-pills">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link glass-panel"
                  >
                    {Icon && <Icon className="social-svg" />}
                    <span>{social.label}</span>
                    <ArrowIcon className="social-ext-arrow" />
                  </a>
                );
              })}
              <a
                href={`mailto:${profile.email}`}
                className="footer-social-link glass-panel email-link"
              >
                <MailIcon className="social-svg" />
                <span>{profile.email}</span>
                <ArrowIcon className="social-ext-arrow" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} Md. Maruf Rayhan · Crafted with Next.js & Three.js</span>
          </div>
          <div className="footer-location">
            <span>Dhaka, Bangladesh · 2026 Modern Glass Edition</span>
          </div>
          <a href="#top" className="footer-to-top">
            <span>Back to top</span>
            <span className="to-top-arrow">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
