import Link from "next/link";
import { BookOpen, Layers3, Settings2 } from "lucide-react";
import { docPages } from "./docs-data";

type DocsGroup =
  | { label: "Guide"; pages: readonly string[] }
  | { label: "Library"; links: readonly { label: string; href: string }[] }
  | { label: "System"; pages: readonly string[] };

export const docsGroups = [
  { label: "Guide", pages: ["installation", "accessibility", "roadmap", "changelog", "contributing", "troubleshooting"] },
  { label: "Library", links: [{ label: "UI", href: "/docs/ui" }, { label: "Motion", href: "/docs/motion" }, { label: "Icons", href: "/docs/icons" }] },
  { label: "System", pages: ["motion-system", "accessibility", "design-principles"] },
] as const satisfies readonly DocsGroup[];

export function DocsSidebar({ activeSlug, activeHref }: { activeSlug?: string; activeHref?: string }) {
  return <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit" aria-label="Documentation navigation">
    {docsGroups.map((group) => {
      const GroupIcon = group.label === "Guide" ? BookOpen : group.label === "Library" ? Layers3 : Settings2;
      return <section key={group.label} className="mb-8">
        <div className="mb-3 flex items-center gap-3 text-tai-muted"><span className="grid h-7 w-7 shrink-0 place-items-center border border-tai-border bg-tai-surface"><GroupIcon className="h-3.5 w-3.5" aria-hidden="true" /></span><h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">{group.label}</h2></div>
        <nav className="ml-3 border-l border-tai-border" aria-label={`${group.label} pages`}>
          {"pages" in group && group.pages.map((slug) => { const item = docPages.find((entry) => entry.slug === slug); if (!item) return null; const active = activeSlug === slug; return <Link key={slug} href={`/docs/${slug}`} aria-current={active ? "page" : undefined} className={`group relative block min-h-11 min-w-0 px-5 py-2.5 text-sm transition-[border-color,color,transform] hover:translate-x-1 ${active ? "-ml-px border-l border-tai-accent text-tai-text" : "border-l border-transparent text-tai-muted hover:border-tai-border-strong hover:text-tai-text"}`}><span className="block truncate">{item.title}</span></Link>; })}
          {"links" in group && group.links.map((link) => { const active = activeHref === link.href; return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`group relative block min-h-11 min-w-0 px-5 py-2.5 text-sm transition-[border-color,color,transform] hover:translate-x-1 ${active ? "-ml-px border-l border-tai-accent text-tai-text" : "border-l border-transparent text-tai-muted hover:border-tai-border-strong hover:text-tai-text"}`}><span className="block truncate">{link.label}</span></Link>; })}
        </nav>
      </section>;
    })}
  </aside>;
}
