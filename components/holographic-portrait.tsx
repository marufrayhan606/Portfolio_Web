"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SparklesIcon, CpuIcon, ActivityIcon, SmartphoneIcon } from "@/components/icons";

interface HolographicPortraitProps {
  className?: string;
}

export function HolographicPortrait({ className = "" }: HolographicPortraitProps) {
  const [activeFilter, setActiveFilter] = useState<"holo" | "neural" | "prism">("holo");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;
      setMousePos({ x, y, normX, normY });
    };

    const handlePointerLeave = () => {
      setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
      setIsHovered(false);
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave);
    el.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      el.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  const tiltX = isHovered ? mousePos.normY * -10 : 0;
  const tiltY = isHovered ? mousePos.normX * 10 : 0;

  return (
    <div
      ref={containerRef}
      className={`hologram-portal-container ${className} ${activeFilter}`}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
    >
      {/* 1. Behind-Photo Neural Halo & Rotating Orbit Rings */}
      <div className="portal-halo-layer" aria-hidden="true">
        <div className="halo-orbit-ring ring-primary" />
        <div className="halo-orbit-ring ring-secondary" />
        <div className="halo-orbit-ring ring-tertiary" />
        <div className="halo-aurora-glow" />
      </div>

      {/* 2. Cyber HUD Telemetry Brackets */}
      <div className="hud-corner-bracket corner-tl" aria-hidden="true" />
      <div className="hud-corner-bracket corner-tr" aria-hidden="true" />
      <div className="hud-corner-bracket corner-bl" aria-hidden="true" />
      <div className="hud-corner-bracket corner-br" aria-hidden="true" />

      {/* 3. Top Telemetry Bar */}
      <div className="portal-telemetry-top">
        <div className="telemetry-id">
          <span className="telemetry-live-dot" />
          <span>BIO-ID // MR-606</span>
        </div>
        <div className="telemetry-coord">
          <span>23.876° N · 90.320° E · DIU</span>
        </div>
      </div>

      {/* 4. Mask-Blended Portrait Frame */}
      <div className="portal-image-blend-wrapper">
        <div className="portrait-mask-canvas">
          <Image
            src="/images/maruf-rayhan.jpg"
            alt="Md. Maruf Rayhan - Holographic Portrait"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 420px"
            className="portrait-blended-image"
          />

          {/* Holographic Scanline Sweep */}
          <div className="holo-scanline" aria-hidden="true" />

          {/* Interactive Mouse-Tracking Specular Lens Flare */}
          {isHovered && (
            <div
              className="holo-lens-glare"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }}
              aria-hidden="true"
            />
          )}

          {/* Matrix / Duotone Gradient Filter Overlay */}
          <div className="holo-gradient-filter" aria-hidden="true" />
        </div>
      </div>

      {/* 5. Frequency Waveform Equalizer (Bottom Blend) */}
      <div className="portal-waveform-blend" aria-hidden="true">
        {[45, 80, 100, 60, 30, 90, 75, 40, 85, 100, 50, 70, 95, 60, 85, 40, 90, 70, 45, 80].map(
          (val, idx) => (
            <span
              key={idx}
              className="wave-bar-node"
              style={{
                height: `${val}%`,
                animationDelay: `${idx * 0.06}s`,
              }}
            />
          )
        )}
      </div>

      {/* 6. Bottom Bio Card & Filter Switcher */}
      <div className="portal-meta-dock glass-panel">
        <div className="dock-person-info">
          <div className="dock-name-row">
            <h4>MD. MARUF RAYHAN</h4>
            <span className="dock-verified-badge">
              <SparklesIcon className="badge-sparkle-svg" />
              VERIFIED SWE
            </span>
          </div>
          <p className="dock-tagline">
            Android Systems Engineer · Data Science Undergraduate
          </p>
        </div>

        {/* Interactive Holographic Mode Selector */}
        <div className="portal-mode-pills">
          <button
            type="button"
            className={`mode-pill-btn ${activeFilter === "holo" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("holo")}
            title="Holographic Emerald Glow"
          >
            Holo
          </button>
          <button
            type="button"
            className={`mode-pill-btn ${activeFilter === "neural" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("neural")}
            title="Neural Cyan Matrix"
          >
            Neural
          </button>
          <button
            type="button"
            className={`mode-pill-btn ${activeFilter === "prism" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("prism")}
            title="Prismatic Violet Flare"
          >
            Prism
          </button>
        </div>
      </div>

      {/* 7. Floating Hologram Badges attached to the portrait */}
      <div className="portal-floating-tag tag-left glass-panel" aria-hidden="true">
        <SmartphoneIcon className="tag-icon" />
        <div>
          <b>Android Core</b>
          <small>Jetpack Compose &amp; MVI</small>
        </div>
      </div>

      <div className="portal-floating-tag tag-right glass-panel" aria-hidden="true">
        <CpuIcon className="tag-icon" />
        <div>
          <b>PyTorch &amp; ML</b>
          <small>On-Device Inference</small>
        </div>
      </div>
    </div>
  );
}
