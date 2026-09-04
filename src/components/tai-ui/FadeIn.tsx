"use client";

import { motion, useReducedMotion } from "motion/react";

export function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: 0, y: reduced ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className={className}>{children}</motion.div>;
}
