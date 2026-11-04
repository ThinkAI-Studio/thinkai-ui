"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export interface TaiIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const FRAME_VARIANTS = {
  idle: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -0.5 },
  tap: { scale: 0.988, y: 1 },
};

const ICON_VARIANTS = {
  idle: { rotate: 0, scale: 1 },
  hover: { rotate: 0.75, scale: 1.02 },
  tap: { rotate: -0.5, scale: 0.98 },
};

export const TaiIconButton = React.forwardRef<HTMLButtonElement, TaiIconButtonProps>(
  ({ label, className, children, disabled, onKeyDown, onKeyUp, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const [isKeyPressed, setIsKeyPressed] = React.useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === " " || e.key === "Enter") && !disabled) {
        setIsKeyPressed(true);
      }
      onKeyDown?.(e);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        setIsKeyPressed(false);
      }
      onKeyUp?.(e);
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        disabled={disabled}
        animate={isKeyPressed ? "tap" : undefined}
        whileHover={prefersReduced || disabled ? undefined : "hover"}
        whileTap={prefersReduced || disabled ? undefined : "tap"}
        initial="idle"
        variants={FRAME_VARIANTS}
        transition={TAI_PHYSICS.microswitch}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={cn(
          "inline-grid h-11 w-11 place-items-center border border-tai-border bg-tai-sheet text-tai-muted transition-colors hover:border-tai-border-strong hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus disabled:cursor-not-allowed disabled:opacity-40 select-none",
          className
        )}
        style={{ borderRadius: "var(--tai-radius-md)" }}
        {...(props as any)}
      >
        <motion.span
          className="grid place-items-center"
          variants={ICON_VARIANTS}
          transition={TAI_PHYSICS.microswitch}
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

TaiIconButton.displayName = "TaiIconButton";
