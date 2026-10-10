"use client";

import { useState } from "react";
import { ShieldIcon, SmartphoneIcon, CompassIcon, SparklesIcon, CheckIcon } from "@/components/icons";

export function ProjectInteractivePreview({ visual }: { visual: string }) {
  // Sentinel State
  const [selectedSample, setSelectedSample] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const sentinelSamples = [
    { text: "DIU Notice: Software Engineering Project submission deadline is Sunday, 11:59 PM.", isFraud: false, confidence: 99.4, type: "Safe Academic" },
    { text: "URGENT ALERT: Your bank account will be blocked! Verify immediately at http://secure-update-claim.cc/login", isFraud: true, confidence: 99.8, type: "Phishing Scam" },
    { text: "Congratulations! You won $10,000 cash from International Lottery! Send $50 fee to claim.", isFraud: true, confidence: 99.9, type: "Advance-Fee Fraud" },
  ];

  const handleTestSentinel = (idx: number) => {
    setIsScanning(true);
    setSelectedSample(idx);
    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  // DIU Campus Schedule State
  const [activeTab, setActiveTab] = useState<"routine" | "exams" | "faculty">("routine");

  // Marsis State
  const [freq, setFreq] = useState<number>(3.5);

  if (visual === "sentinel") {
    const active = sentinelSamples[selectedSample];
    return (
      <div className="interactive-preview-card glass-panel sentinel-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <span className="pulsing-radar-dot" />
            <ShieldIcon className="preview-mini-icon" />
            <span>ON-DEVICE ML CLASSIFIER SIMULATOR</span>
          </div>
          <span className="preview-status-pill">PYTORCH · ONNX</span>
        </div>

        <div className="sentinel-sample-picker">
          <span className="picker-label">Test Input Sample:</span>
          <div className="picker-buttons">
            {sentinelSamples.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`sample-btn ${selectedSample === i ? "is-active" : ""}`}
                onClick={() => handleTestSentinel(i)}
              >
                Sample {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="sentinel-input-box">
          <p className="sentinel-msg">&ldquo;{active.text}&rdquo;</p>
        </div>

        <div className="sentinel-inference-result">
          <div className="inference-status">
            {isScanning ? (
              <span className="scanning-text">Running on-device neural inference...</span>
            ) : active.isFraud ? (
              <div className="result-badge scam-badge">
                <span className="badge-signal red" />
                <b>BLOCKED: {active.type}</b>
                <span className="badge-conf">{active.confidence}% Confidence</span>
              </div>
            ) : (
              <div className="result-badge safe-badge">
                <CheckIcon className="badge-icon-check" />
                <b>VERIFIED: {active.type}</b>
                <span className="badge-conf">{active.confidence}% Safe</span>
              </div>
            )}
          </div>
          <div className="inference-spec">
            <span>Latency: 4.2ms</span>
            <span>Zero cloud transit</span>
          </div>
        </div>
      </div>
    );
  }

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
                <strong>Machine Learning & Neural Nets</strong>
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
                <strong>Mid-Term: Data Science & Big Data</strong>
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
                <span>Tuesdays & Thursdays · 02:00 - 04:00 PM</span>
              </div>
              <span className="slot-badge faculty">OPEN</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (visual === "mars") {
    return (
      <div className="interactive-preview-card glass-panel mars-sim">
        <div className="preview-top-bar">
          <div className="preview-indicator">
            <CompassIcon className="preview-mini-icon" />
            <span>NASA SPACE APPS · AETHER MARSIS</span>
          </div>
          <span className="preview-status-pill amber">RADAR TELEMETRY</span>
        </div>

        <div className="mars-radar-scan">
          <div className="mars-coord-readout">
            <span>LAT: 14°32′ N</span>
            <span>LON: 175°28′ E</span>
            <span>ELEV: -1.82 km</span>
          </div>

          <div className="radar-sweep-screen">
            <div className="radar-sweep-line" />
            <div className="radar-anomaly-point" style={{ top: "35%", left: "42%" }} />
            <div className="radar-anomaly-point" style={{ top: "60%", left: "70%" }} />
            <span className="subsurface-echo">SUB-SURFACE ECHO DETECTED (Z = -240m)</span>
          </div>

          <div className="frequency-tuner">
            <label htmlFor="freq-range">Sounder Frequency: {freq.toFixed(1)} MHz</label>
            <input
              id="freq-range"
              type="range"
              min="1.8"
              max="5.0"
              step="0.1"
              value={freq}
              onChange={(e) => setFreq(parseFloat(e.target.value))}
              className="freq-slider"
            />
          </div>
        </div>
      </div>
    );
  }

  // AuraScribe AI or generic
  return (
    <div className="interactive-preview-card glass-panel generic-sim">
      <div className="preview-top-bar">
        <div className="preview-indicator">
          <SparklesIcon className="preview-mini-icon" />
          <span>INTELLIGENT PIPELINE ENGINE</span>
        </div>
        <span className="preview-status-pill violet">AI INGEST</span>
      </div>
      <div className="pipeline-stream">
        <div className="pipeline-node">RAW TEXT</div>
        <div className="pipeline-arrow">&rarr;</div>
        <div className="pipeline-node active">TOKENIZER</div>
        <div className="pipeline-arrow">&rarr;</div>
        <div className="pipeline-node highlight">EMBEDDINGS</div>
        <div className="pipeline-arrow">&rarr;</div>
        <div className="pipeline-node">SYNTHESIS</div>
      </div>
      <p className="pipeline-caption">Automated natural language reduction & semantic indexing engine</p>
    </div>
  );
}
