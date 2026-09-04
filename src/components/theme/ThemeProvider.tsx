"use client";

import * as React from "react";

export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "thinkai-ui-theme";
const themeListeners = new Set<() => void>();

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(preference: ThemePreference) {
  const resolved = preference === "system" ? getSystemTheme() : preference;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

function getPreference(): ThemePreference {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

function subscribeToTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const preference = React.useSyncExternalStore(subscribeToTheme, getPreference, () => "system" as ThemePreference);

  React.useEffect(() => {
    applyTheme(preference);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => { if (preference === "system") applyTheme("system"); };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const updateTheme = React.useCallback((nextPreference: ThemePreference) => {
    window.localStorage.setItem(STORAGE_KEY, nextPreference);
    applyTheme(nextPreference);
    themeListeners.forEach((listener) => listener());
  }, []);

  return <ThemeContext.Provider value={{ preference, setPreference: updateTheme }}>{children}</ThemeContext.Provider>;
}

const ThemeContext = React.createContext<{ preference: ThemePreference; setPreference: (preference: ThemePreference) => void } | null>(null);

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
