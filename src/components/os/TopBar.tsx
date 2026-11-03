"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Volume2,
  VolumeX,
  Tv,
  Sparkles,
  Send,
  ChevronDown,
  Info,
  RotateCw,
  Sliders,
  Check
} from "lucide-react";
import { sound } from "@/lib/audio";

interface TopBarProps {
  themeColor: "cyan" | "violet" | "emerald" | "amber";
  onSelectTheme: (theme: "cyan" | "violet" | "emerald" | "amber") => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onOpenApp: (id: string) => void;
  activeAppTitle?: string;
  onReplayIntro?: () => void;
}

export function TopBar({
  themeColor,
  onSelectTheme,
  crtEnabled,
  onToggleCrt,
  onOpenApp,
  activeAppTitle,
  onReplayIntro
}: TopBarProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playNotification();
    }
  };

  const themes: { id: "cyan" | "violet" | "emerald" | "amber"; label: string; hex: string }[] = [
    { id: "cyan", label: "Cyber Cyan", hex: "#00f2fe" },
    { id: "violet", label: "Neon Violet", hex: "#a855f7" },
    { id: "emerald", label: "Matrix Emerald", hex: "#10b981" },
    { id: "amber", label: "Solar Amber", hex: "#f59e0b" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-9 z-40 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/15 flex items-center justify-between px-3 text-xs font-mono select-none">
      {/* Left: Brand Menu */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={() => {
              sound.playClick();
              setIsMenuOpen(!isMenuOpen);
              setIsThemeMenuOpen(false);
            }}
            className="flex items-center space-x-1.5 px-2 py-1 rounded hover:bg-slate-800/70 text-slate-200 transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold tracking-wider">SHAHRIAR.OS</span>
            <span className="text-[10px] text-cyan-400/80 font-normal">v4.2</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* System Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-slate-900/95 border border-slate-700/70 backdrop-blur-xl shadow-2xl py-1 z-50 text-slate-200">
              <button
                onClick={() => {
                  onOpenApp("about");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>About This System</span>
              </button>
              <button
                onClick={() => {
                  onOpenApp("settings");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>System Preferences</span>
              </button>
              <button
                onClick={() => {
                  onOpenApp("terminal");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Command Shell (zsh)</span>
              </button>
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-emerald-500/20 hover:text-emerald-300 flex items-center space-x-2 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Replay Bangladesh 2050 3D Flythrough</span>
                </button>
              )}
              <div className="my-1 border-t border-slate-800" />
              <button
                onClick={() => {
                  sound.playSuccess();
                  window.location.reload();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-rose-500/20 hover:text-rose-300 flex items-center space-x-2 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5 text-rose-400" />
                <span>Reboot OS</span>
              </button>
            </div>
          )}
        </div>

        {/* Active App Indicator */}
        {activeAppTitle && (
          <div className="hidden md:flex items-center space-x-1.5 text-slate-400 border-l border-slate-800 pl-3">
            <span className="text-[10px] text-slate-500">RUNNING:</span>
            <span className="text-slate-200 text-xs truncate max-w-[220px]">{activeAppTitle}</span>
          </div>
        )}
      </div>

      {/* Center: Live Status Ticker */}
      <div className="hidden lg:flex items-center space-x-2 px-3 py-0.5 rounded-full bg-slate-900/60 border border-slate-800 text-[11px]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-slate-300">
          PRODUCT DESIGN & CREATIVE TECH LAB // <span className="text-emerald-400 font-semibold">ONLINE</span>
        </span>
        {onReplayIntro && (
          <button
            onClick={onReplayIntro}
            className="ml-2 px-2 py-0.2 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center space-x-1 transition-colors"
          >
            <span>▶ 2050 Flythrough</span>
          </button>
        )}
      </div>

      {/* Right: Status, Controls & Clock */}
      <div className="flex items-center space-x-2">
        {/* Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playClick();
              setIsThemeMenuOpen(!isThemeMenuOpen);
              setIsMenuOpen(false);
            }}
            title="Aura Theme Switcher"
            className="p-1.5 rounded hover:bg-slate-800/80 text-slate-300 hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {isThemeMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 rounded-lg bg-slate-900/95 border border-slate-700/70 backdrop-blur-xl shadow-2xl py-1 z-50 text-slate-200">
              <div className="px-3 py-1 text-[10px] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                Aura Color Palette
              </div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTheme(t.id);
                    setIsThemeMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center justify-between transition-colors text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.hex }} />
                    <span>{t.label}</span>
                  </div>
                  {themeColor === t.id && <Check className="w-3 h-3 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CRT Scanline Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleCrt();
          }}
          title={crtEnabled ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
          className={`p-1.5 rounded hover:bg-slate-800/80 transition-colors ${
            crtEnabled ? "text-cyan-400 bg-cyan-950/40" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
          className={`p-1.5 rounded hover:bg-slate-800/80 transition-colors ${
            !isMuted ? "text-cyan-400 bg-cyan-950/30" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Contact / Hire Me CTA */}
        <button
          onClick={() => {
            sound.playSuccess();
            onOpenApp("contact");
          }}
          className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold transition-all hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]"
        >
          <Send className="w-2.5 h-2.5" />
          <span>Hire Me</span>
        </button>

        {/* Clock */}
        <div className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-300 font-mono tracking-wider text-[11px]">
          {timeStr || "12:00:00"}
        </div>
      </div>
    </header>
  );
}

