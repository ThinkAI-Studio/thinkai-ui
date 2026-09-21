"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export interface TaiSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  description?: string;
}

export const TaiSwitch = React.forwardRef<HTMLInputElement, TaiSwitchProps>(
  ({ className, id, label, description, checked, defaultChecked, onChange, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;
    const prefersReduced = useReducedMotion();

    const [internalChecked, setInternalChecked] = React.useState<boolean>(
      checked !== undefined ? checked : defaultChecked ?? false
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "group flex cursor-pointer items-start justify-between gap-4 font-sans text-sm text-tai-muted select-none",
          disabled && "cursor-not-allowed opacity-45",
          className
        )}
      >
        <span className="min-w-0">
          <span className="block text-tai-text font-medium">{label}</span>
          {description && <span className="mt-1 block text-xs leading-5 text-tai-subtle">{description}</span>}
        </span>
        <span
          className={cn(
            "relative mt-0.5 h-6 w-11 shrink-0 border border-tai-border bg-tai-bg transition-colors duration-200 group-hover:border-tai-accent group-focus-within:ring-2 group-focus-within:ring-tai-focus/30",
            isChecked && "border-tai-accent bg-tai-accent/15"
          )}
          style={{ borderRadius: 0 }}
        >
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="peer absolute inset-0 cursor-pointer opacity-0"
            {...props}
          />
          {/* Mechanical Detent Thumb Glider */}
          <motion.span
            className={cn(
              "pointer-events-none absolute left-1 top-1 h-4 w-4",
              isChecked ? "bg-tai-accent" : "bg-tai-subtle"
            )}
            style={{ borderRadius: 0 }}
            animate={
              prefersReduced
                ? { x: isChecked ? 20 : 0 }
                : {
                    x: isChecked ? 20 : 0,
                  }
            }
            whileTap={
              prefersReduced || disabled
                ? undefined
                : {
                    scaleX: 1.12,
                    scaleY: 0.94,
                  }
            }
            transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.detent}
          />
        </span>
      </label>
    );
  }
);

TaiSwitch.displayName = "TaiSwitch";
