"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TaiDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function TaiDialog({ open, defaultOpen = false, onOpenChange, title, description, children, className }: TaiDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const prefersReduced = useReducedMotion();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const isOpen = open ?? internalOpen;
  const close = React.useCallback(() => { if (open === undefined) setInternalOpen(false); onOpenChange?.(false); }, [onOpenChange, open]);

  React.useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousActive = document.activeElement as HTMLElement | null;
    const parent = dialogRef.current?.parentElement;
    const inertSiblings = parent ? Array.from(parent.children).filter((element) => element !== dialogRef.current && !element.hasAttribute("data-tai-dialog-backdrop")) : [];
    document.body.style.overflow = "hidden";
    inertSiblings.forEach((element) => element.setAttribute("inert", ""));
    window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("button, [href], input, select, textarea")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, [href], input, select, textarea"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); inertSiblings.forEach((element) => element.removeAttribute("inert")); previousActive?.focus(); };
  }, [close, isOpen]);

  return <AnimatePresence>{isOpen && <div className="fixed inset-0 z-50 grid place-items-center p-4" role="presentation"><motion.div data-tai-dialog-backdrop aria-hidden="true" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: prefersReduced ? 0 : 0.18 }} className="absolute inset-0 cursor-default bg-tai-bg/75" /><motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="tai-dialog-title" aria-describedby={description ? "tai-dialog-description" : undefined} initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReduced ? 0 : 10 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 }} className={cn("relative w-full max-w-lg border border-tai-border bg-tai-sheet p-5 text-tai-text shadow-2xl sm:p-7", className)}><div className="flex items-start justify-between gap-4"><div><h2 id="tai-dialog-title" className="font-mono text-lg font-bold uppercase tracking-tight text-tai-text">{title}</h2>{description && <p id="tai-dialog-description" className="mt-2 text-sm leading-6 text-tai-muted">{description}</p>}</div><button type="button" onClick={close} aria-label="Close dialog" className="shrink-0 p-1 text-tai-subtle transition-colors hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"><X className="h-5 w-5" /></button></div><div className="mt-6">{children}</div></motion.div></div>}</AnimatePresence>;
}
