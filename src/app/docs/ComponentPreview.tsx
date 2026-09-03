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
import { TaiInput } from "@/components/tai-ui/TaiInput";
import { TaiSelect } from "@/components/tai-ui/TaiSelect";
import { TaiCheckbox } from "@/components/tai-ui/TaiCheckbox";
import { TaiSwitch } from "@/components/tai-ui/TaiSwitch";
import { TaiTabs } from "@/components/tai-ui/TaiTabs";
import { TaiAccordion } from "@/components/tai-ui/TaiAccordion";
import { TaiDialog } from "@/components/tai-ui/TaiDialog";
import { TaiToast } from "@/components/tai-ui/TaiToast";
import { BorderTrail } from "@/components/tai-ui/BorderTrail";
import { DrawUnderline } from "@/components/tai-ui/DrawUnderline";
import { NumberFlow } from "@/components/tai-ui/NumberFlow";
import { TextMorph } from "@/components/tai-ui/TextMorph";
import { TextRevealBlock } from "@/components/tai-ui/TextRevealBlock";
import { TextScramble } from "@/components/tai-ui/TextScramble";
import type { CatalogItem } from "@/data/catalog";

export function ComponentPreview({ item, compact = false }: { item: CatalogItem; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(true);
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
    {item.previewId === "tai-input" && <div className="w-full max-w-sm"><TaiInput label="Project name" placeholder="ThinkAI Studio" description="A short, source-owned label." /></div>}
    {item.previewId === "tai-select" && <div className="w-full max-w-sm"><TaiSelect label="Environment" defaultValue="preview" options={[{ label: "Preview", value: "preview" }, { label: "Production", value: "production" }]} /></div>}
    {item.previewId === "tai-checkbox" && <TaiCheckbox label="Keep source in my repository" defaultChecked description="No hidden runtime dependency." />}
    {item.previewId === "tai-switch" && <div className="w-full max-w-sm"><TaiSwitch label="Enable motion preview" defaultChecked description="Reduced motion remains respected." /></div>}
    {item.previewId === "tai-tabs" && <div className="w-full max-w-lg"><TaiTabs tabs={[{ value: "overview", label: "Overview", content: "A compact view for the current primitive." }, { value: "source", label: "Source", content: "Readable TypeScript remains the product." }]} /></div>}
    {item.previewId === "tai-accordion" && <div className="w-full max-w-lg"><TaiAccordion items={[{ value: "ownership", title: "Why source ownership?", content: "The installed component remains editable in your repository." }, { value: "motion", title: "What about motion?", content: "Motion explains state and respects reduced motion." }]} /></div>}
    {item.previewId === "tai-dialog" && <><TaiButton onClick={() => setOpen(true)}>Open dialog</TaiButton><TaiDialog open={open} onOpenChange={setOpen} title="Confirm source install" description="This is a focused task surface, not a documentation replacement."><p className="text-sm leading-6 text-zinc-400">The component will remain source-owned in your project.</p></TaiDialog></>}
    {item.previewId === "tai-toast" && <><TaiButton variant="outline" onClick={() => setToastOpen(true)}>Show feedback</TaiButton><TaiToast open={toastOpen} title="Copied" description="The usage snippet is ready to paste." onClose={() => setToastOpen(false)} duration={0} className="!absolute bottom-2 right-2" /></>}
    {item.previewId === "text-scramble" && <div className="font-mono text-xl font-bold uppercase text-white"><TextScramble text="SOURCE OWNERSHIP" /></div>}
    {item.previewId === "text-morph" && <div className="font-mono text-xl font-bold uppercase text-white"><TextMorph text="MOTION WITH A JOB" /></div>}
    {item.previewId === "text-reveal-block" && <div className="font-mono text-xl font-bold uppercase text-white"><TextRevealBlock>BUILD WITH INTENT</TextRevealBlock></div>}
    {item.previewId === "draw-underline" && <div className="font-mono text-xl uppercase text-white"><DrawUnderline>Read the source</DrawUnderline></div>}
    {item.previewId === "border-trail" && <BorderTrail className="w-full max-w-sm bg-tai-sheet p-8 text-center font-mono text-xs uppercase tracking-widest text-zinc-300">Focused surface</BorderTrail>}
    {item.previewId === "number-flow" && <div className="font-mono text-4xl font-bold text-white"><NumberFlow value="30+" /></div>}
  </div>;
}
