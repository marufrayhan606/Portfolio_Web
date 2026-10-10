"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, SparklesIcon, GithubIcon, ArrowIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#work", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#charts", label: "Analytics" },
  { href: "/#achievements", label: "Milestones" },
  { href: "/#terminal", label: "Console" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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

  return (
    <header className={`site-header-dock ${scrolled ? "is-scrolled" : ""}`}>
      <div className="dock-glass-shell glass-panel">
        {/* Brand Identity Wordmark */}
        <Link className="dock-wordmark" href="/" aria-label="Maruf Rayhan Home">
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
          <Link
            className={`dock-link ${pathname === "/" ? "active" : ""}`}
            href="/#top"
          >
            Overview
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={`dock-link ${pathname === link.href ? "active" : ""}`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
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
          <a href="/#contact" className="dock-contact-cta button-neon">
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
          <Link
            className="mobile-nav-link"
            href="/#top"
            onClick={() => setOpen(false)}
          >
            Overview
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="mobile-nav-link"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="mobile-nav-link mobile-cta"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Contact & Inquiries &rarr;
          </a>
        </div>
      </div>
    </header>
  );
}
