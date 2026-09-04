"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { TAI_EASE } from "@/lib/motion";

interface ProductMockupProps {
  title: string;
  headline?: string;
  description?: string;
  domain: string;
  type?: "homelab" | "thinkai";
}

const SCREENSHOTS = {
  homelab: "/images/products/hostdeck-screen.png",
  thinkai: "/images/products/thinkai-screen.png",
};

export function ProductMockup({
  title,
  domain,
  type = "homelab",
}: ProductMockupProps) {
  const prefersReduced = useReducedMotion();
  const screenSrc = SCREENSHOTS[type];
  return (
    <motion.figure
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: TAI_EASE.luxury }}
      className="relative w-full rounded-none overflow-hidden border border-white/[0.08] bg-[#0a0a0c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_60px_-15px_rgba(0,0,0,0.9)] group transition-[border-color,box-shadow] duration-500 hover:border-white/[0.22] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_32px_80px_-15px_rgba(0,0,0,0.95)]"
    >
      {/* Real product screenshot; the user's browser supplies the chrome. */}
      <a
        href={`https://${domain}`}
        target="_blank"
        rel="noreferrer"
        className="group/preview relative block aspect-[16/10] w-full overflow-hidden bg-[#060608]"
        aria-label={`Open live preview of ${domain}`}
      >
        {/* Screenshot Image with Smooth Luxury Scale */}
        <Image
          src={screenSrc}
          alt={`${title} live screenshot preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/preview:scale-[1.03]"
          priority
        />

        {/* Subtle Diagonal Glass Glare Sweep on Hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
        />

        {/* Dark Vignette Frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

        {/* Floating Quick Action Badge on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100 pointer-events-none">
          <span className="inline-flex items-center gap-2 border border-tai-accent/70 bg-tai-bg/90 px-4 py-2.5 font-mono text-xs font-bold tracking-wider text-tai-text shadow-2xl backdrop-blur-sm">
            <span>VISIT {domain.toUpperCase()}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-tai-accent" />
          </span>
        </div>
      </a>

      <figcaption className="flex flex-col gap-3 border-t border-white/[0.06] bg-[#0c0c0e]/95 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-white/80">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span className="truncate font-mono font-bold uppercase tracking-wider text-[10.5px]">
            {title}
          </span>
        </div>
        <a
          href={`https://${domain}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-white/50 transition-colors hover:text-white"
        >
          <span className="truncate">{domain}</span>
          <ArrowUpRight className="h-3 w-3 shrink-0" />
        </a>
      </figcaption>
    </motion.figure>
  );
}

export default ProductMockup;
