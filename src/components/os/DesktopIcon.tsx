"use client";

import React from "react";
import { sound } from "@/lib/audio";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  onClick: () => void;
  color?: string;
}

export function DesktopIcon({ id, label, icon: Icon, badge, onClick, color = "from-cyan-500 to-blue-600" }: DesktopIconProps) {
  return (
    <button
      onClick={() => {
        sound.playClick();
        onClick();
      }}
      className="group flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all w-24 text-center cursor-pointer select-none"
    >
      <div className="relative mb-1.5 transition-transform duration-200 group-hover:scale-110">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center shadow-lg border border-white/20`}
        >
          <Icon className="w-6 h-6 text-white stroke-[2.2]" />
        </div>
        {badge && (
          <span className="absolute -top-1 -right-1.5 px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-mono font-bold shadow-md">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[11px] font-mono text-slate-200 tracking-tight leading-tight px-1.5 py-0.5 rounded group-hover:bg-cyan-950/80 group-hover:text-cyan-300 transition-colors drop-shadow-md truncate max-w-full">
        {label}
      </span>
    </button>
  );
}

