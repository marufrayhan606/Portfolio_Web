import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

const socialIcons = { GitHub: GithubIcon, LinkedIn: LinkedinIcon };

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><Link className="footer-name" href="/">maruf<span>.</span></Link><p>Android developer<br/>learning data science & ML.</p><div className="footer-links">{profile.socials.map((social) => { const Icon = socialIcons[social.label as keyof typeof socialIcons]; return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>{Icon && <Icon/>}</a>; })}</div></div><div className="footer-bottom"><span>BASED IN {profile.location.toUpperCase()}</span><span>© {new Date().getFullYear()} MD. MARUF RAYHAN</span><Link href="#top">BACK TO TOP ↑</Link></div></footer>;
}
