"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Copy, Check, ArrowRight, Github, BookOpen } from "lucide-react";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { LiveUiTicker } from "@/components/showcase/LiveUiTicker";
import { TAI_EASE } from "@/lib/motion";

type PkgManager = "bun" | "pnpm" | "npx";

export function HomeHeroAsymmetric() {
  const [pkg, setPkg] = useState<PkgManager>("bun");
  const [copied, setCopied] = useState(false);

  const getCommand = () => {
    switch (pkg) {
      case "bun":
        return "bunx --bun thinkai-ui init";
      case "pnpm":
        return "pnpm dlx thinkai-ui init";
      case "npx":
        return "npx thinkai-ui init";
    }
  };

  const handleCopy = () => {
    void navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="relative min-w-0 overflow-hidden bg-tai-bg pt-28 pb-16 md:pt-36 md:pb-24 border-b border-tai-border transition-colors duration-300">
      {/* Subtle Atmospheric Dot Matrix Substrate */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <ThreeHalftoneCanvas className="w-full h-full" />
      </div>

      {/* Ambient Venice Cyan Radial Glow */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 bg-[#2985b8]/12 blur-[140px] z-0" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 bg-[#2985b8]/10 blur-[150px] z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean, Restrained, High-Impact Narrative (5 cols on lg) */}
          <div className="lg:col-span-5 text-left">
            
            {/* Authentic Status Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.05 }}
              className="mb-5 inline-flex items-center gap-2 border border-tai-border bg-tai-card px-3 py-1 text-xs font-mono text-tai-text select-none shadow-md"
            >
              <span className="w-2 h-2 bg-[#2985b8] shadow-[0_0_8px_#2985b8] animate-pulse" />
              <span>v1.0.0 · 0px UI Registry for React 19</span>
            </motion.div>

            {/* Focused, Human-Scaled Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: TAI_EASE.luxury, delay: 0.12 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-tai-text mb-4 leading-[1.08]"
            >
              <span>Architectural 0px</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tai-text via-tai-text to-tai-muted">
                UI Primitives
              </span>
            </motion.h1>

            {/* Truthful & Concise Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: TAI_EASE.luxury, delay: 0.19 }}
              className="text-sm sm:text-base text-tai-muted font-sans leading-relaxed mb-6"
            >
              0px sharp architectural UI primitives crafted for technical luxury, obsidian monochromatic depth, and precision motion physics. Distributed directly into your repository with 100% source code ownership.
            </motion.p>

            {/* Immediate Install Command Box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.26 }}
              className="mb-6 bg-tai-card border border-tai-border p-1.5 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2"
            >
              {/* Package Switcher */}
              <div className="flex items-center gap-0.5 bg-tai-surface p-1 border border-tai-border font-mono text-[10px]">
                {(["bun", "pnpm", "npx"] as const).map((m) => (
                  <motion.button
                    key={m}
                    onClick={() => setPkg(m)}
                    whileTap={{ scale: 0.94 }}
                    className={`px-2 py-0.5 uppercase font-bold transition-colors ${
                      pkg === m
                        ? "bg-tai-accent text-white"
                        : "text-tai-muted hover:text-tai-text"
                    }`}
                  >
                    {m}
                  </motion.button>
                ))}
              </div>

              {/* Command Display */}
              <div className="flex-1 px-2.5 py-1 font-mono text-xs text-tai-text truncate flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-tai-accent shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={pkg}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: TAI_EASE.snappy }}
                    className="truncate"
                  >
                    {getCommand()}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Copy Button */}
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.96 }}
                className="px-3.5 py-1.5 bg-tai-text hover:opacity-90 text-tai-bg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                title="Copy command to clipboard"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Action Buttons Pair */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.33 }}
              className="flex flex-wrap items-center gap-3 font-sans text-xs mb-8"
            >
              <motion.div whileHover={{ x: 1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/docs"
                  className="px-5 py-2.5 bg-tai-text hover:opacity-90 text-tai-bg font-semibold flex items-center gap-2 transition-all shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse Documentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ x: 1 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="https://github.com/ThinkAI-Studio/thinkai-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-tai-card hover:bg-tai-surface border border-tai-border hover:border-tai-accent text-tai-text font-semibold flex items-center gap-2 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-tai-muted" />
                  <span>GitHub Repository</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Truthful Ecosystem Metadata Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: TAI_EASE.luxury, delay: 0.42 }}
              className="pt-4 border-t border-tai-border flex items-center gap-2.5 font-mono text-[11px] text-tai-subtle"
            >
              <span className="text-tai-accent">REACT 19</span>
              <span>·</span>
              <span>NEXT.JS 16</span>
              <span>·</span>
              <span>55 PRIMITIVES</span>
              <span>·</span>
              <span>MIT</span>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Continuous Running Live UI Stage (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: TAI_EASE.luxury, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <LiveUiTicker />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
