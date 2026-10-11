"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SparklesIcon, SmartphoneIcon, CpuIcon } from "@/components/icons";

interface HolographicPortraitProps {
  className?: string;
  src?: string;
}

const DEFAULT_PORTRAIT_CANDIDATES = [
  "/images/maruf-rayhan.png",
  "/images/maruf-rayhan.jpg",
  "/images/maruf-rayhan.webp",
  "/images/maruf-rayhan.jpeg",
  "/images/maruf-rayhan.avif",
  "/images/maruf-rayhan.svg",
  "/images/maruf-diu-campus.jpg",
  "/images/maruf-diu-campus.png",
  "/images/maruf-diu-campus.webp",
  "/images/profile.png",
  "/images/profile.jpg",
  "/images/profile.webp",
  "/images/portrait.png",
  "/images/portrait.jpg",
  "/images/avatar.png",
  "/images/avatar.jpg",
];

export function HolographicPortrait({ className = "", src }: HolographicPortraitProps) {
  const [candidates, setCandidates] = useState<string[]>(() => {
    if (src) {
      const base = src.replace(/\.[^/.]+$/, "");
      return [
        src,
        `${base}.png`,
        `${base}.jpg`,
        `${base}.webp`,
        `${base}.jpeg`,
        `${base}.avif`,
        `${base}.svg`,
        ...DEFAULT_PORTRAIT_CANDIDATES,
      ];
    }
    return DEFAULT_PORTRAIT_CANDIDATES;
  });
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (src) {
      const base = src.replace(/\.[^/.]+$/, "");
      setCandidates([
        src,
        `${base}.png`,
        `${base}.jpg`,
        `${base}.webp`,
        `${base}.jpeg`,
        `${base}.avif`,
        `${base}.svg`,
        ...DEFAULT_PORTRAIT_CANDIDATES,
      ]);
      setPortraitIndex(0);
      setAllFailed(false);
    }
  }, [src]);

  const handleImageError = () => {
    if (portraitIndex + 1 < candidates.length) {
      setPortraitIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

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

  const tiltX = isHovered ? mousePos.normY * -6 : 0;
  const tiltY = isHovered ? mousePos.normX * 6 : 0;
  const currentPortraitSrc = candidates[portraitIndex] || "/images/maruf-rayhan.jpg";

  return (
    <div
      ref={containerRef}
      className={`hologram-portal-container ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`,
      }}
    >
      {/* Ambient Radial Aura */}
      <div className="portal-halo-layer" aria-hidden="true">
        <div className="halo-orbit-ring ring-primary" />
        <div className="halo-orbit-ring ring-secondary" />
        <div className="halo-aurora-glow" />
      </div>

      {/* Portrait Glass Frame */}
      <div className="portal-image-blend-wrapper">
        <div className="portrait-mask-canvas">
          {!allFailed ? (
            <Image
              key={currentPortraitSrc}
              src={currentPortraitSrc}
              alt="Md. Maruf Rayhan"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 420px"
              className="portrait-blended-image"
              onError={handleImageError}
              unoptimized={currentPortraitSrc.endsWith(".svg")}
            />
          ) : (
            <div
              className="portrait-fallback-monogram"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(20, 24, 39, 0.95), rgba(10, 13, 22, 0.98))",
                color: "#60a5fa",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "2px solid rgba(96, 165, 250, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  background: "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)",
                  boxShadow: "0 0 30px rgba(96, 165, 250, 0.25)",
                }}
              >
                MR
              </div>
              <span style={{ marginTop: "14px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", opacity: 0.7 }}>
                MD. MARUF RAYHAN
              </span>
            </div>
          )}

          {/* Interactive Specular Sheen */}
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

          {/* Subtle Ambient Contrast Overlay */}
          <div className="holo-gradient-filter" aria-hidden="true" />
        </div>
      </div>

      {/* Floating Focus Pills */}
      <div className="portal-floating-tag tag-left glass-panel" aria-hidden="true">
        <SmartphoneIcon className="tag-icon" />
        <div>
          <b>Android Native</b>
          <small>Compose &amp; Clean Architecture</small>
        </div>
      </div>

      <div className="portal-floating-tag tag-right glass-panel" aria-hidden="true">
        <CpuIcon className="tag-icon" />
        <div>
          <b>Applied ML</b>
          <small>On-Device Intelligence</small>
        </div>
      </div>

      {/* Clean Executive Profile Card */}
      <div className="portal-meta-dock glass-panel">
        <div className="dock-person-info">
          <div className="dock-name-row">
            <h4>MD. MARUF RAYHAN</h4>
            <span className="dock-verified-badge">
              <span className="status-live-beacon" />
              AVAILABLE FOR HIRE
            </span>
          </div>
          <p className="dock-tagline">
            Software Engineering Student · DIU, Dhaka
          </p>
        </div>
      </div>
    </div>
  );
}
