"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TaiSelectOption = { label: string; value: string; disabled?: boolean };

export interface TaiSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: TaiSelectOption[];
}

export const TaiSelect = React.forwardRef<HTMLSelectElement, TaiSelectProps>(
  ({ className, id, label, description, error, options, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const descriptionId = description ? `${selectId}-description` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <label className="block space-y-2 font-sans text-sm text-zinc-300" htmlFor={selectId}>
        {label && <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>}
        <span className="relative block">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "block min-h-11 w-full appearance-none border bg-black px-3 py-2.5 pr-10 text-sm text-white outline-none transition-[border-color,background-color] focus-visible:border-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-45",
              error ? "border-amber-300/70" : "border-white/[0.14] hover:border-white/[0.26]",
              className,
            )}
            {...props}
          >
            {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        </span>
        {description && <span id={descriptionId} className="block text-xs leading-5 text-zinc-500">{description}</span>}
        {error && <span id={errorId} className="block text-xs leading-5 text-amber-200">{error}</span>}
      </label>
    );
  },
);

TaiSelect.displayName = "TaiSelect";
