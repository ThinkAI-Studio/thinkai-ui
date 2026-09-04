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
      <label className="block space-y-2 font-sans text-sm text-tai-muted" htmlFor={selectId}>
        {label && <span className="block font-mono text-[10px] uppercase tracking-widest text-tai-subtle">{label}</span>}
        <span className="relative block">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "block min-h-11 w-full appearance-none border border-tai-border bg-tai-bg px-3 py-2.5 pr-10 text-sm text-tai-text outline-none transition-[border-color,background-color] focus-visible:border-tai-focus focus-visible:ring-2 focus-visible:ring-tai-focus/30 disabled:cursor-not-allowed disabled:opacity-45",
              error ? "border-amber-600" : "hover:border-tai-border-strong",
              className,
            )}
            {...props}
          >
            {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tai-subtle" />
        </span>
        {description && <span id={descriptionId} className="block min-h-[1lh] text-xs leading-5 text-tai-subtle">{description}</span>}
        {error && <span id={errorId} className="block min-h-[1lh] text-xs leading-5 text-tai-warning">{error}</span>}
      </label>
    );
  },
);

TaiSelect.displayName = "TaiSelect";
