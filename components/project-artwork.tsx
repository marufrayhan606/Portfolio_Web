import type { Project } from "@/data/portfolio";

export function ProjectArtwork({ visual }: { visual: Project["visual"] }) {
  return (
    <div className={`project-art art-${visual}`} aria-hidden="true">
      {/* 1. DIU Campus Schedule */}
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

      {/* 2. NapTrap Smart Transit Geofencing */}
      {visual === "naptrap" && (
        <div className="utility-art glass-panel">
          <div className="utility-top">
            <span>NAPTRAP GEOFENCE RADAR</span>
            <span className="dot-neon green" />
          </div>
          <div className="utility-radar">
            <div className="utility-circle outer" />
            <div className="utility-circle inner" />
            <div className="utility-marker-pin" />
          </div>
          <div className="signal-pipeline-display" style={{ margin: "10px 0" }}>
            <span className="pipe-box">GPS WORKER</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box active">RADIUS &lt; 800M</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box">WAKE ALARM</span>
          </div>
          <div className="utility-foot">
            <small>OSMDROID · TARGET SDK 36</small>
          </div>
        </div>
      )}

      {/* 3. CityPharma Full-Stack */}
      {visual === "pharma" && (
        <div className="signal-board glass-panel">
          <div className="signal-top">
            <span className="signal-label">CITYPHARMA FULL-STACK</span>
            <span className="signal-secure-badge">JWT AUTH</span>
          </div>
          <div className="signal-pipeline-display" style={{ margin: "14px 0" }}>
            <span className="pipe-box">REACT 19</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box active">FASTAPI REST</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box">MYSQL 8.0</span>
          </div>
          <div className="board-rows" style={{ margin: "8px 0" }}>
            <div className="board-row">
              <span className="dot-neon green" />
              <div className="board-row-text">
                <strong>Inventory Stock Audit</strong>
                <small>Sub-20ms latency · OpenAPI docs</small>
              </div>
              <span className="row-code">200 OK</span>
            </div>
          </div>
          <div className="signal-footer">
            <span>ROLE: MANAGER &amp; STAFF</span>
            <span className="signal-shield-ok">SQLAlchemy ORM</span>
          </div>
        </div>
      )}

      {/* 4. CivicFeed */}
      {visual === "civic" && (
        <div className="sync-art glass-panel">
          <div className="sync-top">
            <span>CIVICFEED COMMUNITY HUB</span>
            <span className="sync-pulse-dot" />
          </div>
          <div className="sync-mesh-view">
            <div className="sync-center-hub">FIREBASE</div>
            <div className="sync-peer-node p1">ZONE 1</div>
            <div className="sync-peer-node p2">ZONE 2</div>
            <div className="sync-peer-node p3">ZONE 3</div>
          </div>
          <div className="sync-foot">
            <small>REAL-TIME MUNICIPAL RESOLUTIONS</small>
          </div>
        </div>
      )}

      {/* 5. TrafficFlow EDQN Research Paper */}
      {visual === "traffic" && (
        <div className="signal-board glass-panel">
          <div className="signal-top">
            <span className="signal-label">TRAFFICFLOW EDQN RESEARCH</span>
            <span className="signal-secure-badge">DUELING DQN</span>
          </div>
          <div className="signal-wave-grid">
            {[45, 80, 100, 35, 90, 65, 85, 100, 50, 75, 95, 40, 85, 100, 60, 90].map((h, i) => (
              <span
                key={i}
                className="wave-bar"
                style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <div className="signal-pipeline-display">
            <span className="pipe-box">12-CH STATE</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box active">V(s) + A(s,a)</span>
            <span className="pipe-arrow">&rarr;</span>
            <span className="pipe-box">Q-ACTION</span>
          </div>
          <div className="signal-footer">
            <span>PYTORCH 2.5 · CUDA 11.8</span>
            <span className="signal-shield-ok">+2.3x REWARD GAIN</span>
          </div>
        </div>
      )}

      {/* 6. NDSS Data Hackathon 2026 */}
      {visual === "hackathon" && (
        <div className="terrain-board glass-panel">
          <div className="terrain-top">
            <span className="terrain-label">NDSS 2026 DATA HACKATHON</span>
            <span className="terrain-badge">6TH PLACE</span>
          </div>
          <div className="terrain-visual-mesh">
            <div className="terrain-grid-lines" />
            <div className="radar-sweep-cone" />
            <div className="terrain-contour c1" />
            <div className="terrain-contour c2" />
            <div className="mars-beacon-dot" />
          </div>
          <div className="terrain-footer">
            <span>STARSHIP TELEMETRY PREDICTION</span>
            <span>72.0% PRECISION</span>
          </div>
        </div>
      )}

      {/* 7. Blood Bank Management System */}
      {visual === "bloodbank" && (
        <div className="result-art glass-panel">
          <div className="result-top">
            <span>BLOOD BANK AUDITING</span>
            <span className="result-gpa-tag">JAVA 11</span>
          </div>
          <div className="result-bars-preview">
            <div className="bar-col"><span style={{ height: "92%" }} /><small>A+</small></div>
            <div className="bar-col"><span style={{ height: "78%" }} /><small>B+</small></div>
            <div className="bar-col peak"><span style={{ height: "96%" }} /><small>O+</small></div>
            <div className="bar-col"><span style={{ height: "65%" }} /><small>AB+</small></div>
            <div className="bar-col"><span style={{ height: "84%" }} /><small>O-</small></div>
          </div>
          <div className="result-foot">
            <small>FLATLAF MODERN UI · JFREECHART</small>
          </div>
        </div>
      )}

      {/* 8. Al-Quran */}
      {visual === "quran" && (
        <div className="scribe-art glass-panel">
          <div className="scribe-top">
            <span>AL-QURAN DIGITAL APP</span>
            <span className="dot-neon green" />
          </div>
          <div className="scribe-body">
            <div className="scribe-pill-cloud">
              <span>Compose M3</span>
              <span>Media3</span>
              <span>Room DB</span>
              <span>Hilt DI</span>
            </div>
            <div className="scribe-waveform">
              <span className="line-flow" />
            </div>
          </div>
          <div className="scribe-foot">
            <small>EXOPLAYER RECITATION STREAMING</small>
          </div>
        </div>
      )}

      {/* 9. FarmAssist or Default */}
      {visual === "farmassist" && (
        <div className="spend-art glass-panel">
          <div className="spend-top">
            <span>FARMASSIST PLANNER</span>
            <span className="spend-currency">C++ OOP</span>
          </div>
          <div className="spend-donut-sim">
            <div className="spend-circle-ring" />
            <div className="spend-stat-center">
              <b>OOP</b>
              <small>CLI</small>
            </div>
          </div>
          <div className="spend-foot">
            <small>CROP YIELD &amp; INVENTORY CALC</small>
          </div>
        </div>
      )}
    </div>
  );
}

