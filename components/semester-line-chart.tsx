import { semesters } from "@/data/portfolio";

const low = 3.8;
const high = 4;
const points = semesters.map((semester, index) => ({
  ...semester,
  x: (index / (semesters.length - 1)) * 1000,
  y: 18 + ((high - semester.score) / (high - low)) * 214,
}));
const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");

export function SemesterLineChart() {
  return <figure className="result-chart reveal-on-scroll" aria-labelledby="semester-results-heading">
    <figcaption className="chart-heading">
      <span id="semester-results-heading">SEMESTER RESULTS</span>
      <span>ZOOMED RANGE · 3.80 TO 4.00</span>
    </figcaption>
    <div className="line-chart-shell">
      <div className="line-y-axis" aria-hidden="true"><span>4.00</span><span>3.90</span><span>3.80</span></div>
      <div className="line-plot">
        <svg className="line-chart-svg" viewBox="0 0 1000 250" preserveAspectRatio="none" role="img" aria-labelledby="semester-chart-title semester-chart-description">
          <title id="semester-chart-title">Semester result line graph</title>
          <desc id="semester-chart-description">Eight supplied semester results from 3.88 to 3.96 on a zoomed 3.80 to 4.00 scale. These are individual semester results, not a cumulative CGPA.</desc>
          <path className="chart-grid-line" d="M0 18H1000 M0 125H1000 M0 232H1000" />
          <path className="chart-line" d={line} />
        </svg>
        {points.map((point) => <span className="line-point" key={point.fullTerm} style={{ left: `${point.x / 10}%`, top: `${(point.y / 250) * 100}%` }} aria-hidden="true" />)}
      </div>
    </div>
    <div className="line-chart-values" aria-label="Semester results">
      {semesters.map((semester, index) => <div className="line-chart-value" key={semester.fullTerm}>
        <span><i>{String(index + 1).padStart(2, "0")}</i>{semester.term}</span>
        <strong>{semester.score.toFixed(2)}</strong>
      </div>)}
    </div>
    <p className="chart-footnote">Individual semester results as supplied. The vertical axis is zoomed for readability; this is not a cumulative CGPA.</p>
  </figure>;
}
