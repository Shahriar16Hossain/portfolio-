"use client";

import React, { useEffect, useRef } from "react";
import {
  Briefcase,
  Terminal,
  Sparkles,
  Volume2,
  Tv,
  Info,
  Sliders
} from "lucide-react";
import { sound } from "@/lib/audio";

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: string) => void;
  onToggleCrt: () => void;
  onReplayIntro?: () => void;
}

export function ContextMenu({
  x,
  y,
  isOpen,
  onClose,
  onOpenApp,
  onToggleCrt,
  onReplayIntro
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("pointerdown", handleClickOutside);
      return () => window.removeEventListener("pointerdown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const adjustedX = Math.min(x, typeof window !== "undefined" ? window.innerWidth - 210 : x);
  const adjustedY = Math.min(y, typeof window !== "undefined" ? window.innerHeight - 260 : y);

  return (
    <div
      ref={menuRef}
      style={{ left: `${adjustedX}px`, top: `${adjustedY}px` }}
      className="fixed z-50 w-52 rounded-xl bg-slate-900/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl py-1.5 text-xs font-mono text-slate-200 select-none animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="px-3 py-1 text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 mb-1">
        Desktop Workspace
      </div>

      <button
        onClick={() => {
          sound.playClick();
          onOpenApp("projects");
          onClose();
        }}
        className="w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
      >
        <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
        <span>Work & Case Studies</span>
      </button>

      <button
        onClick={() => {
          sound.playClick();
          onOpenApp("terminal");
          onClose();
        }}
        className="w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
      >
        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
        <span>Command Shell (zsh)</span>
      </button>

      <button
        onClick={() => {
          sound.playClick();
          onOpenApp("creativeLab");
          onClose();
        }}
        className="w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Creative Shader Lab</span>
      </button>

      {onReplayIntro && (
        <button
          onClick={() => {
            sound.playClick();
            onClose();
            onReplayIntro();
          }}
          className="w-full text-left px-3 py-1.5 hover:bg-emerald-500/20 hover:text-emerald-300 flex items-center space-x-2 transition-colors text-emerald-400 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>▶ Replay 2050 Intro</span>
        </button>
      )}
      <div className="my-1 border-t border-slate-800" />

      <button
        onClick={() => {
          sound.playClick();
          onToggleCrt();
          onClose();
        }}
        className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center space-x-2 text-slate-300 transition-colors"
      >
        <Tv className="w-3.5 h-3.5 text-slate-400" />
        <span>Toggle CRT Scanlines</span>
      </button>

      <button
        onClick={() => {
          sound.playClick();
          onOpenApp("settings");
          onClose();
        }}
        className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center space-x-2 text-slate-300 transition-colors"
      >
        <Sliders className="w-3.5 h-3.5 text-slate-400" />
        <span>System Preferences</span>
      </button>

      {onReplayIntro && (
        <button
          onClick={() => {
            sound.playClick();
            onClose();
            onReplayIntro();
          }}
          className="w-full text-left px-3 py-1.5 hover:bg-emerald-500/20 hover:text-emerald-300 flex items-center space-x-2 transition-colors text-emerald-400 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>▶ Replay 2050 Intro</span>
        </button>
      )}
      <div className="my-1 border-t border-slate-800" />

      <button
        onClick={() => {
          sound.playClick();
          onOpenApp("about");
          onClose();
        }}
        className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center space-x-2 text-slate-300 transition-colors"
      >
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        <span>About Shahriar Hossain</span>
      </button>
    </div>
  );
}

