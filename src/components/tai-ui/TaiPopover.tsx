"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export interface TaiPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function TaiPopover({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: TaiPopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const prefersReduced = useReducedMotion();

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange, open]
  );

  React.useEffect(() => {
    if (!isOpen) return;
    const close = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("[data-tai-popover]")) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isOpen, setOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [isOpen, setOpen]);

  return (
    <div data-tai-popover className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className="focus-visible:outline-2 focus-visible:outline-tai-focus"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
            transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.airlock}
            className="absolute left-0 top-full z-30 mt-2 min-w-56 border border-tai-border bg-tai-sheet p-4 text-sm text-tai-text shadow-xl"
            style={{ borderRadius: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
