"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TaiKbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function TaiKbd({
  children,
  size = "md",
  className,
  ...props
}: TaiKbdProps) {
  const sizeStyles = {
    sm: "px-1 py-0.5 text-[9px] min-w-[16px] h-4",
    md: "px-1.5 py-0.5 text-[10px] min-w-[20px] h-5",
    lg: "px-2 py-1 text-xs min-w-[24px] h-6",
  }[size];

  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center font-mono font-bold tracking-tight text-tai-text bg-tai-surface border border-tai-border border-b-2 border-b-tai-border-strong select-none shadow-[0_1px_0_0_rgba(0,0,0,0.2)] active:translate-y-px active:border-b",
        sizeStyles,
        className
      )}
      style={{ borderRadius: "var(--tai-radius-sm)" }}
      {...props}
    >
      {children}
    </kbd>
  );
}
