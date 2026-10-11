"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, GithubIcon, ArrowIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const navSections = [
  { id: "top", href: "/#top", label: "Overview" },
  { id: "about", href: "/#about", label: "About" },
  { id: "skills", href: "/#skills", label: "Skills" },
  { id: "work", href: "/#work", label: "Projects" },
  { id: "achievements", href: "/#achievements", label: "Milestones" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // IntersectionObserver to accurately track and index the active visible section
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("about-page");
      return;
    }

    const sectionIds = ["top", "about", "skills", "work", "achievements", "contact"];
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const handleNavClick = (id: string, href: string, e: React.MouseEvent) => {
    if (pathname === "/" && id !== "about-page") {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        window.history.pushState(null, "", `#${id}`);
      }
    }
    setOpen(false);
  };

  return (
    <header className={`site-header-dock ${scrolled ? "is-scrolled" : ""}`}>
      <div className="dock-glass-shell glass-panel">
        {/* Brand Identity Wordmark */}
        <Link
          className="dock-wordmark"
          href="/#top"
          onClick={(e) => handleNavClick("top", "/#top", e)}
          aria-label="Maruf Rayhan Home"
        >
          <span className="dock-avatar-pill">MR</span>
          <div className="dock-brand-text">
            <span className="dock-name">MARUF RAYHAN</span>
            <span className="dock-role">
              <span className="status-ping-dot" /> ANDROID · ML
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="dock-nav-links" aria-label="Main Navigation">
          {navSections.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <a
                key={link.id}
                className={`dock-link ${isActive ? "active" : ""}`}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, link.href, e)}
              >
                {link.label}
              </a>
            );
          })}
          <Link
            className={`dock-link ${pathname === "/about" ? "active" : ""}`}
            href="/about"
          >
            Bio
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="dock-actions">
          <ThemeToggle />
          <a
            href="https://github.com/marufrayhan606"
            target="_blank"
            rel="noreferrer"
            className="dock-icon-btn"
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleNavClick("contact", "/#contact", e)}
            className="dock-contact-cta"
          >
            <span>Connect</span>
            <ArrowIcon className="cta-arrow" />
          </a>
          <button
            className="dock-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-navigation"
        className={`mobile-dock-drawer glass-panel ${open ? "is-open" : ""}`}
      >
        <div className="mobile-drawer-inner">
          {navSections.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <a
                key={link.id}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, link.href, e)}
              >
                {link.label}
              </a>
            );
          })}
          <Link
            className={`mobile-nav-link ${pathname === "/about" ? "active" : ""}`}
            href="/about"
            onClick={() => setOpen(false)}
          >
            Detailed Bio &amp; Academic Records &rarr;
          </Link>
          <a
            className="mobile-nav-link mobile-cta"
            href="/#contact"
            onClick={(e) => handleNavClick("contact", "/#contact", e)}
          >
            Contact &amp; Inquiries &rarr;
          </a>
        </div>
      </div>
    </header>
  );
}
