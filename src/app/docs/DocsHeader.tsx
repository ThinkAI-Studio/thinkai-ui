"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function DocsHeader({ searchOpen = false, onSearchToggle, mobileNavOpen = false, onMobileNavToggle }: { searchOpen?: boolean; onSearchToggle?: () => void; mobileNavOpen?: boolean; onMobileNavToggle?: () => void }) {
  const router = useRouter();

  return <header className="sticky top-0 z-40 border-b border-tai-border bg-tai-bg/90 backdrop-blur-xl">
    <div className="hidden border-b border-tai-border bg-tai-surface/60 px-4 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-tai-muted sm:block">Source-owned components · local-first documentation</div>
    <div className="mx-auto flex min-h-16 max-w-[1480px] items-center justify-between gap-3 px-3 sm:gap-5 sm:px-8">
      <Link href="/" prefetch={false} onClick={(event) => { event.preventDefault(); router.push("/"); }} className="inline-flex min-w-0 shrink-0 items-center gap-3 whitespace-nowrap text-tai-text" aria-label="Home — ThinkAI UI Registry">
        <Image src="/images/thinkai_studio_logo.png" alt="ThinkAI Studio" width={28} height={28} className="tai-brand-mark h-7 w-7 shrink-0 object-contain" priority />
        <span className="hidden whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest sm:inline">ThinkAI UI</span>
      </Link>
      <nav className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-widest text-tai-muted md:flex" aria-label="Documentation sections">
        <Link href="/docs" className="transition-colors hover:text-tai-text">Docs</Link>
        <Link href="/docs/motion" className="transition-colors hover:text-tai-text">Motion</Link>
        <Link href="/docs/icons" className="transition-colors hover:text-tai-text">Icons</Link>
        <Link href="/docs/ui" className="transition-colors hover:text-tai-text">UI</Link>
        <Link href="/catalog" className="transition-colors hover:text-tai-text">Catalog</Link>
      </nav>
      <div className="flex items-center gap-2 text-tai-muted">
        {onSearchToggle ? <button type="button" onClick={onSearchToggle} aria-expanded={searchOpen} aria-controls="docs-search" aria-label="Search documentation" title="Search documentation" className="inline-flex min-h-11 items-center gap-2 border border-transparent px-2 py-1.5 text-xs transition-colors hover:border-tai-border hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"><Search className="h-3.5 w-3.5" /><span className="hidden lg:inline">Search</span><kbd className="hidden border border-tai-border bg-tai-surface px-1 font-mono text-[9px] lg:inline">⌘ K</kbd></button> : <Link href="/docs" aria-label="Search documentation" title="Search documentation" className="inline-flex min-h-11 items-center gap-2 border border-transparent px-2 py-1.5 text-xs transition-colors hover:border-tai-border hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"><Search className="h-3.5 w-3.5" /><span className="hidden lg:inline">Search</span><kbd className="hidden border border-tai-border bg-tai-surface px-1 font-mono text-[9px] lg:inline">⌘ K</kbd></Link>}
        <a href="https://github.com/ThinkAI-Studio/thinkai-ui" target="_blank" rel="noreferrer" aria-label="ThinkAI UI on GitHub" className="hidden border border-transparent p-2 transition-colors hover:border-tai-border hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus sm:inline-flex"><Github className="h-4 w-4" /></a>
        <ThemeToggle />
        {onMobileNavToggle && <button type="button" onClick={onMobileNavToggle} aria-expanded={mobileNavOpen} aria-controls="docs-mobile-sidebar" aria-label={mobileNavOpen ? "Close documentation menu" : "Open documentation menu"} title={mobileNavOpen ? "Close documentation menu" : "Open documentation menu"} className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-transparent text-tai-muted transition-colors hover:border-tai-border hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus md:hidden">
          {mobileNavOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </button>}
      </div>
    </div>
  </header>;
}
