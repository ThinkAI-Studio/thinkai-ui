"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function TaiBottomSheet({ open, onOpenChange, title, children, className }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const sheetRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const parent = sheetRef.current?.parentElement;
    const inertSiblings = parent ? Array.from(parent.children).filter((element) => element !== sheetRef.current && !element.hasAttribute("data-tai-sheet-backdrop")) : [];
    document.body.style.overflow = "hidden";
    inertSiblings.forEach((element) => element.setAttribute("inert", ""));
    requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onOpenChange(false); return; }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); inertSiblings.forEach((element) => element.removeAttribute("inert")); previousActive?.focus(); };
  }, [onOpenChange, open]);
  return <AnimatePresence>{open && <div className="fixed inset-0 z-50" role="presentation"><motion.div data-tai-sheet-backdrop aria-hidden="true" onClick={() => onOpenChange(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-tai-bg/75" /><motion.section ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="tai-bottom-sheet-title" initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : 18 }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 28 }} className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto border-t border-tai-border bg-tai-sheet p-5 shadow-2xl sm:p-8", className)}><div className="mx-auto flex max-w-2xl items-start justify-between gap-4"><h2 id="tai-bottom-sheet-title" className="font-mono text-lg font-bold uppercase text-tai-text">{title}</h2><button type="button" aria-label="Close sheet" onClick={() => onOpenChange(false)} className="p-1 text-tai-muted hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"><X className="h-5 w-5" /></button></div><div className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-tai-muted">{children}</div></motion.section></div>}</AnimatePresence>;
}
