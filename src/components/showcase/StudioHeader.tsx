"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Github, Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { RadiusToggle } from "@/components/theme/RadiusToggle";
import { TAI_EASE } from "@/lib/motion";

interface StudioHeaderProps {
  onOpenAbout?: () => void;
  onOpenArch?: () => void;
  onOpenContact?: () => void;
  onOpenCommandMenu: () => void;
}

export function StudioHeader({ onOpenCommandMenu }: StudioHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 sm:top-5 inset-x-0 z-50 pointer-events-none px-4 sm:px-8 select-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* ISLAND 1 (LEFT): Brand Identity */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: TAI_EASE.luxury, delay: 0 }}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 bg-tai-sheet/90 backdrop-blur-xl border border-tai-border shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all hover:border-tai-border-strong"
          >
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="ThinkAI Studio — Home"
            >
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/images/thinkai_studio_logo.png"
                  alt="ThinkAI Studio"
                  fill
                  sizes="20px"
                  className="tai-brand-mark object-contain"
                  priority
                />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-tai-text">
                ThinkAI UI
              </span>
            </Link>
          </motion.div>

          {/* ISLAND 2 (CENTER): Primary Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: TAI_EASE.luxury, delay: 0.08 }}
            className="pointer-events-auto hidden md:flex items-center px-4 py-2 bg-tai-sheet/90 backdrop-blur-xl border border-tai-border shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          >
            <nav className="flex items-center gap-2">
              <Link
                href="/docs"
                className="px-3 py-1 text-xs font-sans text-tai-muted hover:text-tai-text transition-colors"
              >
                Components
              </Link>
              <Link
                href="/docs"
                className="px-3 py-1 text-xs font-sans text-tai-muted hover:text-tai-accent flex items-center gap-1 transition-colors"
              >
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </Link>
              <Link
                href="/docs/installation"
                className="px-3 py-1 text-xs font-sans text-tai-muted hover:text-tai-text transition-colors"
              >
                Installation
              </Link>
            </nav>
          </motion.div>

          {/* ISLAND 3 (RIGHT): Controls & GitHub Repository */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: TAI_EASE.luxury, delay: 0.16 }}
            className="pointer-events-auto hidden md:flex items-center bg-tai-sheet/90 backdrop-blur-xl border border-tai-border shadow-[0_8px_30px_rgba(0,0,0,0.15)] divide-x divide-tai-border"
          >
            <div className="flex items-center px-2 py-1 gap-1">
              <button
                onClick={onOpenCommandMenu}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-tai-muted hover:text-tai-text transition-colors"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5" />
                <kbd className="px-1 py-0.2 bg-tai-surface border border-tai-border text-[9px] text-tai-subtle">⌘K</kbd>
              </button>
              <div className="flex items-center gap-1.5 px-1">
                <RadiusToggle />
                <ThemeToggle />
              </div>
            </div>

            {/* Authentic GitHub Repository Button (Zero Fabricated Metrics) */}
            <a
              href="https://github.com/ThinkAI-Studio/thinkai-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 bg-tai-card hover:bg-tai-surface text-tai-text font-mono text-xs font-bold transition-colors"
              title="View repository on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </motion.div>

          {/* MOBILE TOGGLE PILL */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: TAI_EASE.luxury, delay: 0 }}
            className="pointer-events-auto md:hidden flex items-center gap-2 px-3 py-2 bg-tai-sheet/90 backdrop-blur-xl border border-tai-border text-tai-text"
          >
            <RadiusToggle />
            <ThemeToggle />
            <button
              onClick={onOpenCommandMenu}
              className="p-1 text-tai-muted hover:text-tai-text"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-tai-muted hover:text-tai-text"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </motion.div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: TAI_EASE.snappy }}
          className="fixed top-16 inset-x-4 z-40 bg-tai-sheet border border-tai-border p-5 backdrop-blur-2xl shadow-2xl md:hidden select-none"
        >
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 text-tai-muted hover:text-tai-accent border-b border-tai-border transition-colors"
            >
              01 · Components
            </Link>
            <Link
              href="/docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 text-tai-muted hover:text-tai-accent border-b border-tai-border transition-colors"
            >
              02 · Documentation Hub
            </Link>
            <Link
              href="/docs/installation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 text-tai-muted hover:text-tai-accent border-b border-tai-border transition-colors"
            >
              03 · CLI Quickstart
            </Link>
            <a
              href="https://github.com/ThinkAI-Studio/thinkai-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left py-2 text-tai-muted hover:text-tai-text transition-colors"
            >
              04 · GitHub Repository
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
