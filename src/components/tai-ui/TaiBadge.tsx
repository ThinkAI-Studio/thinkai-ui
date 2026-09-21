import React from "react";
import { cn } from "@/lib/utils";

export interface TaiBadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning";
  className?: string;
}

export function TaiBadge({ children, tone = "neutral", className }: TaiBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px active:scale-[0.98] select-none",
        tone === "accent" && "border-tai-accent/50 text-tai-accent",
        tone === "success" && "border-tai-success/50 text-tai-success",
        tone === "warning" && "border-tai-warning/50 text-tai-warning",
        tone === "neutral" && "border-tai-border text-tai-muted",
        className
      )}
      style={{ borderRadius: 0 }}
    >
      {children}
    </span>
  );
}
