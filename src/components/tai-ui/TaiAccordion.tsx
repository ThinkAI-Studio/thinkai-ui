"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export type TaiAccordionItem = {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export interface TaiAccordionProps {
  items: TaiAccordionItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
}

export function TaiAccordion({ items, value, defaultValue, onValueChange, className }: TaiAccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const activeValue = value ?? internalValue;
  const prefersReduced = useReducedMotion();

  const toggle = (nextValue: string) => {
    const next = activeValue === nextValue ? undefined : nextValue;
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("divide-y divide-tai-border border-y border-tai-border", className)}>
      {items.map((item) => {
        const open = activeValue === item.value;
        const panelId = `accordion-${item.value}`;
        return (
          <div key={item.value}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.value)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-mono text-sm uppercase tracking-tight text-tai-text transition-colors hover:text-tai-accent focus-visible:outline-2 focus-visible:outline-tai-focus disabled:cursor-not-allowed disabled:opacity-40 select-none"
              >
                <span className="min-w-0">{item.title}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.tectonic}
                  className="shrink-0 text-tai-subtle"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-hidden={!open}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-4 pr-8 text-sm leading-7 text-tai-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
