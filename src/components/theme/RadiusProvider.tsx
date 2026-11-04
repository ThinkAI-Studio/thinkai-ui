"use client";

import * as React from "react";

export type RadiusPreference = "0" | "12";

const STORAGE_KEY = "thinkai-ui-radius";
const DEFAULT_RADIUS: RadiusPreference = "12";
const radiusListeners = new Set<() => void>();

function applyRadius(preference: RadiusPreference) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.radius = preference;
  }
}

function getPreference(): RadiusPreference {
  if (typeof window === "undefined") return DEFAULT_RADIUS;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "0" || saved === "sharp") return "0";
  if (saved === "12" || saved === "machined" || saved === "smooth") return "12";
  return DEFAULT_RADIUS;
}

function subscribeToRadius(callback: () => void) {
  radiusListeners.add(callback);
  return () => {
    radiusListeners.delete(callback);
  };
}

interface RadiusContextType {
  radius: RadiusPreference;
  setRadius: (radius: RadiusPreference) => void;
}

const RadiusContext = React.createContext<RadiusContextType | null>(null);

export function RadiusProvider({ children }: { children: React.ReactNode }) {
  const radius = React.useSyncExternalStore(
    subscribeToRadius,
    getPreference,
    () => DEFAULT_RADIUS
  );

  React.useEffect(() => {
    applyRadius(radius);
  }, [radius]);

  const updateRadius = React.useCallback((nextRadius: RadiusPreference) => {
    window.localStorage.setItem(STORAGE_KEY, nextRadius);
    applyRadius(nextRadius);
    radiusListeners.forEach((listener) => listener());
  }, []);

  return (
    <RadiusContext.Provider value={{ radius, setRadius: updateRadius }}>
      {children}
    </RadiusContext.Provider>
  );
}

export function useRadius() {
  const context = React.useContext(RadiusContext);
  if (!context) {
    throw new Error("useRadius must be used within a RadiusProvider");
  }
  return context;
}
