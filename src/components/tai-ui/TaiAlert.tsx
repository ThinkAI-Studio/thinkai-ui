import React from "react";
import { cn } from "@/lib/utils";

export interface TaiAlertProps {
  title: string;
  children: React.ReactNode;
  tone?: "info" | "success" | "warning" | "error";
  className?: string;
}

export function TaiAlert({ title, children, tone = "info", className }: TaiAlertProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "border-l-2 bg-tai-sheet p-4 text-sm text-tai-text transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-tai-card",
        tone === "success" && "border-tai-success",
        tone === "warning" && "border-tai-warning",
        tone === "error" && "border-tai-danger",
        tone === "info" && "border-tai-accent",
        className
      )}
      style={{ borderRadius: "var(--tai-radius-md)" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest font-bold">{title}</p>
      <div className="mt-2 leading-6 text-tai-muted">{children}</div>
    </div>
  );
}
