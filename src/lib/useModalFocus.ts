"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function useModalFocus({ open, containerRef, onClose }: { open: boolean; containerRef: RefObject<HTMLElement | null>; onClose: () => void }) {
  useEffect(() => {
    if (!open || !containerRef.current) return;
    const container = containerRef.current;
    const previousActive = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const parent = container.parentElement;
    const inertSiblings = parent ? Array.from(parent.children).filter((element) => element !== container) : [];

    document.body.style.overflow = "hidden";
    inertSiblings.forEach((element) => element.setAttribute("inert", ""));
    const focusFrame = window.requestAnimationFrame(() => container.querySelector<HTMLElement>(FOCUSABLE)?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      inertSiblings.forEach((element) => element.removeAttribute("inert"));
      previousActive?.focus();
    };
  }, [containerRef, onClose, open]);
}
