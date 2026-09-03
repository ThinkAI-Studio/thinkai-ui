"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function NumberFlow({ value, className = "" }: { value: number | string; className?: string }) {
  const prefersReduced = useReducedMotion();
  return <span className={className} aria-live="polite"><motion.span key={String(value)} initial={{ opacity: 0, y: prefersReduced ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 24 }} className="inline-block">{value}</motion.span></span>;
}
