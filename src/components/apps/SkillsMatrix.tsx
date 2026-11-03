"use client";

import React, { useState } from "react";
import { Layout, Cpu, Terminal, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { skillsData, SkillCategory } from "@/data/skills";
import { sound } from "@/lib/audio";

export function SkillsMatrix() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(
      skillsData.flatMap((cat) => cat.skills.flatMap((s) => s.tags))
    )
  ).slice(0, 14);

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
      {/* Top Banner */}
      <div className="mb-6 pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono uppercase tracking-widest mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Dual-Discipline Competency Matrix</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
            Design Craft & Creative Engineering
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl font-sans">
            Bridging conceptual product design with production code execution. Proficient from Figma token variables to WebGL vertex shaders.
          </p>
        </div>

        {/* Quick Tag Pill Filter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 max-w-sm">
          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400 mb-1.5">
            <Filter className="w-3 h-3 text-cyan-400" />
            <span>FILTER BY TAG:</span>
            {selectedTag && (
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedTag(null);
                }}
                className="text-cyan-400 underline ml-auto text-[10px]"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  sound.playClick();
                  setSelectedTag(selectedTag === tag ? null : tag);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  selectedTag === tag
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        {skillsData.map((category) => {
          const filteredSkills = selectedTag
            ? category.skills.filter((s) => s.tags.includes(selectedTag))
            : category.skills;

          if (filteredSkills.length === 0) return null;

          return (
            <div
              key={category.title}
              className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-950 font-bold"
                    style={{ backgroundColor: category.color }}
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{category.title}</h3>
                    <p className="text-[10px] font-mono text-slate-400">{filteredSkills.length} Domains Indexed</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans mb-5 leading-relaxed">
                  {category.tagline}
                </p>

                {/* Skills List */}
                <div className="space-y-4">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                        <span className="text-xs font-mono font-bold text-cyan-400">{skill.level}%</span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden my-2">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: category.color,
                            boxShadow: `0 0 10px ${category.color}80`
                          }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-2.5">
                        {skill.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {skill.tags.map((t) => (
                          <span
                            key={t}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${
                              selectedTag === t
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-semibold"
                                : "bg-slate-900 text-slate-400 border-slate-800"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified badge */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Tested</span>
                </span>
                <span>Active 2026</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

