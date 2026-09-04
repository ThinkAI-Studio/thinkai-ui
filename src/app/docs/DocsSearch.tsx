"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { searchDocs, type DocsSearchResult } from "./docs-data";

export function useDocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const prefersReduced = useReducedMotion();
  const results = searchDocs(query);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { open, setOpen, query, setQuery, results, prefersReduced };
}

export function DocsSearch({ open, query, results, prefersReduced, onClose, onQueryChange }: { open: boolean; query: string; results: DocsSearchResult[]; prefersReduced: boolean | null; onClose: () => void; onQueryChange: (query: string) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedIndex = activeIndex >= 0 && activeIndex < results.length ? activeIndex : -1;

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("input, a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [open]);

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
    }
    if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      resultRefs.current[selectedIndex]?.click();
    }
  };

  return <AnimatePresence>
    {open && <>
      <motion.button type="button" tabIndex={-1} aria-label="Close search" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <motion.div ref={dialogRef} id="docs-search" role="dialog" aria-modal="true" aria-labelledby="docs-search-title" data-lenis-prevent="true" data-lenis-prevent-wheel="true" data-lenis-prevent-touch="true" initial={{ opacity: 0, y: prefersReduced ? 0 : 12, scale: prefersReduced ? 1 : 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: prefersReduced ? 0 : 8, scale: prefersReduced ? 1 : 0.985 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }} className="fixed inset-x-4 top-[12vh] z-50 mx-auto w-auto max-w-2xl overflow-hidden border border-tai-border-strong bg-tai-sheet shadow-2xl sm:inset-x-8">
        <div className="flex items-center justify-between border-b border-tai-border px-4 py-3 sm:px-5"><div><p id="docs-search-title" className="font-mono text-xs font-bold uppercase tracking-widest text-tai-text">Search docs</p><p className="mt-1 text-xs text-tai-muted">Find a guide, component, motion or icon.</p></div><kbd className="hidden border border-tai-border bg-tai-surface px-2 py-1 font-mono text-[10px] text-tai-muted sm:inline">ESC</kbd></div>
        <div className="p-4 sm:p-5"><label htmlFor="docs-search-input" className="sr-only">Search documentation</label><input ref={inputRef} id="docs-search-input" value={query} onChange={(event) => { setActiveIndex(-1); onQueryChange(event.target.value); }} onKeyDown={handleInputKeyDown} aria-controls="docs-search-results" aria-activedescendant={selectedIndex >= 0 ? `docs-search-result-${selectedIndex}` : undefined} placeholder="Search components, motion, accessibility…" className="w-full border border-tai-border bg-tai-bg px-4 py-3 text-sm text-tai-text outline-none placeholder:text-tai-subtle focus-visible:outline-2 focus-visible:outline-tai-focus" /><div id="docs-search-results" className="mt-4 max-h-[52vh] overflow-y-auto overscroll-contain" aria-live="polite">{results.length ? <div role="listbox" aria-label="Documentation results" className="grid gap-2 sm:grid-cols-2">{results.map((result, index) => <motion.div key={`${result.kind}-${result.slug}`} initial={{ opacity: 0, y: prefersReduced ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} transition={prefersReduced ? { duration: 0 } : { delay: index * 0.035, duration: 0.2 }}><Link ref={(element) => { resultRefs.current[index] = element; }} id={`docs-search-result-${index}`} role="option" aria-selected={selectedIndex === index} href={`/docs/${result.slug}`} onMouseEnter={() => setActiveIndex(index)} onClick={onClose} className={`block min-w-0 border border-tai-border px-3 py-3 transition-[border-color,background-color,transform] hover:-translate-y-px hover:border-tai-border-strong hover:bg-tai-surface focus-visible:outline-2 focus-visible:outline-tai-focus ${selectedIndex === index ? "border-tai-accent bg-tai-surface" : ""}`}><span className="block font-mono text-[9px] uppercase tracking-widest text-tai-accent">{result.kind}</span><span className="mt-1 block truncate text-sm text-tai-text">{result.title}</span><span className="mt-1 block truncate text-xs text-tai-muted">{result.description}</span></Link></motion.div>)}</div> : <p className="border border-dashed border-tai-border p-5 text-sm text-tai-muted">No matching documentation yet.</p>}</div></div>
      </motion.div>
    </>}
  </AnimatePresence>;
}
