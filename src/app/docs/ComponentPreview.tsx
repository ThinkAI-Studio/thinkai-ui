"use client";

import { useState } from "react";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { ProductMockup } from "@/components/tai-ui/ProductMockup";
import { TaiButton } from "@/components/tai-ui/TaiButton";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { TextRoll } from "@/components/tai-ui/TextRoll";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import type { CatalogItem } from "@/data/catalog";

export function ComponentPreview({ item, compact = false }: { item: CatalogItem; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const className = compact ? "scale-[0.82] origin-center" : "";
  return <div className={`relative flex min-h-[150px] w-full min-w-0 max-w-full items-center justify-center overflow-hidden ${className}`}>
    {item.previewId === "tai-button" && <div className="flex flex-wrap justify-center gap-3"><TaiButton>Deploy system</TaiButton><TaiButton variant="outline">Inspect</TaiButton></div>}
    {item.previewId === "wipe-button" && <WipeButton className="bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Explore source</WipeButton>}
    {item.previewId === "text-roll" && <div className="text-center font-mono text-2xl font-bold uppercase text-white"><TextRoll text="HIGH CONVICTION UI" /></div>}
    {item.previewId === "masked-text-reveal" && <MaskedTextReveal text="SOURCE YOU CAN OWN" className="text-center font-mono text-xl font-bold uppercase text-white" />}
    {item.previewId === "button-text-roll" && <button className="border border-white/[0.15] bg-tai-sheet px-5 py-3 font-mono text-xs uppercase text-white"><ButtonTextRoll text="VERIFY SIGNATURE" /></button>}
    {item.previewId === "arrow-roll" && <button className="group flex items-center gap-3 border border-white/[0.15] bg-tai-sheet px-5 py-3 font-mono text-xs uppercase text-white"><span>Read docs</span><ArrowRoll /></button>}
    {item.previewId === "product-mockup" && <ProductMockup title="ThinkAI Console" domain="console.thinkai.studio" type="homelab" />}
    {item.previewId === "three-halftone-canvas" && <div className="relative h-40 w-full min-w-0 max-w-full overflow-hidden"><ThreeHalftoneCanvas className="absolute inset-0 h-full w-full" /></div>}
    {item.previewId === "halftone-banner" && <div className="relative h-40 w-full min-w-0 max-w-full overflow-hidden"><ThreeHalftoneCanvas className="absolute inset-0 h-full w-full" /><span className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-widest text-white">Optional visual layer</span></div>}
    {item.previewId === "tech-logos" && <div className="flex flex-wrap justify-center gap-3"><TechLogo name="Go" /><TechLogo name="Docker" /><TechLogo name="Linux" /></div>}
    {item.previewId === "about-drawer" && <><button onClick={() => setOpen(true)} className="border border-white/[0.15] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Open {item.title}</button><AboutDrawer isOpen={open} onClose={() => setOpen(false)} lang="en" /></>}
    {item.previewId === "architecture-modal" && <><button onClick={() => setOpen(true)} className="border border-white/[0.15] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Open {item.title}</button><ArchitectureModal projectId={open ? "homelab" : null} onClose={() => setOpen(false)} lang="en" /></>}
    {item.previewId === "contact-modal" && <><button onClick={() => setOpen(true)} className="border border-white/[0.15] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black">Open {item.title}</button><ContactModal isOpen={open} onClose={() => setOpen(false)} /></>}
    {item.previewId === "tai-header" && <div className="w-full border-y border-white/[0.12] px-4 py-3 text-center font-mono text-xs uppercase text-zinc-300">ThinkAI UI / Components / Docs</div>}
    {item.previewId === "smooth-scroll" && <div className="border border-white/[0.12] p-5 font-mono text-xs uppercase text-zinc-400">Native scroll → Lenis optional</div>}
    {item.previewId === "ai-brand-icons" && <div className="font-mono text-xs uppercase tracking-widest text-emerald-400">Provider marks / labelled</div>}
  </div>;
}
