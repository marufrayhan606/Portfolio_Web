import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { SemesterLineChart } from "@/components/semester-line-chart";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import { achievements, profile, skills } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About — Md. Maruf Rayhan",
  description: "Android development, data science learning, education, semester results, and competition record.",
};

export default function AboutPage() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a><SiteHeader/>
    <main id="main" className="about-page">
      <section className="about-intro container reveal-on-scroll">
        <div className="about-intro-copy"><p className="eyebrow eyebrow-accent"><span className="section-index">ABOUT</span> THE PERSON BEHIND THE PROJECTS</p><h1>Software engineering.<br/><em>Still asking questions.</em></h1><p>{profile.bio}</p><div className="about-links">{profile.socials.map((social)=><a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}<span aria-hidden="true">↗</span></a>)}</div></div>
        <figure className="about-photo"><Image src="/images/maruf-rayhan.jpg" alt="Maruf Rayhan at Daffodil International University" fill sizes="(max-width: 700px) 85vw, 38vw"/><figcaption>DAFFODIL INTERNATIONAL UNIVERSITY <span>· DHAKA</span></figcaption></figure>
      </section>

      <section className="toolkit-section"><div className="container"><div className="section-head section-head-editorial reveal-on-scroll"><div><p className="eyebrow eyebrow-accent"><span className="section-index">01</span> WHAT I USE & STUDY</p><h2>A toolkit in <em>progress.</em></h2></div><p className="toolkit-note">Grouped by practice. Tools are listed without proficiency ratings.</p></div>
        <div className="toolkit-editorial-grid">{skills.map((skill,index)=><article className="toolkit-group reveal-on-scroll" style={{"--reveal-index": index} as CSSProperties} key={skill.group}><span className="toolkit-group-number">0{index+1}</span><div><h3>{skill.group}</h3><ul>{skill.items.map((item)=><li key={item}><TechMark compact name={item}/></li>)}</ul></div></article>)}</div>
      </div></section>

      <section className="record-page-section container"><div className="section-head section-head-editorial reveal-on-scroll"><div><p className="eyebrow eyebrow-accent"><span className="section-index">02</span> EDUCATION / RESULTS</p><h2>Semester by <em>semester.</em></h2></div><p className="education-label">DAFFODIL INTERNATIONAL UNIVERSITY<br/><b>B.Sc. Software Engineering · Major in Data Science</b></p></div>
        <SemesterLineChart/>
      </section>

      <section className="achievement-section"><div className="container"><div className="section-head section-head-editorial reveal-on-scroll"><div><p className="eyebrow eyebrow-accent"><span className="section-index">03</span> COMPETITIONS & PRESENTATIONS</p><h2>Showing up to <em>learn.</em></h2></div><p className="achievement-key">Placements and participation are labeled separately.</p></div>
        <div className="achievement-list">{achievements.map((item,index)=><article className="achievement-row reveal-on-scroll" style={{"--reveal-index": index} as CSSProperties} key={`${item.event}-${item.detail}`}><span className="achievement-number">0{index+1}</span><div className="achievement-copy"><time>{item.year || "YEAR NOT SUPPLIED"}</time><h3>{item.event}</h3><p>{item.detail}</p></div><span className={`achievement-type ${item.type}`}>{item.type === "placement" ? "PLACEMENT" : "PARTICIPATION"}</span></article>)}</div>
      </div></section>

      <section className="about-cta container reveal-on-scroll"><div><p className="eyebrow eyebrow-accent">NEXT UP</p><h2>Take a look at the <em>work.</em></h2></div><Link className="button button-primary" href="/work">Browse projects <ArrowIcon/></Link></section>
    </main><SiteFooter/>
  </>;
}
