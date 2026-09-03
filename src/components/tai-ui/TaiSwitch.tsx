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
      <label htmlFor={switchId} className={cn("group flex cursor-pointer items-start justify-between gap-4 font-sans text-sm text-zinc-300", props.disabled && "cursor-not-allowed opacity-45", className)}>
        <span className="min-w-0"><span className="block">{label}</span>{description && <span className="mt-1 block text-xs leading-5 text-zinc-500">{description}</span>}</span>
        <span className="relative mt-0.5 h-6 w-11 shrink-0 border border-white/[0.2] bg-black transition-colors group-hover:border-emerald-400 group-focus-within:ring-2 group-focus-within:ring-emerald-400/30 has-[:checked]:border-emerald-400 has-[:checked]:bg-emerald-400/15">
          <input ref={ref} id={switchId} type="checkbox" role="switch" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />
          <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 bg-zinc-500 transition-transform peer-checked:translate-x-5 peer-checked:bg-emerald-300" />
        </span>
      </label>
    );
  },
);

TaiSwitch.displayName = "TaiSwitch";
