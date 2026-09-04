"use client";

import { motion, useReducedMotion } from "motion/react";

export function Highlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <span className={`relative inline ${className}`}><motion.span aria-hidden="true" initial={{ scaleX: reduced ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.38, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-x-0 bottom-0 -z-0 h-[0.5em] origin-left bg-tai-accent/25" /><span className="relative">{children}</span></span>;
}
