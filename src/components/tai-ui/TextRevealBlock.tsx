"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function TextRevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  return <motion.span initial={{ opacity: 0, clipPath: prefersReduced ? "inset(0)" : "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0)" }} viewport={{ once: true, amount: 0.7 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.48, ease: [0.16, 1, 0.3, 1] }} className={`inline-block ${className}`}>{children}</motion.span>;
}
