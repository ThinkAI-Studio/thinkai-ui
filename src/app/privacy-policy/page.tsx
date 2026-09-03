import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { WipeButton } from "@/components/tai-ui/WipeButton";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy and telemetry policy for the ThinkAI UI component registry and CLI.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-tai-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <WipeButton asChild className="px-4 py-2 bg-zinc-900 border border-white/20 text-white text-xs">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Showcase
            </Link>
          </WipeButton>
        </div>

        <div className="bg-tai-sheet border border-white/[0.08] p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h1 className="text-3xl font-mono font-bold tracking-tight text-white uppercase">
              Privacy & Telemetry Policy
            </h1>
          </div>

          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
            Last Updated: September 2026 · ThinkAI Studio
          </p>

          <div className="space-y-8 text-sm text-zinc-300 leading-relaxed font-sans">
            <section>
              <h2 className="text-base font-mono font-semibold text-white uppercase tracking-wider mb-2">
                1. Zero Data Collection on Registry Primitives
              </h2>
              <p>
                The components provided in <strong>thinkai-ui</strong> are distributed as pure source code files (.tsx). Once copied into your repository via <code className="bg-black/60 px-1.5 py-0.5 border border-white/10 text-emerald-400 font-mono">npx thinkai-ui add</code>, they contain zero tracking scripts, telemetry hooks, or background analytics. You own 100% of the runtime execution.
              </p>
            </section>

            <section>
              <h2 className="text-base font-mono font-semibold text-white uppercase tracking-wider mb-2">
                2. CLI Privacy Guarantee
              </h2>
              <p>
                The <code className="bg-black/60 px-1.5 py-0.5 border border-white/10 text-emerald-400 font-mono">thinkai-ui</code> CLI operates strictly via stateless HTTP GET requests to fetch public component manifests from our registry. The CLI does not transmit machine identifiers, IP addresses, or telemetry back to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-mono font-semibold text-white uppercase tracking-wider mb-2">
                3. Showcase Website Analytics
              </h2>
              <p>
                This showcase website uses privacy-friendly Vercel Web Analytics. We do not use third-party advertising cookies, fingerprinting mechanisms, or cross-site tracking scripts.
              </p>
            </section>

            <section>
              <h2 className="text-base font-mono font-semibold text-white uppercase tracking-wider mb-2">
                4. Contact & Inquiries
              </h2>
              <p>
                For security inquiries or legal questions, direct correspondence to{" "}
                <a
                  href="mailto:contact@binhminh.thinkai.id.vn"
                  className="text-white underline underline-offset-4 hover:text-emerald-400 transition-colors"
                >
                  contact@binhminh.thinkai.id.vn
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
