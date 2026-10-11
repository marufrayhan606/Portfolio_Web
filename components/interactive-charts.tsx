"use client";

import { useState } from "react";
import { semesters, radarMetrics } from "@/data/portfolio";
import { AwardIcon, ActivityIcon, CpuIcon, SparklesIcon } from "@/components/icons";

export function GpaTrajectoryChart() {
  const [activePoint, setActivePoint] = useState<number | null>(2); // Default to Fall '24 (peak 3.96)

  const minScore = 3.8;
  const maxScore = 4.0;
  const width = 900;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const getCoords = (index: number, score: number) => {
    const x = paddingX + (index / (semesters.length - 1)) * (width - paddingX * 2);
    const normalizedY = (score - minScore) / (maxScore - minScore);
    const y = height - paddingY - normalizedY * (height - paddingY * 2);
    return { x, y };
  };

  const points = semesters.map((item, i) => ({
    ...item,
    ...getCoords(i, item.score),
  }));

  // Build smooth bezier curve
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    pathD += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  // Area path for glowing gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const selectedSemester = activePoint !== null ? points[activePoint] : points[points.length - 1];

  return (
    <div className="glass-chart-container reveal-on-scroll">
      <div className="chart-header">
        <div className="chart-title-group">
          <div className="chart-badge">
            <ActivityIcon className="chart-badge-icon" />
            <span>ACADEMIC TRAJECTORY</span>
          </div>
          <h3>Consistent Top-Tier GPA Performance</h3>
          <p>B.Sc. in Software Engineering · Daffodil International University</p>
        </div>

        <div className="chart-kpis">
          <div className="chart-kpi">
            <span className="kpi-label">AVERAGE GPA</span>
            <strong className="kpi-val cyan-glow">3.93</strong>
            <span className="kpi-sub">Out of 4.00 Scale</span>
          </div>
          <div className="chart-kpi">
            <span className="kpi-label">PEAK SEMESTER</span>
            <strong className="kpi-val emerald-glow">3.96</strong>
            <span className="kpi-sub">Fall 2024 · Peak</span>
          </div>
          <div className="chart-kpi">
            <span className="kpi-label">COMPLETED</span>
            <strong className="kpi-val violet-glow">8 / 8</strong>
            <span className="kpi-sub">Semesters tracked</span>
          </div>
        </div>
      </div>

      {/* Interactive Tooltip Card */}
      {selectedSemester && (
        <div className="chart-live-tooltip glass-panel">
          <div className="tooltip-indicator">
            <AwardIcon className="tooltip-icon" />
            <div>
              <strong>{selectedSemester.fullTerm}</strong>
              <span className="tooltip-highlight">{selectedSemester.highlight}</span>
            </div>
          </div>
          <div className="tooltip-score">
            <span>SEMESTER GPA</span>
            <b>{selectedSemester.score.toFixed(2)}</b>
          </div>
        </div>
      )}

      {/* SVG Canvas Line Graph */}
      <div className="chart-svg-shell">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chart-svg-element"
          preserveAspectRatio="none"
          role="img"
          aria-label="Interactive GPA Trajectory Chart"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[4.0, 3.95, 3.9, 3.85, 3.8].map((val) => {
            const normY = (val - minScore) / (maxScore - minScore);
            const gridY = height - paddingY - normY * (height - paddingY * 2);
            return (
              <g key={val} className="grid-group">
                <line x1={paddingX} y1={gridY} x2={width - paddingX} y2={gridY} className="chart-gridline" />
                <text x={paddingX - 10} y={gridY + 4} className="chart-axis-label" textAnchor="end">
                  {val.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Glowing Line */}
          <path d={pathD} fill="none" stroke="url(#lineStroke)" strokeWidth="3.5" filter="url(#glowFilter)" className="chart-animated-stroke" />

          {/* Interactive Data Points */}
          {points.map((pt, idx) => {
            const isSelected = activePoint === idx;
            return (
              <g
                key={pt.fullTerm}
                className={`chart-data-node ${isSelected ? "is-active" : ""}`}
                onClick={() => setActivePoint(idx)}
                onMouseEnter={() => setActivePoint(idx)}
                tabIndex={0}
                role="button"
                aria-label={`${pt.term}: ${pt.score}`}
              >
                {/* Outer halo */}
                {isSelected && (
                  <circle cx={pt.x} cy={pt.y} r="14" fill="#10b981" fillOpacity="0.25" className="node-halo" />
                )}
                {/* Glowing ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? "7" : "5"}
                  fill="#030712"
                  stroke={isSelected ? "#00f59b" : "#06b6d4"}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="node-circle"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Semester X-Axis Pills */}
      <div className="chart-timeline-ticks">
        {points.map((pt, idx) => (
          <button
            key={pt.fullTerm}
            type="button"
            className={`timeline-tick ${activePoint === idx ? "is-selected" : ""}`}
            onClick={() => setActivePoint(idx)}
          >
            <span className="tick-term">{pt.term}</span>
            <b className="tick-score">{pt.score.toFixed(2)}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SkillsRadarChart() {
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "Android", "Data Science", "Languages", "Full-Stack"];

  const filteredMetrics = filterCategory === "All"
    ? radarMetrics
    : radarMetrics.filter((m) => m.category === filterCategory || filterCategory === "All");

  const size = 380;
  const center = size / 2;
  const radius = 135;
  const totalAxes = filteredMetrics.length;

  // Calculate coordinates for a polygon on radar
  const getPolygonPoint = (score: number, index: number, total: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const distance = (score / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };

  const polygonPoints = filteredMetrics
    .map((m, i) => {
      const { x, y } = getPolygonPoint(m.score, i, totalAxes);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="glass-radar-container reveal-on-scroll">
      <div className="radar-head">
        <div className="chart-badge">
          <CpuIcon className="chart-badge-icon" />
          <span>COMPETENCY RADAR</span>
        </div>
        <h3>Technical Mastery Distribution</h3>
        <p>Weighted proficiency across core mobile, AI/ML, and computational domains</p>
      </div>

      <div className="radar-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`radar-filter-pill ${filterCategory === cat ? "active" : ""}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="radar-visual-wrapper">
        <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg" role="img" aria-label="Skills Radar Chart">
          <defs>
            <linearGradient id="radarFillGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Concentric Web Rings (25%, 50%, 75%, 100%) */}
          {[0.25, 0.5, 0.75, 1.0].map((level) => {
            const levelPoints = filteredMetrics
              .map((_, i) => {
                const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                const d = radius * level;
                return `${center + Math.cos(angle) * d},${center + Math.sin(angle) * d}`;
              })
              .join(" ");
            return (
              <polygon
                key={level}
                points={levelPoints}
                className="radar-web-ring"
                stroke="rgba(255, 255, 255, 0.1)"
                fill={level === 1.0 ? "rgba(15, 23, 42, 0.35)" : "none"}
                strokeWidth="1"
              />
            );
          })}

          {/* Radial Spokes */}
          {filteredMetrics.map((_, i) => {
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const x2 = center + Math.cos(angle) * radius;
            const y2 = center + Math.sin(angle) * radius;
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeDasharray="2 3"
              />
            );
          })}

          {/* Filled Radar Polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#radarFillGrad)"
            stroke="#00f59b"
            strokeWidth="2.5"
            filter="url(#radarGlow)"
            className="radar-active-poly"
          />

          {/* Data Points & Value Badges */}
          {filteredMetrics.map((m, i) => {
            const pt = getPolygonPoint(m.score, i, totalAxes);
            const labelAngle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const labelDist = radius + 24;
            const lx = center + Math.cos(labelAngle) * labelDist;
            const ly = center + Math.sin(labelAngle) * labelDist;

            return (
              <g key={m.axis}>
                <circle cx={pt.x} cy={pt.y} r="5" fill="#030712" stroke="#00f59b" strokeWidth="2.5" />
                <text
                  x={lx}
                  y={ly}
                  className="radar-label"
                  textAnchor={lx > center + 10 ? "start" : lx < center - 10 ? "end" : "middle"}
                  dominantBaseline="middle"
                >
                  {m.axis.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend / Score Breakdown List */}
        <div className="radar-score-grid">
          {filteredMetrics.map((m) => (
            <div className="radar-score-item glass-panel" key={m.axis}>
              <div className="radar-item-top">
                <span className="radar-item-name">{m.axis}</span>
                <b className="radar-item-score">{m.score}%</b>
              </div>
              <div className="radar-item-bar-bg">
                <div
                  className="radar-item-bar-fill"
                  style={{
                    width: `${m.score}%`,
                    background:
                      m.score > 90
                        ? "linear-gradient(90deg, #10b981, #00f59b)"
                        : m.score > 85
                        ? "linear-gradient(90deg, #06b6d4, #38bdf8)"
                        : "linear-gradient(90deg, #8b5cf6, #c084fc)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectStackChart() {
  const domains = [
    { name: "Android Native & Jetpack Compose", count: 3, pct: 34, color: "var(--accent-emerald)" },
    { name: "Full-Stack & Web Applications", count: 2, pct: 22, color: "var(--accent-cyan)" },
    { name: "AI Research & Data Science", count: 2, pct: 22, color: "var(--accent-violet)" },
    { name: "Desktop Systems & Utilities", count: 2, pct: 22, color: "var(--accent-amber)" },
  ];

  return (
    <div className="glass-stack-chart glass-panel reveal-on-scroll">
      <div className="stack-chart-head">
        <SparklesIcon className="chart-badge-icon" />
        <h4>Architecture Domain Split</h4>
      </div>
      <div className="stack-bars">
        {domains.map((dom) => (
          <div className="stack-row" key={dom.name}>
            <div className="stack-row-meta">
              <span>{dom.name}</span>
              <strong>{dom.count} Projects ({dom.pct}%)</strong>
            </div>
            <div className="stack-bar-track">
              <div
                className="stack-bar-fill"
                style={{ width: `${dom.pct}%`, backgroundColor: dom.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
