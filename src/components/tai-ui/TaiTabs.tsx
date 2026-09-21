"use client";

import * as React from "react";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion, TAI_PHYSICS } from "@/lib/motion";

export type TaiTab = { value: string; label: React.ReactNode; content: React.ReactNode; disabled?: boolean };

export interface TaiTabsProps {
  tabs: TaiTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function TaiTabs({ tabs, value, defaultValue, onValueChange, className }: TaiTabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? tabs[0]?.value ?? "");
  const activeValue = value ?? internalValue;
  const layoutGroupId = React.useId();
  const prefersReduced = useReducedMotion();

  const selectTab = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const focusTab = (nextValue: string) => {
    selectTab(nextValue);
    window.requestAnimationFrame(() => document.getElementById(`tab-${nextValue}`)?.focus());
  };

  const moveTab = (index: number) => {
    const enabled = tabs.filter((tab) => !tab.disabled);
    if (!enabled.length) return;
    const current = Math.max(0, enabled.findIndex((tab) => tab.value === activeValue));
    focusTab(enabled[(current + index + enabled.length) % enabled.length].value);
  };

  return (
    <div className={cn("min-w-0", className)}>
      <LayoutGroup id={layoutGroupId}>
        <div role="tablist" aria-label="Tabs" className="flex min-w-0 gap-1 overflow-x-auto border-b border-tai-border">
          {tabs.map((tab) => {
            const selected = tab.value === activeValue;
            return (
              <button
                key={tab.value}
                id={`tab-${tab.value}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.value}`}
                tabIndex={selected ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => selectTab(tab.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    moveTab(1);
                  }
                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    moveTab(-1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    focusTab(tabs.find((item) => !item.disabled)?.value ?? "");
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    focusTab([...tabs].reverse().find((item) => !item.disabled)?.value ?? "");
                  }
                }}
                className={cn(
                  "relative shrink-0 px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-tai-subtle transition-colors hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus disabled:cursor-not-allowed disabled:opacity-40 select-none",
                  selected && "text-tai-text"
                )}
              >
                <span className="relative z-10">{tab.label}</span>
                {selected && (
                  <motion.div
                    layoutId="tai-tab-active-indicator"
                    layout="position"
                    transition={prefersReduced ? { duration: 0 } : TAI_PHYSICS.tectonic}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-tai-accent"
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      {tabs.map(
        (tab) =>
          tab.value === activeValue && (
            <div
              key={tab.value}
              id={`panel-${tab.value}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.value}`}
              tabIndex={0}
              className="pt-5 text-sm leading-7 text-tai-muted outline-none focus-visible:ring-1 focus-visible:ring-tai-focus"
            >
              {tab.content}
            </div>
          )
      )}
    </div>
  );
}
