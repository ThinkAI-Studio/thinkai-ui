"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export interface TaiCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  description?: string;
}

export const TaiCheckbox = React.forwardRef<HTMLInputElement, TaiCheckboxProps>(
  ({ className, id, label, description, checked, defaultChecked, onChange, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
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
        htmlFor={checkboxId}
        className={cn(
          "group flex cursor-pointer items-start gap-3 font-sans text-sm text-tai-muted select-none",
          disabled && "cursor-not-allowed opacity-45",
          className
        )}
      >
        <motion.span
          whileTap={prefersReduced || disabled ? undefined : { scale: 0.94 }}
          transition={TAI_PHYSICS.microswitch}
          className={cn(
            "relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-tai-border bg-tai-bg transition-colors duration-200 group-hover:border-tai-accent group-focus-within:ring-2 group-focus-within:ring-tai-focus/30",
            isChecked && "border-tai-accent bg-tai-accent/15"
          )}
          style={{ borderRadius: 0 }}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="peer absolute inset-0 cursor-pointer opacity-0"
            {...props}
          />
          {/* Architectural SVG Checkmark with Laser Path Drawing */}
          <svg
            className="pointer-events-none h-3.5 w-3.5 text-tai-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <motion.path
              d="M4.5 12.5L9.5 17.5L19.5 6.5"
              initial={false}
              animate={
                prefersReduced
                  ? { opacity: isChecked ? 1 : 0, pathLength: isChecked ? 1 : 0 }
                  : {
                      pathLength: isChecked ? 1 : 0,
                      opacity: isChecked ? 1 : 0,
                    }
              }
              transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.laser}
            />
          </svg>
        </motion.span>
        <span className="min-w-0">
          <span className="block text-tai-text font-medium">{label}</span>
          {description && <span className="mt-1 block text-xs leading-5 text-tai-subtle">{description}</span>}
        </span>
      </label>
    );
  }
);

TaiCheckbox.displayName = "TaiCheckbox";
