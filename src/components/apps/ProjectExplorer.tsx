"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter,
  BarChart2,
  FolderGit2,
  X
} from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import { sound } from "@/lib/audio";

export function ProjectExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["All", "Design Systems", "AI & Generative", "Spatial & 3D", "FinTech & Data"];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const openCaseStudy = (project: Project) => {
    sound.playClick();
    setActiveProject(project);
  };

  const closeCaseStudy = () => {
    sound.playClick();
    setActiveProject(null);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
      {/* Header Banner */}
      <div className="mb-6 pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Product Design & Creative Tech Archive</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
            Case Studies & Systems Architecture
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl font-sans">
            A curated selection of scalable design systems, spatial interfaces, and generative AI canvases engineered with human craft.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center space-x-3 text-xs font-mono bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 self-start md:self-auto">
          <div>
            <span className="text-slate-500">INDEXED: </span>
            <span className="text-cyan-400 font-bold">{projectsData.length} WORKS</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,254,0.2)] font-semibold"
                : "bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => openCaseStudy(project)}
            className="group relative rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,242,254,0.08)] hover:-translate-y-0.5"
          >
            {/* Top Badge & Category */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-800/90 text-slate-300 border border-slate-700/80">
                  {project.category}
                </span>
                <span className="text-[11px] font-mono text-slate-500">{project.period}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400/80 mt-0.5">{project.role}</p>
              <p className="text-xs text-slate-400 mt-2.5 font-sans leading-relaxed line-clamp-2">
                {project.tagline}
              </p>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="bg-slate-950/60 rounded-lg p-2 border border-slate-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase truncate">{m.label}</div>
                    <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tech Pills & CTA */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 overflow-hidden">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-slate-400 border border-slate-800 truncate"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] font-mono text-slate-500">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-1 text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>View Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Full Modal / Drawer */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs">
                  {activeProject.category}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{activeProject.title}</h3>
                  <p className="text-xs font-mono text-slate-400">
                    Role: {activeProject.role} // {activeProject.period}
                  </p>
                </div>
              </div>

              <button
                onClick={closeCaseStudy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-sm font-sans">
              {/* Executive Summary */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase text-cyan-400 mb-1 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive Overview</span>
                </h4>
                <p className="text-slate-200 leading-relaxed">{activeProject.summary}</p>
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-rose-950/15 border border-rose-500/20 rounded-xl p-4">
                  <h4 className="text-xs font-mono uppercase text-rose-400 font-bold mb-2">
                    01. The Problem & Friction
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeProject.problem}</p>
                </div>

                <div className="bg-emerald-950/15 border border-emerald-500/20 rounded-xl p-4">
                  <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2">
                    02. The Architecture & Solution
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeProject.solution}</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center space-x-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Measurable Impact & Results</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center"
                    >
                      <div className="text-lg font-bold font-mono text-cyan-300">{m.value}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables & Deliverable Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shipped Artifacts & Deliverables</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 text-xs font-mono text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2.5 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Technologies & Tooling</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">ID: {activeProject.id}</span>
              <button
                onClick={closeCaseStudy}
                className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

