"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TaiSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  description?: string;
}

export const TaiSwitch = React.forwardRef<HTMLInputElement, TaiSwitchProps>(
  ({ className, id, label, description, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;
    return (
      <label htmlFor={switchId} className={cn("group flex cursor-pointer items-start justify-between gap-4 font-sans text-sm text-tai-muted", props.disabled && "cursor-not-allowed opacity-45", className)}>
        <span className="min-w-0"><span className="block">{label}</span>{description && <span className="mt-1 block text-xs leading-5 text-tai-subtle">{description}</span>}</span>
        <span className="relative mt-0.5 h-6 w-11 shrink-0 border border-tai-border bg-tai-bg transition-colors group-hover:border-tai-accent group-focus-within:ring-2 group-focus-within:ring-tai-focus/30 has-[:checked]:border-tai-accent has-[:checked]:bg-tai-accent/15">
          <input ref={ref} id={switchId} type="checkbox" role="switch" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />
          <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 bg-tai-subtle transition-transform peer-checked:translate-x-5 peer-checked:bg-tai-accent" />
        </span>
      </label>
    );
  },
);

TaiSwitch.displayName = "TaiSwitch";
