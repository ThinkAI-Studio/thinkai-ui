import { cn } from "@/lib/utils";

export function TaiSkeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block bg-tai-surface", className)} />;
}
