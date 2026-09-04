"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { StudioHeader } from "@/components/showcase/StudioHeader";
import { HeroSection } from "@/components/showcase/HeroSection";
import { StudioWorkbench } from "@/components/showcase/StudioWorkbench";
import { StickyMobileCta } from "@/components/showcase/StickyMobileCta";
import { Footer } from "@/components/showcase/Footer";
import { CommandMenu } from "@/components/showcase/CommandMenu";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { MotionPhysicsLab } from "@/components/showcase/MotionPhysicsLab";
import { ContrastMatrix } from "@/components/showcase/ContrastMatrix";
import { FaqSection } from "@/components/showcase/FaqSection";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const heroMotion = prefersReduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[#08080a] text-white selection:bg-white/20">
      <SmoothScroll isLocked={aboutOpen || archOpen || contactOpen || commandMenuOpen} />
      
      {/* Floating Glass Navigation Header */}
      <StudioHeader
        onOpenAbout={() => setAboutOpen(true)}
        onOpenArch={() => setArchOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pb-24 md:pb-0">
        {/* Cinematic Hero with Quantum Matrix Substrate */}
        <motion.div {...heroMotion} viewport={{ once: true, amount: 0.08 }} transition={{ duration: prefersReduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <HeroSection onOpenCommandMenu={() => setCommandMenuOpen(true)} />
        </motion.div>

        {/* Studio Tri-Pane Component Workbench */}
        <div>
          <StudioWorkbench
            onOpenAbout={() => setAboutOpen(true)}
            onOpenArch={() => setArchOpen(true)}
            onOpenContact={() => setContactOpen(true)}
          />
        </div>

        <div>
          <MotionPhysicsLab />
        </div>
        <div>
          <ContrastMatrix />
        </div>
        <div>
          <FaqSection />
        </div>

      </main>

      <Footer />
      <StickyMobileCta />

      {/* Global Keyboard Command Menu */}
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
