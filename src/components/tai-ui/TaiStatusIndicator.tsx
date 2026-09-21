"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SystemStatus = "operational" | "degraded" | "outage" | "syncing" | "standby";

export interface TaiStatusIndicatorProps {
  status: SystemStatus;
  label?: string;
  sublabel?: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TaiStatusIndicator({
  status = "operational",
  label,
  sublabel,
  pulse = true,
  size = "md",
  className,
}: TaiStatusIndicatorProps) {
  const config = {
    operational: {
      color: "bg-tai-success",
      shadow: "shadow-[0_0_8px_var(--tai-success,#10b981)]",
      pulseColor: "bg-tai-success/50",
      text: "text-tai-success",
      defaultLabel: "Operational",
    },
    degraded: {
      color: "bg-tai-warning",
      shadow: "shadow-[0_0_8px_var(--tai-warning,#f59e0b)]",
      pulseColor: "bg-tai-warning/50",
      text: "text-tai-warning",
      defaultLabel: "Degraded",
    },
    outage: {
      color: "bg-tai-danger",
      shadow: "shadow-[0_0_8px_var(--tai-danger,#ef4444)]",
      pulseColor: "bg-tai-danger/50",
      text: "text-tai-danger",
      defaultLabel: "Major Outage",
    },
    syncing: {
      color: "bg-tai-accent",
      shadow: "shadow-[0_0_8px_var(--tai-accent,#2985b8)]",
      pulseColor: "bg-tai-accent/50",
      text: "text-tai-accent",
      defaultLabel: "Syncing",
    },
    standby: {
      color: "bg-tai-subtle",
      shadow: "shadow-[0_0_8px_rgba(133,133,143,0.3)]",
      pulseColor: "bg-tai-subtle/50",
      text: "text-tai-muted",
      defaultLabel: "Standby",
    },
  }[status];

  const sizeStyles = {
    sm: {
      beacon: "w-1.5 h-1.5",
      text: "text-[10px]",
    },
    md: {
      beacon: "w-2 h-2",
      text: "text-xs",
    },
    lg: {
      beacon: "w-2.5 h-2.5",
      text: "text-sm",
    },
  }[size];

  const displayLabel = label ?? config.defaultLabel;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono select-none",
        sizeStyles.text,
        className
      )}
      role="status"
      aria-label={`System status: ${displayLabel}`}
    >
      {/* 0px Square Beacon with Ping Wave */}
      <span className="relative flex items-center justify-center shrink-0">
        {pulse && status !== "standby" && (
          <span
            className={cn(
              "absolute -inset-0.5 animate-ping opacity-60",
              sizeStyles.beacon,
              config.pulseColor
            )}
            style={{ borderRadius: 0 }}
          />
        )}
        <span
          className={cn(
            "relative block shrink-0",
            sizeStyles.beacon,
            config.color,
            config.shadow
          )}
          style={{ borderRadius: 0 }}
        />
      </span>

      {/* Label and optional sublabel */}
      <div className="flex items-baseline gap-1.5 truncate">
        <span className="font-bold uppercase tracking-wider text-tai-text">
          {displayLabel}
        </span>
        {sublabel && (
          <span className="text-[10px] text-tai-muted font-normal">
            ({sublabel})
          </span>
        )}
      </div>
    </div>
  );
}
