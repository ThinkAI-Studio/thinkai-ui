"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Code2, Copy, Eye, ExternalLink, Terminal } from "lucide-react";
import { catalogItems, type CatalogItem } from "@/data/catalog";
import { ComponentPreview } from "./ComponentPreview";

export function CatalogIndex({ kind }: { kind: CatalogItem["kind"] }) {
  const items = catalogItems.filter((item) => item.kind === kind);
  const title = kind === "motion" ? "Motion primitives" : "UI primitives";
  const summary = kind === "motion"
    ? "Purposeful transitions, reveal patterns, and interaction physics for ThinkAI surfaces."
    : "Source-owned application primitives with sharp geometry and explicit states.";

  return (
    <main className="min-h-screen bg-tai-bg text-white font-sans">
      <CatalogHeader eyebrow={kind === "motion" ? "Motion" : "UI"} title={title} summary={summary} />
      <div className="mx-auto grid max-w-[1480px] gap-5 px-4 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-2">
        {items.map((item) => <CatalogCard key={item.slug} item={item} />)}
      </div>
    </main>
  );
}

export default function ComponentDocClient({ item }: { item: CatalogItem }) {
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(item.usage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="min-h-screen bg-tai-bg text-white font-sans">
      <CatalogHeader eyebrow={`${item.kind} / ${item.category}`} title={item.title} summary={item.description} />
      <div className="mx-auto grid max-w-[1480px] gap-10 px-4 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:pb-24">
        <article className="min-w-0">
          <section className="border border-white/[0.1] bg-tai-sheet tai-inset-top">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] p-4">
              <div className="flex items-center gap-1 border border-white/[0.1] bg-black p-1" role="tablist" aria-label="Component view">
                <ViewTab active={mode === "preview"} onClick={() => setMode("preview")} icon={<Eye className="h-3.5 w-3.5" />}>Preview</ViewTab>
                <ViewTab active={mode === "code"} onClick={() => setMode("code")} icon={<Code2 className="h-3.5 w-3.5" />}>Code</ViewTab>
              </div>
              <button onClick={copy} className="inline-flex items-center gap-2 border border-white/[0.12] px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 transition-colors hover:border-emerald-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-white">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy usage"}
              </button>
            </div>
            <div className="min-h-[280px] min-w-0 overflow-hidden bg-black/20 p-5 sm:p-8">
              {mode === "preview" ? <ComponentPreview item={item} /> : <pre className="h-full overflow-x-auto whitespace-pre-wrap break-words text-xs leading-7 text-emerald-300"><code>{item.usage}</code></pre>}
            </div>
          </section>

          <DocSection title="Usage"><div className="flex items-start justify-between gap-4 border border-white/[0.1] bg-black p-4"><code className="min-w-0 break-words text-xs leading-6 text-emerald-300">{item.usage}</code><Terminal className="h-4 w-4 shrink-0 text-zinc-600" /></div></DocSection>
          <DocSection title="When to use"><p>{item.whenToUse}</p><p className="mt-3 text-zinc-500">Avoid it when: {item.whenNotToUse}</p></DocSection>
          <DocSection title="Accessibility"><ul className="space-y-2">{item.accessibility.map((note) => <li key={note} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-emerald-400" />{note}</li>)}</ul></DocSection>
          <DocSection title="Reduced motion"><p>{item.reducedMotion}</p>{item.motionNotes && <p className="mt-3 text-zinc-500">Motion note: {item.motionNotes}</p>}</DocSection>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Install</p><div className="border border-white/[0.1] bg-tai-sheet p-4"><code className="break-words text-[11px] leading-6 text-zinc-300">npx thinkai-ui add {item.slug}</code></div></div>
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Variants</p><ul className="space-y-2 border-l border-white/[0.1] pl-4 text-xs text-zinc-400">{item.variants.map((variant) => <li key={variant}>{variant}</li>)}</ul></div>
          {item.props && <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Props</p><div className="overflow-hidden border border-white/[0.1] bg-tai-sheet">{item.props.map((prop) => <div key={prop.name} className="border-b border-white/[0.08] p-3 last:border-0"><code className="text-xs text-white">{prop.name}</code><p className="mt-1 text-[11px] text-emerald-300">{prop.type}</p><p className="mt-1 text-[11px] leading-5 text-zinc-500">{prop.description}{prop.defaultValue ? ` Default: ${prop.defaultValue}.` : ""}</p></div>)}</div></div>}
          <Link href={`https://github.com/ThinkAI-Studio/thinkai-ui/blob/main/${item.sourcePath}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white">View source <ExternalLink className="h-3.5 w-3.5" /></Link>
        </aside>
      </div>
    </main>
  );
}

function CatalogHeader({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return <header className="mx-auto max-w-[1480px] px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16"><Link href="/" className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white">ThinkAI UI <span className="text-zinc-700">/</span> Catalog</Link><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">{eyebrow}</p><h1 className="mt-4 max-w-3xl font-mono text-4xl font-bold uppercase tracking-[-0.05em] sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">{summary}</p></header>;
}

function CatalogCard({ item }: { item: CatalogItem }) {
  return <Link href={`/docs/${item.kind}/${item.slug}`} className="group min-w-0 border border-white/[0.1] bg-tai-sheet tai-inset-top transition-[border-color,transform] hover:-translate-y-1 hover:border-emerald-400/50 focus-visible:outline-2 focus-visible:outline-white"><div className="flex items-center justify-between gap-3 border-b border-white/[0.08] p-4"><span className="font-mono text-sm font-bold uppercase">{item.title}</span><span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">{item.category}</span></div><div className="min-h-[180px] min-w-0 overflow-hidden bg-black/20 p-5"><ComponentPreview item={item} compact /></div><div className="border-t border-white/[0.08] p-4"><p className="text-xs leading-6 text-zinc-400">{item.description}</p><span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400">Read docs <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span></div></Link>;
}

function ViewTab({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: string }) {
  return <button role="tab" aria-selected={active} onClick={onClick} className={`inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-widest focus-visible:outline-2 focus-visible:outline-white ${active ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}>{icon}{children}</button>;
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-b border-white/[0.1] py-8 text-sm leading-7 text-zinc-300 first:mt-2"><h2 className="mb-4 font-mono text-lg font-bold uppercase tracking-tight text-white">{title}</h2>{children}</section>;
}
