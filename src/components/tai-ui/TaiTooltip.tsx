"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function TaiTooltip({ label, children, className }: { label: string; children: React.ReactElement; className?: string }) {
  return <span className={cn("group relative inline-flex", className)}><span aria-describedby={`tooltip-${label.replace(/[^a-z0-9]+/gi, "-")}`}>{children}</span><span id={`tooltip-${label.replace(/[^a-z0-9]+/gi, "-")}`} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap border border-tai-border bg-tai-card px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-tai-text opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">{label}</span></span>;
}
