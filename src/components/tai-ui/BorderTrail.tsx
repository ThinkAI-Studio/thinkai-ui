"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function BorderTrail({ children, className = "", active = true }: { children: React.ReactNode; className?: string; active?: boolean }) {
  const prefersReduced = useReducedMotion();
  return <div className={cn("relative overflow-hidden border border-tai-border", className)}>{active && !prefersReduced && <motion.span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-tai-accent" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2.8, repeat: 0, ease: [0.16, 1, 0.3, 1] }} />}{children}</div>;
}
