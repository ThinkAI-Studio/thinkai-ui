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
  { value: "sharp", label: "0", tooltip: "Sharp (0px) — Pure 90° Brutalism" },
  { value: "machined", label: "2", tooltip: "Machined (2px) — Default Precision Chamfer" },
  { value: "smooth", label: "4", tooltip: "Smooth (4px) — Modern Engineering Radius" },
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
      style={{ borderRadius: "var(--tai-radius-sm, 2px)" }}
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
              className={`relative px-1.5 py-0.5 text-xs font-mono transition-colors duration-150 cursor-pointer ${
                isActive
                  ? "text-tai-text font-bold"
                  : "text-tai-muted hover:text-tai-text"
              }`}
              style={{ borderRadius: "var(--tai-radius-sm, 1.5px)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="radius-active-glider"
                  transition={TAI_PHYSICS.detent}
                  className="absolute inset-0 bg-tai-card border border-tai-border-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  style={{ borderRadius: "var(--tai-radius-sm, 1.5px)" }}
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
