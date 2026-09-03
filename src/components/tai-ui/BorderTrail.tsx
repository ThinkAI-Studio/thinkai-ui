"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function BorderTrail({ children, className = "", active = true }: { children: React.ReactNode; className?: string; active?: boolean }) {
  const prefersReduced = useReducedMotion();
  return <div className={cn("relative overflow-hidden border border-white/[0.12]", className)}>{active && !prefersReduced && <motion.span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-emerald-300" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }} />}{children}</div>;
}
