"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TaiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const TaiInput = React.forwardRef<HTMLInputElement, TaiInputProps>(
  ({ className, id, label, description, error, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <label className="block space-y-2 font-sans text-sm text-tai-muted" htmlFor={inputId}>
        {label && <span className="block font-mono text-[10px] uppercase tracking-widest text-tai-subtle">{label}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "block min-h-11 w-full border border-tai-border bg-tai-bg px-3 py-2.5 text-sm text-tai-text outline-none transition-[border-color,background-color] placeholder:text-tai-subtle focus-visible:border-tai-focus focus-visible:ring-2 focus-visible:ring-tai-focus/30 disabled:cursor-not-allowed disabled:opacity-45",
            error ? "border-amber-600" : "hover:border-tai-border-strong",
            className,
          )}
          {...props}
        />
        {description && <span id={descriptionId} className="block min-h-[1lh] text-xs leading-5 text-tai-subtle">{description}</span>}
        {error && <span id={errorId} className="block min-h-[1lh] text-xs leading-5 text-tai-warning">{error}</span>}
      </label>
    );
  },
);

TaiInput.displayName = "TaiInput";
