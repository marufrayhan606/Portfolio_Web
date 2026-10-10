"use client";

import { useEffect, useState } from "react";

export function SiteEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    // 1. Scroll Progress & Back-to-Top tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. Intersection Observer for Scroll Reveals
    let observer: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    if (!reducedMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      const watch = (root: ParentNode) => {
        if (root instanceof Element && root.matches(".reveal-on-scroll")) observer?.observe(root);
        root.querySelectorAll(".reveal-on-scroll").forEach((el) => observer?.observe(el));
      };

      watch(document);

      mutationObserver = new MutationObserver((records) => {
        records.forEach((record) => {
          record.addedNodes.forEach((node) => {
            if (node instanceof Element) watch(node);
          });
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      document.documentElement.classList.add("motion-ready");
    }

    // 3. Card Mouse Spotlight & 3D Tilt Effect
    const handleCardTilt = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".tilt-card, .glass-panel, .featured-project-3d");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Check if pointer is reasonably near or inside
        const isInside =
          e.clientX >= rect.left - 40 &&
          e.clientX <= rect.right + 40 &&
          e.clientY >= rect.top - 40 &&
          e.clientY <= rect.bottom + 40;

        if (isInside) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);

          if (card.classList.contains("tilt-card") && !reducedMotion) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
          }
        } else if (card.classList.contains("tilt-card")) {
          card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        }
      });
    };

    window.addEventListener("mousemove", handleCardTilt, { passive: true });

    // 4. Custom Neon Cursor
    if (finePointer && !reducedMotion) {
      const dot = document.querySelector<HTMLElement>(".cursor-dot");
      const ring = document.querySelector<HTMLElement>(".cursor-ring");

      if (dot && ring) {
        document.documentElement.classList.add("custom-cursor-ready");

        const moveCursor = (event: PointerEvent) => {
          document.documentElement.classList.add("cursor-active");
          const pos = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
          dot.style.transform = pos;
          ring.style.transform = pos;

          const target = event.target instanceof Element ? event.target.closest("a,button,[data-cursor]") : null;
          document.documentElement.classList.toggle("cursor-over-link", Boolean(target));
          const label = target?.getAttribute("data-cursor") ?? "";
          ring.dataset.label = label;
          document.documentElement.classList.toggle("cursor-over-special", Boolean(label));
        };

        const onDown = () => document.documentElement.classList.add("cursor-pressed");
        const onUp = () => document.documentElement.classList.remove("cursor-pressed");
        const onLeave = () => {
          document.documentElement.classList.add("cursor-away");
          document.documentElement.classList.remove("cursor-active");
        };
        const onEnter = () => document.documentElement.classList.remove("cursor-away");

        window.addEventListener("pointermove", moveCursor, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        document.addEventListener("pointerenter", onEnter);

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("mousemove", handleCardTilt);
          window.removeEventListener("pointermove", moveCursor);
          window.removeEventListener("pointerdown", onDown);
          window.removeEventListener("pointerup", onUp);
          document.removeEventListener("pointerleave", onLeave);
          document.removeEventListener("pointerenter", onEnter);
          observer?.disconnect();
          mutationObserver?.disconnect();
          document.documentElement.classList.remove("custom-cursor-ready", "cursor-over-link", "cursor-over-special", "cursor-pressed", "cursor-away", "cursor-active", "motion-ready");
        };
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleCardTilt);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 2026 Scroll Progress Hologram Bar */}
      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Custom Neon Refraction Cursor */}
      <div className="custom-cursor" aria-hidden="true">
        <span className="cursor-ring" />
        <span className="cursor-dot" />
      </div>

      {/* Floating Glass Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top-btn glass-panel"
          aria-label="Scroll back to top"
        >
          <svg viewBox="0 0 20 20" fill="none" className="back-top-icon">
            <path d="M10 16V4M4 10l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}
