import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { Hero3D } from "@/components/hero-3d";
import { ProjectArtwork } from "@/components/project-artwork";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMark } from "@/components/tech-mark";
import { profile, projects } from "@/data/portfolio";

const socialIcons = { GitHub: GithubIcon, LinkedIn: LinkedinIcon };
const featured = projects.filter((project) => project.featured);
const tools = ["Android", "Kotlin", "Jetpack Compose", "Python", "NumPy", "Pandas", "PyTorch"];

export default function Home() {
  const [leadProject, ...otherProjects] = featured;

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <section className="home-hero container" id="top" aria-labelledby="home-title">
        <div className="home-copy">
          <p className="eyebrow hero-eyebrow"><span className="availability-dot"/> SOFTWARE ENGINEERING · DHAKA, BANGLADESH</p>
          <h1 id="home-title">Android first.<br/><em>Data in progress.</em></h1>
          <p className="hero-description">I’m {profile.name}, a Software Engineering student at Daffodil International University. I build Android apps and am growing my foundation in data science and machine learning.</p>
          <div className="hero-ctas"><Link className="button button-primary" href="/work">Explore selected work <ArrowIcon/></Link><Link className="button button-text" href="/about">A little more about me <span aria-hidden="true">↗</span></Link></div>
          <div className="hero-socials">{profile.socials.map((social) => { const Icon = socialIcons[social.label as keyof typeof socialIcons]; return <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{Icon && <Icon/>}{social.label}<ArrowIcon className="social-arrow"/></a>; })}</div>
        </div>
        <div className="hero-visual" role="group" aria-label="Portrait of Maruf Rayhan beside a three-dimensional Android interface">
          <figure className="portrait-glass-frame">
            <Image src="/images/maruf-rayhan.jpg" alt="Maruf Rayhan at Daffodil International University" fill priority sizes="(max-width: 700px) 86vw, 35vw"/>
            <figcaption className="portrait-glass-caption"><span>DAFFODIL INTERNATIONAL UNIVERSITY</span><span>DHAKA · BANGLADESH</span></figcaption>
          </figure>
          <Hero3D/>
          <span className="hero-visual-index" aria-hidden="true">01 / ANDROID</span>
        </div>
      </section>

      <section className="toolkit-strip container" aria-labelledby="toolkit-strip-title">
        <div className="toolkit-strip-heading"><span className="section-index">01</span><h2 id="toolkit-strip-title">Tools I use & study</h2><p>Building with Android · learning data</p></div>
        <div className="toolkit-strip-logos">{tools.map((tool) => <TechMark name={tool} key={tool}/>)}</div>
      </section>

      <section className="selected-work-section" id="work" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head-editorial reveal-on-scroll"><div><p className="eyebrow eyebrow-accent"><span className="section-index">02</span> SELECTED WORK</p><h2 id="work-title">Campus life. On-device ML.<br/><em>Mission support.</em></h2></div><Link className="arrow-link" href="/work">All projects <ArrowIcon/></Link></div>
          {leadProject && <article className="featured-project reveal-on-scroll" id={leadProject.slug}>
            <Link className="featured-project-art" href={`/work#${leadProject.slug}`} aria-label={`Explore ${leadProject.name}`} data-cursor="OPEN"><ProjectArtwork visual={leadProject.visual}/><span className="artwork-caption">01 / ACADEMIC LIFE</span></Link>
            <div className="featured-project-copy"><p className="eyebrow eyebrow-accent">{leadProject.category}</p><h3>{leadProject.name}</h3><p>{leadProject.summary}</p><div className="technology-tags">{leadProject.technology?.map((item) => <TechMark compact name={item} key={item}/>)}</div><Link className="project-link" href={`/work#${leadProject.slug}`}>Read the project story <ArrowIcon/></Link></div>
          </article>}
          <div className="project-index-list">{otherProjects.map((project, index) => <article className="project-index-row reveal-on-scroll" key={project.slug}>
            <span className="project-index-number">0{index + 2}</span><div className="project-index-copy"><p className="eyebrow eyebrow-accent">{project.category}</p><h3>{project.name}</h3><p>{project.summary}</p></div><div className="project-index-art"><ProjectArtwork visual={project.visual}/></div><Link className="project-index-link" href={`/work#${project.slug}`} aria-label={`Explore ${project.name}`} data-cursor="OPEN"><ArrowIcon/></Link>
          </article>)}</div>
        </div>
      </section>

      <section className="practice-section" aria-labelledby="practice-title">
        <div className="container practice-layout"><div className="practice-intro reveal-on-scroll"><p className="eyebrow"><span className="section-index">03</span> CURRENT DIRECTION</p><h2 id="practice-title">I build for a screen.<br/><em>I’m learning from data.</em></h2><p>Android development is my main practice. Data science and machine learning are the next layer I’m working to understand, one project and one semester at a time.</p><Link className="text-arrow" href="/about">See what I’m learning <ArrowIcon/></Link></div>
          <div className="practice-path reveal-on-scroll"><div className="practice-stop practice-stop-active"><span>01</span><div><b>BUILD</b><strong>Android</strong><p>Kotlin · Jetpack Compose</p></div><TechMark name="Android" compact/></div><div className="practice-connector"><i/><span>IN PROGRESS</span></div><div className="practice-stop"><span>02</span><div><b>LEARN</b><strong>Data science & ML</strong><p>Python · models · experimentation</p></div><TechMark name="Python" compact/></div><svg className="practice-trace" viewBox="0 0 180 280" fill="none" aria-hidden="true"><path d="M20 10v78c0 38 140 33 140 68s-140 30-140 68v46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7"/><circle cx="20" cy="10" r="4" fill="currentColor"/><circle cx="20" cy="270" r="4" fill="currentColor"/></svg></div>
        </div>
      </section>

      <section className="home-contact container reveal-on-scroll" id="contact"><div className="contact-rule"/><p className="eyebrow eyebrow-accent">OPEN TO GOOD CONVERSATIONS</p><div className="contact-row"><h2>Have a project<br/><em>in mind?</em></h2><div className="contact-side"><p>Find me through my professional profiles.</p><div className="social-row">{profile.socials.map((social) => { const Icon = socialIcons[social.label as keyof typeof socialIcons]; return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>{Icon && <Icon/>}<ArrowIcon className="social-arrow"/></a>; })}</div><Link className="contact-cta" href="/about">Read my background <ArrowIcon/></Link></div></div></section>
    </main>
    <SiteFooter />
  </>;
}
