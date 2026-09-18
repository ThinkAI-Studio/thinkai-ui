"use client";

import { useState } from "react";
import { StudioHeader } from "@/components/showcase/StudioHeader";
import { HomeHeroAsymmetric } from "@/components/showcase/HomeHeroAsymmetric";
import { ArchitecturalPillars } from "@/components/showcase/ArchitecturalPillars";
import { DocsHandoffBanner } from "@/components/showcase/DocsHandoffBanner";
import { StudioFooter } from "@/components/showcase/StudioFooter";
import { StickyMobileCta } from "@/components/showcase/StickyMobileCta";
import { CommandMenu } from "@/components/showcase/CommandMenu";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { ContactModal } from "@/components/tai-ui/ContactModal";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-tai-bg text-tai-text selection:bg-[#2985b8]/30 selection:text-white transition-colors duration-300">
      <SmoothScroll isLocked={aboutOpen || archOpen || contactOpen || commandMenuOpen} />
      
      {/* 01 · Floating 3-Island Apparatus Navbar */}
      <StudioHeader
        onOpenAbout={() => setAboutOpen(true)}
        onOpenArch={() => setArchOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pb-24 md:pb-0">
        {/* 02 · Asymmetrical Hero: Left-aligned narrative + Right continuous live UI ticker */}
        <HomeHeroAsymmetric />

        {/* 03 · Architectural Convictions: 3 Concise Pillars */}
        <ArchitecturalPillars />

        {/* 04 · Complete System Lives in Docs Callout */}
        <DocsHandoffBanner />
      </main>

      {/* 06 · Clean Developer HUD Footer */}
      <StudioFooter />
      
      {/* Mobile Sticky Action Bar */}
      <StickyMobileCta />

      {/* Global Keyboard Command Menu (⌘K) */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />

      {/* Shared Overlay Portals */}
      <AboutDrawer
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        lang="en"
      />
      <ArchitectureModal
        projectId={archOpen ? "homelab" : null}
        onClose={() => setArchOpen(false)}
        lang="en"
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
