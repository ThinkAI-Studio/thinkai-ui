"use client";

import { useState } from "react";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { DrawUnderline } from "@/components/tai-ui/DrawUnderline";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { NumberFlow } from "@/components/tai-ui/NumberFlow";
import { ProductMockup } from "@/components/tai-ui/ProductMockup";
import { ProgressiveBlur } from "@/components/tai-ui/ProgressiveBlur";
import { TaiButton } from "@/components/tai-ui/TaiButton";
import { TaiIconButton } from "@/components/tai-ui/TaiIconButton";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { Settings } from "lucide-react";
import type { CatalogItem } from "@/data/catalog";

export function ComponentPreview({ item, compact = false }: { item: CatalogItem; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const className = compact ? "scale-[0.82] origin-center" : "";
  return <div className={`relative flex min-h-[150px] w-full min-w-0 max-w-full items-center justify-center overflow-hidden ${className}`}>
    {item.previewId === "tai-button" && <div className="flex flex-wrap justify-center gap-3"><TaiButton>Deploy system</TaiButton><TaiButton variant="outline">Inspect</TaiButton></div>}
    {item.previewId === "masked-text-reveal" && <MaskedTextReveal text="SOURCE YOU CAN OWN" className="text-center font-mono text-xl font-bold uppercase text-tai-text" />}
    {item.previewId === "product-mockup" && <ProductMockup title="ThinkAI Console" domain="console.thinkai.studio" type="homelab" />}
    {item.previewId === "three-halftone-canvas" && <div className="relative h-40 w-full min-w-0 max-w-full overflow-hidden"><ThreeHalftoneCanvas className="absolute inset-0 h-full w-full" /></div>}
    {item.previewId === "halftone-banner" && <div className="relative h-40 w-full min-w-0 max-w-full overflow-hidden"><ThreeHalftoneCanvas className="absolute inset-0 h-full w-full" /><span className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-widest text-tai-text">Optional visual layer</span></div>}
    {item.previewId === "tech-logos" && <div className="flex flex-wrap justify-center gap-3"><TechLogo name="Go" /><TechLogo name="Docker" /><TechLogo name="Linux" /></div>}
    {item.previewId === "about-drawer" && <><button onClick={() => setOpen(true)} className="border border-white/[0.15] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Open {item.title}</button><AboutDrawer isOpen={open} onClose={() => setOpen(false)} lang="en" /></>}
    {item.previewId === "architecture-modal" && <><button onClick={() => setOpen(true)} className="border border-white/[0.15] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Open {item.title}</button><ArchitectureModal projectId={open ? "homelab" : null} onClose={() => setOpen(false)} lang="en" /></>}
    {item.previewId === "contact-modal" && <><button onClick={() => setOpen(true)} className="border border-white/[0.15] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Open {item.title}</button><ContactModal isOpen={open} onClose={() => setOpen(false)} /></>}
    {item.previewId === "tai-header" && <div className="w-full border-y border-tai-border px-4 py-3 text-center font-mono text-xs uppercase text-tai-muted">ThinkAI UI / Components / Docs</div>}
    {item.previewId === "smooth-scroll" && <div className="border border-tai-border p-5 font-mono text-xs uppercase text-tai-muted">Native scroll → Lenis optional</div>}
    {item.previewId === "ai-brand-icons" && <div className="font-mono text-xs uppercase tracking-widest text-tai-accent">Provider marks / labelled</div>}
    {item.previewId === "draw-underline" && <div className="font-mono text-xl uppercase text-tai-text"><DrawUnderline>Read the source</DrawUnderline></div>}
    {item.previewId === "number-flow" && <div className="font-mono text-4xl font-bold text-tai-text"><NumberFlow value="30+" /></div>}
    {item.previewId === "tai-icon-button" && <TaiIconButton label="Open settings"><Settings className="h-4 w-4" /></TaiIconButton>}
    {item.previewId === "progressive-blur" && <ProgressiveBlur><div className="h-20 w-56 border border-tai-border bg-tai-card" /></ProgressiveBlur>}
  </div>;
}
