"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, Terminal, Github } from "lucide-react";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
  const router = useRouter();
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
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 bg-transparent px-3 py-3 pointer-events-none select-none sm:px-8 sm:py-5 lg:px-12"
      >
        {/* Left: Authentic ThinkAI Studio Floating Logo */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            href="/"
            prefetch={false}
            onClick={(event) => { event.preventDefault(); router.push("/"); }}
            className="group flex min-w-0 shrink-0 items-center gap-3 whitespace-nowrap p-1 transition-transform hover:scale-105 active:scale-95"
            aria-label="Home — ThinkAI Studio UI Registry"
            title="Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/thinkai_studio_logo.png"
                alt="ThinkAI Studio"
                fill
                sizes="32px"
                className="tai-brand-mark object-contain"
                priority
              />
            </div>
            <div className="flex min-w-0 shrink-0 flex-col">
              <span className="whitespace-nowrap font-mono text-[13px] font-bold uppercase tracking-tight text-tai-text transition-colors group-hover:text-tai-accent drop-shadow-md sm:text-sm">
                THINKAI UI
              </span>
              <span className="text-[9.5px] font-mono text-tai-muted uppercase tracking-widest hidden sm:inline">
                REGISTRY v1.1
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Command-First Navigation (No center nav pill - AI nav pattern) */}
        {/* Navigation moved to command menu (⌘K) - distinctive pattern */}

        {/* Right: Quick Search + CLI Action Button */}
        <div className="flex shrink-0 items-center gap-1.5 pointer-events-auto sm:gap-3">
          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenCommandMenu}
            className="hidden sm:flex items-center gap-2 px-3 py-2 bg-tai-sheet backdrop-blur-xl border border-tai-border hover:border-tai-border-strong text-xs font-mono text-tai-muted hover:text-tai-text transition-colors active:translate-y-px"
            title="Search Primitives (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-tai-muted" />
            <span className="text-[11px]">SEARCH</span>
            <kbd className="px-1 py-0.2 bg-tai-surface border border-tai-border text-[9px] text-tai-muted font-mono">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Star Button */}
          <Link
            href="/docs"
            className="hidden md:inline-flex items-center border border-tai-border bg-tai-sheet px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-tai-muted transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-tai-border-strong hover:text-tai-text"
          >
            Docs
          </Link>
          <a
            href="https://github.com/ThinkAI-Studio/thinkai-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-tai-sheet backdrop-blur-xl border border-tai-border text-tai-muted hover:text-tai-text hover:border-tai-border-strong transition-colors active:opacity-80"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          <ThemeToggle />

          {/* Start with CLI Action Button */}
          <WipeButton
            textColor="#05070a"
            hoverTextColor="#05070a"
            className="hidden px-3 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-tight shadow-xl sm:inline-flex sm:px-4"
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
            className="md:hidden text-tai-text font-mono text-xs uppercase tracking-wider px-2 py-1.5 bg-tai-sheet border border-tai-border"
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
            className="fixed top-0 inset-x-0 z-40 bg-tai-sheet backdrop-blur-3xl pt-24 pb-8 px-6 border-b border-tai-border shadow-2xl md:hidden flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4 text-2xl font-mono font-bold uppercase tracking-tight text-tai-text pt-2">
              <button
                onClick={() => handleNavClick()}
                className="text-left text-tai-text hover:text-tai-accent transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("workbench")}
                className="text-left text-tai-text hover:text-tai-accent transition-colors"
              >
                Workbench
              </button>
              <Link
                href="/docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-tai-text transition-colors hover:text-tai-accent"
              >
                Documentation
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAbout();
                }}
                className="text-left text-tai-text hover:text-tai-accent transition-colors"
              >
                About Studio
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col gap-3">
              <div className="text-[10px] font-mono text-tai-subtle uppercase tracking-widest">
                Quick Install
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("npx thinkai-ui init");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-3 bg-tai-bg border border-tai-border font-mono text-xs text-tai-text"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-tai-accent" />
                  <span>npx thinkai-ui init</span>
                </div>
                <span className="text-[10px] bg-tai-text text-tai-bg font-bold px-2 py-0.5">COPY</span>
              </button>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
