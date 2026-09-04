"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Code2, Copy, Eye, ExternalLink, Terminal } from "lucide-react";
import { catalogItems, type CatalogItem } from "@/data/catalog";
import { ComponentPreview } from "./ComponentPreview";

export function CatalogIndex({ kind }: { kind?: CatalogItem["kind"] }) {
  const items = kind ? catalogItems.filter((item) => item.kind === kind) : catalogItems;
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const visibleItems = category === "All" ? items : items.filter((item) => item.category === category);
  const title = kind === "motion" ? "Motion primitives" : kind === "icons" ? "Icons" : kind === "ui" ? "UI primitives" : "ThinkAI UI catalog";
  const summary = kind === "motion"
    ? "Purposeful transitions, reveal patterns, and interaction physics for ThinkAI surfaces."
    : kind === "icons" ? "Factual technology marks and labelled controls for ThinkAI surfaces." : kind === "ui" ? "Source-owned application primitives with sharp geometry and explicit states." : "Motion, UI and icon resources with readable source, focused previews and direct installation.";

  return (
    <div className="min-w-0">
      <div className="w-full max-w-[1120px]">
            <CatalogHero eyebrow={kind === "motion" ? "Motion" : kind === "icons" ? "Icons" : kind === "ui" ? "UI" : "Catalog"} title={title} summary={summary} />
            <div className="mb-6 flex min-w-0 gap-1 overflow-x-auto border-b border-tai-border pb-px" role="group" aria-label={`${kind ?? "catalog"} category filters`}>
              {categories.map((itemCategory) => <button key={itemCategory} type="button" aria-pressed={category === itemCategory} onClick={() => setCategory(itemCategory)} className={`shrink-0 border-b-2 px-3 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-tai-focus ${category === itemCategory ? "border-tai-accent text-tai-text" : "border-transparent text-tai-subtle hover:text-tai-text"}`}>{itemCategory}</button>)}
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {visibleItems.map((item) => <CatalogCard key={item.slug} item={item} />)}
            </div>
      </div>
    </div>
  );
}

export default function ComponentDocClient({ item }: { item: CatalogItem }) {
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.usage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,920px)_220px] lg:gap-14 lg:pb-10">
        <article className="min-w-0 w-full">
          <CatalogHero eyebrow={`${item.kind} / ${item.category}`} title={item.title} summary={item.description} />
          <section className="border border-tai-border bg-tai-sheet tai-inset-top">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-tai-border p-4">
              <div className="flex items-center gap-1 border border-tai-border bg-tai-bg p-1" role="tablist" aria-label="Component view">
                <ViewTab active={mode === "preview"} onClick={() => setMode("preview")} icon={<Eye className="h-3.5 w-3.5" />}>Preview</ViewTab>
                <ViewTab active={mode === "code"} onClick={() => setMode("code")} icon={<Code2 className="h-3.5 w-3.5" />}>Code</ViewTab>
              </div>
              <button type="button" onClick={copy} aria-live="polite" className="inline-flex min-h-11 items-center gap-2 border border-tai-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-tai-muted transition-colors hover:border-tai-accent hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy usage"}
              </button>
            </div>
            <div className="min-h-[280px] min-w-0 overflow-hidden bg-tai-bg p-5 sm:p-8">
              {mode === "preview" ? <ComponentPreview item={item} /> : <pre className="h-full overflow-x-auto whitespace-pre-wrap break-words text-xs leading-7 text-tai-accent"><code>{item.usage}</code></pre>}
            </div>
          </section>

          <DocSection title="Usage"><div className="flex items-start justify-between gap-4 border border-tai-border bg-tai-bg p-4"><code className="min-w-0 break-words text-xs leading-6 text-tai-accent">{item.usage}</code><Terminal className="h-4 w-4 shrink-0 text-tai-subtle" /></div></DocSection>
          <DocSection title="When to use"><p>{item.whenToUse}</p><p className="mt-3 text-tai-muted">Avoid it when: {item.whenNotToUse}</p></DocSection>
          <DocSection title="Accessibility"><ul className="space-y-2">{item.accessibility.map((note) => <li key={note} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-tai-accent" />{note}</li>)}</ul></DocSection>
          <DocSection title="Reduced motion"><p>{item.reducedMotion}</p>{item.motionNotes && <p className="mt-3 text-tai-muted">Motion note: {item.motionNotes}</p>}</DocSection>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-tai-subtle">Install</p><div className="border border-tai-border bg-tai-sheet p-4"><code className="break-words text-[11px] leading-6 text-tai-muted">npx thinkai-ui add {item.slug}</code></div></div>
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-tai-subtle">Variants</p><ul className="space-y-2 border-l border-tai-border pl-4 text-xs text-tai-muted">{item.variants.map((variant) => <li key={variant}>{variant}</li>)}</ul></div>
          {item.props && <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-tai-subtle">Props</p><div className="overflow-hidden border border-tai-border bg-tai-sheet">{item.props.map((prop) => <div key={prop.name} className="border-b border-tai-border p-3 last:border-0"><code className="text-xs text-tai-text">{prop.name}</code><p className="mt-1 text-[11px] text-tai-accent">{prop.type}</p><p className="mt-1 text-[11px] leading-5 text-tai-muted">{prop.description}{prop.defaultValue ? ` Default: ${prop.defaultValue}.` : ""}</p></div>)}</div></div>}
          <Link href={`https://github.com/ThinkAI-Studio/thinkai-ui/blob/main/${item.sourcePath}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-tai-muted hover:text-tai-text">View source <ExternalLink className="h-3.5 w-3.5" /></Link>
        </aside>
    </div>
  );
}

function CatalogHero({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return <header className="pb-10 sm:pb-12"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tai-accent">{eyebrow}</p><h1 className="mt-4 max-w-3xl font-mono text-4xl font-bold uppercase tracking-[-0.05em] text-tai-text sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-tai-muted">{summary}</p></header>;
}

function CatalogCard({ item }: { item: CatalogItem }) {
  return <article className="group min-w-0 border border-tai-border bg-tai-sheet tai-inset-top transition-[border-color,transform] hover:-translate-y-1 hover:border-tai-accent"><div className="flex items-center justify-between gap-3 border-b border-tai-border p-4"><Link href={`/docs/${item.kind}/${item.slug}`} className="min-w-0 font-mono text-sm font-bold uppercase text-tai-text hover:text-tai-accent focus-visible:outline-2 focus-visible:outline-tai-focus">{item.title}</Link><span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-tai-subtle">{item.category}</span></div><div className="min-h-[180px] min-w-0 overflow-hidden bg-tai-bg p-5"><ComponentPreview item={item} compact /></div><div className="border-t border-tai-border p-4"><p className="text-xs leading-6 text-tai-muted">{item.description}</p><Link href={`/docs/${item.kind}/${item.slug}`} className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-tai-accent focus-visible:outline-2 focus-visible:outline-tai-focus">Read docs <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" /></Link></div></article>;
}

function ViewTab({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: string }) {
  return <button type="button" role="tab" aria-selected={active} onClick={onClick} className={`inline-flex min-h-11 items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-widest focus-visible:outline-2 focus-visible:outline-tai-focus ${active ? "bg-tai-text text-tai-bg" : "text-tai-muted hover:bg-tai-surface hover:text-tai-text"}`}>{icon}{children}</button>;
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-b border-tai-border py-8 text-sm leading-7 text-tai-text first:mt-2"><h2 className="mb-4 font-mono text-lg font-bold uppercase tracking-tight text-tai-text">{title}</h2>{children}</section>;
}
