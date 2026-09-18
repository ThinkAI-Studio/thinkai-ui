"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Code2, Zap } from "lucide-react";
import { TAI_EASE } from "@/lib/motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: TAI_EASE.luxury },
  },
};

export function ArchitecturalPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const pillars = [
    {
      icon: ShieldCheck,
      number: "01",
      title: "0px Strict Geometry",
      tag: "ORTHOGONAL PRECISION",
      description:
        "No bubbly rounded pills or distorted corner padding. Every primitive honors strict 90° orthogonal intersections that align naturally with monospace code editors and technical tooling.",
    },
    {
      icon: Code2,
      number: "02",
      title: "100% Source Ownership",
      tag: "ZERO LOCK-IN",
      description:
        "Pure TypeScript and Tailwind CSS v4 source code copied directly into your repository. You retain complete sovereignty: tweak any token, animation curve, or Radix prop without restriction.",
    },
    {
      icon: Zap,
      number: "03",
      title: "React 19 & Turbopack",
      tag: "INFRASTRUCTURE GRADE",
      description:
        "Engineered natively for React 19 Server Components and Next.js 16 Turbopack with sub-millisecond hot module reload and zero client bundle overhead for static primitives.",
    },
  ];

  return (
    <section id="principles" className="py-20 px-4 sm:px-8 max-w-[1400px] mx-auto border-b border-tai-border">
      
      {/* Section Header */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: TAI_EASE.luxury }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-tai-accent">
          <span className="w-1.5 h-1.5 bg-tai-accent shadow-[0_0_6px_var(--tai-accent)]" />
          <span className="uppercase tracking-widest font-bold">CORE CONVICTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-tai-text mb-2">
          Architectural Principles
        </h2>
        <p className="text-sm text-tai-muted font-sans max-w-xl">
          Three non-negotiable standards that distinguish ThinkAI Studio from generic SaaS component templates.
        </p>
      </motion.div>

      {/* 3-Column Pillar Cards — staggered */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.number}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.22, ease: TAI_EASE.snappy }}
              className="bg-tai-card border border-tai-border hover:border-tai-accent p-6 flex flex-col justify-between transition-colors group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 bg-tai-surface border border-tai-border group-hover:border-tai-accent text-tai-accent transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-tai-subtle uppercase tracking-widest">
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-tai-text mb-2 group-hover:text-tai-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-tai-muted font-sans leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-tai-border font-mono text-[10px] text-tai-subtle">
                PILLAR // {p.number}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
