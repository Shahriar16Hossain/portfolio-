"use client";

import React, { useState } from "react";
import {
  User,
  Sparkles,
  Code,
  Layers,
  Briefcase,
  FileText,
  MapPin,
  ExternalLink,
  Award,
  CheckCircle2,
  X
} from "lucide-react";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/audio";

export function AboutMe() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
      {/* Hero Profile Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{profileData.status}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-sm md:text-base font-mono text-cyan-300 mt-1 font-medium">
            {profileData.role}
          </p>
          <p className="text-xs md:text-sm text-slate-300 mt-3 font-sans leading-relaxed">
            {profileData.subTitle}
          </p>

          <div className="flex flex-wrap gap-3 mt-4 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>{profileData.availability}</span>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              sound.playSuccess();
              setShowResumeModal(true);
            }}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume / CV</span>
          </button>
        </div>

        {/* Background Decorative Mesh Glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-cyan-500/10 via-purple-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {profileData.stats.map((s, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
          >
            <span className="text-[11px] font-mono text-slate-400 uppercase">{s.label}</span>
            <div className="text-xl md:text-2xl font-bold font-mono text-cyan-300 my-1">{s.value}</div>
            <span className="text-[10px] text-slate-500 font-sans leading-tight">{s.detail}</span>
          </div>
        ))}
      </div>

      {/* The Core Narrative / Bio */}
      <div className="mb-8 p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3 font-sans text-sm text-slate-300 leading-relaxed">
        <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold mb-1">
          // The Narrative
        </h3>
        {profileData.bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Design & Engineering Philosophy */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider font-bold mb-4 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Design Philosophies</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profileData.philosophies.map((phil, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                {idx === 0 && <Sparkles className="w-4 h-4" />}
                {idx === 1 && <Code className="w-4 h-4" />}
                {idx === 2 && <Layers className="w-4 h-4" />}
              </div>
              <h4 className="font-bold text-sm text-slate-100 mb-1.5">{phil.title}</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">{phil.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Career Experience Journey */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold mb-4 flex items-center space-x-1.5">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career Journey & Leadership</span>
        </h3>
        <div className="space-y-4">
          {profileData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 relative pl-6 border-l-2 border-l-cyan-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{exp.role}</h4>
                  <p className="text-xs font-mono text-cyan-400">{exp.company}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 self-start sm:self-auto">
                  {exp.year}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mb-3 leading-relaxed">
                {exp.description}
              </p>
              <div className="space-y-1">
                {exp.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-100">
                  {profileData.name} — Executive Summary
                </h3>
                <p className="text-xs font-mono text-cyan-400">{profileData.role}</p>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="font-bold text-cyan-400 mb-1">SUMMARY & CORE VALUE:</p>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  Product Designer & Creative Technologist with 6+ years shipping multi-platform design systems, spatial interfaces, and AI tools. Proven track record reducing developer handoff latency by 50%+ through algorithmic tokens and live React/Next.js prototypes.
                </p>
              </div>

              <div>
                <p className="font-bold text-cyan-400 mb-2">KEY AREAS OF EXPERTISE:</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    • Multi-platform Design Tokens
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    • Spatial / VisionOS UI Mechanics
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    • React / Next.js / TypeScript
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    • WebGL / Shaders & Three.js
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">FORMAT: PDF / MARKDOWN READY</span>
                <a
                  href="mailto:contact@shahriarhossain.com?subject=Resume%20Inquiry%20-%20Shahriar%20Hossain"
                  className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Request Full Formal PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

