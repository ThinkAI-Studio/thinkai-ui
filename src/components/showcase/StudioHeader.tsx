"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Terminal, Github } from "lucide-react";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";

interface StudioHeaderProps {
  onOpenAbout: () => void;
  onOpenArch?: () => void;
  onOpenContact?: () => void;
  onOpenCommandMenu: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function StudioHeader({
  onOpenAbout,
  onOpenArch,
  onOpenContact,
  onOpenCommandMenu,
}: StudioHeaderProps) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerEl = document.querySelector("footer");
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top <= 120) {
          setIsHeaderHidden(true);
          return;
        }
      }
      setIsHeaderHidden(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId?: string) => {
    setIsMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={
          isHeaderHidden && !isMobileMenuOpen
            ? { opacity: 0, y: -14, filter: "blur(12px)", transition: { duration: 0.35, ease: LUXURY_EASE } }
            : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: LUXURY_EASE } }
        }
        className="fixed top-0 inset-x-0 z-50 bg-transparent px-4 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between pointer-events-none select-none"
      >
        {/* Left: Authentic ThinkAI Studio Floating Logo */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            href="/"
            className="group flex items-center gap-3 p-1 transition-transform hover:scale-105 active:scale-95"
            aria-label="Home — ThinkAI Studio UI Registry"
            title="Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/thinkai_studio_logo.png"
                alt="ThinkAI Studio"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors drop-shadow-md">
                THINKAI UI
              </span>
              <span className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
                REGISTRY v1.1
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Command-First Navigation (No center nav pill - AI nav pattern) */}
        {/* Navigation moved to command menu (⌘K) - distinctive pattern */}

        {/* Right: Quick Search + CLI Action Button */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenCommandMenu}
            className="hidden sm:flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-xl border border-white/[0.1] hover:border-white/30 text-xs font-mono text-zinc-400 hover:text-white transition-colors active:translate-y-px"
            title="Search Primitives (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px]">SEARCH</span>
            <kbd className="px-1 py-0.2 bg-zinc-900 border border-white/10 text-[9px] text-zinc-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Star Button */}
          <Link
            href="/docs"
            className="hidden md:inline-flex items-center border border-white/[0.1] bg-black/60 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-zinc-300 transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
          >
            Docs
          </Link>
          <a
            href="https://github.com/ThinkAI-Studio/thinkai-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/60 backdrop-blur-xl border border-white/[0.1] text-zinc-300 hover:text-white hover:border-white/30 transition-colors active:opacity-80"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Start with CLI Action Button */}
          <WipeButton
            textColor="#05070a"
            hoverTextColor="#05070a"
            className="px-3 sm:px-4 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-tight shadow-xl"
            onClick={() => {
              navigator.clipboard.writeText("npx thinkai-ui init");
            }}
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <ButtonTextRoll text="INIT CLI" className="font-bold text-xs" />
              <ArrowRoll size="sm" />
            </div>
          </WipeButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white font-mono text-xs uppercase tracking-wider px-2 py-1.5 bg-black/60 border border-white/10"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </motion.header>

      {/* Mobile Slide-Down Curtain Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="fixed top-0 inset-x-0 z-40 bg-[#09090b]/98 backdrop-blur-3xl pt-24 pb-8 px-6 border-b border-white/[0.08] shadow-2xl md:hidden flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4 text-2xl font-mono font-bold uppercase tracking-tight text-white pt-2">
              <button
                onClick={() => handleNavClick()}
                className="text-left text-white hover:text-emerald-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("workbench")}
                className="text-left text-white hover:text-emerald-400 transition-colors"
              >
                Workbench
              </button>
              <Link
                href="/docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-white transition-colors hover:text-emerald-400"
              >
                Documentation
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAbout();
                }}
                className="text-left text-white hover:text-emerald-400 transition-colors"
              >
                About Studio
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col gap-3">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Quick Install
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("npx thinkai-ui init");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-3 bg-black border border-white/10 font-mono text-xs text-white"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>npx thinkai-ui init</span>
                </div>
                <span className="text-[10px] bg-white text-black font-bold px-2 py-0.5">COPY</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
