"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface TaiSparklineProps {
  data: number[];
  width?: number | string;
  height?: number;
  color?: "accent" | "success" | "warning" | "danger" | "neutral";
  fill?: boolean;
  strokeWidth?: number;
  showEndpoints?: boolean;
  className?: string;
}

export function TaiSparkline({
  data = [],
  width = 120,
  height = 36,
  color = "accent",
  fill = true,
  strokeWidth = 1.5,
  showEndpoints = true,
  className,
}: TaiSparklineProps) {
  const gradientId = useId();

  if (!data || data.length < 2) {
    return (
      <div
        style={{ width, height }}
        className={cn("flex items-center justify-center border border-dashed border-tai-border font-mono text-[10px] text-tai-subtle", className)}
      >
        No data
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  
  const paddingX = 4;
  const paddingY = 4;
  const graphWidth = typeof width === "number" ? width : 120;
  const graphHeight = height;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * (graphWidth - paddingX * 2);
    const y = graphHeight - paddingY - ((val - min) / range) * (graphHeight - paddingY * 2);
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10] as const;
  });

  const pathD = points.reduce((acc, [x, y], i) => {
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  const fillD = `${pathD} L ${points[points.length - 1][0]} ${graphHeight} L ${points[0][0]} ${graphHeight} Z`;

  const colorStyles = {
    accent: {
      stroke: "text-tai-accent",
      fillStop: "var(--tai-accent, #2985b8)",
      point: "bg-tai-accent",
    },
    success: {
      stroke: "text-tai-success",
      fillStop: "var(--tai-success, #10b981)",
      point: "bg-tai-success",
    },
    warning: {
      stroke: "text-tai-warning",
      fillStop: "var(--tai-warning, #f59e0b)",
      point: "bg-tai-warning",
    },
    danger: {
      stroke: "text-tai-danger",
      fillStop: "var(--tai-danger, #ef4444)",
      point: "bg-tai-danger",
    },
    neutral: {
      stroke: "text-tai-muted",
      fillStop: "var(--tai-muted, #a1a1aa)",
      point: "bg-tai-muted",
    },
  }[color];

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return (
    <div
      className={cn("relative inline-block overflow-hidden select-none", className)}
      style={{ width, height }}
      aria-label={`Trend chart ranging from ${min} to ${max}`}
    >
      <svg
        viewBox={`0 0 ${graphWidth} ${graphHeight}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorStyles.fillStop} stopOpacity="0.25" />
            <stop offset="100%" stopColor={colorStyles.fillStop} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {fill && (
          <path
            d={fillD}
            fill={`url(#${gradientId})`}
            className="transition-all duration-300"
          />
        )}

        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={cn("transition-all duration-300", colorStyles.stroke)}
        />

        {showEndpoints && (
          <>
            <rect
              x={firstPoint[0] - 1.5}
              y={firstPoint[1] - 1.5}
              width={3}
              height={3}
              className={cn("fill-tai-text", colorStyles.stroke)}
            />
            <rect
              x={lastPoint[0] - 2}
              y={lastPoint[1] - 2}
              width={4}
              height={4}
              className={cn("fill-current", colorStyles.stroke)}
            />
          </>
        )}
      </svg>
    </div>
  );
}
