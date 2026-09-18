"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { BorderTrail } from "@/components/tai-ui/BorderTrail";
import { TaiSwitch } from "@/components/tai-ui/TaiSwitch";
import { TaiBadge } from "@/components/tai-ui/TaiBadge";
import { TextRoll } from "@/components/tai-ui/TextRoll";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { TaiButton } from "@/components/tai-ui/TaiButton";
import { TaiInput } from "@/components/tai-ui/TaiInput";
import { TaiTabs } from "@/components/tai-ui/TaiTabs";
import {
  OpenAiIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
} from "@/components/tai-ui/AiBrandIcons";

export function LiveUiTicker() {
  const [switchChecked, setSwitchChecked] = useState(true);

  // Column 1 primitives
  const track1 = [
    {
      id: "wipe-button",
      slug: "wipe-button",
      docPath: "/docs/wipe-button",
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
      id: "border-trail",
      slug: "border-trail",
      docPath: "/docs/motion/border-trail",
      title: "BorderTrail",
      category: "Effect",
      render: () => (
        <div className="p-3">
          <BorderTrail className="p-3 bg-tai-sheet border border-tai-border">
            <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
              <span className="text-tai-text font-bold">Edge Beam</span>
              <span className="text-tai-accent font-bold">ACTIVE</span>
            </div>
            <p className="text-[11px] text-tai-muted font-sans">
              Precision sapphire trajectory
            </p>
          </BorderTrail>
        </div>
      ),
    },
    {
      id: "tai-switch",
      slug: "tai-switch",
      docPath: "/docs/ui/tai-switch",
      title: "TaiSwitch & Badge",
      category: "Controls",
      render: () => (
        <div className="p-4 flex flex-col gap-2.5">
          <TaiSwitch
            label={<span className="font-mono text-xs text-tai-text">Turbopack Engine</span>}
            description="Sub-ms fast refresh"
            checked={switchChecked}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
          <div className="flex items-center gap-2 pt-1 border-t border-tai-border">
            <TaiBadge tone="accent">v1.0.0</TaiBadge>
            <TaiBadge tone="success">READY</TaiBadge>
            <TaiBadge tone="neutral">0PX</TaiBadge>
          </div>
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
  ];

  // Column 2 primitives
  const track2 = [
    {
      id: "button-text-roll",
      slug: "button-text-roll",
      docPath: "/docs/motion/text-roll",
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
      id: "tai-input-btn",
      slug: "tai-input",
      docPath: "/docs/ui/tai-input",
      title: "TaiInput & Button",
      category: "Forms",
      render: () => (
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <TaiInput
              defaultValue="npx thinkai-ui init"
              className="h-9 font-mono text-xs"
              readOnly
            />
            <TaiButton size="sm" variant="primary" className="h-9 px-3 shrink-0">
              Run
            </TaiButton>
          </div>
        </div>
      ),
    },
    {
      id: "text-roll",
      slug: "text-roll",
      docPath: "/docs/motion/text-roll",
      title: "Kinetic Typography",
      category: "Display",
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
      id: "tai-tabs",
      slug: "tai-tabs",
      docPath: "/docs/ui/tai-tabs",
      title: "TaiTabs",
      category: "Disclosure",
      render: () => (
        <div className="p-3">
          <TaiTabs
            tabs={[
              { value: "react", label: "React 19", content: null },
              { value: "next", label: "Next 16", content: null },
              { value: "v4", label: "Tailwind 4", content: null },
            ]}
            defaultValue="react"
            className="text-xs"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full group">
        
        {/* TRACK 1 (Normal Speed) */}
        <div className="flex flex-col gap-4 animate-marquee-up group-hover:[animation-play-state:paused]">
          {track1.concat(track1).map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-tai-card border border-tai-border hover:border-tai-accent transition-all shadow-md flex flex-col justify-between"
            >
              {/* Card Header */}
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

              {/* Card Live Body */}
              <div className="bg-tai-surface/40 min-h-[105px] flex items-center justify-center">
                {item.render()}
              </div>
            </div>
          ))}
        </div>

        {/* TRACK 2 (Offset Speed, hidden on smallest mobile screens for breathing room) */}
        <div className="hidden sm:flex flex-col gap-4 animate-marquee-up-slow group-hover:[animation-play-state:paused]">
          {track2.concat(track2).map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-tai-card border border-tai-border hover:border-tai-accent transition-all shadow-md flex flex-col justify-between"
            >
              {/* Card Header */}
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

              {/* Card Live Body */}
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
