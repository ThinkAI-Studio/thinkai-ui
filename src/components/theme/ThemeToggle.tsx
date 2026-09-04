"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const THEME_REVEAL_DURATION = 1100;
const THEME_REVEAL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const mounted = React.useSyncExternalStore(() => () => undefined, () => true, () => false);
  const changing = React.useRef(false);

  const isDark = mounted && (preference === "dark" || (preference === "system" && !window.matchMedia("(prefers-color-scheme: light)").matches));

  const toggleTheme = async () => {
    if (changing.current) return;
    changing.current = true;
    const nextTheme = isDark ? "light" : "dark";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const button = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const bounds = button?.getBoundingClientRect();
    const originX = bounds ? bounds.left + bounds.width / 2 : window.innerWidth - 32;
    const originY = bounds ? bounds.top + bounds.height / 2 : 24;
    const radius = Math.ceil(Math.hypot(Math.max(originX, window.innerWidth - originX), Math.max(originY, window.innerHeight - originY)));

    try {
      if (reducedMotion) {
        setPreference(nextTheme);
        return;
      }

      const root = document.documentElement;
      root.style.setProperty("--tai-theme-origin-x", `${originX}px`);
      root.style.setProperty("--tai-theme-origin-y", `${originY}px`);
      root.style.setProperty("--tai-theme-reveal-radius", `${radius}px`);

      const startViewTransition = (document as Document & {
        startViewTransition?: (update: () => void) => { finished: Promise<void> };
      }).startViewTransition;

      const runFallbackTransition = async () => {
        root.dataset.themeTransitioning = "true";
        setPreference(nextTheme);
        await new Promise<void>((resolve) => window.setTimeout(resolve, THEME_REVEAL_DURATION));
        delete root.dataset.themeTransitioning;
      };

      if (startViewTransition) {
        let themeApplied = false;
        try {
          const transition = startViewTransition(() => {
            themeApplied = true;
            setPreference(nextTheme);
          });
          await transition.finished;
          return;
        } catch {
          if (!themeApplied) {
            await runFallbackTransition();
          } else {
            setPreference(nextTheme);
          }
          return;
        } finally {
          root.style.removeProperty("--tai-theme-origin-x");
          root.style.removeProperty("--tai-theme-origin-y");
          root.style.removeProperty("--tai-theme-reveal-radius");
        }
      }

      await runFallbackTransition();
    } finally {
      changing.current = false;
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={mounted ? isDark : undefined}
      title="Toggle color theme"
      onClick={() => void toggleTheme()}
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center border border-transparent bg-transparent p-0 text-tai-muted transition-colors duration-200 ease-out hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"
    >
      <span aria-hidden="true" className="relative block h-5 w-9 border border-tai-border-strong bg-tai-surface p-0.5">
        <span className={`absolute left-0.5 top-0.5 grid h-3.5 w-3.5 place-items-center bg-tai-text text-tai-bg transition-transform duration-200 ease-out ${isDark ? "translate-x-4" : "translate-x-0"}`}>
          {isDark ? <Moon className="h-2.5 w-2.5" /> : <Sun className="h-2.5 w-2.5" />}
        </span>
      </span>
    </button>
  );
}
