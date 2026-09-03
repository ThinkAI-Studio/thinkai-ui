"use client";

import { useCallback, useState, useEffect } from "react";
import { Search, Terminal, Copy, Check, X, Box, ArrowRight, CornerDownLeft } from "lucide-react";
import { catalogItems } from "@/data/catalog";

interface ComponentEntry {
  name: string;
  slug: string;
  category: string;
  description: string;
}

const ALL_COMPONENTS: ComponentEntry[] = catalogItems.map((item) => ({
  name: item.title,
  slug: item.slug,
  category: item.category,
  description: item.description,
}));

export function CommandMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = ALL_COMPONENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.slug.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const jumpTo = useCallback((slug: string) => {
    onClose();
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const item = catalogItems.find((entry) => entry.slug === slug);
    window.location.assign(item ? `/docs/${item.kind}/${slug}` : `/docs/${slug}`);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((index) => filtered.length ? (index + 1) % filtered.length : 0);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((index) => filtered.length ? (index - 1 + filtered.length) % filtered.length : 0);
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        jumpTo(filtered[selectedIndex].slug);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtered, isOpen, jumpTo, onClose, selectedIndex]);

  if (!isOpen) return null;

  const copyCommand = (slug: string) => {
    navigator.clipboard.writeText(`npx thinkai-ui add ${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => {
      setCopiedSlug(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Sharp Architectural Modal */}
      <div role="dialog" aria-modal="true" aria-label="Search ThinkAI UI primitives" className="relative z-10 w-full max-w-2xl bg-tai-sheet border border-white/[0.18] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-black/50">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            aria-label="Search primitives"
            placeholder="Type a component name, category, or CLI command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
            className="w-full bg-transparent text-sm font-mono text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
              No matching primitives found in registry
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const isCopied = copiedSlug === item.slug;

              return (
                <div
                  key={item.slug}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected ? "bg-white/[0.06]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Left info */}
                  <div
                    onClick={() => jumpTo(item.slug)}
                    className="flex-1 min-w-0"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-sm font-bold text-white uppercase tracking-tight">
                        {item.name}
                      </span>
                      <span className="px-1.5 py-0.5 bg-zinc-900 border border-white/[0.08] text-[9px] font-mono text-zinc-400 uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                    <button
                      onClick={() => copyCommand(item.slug)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-white/[0.12] hover:border-white text-[11px] text-zinc-300 hover:text-white transition-colors active:opacity-80"
                      title="Copy CLI command"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Terminal className="w-3 h-3 text-emerald-400" />
                          <span>add {item.slug}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => jumpTo(item.slug)}
                      className="p-1 text-zinc-500 hover:text-white"
                      title="Jump to preview"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Keyboard Telemetry */}
        <div className="px-4 py-2 bg-black/80 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300">ESC</kbd> to close
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300">↵</kbd> to inspect
            </span>
          </div>
          <div>{filtered.length} result{filtered.length === 1 ? "" : "s"}</div>
        </div>
      </div>
    </div>
  );
}
