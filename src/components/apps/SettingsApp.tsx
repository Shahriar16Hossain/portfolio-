"use client";

import React, { useState } from "react";
import {
  Sliders,
  Volume2,
  VolumeX,
  Tv,
  Sparkles,
  RefreshCw,
  Check,
  Shield,
  Laptop
} from "lucide-react";
import { sound } from "@/lib/audio";

interface SettingsAppProps {
  themeColor: "cyan" | "violet" | "emerald" | "amber";
  onSelectTheme: (t: "cyan" | "violet" | "emerald" | "amber") => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onResetLayout: () => void;
}

export function SettingsApp({
  themeColor,
  onSelectTheme,
  crtEnabled,
  onToggleCrt,
  onResetLayout
}: SettingsAppProps) {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playSuccess();
  };

  const themes: { id: "cyan" | "violet" | "emerald" | "amber"; name: string; hex: string }[] = [
    { id: "cyan", name: "Cyber Cyan (Default)", hex: "#00f2fe" },
    { id: "violet", name: "Neon Violet", hex: "#a855f7" },
    { id: "emerald", name: "Matrix Emerald", hex: "#10b981" },
    { id: "amber", name: "Solar Amber", hex: "#f59e0b" }
  ];

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
      {/* Top Banner */}
      <div className="mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">
          <Sliders className="w-3.5 h-3.5" />
          <span>System Environment & Preferences</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">Display & Audio Calibration</h2>
      </div>

      <div className="space-y-6 pb-8">
        {/* Theme Aura Selection */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-xs font-mono uppercase text-slate-300 font-bold mb-3 flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Accent Aura & Desktop Glow</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTheme(t.id);
                }}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all ${
                  themeColor === t.id
                    ? "bg-slate-800 border-cyan-400 text-slate-100 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                    : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span>{t.name}</span>
                </div>
                {themeColor === t.id && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Synthesis Settings */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Web Audio Feedback (Synthesizer Engine)</span>
            </h3>
            <button
              onClick={handleToggleMute}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                !isMuted ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
              }`}
            >
              {!isMuted ? "SOUND: ON" : "MUTED"}
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-4 font-sans">
            Procedural micro-interaction tones synthesized directly in the browser via Web Audio API. Zero external audio downloads required.
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => sound.playClick()}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300"
            >
              Test Click Tone
            </button>
            <button
              onClick={() => sound.playWindowOpen()}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300"
            >
              Test Chime
            </button>
            <button
              onClick={() => sound.playNotification()}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300"
            >
              Test Notification
            </button>
            <button
              onClick={() => sound.playSuccess()}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300"
            >
              Test Fanfare
            </button>
          </div>
        </div>

        {/* Display Effects & Scanlines */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
              <Tv className="w-3.5 h-3.5 text-emerald-400" />
              <span>Retro CRT Scanlines Overlay</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Subtle horizontal phosphorescent lines and subtle curvature vignette for aesthetic depth.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onToggleCrt();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              crtEnabled ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
            }`}
          >
            {crtEnabled ? "ENABLED" : "DISABLED"}
          </button>
        </div>

        {/* Window Manager Reset */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Desktop Workspace</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Reposition all active application windows back to their default balanced coordinates.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playSuccess();
              onResetLayout();
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 transition-colors"
          >
            Reset Positions
          </button>
        </div>

        {/* System Architecture Telemetry */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1.5">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-1">
            <Laptop className="w-4 h-4" />
            <span>CORE RUNTIME TELEMETRY</span>
          </div>
          <p><span className="text-slate-500">KERNEL:</span> Next.js 16.4.4 App Router (Turbopack)</p>
          <p><span className="text-slate-500">RUNTIME:</span> React 19.3 & Tailwind CSS v4</p>
          <p><span className="text-slate-500">GRAPHICS:</span> Hardware Accelerated HTML5 Canvas & WebGL</p>
          <p><span className="text-slate-500">SECURITY:</span> Sandbox Encrypted Memory Space</p>
        </div>
      </div>
    </div>
  );
}

