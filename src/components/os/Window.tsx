"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { X, Minus, Square, Copy, Terminal, Briefcase, Layers, Sparkles, Send, Settings, User } from "lucide-react";
import { WindowState } from "@/hooks/useWindowManager";

interface WindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onUpdateSize: (width: number, height: number) => void;
  children: React.ReactNode;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Briefcase,
  Layers,
  Sparkles,
  Send,
  Settings,
  User
};

export function Window({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onUpdatePosition,
  onUpdateSize,
  children
}: WindowProps) {
  const { id, title, iconName, isOpen, isMinimized, isMaximized, zIndex, position, size } = windowState;

  const windowRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const IconComponent = ICON_MAP[iconName] || Briefcase;

  // Window drag handlers
  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return; // Don't drag when clicking buttons
    onFocus();
    if (isMaximized) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveHeader = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || isMaximized) return;
      const newX = Math.max(10, Math.min(window.innerWidth - size.width - 10, e.clientX - dragOffset.x));
      const newY = Math.max(38, Math.min(window.innerHeight - 120, e.clientY - dragOffset.y));
      onUpdatePosition(newX, newY);
    },
    [isDragging, isMaximized, dragOffset, size.width, onUpdatePosition]
  );

  const handlePointerUpHeader = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Window resize handlers
  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();
    if (isMaximized) return;

    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleResizeMove = useCallback(
    (e: PointerEvent) => {
      if (!isResizing || isMaximized) return;
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.min(window.innerWidth - position.x - 10, Math.max(360, resizeStart.w + deltaX));
      const newHeight = Math.min(window.innerHeight - position.y - 80, Math.max(260, resizeStart.h + deltaY));
      onUpdateSize(newWidth, newHeight);
    },
    [isResizing, isMaximized, resizeStart, position.x, position.y, onUpdateSize]
  );

  const handleResizeUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMoveHeader);
      window.addEventListener("pointerup", handlePointerUpHeader);
      return () => {
        window.removeEventListener("pointermove", handlePointerMoveHeader);
        window.removeEventListener("pointerup", handlePointerUpHeader);
      };
    }
  }, [isDragging, handlePointerMoveHeader, handlePointerUpHeader]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("pointermove", handleResizeMove);
      window.addEventListener("pointerup", handleResizeUp);
      return () => {
        window.removeEventListener("pointermove", handleResizeMove);
        window.removeEventListener("pointerup", handleResizeUp);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeUp]);

  if (!isOpen || isMinimized) return null;

  const style: React.CSSProperties = isMaximized
    ? {
        position: "fixed",
        top: 36,
        left: 8,
        right: 8,
        bottom: 84,
        zIndex,
        width: "calc(100vw - 16px)",
        height: "calc(100vh - 120px)"
      }
    : {
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex
      };

  return (
    <div
      ref={windowRef}
      id={`window-${id}`}
      style={style}
      onPointerDown={onFocus}
      className={`flex flex-col rounded-xl overflow-hidden transition-shadow duration-200 select-none ${
        isActive
          ? "border border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.18)] bg-slate-950/92 backdrop-blur-2xl ring-1 ring-cyan-400/20"
          : "border border-slate-700/40 shadow-2xl bg-slate-950/85 backdrop-blur-xl opacity-95"
      }`}
    >
      {/* Title Bar */}
      <div
        onPointerDown={handlePointerDownHeader}
        onDoubleClick={onToggleMaximize}
        className={`h-10 px-3.5 flex items-center justify-between border-b cursor-grab active:cursor-grabbing transition-colors ${
          isActive
            ? "border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 text-slate-100"
            : "border-slate-800 bg-slate-900/60 text-slate-400"
        }`}
      >
        {/* Left: Window Dots */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close Window"
            className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 border border-rose-600/60 flex items-center justify-center group transition-colors"
          >
            <X className="w-2 h-2 text-rose-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize Window"
            className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 border border-amber-600/60 flex items-center justify-center group transition-colors"
          >
            <Minus className="w-2 h-2 text-amber-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            title={isMaximized ? "Restore Window" : "Maximize Window"}
            className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 border border-emerald-600/60 flex items-center justify-center group transition-colors"
          >
            {isMaximized ? (
              <Copy className="w-2 h-2 text-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            ) : (
              <Square className="w-1.5 h-1.5 text-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Center: Title & Icon */}
        <div className="flex items-center space-x-2 text-xs font-mono tracking-wide truncate max-w-[65%]">
          <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
          <span className="truncate">{title}</span>
        </div>

        {/* Right: Window Status Badge */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-400 animate-pulse" : "bg-slate-600"}`} />
          <span className="hidden sm:inline">{isActive ? "ACTIVE" : "STANDBY"}</span>
        </div>
      </div>

      {/* Window Body / Content Area */}
      <div className="flex-1 overflow-auto bg-slate-950/70 text-slate-100 select-text relative">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right) */}
      {!isMaximized && (
        <div
          onPointerDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize group flex items-end justify-end p-0.5 z-10"
          title="Drag to Resize"
        >
          <div className="w-2 h-2 border-r-2 border-b-2 border-slate-600 group-hover:border-cyan-400 transition-colors" />
        </div>
      )}
    </div>
  );
}

