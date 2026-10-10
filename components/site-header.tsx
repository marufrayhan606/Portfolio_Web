"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Maruf Rayhan, home">
        <span className="wordmark-mark">mr.</span>
        <span>MARUF RAYHAN<small>ANDROID · DATA</small></span>
      </Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}{open ? <CloseIcon/> : <MenuIcon/>}
      </button>
      <nav id="site-navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Main navigation">
        <Link className={pathname === "/" ? "active" : ""} aria-current={pathname === "/" ? "page" : undefined} href="/" onClick={() => setOpen(false)}>Home</Link>
        {links.map((link) => <Link className={pathname.startsWith(link.href) ? "active" : ""} aria-current={pathname.startsWith(link.href) ? "page" : undefined} key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <a className="nav-contact" href="/#contact" onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></a>
        <ThemeToggle/>
      </nav>
    </header>
  );
}
