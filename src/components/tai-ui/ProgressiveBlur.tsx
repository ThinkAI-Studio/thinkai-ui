"use client";

import { motion, useReducedMotion } from "motion/react";

export function ProgressiveBlur({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: 0, filter: reduced ? "blur(0px)" : "blur(5px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className={className}>{children}</motion.div>;
}
