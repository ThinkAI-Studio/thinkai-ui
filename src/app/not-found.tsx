import Link from "next/link";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { ArrowRight, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-tai-bg text-center relative overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-lg w-full bg-tai-sheet border border-white/[0.08] p-8 md:p-12 text-left shadow-2xl">
        <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>HTTP 404 · ROUTE_NOT_FOUND</span>
        </div>

        <h1 className="text-5xl font-mono font-bold tracking-tighter text-white mb-4">
          404.NULL
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed mb-8">
          The requested resource path does not exist in the ThinkAI UI decentralized registry. Verify the component slug or return to the active registry catalog.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <WipeButton asChild className="px-6 py-3 bg-white text-black font-bold">
            <Link href="/" className="flex items-center gap-2">
              Return to Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </WipeButton>
          <WipeButton asChild className="px-6 py-3 bg-zinc-900 border border-white/20 text-white">
            <a href="https://github.com/ThinkAI-Studio/thinkai-ui" target="_blank" rel="noopener noreferrer">
              GitHub Repo
            </a>
          </WipeButton>
        </div>
      </div>
    </div>
  );
}
