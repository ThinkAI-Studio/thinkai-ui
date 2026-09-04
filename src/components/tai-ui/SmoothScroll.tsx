"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";

interface SmoothScrollProps {
  isLocked?: boolean;
}

export function SmoothScroll({ isLocked = false }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Respect the user's motion preference by leaving the browser's native
    // scroll behavior in place when reduced motion is enabled.
    if (prefersReduced) return;

    // Keep the smoothing responsive on documentation pages. A long duration
    // makes wheel input feel detached from the pointer and creates visible
    // catch-up when a page has large preview canvases.
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.14,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
      stopInertiaOnNavigate: true,
      anchors: {
        duration: 0.65,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      },
      // Nested sheets, drawers and catalogs should keep native scrolling.
      // This avoids making Lenis inspect every element on every wheel event.
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent], [data-lenis-prevent-wheel], [data-lenis-prevent-touch]")),
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
    };
  }, [prefersReduced]);

  // Pause / Resume smooth scroll when Drawer or Modal is opened
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLocked) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLocked]);

  return null;
}
