import { cn } from "@/lib/utils";

export function TaiEmptyState({ title, description, action, className }: { title: string; description: string; action?: React.ReactNode; className?: string }) {
  return <div className={cn("border border-dashed border-tai-border p-8 text-center", className)}><p className="font-mono text-sm uppercase tracking-tight text-tai-text">{title}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-tai-muted">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}
