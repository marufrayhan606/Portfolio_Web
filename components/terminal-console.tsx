"use client";

import { useState, useRef, useEffect } from "react";
import { TerminalIcon, SparklesIcon, CheckIcon } from "@/components/icons";
import { profile, projects, statsMetrics } from "@/data/portfolio";

export function TerminalConsole() {
  const [history, setHistory] = useState<
    Array<{ command: string; output: string | React.ReactNode }>
  >([
    {
      command: "whoami",
      output: (
        <div className="terminal-resp">
          <p className="terminal-accent">{profile.name} — {profile.role}</p>
          <p>{profile.institution} · {profile.degree}</p>
          <p className="terminal-muted">{profile.bio}</p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState<string>("");
  const endRef = useRef<HTMLDivElement>(null);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let resp: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        resp = (
          <div className="terminal-resp">
            <p>Available commands:</p>
            <p>  <span className="terminal-kw">whoami</span>    - Developer profile & bio</p>
            <p>  <span className="terminal-kw">skills</span>    - Core technical stack</p>
            <p>  <span className="terminal-kw">projects</span>  - Flagship software projects</p>
            <p>  <span className="terminal-kw">stats</span>     - Academic GPA & milestones</p>
            <p>  <span className="terminal-kw">contact</span>   - Reach out via GitHub / LinkedIn</p>
            <p>  <span className="terminal-kw">clear</span>     - Wipe terminal output</p>
          </div>
        );
        break;
      case "whoami":
        resp = (
          <div className="terminal-resp">
            <p className="terminal-accent">{profile.name}</p>
            <p>{profile.role} · {profile.location}</p>
            <p className="terminal-muted">{profile.bio}</p>
          </div>
        );
        break;
      case "skills":
        resp = (
          <div className="terminal-resp">
            <p className="terminal-accent">&#9658; Android: Kotlin, Jetpack Compose, MVVM, Clean Arch, Hilt, Room, Retrofit</p>
            <p className="terminal-cyan">&#9658; AI & Data: Python, PyTorch, scikit-learn, Pandas, NumPy, Agents</p>
            <p className="terminal-violet">&#9658; Backend: FastAPI, Spring Boot, MySQL, MongoDB</p>
          </div>
        );
        break;
      case "projects":
        resp = (
          <div className="terminal-resp">
            {projects.slice(0, 4).map((p) => (
              <p key={p.slug}>
                <span className="terminal-kw">&#9670; {p.name}:</span> {p.summary}
              </p>
            ))}
          </div>
        );
        break;
      case "stats":
        resp = (
          <div className="terminal-resp">
            {statsMetrics.map((s) => (
              <p key={s.label}>
                <span className="terminal-accent">{s.label}:</span> <b>{s.value}</b> ({s.sub})
              </p>
            ))}
          </div>
        );
        break;
      case "contact":
        resp = (
          <div className="terminal-resp">
            <p>Email: <a href={`mailto:${profile.email}`} className="terminal-link">{profile.email}</a></p>
            <p>GitHub: <a href="https://github.com/marufrayhan606" target="_blank" rel="noreferrer" className="terminal-link">github.com/marufrayhan606</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/marufrayhan606" target="_blank" rel="noreferrer" className="terminal-link">linkedin.com/in/marufrayhan606</a></p>
            <p>Facebook: <a href="https://www.facebook.com/marufrayhan606/" target="_blank" rel="noreferrer" className="terminal-link">facebook.com/marufrayhan606</a></p>
            <p>Instagram: <a href="https://www.instagram.com/marufrayhan606/" target="_blank" rel="noreferrer" className="terminal-link">instagram.com/marufrayhan606</a></p>
            <p>Discord: <a href="https://discord.com/users/756564894073094285" target="_blank" rel="noreferrer" className="terminal-link">discord.com/users/756564894073094285</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        resp = (
          <p className="terminal-error">
            Command not found: &ldquo;{trimmed}&rdquo;. Type <span className="terminal-kw">help</span> to view commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: resp }]);
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
  };

  const bodyRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (bodyRef.current) {
      bodyRef.current.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  return (
    <div className="glass-terminal-wrapper glass-panel reveal-on-scroll">
      <div className="terminal-chrome">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-title">
          <TerminalIcon className="terminal-icon-head" />
          <span>maruf@dev-station:~ (zsh)</span>
        </div>
        <div className="terminal-tags">
          <SparklesIcon className="terminal-tag-sparkle" />
          <span>INTERACTIVE SHELL</span>
        </div>
      </div>

      <div className="terminal-quick-chips">
        <span className="quick-label">Suggested:</span>
        {["help", "whoami", "skills", "projects", "stats", "contact", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="terminal-chip"
            onClick={() => executeCommand(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {history.map((item, idx) => (
          <div className="terminal-entry" key={idx}>
            <div className="terminal-prompt-line">
              <span className="terminal-ps1">maruf@diu:~$</span>
              <span className="terminal-typed-cmd">{item.command}</span>
            </div>
            <div className="terminal-output-block">{item.output}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="terminal-input-bar" onSubmit={handleSubmit}>
        <span className="terminal-ps1">maruf@diu:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'help' or click buttons above..."
          className="terminal-input"
          aria-label="Terminal input"
        />
        <button type="submit" className="terminal-exec-btn">Run</button>
      </form>
    </div>
  );
}
