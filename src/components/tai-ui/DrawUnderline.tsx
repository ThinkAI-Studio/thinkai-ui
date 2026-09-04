"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function DrawUnderline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  return <span className={`group relative inline-block ${className}`}><span>{children}</span><motion.span aria-hidden="true" initial={{ scaleX: prefersReduced ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={prefersReduced ? { duration: 0 } : { duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-x-0 -bottom-1 h-px origin-left bg-tai-accent" /></span>;
}
