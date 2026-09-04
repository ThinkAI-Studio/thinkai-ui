"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TaiDropdownItem = { label: string; onSelect: () => void; disabled?: boolean };

export function TaiDropdownMenu({ label = "Open menu", items, className }: { label?: string; items: TaiDropdownItem[]; className?: string }) {
  const [open, setOpen] = React.useState(false);
  return <div className={cn("relative inline-flex", className)}><button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className="border border-tai-border bg-tai-sheet px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus">{label}</button>{open && <div role="menu" className="absolute right-0 top-full z-30 mt-2 min-w-48 border border-tai-border bg-tai-sheet p-1 shadow-xl">{items.map((item) => <button key={item.label} type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.onSelect(); setOpen(false); }} className="block w-full px-3 py-2 text-left text-xs text-tai-muted hover:bg-tai-surface hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus disabled:opacity-40">{item.label}</button>)}</div>}</div>;
}
