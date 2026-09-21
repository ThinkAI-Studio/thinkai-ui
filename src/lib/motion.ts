"use client";

import { useSyncExternalStore } from "react";
import { type Variants, type Transition } from "motion/react";

/**
 * Check if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Default transitions & springs for ThinkAI Studio
 */
export const TAI_EASE = {
  luxury: [0.16, 1, 0.3, 1] as const,
  spring: [0.32, 0.72, 0, 1] as const,
  snappy: [0.19, 1, 0.22, 1] as const,
};

export const TAI_SPRING = {
  default: { type: "spring", damping: 32, stiffness: 280, mass: 1 },
  stiff: { type: "spring", damping: 30, stiffness: 400, mass: 0.8 },
  gentle: { type: "spring", damping: 38, stiffness: 200, mass: 1.2 },
} as const;

/**
 * Sub-Perceptual Tactile Physics (Hallmark & Impeccable Standard)
 * Mathematically calibrated for Weber-Fechner sub-perceptual thresholds.
 */
export const TAI_PHYSICS = {
  /** 95ms mechanical bottom-out: buttons, checkboxes, keycaps, icons */
  microswitch: { type: "spring", stiffness: 650, damping: 38, mass: 0.5 } as const,
  /** 120ms tactile detent: switches, sliders, segment toggles (micro-overshoot zeta=0.84) */
  detent: { type: "spring", stiffness: 520, damping: 32, mass: 0.7 } as const,
  /** 85ms laser hairline / vector path drawing */
  laser: { type: "spring", stiffness: 750, damping: 46, mass: 0.4 } as const,
  /** 140ms structural glider: tabs layoutId, accordions */
  tectonic: { type: "spring", stiffness: 380, damping: 34, mass: 0.6 } as const,
  /** 110ms airlock settle: tooltips, popovers, small overlays */
  airlock: { type: "spring", stiffness: 540, damping: 36, mass: 0.5 } as const,
} as const;


export const defaultTransition: Transition = {
  duration: 0.5,
  ease: TAI_EASE.luxury,
};

/**
 * Stagger children animation variants
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: defaultTransition,
  },
};

/**
 * Fade in animation variants
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: defaultTransition,
  },
};

/**
 * Slide up animation variants
 */
export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition,
  },
};

/**
 * Scale in animation variants
 */
export const scaleInVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: defaultTransition,
  },
};

/**
 * Text scramble character variants
 */
export const textScrambleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.1,
    },
  }),
};

/**
 * Draw line animation for SVG paths
 */
export const drawLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

/**
 * Get variants with reduced motion support
 */
export function getVariantsWithReducedMotion(
  variants: Variants,
  reducedMotion: boolean
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }
  return variants;
}
