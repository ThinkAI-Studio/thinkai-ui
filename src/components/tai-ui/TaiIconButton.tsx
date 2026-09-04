import * as React from "react";
import { cn } from "@/lib/utils";

export const TaiIconButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }>(
  ({ label, className, children, ...props }, ref) => <button ref={ref} type="button" aria-label={label} title={label} className={cn("inline-grid h-11 w-11 place-items-center border border-tai-border text-tai-muted transition-colors hover:border-tai-border-strong hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus disabled:cursor-not-allowed disabled:opacity-40", className)} {...props}>{children}</button>,
);
TaiIconButton.displayName = "TaiIconButton";
