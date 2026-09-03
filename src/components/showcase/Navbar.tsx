"use client";

import Link from "next/link";
import { useState } from "react";
import { Copy, Check, Terminal, Github, Search, Activity } from "lucide-react";

export function Navbar({ onOpenCommandMenu }: { onOpenCommandMenu: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyInitCommand = () => {
    navigator.clipboard.writeText("npx thinkai-ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-tai-bg/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logomark */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white text-black font-mono font-bold flex items-center justify-center text-sm tracking-tighter shadow-md">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors">
                THINKAI UI
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                UI REGISTRY
              </span>
            </div>
          </Link>

          {/* Live Status Telemetry */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-zinc-900/60 border border-white/[0.06] text-[11px] font-mono text-zinc-400">
            <span>REGISTRY: ONLINE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500">12ms edge</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Command Menu Trigger Button */}
          <button
            onClick={onOpenCommandMenu}
            className="flex items-center gap-2 px-3 py-1.5 bg-tai-sheet border border-white/[0.1] hover:border-white/30 text-xs font-mono text-zinc-400 hover:text-white transition-colors active:translate-y-px"
            title="Search components (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search primitives...</span>
            <kbd className="hidden sm:inline px-1 py-0.2 bg-zinc-900 border border-white/10 text-[10px] text-zinc-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Quick CLI Copy */}
          <button
            onClick={copyInitCommand}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-tai-sheet border border-white/[0.1] hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-colors active:opacity-80"
            title="Click to copy initialization command"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>npx thinkai-ui init</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-500 ml-1" />
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/ThinkAI-Studio/thinkai-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-white text-black text-xs font-mono font-bold hover:bg-zinc-200 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">STAR ON GITHUB</span>
          </a>
        </div>
      </div>
    </header>
  );
}
