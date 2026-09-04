"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function TaiPopover({ trigger, children, open, defaultOpen = false, onOpenChange, className }: { trigger: React.ReactNode; children: React.ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; className?: string }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const setOpen = React.useCallback((next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); }, [onOpenChange, open]);
  React.useEffect(() => { if (!isOpen) return; const close = (event: MouseEvent) => { if (!(event.target as HTMLElement).closest("[data-tai-popover]")) setOpen(false); }; document.addEventListener("click", close); return () => document.removeEventListener("click", close); }, [isOpen, setOpen]);
  React.useEffect(() => { if (!isOpen) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [isOpen, setOpen]);
  return <div data-tai-popover className={cn("relative inline-flex", className)}><button type="button" aria-expanded={isOpen} onClick={() => setOpen(!isOpen)} className="focus-visible:outline-2 focus-visible:outline-tai-focus">{trigger}</button>{isOpen && <div role="dialog" className="absolute left-0 top-full z-30 mt-2 min-w-56 border border-tai-border bg-tai-sheet p-4 text-sm text-tai-text shadow-xl">{children}</div>}</div>;
}
