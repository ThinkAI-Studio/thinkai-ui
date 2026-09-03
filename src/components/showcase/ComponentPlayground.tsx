"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Code, Eye } from "lucide-react";
import { TaiButton } from "@/components/tai-ui/TaiButton";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { TextRoll } from "@/components/tai-ui/TextRoll";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { OpenAiIcon, GeminiIcon, ClaudeIcon, PerplexityIcon, ManusIcon } from "@/components/tai-ui/AiBrandIcons";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { ProductMockup } from "@/components/tai-ui/ProductMockup";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";

interface ComponentItem {
  id: string;
  name: string;
  category: "Action" | "Overlay" | "Typography" | "Display" | "WebGL";
  description: string;
  dependencies: string[];
  codeSnippet: string;
  renderPreview: (context: {
    setAboutOpen: (v: boolean) => void;
    setArchOpen: (v: boolean) => void;
    setContactOpen: (v: boolean) => void;
  }) => React.ReactNode;
}

export function ComponentPlayground() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewModes, setViewModes] = useState<Record<string, "preview" | "code">>({});

  // Overlay Dialog States
  const [aboutOpen, setAboutOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const copyCli = (name: string) => {
    navigator.clipboard.writeText(`npx thinkai-ui add ${name}`);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleViewMode = (id: string, mode: "preview" | "code") => {
    setViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  const components: ComponentItem[] = [
    {
      id: "tai-button",
      name: "TaiButton",
      category: "Action",
      description: "0px sharp architectural button with top-inset light sweep, CVA variants, and active scale compression.",
      dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge", "motion"],
      codeSnippet: `import { TaiButton } from "@/components/tai-ui/TaiButton";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4">\n      <TaiButton variant="primary" size="default">Deploy System</TaiButton>\n      <TaiButton variant="secondary" size="default">View Telemetry</TaiButton>\n      <TaiButton variant="outline" size="default">Outline</TaiButton>\n    </div>\n  );\n}`,
      renderPreview: () => (
        <div className="flex flex-wrap gap-4 items-center justify-center p-6">
          <TaiButton variant="primary" size="default">Deploy System</TaiButton>
          <TaiButton variant="secondary" size="default">View Telemetry</TaiButton>
          <TaiButton variant="outline" size="default">Architecture</TaiButton>
        </div>
      ),
    },
    {
      id: "wipe-button",
      name: "WipeButton",
      category: "Action",
      description: "Signature Forward-Wipe interactive button with luxury easing curve [0.16, 1, 0.3, 1].",
      dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge", "motion"],
      codeSnippet: `import { WipeButton } from "@/components/tai-ui/WipeButton";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4">\n      <WipeButton className="px-6 py-3 bg-white text-black font-bold">Explore Registry</WipeButton>\n      <WipeButton className="px-6 py-3 bg-zinc-900 border border-white/20 text-white">View Source</WipeButton>\n    </div>\n  );\n}`,
      renderPreview: () => (
        <div className="flex flex-wrap gap-4 items-center justify-center p-6">
          <WipeButton className="px-6 py-3 bg-white text-black font-bold">Explore Registry</WipeButton>
          <WipeButton className="px-6 py-3 bg-zinc-900 border border-white/20 text-white">View Source Code</WipeButton>
        </div>
      ),
    },
    {
      id: "product-mockup",
      name: "ProductMockup",
      category: "Display",
      description: "Responsive product screenshot with a focused live-preview link and reduced-motion reveal.",
      dependencies: ["motion"],
      codeSnippet: `import { ProductMockup } from "@/components/tai-ui/ProductMockup";\n\nexport default function Example() {\n  return (\n    <ProductMockup\n      title="HostDeck Telemetry"\n      domain="hostdeck.thinkai.id.vn"\n      type="homelab"\n    />\n  );\n}`,
      renderPreview: () => (
        <div className="w-full p-4 scale-90 sm:scale-100 origin-center">
          <ProductMockup
            title="ThinkAI Console"
            domain="hostdeck.thinkai.id.vn"
            type="homelab"
          />
        </div>
      ),
    },
    {
      id: "halftone-banner",
      name: "HalftoneBanner",
      category: "WebGL",
      description: "Interactive ocean caustics WebGL banner integrated with ThinkAI Studio logomark.",
      dependencies: ["three", "motion"],
      codeSnippet: `import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";\n\nexport default function Example() {\n  return <ThreeHalftoneCanvas className="w-full h-44" />;\n}`,
      renderPreview: () => (
        <div className="w-full h-44 relative overflow-hidden bg-black flex items-center justify-center">
          <ThreeHalftoneCanvas className="w-full h-full" />
          <div className="absolute z-10 font-mono text-xs font-bold uppercase tracking-widest text-white px-4 py-2 bg-black/70 border border-white/20 backdrop-blur-sm">
            THREE.JS OCEAN SHADER ACTIVE
          </div>
        </div>
      ),
    },
    {
      id: "button-text-roll",
      name: "ButtonTextRoll",
      category: "Typography",
      description: "Dual-layer micro-tumbler for kinetic button labels with spring transitions.",
      dependencies: ["motion"],
      codeSnippet: `import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";\n\nexport default function Example() {\n  return (\n    <button className="px-6 py-3 bg-zinc-900 border border-white/20 text-white font-mono uppercase text-xs tracking-wider">\n      <ButtonTextRoll text="VERIFY SIGNATURE" />\n    </button>\n  );\n}`,
      renderPreview: () => (
        <div className="flex items-center justify-center p-6">
          <div className="px-6 py-3 bg-zinc-900 border border-white/20 text-white font-mono uppercase text-xs tracking-wider cursor-pointer hover:border-emerald-400 transition-colors">
            <ButtonTextRoll text="HOVER TO ROLL TEXT" />
          </div>
        </div>
      ),
    },
    {
      id: "arrow-roll",
      name: "ArrowRoll",
      category: "Action",
      description: "Directional forward translation arrow with spring physics.",
      dependencies: ["motion"],
      codeSnippet: `import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";\n\nexport default function Example() {\n  return (\n    <button className="group flex items-center gap-3 px-5 py-2.5 bg-tai-sheet border border-white/10 text-white font-mono text-xs">\n      <span>ACCESS PORTAL</span>\n      <ArrowRoll />\n    </button>\n  );\n}`,
      renderPreview: () => (
        <div className="flex items-center justify-center p-6">
          <button className="group flex items-center gap-3 px-6 py-3 bg-tai-sheet border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-colors active:translate-y-px">
            <span>ACCESS PORTAL</span>
            <ArrowRoll />
          </button>
        </div>
      ),
    },
    {
      id: "text-roll",
      name: "TextRoll",
      category: "Typography",
      description: "High-speed tumbler slot-machine roll for display headlines and metrics.",
      dependencies: ["motion"],
      codeSnippet: `import { TextRoll } from "@/components/tai-ui/TextRoll";\n\nexport default function Example() {\n  return (\n    <h2 className="text-3xl font-mono font-bold uppercase tracking-tight text-white">\n      <TextRoll text="ZERO LATENCY" />\n    </h2>\n  );\n}`,
      renderPreview: () => (
        <div className="flex items-center justify-center p-8">
          <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white uppercase text-center">
            <TextRoll text="HIGH CONVICTION UI" />
          </div>
        </div>
      ),
    },
    {
      id: "masked-text-reveal",
      name: "MaskedTextReveal",
      category: "Typography",
      description: "Editorial typography reveal via geometric clip-path: inset() masking.",
      dependencies: ["motion"],
      codeSnippet: `import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";\n\nexport default function Example() {\n  return (\n    <MaskedTextReveal\n      text="ENGINEERING LUXURY SOFTWARE"\n      className="text-2xl font-mono font-bold uppercase text-white"\n    />\n  );\n}`,
      renderPreview: () => (
        <div className="flex items-center justify-center p-8 text-center">
          <MaskedTextReveal
            text="ENGINEERING LUXURY SOFTWARE"
            className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-tight text-white"
          />
        </div>
      ),
    },
    {
      id: "about-drawer",
      name: "AboutDrawer",
      category: "Overlay",
      description: "High-contrast spring sliding sheet for biography, career experience, and engineering credentials.",
      dependencies: ["motion", "lucide-react"],
      codeSnippet: `import { useState } from "react";\nimport { AboutDrawer } from "@/components/tai-ui/AboutDrawer";\nimport { TaiButton } from "@/components/tai-ui/TaiButton";\n\nexport default function Example() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <TaiButton onClick={() => setOpen(true)}>Open Drawer</TaiButton>\n      <AboutDrawer isOpen={open} onClose={() => setOpen(false)} lang="en" />\n    </>\n  );\n}`,
      renderPreview: ({ setAboutOpen }) => (
        <div className="flex flex-col items-center justify-center p-6 gap-3">
          <TaiButton variant="primary" size="default" onClick={() => setAboutOpen(true)}>
            Launch AboutDrawer Sheet
          </TaiButton>
          <span className="text-[11px] font-sans text-zinc-500">Includes ESC trapping & Lenis scroll locking</span>
        </div>
      ),
    },
    {
      id: "architecture-modal",
      name: "ArchitectureModal",
      category: "Overlay",
      description: "Deep-dive multi-tab system architecture modal with code preview panels and telemetry status.",
      dependencies: ["motion", "lucide-react"],
      codeSnippet: `import { useState } from "react";\nimport { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";\nimport { TaiButton } from "@/components/tai-ui/TaiButton";\n\nexport default function Example() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <TaiButton onClick={() => setOpen(true)}>Inspect Architecture</TaiButton>\n      <ArchitectureModal projectId={open ? "homelab" : null} onClose={() => setOpen(false)} lang="en" />\n    </>\n  );\n}`,
      renderPreview: ({ setArchOpen }) => (
        <div className="flex flex-col items-center justify-center p-6 gap-3">
          <TaiButton variant="secondary" size="default" onClick={() => setArchOpen(true)}>
            Open Architecture Modal
          </TaiButton>
          <span className="text-[11px] font-sans text-zinc-500">Multi-tab telemetry & verification tabs</span>
        </div>
      ),
    },
    {
      id: "contact-modal",
      name: "ContactModal",
      category: "Overlay",
      description: "Sharp geometric contact dialog with 1-click clipboard actions and toast feedback.",
      dependencies: ["motion", "lucide-react"],
      codeSnippet: `import { useState } from "react";\nimport { ContactModal } from "@/components/tai-ui/ContactModal";\nimport { WipeButton } from "@/components/tai-ui/WipeButton";\n\nexport default function Example() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <WipeButton className="px-6 py-3 bg-white text-black font-bold" onClick={() => setOpen(true)}>Initiate Contact</WipeButton>\n      <ContactModal isOpen={open} onClose={() => setOpen(false)} />\n    </>\n  );\n}`,
      renderPreview: ({ setContactOpen }) => (
        <div className="flex flex-col items-center justify-center p-6 gap-3">
          <WipeButton className="px-6 py-3 bg-white text-black font-bold" onClick={() => setContactOpen(true)}>
            Launch Contact Dialog
          </WipeButton>
          <span className="text-[11px] font-sans text-zinc-500">Instant clipboard copy for the primary contact address</span>
        </div>
      ),
    },
    {
      id: "tech-logos",
      name: "TechLogos",
      category: "Display",
      description: "High-contrast inverted tech stack badges with snappy spring hover lift physics.",
      dependencies: ["motion"],
      codeSnippet: `import { TechLogo } from "@/components/tai-ui/TechLogos";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4">\n      <TechLogo name="Go" />\n      <TechLogo name="Docker" />\n      <TechLogo name="Kubernetes" />\n      <TechLogo name="Linux" />\n    </div>\n  );\n}`,
      renderPreview: () => (
        <div className="flex flex-wrap items-center justify-center gap-4 p-6">
          <div className="p-3 bg-zinc-900 border border-white/10 hover:border-white transition-colors text-white">
            <TechLogo name="Go" />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 hover:border-white transition-colors text-white">
            <TechLogo name="Docker" />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 hover:border-white transition-colors text-white">
            <TechLogo name="Kubernetes" />
          </div>
          <div className="p-3 bg-zinc-900 border border-white/10 hover:border-white transition-colors text-white">
            <TechLogo name="Linux" />
          </div>
        </div>
      ),
    },
    {
      id: "ai-brand-icons",
      name: "AiBrandIcons",
      category: "Display",
      description: "Optimized SVG brand marks for Claude, Gemini, OpenAI, Perplexity, Manus AI.",
      dependencies: [],
      codeSnippet: `import { OpenAiIcon, GeminiIcon, ClaudeIcon, PerplexityIcon, ManusIcon } from "@/components/tai-ui/AiBrandIcons";\n\nexport default function Example() {\n  return (\n    <div className="flex gap-4 text-white">\n      <OpenAiIcon size={24} />\n      <GeminiIcon size={24} />\n      <ClaudeIcon size={24} />\n      <PerplexityIcon size={24} />\n      <ManusIcon size={24} />\n    </div>\n  );\n}`,
      renderPreview: () => (
        <div className="flex flex-wrap items-center justify-center gap-6 p-6 text-white">
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
  ];

  const categories = ["All", "Action", "Overlay", "Typography", "Display", "WebGL"];

  const filteredComponents =
    activeCategory === "All"
      ? components
      : components.filter((c) => c.category === activeCategory);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/[0.08] pb-6 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase">
            Production Primitives
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl font-sans">
            Test interactions in real-time. Copy pure source code or install via CLI.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-tai-sheet p-1 border border-white/[0.08]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors active:translate-y-px ${
                activeCategory === cat
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1fr)] gap-8 items-start">
        {filteredComponents.map((item, index) => {
          const mode = viewModes[item.id] || "preview";
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={item.id}
              className={`min-w-0 bg-tai-sheet border border-white/[0.08] flex flex-col justify-between tai-inset-top overflow-hidden ${
                index === 0 ? "lg:col-span-2" : index === 1 ? "lg:row-span-2" : index === 4 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-bold text-white uppercase tracking-tight">
                    {item.name}
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-800 border border-white/[0.08] text-[10px] font-mono text-zinc-400 uppercase">
                    {item.category}
                  </span>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-zinc-900 border border-white/[0.08] p-0.5">
                  <button
                    onClick={() => toggleViewMode(item.id, "preview")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono transition-colors ${
                      mode === "preview"
                        ? "bg-white text-black font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                  <button
                    onClick={() => toggleViewMode(item.id, "code")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono transition-colors ${
                      mode === "code"
                        ? "bg-white text-black font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Code className="w-3 h-3" /> Code
                  </button>
                </div>
              </div>

              {/* Card Body: Live Preview OR Code */}
              <div className="min-h-[220px] flex items-center justify-center bg-black/20 relative">
                {mode === "preview" ? (
                  item.renderPreview({
                    setAboutOpen,
                    setArchOpen,
                    setContactOpen,
                  })
                ) : (
                  <div className="w-full h-full p-4 overflow-x-auto text-xs font-mono text-zinc-300 bg-[#09090b]">
                    <pre>
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Card Footer: Description + CLI copy bar */}
              <div className="p-5 border-t border-white/[0.06] bg-tai-card/50">
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans">
                  {item.description}
                </p>

                {/* Dependencies list */}
                {item.dependencies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">
                      pkgs:
                    </span>
                    {item.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-1.5 py-0.5 bg-black/60 border border-white/[0.06] text-[10px] font-mono text-zinc-400"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                )}

                {/* 1-Click CLI Copy Bar */}
                <div className="flex items-center justify-between gap-2 p-2 bg-black border border-white/[0.1] text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300 truncate">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">npx thinkai-ui add {item.id}</span>
                  </div>
                  <button
                    onClick={() => copyCli(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-tai-sheet border border-white/20 hover:border-white text-[11px] font-bold text-white transition-colors active:opacity-80 shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mount Shared Overlay Components for Live Previews */}
      <AboutDrawer isOpen={aboutOpen} onClose={() => setAboutOpen(false)} lang="en" />
      <ArchitectureModal projectId={archOpen ? "homelab" : null} onClose={() => setArchOpen(false)} lang="en" />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
