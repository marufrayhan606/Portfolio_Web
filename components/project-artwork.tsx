import type { Project } from "@/data/portfolio";

export function ProjectArtwork({ visual }: { visual: Project["visual"] }) {
  return (
    <div className={`project-art art-${visual}`} aria-hidden="true">
      {visual === "schedule" && <div className="schedule-board"><div className="board-heading"><span>DIU CAMPUS</span><b>Today <i>⌄</i></b></div><div className="board-row"><i className="board-dot blue"/><span>Class routines</span><b>01</b></div><div className="board-row"><i className="board-dot violet"/><span>Exam schedules</span><b>02</b></div><div className="board-row"><i className="board-dot orange"/><span>Announcements</span><b>03</b></div><div className="board-footer"><span>ACADEMIC COMPANION</span><span>↗</span></div></div>}
      {visual === "sentinel" && <div className="signal-board"><span className="signal-label">ON-DEVICE PROTECTION</span><div className="signal-wave"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="signal-pipeline"><span>MESSAGE</span><b>→</b><span>ML</span><b>→</b><strong>FILTER</strong></div><span className="signal-caption">SCAM / SPAM · MACHINE LEARNING</span></div>}
      {visual === "mars" && <div className="terrain-board"><span className="terrain-label">FIELD MAP&nbsp; / &nbsp;MARS</span><div className="terrain-contours"><i/><i/><i/><i/><i/><b>+</b></div><div className="terrain-footer"><span>MISSION SUPPORT</span><span>INTERACTIVE</span></div></div>}
      {visual === "scribe" && <div className="scribe-art"><span className="scribe-orbit"/><b>Aa</b><i/><i/><i/><small>TEXT · LANGUAGE · TOOLS</small></div>}
      {visual === "sync" && <div className="sync-art"><div className="sync-ring">S</div><span className="sync-node n1">+</span><span className="sync-node n2">+</span><span className="sync-node n3">+</span><small>GROUPS / UPDATES</small></div>}
      {visual === "result" && <div className="result-art"><span>RESULTS</span><b>••••</b><i/><i/><i/><small>STUDENT PORTAL</small></div>}
      {visual === "spend" && <div className="spend-art"><span>EXPENSES</span><div><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><small>TRACKING / OVERVIEW</small></div>}
      {visual === "utility" && <div className="utility-art"><span>TOOLS</span><b>◌</b><i/><i/><small>PERSONAL UTILITY</small></div>}
    </div>
  );
}
