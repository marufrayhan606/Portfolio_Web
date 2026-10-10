"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("maruf-theme");
    } catch {
      // Storage unavailable
    }
    const nextTheme: Theme =
      saved === "light" || saved === "dark"
        ? (saved as Theme)
        : "dark"; // Default to dark obsidian glass for 2026 aesthetic

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("maruf-theme", nextTheme);
    } catch {
      // Storage unavailable
    }
    setTheme(nextTheme);
  }

  return (
    <button
      className="theme-toggle glass-panel"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
