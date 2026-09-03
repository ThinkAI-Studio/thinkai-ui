"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TaiAccordionItem = { value: string; title: React.ReactNode; content: React.ReactNode; disabled?: boolean };

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
  const toggle = (nextValue: string) => {
    const next = activeValue === nextValue ? undefined : nextValue;
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  return <div className={cn("divide-y divide-white/[0.1] border-y border-white/[0.1]", className)}>{items.map((item) => { const open = activeValue === item.value; const panelId = `accordion-${item.value}`; return <div key={item.value}><h3><button type="button" aria-expanded={open} aria-controls={panelId} disabled={item.disabled} onClick={() => toggle(item.value)} className="flex w-full items-center justify-between gap-4 py-4 text-left font-mono text-sm uppercase tracking-tight text-white transition-colors hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"><span className="min-w-0">{item.title}</span><ChevronDown aria-hidden="true" className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} /></button></h3>{open && <div id={panelId} role="region" className="pb-4 pr-8 text-sm leading-7 text-zinc-400">{item.content}</div>}</div>; })}</div>;
}
