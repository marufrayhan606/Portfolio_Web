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

    // 3. Card Mouse Spotlight & Clean 3D Motion
    let activeCard: HTMLElement | null = null;

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>(".glass-panel, .tilt-card, .interactive-card, .stat-card-glass, .skill-category-card, .featured-project-card-2026, .secondary-project-card, .timeline-item-glass, .contact-action-box") : null;
      if (target && target !== activeCard) {
        if (activeCard) {
          activeCard.style.removeProperty("transform");
        }
        activeCard = target;
      }
    };

    const handleCardPointerMove = (e: PointerEvent) => {
      if (!activeCard) {
        const target = e.target instanceof Element ? e.target.closest<HTMLElement>(".glass-panel, .tilt-card, .interactive-card, .stat-card-glass, .skill-category-card, .featured-project-card-2026, .secondary-project-card, .timeline-item-glass, .contact-action-box") : null;
        if (target) activeCard = target;
      }
      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      activeCard.style.setProperty("--mouse-x", `${x}px`);
      activeCard.style.setProperty("--mouse-y", `${y}px`);

      if (activeCard.classList.contains("tilt-card") && !reducedMotion) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        activeCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      }
    };

    const handleCardPointerOut = (e: PointerEvent) => {
      if (activeCard) {
        const related = e.relatedTarget as Node | null;
        if (!related || !activeCard.contains(related)) {
          activeCard.style.removeProperty("transform");
          activeCard = null;
        }
      }
    };

    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointermove", handleCardPointerMove, { passive: true });
    window.addEventListener("pointerout", handleCardPointerOut, { passive: true });

    // 4. Custom Neon Cursor (No double cursor, silky tracking)
    let moveCursor: ((event: PointerEvent) => void) | undefined;
    let onDown: (() => void) | undefined;
    let onUp: (() => void) | undefined;
    let onLeave: (() => void) | undefined;
    let onEnter: (() => void) | undefined;

    if (finePointer && !reducedMotion) {
      const dot = document.querySelector<HTMLElement>(".cursor-dot");
      const ring = document.querySelector<HTMLElement>(".cursor-ring");

      if (dot && ring) {
        document.documentElement.classList.add("custom-cursor-ready");

        moveCursor = (event: PointerEvent) => {
          document.documentElement.classList.add("cursor-active");
          const pos = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
          dot.style.transform = pos;
          ring.style.transform = pos;

          const target = event.target instanceof Element ? event.target.closest("a,button,[role='button'],input,textarea,select,[data-cursor]") : null;
          const isInput = target?.matches("input, textarea, select") || false;
          document.documentElement.classList.toggle("cursor-over-input", isInput);
          document.documentElement.classList.toggle("cursor-over-link", Boolean(target) && !isInput);

          const label = target?.getAttribute("data-cursor") ?? "";
          ring.dataset.label = label;
          document.documentElement.classList.toggle("cursor-over-special", Boolean(label));
        };

        onDown = () => document.documentElement.classList.add("cursor-pressed");
        onUp = () => document.documentElement.classList.remove("cursor-pressed");
        onLeave = () => {
          document.documentElement.classList.add("cursor-away");
          document.documentElement.classList.remove("cursor-active");
        };
        onEnter = () => document.documentElement.classList.remove("cursor-away");

        window.addEventListener("pointermove", moveCursor, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        document.addEventListener("pointerenter", onEnter);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointermove", handleCardPointerMove);
      window.removeEventListener("pointerout", handleCardPointerOut);
      if (activeCard) {
        activeCard.style.removeProperty("transform");
        activeCard = null;
      }
      if (moveCursor) window.removeEventListener("pointermove", moveCursor);
      if (onDown) window.removeEventListener("pointerdown", onDown);
      if (onUp) window.removeEventListener("pointerup", onUp);
      if (onLeave) document.removeEventListener("pointerleave", onLeave);
      if (onEnter) document.removeEventListener("pointerenter", onEnter);
      observer?.disconnect();
      mutationObserver?.disconnect();
      document.documentElement.classList.remove(
        "custom-cursor-ready",
        "cursor-over-link",
        "cursor-over-input",
        "cursor-over-special",
        "cursor-pressed",
        "cursor-away",
        "cursor-active",
        "motion-ready"
      );
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
