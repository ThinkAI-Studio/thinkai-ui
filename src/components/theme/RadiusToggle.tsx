"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useRadius, type RadiusPreference } from "./RadiusProvider";
import { TAI_PHYSICS } from "@/lib/motion";

interface RadiusOption {
  value: RadiusPreference;
  label: string;
  tooltip: string;
}

const RADIUS_OPTIONS: readonly RadiusOption[] = [
  { value: "0", label: "0", tooltip: "Sharp (0px) — Architectural 90° Geometry" },
  { value: "12", label: "12", tooltip: "Fillet (12px) — Default Precision Fillet" },
];

export function RadiusToggle({ className = "" }: { className?: string }) {
  const { radius, setRadius } = useRadius();
  const mounted = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  return (
    <div
      role="radiogroup"
      aria-label="Border radius geometry switcher"
      className={`inline-flex items-center p-0.5 bg-tai-surface/60 border border-tai-border text-[10px] font-mono select-none ${className}`}
      style={{ borderRadius: "var(--tai-radius-sm, 8px)" }}
    >
      <span className="px-1.5 text-tai-subtle font-bold tracking-wider uppercase text-[9px]">
        R
      </span>
      <div className="flex items-center gap-0.5">
        {RADIUS_OPTIONS.map((opt) => {
          const isActive = mounted && radius === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              title={opt.tooltip}
              onClick={() => setRadius(opt.value)}
              className={`relative px-2 py-0.5 text-xs font-mono transition-colors duration-150 cursor-pointer ${
                isActive
                  ? "text-tai-text font-bold"
                  : "text-tai-muted hover:text-tai-text"
              }`}
              style={{ borderRadius: "var(--tai-radius-sm, 6px)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="radius-active-glider"
                  transition={TAI_PHYSICS.detent}
                  className="absolute inset-0 bg-tai-card border border-tai-border-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  style={{ borderRadius: "var(--tai-radius-sm, 6px)" }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
