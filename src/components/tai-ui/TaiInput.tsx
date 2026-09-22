"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export interface TaiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const TaiInput = React.forwardRef<HTMLInputElement, TaiInputProps>(
  ({ className, id, label, description, error, onFocus, onBlur, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
    const prefersReduced = useReducedMotion();

    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <label className="block space-y-2 font-sans text-sm text-tai-muted" htmlFor={inputId}>
        {label && <span className="block font-mono text-[10px] uppercase tracking-widest text-tai-subtle">{label}</span>}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              "block min-h-11 w-full border border-tai-border bg-tai-bg px-3 py-2.5 text-sm text-tai-text outline-none transition-[border-color,background-color] placeholder:text-tai-subtle focus-visible:border-tai-focus focus-visible:ring-1 focus-visible:ring-tai-focus/30 disabled:cursor-not-allowed disabled:opacity-45",
              error ? "border-tai-warning/80" : "hover:border-tai-border-strong",
              className,
            )}
            style={{ borderRadius: "var(--tai-radius-md)" }}
            {...props}
          />
          {/* Symmetrical Laser Hairline Focus Expansion */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ scaleX: isFocused ? 1 : 0 }}
            transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.laser}
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-center",
              error ? "bg-tai-warning" : "bg-tai-accent"
            )}
          />
        </div>
        {description && <span id={descriptionId} className="block min-h-[1lh] text-xs leading-5 text-tai-subtle">{description}</span>}
        {error && <span id={errorId} className="block min-h-[1lh] text-xs leading-5 text-tai-warning">{error}</span>}
      </label>
    );
  },
);

TaiInput.displayName = "TaiInput";
