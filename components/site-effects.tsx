"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const animated = !reducedMotion && "IntersectionObserver" in window;
    let observer: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    if (animated) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -45px 0px" });
      const watch = (root: ParentNode) => {
        if (root instanceof Element && root.matches(".reveal-on-scroll")) observer?.observe(root);
        root.querySelectorAll(".reveal-on-scroll").forEach((element) => observer?.observe(element));
      };
      watch(document);
      mutationObserver = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof Element) watch(node);
      })));
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      document.documentElement.classList.add("motion-ready");
    }

    if (!finePointer || reducedMotion) return () => { observer?.disconnect(); mutationObserver?.disconnect(); };

    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return () => { observer?.disconnect(); mutationObserver?.disconnect(); };
    document.documentElement.classList.add("custom-cursor-ready");
    const move = (event: PointerEvent) => {
      document.documentElement.classList.add("cursor-active");
      const position = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      dot.style.transform = position;
      ring.style.transform = position;
      const target = event.target instanceof Element ? event.target.closest("a,button,[data-cursor]") : null;
      document.documentElement.classList.toggle("cursor-over-link", Boolean(target));
      const label = target?.getAttribute("data-cursor") ?? "";
      ring.dataset.label = label;
      document.documentElement.classList.toggle("cursor-over-special", Boolean(label));
    };
    const down = () => document.documentElement.classList.add("cursor-pressed");
    const up = () => document.documentElement.classList.remove("cursor-pressed");
    const leave = () => { document.documentElement.classList.add("cursor-away"); document.documentElement.classList.remove("cursor-active"); };
    const enter = () => document.documentElement.classList.remove("cursor-away");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
      document.documentElement.classList.remove("custom-cursor-ready", "cursor-over-link", "cursor-over-special", "cursor-pressed", "cursor-away", "cursor-active", "motion-ready");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);

  return <div className="custom-cursor" aria-hidden="true"><span className="cursor-ring"/><span className="cursor-dot"/></div>;
}
