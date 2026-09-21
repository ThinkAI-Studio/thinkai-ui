"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Slash } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export interface TaiBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron" | "dot";
  className?: string;
}

export function TaiBreadcrumb({
  items = [],
  separator = "slash",
  className,
}: TaiBreadcrumbProps) {
  const renderSeparator = () => {
    switch (separator) {
      case "chevron":
        return <ChevronRight className="w-3 h-3 text-tai-subtle shrink-0" />;
      case "dot":
        return <span className="w-1 h-1 bg-tai-subtle shrink-0" />;
      case "slash":
      default:
        return <Slash className="w-3 h-3 text-tai-subtle shrink-0 -rotate-12" />;
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("overflow-x-auto", className)}>
      <ol className="flex items-center gap-2 font-mono text-xs text-tai-muted whitespace-nowrap select-none">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.active || isLast;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <li aria-hidden="true" className="flex items-center">
                  {renderSeparator()}
                </li>
              )}
              <li className="flex items-center gap-1.5">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                {item.href && !isActive ? (
                  <Link
                    href={item.href}
                    className="hover:text-tai-text hover:underline transition-colors focus-visible:outline-1 focus-visible:outline-tai-focus"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      isActive
                        ? "font-bold text-tai-text"
                        : "text-tai-muted"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
