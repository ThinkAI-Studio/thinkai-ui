"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function SkeletonShimmer({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return <motion.span aria-hidden="true" animate={reduced ? undefined : { backgroundPosition: ["200% 0", "-100% 0"] }} transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "linear" }} className={cn("block bg-[linear-gradient(90deg,var(--tai-surface),color-mix(in_srgb,var(--tai-text)_10%,var(--tai-surface)),var(--tai-surface))] bg-[length:200%_100%]", className)} />;
}
