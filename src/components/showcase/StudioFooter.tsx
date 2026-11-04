"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import { TAI_EASE } from "@/lib/motion";

const colVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

const colItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: TAI_EASE.luxury },
  },
};

export function StudioFooter() {
  const [copiedCli, setCopiedCli] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const copyCli = () => {
    void navigator.clipboard.writeText("npx thinkai-ui init");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: TAI_EASE.luxury }}
      className="w-full bg-tai-sheet border-t border-tai-border pt-14 pb-12 px-4 sm:px-6 lg:px-8 text-tai-text select-none"
    >
      <div className="max-w-[1560px] mx-auto">
        
        {/* TOP DEVELOPER HUD STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.1 }}
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-8 mb-12 border-b border-tai-border"
        >
          
          {/* CLI Terminal Simulator Box */}
          <div className="flex-1 max-w-xl bg-tai-card border border-tai-border p-3 flex items-center justify-between gap-3 font-mono text-xs shadow-md">
            <div className="flex items-center gap-2.5 truncate">
              <span className="text-tai-accent font-bold">$</span>
              <span className="text-tai-text truncate">npx thinkai-ui init</span>
              <span className="text-tai-muted hidden sm:inline"># initialize in current project</span>
            </div>
            <motion.button
              onClick={copyCli}
              whileTap={{ scale: 0.96 }}
              className="px-2.5 py-1 bg-tai-text hover:opacity-90 text-tai-bg font-mono font-bold text-[10px] uppercase tracking-wider shrink-0 transition-colors"
            >
              {copiedCli ? "COPIED" : "COPY"}
            </motion.button>
          </div>

          {/* Authentic Registry Status */}
          <div className="flex items-center gap-3 font-mono text-[11px] text-tai-muted bg-tai-card border border-tai-border p-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tai-accent shadow-[0_0_8px_var(--tai-accent)] animate-pulse" />
              <span className="text-tai-text font-bold">REGISTRY ONLINE</span>
            </div>
            <span className="text-tai-subtle">|</span>
            <span>v1.0.0</span>
            <span className="text-tai-subtle">|</span>
            <span>55 PRIMITIVES</span>
            <span className="text-tai-subtle">|</span>
            <span className="text-tai-accent font-bold">MIT LICENSE</span>
          </div>
        </motion.div>

        {/* 4-COLUMN DEVELOPER SITE MAP */}
        <motion.div
          variants={colVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 font-sans text-xs"
        >
          
          {/* Col 1: Brand & Founder */}
          <motion.div variants={colItemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src="/images/thinkai_studio_logo.png"
                  alt="ThinkAI Studio"
                  fill
                  sizes="24px"
                  className="tai-brand-mark object-contain"
                />
              </div>
              <span className="font-mono text-sm font-bold uppercase tracking-wider text-tai-text">
                ThinkAI Studio UI
              </span>
            </div>
            <p className="text-tai-muted font-sans leading-relaxed">
              Architectural zero-radius developer registry engineered with obsidian monochromatic depth, Venice Sapphire luminance, and calibrated tectonic motion.
            </p>
            <div className="font-mono text-[11px] text-tai-subtle pt-1">
              Authored by{" "}
              <a
                href="https://binhminh.thinkai.id.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tai-accent hover:underline font-bold"
              >
                Nguyen Binh Minh
              </a>{" "}
              (Founder &amp; DevOps Engineer).
            </div>
          </motion.div>

          {/* Col 2: Navigation */}
          <motion.div variants={colItemVariants}>
            <div className="font-mono text-[11px] font-bold text-tai-text uppercase tracking-widest mb-4 border-b border-tai-border pb-2">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-tai-muted">
              <li>
                <a href="#showcase" className="hover:text-tai-accent transition-colors">
                  01 · Signature Primitives
                </a>
              </li>
              <li>
                <a href="#principles" className="hover:text-tai-accent transition-colors">
                  02 · Architectural Principles
                </a>
              </li>
              <li>
                <Link href="/docs" className="hover:text-tai-accent transition-colors">
                  03 · Documentation Hub
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="hover:text-tai-accent transition-colors">
                  04 · CLI Installation
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Col 3: Resources & Source */}
          <motion.div variants={colItemVariants}>
            <div className="font-mono text-[11px] font-bold text-tai-text uppercase tracking-widest mb-4 border-b border-tai-border pb-2">
              RESOURCES
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-tai-muted">
              <li>
                <Link href="/docs" className="hover:text-tai-accent flex items-center gap-1 transition-colors">
                  <span>Documentation</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ThinkAI-Studio/thinkai-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tai-text flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ThinkAI-Studio/thinkai-ui/blob/master/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tai-text transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-tai-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Engine & Ecosystem */}
          <motion.div variants={colItemVariants}>
            <div className="font-mono text-[11px] font-bold text-tai-text uppercase tracking-widest mb-4 border-b border-tai-border pb-2">
              ECOSYSTEM STACK
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-tai-muted">
              <li className="flex items-center justify-between">
                <span>React 19 Engine</span>
                <span className="text-tai-subtle font-mono text-[10px]">Server Components</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Next.js 16</span>
                <span className="text-tai-subtle font-mono text-[10px]">Turbopack</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tailwind CSS</span>
                <span className="text-tai-subtle font-mono text-[10px]">v4 @theme</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Motion 13</span>
                <span className="text-tai-subtle font-mono text-[10px]">Tectonic Spring</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Zero Radius</span>
                <span className="text-tai-accent font-mono text-[10px]">0px Strict</span>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* BOTTOM COPYRIGHT & ARCHITECTURAL WATERMARK */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.4 }}
          className="pt-8 border-t border-tai-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-tai-subtle"
        >
          <div>
            © 2026 ThinkAI Studio · All architectural rights reserved.
          </div>
          <div className="flex items-center gap-2 text-tai-subtle">
            <span className="text-tai-accent">0PX SPECIFICATION</span>
            <span>·</span>
            <span>WCAG 2.2 AA</span>
            <span>·</span>
            <span>VENICE SAPPHIRE</span>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
}
