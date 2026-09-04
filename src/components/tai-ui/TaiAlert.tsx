import { cn } from "@/lib/utils";

export function TaiAlert({ title, children, tone = "info", className }: { title: string; children: React.ReactNode; tone?: "info" | "success" | "warning" | "error"; className?: string }) {
  return <div role={tone === "error" ? "alert" : "status"} className={cn("border-l-2 bg-tai-sheet p-4 text-sm text-tai-text", tone === "success" && "border-tai-success", tone === "warning" && "border-tai-warning", tone === "error" && "border-tai-danger", tone === "info" && "border-tai-accent", className)}><p className="font-mono text-[10px] uppercase tracking-widest">{title}</p><div className="mt-2 leading-6 text-tai-muted">{children}</div></div>;
}
