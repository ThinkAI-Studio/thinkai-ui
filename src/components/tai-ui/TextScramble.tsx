"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

export function TextScramble({ text, trigger = true, className = "" }: { text: string; trigger?: boolean; className?: string }) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = React.useState(text);
  const previous = React.useRef(text);
  React.useEffect(() => {
    if (prefersReduced || !trigger) { previous.current = text; return; }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    const from = previous.current;
    const total = Math.max(from.length, text.length);
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / 12);
      setDisplay(Array.from({ length: total }, (_, index) => { if (index >= text.length) return ""; if (index < text.length * progress) return text[index]; return chars[Math.floor(Math.random() * chars.length)]; }).join(""));
      if (progress === 1) { window.clearInterval(timer); previous.current = text; }
    }, 32);
    return () => window.clearInterval(timer);
  }, [prefersReduced, text, trigger]);
  return <span className={className} aria-label={text}>{prefersReduced || !trigger ? text : display}</span>;
}
