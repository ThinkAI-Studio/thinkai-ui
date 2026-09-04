"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DocsHeader } from "./DocsHeader";
import { DocsSearch, useDocsSearch } from "./DocsSearch";
import { DocsSidebar } from "./DocsSidebar";

const librarySections = new Set(["motion", "ui", "icons"]);

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
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

  return (
    <div className="min-h-screen bg-tai-bg text-tai-text">
      <DocsHeader searchOpen={searchOpen} onSearchToggle={() => setSearchOpen((value) => !value)} />
      <DocsSearch
        open={searchOpen}
        query={searchQuery}
        results={searchResults}
        prefersReduced={prefersReduced}
        onClose={() => setSearchOpen(false)}
        onQueryChange={setSearchQuery}
      />
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 sm:py-12 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14 lg:py-14">
        <DocsSidebar activeSlug={activeSlug} activeHref={activeHref} />
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
