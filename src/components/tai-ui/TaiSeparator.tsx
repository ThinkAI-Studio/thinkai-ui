export function TaiSeparator({ orientation = "horizontal", className = "" }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return <div role="separator" aria-orientation={orientation} className={`${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} bg-tai-border ${className}`} />;
}
