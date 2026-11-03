"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Terminal,
  Layers,
  User,
  Sparkles,
  Send,
  Settings,
  Trash2
} from "lucide-react";
import { WindowState } from "@/hooks/useWindowManager";
import { sound } from "@/lib/audio";

interface DockProps {
  windows: Record<string, WindowState>;
  activeWindowId: string;
  onOpenApp: (id: string) => void;
  onMinimizeApp: (id: string) => void;
  onBringToFront: (id: string) => void;
}

interface DockItemDef {
  id: string;
  label: string;
  icon: React.ElementType;
  hotkey: string;
  color: string;
}

const DOCK_ITEMS: DockItemDef[] = [
  { id: "projects", label: "Work & Case Studies", icon: Briefcase, hotkey: "1", color: "from-cyan-500 to-blue-500" },
  { id: "skills", label: "Skills Matrix & Architecture", icon: Layers, hotkey: "2", color: "from-purple-500 to-indigo-500" },
  { id: "terminal", label: "Interactive Cyber Terminal", icon: Terminal, hotkey: "3", color: "from-emerald-500 to-teal-500" },
  { id: "about", label: "About Shahriar // Bio", icon: User, hotkey: "4", color: "from-pink-500 to-rose-500" },
  { id: "creativeLab", label: "Creative Lab // Shader Sandbox", icon: Sparkles, hotkey: "5", color: "from-amber-500 to-orange-500" },
  { id: "contact", label: "Secure Comms // Contact", icon: Send, hotkey: "6", color: "from-blue-500 to-cyan-500" },
  { id: "settings", label: "System Preferences", icon: Settings, hotkey: "7", color: "from-slate-400 to-slate-600" }
];

export function Dock({
  windows,
  activeWindowId,
  onOpenApp,
  onMinimizeApp,
  onBringToFront
}: DockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClickItem = (id: string) => {
    const win = windows[id];
    if (!win || !win.isOpen) {
      onOpenApp(id);
    } else if (win.isMinimized) {
      sound.playClick();
      onBringToFront(id);
    } else if (activeWindowId === id) {
      onMinimizeApp(id);
    } else {
      sound.playClick();
      onBringToFront(id);
    }
  };

  const handleTrashClick = () => {
    sound.playNotification();
    alert("Recycle Bin is empty! Shahriar's ideas are never discarded, only iterated into production.");
  };

  return (
    <footer className="fixed bottom-3.5 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-end space-x-2 px-3.5 py-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.7)] ring-1 ring-white/5 transition-all">
        {DOCK_ITEMS.map((item) => {
          const win = windows[item.id];
          const isOpen = win?.isOpen && !win?.isMinimized;
          const isActive = activeWindowId === item.id && isOpen;
          const Icon = item.icon;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-11 px-2.5 py-1 rounded-md bg-slate-900/95 border border-cyan-500/40 text-slate-100 text-[11px] font-mono shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center space-x-1.5 z-50">
                  <span>{item.label}</span>
                  <kbd className="px-1 py-0.2 text-[9px] bg-slate-800 rounded border border-slate-700 text-cyan-400">
                    ⌘{item.hotkey}
                  </kbd>
                </div>
              )}

              {/* Dock Icon Button */}
              <button
                onClick={() => handleClickItem(item.id)}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  sound.playClick();
                }}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 transform ${
                  isHovered ? "-translate-y-2 scale-110 shadow-lg" : ""
                } ${
                  isActive
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,242,254,0.35)]"
                    : "bg-slate-900/90 hover:bg-slate-850 border border-slate-700/60 hover:border-slate-500"
                }`}
              >
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-tr ${item.color} flex items-center justify-center text-slate-950 shadow-inner`}
                >
                  <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-white stroke-[2.2]" />
                </div>
              </button>

              {/* Status Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen ? (
                  <span
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      isActive ? "w-4 bg-cyan-400 shadow-[0_0_8px_#00f2fe]" : "w-1.5 bg-slate-400"
                    }`}
                  />
                ) : (
                  <span className="w-1.5 h-1.5" />
                )}
              </div>
            </div>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-8 bg-slate-800 mx-1 self-center" />

        {/* Trash Item */}
        <div className="relative flex flex-col items-center">
          {hoveredId === "trash" && (
            <div className="absolute -top-11 px-2.5 py-1 rounded-md bg-slate-900/95 border border-slate-700 text-slate-100 text-[11px] font-mono shadow-xl whitespace-nowrap pointer-events-none">
              <span>Recycle Bin</span>
            </div>
          )}
          <button
            onClick={handleTrashClick}
            onMouseEnter={() => {
              setHoveredId("trash");
              sound.playClick();
            }}
            onMouseLeave={() => setHoveredId(null)}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-all transform ${
              hoveredId === "trash" ? "-translate-y-2 scale-110" : ""
            }`}
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
          </button>
          <div className="h-1.5 mt-1" />
        </div>
      </div>
    </footer>
  );
}

