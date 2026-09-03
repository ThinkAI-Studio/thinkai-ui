"use client";

import React, { useState } from "react";
import {
  Laptop,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Terminal,
  FileCode,
  Braces,
  Palette,
  Search,
} from "lucide-react";
import { TaiButton } from "@/components/tai-ui/TaiButton";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { TextRoll } from "@/components/tai-ui/TextRoll";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { OpenAiIcon, GeminiIcon, ClaudeIcon, PerplexityIcon, ManusIcon } from "@/components/tai-ui/AiBrandIcons";
import { ProductMockup } from "@/components/tai-ui/ProductMockup";
import { QuantumMatrixCanvas } from "@/components/tai-ui/QuantumMatrixCanvas";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface StudioWorkbenchProps {
  onOpenAbout: () => void;
  onOpenArch: () => void;
  onOpenContact: () => void;
}

export type ViewportMode = "desktop" | "tablet" | "mobile";
export type InspectorTab = "cli" | "usage" | "registry" | "tokens";

export function StudioWorkbench({
  onOpenAbout,
  onOpenArch,
  onOpenContact,
}: StudioWorkbenchProps) {
  const [selectedId, setSelectedId] = useState<string>("wipe-button");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [bgMode, setBgMode] = useState<"matrix" | "obsidian">("matrix");
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("cli");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [pkgManager, setPkgManager] = useState<"bun" | "npx" | "pnpm">("bun");
  const prefersReduced = useReducedMotion();

  const componentsList = [
    {
      id: "tai-button",
      category: "01 · PRIMITIVES",
      itemNumber: "01.01",
      title: "TaiButton",
      status: "STABLE",
      description: "0px sharp architectural button with top-inset light sweep, CVA variants, and active scale compression.",
      dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge", "motion"],
      render: () => (
        <div className="flex flex-wrap gap-4 items-center justify-center p-8">
          <TaiButton variant="primary" size="default">Deploy System</TaiButton>
          <TaiButton variant="secondary" size="default">View Telemetry</TaiButton>
          <TaiButton variant="outline" size="default">Architecture</TaiButton>
        </div>
      ),
    },
    {
      id: "wipe-button",
      category: "01 · PRIMITIVES",
      itemNumber: "01.02",
      title: "WipeButton",
      status: "STABLE",
      description: "Signature Forward-Wipe interactive button with luxury easing curve [0.16, 1, 0.3, 1].",
      dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge", "motion"],
      render: () => (
        <div className="flex flex-wrap gap-4 items-center justify-center p-8">
          <WipeButton className="px-6 py-3 bg-white text-black font-bold">Explore Registry</WipeButton>
          <WipeButton className="px-6 py-3 bg-zinc-900 border border-white/20 text-white">View Source Code</WipeButton>
        </div>
      ),
    },
    {
      id: "arrow-roll",
      category: "01 · PRIMITIVES",
      itemNumber: "01.03",
      title: "ArrowRoll",
      status: "STABLE",
      description: "Directional forward translation arrow with spring physics.",
      dependencies: ["motion"],
      render: () => (
        <div className="flex items-center justify-center p-8">
          <button className="group flex items-center gap-3 px-6 py-3.5 bg-tai-sheet border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-colors active:translate-y-px">
            <span>ACCESS PORTAL</span>
            <ArrowRoll />
          </button>
        </div>
      ),
    },
    {
      id: "tech-logos",
      category: "01 · PRIMITIVES",
      itemNumber: "01.04",
      title: "TechLogos",
      status: "STABLE",
      description: "High-contrast inverted tech stack badges with snappy spring hover lift physics.",
      dependencies: ["motion"],
      render: () => (
        <div className="flex flex-wrap items-center justify-center gap-4 p-8">
          {["Go", "Docker", "Kubernetes", "Linux"].map((tech) => (
          <div key={tech} className="p-3.5 bg-zinc-900 border border-white/10 hover:border-white transition-colors text-white">
              <TechLogo name={tech} />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "ai-brand-icons",
      category: "01 · PRIMITIVES",
      itemNumber: "01.05",
      title: "AiBrandIcons",
      status: "NEW",
      description: "Optimized SVG brand marks for Claude, Gemini, OpenAI, Perplexity, Manus AI.",
      dependencies: [],
      render: () => (
        <div className="flex flex-wrap items-center justify-center gap-6 p-8 text-white">
          <div className="p-3 bg-zinc-900 border border-white/10 text-white hover:text-emerald-400 transition-colors" title="OpenAI">
            <OpenAiIcon size={28} />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 text-white hover:text-emerald-400 transition-colors" title="Google Gemini">
            <GeminiIcon size={28} />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 text-white hover:text-emerald-400 transition-colors" title="Anthropic Claude">
            <ClaudeIcon size={28} />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 text-white hover:text-emerald-400 transition-colors" title="Perplexity AI">
            <PerplexityIcon size={28} />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 text-white hover:text-emerald-400 transition-colors" title="Manus AI">
            <ManusIcon size={28} />
          </div>
        </div>
      ),
    },
    {
      id: "button-text-roll",
      category: "02 · KINETIC TYPO",
      itemNumber: "02.01",
      title: "ButtonTextRoll",
      status: "STABLE",
      description: "Dual-layer micro-tumbler for kinetic button labels with spring transitions.",
      dependencies: ["motion"],
      render: () => (
        <div className="flex items-center justify-center p-8">
          <div className="px-6 py-3.5 bg-zinc-900 border border-white/20 text-white font-mono uppercase text-xs tracking-wider cursor-pointer hover:border-emerald-400 transition-colors">
            <ButtonTextRoll text="HOVER TO TUMBLE TEXT" />
          </div>
        </div>
      ),
    },
    {
      id: "text-roll",
      category: "02 · KINETIC TYPO",
      itemNumber: "02.02",
      title: "TextRoll",
      status: "STABLE",
      description: "High-speed tumbler slot-machine roll for display headlines and metrics.",
      dependencies: ["motion"],
      render: () => (
        <div className="flex items-center justify-center p-10">
          <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase text-center">
            <TextRoll text="HIGH CONVICTION UI" />
          </div>
        </div>
      ),
    },
    {
      id: "masked-text-reveal",
      category: "02 · KINETIC TYPO",
      itemNumber: "02.03",
      title: "MaskedTextReveal",
      status: "STABLE",
      description: "Editorial typography reveal via geometric clip-path: inset() masking.",
      dependencies: ["motion"],
      render: () => (
        <div className="flex items-center justify-center p-10 text-center">
          <MaskedTextReveal
            text="ENGINEERING LUXURY SOFTWARE"
            className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-white"
          />
        </div>
      ),
    },
    {
      id: "about-drawer",
      category: "03 · SHEETS & CHROME",
      itemNumber: "03.01",
      title: "AboutDrawer",
      status: "STABLE",
      description: "High-contrast spring sliding sheet for biography, career experience, and engineering credentials.",
      dependencies: ["motion", "lucide-react"],
      render: () => (
        <div className="flex flex-col items-center justify-center p-8 gap-3 text-center">
          <TaiButton variant="primary" size="default" onClick={onOpenAbout}>
            Launch AboutDrawer Sheet
          </TaiButton>
          <span className="text-xs font-mono text-zinc-500">Includes ESC trapping & Lenis scroll locking</span>
        </div>
      ),
    },
    {
      id: "architecture-modal",
      category: "03 · SHEETS & CHROME",
      itemNumber: "03.02",
      title: "ArchitectureModal",
      status: "STABLE",
      description: "Deep-dive multi-tab system architecture modal with code preview panels and telemetry status.",
      dependencies: ["motion", "lucide-react"],
      render: () => (
        <div className="flex flex-col items-center justify-center p-8 gap-3 text-center">
          <TaiButton variant="secondary" size="default" onClick={onOpenArch}>
            Open Architecture Modal
          </TaiButton>
          <span className="text-xs font-mono text-zinc-500">Multi-tab telemetry & verification tabs</span>
        </div>
      ),
    },
    {
      id: "contact-modal",
      category: "03 · SHEETS & CHROME",
      itemNumber: "03.03",
      title: "ContactModal",
      status: "STABLE",
      description: "Sharp geometric contact dialog with 1-click clipboard actions and toast feedback.",
      dependencies: ["motion", "lucide-react"],
      render: () => (
        <div className="flex flex-col items-center justify-center p-8 gap-3 text-center">
          <WipeButton className="px-6 py-3 bg-white text-black font-bold" onClick={onOpenContact}>
            Launch Contact Dialog
          </WipeButton>
          <span className="text-xs font-sans text-zinc-500">Instant clipboard copy for the primary contact address</span>
        </div>
      ),
    },
    {
      id: "product-mockup",
      category: "03 · SHEETS & CHROME",
      itemNumber: "03.04",
      title: "ProductMockup",
      status: "STABLE",
      description: "Responsive product screenshot with a focused live-preview link and reduced-motion reveal.",
      dependencies: ["motion"],
      render: () => (
        <div className="w-full max-w-xl p-4 scale-95 sm:scale-100 origin-center">
          <ProductMockup
            title="ThinkAI Console"
            domain="hostdeck.thinkai.id.vn"
            type="homelab"
          />
        </div>
      ),
    },
    {
      id: "quantum-matrix-canvas",
      category: "04 · RUNTIMES",
      itemNumber: "04.01",
      title: "QuantumMatrixCanvas",
      status: "NEW",
      description: "Interactive monochromatic dot-lattice field with Manhattan cursor strain and 1px bus scanlines.",
      dependencies: ["motion"],
      render: () => (
        <div className="w-full h-64 relative overflow-hidden bg-[#08080a] border border-white/10">
          <QuantumMatrixCanvas className="w-full h-full" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 border border-white/10 text-[10px] font-mono text-emerald-400">
            INTERACTIVE: MOVE MOUSE OVER GRID
          </div>
        </div>
      ),
    },
    {
      id: "three-halftone-canvas",
      category: "04 · RUNTIMES",
      itemNumber: "04.02",
      title: "ThreeHalftoneCanvas",
      status: "WEBGL",
      description: "Optimized Three.js WebGL procedural ocean halftone shader canvas with 60/120fps throttle.",
      dependencies: ["three"],
      render: () => (
        <div className="w-full h-64 relative overflow-hidden bg-black border border-white/10">
          <ThreeHalftoneCanvas className="w-full h-full" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 border border-white/10 text-[10px] font-mono text-white">
            THREE.JS OCEAN SHADER
          </div>
        </div>
      ),
    },
  ];

  const current = componentsList.find((c) => c.id === selectedId) || componentsList[0];

  const getCliCommand = () => {
    switch (pkgManager) {
      case "bun":
        return `bunx --bun thinkai-ui add ${current.id}`;
      case "pnpm":
        return `pnpm dlx thinkai-ui add ${current.id}`;
      case "npx":
      default:
        return `npx thinkai-ui add ${current.id}`;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ["01 · PRIMITIVES", "02 · KINETIC TYPO", "03 · SHEETS & CHROME", "04 · RUNTIMES"];

  return (
    <section id="workbench" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Workbench Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase">
            Interactive Primitives Console
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-sans">
            Inspect, test, and extract pure TypeScript source code for ThinkAI Studio&apos;s 30 production primitives.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="text-emerald-400">30 PRIMITIVES</span>
          <span className="text-zinc-600">|</span>
          <span>100% 0px GEOMETRY</span>
        </div>
      </div>

      {/* Main Workbench Frame */}
      <div className="bg-[#0d0d10] border border-white/[0.1] shadow-2xl overflow-hidden tai-inset-top flex flex-col lg:flex-row min-h-[640px]">
        {/* Left Pane: Explorer Tree */}
        <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#09090b] flex flex-col shrink-0">
          <div className="p-3.5 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase font-bold">
              EXPLORER · CATALOG
            </span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter..."
                aria-label="Filter components"
                className="bg-black border border-white/10 text-white font-mono text-[11px] px-2 py-0.5 w-24 focus:w-32 focus:outline-none transition-[width,border-color] placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="p-2 overflow-y-auto max-h-[300px] lg:max-h-[580px] space-y-4 font-mono text-xs">
            {categories.map((cat) => {
              const items = componentsList.filter(
                (c) => c.category === cat && c.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
              if (items.length === 0) return null;

              return (
                <div key={cat}>
                  <div className="px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {cat}
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {items.map((item) => {
                      const isActive = item.id === selectedId;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedId(item.id)}
                          className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors group active:translate-y-px ${
                            isActive
                              ? "bg-white text-black font-bold shadow-md"
                              : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`text-[10px] ${isActive ? "text-zinc-600 font-normal" : "text-zinc-600"}`}>
                              {item.itemNumber}
                            </span>
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 font-mono uppercase tracking-wider ${
                              isActive
                                ? "bg-black text-white"
                                : item.status === "STABLE"
                                ? "text-emerald-400 bg-emerald-950/40 border border-emerald-800/40"
                                : item.status === "NEW"
                                ? "text-cyan-400 bg-cyan-950/40 border border-cyan-800/40"
                                : "text-amber-400 bg-amber-950/40 border border-amber-800/40"
                            }`}
                          >
                            {item.status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Stage & Bottom Inspector */}
        <main className="flex-1 flex flex-col bg-[#08080a] min-w-0">
          {/* Stage Controls Toolbar */}
          <div className="h-11 border-b border-white/[0.08] bg-[#0d0d10] px-4 flex items-center justify-between shrink-0">
            {/* Viewport Width Switchers */}
            <div className="flex items-center gap-1 bg-[#131316] border border-white/[0.08] p-0.5 font-mono text-[10px]">
              <button
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
                  viewport === "desktop" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Laptop className="w-3 h-3" />
                <span className="hidden sm:inline">DESKTOP</span>
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
                  viewport === "tablet" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Tablet className="w-3 h-3" />
                <span className="hidden sm:inline">TABLET</span>
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
                  viewport === "mobile" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">MOBILE</span>
              </button>
            </div>

            {/* Background Style Switcher */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#131316] border border-white/[0.08] p-0.5 font-mono text-[10px]">
                <button
                  onClick={() => setBgMode("matrix")}
                  className={`px-2 py-0.5 ${bgMode === "matrix" ? "bg-white/20 text-white font-bold" : "text-zinc-500"}`}
                >
                  MATRIX
                </button>
                <button
                  onClick={() => setBgMode("obsidian")}
                  className={`px-2 py-0.5 ${bgMode === "obsidian" ? "bg-white/20 text-white font-bold" : "text-zinc-500"}`}
                >
                  SOLID
                </button>
              </div>
            </div>
          </div>

          {/* THE STAGE: Component Rendering Sandbox */}
          <div
            className={`flex-1 overflow-auto flex items-center justify-center p-6 min-h-[300px] relative transition-colors ${
              bgMode === "matrix"
                ? "bg-[#08080a] bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px]"
                : "bg-[#08080a]"
            }`}
          >
            {/* Viewport Sizing Wrapper */}
            <div
              className={`transition-colors duration-300 flex items-center justify-center w-full ${
                viewport === "tablet"
                  ? "max-w-[768px] border border-white/10 bg-[#0d0d10]/90 p-4"
                  : viewport === "mobile"
                  ? "max-w-[375px] border border-white/10 bg-[#0d0d10]/95 p-4"
                  : ""
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: prefersReduced ? 0 : 0.22, ease: [0.19, 1, 0.22, 1] }}
                  className="flex w-full items-center justify-center"
                >
                  {current.render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* PANE 3: Code & CLI Inspector Drawer */}
          <div className="border-t border-white/[0.08] bg-[#0d0d10] flex flex-col shrink-0">
            {/* Inspector Navigation Bar */}
          <div className="h-10 min-w-0 border-b border-white/[0.08] px-4 flex items-center justify-between bg-[#131316]">
              <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
                {[
                  { id: "cli", label: "CLI COMMAND", icon: Terminal },
                  { id: "usage", label: "REACT USAGE", icon: FileCode },
                  { id: "registry", label: "REGISTRY JSON", icon: Braces },
                  { id: "tokens", label: "CSS TOKENS", icon: Palette },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = inspectorTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setInspectorTab(tab.id as InspectorTab)}
                      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-1 font-mono text-[11px] tracking-wider transition-colors active:translate-y-px ${
                        isActive
                          ? "bg-white text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1-Click Clipboard Trigger */}
              <button
                onClick={() => {
                  if (inspectorTab === "cli") handleCopy(getCliCommand());
                  if (inspectorTab === "usage")
                    handleCopy(`import { ${current.title} } from "@/components/tai-ui/${current.title}";\n\n<${current.title} />`);
                  if (inspectorTab === "registry")
                    handleCopy(`https://ui.thinkai.studio/r/${current.id}.json`);
                  if (inspectorTab === "tokens")
                    handleCopy(`@theme {\n  --color-tai-bg: #08080a;\n  --color-tai-border: rgba(255,255,255,0.07);\n}`);
                }}
                className="flex items-center gap-1.5 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider bg-black border border-white/20 hover:border-white text-white transition-colors active:opacity-80"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            {/* Inspector Code Body */}
            <div className="p-4 font-mono text-xs bg-[#09090c] text-zinc-300 min-h-[120px] max-h-[180px] overflow-auto">
              {inspectorTab === "cli" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {(["bun", "pnpm", "npx"] as const).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setPkgManager(pm)}
                        className={`px-2 py-0.5 text-[10px] uppercase border transition-colors ${
                          pkgManager === pm
                            ? "bg-white text-black font-bold border-white"
                            : "bg-[#131316] text-zinc-500 border-white/[0.08]"
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                  <div className="p-2.5 bg-[#131316] border border-white/[0.08] flex items-center justify-between text-white select-all">
                    <code>{getCliCommand()}</code>
                  </div>
                  {current.dependencies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] text-zinc-500">
                      <span>Dependencies:</span>
                      {current.dependencies.map((dep) => (
                        <span key={dep} className="px-1.5 py-0.2 bg-black border border-white/10 text-zinc-300">
                          {dep}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {inspectorTab === "usage" && (
                <pre className="select-all leading-relaxed text-zinc-300">
{`import { ${current.title} } from "@/components/tai-ui/${current.title}";

export default function Example() {
  return (
    <${current.title} />
  );
}`}
                </pre>
              )}

              {inspectorTab === "registry" && (
                <div className="space-y-2">
                  <div className="text-zinc-400">Endpoint: https://ui.thinkai.studio/r/{current.id}.json</div>
                  <pre className="select-all text-[11px] text-zinc-400">
{JSON.stringify(
  {
    name: current.id,
    title: current.title,
    description: current.description,
    dependencies: current.dependencies,
  },
  null,
  2
)}
                  </pre>
                </div>
              )}

              {inspectorTab === "tokens" && (
                <pre className="select-all leading-relaxed text-emerald-400">
{`@theme {
  --color-tai-bg: #08080a;
  --color-tai-sheet: #0d0d10;
  --color-tai-card: #131316;
  --color-tai-border: rgba(255, 255, 255, 0.07);
  --color-tai-border-strong: rgba(255, 255, 255, 0.18);
  --color-tai-green: #4ade80;
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
}`}
                </pre>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
