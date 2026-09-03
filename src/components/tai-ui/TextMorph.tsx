"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function TextMorph({ text, className = "" }: { text: string; className?: string }) {
  const prefersReduced = useReducedMotion();
  return <span className={className} aria-live="polite"><AnimatePresence initial={false} mode="wait"><motion.span key={text} initial={{ opacity: 0, y: prefersReduced ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReduced ? 0 : -5 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.18 }} className="inline-block">{text}</motion.span></AnimatePresence></span>;
}
