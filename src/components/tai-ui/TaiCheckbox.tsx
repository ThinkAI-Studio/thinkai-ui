"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TaiCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  description?: string;
}

export const TaiCheckbox = React.forwardRef<HTMLInputElement, TaiCheckboxProps>(
  ({ className, id, label, description, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    return (
      <label htmlFor={checkboxId} className={cn("group flex cursor-pointer items-start gap-3 font-sans text-sm text-tai-muted", props.disabled && "cursor-not-allowed opacity-45", className)}>
        <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-tai-border bg-tai-bg transition-colors group-hover:border-tai-accent group-focus-within:ring-2 group-focus-within:ring-tai-focus/30">
          <input ref={ref} id={checkboxId} type="checkbox" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />
          <Check className="h-3.5 w-3.5 scale-0 text-tai-accent transition-transform peer-checked:scale-100" aria-hidden="true" />
        </span>
        <span className="min-w-0"><span className="block">{label}</span>{description && <span className="mt-1 block text-xs leading-5 text-tai-subtle">{description}</span>}</span>
      </label>
    );
  },
);

TaiCheckbox.displayName = "TaiCheckbox";
