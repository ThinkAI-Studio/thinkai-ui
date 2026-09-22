"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export type TaiSelectOption = { label: string; value: string; disabled?: boolean };

export interface TaiSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: TaiSelectOption[];
}

export const TaiSelect = React.forwardRef<HTMLSelectElement, TaiSelectProps>(
  ({ className, id, label, description, error, options, onFocus, onBlur, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const descriptionId = description ? `${selectId}-description` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
    const prefersReduced = useReducedMotion();

    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <label className="block space-y-2 font-sans text-sm text-tai-muted" htmlFor={selectId}>
        {label && <span className="block font-mono text-[10px] uppercase tracking-widest text-tai-subtle">{label}</span>}
        <span className="relative block">
          <select
            ref={ref}
            id={selectId}
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
              "block min-h-11 w-full appearance-none border border-tai-border bg-tai-bg px-3 py-2.5 pr-10 text-sm text-tai-text outline-none transition-[border-color,background-color] focus-visible:border-tai-focus focus-visible:ring-1 focus-visible:ring-tai-focus/30 disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer",
              error ? "border-tai-warning/80" : "hover:border-tai-border-strong",
              className,
            )}
            style={{ borderRadius: "var(--tai-radius-md)" }}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Kinetic Indicator Chevron */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-tai-subtle"
            animate={{
              rotate: isFocused ? 180 : 0,
            }}
            transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.microswitch}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>

          {/* Laser Hairline Focus Expansion */}
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
        </span>
        {description && <span id={descriptionId} className="block min-h-[1lh] text-xs leading-5 text-tai-subtle">{description}</span>}
        {error && <span id={errorId} className="block min-h-[1lh] text-xs leading-5 text-tai-warning">{error}</span>}
      </label>
    );
  },
);

TaiSelect.displayName = "TaiSelect";
