"use client";

import React, { useState } from "react";
import {
  Send,
  Mail,
  Copy,
  Check,
  Radio,
  Lock,
  MessageSquare
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, DribbbleIcon } from "@/components/icons/BrandIcons";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { profileData } from "@/data/profile";

export function ContactApp() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    type: "Full-Time Role / Staff Position",
    message: ""
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText("contact@shahriarhossain.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      sound.playClick();
      alert("Please fill in all transmission fields.");
      return;
    }

    sound.playNotification();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      sound.playSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const projectTypes = [
    "Full-Time Role / Staff Position",
    "Design System Architecture & Tokens",
    "Generative AI & Spatial UI Project",
    "Design Leadership & Advisory"
  ];

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
      {/* Header Banner */}
      <div className="mb-6 pb-4 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Encrypted Comms Frequency // Active</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Initiate Contact & Transmission
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Have a project, leadership role, or ambitious creative vision in mind? Let&apos;s build together.
          </p>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>REPLY TIME &lt; 24H</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        {/* Left Column: Direct channels & Quick Connect */}
        <div className="lg:col-span-5 space-y-4">
          {/* Direct Email Card */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Dispatch</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-sm font-semibold text-slate-200">
              contact@shahriarhossain.com
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Encrypted channel for inquiries, offers, and collaborations.
            </p>
          </div>

          {/* Social Frequency Nodes */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>Verified Nodes & Socials</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-cyan-300 transition-colors text-xs font-mono text-slate-300"
              >
                <GithubIcon className="w-4 h-4 text-slate-400" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-cyan-300 transition-colors text-xs font-mono text-slate-300"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-cyan-300 transition-colors text-xs font-mono text-slate-300"
              >
                <TwitterXIcon className="w-4 h-4 text-cyan-400" />
                <span>Twitter / X</span>
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-cyan-300 transition-colors text-xs font-mono text-slate-300"
              >
                <DribbbleIcon className="w-4 h-4 text-pink-400" />
                <span>Dribbble</span>
              </a>
            </div>
          </div>

          {/* Location & Timezone Note */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <p>
              <span className="text-slate-500">TIMEZONE:</span> UTC+6 // Operating asynchronously worldwide.
            </p>
            <p>
              <span className="text-slate-500">WORK PREFERENCE:</span> Remote, Hybrid, or Select Relocation.
            </p>
          </div>
        </div>

        {/* Right Column: Encrypted Form */}
        <div className="lg:col-span-7">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 relative">
            {isSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Transmission Dispatched!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you for reaching out, {formState.name}. Your dispatch has been securely routed to Shahriar&apos;s primary inbox. Expect a response shortly.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsSent(false);
                    setFormState({
                      name: "",
                      email: "",
                      type: projectTypes[0],
                      message: ""
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 transition-colors"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Name / Organization</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe / Acme Corp"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-100 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Return Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-100 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Inquiry Vector</label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-200 outline-none transition-colors"
                  >
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-slate-900 text-slate-200">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Dispatch Payload (Message)</label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your product challenges, timeline, or scope of collaboration..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-100 outline-none transition-colors font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] disabled:opacity-50"
                >
                  {isSending ? (
                    <span>Encrypting & Routing...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Dispatch</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
