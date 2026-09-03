"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Box, Search } from "lucide-react";
import Link from "next/link";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { QuantumMatrixCanvas } from "@/components/tai-ui/QuantumMatrixCanvas";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";

export function HeroSection({ onOpenCommandMenu }: { onOpenCommandMenu: () => void }) {
  const [copiedInit, setCopiedInit] = useState(false);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedInit(true);
    setTimeout(() => setCopiedInit(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] px-4 pb-20 pt-24 md:pb-28 md:pt-36">
      {/* Background Dynamic Quantum Matrix (Distinctive Infrastructure Substrate) */}
      <div className="absolute inset-0 pointer-events-auto opacity-95 z-0">
        <QuantumMatrixCanvas className="w-full h-full" gridSize={28} />
      </div>

      {/* Dark Obsidian Gradient Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-tai-bg/15 via-tai-bg/35 to-tai-bg/75" />

      <div className="max-w-5xl mx-auto text-center relative z-10 pointer-events-auto">
        {/* Release Pill Badge - Version moved to nav */}
        <div className="mb-8 inline-flex items-center gap-2 border border-white/[0.12] bg-tai-sheet/90 px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-300 tai-inset-top backdrop-blur-md">
          <span>Source-owned UI registry</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">30 primitives</span>
        </div>

        {/* Primary Headline (Condensed Grotesque Style) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] uppercase text-white font-mono leading-[0.96] mb-6 drop-shadow-xl">
          <span>INFRASTRUCTURE</span>
          <br />
          <span className="text-zinc-500">CRAFTED</span>{" "}
          <span className="text-white underline decoration-emerald-400/70 decoration-4 underline-offset-8">
            UI REGISTRY
          </span>
        </h1>

        {/* Technical Sub-headline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-sans leading-relaxed mb-10">
          0px sharp architectural geometry, obsidian monochromatic depth, and precision motion physics. Distributed directly into your codebase with 100% source ownership.
        </p>

        {/* Above-the-Fold Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Action 1: Scroll to Workbench */}
          <WipeButton
            textColor="#05070a"
            hoverTextColor="#05070a"
            onClick={() => {
              const el = document.getElementById("workbench");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold font-mono text-xs uppercase tracking-wider shadow-2xl"
          >
            <span className="flex items-center justify-center gap-2">
              <Box className="w-4 h-4" />
              <ButtonTextRoll text="EXPLORE WORKBENCH" />
              <ArrowRoll size="sm" />
            </span>
          </WipeButton>

          {/* Action 2: Copy Init CLI */}
          <button
            onClick={() => copyCommand("npx thinkai-ui init")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-[#0d0d10]/95 border border-white/[0.15] hover:border-white/40 text-xs sm:text-sm font-mono text-white transition-colors tai-inset-top active:translate-y-px backdrop-blur-md shadow-xl"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>npx thinkai-ui init</span>
            {copiedInit ? (
              <Check className="w-4 h-4 text-emerald-400 ml-1" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-500 ml-1" />
            )}
          </button>
        </div>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenCommandMenu}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors p-1"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-white/10 text-[11px] text-zinc-300 font-mono">⌘K</kbd>
            <span>or</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-white/10 text-[11px] text-zinc-300 font-mono">Ctrl+K</kbd>
            <span>to search 30 primitives</span>
          </button>
          <Link href="/docs" className="inline-flex items-center border border-white/[0.12] px-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-emerald-400 hover:text-white">
            Read documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
