import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TaiAvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TaiAvatar({ src, alt, fallback, size = "md", className }: TaiAvatarProps) {
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : size === "lg" ? "h-14 w-14 text-lg" : "h-10 w-10 text-sm";
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden border border-tai-border bg-tai-card font-mono font-bold uppercase text-tai-muted transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 select-none",
        sizeClass,
        className
      )}
      style={{ borderRadius: "var(--tai-radius-md)" }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="56px" className="object-cover" />
      ) : (
        <span aria-label={alt}>{fallback.slice(0, 2)}</span>
      )}
    </span>
  );
}
