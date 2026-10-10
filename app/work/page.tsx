import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProjectArtwork } from "@/components/project-artwork";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Work — Md. Maruf Rayhan",
  description: "Android apps, applied machine learning, and other software projects by Md. Maruf Rayhan.",
};

export default function WorkPage() {
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);
  return <>
    <a className="skip-link" href="#main">Skip to content</a><SiteHeader/>
    <main id="main" className="work-page container">
      <section className="page-intro reveal-on-scroll">
        <p className="eyebrow eyebrow-accent"><span className="section-index">WORK</span> PROJECTS / SELECTED AND SECONDARY</p>
        <h1>Android at the center.<br/><em>Other questions around it.</em></h1>
        <p className="page-lede">A campus companion, on-device machine learning, and an interactive mission-support platform—alongside smaller tools and experiments.</p>
        <div className="page-intro-foot"><span>ANDROID DEVELOPMENT</span><i/><span>DATA SCIENCE · ML</span></div>
      </section>

      <section className="project-stories" aria-label="Selected projects">
        {featured.map((project,index) => <article className={`project-story story-${project.visual} reveal-on-scroll`} style={{"--reveal-index": index} as CSSProperties} id={project.slug} key={project.slug}>
          <div className="story-visual"><ProjectArtwork visual={project.visual}/><span className="story-index">0{index+1}<i> / {String(featured.length).padStart(2,"0")}</i></span></div>
          <div className="story-copy"><p className="eyebrow eyebrow-accent">{project.category}</p><h2>{project.name}</h2><p>{project.summary}</p>{project.technology && <div className="technology-tags" aria-label="Known technology and topic tags">{project.technology.map((item)=><TechMark compact name={item} key={item}/>)}</div>}<Link className="project-link" href={`/#work`}>Back to selected work <ArrowIcon/></Link></div>
        </article>)}
      </section>

      <section className="other-projects"><div className="section-head section-head-editorial reveal-on-scroll"><div><p className="eyebrow eyebrow-accent"><span className="section-index">02</span> ALSO IN THE MIX</p><h2>More things I’ve <em>built.</em></h2></div><span className="other-count">{String(additional.length).padStart(2,"0")} PROJECTS</span></div>
        <div className="other-project-grid">{additional.map((project,index)=><article className="other-project reveal-on-scroll" style={{"--reveal-index": index} as CSSProperties} id={project.slug} key={project.slug}><span className="other-project-number">0{index+1}</span><div className="other-art"><ProjectArtwork visual={project.visual}/></div><div className="other-copy"><span>{project.category}</span><h3>{project.name}</h3><p>{project.summary}</p></div></article>)}</div>
      </section>
      <section className="work-end"><span>MORE ABOUT THE PERSON BEHIND THE WORK</span><Link href="/about">Skills, education & background <b aria-hidden="true">↗</b></Link></section>
    </main><SiteFooter/>
  </>;
}
