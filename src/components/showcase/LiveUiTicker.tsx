"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { WipeButton, ButtonTextRoll, TextRoll, TaiButton } from "@/components/tai-ui/TaiButton";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { NumberFlow } from "@/components/tai-ui/NumberFlow";
import { DrawUnderline } from "@/components/tai-ui/DrawUnderline";
import { ProgressiveBlur } from "@/components/tai-ui/ProgressiveBlur";
import { ProductMockup } from "@/components/tai-ui/ProductMockup";
import {
  OpenAiIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
} from "@/components/tai-ui/AiBrandIcons";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { TaiIconButton } from "@/components/tai-ui/TaiIconButton";

export function LiveUiTicker() {
  const track1 = [
    {
      id: "tai-button",
      slug: "tai-button",
      docPath: "/docs/ui/tai-button",
      title: "TaiButton",
      category: "Action",
      render: () => (
        <div className="flex items-center justify-center p-4">
          <TaiButton className="px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-wider shadow-md">
            Deploy system
          </TaiButton>
        </div>
      ),
    },
    {
      id: "wipe-button",
      slug: "tai-button",
      docPath: "/docs/ui/tai-button",
      title: "WipeButton",
      category: "Action",
      render: () => (
        <div className="flex items-center justify-center p-4">
          <WipeButton className="px-5 py-2.5 bg-tai-text text-tai-bg font-mono font-bold text-xs uppercase tracking-wider shadow-md">
            Hover to Wipe
          </WipeButton>
        </div>
      ),
    },
    {
      id: "ai-brand-icons",
      slug: "ai-brand-icons",
      docPath: "/docs/icons/ai-brand-icons",
      title: "AiBrandIcons",
      category: "Iconography",
      render: () => (
        <div className="p-4 flex items-center justify-around text-tai-text">
          <div className="p-2 border border-tai-border hover:border-tai-accent hover:text-tai-accent transition-colors" title="OpenAI">
            <OpenAiIcon size={20} />
          </div>
          <div className="p-2 border border-tai-border hover:border-tai-accent hover:text-tai-accent transition-colors" title="Claude">
            <ClaudeIcon size={20} />
          </div>
          <div className="p-2 border border-tai-border hover:border-tai-accent hover:text-tai-accent transition-colors" title="Gemini">
            <GeminiIcon size={20} />
          </div>
          <div className="p-2 border border-tai-border hover:border-tai-accent hover:text-tai-accent transition-colors" title="Perplexity">
            <PerplexityIcon size={20} />
          </div>
        </div>
      ),
    },
    {
      id: "tech-logos",
      slug: "tech-logos",
      docPath: "/docs/icons/tech-logos",
      title: "TechLogos",
      category: "Display",
      render: () => (
        <div className="p-4 flex items-center justify-around text-tai-text">
          <TechLogo name="Go" />
          <TechLogo name="Docker" />
          <TechLogo name="Linux" />
        </div>
      ),
    },
    {
      id: "number-flow",
      slug: "number-flow",
      docPath: "/docs/motion/number-flow",
      title: "NumberFlow",
      category: "Text",
      render: () => (
        <div className="p-4 flex items-center justify-center font-mono text-2xl font-bold text-tai-text">
          <NumberFlow value={1234567} />
        </div>
      ),
    },
    {
      id: "product-mockup",
      slug: "product-mockup",
      docPath: "/docs/ui/product-mockup",
      title: "ProductMockup",
      category: "Display",
      render: () => (
        <div className="p-3">
          <ProductMockup title="Console" domain="ui.thinkai.id.vn" type="homelab" />
        </div>
      ),
    },
  ];

  const track2 = [
    {
      id: "button-text-roll",
      slug: "tai-button",
      docPath: "/docs/ui/tai-button",
      title: "ButtonTextRoll",
      category: "Kinetic Micro",
      render: () => (
        <div className="flex items-center justify-center p-4">
          <div className="px-4 py-2.5 bg-tai-card border border-tai-border hover:border-tai-accent hover:text-tai-accent text-tai-text font-mono uppercase text-xs tracking-wider cursor-pointer transition-colors shadow-md">
            <ButtonTextRoll text="HOVER TO TUMBLE" />
          </div>
        </div>
      ),
    },
    {
      id: "masked-text-reveal",
      slug: "masked-text-reveal",
      docPath: "/docs/motion/masked-text-reveal",
      title: "MaskedTextReveal",
      category: "Typography",
      render: () => (
        <div className="p-4 text-center space-y-1">
          <div className="font-mono text-sm font-bold text-white uppercase tracking-tight">
            <TextRoll text="ARCHITECTURAL" />
          </div>
          <MaskedTextReveal
            text="ZERO BORDER-RADIUS"
            className="text-[10px] font-mono text-[#52adcf] uppercase tracking-wider"
          />
        </div>
      ),
    },
    {
      id: "draw-underline",
      slug: "draw-underline",
      docPath: "/docs/motion/draw-underline",
      title: "DrawUnderline",
      category: "Text",
      render: () => (
        <div className="p-4 flex items-center justify-center font-mono text-xs uppercase text-tai-text">
          <DrawUnderline>Read the source</DrawUnderline>
        </div>
      ),
    },
    {
      id: "progressive-blur",
      slug: "progressive-blur",
      docPath: "/docs/motion/progressive-blur",
      title: "ProgressiveBlur",
      category: "Effects",
      render: () => (
        <div className="p-4 flex items-center justify-center">
          <ProgressiveBlur>
            <div className="h-10 w-40 border border-tai-border bg-tai-card" />
          </ProgressiveBlur>
        </div>
      ),
    },
    {
      id: "tai-icon-button",
      slug: "tai-icon-button",
      docPath: "/docs/icons/tai-icon-button",
      title: "TaiIconButton",
      category: "Controls",
      render: () => (
        <div className="p-4 flex items-center justify-center gap-2">
          <TaiIconButton label="Settings"><Terminal className="w-4 h-4" /></TaiIconButton>
          <TaiButton size="sm">Run</TaiButton>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full group">
        <div className="flex flex-col gap-4 animate-marquee-up group-hover:[animation-play-state:paused]">
          {track1.concat(track1).map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-tai-card border border-tai-border hover:border-tai-accent transition-all shadow-md flex flex-col justify-between"
            >
              <div className="px-3.5 py-2 border-b border-tai-border bg-tai-sheet flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-tai-text">
                  <Terminal className="w-3 h-3 text-tai-accent" />
                  <span className="font-bold uppercase tracking-wider">{item.title}</span>
                </div>
                <Link
                  href={item.docPath}
                  className="text-tai-muted hover:text-tai-accent flex items-center gap-0.5 text-[10px] transition-colors"
                  title="View documentation"
                >
                  <span>docs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="bg-tai-surface/40 min-h-[105px] flex items-center justify-center">
                {item.render()}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:flex flex-col gap-4 animate-marquee-up-slow group-hover:[animation-play-state:paused]">
          {track2.concat(track2).map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-tai-card border border-tai-border hover:border-tai-accent transition-all shadow-md flex flex-col justify-between"
            >
              <div className="px-3.5 py-2 border-b border-tai-border bg-tai-sheet flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-tai-text">
                  <Terminal className="w-3 h-3 text-tai-accent" />
                  <span className="font-bold uppercase tracking-wider">{item.title}</span>
                </div>
                <Link
                  href={item.docPath}
                  className="text-tai-muted hover:text-tai-accent flex items-center gap-0.5 text-[10px] transition-colors"
                  title="View documentation"
                >
                  <span>docs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="bg-tai-surface/40 min-h-[105px] flex items-center justify-center">
                {item.render()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
