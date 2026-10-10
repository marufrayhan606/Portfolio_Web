import type { Project } from "@/data/portfolio";

export function ProjectArtwork({ visual }: { visual: Project["visual"] }) {
  return (
    <div className={`project-art art-${visual}`} aria-hidden="true">
      {visual === "schedule" && (
        <div className="schedule-board glass-panel">
          <div className="board-heading">
            <span className="board-tag">DIU CAMPUS ECOSYSTEM</span>
            <span className="board-live-pill">LIVE SYNC</span>
          </div>
          <div className="board-today-bar">
            <b>Today&apos;s Schedule</b>
            <span className="board-term">FALL &apos;25 · SWE</span>
          </div>
          <div className="board-rows">
            <div className="board-row active-now">
              <span className="dot-neon green" />
              <div className="board-row-text">
                <strong>Machine Learning &amp; Neural Nets</strong>
                <small>10:00 AM · Room 408</small>
              </div>
              <span className="row-code">CSE-412</span>
            </div>
            <div className="board-row">
              <span className="dot-neon cyan" />
              <div className="board-row-text">
                <strong>Android Native Architecture</strong>
                <small>01:00 PM · Lab 201</small>
              </div>
              <span className="row-code">SWE-324</span>
            </div>
            <div className="board-row">
              <span className="dot-neon violet" />
              <div className="board-row-text">
                <strong>Mid-Term Examination Routine</strong>
                <small>Published 2h ago</small>
              </div>
              <span className="row-code">NOTICE</span>
            </div>
          </div>
          <div className="board-footer">
            <span>OFFLINE-FIRST · ROOM DB</span>
            <span className="board-status-ok">&bull; SYNCED</span>
          </div>
        </div>
      )}

      {visual === "sentinel" && (
        <div className="signal-board glass-panel">
          <div className="signal-top">
            <span className="signal-label">NEURAL DEFENSE ENGINE</span>
            <span className="signal-secure-badge">ZERO-CLOUD ML</span>
          </div>
          <div className="signal-wave-grid">
            {[40, 75, 95, 30, 85, 100, 45, 90, 60, 80, 100, 35, 70, 90, 50, 85].map((h, i) => (
              <span
                key={i}
                className="wave-bar"
                style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <div className="signal-pipeline-display">
            <span className="pipe-box">SMS STREAM</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box active">ONNX INFERENCE</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box danger">FRAUD QUARANTINE</span>
          </div>
          <div className="signal-footer">
            <span>INFERENCE: 3.8ms</span>
            <span className="signal-shield-ok">99.8% PRECISION</span>
          </div>
        </div>
      )}

      {visual === "mars" && (
        <div className="terrain-board glass-panel">
          <div className="terrain-top">
            <span className="terrain-label">NASA SPACE APPS · MARSIS</span>
            <span className="terrain-badge">RADAR SOUNDER</span>
          </div>
          <div className="terrain-visual-mesh">
            <div className="terrain-grid-lines" />
            <div className="radar-sweep-cone" />
            <div className="terrain-contour c1" />
            <div className="terrain-contour c2" />
            <div className="terrain-contour c3" />
            <div className="mars-beacon-dot" />
          </div>
          <div className="terrain-footer">
            <span>CHRYSE PLANITIA · SUB-SURFACE</span>
            <span>3.5 MHz SOUNDER</span>
          </div>
        </div>
      )}

      {visual === "scribe" && (
        <div className="scribe-art glass-panel">
          <div className="scribe-top">
            <span>AURASCRIBE · NLP ENGINE</span>
            <span className="dot-neon violet" />
          </div>
          <div className="scribe-body">
            <div className="scribe-pill-cloud">
              <span>Tokenize</span>
              <span>Embeddings</span>
              <span>Attention</span>
              <span>Synthesize</span>
            </div>
            <div className="scribe-waveform">
              <span className="line-flow" />
            </div>
          </div>
          <div className="scribe-foot">
            <small>TEXT PROCESSING PIPELINE</small>
          </div>
        </div>
      )}

      {visual === "sync" && (
        <div className="sync-art glass-panel">
          <div className="sync-top">
            <span>SYNCUP · REALTIME PEER MESH</span>
            <span className="sync-pulse-dot" />
          </div>
          <div className="sync-mesh-view">
            <div className="sync-center-hub">HUB</div>
            <div className="sync-peer-node p1">REP 1</div>
            <div className="sync-peer-node p2">REP 2</div>
            <div className="sync-peer-node p3">REP 3</div>
          </div>
          <div className="sync-foot">
            <small>INSTANT COHORT BROADCASTS</small>
          </div>
        </div>
      )}

      {visual === "result" && (
        <div className="result-art glass-panel">
          <div className="result-top">
            <span>DIU PORTAL ANALYTICS</span>
            <span className="result-gpa-tag">3.93 GPA</span>
          </div>
          <div className="result-bars-preview">
            <div className="bar-col"><span style={{ height: "92%" }} /><small>F23</small></div>
            <div className="bar-col"><span style={{ height: "88%" }} /><small>S24</small></div>
            <div className="bar-col peak"><span style={{ height: "96%" }} /><small>F24</small></div>
            <div className="bar-col"><span style={{ height: "90%" }} /><small>S25</small></div>
            <div className="bar-col"><span style={{ height: "95%" }} /><small>F25</small></div>
          </div>
          <div className="result-foot">
            <small>AUTHENTICATED PORTAL INGESTION</small>
          </div>
        </div>
      )}

      {visual === "spend" && (
        <div className="spend-art glass-panel">
          <div className="spend-top">
            <span>ONESPENDER ENCRYPTED LEDGER</span>
            <span className="spend-currency">BDT / USD</span>
          </div>
          <div className="spend-donut-sim">
            <div className="spend-circle-ring" />
            <div className="spend-stat-center">
              <b>78%</b>
              <small>SAVED</small>
            </div>
          </div>
          <div className="spend-foot">
            <small>ZERO CLOUD LEAK · LOCAL DATASTORE</small>
          </div>
        </div>
      )}

      {visual === "utility" && (
        <div className="utility-art glass-panel">
          <div className="utility-top">
            <span>NAPTRAP SMART GEOFENCE</span>
            <span className="dot-neon cyan" />
          </div>
          <div className="utility-radar">
            <div className="utility-circle outer" />
            <div className="utility-circle inner" />
            <div className="utility-marker-pin" />
          </div>
          <div className="utility-foot">
            <small>GPS TRANSIT WAKE-UP ALARM</small>
          </div>
        </div>
      )}
    </div>
  );
}
