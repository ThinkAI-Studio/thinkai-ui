"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { BookOpen, Terminal, ArrowRight } from "lucide-react";
import { TAI_EASE } from "@/lib/motion";

export function DocsHandoffBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 px-4 sm:px-8 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: TAI_EASE.luxury }}
        className="relative overflow-hidden bg-tai-card border border-tai-border p-8 sm:p-12 shadow-xl"
      >
        {/* Ambient Venice Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[#2985b8]/15 blur-[120px]" />

        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: TAI_EASE.luxury, delay: 0.1 }}
            className="flex items-center gap-2 mb-3 font-mono text-[11px] text-tai-accent"
          >
            <span className="w-1.5 h-1.5 bg-tai-accent shadow-[0_0_6px_var(--tai-accent)]" />
            <span className="uppercase tracking-widest font-bold">EXHAUSTIVE DOCUMENTATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.16 }}
            className="text-2xl sm:text-4xl font-bold tracking-tight text-tai-text mb-4 leading-tight"
          >
            The Complete System Lives in the Documentation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: TAI_EASE.luxury, delay: 0.22 }}
            className="text-sm sm:text-base text-tai-muted font-sans leading-relaxed mb-8"
          >
            Detailed API props, raw copy-paste TypeScript source files, CSS token variables (@theme), and step-by-step setup guides are thoroughly documented in our documentation portal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: TAI_EASE.luxury, delay: 0.28 }}
            className="flex flex-wrap items-center gap-3 font-sans text-xs"
          >
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/docs"
                className="px-6 py-3 bg-tai-text hover:opacity-90 text-tai-bg font-semibold flex items-center gap-2 transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4 text-tai-bg" />
                <span>Explore Documentation</span>
                <ArrowRight className="w-3.5 h-3.5 text-tai-bg" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/docs/installation"
                className="px-6 py-3 bg-tai-surface hover:bg-tai-card border border-tai-border hover:border-tai-accent text-tai-text font-semibold flex items-center gap-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-tai-accent" />
                <span>Installation Guide</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
