"use client";

import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Sliders, Play, RotateCcw, Zap, Compass } from "lucide-react";
import { sound } from "@/lib/audio";

interface LabParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
}

export function CreativeLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] = useState<"vortex" | "wave" | "constellation">("vortex");
  const [particleCount, setParticleCount] = useState<number>(350);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.2);
  const [colorTheme, setColorTheme] = useState<"cyan" | "neon" | "gold">("cyan");
  const [fps, setFps] = useState<number>(60);

  const shockwaveTriggerRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: 0,
    y: 0,
    active: false,
    radius: 0
  });

  const triggerSupernova = () => {
    sound.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;
    shockwaveTriggerRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      active: true,
      radius: 5
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: LabParticle[] = [];

    const getPalette = () => {
      if (colorTheme === "neon") {
        return ["#a855f7", "#ec4899", "#3b82f6", "#06b6d4"];
      }
      if (colorTheme === "gold") {
        return ["#f59e0b", "#fbbf24", "#ea580c", "#f97316"];
      }
      return ["#00f2fe", "#0284c7", "#38bdf8", "#06b6d4"];
    };

    const palette = getPalette();

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * speedMultiplier,
        vy: (Math.random() - 0.5) * speedMultiplier,
        size: Math.random() * 2.2 + 1,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }

    const mouse = {
      x: width / 2,
      y: height / 2,
      isHovered: false
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const onPointerLeave = () => {
      mouse.isHovered = false;
    };

    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mouseleave", onPointerLeave);

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      // FPS measurement
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      ctx.fillStyle = "rgba(7, 9, 15, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // Handle shockwave expansion
      if (shockwaveTriggerRef.current.active) {
        const sw = shockwaveTriggerRef.current;
        sw.radius += 12;
        ctx.strokeStyle = `rgba(0, 242, 254, ${Math.max(0, 1 - sw.radius / 350)})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (sw.radius > 350) {
          sw.active = false;
        }
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mode === "vortex") {
          // Vortex physics around center or mouse
          const targetX = mouse.isHovered ? mouse.x : width / 2;
          const targetY = mouse.isHovered ? mouse.y : height / 2;

          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const angle = Math.atan2(dy, dx) + Math.PI / 2;
          const force = (1 / Math.max(40, dist)) * 25 * speedMultiplier;

          p.vx += Math.cos(angle) * force * 0.8 + (dx / dist) * 0.15;
          p.vy += Math.sin(angle) * force * 0.8 + (dy / dist) * 0.15;

          // Drag / friction
          p.vx *= 0.96;
          p.vy *= 0.96;
        } else if (mode === "wave") {
          // Sinusoidal wave motion
          p.vx = Math.sin(time * 0.002 + p.y * 0.02) * speedMultiplier * 1.5;
          p.vy = Math.cos(time * 0.002 + p.x * 0.02) * speedMultiplier * 1.5;
        } else {
          // Constellation drift
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Shockwave repulsion
        if (shockwaveTriggerRef.current.active) {
          const sw = shockwaveTriggerRef.current;
          const sDist = Math.hypot(p.x - sw.x, p.y - sw.y);
          if (Math.abs(sDist - sw.radius) < 30) {
            p.vx += (p.x - sw.x) * 0.08;
            p.vy += (p.y - sw.y) * 0.08;
          }
        }

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect constellation lines in constellation mode
        if (mode === "constellation") {
          for (let j = i + 1; j < Math.min(i + 15, particles.length); j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 70) {
              ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - d / 70) * 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [mode, particleCount, speedMultiplier, colorTheme]);

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-hidden">
      {/* Top Banner */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive GPU Physics & Canvas Lab</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Dynamic Particle Vortex</h2>
        </div>

        {/* Telemetry Badge */}
        <div className="flex items-center space-x-3 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <div>
            <span className="text-slate-500">FPS: </span>
            <span className="text-emerald-400 font-bold">{fps}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div>
            <span className="text-slate-500">PARTICLES: </span>
            <span className="text-cyan-400 font-bold">{particleCount}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="flex-1 relative rounded-xl border border-cyan-500/30 overflow-hidden bg-slate-950 shadow-inner">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />

        {/* Floating Controls Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-auto">
          {(["vortex", "wave", "constellation"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                sound.playClick();
                setMode(m);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all backdrop-blur-md ${
                mode === m
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                  : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Shockwave Supernova Trigger */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <button
            onClick={triggerSupernova}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-bold shadow-lg hover:scale-105 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Shockwave Pulse</span>
          </button>
        </div>

        {/* Instructions badge */}
        <div className="absolute bottom-3 left-3 pointer-events-none hidden md:block">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
            Click or drag mouse to exert gravitational pull
          </span>
        </div>
      </div>

      {/* Parameter Control Panel */}
      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-400">Particle Density:</span>
            <span className="text-cyan-400">{particleCount}</span>
          </div>
          <input
            type="range"
            min="100"
            max="600"
            step="50"
            value={particleCount}
            onChange={(e) => setParticleCount(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-400">Velocity Curve:</span>
            <span className="text-purple-400">{speedMultiplier.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
        </div>

        <div>
          <span className="text-slate-400 block mb-1">Aura Palette:</span>
          <div className="flex space-x-2">
            {(["cyan", "neon", "gold"] as const).map((pal) => (
              <button
                key={pal}
                onClick={() => {
                  sound.playClick();
                  setColorTheme(pal);
                }}
                className={`flex-1 py-1 rounded text-[10px] uppercase font-bold border transition-colors ${
                  colorTheme === pal
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                }`}
              >
                {pal}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

