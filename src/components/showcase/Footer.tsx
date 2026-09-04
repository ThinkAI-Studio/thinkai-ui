import Image from "next/image";
import Link from "next/link";
import { Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#09090b] border-t border-white/[0.08] pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Statement-Style Footer (Ft5) - Single Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Brand & Bio */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-7 h-7 shrink-0 drop-shadow-md">
                <Image
                  src="/images/thinkai_studio_logo.png"
                  alt="ThinkAI Studio"
                  fill
                  sizes="28px"
                    className="tai-brand-mark object-contain"
                />
              </div>
              <span className="font-mono text-sm font-bold text-white uppercase tracking-tight">
                ThinkAI Studio UI
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-4">
              Engineered with 0px sharp architectural geometry, obsidian monochromatic depth, and precision motion physics for modern digital craft.
            </p>
            <div className="text-xs font-mono text-zinc-500">
              Authored by{" "}
              <a
                href="https://binhminh.thinkai.id.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 underline underline-offset-4 hover:text-emerald-400 transition-colors"
              >
                Nguyen Binh Minh
              </a>{" "}
              (DevOps Engineer & Founder).
            </div>
          </div>

          {/* Essential Links - Compact Single Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <Link
              href="/privacy-policy"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-700">|</span>
            <a
              href="https://github.com/ThinkAI-Studio/thinkai-ui/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              MIT License
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href="https://github.com/ThinkAI-Studio/thinkai-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href="https://binhminh.thinkai.id.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>Portfolio</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 ThinkAI Studio · Nguyen Binh Minh. All rights reserved.
          </div>
          <div className="text-zinc-600">
            WCAG 2.2 AA target · Next.js 16 · React 19
          </div>
        </div>
      </div>
    </footer>
  );
}
