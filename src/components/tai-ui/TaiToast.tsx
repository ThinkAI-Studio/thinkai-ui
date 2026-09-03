"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TaiToastProps {
  open: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  onClose: () => void;
  duration?: number;
  className?: string;
}

export function TaiToast({ open, title, description, onClose, duration = 4200, className }: TaiToastProps) {
  const prefersReduced = useReducedMotion();
  React.useEffect(() => { if (!open || duration <= 0) return; const timer = window.setTimeout(onClose, duration); return () => window.clearTimeout(timer); }, [duration, onClose, open]);
  return <AnimatePresence>{open && <motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReduced ? 0 : 8 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 26 }} className={cn("fixed bottom-5 right-5 z-50 flex max-w-[min(360px,calc(100vw-2rem))] items-start gap-3 border border-emerald-400/40 bg-tai-sheet p-4 shadow-2xl", className)}><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><div className="min-w-0 flex-1"><p className="font-mono text-xs font-bold uppercase tracking-wide text-white">{title}</p>{description && <p className="mt-1 text-xs leading-5 text-zinc-400">{description}</p>}</div><button type="button" onClick={onClose} aria-label="Dismiss notification" className="shrink-0 text-zinc-500 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-400"><X className="h-4 w-4" /></button></motion.div>}</AnimatePresence>;
}
