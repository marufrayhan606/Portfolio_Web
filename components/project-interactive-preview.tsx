"use client";

import { useState } from "react";
import { ShieldIcon, SmartphoneIcon, CompassIcon, SparklesIcon, CheckIcon, CpuIcon, ActivityIcon } from "@/components/icons";

export function ProjectInteractivePreview({ visual }: { visual: string }) {
  // 1. NapTrap Geofence State
  const [transitStop, setTransitStop] = useState<number>(0);
  const [alarmRadius, setAlarmRadius] = useState<number>(800);
  const [isSimulatingCommute, setIsSimulatingCommute] = useState<boolean>(false);
  const [currentDist, setCurrentDist] = useState<number>(2400);

  const transitStops = [
    { name: "Daffodil Smart City Campus", targetDist: 2400, arrivalDist: 450 },
    { name: "Mirpur 10 Metro Interchange", targetDist: 3100, arrivalDist: 600 },
    { name: "Uttara North Station", targetDist: 1800, arrivalDist: 350 },
  ];

  const handleSimulateApproach = () => {
    setIsSimulatingCommute(true);
    setCurrentDist(transitStops[transitStop].arrivalDist);
    setTimeout(() => {
      setIsSimulatingCommute(false);
    }, 600);
  };

  const handleResetCommute = (idx: number) => {
    setTransitStop(idx);
    setCurrentDist(transitStops[idx].targetDist);
  };

  // 2. CityPharma FastAPI State
  const [activeEndpoint, setActiveEndpoint] = useState<number>(0);
  const [isFetchingApi, setIsFetchingApi] = useState<boolean>(false);

  const pharmaEndpoints = [
    {
      method: "GET",
      path: "/api/inventory/critical",
      role: "Manager",
      response: { low_stock_items: 4, urgent_reorders: ["Paracetamol 500mg (8 left)", "Amoxicillin 250mg (3 left)"], status: "ALERT_ACTIVE" },
      latency: "12ms",
    },
    {
      method: "POST",
      path: "/api/prescriptions/dispense",
      role: "Staff (ID: #402)",
      response: { transaction_id: "RX-99410", items_deducted: 2, total_bdt: 420.0, audit_logged: true },
      latency: "18ms",
    },
    {
      method: "GET",
      path: "/api/audit/daily-summary",
      role: "Manager",
      response: { date: "Today", dispensed_count: 148, gross_revenue: "৳38,450", db_engine: "MySQL 8.0 / SQLAlchemy" },
      latency: "15ms",
    },
  ];

  const handleTriggerApi = (idx: number) => {
    setIsFetchingApi(true);
    setActiveEndpoint(idx);
    setTimeout(() => {
      setIsFetchingApi(false);
    }, 350);
  };

  // 3. TrafficFlow EDQN Dueling DQN State
  const [trafficStep, setTrafficStep] = useState<number>(0);
  const [isInferringDQN, setIsInferringDQN] = useState<boolean>(false);

  const trafficScenarios = [
    {
      name: "Dense Peak Congestion (Angle C Eastbound)",
      cameraDensities: { A: "38 cars", B: "29 cars", C: "94 cars (CRITICAL)", D: "18 cars" },
      qValues: [ -8.4, -9.1, -3.2, -11.5 ],
      selectedAction: 2,
      actionPhase: "Green Phase C (Eastbound Corridor)",
      rewardGain: "+2.3x Baseline Advantage",
      valueStream: "-4.18",
      advantageStream: "+0.98",
    },
    {
      name: "Midday Cross Flow (Angle A Northbound)",
      cameraDensities: { A: "82 cars (HIGH)", B: "22 cars", C: "31 cars", D: "15 cars" },
      qValues: [ -2.9, -10.4, -8.7, -12.1 ],
      selectedAction: 0,
      actionPhase: "Green Phase A (Northbound Main)",
      rewardGain: "+2.1x Baseline Advantage",
      valueStream: "-3.85",
      advantageStream: "+0.95",
    },
  ];

  const handleStepTraffic = () => {
    setIsInferringDQN(true);
    setTimeout(() => {
      setTrafficStep((prev) => (prev === 0 ? 1 : 0));
      setIsInferringDQN(false);
    }, 400);
  };

  // 4. NDSS 2026 Telemetry Classifier State
  const [selectedTelemetry, setSelectedTelemetry] = useState<number>(0);
  const [isScanningTelemetry, setIsScanningTelemetry] = useState<boolean>(false);

  const telemetrySamples = [
    {
      id: "TELEMETRY_PKT_#0184",
      desc: "Cruising Orbit (Thermal nominal, power balanced)",
      sensors: { temp_log: "38.2°C", power_skew: "0.04", bimodal_core: "0.98", parity_bit: "0" },
      isBreach: false,
      confidence: 76.4,
    },
    {
      id: "TELEMETRY_PKT_#0742",
      desc: "Warning: High thermal skew & core oscillation",
      sensors: { temp_log: "91.8°C", power_skew: "0.82", bimodal_core: "0.14", parity_bit: "1" },
      isBreach: true,
      confidence: 81.2,
    },
  ];

  const handleTestTelemetry = (idx: number) => {
    setIsScanningTelemetry(true);
    setSelectedTelemetry(idx);
    setTimeout(() => {
      setIsScanningTelemetry(false);
    }, 400);
  };

  // 5. DIU Campus Schedule State
  const [activeTab, setActiveTab] = useState<"routine" | "exams" | "faculty">("routine");

  // RENDER: NapTrap
  if (visual === "naptrap") {
    const isAlarmTriggered = currentDist <= alarmRadius;
    const activeStop = transitStops[transitStop];

    return (
      <div className="interactive-preview-card glass-panel naptrap-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <span className="pulsing-radar-dot" />
            <CompassIcon className="preview-mini-icon" />
            <span>NAPTRAP GEOFENCE RADAR SIMULATOR</span>
          </div>
          <span className="preview-status-pill green">OSMDROID · GPS ACTIVE</span>
        </div>

        <div className="sentinel-sample-picker">
          <span className="picker-label">Destination Stop:</span>
          <div className="picker-buttons">
            {transitStops.map((st, i) => (
              <button
                key={i}
                type="button"
                className={`sample-btn ${transitStop === i ? "is-active" : ""}`}
                onClick={() => handleResetCommute(i)}
              >
                Stop {i + 1}: {st.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="naptrap-radar-readout glass-panel" style={{ padding: "14px", marginTop: "10px", borderRadius: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-subtle)", fontWeight: 600 }}>TARGET: {activeStop.name}</span>
            <span style={{ fontSize: "12px", color: isAlarmTriggered ? "var(--accent-emerald)" : "var(--accent-cyan)", fontWeight: 700 }}>
              DISTANCE: {currentDist}m
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label htmlFor="radius-slider" style={{ fontSize: "11px", color: "var(--text-muted)" }}>Alarm Radius: {alarmRadius}m</label>
            <input
              id="radius-slider"
              type="range"
              min="400"
              max="1500"
              step="100"
              value={alarmRadius}
              onChange={(e) => setAlarmRadius(parseInt(e.target.value, 10))}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="sentinel-inference-result" style={{ marginTop: "12px" }}>
          <div className="inference-status">
            {isSimulatingCommute ? (
              <span className="scanning-text">Tracking GPS transit geofence...</span>
            ) : isAlarmTriggered ? (
              <div className="result-badge safe-badge" style={{ borderColor: "rgba(0, 245, 155, 0.4)" }}>
                <CheckIcon className="badge-icon-check" />
                <b>WAKE-UP ALARM ACTIVATED! ({currentDist}m &lt;= {alarmRadius}m)</b>
              </div>
            ) : (
              <div className="result-badge" style={{ background: "rgba(15, 23, 42, 0.6)", color: "var(--text-muted)" }}>
                <span>Commute Active: Safe to nap ({currentDist}m remaining)</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button
              type="button"
              className="button-neon-sm"
              onClick={handleSimulateApproach}
              style={{ fontSize: "12px", padding: "6px 14px" }}
            >
              Simulate Transit Arrival
            </button>
            <button
              type="button"
              className="button-glass-pill-sm"
              onClick={() => handleResetCommute(transitStop)}
              style={{ fontSize: "12px", padding: "6px 14px" }}
            >
              Reset Distance
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: CityPharma
  if (visual === "pharma") {
    const activeEp = pharmaEndpoints[activeEndpoint];

    return (
      <div className="interactive-preview-card glass-panel pharma-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <CpuIcon className="preview-mini-icon" />
            <span>CITYPHARMA FASTAPI &amp; REACT EXPLORER</span>
          </div>
          <span className="preview-status-pill cyan">SWAGGER UI · MYSQL</span>
        </div>

        <div className="sentinel-sample-picker">
          <span className="picker-label">Test Endpoint:</span>
          <div className="picker-buttons">
            {pharmaEndpoints.map((ep, i) => (
              <button
                key={i}
                type="button"
                className={`sample-btn ${activeEndpoint === i ? "is-active" : ""}`}
                onClick={() => handleTriggerApi(i)}
              >
                {ep.method} {ep.path.split("/")[2]}
              </button>
            ))}
          </div>
        </div>

        <div className="sentinel-input-box" style={{ background: "#0a0f1d", padding: "12px", fontFamily: "var(--font-mono, monospace)", fontSize: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ color: "#38bdf8" }}>{activeEp.method} {activeEp.path}</span>
            <span style={{ color: "#00f59b" }}>Auth: {activeEp.role}</span>
          </div>
          <pre style={{ margin: 0, color: "#e2e8f0", whiteSpace: "pre-wrap" }}>
            {isFetchingApi ? "Executing query on MySQL database..." : JSON.stringify(activeEp.response, null, 2)}
          </pre>
        </div>

        <div className="sentinel-inference-result" style={{ marginTop: "10px" }}>
          <div className="inference-spec" style={{ width: "100%", justifyContent: "space-between" }}>
            <span>Backend Latency: {activeEp.latency}</span>
            <span>FastAPI Uvicorn · JWT Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: TrafficFlow EDQN
  if (visual === "traffic") {
    const curScenario = trafficScenarios[trafficStep];

    return (
      <div className="interactive-preview-card glass-panel traffic-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <ActivityIcon className="preview-mini-icon" />
            <span>DUELING DQN TRAFFIC SIGNAL AGENT</span>
          </div>
          <span className="preview-status-pill emerald">PYTORCH 2.5 · CUDA 11.8</span>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <span style={{ fontSize: "11px", color: "var(--accent-emerald)", fontWeight: 700, textTransform: "uppercase" }}>
            State: {curScenario.name}
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginTop: "8px" }}>
            {Object.entries(curScenario.cameraDensities).map(([cam, dens]) => (
              <div key={cam} className="glass-panel" style={{ padding: "8px", textAlign: "center", borderRadius: "8px" }}>
                <span style={{ fontSize: "10px", color: "var(--text-subtle)", display: "block" }}>Cam {cam}</span>
                <strong style={{ fontSize: "11px", color: dens.includes("CRITICAL") || dens.includes("HIGH") ? "var(--accent-emerald)" : "#f1f5f9" }}>
                  {dens.split(" ")[0]}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="sentinel-input-box" style={{ background: "#0a0f1d", padding: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
            <span style={{ color: "var(--text-subtle)" }}>Dueling Q-Values: [A0, A1, A2, A3]</span>
            <span style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>Value V(s) = {curScenario.valueStream}</span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {curScenario.qValues.map((q, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: "6px",
                  textAlign: "center",
                  fontSize: "11px",
                  background: idx === curScenario.selectedAction ? "rgba(0, 245, 155, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  border: idx === curScenario.selectedAction ? "1px solid var(--accent-emerald)" : "1px solid transparent",
                  color: idx === curScenario.selectedAction ? "var(--accent-emerald)" : "var(--text-muted)",
                }}
              >
                <b>Act {idx}</b>: {q.toFixed(1)}
              </div>
            ))}
          </div>
        </div>

        <div className="sentinel-inference-result" style={{ marginTop: "10px" }}>
          <div className="inference-status">
            {isInferringDQN ? (
              <span className="scanning-text">Computing Dueling Q-network streams...</span>
            ) : (
              <div className="result-badge safe-badge">
                <CheckIcon className="badge-icon-check" />
                <b>Action: {curScenario.actionPhase}</b>
                <span className="badge-conf">{curScenario.rewardGain}</span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="button-neon-sm"
            onClick={handleStepTraffic}
            style={{ fontSize: "12px", padding: "6px 14px", marginTop: "8px" }}
          >
            Switch Intersection State &rarr;
          </button>
        </div>
      </div>
    );
  }

  // RENDER: NDSS Hackathon Telemetry
  if (visual === "hackathon") {
    const curPkt = telemetrySamples[selectedTelemetry];

    return (
      <div className="interactive-preview-card glass-panel hackathon-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <ShieldIcon className="preview-mini-icon" />
            <span>NDSS 2026 STARSHIP SAFETY CLASSIFIER</span>
          </div>
          <span className="preview-status-pill amber">RANDOM FOREST · TOP 6</span>
        </div>

        <div className="sentinel-sample-picker">
          <span className="picker-label">Telemetry Packet:</span>
          <div className="picker-buttons">
            {telemetrySamples.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`sample-btn ${selectedTelemetry === i ? "is-active" : ""}`}
                onClick={() => handleTestTelemetry(i)}
              >
                Pkt {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="sentinel-input-box" style={{ background: "#0a0f1d", padding: "12px" }}>
          <p style={{ margin: "0 0 6px 0", fontSize: "12px", color: "var(--text-pure)" }}>{curPkt.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", fontSize: "11px", color: "var(--text-subtle)" }}>
            <span>Temp: <strong style={{ color: "#f8fafc" }}>{curPkt.sensors.temp_log}</strong></span>
            <span>Power Skew: <strong style={{ color: "#f8fafc" }}>{curPkt.sensors.power_skew}</strong></span>
            <span>Bimodal: <strong style={{ color: "#f8fafc" }}>{curPkt.sensors.bimodal_core}</strong></span>
            <span>Parity: <strong style={{ color: "#f8fafc" }}>{curPkt.sensors.parity_bit}</strong></span>
          </div>
        </div>

        <div className="sentinel-inference-result" style={{ marginTop: "10px" }}>
          <div className="inference-status">
            {isScanningTelemetry ? (
              <span className="scanning-text">Running Random Forest ensemble classifier...</span>
            ) : curPkt.isBreach ? (
              <div className="result-badge scam-badge">
                <span className="badge-signal red" />
                <b>SAFETY BREACH DETECTED (target_breach: 1)</b>
                <span className="badge-conf">{curPkt.confidence}% Confidence</span>
              </div>
            ) : (
              <div className="result-badge safe-badge">
                <CheckIcon className="badge-icon-check" />
                <b>TELEMETRY NOMINAL (target_breach: 0)</b>
                <span className="badge-conf">{curPkt.confidence}% Confidence</span>
              </div>
            )}
          </div>
          <div className="inference-spec">
            <span>Accuracy: 68.5% · F1: 0.696 · Precision: 72.0%</span>
            <span>5th National Data Science Summit</span>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: DIU Campus Schedule
  if (visual === "schedule") {
    return (
      <div className="interactive-preview-card glass-panel schedule-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <SmartphoneIcon className="preview-mini-icon" />
            <span>DIU CAMPUS LIVE COMPANION</span>
          </div>
          <span className="preview-status-pill green">ACTIVE ROUTINE</span>
        </div>

        <div className="schedule-tabs">
          <button
            type="button"
            className={`schedule-tab-btn ${activeTab === "routine" ? "active" : ""}`}
            onClick={() => setActiveTab("routine")}
          >
            Class Routine
          </button>
          <button
            type="button"
            className={`schedule-tab-btn ${activeTab === "exams" ? "active" : ""}`}
            onClick={() => setActiveTab("exams")}
          >
            Exam Schedule
          </button>
          <button
            type="button"
            className={`schedule-tab-btn ${activeTab === "faculty" ? "active" : ""}`}
            onClick={() => setActiveTab("faculty")}
          >
            Faculty Info
          </button>
        </div>

        {activeTab === "routine" && (
          <div className="schedule-timeline-list">
            <div className="schedule-slot active-slot">
              <span className="slot-time">10:00 - 11:30 AM</span>
              <div className="slot-details">
                <strong>Machine Learning &amp; Neural Nets</strong>
                <span>Room 408 · Prof. Dr. Rahman</span>
              </div>
              <span className="slot-badge now">NOW</span>
            </div>
            <div className="schedule-slot">
              <span className="slot-time">01:00 - 02:30 PM</span>
              <div className="slot-details">
                <strong>Mobile App Architecture (Kotlin)</strong>
                <span>Lab 201 · Clean MVI Session</span>
              </div>
              <span className="slot-badge upcoming">UPCOMING</span>
            </div>
          </div>
        )}

        {activeTab === "exams" && (
          <div className="schedule-timeline-list">
            <div className="schedule-slot exam-slot">
              <span className="slot-time">Nov 14 · 10:00 AM</span>
              <div className="slot-details">
                <strong>Mid-Term: Data Science &amp; Big Data</strong>
                <span>Auditorium · Section 58_A</span>
              </div>
              <span className="slot-badge exam">MID-TERM</span>
            </div>
          </div>
        )}

        {activeTab === "faculty" && (
          <div className="schedule-timeline-list">
            <div className="schedule-slot faculty-slot">
              <span className="slot-time">Dept. SWE</span>
              <div className="slot-details">
                <strong>Faculty Consultation Hours</strong>
                <span>Tuesdays &amp; Thursdays · 02:00 - 04:00 PM</span>
              </div>
              <span className="slot-badge faculty">OPEN</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Generic / Default
  return (
    <div className="interactive-preview-card glass-panel generic-sim">
      <div className="preview-top-bar">
        <div className="preview-indicator">
          <SparklesIcon className="preview-mini-icon" />
          <span>ENGINEERED ARCHITECTURE PREVIEW</span>
        </div>
        <span className="preview-status-pill violet">SYSTEM CORE</span>
      </div>
      <div className="pipeline-stream">
        <div className="pipeline-node">SOURCE REPO</div>
        <div className="pipeline-arrow">&rarr;</div>
        <div className="pipeline-node active">CORE LOGIC</div>
        <div className="pipeline-arrow">&rarr;</div>
        <div className="pipeline-node highlight">PERSISTENCE</div>
        <div className="pipeline-arrow">&rarr;</div>
        <div className="pipeline-node">USER INTERFACE</div>
      </div>
      <p className="pipeline-caption">Clean architecture separation with deterministic state flow</p>
    </div>
  );
}
