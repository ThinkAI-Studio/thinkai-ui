"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DocsHeader } from "./DocsHeader";
import { DocsSearch, useDocsSearch } from "./DocsSearch";
import { DocsSidebar } from "./DocsSidebar";

const librarySections = new Set(["motion", "ui", "icons"]);

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const {
    open: searchOpen,
    setOpen: setSearchOpen,
    query: searchQuery,
    setQuery: setSearchQuery,
    results: searchResults,
  } = useDocsSearch();

  const [, section, slug] = pathname.split("/");
  const activeHref = pathname === "/catalog"
    ? "/catalog"
    : librarySections.has(section ?? "")
      ? `/docs/${section}`
      : undefined;
  const activeSlug = pathname === "/docs"
    ? "installation"
    : section && !librarySections.has(section) && slug === undefined
      ? section
      : undefined;

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const focusFrame = window.requestAnimationFrame(() => {
        mobileNavRef.current?.querySelector<HTMLElement>("a, button")?.focus();
      });
      return () => window.cancelAnimationFrame(focusFrame);
    }

    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-tai-bg text-tai-text">
      <DocsHeader searchOpen={searchOpen} onSearchToggle={() => setSearchOpen((value) => !value)} mobileNavOpen={mobileNavOpen} onMobileNavToggle={() => setMobileNavOpen((value) => !value)} />
      <DocsSearch
        open={searchOpen}
        query={searchQuery}
        results={searchResults}
        prefersReduced={prefersReduced}
        onClose={() => setSearchOpen(false)}
        onQueryChange={setSearchQuery}
      />
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 sm:py-12 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14 lg:py-14">
        <AnimatePresence initial={false}>
          {mobileNavOpen && <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label="Close documentation menu"
              onClick={() => setMobileNavOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.18 }}
              className="fixed inset-0 z-40 bg-tai-bg/55 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              ref={mobileNavRef}
              id="docs-mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Documentation menu"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              initial={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 30, mass: 0.8 }}
              className="fixed left-3 right-3 top-[calc(4rem+0.75rem)] bottom-3 z-50 w-auto max-w-[360px] overflow-y-auto border border-tai-border bg-tai-sheet px-4 pb-6 pt-5 shadow-2xl lg:hidden"
            >
              <DocsSidebar activeSlug={activeSlug} activeHref={activeHref} onNavigate={() => setMobileNavOpen(false)} />
            </motion.div>
          </>}
        </AnimatePresence>
        <div className="hidden lg:block">
          <DocsSidebar activeSlug={activeSlug} activeHref={activeHref} onNavigate={() => setMobileNavOpen(false)} />
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -4 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
