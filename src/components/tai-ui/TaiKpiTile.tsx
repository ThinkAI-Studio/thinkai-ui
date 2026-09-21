"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaiSparkline } from "./TaiSparkline";

export interface TaiKpiTileProps {
  title: string;
  value: string | number;
  unit?: string;
  delta?: {
    value: string;
    trend: "up" | "down" | "neutral";
    isPositive?: boolean; // If true, up is good (green), if false up might be bad (e.g. latency)
  };
  sparklineData?: number[];
  sparklineColor?: "accent" | "success" | "warning" | "danger" | "neutral";
  statusBadge?: React.ReactNode;
  description?: string;
  className?: string;
}

export function TaiKpiTile({
  title,
  value,
  unit,
  delta,
  sparklineData,
  sparklineColor,
  statusBadge,
  description,
  className,
}: TaiKpiTileProps) {
  // Determine delta color tone
  let deltaToneClass = "text-tai-muted border-tai-border";
  if (delta) {
    const isGood = delta.isPositive !== undefined
      ? delta.isPositive
      : delta.trend === "up";
      
    if (delta.trend === "neutral") {
      deltaToneClass = "text-tai-subtle border-tai-border";
    } else if (isGood) {
      deltaToneClass = "text-tai-success border-tai-success/40 bg-tai-success/10";
    } else {
      deltaToneClass = "text-tai-danger border-tai-danger/40 bg-tai-danger/10";
    }
  }

  // Auto pick sparkline color if not provided
  const effectiveSparklineColor = sparklineColor || (
    delta?.trend === "up" && (delta.isPositive ?? true)
      ? "success"
      : delta?.trend === "down" && (delta.isPositive ?? false)
      ? "success"
      : delta?.trend === "up" && !(delta.isPositive ?? true)
      ? "danger"
      : "accent"
  );

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between border border-tai-border bg-tai-card p-5 text-tai-text transition-all hover:border-tai-border-strong select-none shadow-sm",
        className
      )}
    >
      {/* Top row: Monospace Title & Status Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-tai-muted truncate">
          {title}
        </span>
        {statusBadge && <div className="shrink-0">{statusBadge}</div>}
      </div>

      {/* Middle row: Large Value & Sparkline */}
      <div className="flex items-baseline justify-between gap-4 my-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-tai-text">
            {value}
          </span>
          {unit && (
            <span className="font-mono text-xs font-medium text-tai-subtle">
              {unit}
            </span>
          )}
        </div>

        {sparklineData && sparklineData.length > 1 && (
          <div className="shrink-0">
            <TaiSparkline
              data={sparklineData}
              width={100}
              height={32}
              color={effectiveSparklineColor}
            />
          </div>
        )}
      </div>

      {/* Bottom row: Delta & Description */}
      {(delta || description) && (
        <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-tai-border/60 text-xs">
          {delta && (
            <div
              className={cn(
                "inline-flex items-center gap-1 border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                deltaToneClass
              )}
            >
              {delta.trend === "up" && <TrendingUp className="w-3 h-3" />}
              {delta.trend === "down" && <TrendingDown className="w-3 h-3" />}
              {delta.trend === "neutral" && <Minus className="w-3 h-3" />}
              <span>{delta.value}</span>
            </div>
          )}

          {description && (
            <span className="font-sans text-[11px] text-tai-muted truncate">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
