"use client";

import { motion, useReducedMotion } from "motion/react";

export function StaggerGroup({ children, className = "", delay = 0.05 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : delay } } }} className={className}>{children}</motion.div>;
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div variants={{ hidden: { opacity: 0, y: reduced ? 0 : 6 }, show: { opacity: 1, y: 0 } }} transition={reduced ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className={className}>{children}</motion.div>;
}
