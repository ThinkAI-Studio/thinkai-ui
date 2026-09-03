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
      <label className="block space-y-2 font-sans text-sm text-zinc-300" htmlFor={inputId}>
        {label && <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "block min-h-11 w-full border bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color,background-color] placeholder:text-zinc-600 focus-visible:border-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-45",
            error ? "border-amber-300/70" : "border-white/[0.14] hover:border-white/[0.26]",
            className,
          )}
          {...props}
        />
        {description && <span id={descriptionId} className="block text-xs leading-5 text-zinc-500">{description}</span>}
        {error && <span id={errorId} className="block text-xs leading-5 text-amber-200">{error}</span>}
      </label>
    );
  },
);

TaiInput.displayName = "TaiInput";
