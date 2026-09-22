"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

/**
 * 1. KineticCheckmark
 * SVG path-length drawing with micro-scale overshoot and status glow.
 */
export interface KineticCheckmarkProps {
  className?: string;
  size?: number;
  trigger?: boolean;
}

export function KineticCheckmark({
  className,
  size = 18,
  trigger = true,
}: KineticCheckmarkProps) {
  const prefersReduced = useReducedMotion();

  const pathVariants: Variants = {
    unchecked: { pathLength: 0, opacity: 0 },
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: prefersReduced
        ? { duration: 0 }
        : {
            pathLength: TAI_PHYSICS.laser,
            opacity: { duration: 0.1 },
          },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      initial={prefersReduced ? "checked" : "unchecked"}
      animate={trigger ? "checked" : "unchecked"}
      className={cn("text-tai-success shrink-0 select-none", className)}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center center",
      }}
      aria-hidden="true"
    >
      <motion.path d="M4.5 12.5L9.5 17.5L19.5 6.5" variants={pathVariants} />
    </motion.svg>
  );
}

/**
 * 2. KineticChevron
 * Authoritative mechanical rotation with recoil detent overshoot.
 */
export interface KineticChevronProps {
  expanded?: boolean;
  angle?: 90 | 180;
  className?: string;
  size?: number;
}

export function KineticChevron({
  expanded = false,
  angle = 180,
  className,
  size = 18,
}: KineticChevronProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn("text-tai-subtle shrink-0 select-none", className)}
      animate={{
        rotate: expanded ? angle : 0,
      }}
      transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.tectonic}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center center",
      }}
      aria-hidden="true"
    >
      <path d="M6 9L12 15L18 9" />
    </motion.svg>
  );
}

/**
 * 3. KineticCopy
 * Morphing clipboard-to-checkmark transition with spring pop and auto-reset.
 */
export interface KineticCopyProps {
  value: string;
  className?: string;
  size?: number;
  onCopy?: () => void;
}

export function KineticCopy({ value, className, size = 16, onCopy }: KineticCopyProps) {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [value, onCopy]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied to clipboard" : "Copy to clipboard"}
      aria-label={copied ? "Copied" : "Copy"}
      className={cn(
        "relative grid place-items-center h-8 w-8 border border-tai-border bg-tai-card text-tai-muted hover:text-tai-text hover:border-tai-border-strong transition-colors select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-tai-focus",
        copied && "border-tai-success/40 text-tai-success",
        className
      )}
      style={{ borderRadius: "var(--tai-radius-sm)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            className="grid place-items-center"
            initial={prefersReduced ? { opacity: 1 } : { scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { scale: 0.75, opacity: 0 }}
            transition={TAI_PHYSICS.microswitch}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="text-tai-success"
            >
              <motion.path
                d="M4.5 12.5L9.5 17.5L19.5 6.5"
                initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={TAI_PHYSICS.laser}
              />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="grid place-items-center"
            initial={prefersReduced ? { opacity: 1 } : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { scale: 0.85, opacity: 0 }}
            transition={TAI_PHYSICS.microswitch}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M5 15H4V4h11v1" />
              <rect x="8" y="8" width="12" height="12" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/**
 * 4. KineticTerminalIcon
 * Architectural CLI prompt icon with forward kick chevron and blinking cursor.
 */
export function KineticTerminalIcon({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <span
      className={cn("inline-flex items-center justify-center select-none cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <motion.path
          d="M4 17l6-5-6-5"
          animate={{ x: isHovered && !prefersReduced ? 2 : 0 }}
          transition={TAI_PHYSICS.microswitch}
        />
        <motion.path
          d="M12 19h8"
          animate={
            prefersReduced
              ? { opacity: 1 }
              : isHovered
                ? { opacity: 1, stroke: "var(--color-tai-accent)" }
                : { opacity: [1, 1, 0, 0] }
          }
          transition={
            isHovered || prefersReduced
              ? { duration: 0.2 }
              : { duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.51, 1] }
          }
        />
      </svg>
    </span>
  );
}

/**
 * 5. KineticSearchIcon
 * Monospace optical reticle with lens focus shift on hover.
 */
export function KineticSearchIcon({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <span
      className={cn("inline-flex items-center justify-center select-none cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <motion.rect
          x="3"
          y="3"
          width="11"
          height="11"
          animate={
            isHovered && !prefersReduced
              ? { scale: 1.08, stroke: "var(--color-tai-accent)" }
              : { scale: 1 }
          }
          transition={TAI_PHYSICS.microswitch}
          style={{ transformBox: "fill-box", transformOrigin: "center center" }}
        />
        <motion.path
          d="M21 21l-7-7"
          animate={isHovered && !prefersReduced ? { x: 1, y: 1 } : { x: 0, y: 0 }}
          transition={TAI_PHYSICS.microswitch}
        />
      </svg>
    </span>
  );
}

/**
 * 6. KineticTrashIcon
 * Industrial bin with mechanical 2px lid lift on hover.
 */
export function KineticTrashIcon({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <span
      className={cn("inline-flex items-center justify-center select-none cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* Lid: Elevates 2px and slightly rotates on hover */}
        <motion.g
          animate={
            isHovered && !prefersReduced
              ? { y: -2, rotate: -4 }
              : { y: 0, rotate: 0 }
          }
          transition={TAI_PHYSICS.microswitch}
          style={{ transformBox: "fill-box", transformOrigin: "bottom left" }}
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
        </motion.g>
        {/* Bin Frame */}
        <path d="M19 6v14H5V6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>
    </span>
  );
}
