"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Layers,
  Terminal,
  User,
  Sparkles,
  Send,
  Settings,
  X,
  ArrowRight
} from "lucide-react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { TopBar } from "@/components/os/TopBar";
import { Dock } from "@/components/os/Dock";
import { Window } from "@/components/os/Window";
import { DesktopIcon } from "@/components/os/DesktopIcon";
import { ParticleBackground } from "@/components/os/ParticleBackground";
import { CRTOverlay } from "@/components/os/CRTOverlay";
import { ContextMenu } from "@/components/os/ContextMenu";

import { ProjectExplorer } from "@/components/apps/ProjectExplorer";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { SkillsMatrix } from "@/components/apps/SkillsMatrix";
import { AboutMe } from "@/components/apps/AboutMe";
import { CreativeLab } from "@/components/apps/CreativeLab";
import { ContactApp } from "@/components/apps/ContactApp";
import { SettingsApp } from "@/components/apps/SettingsApp";
import { sound } from "@/lib/audio";

interface DesktopProps {
  onReplayIntro?: () => void;
}

export function Desktop({ onReplayIntro }: DesktopProps = {}) {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    bringToFront,
    updatePosition,
    updateSize
  } = useWindowManager();

  const [themeColor, setThemeColor] = useState<"cyan" | "violet" | "emerald" | "amber">("cyan");
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [showWelcomeWidget, setShowWelcomeWidget] = useState(true);

  // Context Menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({
    x: 0,
    y: 0,
    isOpen: false
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    // If clicking on desktop background, open context menu
    if ((e.target as HTMLElement).closest(".select-text") || (e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) {
      return;
    }
    e.preventDefault();
    sound.playClick();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true
    });
  };

  const handleResetLayout = () => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    updatePosition("projects", 100, 60);
    updateSize("projects", 880, 580);

    updatePosition("about", 80, 50);
    updateSize("about", 760, 540);

    updatePosition("terminal", 200, 100);
    updateSize("terminal", 740, 480);

    updatePosition("skills", 160, 80);
    updateSize("skills", 820, 540);

    updatePosition("creativeLab", 140, 75);
    updateSize("creativeLab", 840, 560);

    updatePosition("contact", 220, 95);
    updateSize("contact", 660, 520);
  };

  // Keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey) && !isNaN(Number(e.key))) {
        e.preventDefault();
        const map: Record<string, string> = {
          "1": "projects",
          "2": "skills",
          "3": "terminal",
          "4": "about",
          "5": "creativeLab",
          "6": "contact",
          "7": "settings"
        };
        const targetApp = map[e.key];
        if (targetApp) {
          openWindow(targetApp);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openWindow]);

  const activeAppTitle = windows[activeWindowId]?.title;

  return (
    <div
      onContextMenu={handleContextMenu}
      className="relative w-screen h-screen overflow-hidden bg-[#07090e] select-none text-slate-100 font-sans"
    >
      {/* Dynamic Animated Particles / Grid Backdrop */}
      <ParticleBackground themeColor={themeColor} />

      {/* CRT Scanline Shader Overlay */}
      <CRTOverlay enabled={crtEnabled} />

      {/* System Top Bar */}
      <TopBar
        themeColor={themeColor}
        onSelectTheme={setThemeColor}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        onOpenApp={openWindow}
        activeAppTitle={activeAppTitle}
        onReplayIntro={onReplayIntro}
      />

      {/* Desktop Workspace */}
      <main className="absolute inset-0 pt-10 pb-20 px-4 md:px-6 z-10 flex flex-col justify-between pointer-events-none">
        {/* Top-Left: Desktop Shortcuts Grid */}
        <div className="flex flex-col gap-2.5 items-start pointer-events-auto">
          <DesktopIcon
            id="projects"
            label="Case Studies"
            icon={Briefcase}
            badge="6"
            color="from-cyan-500 to-blue-600"
            onClick={() => openWindow("projects")}
          />
          <DesktopIcon
            id="skills"
            label="Skills.sys"
            icon={Layers}
            color="from-purple-500 to-indigo-600"
            onClick={() => openWindow("skills")}
          />
          <DesktopIcon
            id="terminal"
            label="Terminal.sh"
            icon={Terminal}
            badge="zsh"
            color="from-emerald-500 to-teal-600"
            onClick={() => openWindow("terminal")}
          />
          <DesktopIcon
            id="creativeLab"
            label="Creative Lab"
            icon={Sparkles}
            badge="GPU"
            color="from-amber-500 to-orange-600"
            onClick={() => openWindow("creativeLab")}
          />
          <DesktopIcon
            id="about"
            label="Shahriar.bio"
            icon={User}
            color="from-pink-500 to-rose-600"
            onClick={() => openWindow("about")}
          />
          <DesktopIcon
            id="contact"
            label="Contact.msg"
            icon={Send}
            color="from-blue-500 to-cyan-600"
            onClick={() => openWindow("contact")}
          />
        </div>

        {/* Bottom-Right Desktop Welcome HUD Card */}
        {showWelcomeWidget && (
          <div className="self-end pointer-events-auto max-w-sm rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 hidden md:block">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>SHAHRIAR HOSSAIN // WORKSTATION</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowWelcomeWidget(false);
                }}
                className="text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Product Designer & Creative Technologist crafting high-craft design systems, spatial interfaces, and multimodal AI tools.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Draggable floating OS</span>
              <button
                onClick={() => openWindow("projects")}
                className="flex items-center space-x-1 text-cyan-400 hover:underline"
              >
                <span>Browse Work</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Windows Layer */}
      <div className="relative z-20">
        {/* Projects App Window */}
        <Window
          windowState={windows.projects}
          isActive={activeWindowId === "projects"}
          onFocus={() => bringToFront("projects")}
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          onToggleMaximize={() => toggleMaximize("projects")}
          onUpdatePosition={(x, y) => updatePosition("projects", x, y)}
          onUpdateSize={(w, h) => updateSize("projects", w, h)}
        >
          <ProjectExplorer />
        </Window>

        {/* Skills Matrix App Window */}
        <Window
          windowState={windows.skills}
          isActive={activeWindowId === "skills"}
          onFocus={() => bringToFront("skills")}
          onClose={() => closeWindow("skills")}
          onMinimize={() => minimizeWindow("skills")}
          onToggleMaximize={() => toggleMaximize("skills")}
          onUpdatePosition={(x, y) => updatePosition("skills", x, y)}
          onUpdateSize={(w, h) => updateSize("skills", w, h)}
        >
          <SkillsMatrix />
        </Window>

        {/* Terminal App Window */}
        <Window
          windowState={windows.terminal}
          isActive={activeWindowId === "terminal"}
          onFocus={() => bringToFront("terminal")}
          onClose={() => closeWindow("terminal")}
          onMinimize={() => minimizeWindow("terminal")}
          onToggleMaximize={() => toggleMaximize("terminal")}
          onUpdatePosition={(x, y) => updatePosition("terminal", x, y)}
          onUpdateSize={(w, h) => updateSize("terminal", w, h)}
        >
          <TerminalApp />
        </Window>

        {/* About App Window */}
        <Window
          windowState={windows.about}
          isActive={activeWindowId === "about"}
          onFocus={() => bringToFront("about")}
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
          onToggleMaximize={() => toggleMaximize("about")}
          onUpdatePosition={(x, y) => updatePosition("about", x, y)}
          onUpdateSize={(w, h) => updateSize("about", w, h)}
        >
          <AboutMe />
        </Window>

        {/* Creative Lab App Window */}
        <Window
          windowState={windows.creativeLab}
          isActive={activeWindowId === "creativeLab"}
          onFocus={() => bringToFront("creativeLab")}
          onClose={() => closeWindow("creativeLab")}
          onMinimize={() => minimizeWindow("creativeLab")}
          onToggleMaximize={() => toggleMaximize("creativeLab")}
          onUpdatePosition={(x, y) => updatePosition("creativeLab", x, y)}
          onUpdateSize={(w, h) => updateSize("creativeLab", w, h)}
        >
          <CreativeLab />
        </Window>

        {/* Contact App Window */}
        <Window
          windowState={windows.contact}
          isActive={activeWindowId === "contact"}
          onFocus={() => bringToFront("contact")}
          onClose={() => closeWindow("contact")}
          onMinimize={() => minimizeWindow("contact")}
          onToggleMaximize={() => toggleMaximize("contact")}
          onUpdatePosition={(x, y) => updatePosition("contact", x, y)}
          onUpdateSize={(w, h) => updateSize("contact", w, h)}
        >
          <ContactApp />
        </Window>

        {/* Settings App Window */}
        <Window
          windowState={windows.settings}
          isActive={activeWindowId === "settings"}
          onFocus={() => bringToFront("settings")}
          onClose={() => closeWindow("settings")}
          onMinimize={() => minimizeWindow("settings")}
          onToggleMaximize={() => toggleMaximize("settings")}
          onUpdatePosition={(x, y) => updatePosition("settings", x, y)}
          onUpdateSize={(w, h) => updateSize("settings", w, h)}
        >
          <SettingsApp
            themeColor={themeColor}
            onSelectTheme={setThemeColor}
            crtEnabled={crtEnabled}
            onToggleCrt={() => setCrtEnabled(!crtEnabled)}
            onResetLayout={handleResetLayout}
          />
        </Window>
      </div>

      {/* Floating Bottom Dock */}
      <Dock
        windows={windows}
        activeWindowId={activeWindowId}
        onOpenApp={openWindow}
        onMinimizeApp={minimizeWindow}
        onBringToFront={bringToFront}
      />

      {/* Right-Click Desktop Context Menu */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onOpenApp={openWindow}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        onReplayIntro={onReplayIntro}
      />
    </div>
  );
}

