"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalApp() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-2 text-cyan-400">
          <p className="font-bold">Welcome to SHAHRIAR.OS v4.2 Command Interface.</p>
          <p className="text-slate-300 text-xs">
            Type <span className="text-cyan-300 font-semibold underline">help</span> to list available commands.
            Try typing <span className="text-amber-300 font-semibold">sudo hire-me</span> or <span className="text-emerald-300 font-semibold">matrix</span>.
          </p>
        </div>
      )
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isMatrixActive]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playKeystroke();
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.split(" ");
    const primary = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    let resultNode: React.ReactNode = null;

    switch (primary) {
      case "help":
        resultNode = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-cyan-300">whoami</span> - Identity & core philosophy</div>
              <div><span className="text-cyan-300">projects</span> - View indexed case studies</div>
              <div><span className="text-cyan-300">skills</span> - Design & Engineering matrix</div>
              <div><span className="text-cyan-300">experience</span> - Career journey & timeline</div>
              <div><span className="text-cyan-300">contact</span> - Secure dispatch info</div>
              <div><span className="text-cyan-300">neofetch</span> - System specs & ASCII badge</div>
              <div><span className="text-emerald-300">matrix</span> - Toggle digital rain mode</div>
              <div><span className="text-amber-300">sudo hire-me</span> - Run recruitment protocol</div>
              <div><span className="text-cyan-300">clear</span> - Clear terminal screen</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-cyan-400 font-bold">{profileData.name} — {profileData.role}</p>
            <p className="text-slate-400 leading-relaxed">{profileData.subTitle}</p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1 mt-2">
              <p><span className="text-slate-500">LOCATION:</span> {profileData.location}</p>
              <p><span className="text-slate-500">STATUS:</span> <span className="text-emerald-400">{profileData.status}</span></p>
              <p><span className="text-slate-500">AVAILABILITY:</span> {profileData.availability}</p>
            </div>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold">INDEXED CASE STUDIES ({projectsData.length}):</p>
            <div className="space-y-1.5">
              {projectsData.map((p, idx) => (
                <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-semibold">[{idx + 1}] {p.title}</span>
                    <span className="text-[10px] text-slate-500">{p.category}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">{p.tagline}</p>
                  <p className="text-slate-500 text-[10px] mt-1">Tech: {p.techStack.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">SKILLS ARCHITECTURE:</p>
            <div className="space-y-2">
              <div>
                <p className="text-purple-400 font-semibold">PRODUCT DESIGN & SYSTEMS:</p>
                <p className="text-slate-400">Design Systems (96%), Micro-Interactions (94%), User Research (90%), Spatial/VisionOS UI (86%)</p>
              </div>
              <div>
                <p className="text-cyan-400 font-semibold">CREATIVE TECH & FRONTEND:</p>
                <p className="text-slate-400">React/Next.js (95%), Tailwind CSS (98%), Three.js/WebGL (84%), Web Audio API (82%)</p>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">AI & WORKFLOW:</p>
                <p className="text-slate-400">Figma Ecosystem (98%), Generative AI UX (91%), CI/CD & Git (89%)</p>
              </div>
            </div>
          </div>
        );
        break;

      case "experience":
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">CAREER TIMELINE:</p>
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="p-2 bg-slate-900/60 rounded border border-slate-800">
                <div className="flex justify-between text-cyan-300">
                  <span className="font-semibold">{exp.role}</span>
                  <span className="text-slate-500 text-[10px]">{exp.year}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{exp.company}</p>
                <p className="text-slate-300 text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">SECURE COMMS DIRECTORY:</p>
            <p>Email: <span className="text-cyan-300">contact@shahriarhossain.com</span></p>
            <p>GitHub: <span className="text-cyan-300">https://github.com/shahriarhossain</span></p>
            <p>LinkedIn: <span className="text-cyan-300">https://linkedin.com/in/shahriarhossain</span></p>
            <p>Twitter: <span className="text-cyan-300">@shahriar_design</span></p>
          </div>
        );
        break;

      case "neofetch":
      case "shahriar-fetch":
        resultNode = (
          <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono text-cyan-400 py-1">
            <pre className="text-[10px] leading-tight text-cyan-300 font-bold select-none">
{`   _____ __  _____    __  ______  _____ ___    ____ 
  / ___// / / /   |  / / / / __ \\/  _/   |  / __ \\
  \\__ \\/ /_/ / /| | / /_/ / /_/ // // /| | / /_/ /
 ___/ / __  / ___ |/ __  / _, _// // ___ |/ _, _/ 
/____/_/ /_/_/  |_/_/ /_/_/ |_/___/_/  |_/_/ |_|  `}
            </pre>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <p><span className="text-cyan-400 font-bold">OS:</span> SHAHRIAR.OS v4.2 x86_64</p>
              <p><span className="text-cyan-400 font-bold">Host:</span> Creative Technologist Workstation</p>
              <p><span className="text-cyan-400 font-bold">Role:</span> Product Designer & Creative Technologist</p>
              <p><span className="text-cyan-400 font-bold">Uptime:</span> 99.98% High-Velocity Focus</p>
              <p><span className="text-cyan-400 font-bold">Shell:</span> zsh 5.9 (x86_64-apple-darwin)</p>
              <p><span className="text-cyan-400 font-bold">Memory:</span> 64GB Unified Creative Memory</p>
              <p className="pt-1 flex gap-1">
                <span className="w-3 h-3 bg-red-500 inline-block rounded-xs" />
                <span className="w-3 h-3 bg-green-500 inline-block rounded-xs" />
                <span className="w-3 h-3 bg-yellow-500 inline-block rounded-xs" />
                <span className="w-3 h-3 bg-blue-500 inline-block rounded-xs" />
                <span className="w-3 h-3 bg-purple-500 inline-block rounded-xs" />
                <span className="w-3 h-3 bg-cyan-500 inline-block rounded-xs" />
              </p>
            </div>
          </div>
        );
        break;

      case "matrix":
        setIsMatrixActive((prev) => !prev);
        sound.playNotification();
        resultNode = (
          <p className="text-emerald-400 text-xs font-mono">
            Matrix simulation toggled: {!isMatrixActive ? "ONLINE" : "OFFLINE"}.
          </p>
        );
        break;

      case "sudo":
        if (arg === "hire-me" || arg === "hire") {
          sound.playSuccess();
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
          resultNode = (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-lg text-xs font-mono text-emerald-300 space-y-1.5 animate-pulse">
              <p className="font-bold text-sm">🎉 ACCESS GRANTED: RECRUITMENT PROTOCOL UNLOCKED!</p>
              <p>Shahriar is currently open for high-impact Product Design & Creative Technology positions.</p>
              <p className="text-white">Email: contact@shahriarhossain.com // Or click &apos;Hire Me&apos; on the top bar!</p>
            </div>
          );
        } else {
          resultNode = (
            <p className="text-rose-400 text-xs font-mono">
              sudo: {arg}: command not found. Try &apos;sudo hire-me&apos;.
            </p>
          );
        }
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        resultNode = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: {cmd}. Type <span className="text-cyan-300 underline">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: resultNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeystroke();
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full flex flex-col p-4 font-mono text-xs overflow-y-auto cursor-text bg-slate-950/90 text-slate-200 select-text relative"
    >
      {/* Matrix Mode Canvas if active */}
      {isMatrixActive && (
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden font-mono text-[10px] text-emerald-400 select-none">
          <div className="animate-pulse">
            010101010010101010101010010101010101010010101010101010010101010101010010101010101010010101
          </div>
        </div>
      )}

      {/* Terminal History */}
      <div className="space-y-4 flex-1">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyan-400 font-bold">shahriar@nexus-os:~$</span>
              <span className="text-slate-100">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Active Prompt Input */}
      <div className="flex items-center space-x-2 mt-4 pt-2 border-t border-slate-800">
        <span className="text-cyan-400 font-bold shrink-0">shahriar@nexus-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent outline-none text-slate-100 font-mono caret-cyan-400"
          placeholder="type 'help'..."
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

