"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
  const changing = React.useRef(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const isDark =
    mounted &&
    (preference === "dark" ||
      (preference === "system" && !window.matchMedia("(prefers-color-scheme: light)").matches));

  const toggleTheme = async () => {
    if (changing.current) return;
    changing.current = true;
    const nextTheme = isDark ? "light" : "dark";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Guaranteed bounding box from button ref
    const rect = buttonRef.current?.getBoundingClientRect();
    const top = rect ? Math.round(rect.top) : 24;
    const left = rect ? Math.round(rect.left) : window.innerWidth - 48;
    const right = rect ? Math.round(window.innerWidth - rect.right) : 16;
    const bottom = rect ? Math.round(window.innerHeight - rect.bottom) : window.innerHeight - 56;

    try {
      if (reducedMotion) {
        setPreference(nextTheme);
        return;
      }

      const startViewTransition = (
        document as Document & {
          startViewTransition?: (update: () => void) => {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        }
      ).startViewTransition;

      if (typeof startViewTransition === "function") {
        try {
          const transition = startViewTransition.call(document, () => {
            setPreference(nextTheme);
          });

          // W3C View Transitions Animation API on incoming view
          transition.ready.then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `inset(${top}px ${right}px ${bottom}px ${left}px)`,
                  `inset(0px 0px 0px 0px)`,
                ],
              },
              {
                duration: 480,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
          });

          await transition.finished;
          return;
        } catch {
          setPreference(nextTheme);
          return;
        }
      }

      // Smooth fallback for browsers without View Transitions
      const root = document.documentElement;
      root.dataset.themeTransitioning = "true";
      setPreference(nextTheme);
      await new Promise<void>((resolve) => window.setTimeout(resolve, 350));
      delete root.dataset.themeTransitioning;
    } finally {
      changing.current = false;
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={mounted ? isDark : undefined}
      title="Toggle color theme"
      onClick={() => void toggleTheme()}
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center border border-transparent bg-transparent p-0 text-tai-muted transition-colors duration-200 ease-out hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus select-none cursor-pointer"
      style={{ borderRadius: 0 }}
    >
      <span
        aria-hidden="true"
        className="relative block h-5 w-9 border border-tai-border-strong bg-tai-surface p-0.5"
        style={{ borderRadius: 0 }}
      >
        <span
          className={`absolute left-0.5 top-0.5 grid h-3.5 w-3.5 place-items-center bg-tai-text text-tai-bg transition-transform duration-200 ease-out ${
            isDark ? "translate-x-4" : "translate-x-0"
          }`}
          style={{ borderRadius: 0 }}
        >
          {isDark ? <Moon className="h-2.5 w-2.5" /> : <Sun className="h-2.5 w-2.5" />}
        </span>
      </span>
    </button>
  );
}
