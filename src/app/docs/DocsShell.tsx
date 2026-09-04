"use client";

import { useEffect, useState, type ReactNode } from "react";
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
        {mobileNavOpen && <button type="button" tabIndex={-1} aria-label="Close documentation menu" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-40 bg-tai-bg/70 lg:hidden" />}
        <div id="docs-mobile-sidebar" className={`fixed inset-y-0 left-0 z-50 w-[min(88vw,320px)] overflow-y-auto border-r border-tai-border bg-tai-sheet px-4 pb-8 pt-24 transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-auto lg:translate-x-0 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} data-lenis-prevent="true" data-lenis-prevent-wheel="true" data-lenis-prevent-touch="true">
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
