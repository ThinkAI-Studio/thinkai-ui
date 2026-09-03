"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus, Minus } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      q: "How does thinkai-ui differ from standard component libraries?",
      a: "Unlike traditional NPM libraries (MUI, Chakra) that install compiled packages into node_modules, thinkai-ui is a registry-first system (similar to shadcn/ui). It copies pure, customizable TypeScript/Tailwind source code directly into your repository. You retain 100% control, zero bloat, and no blackbox dependencies.",
    },
    {
      q: "Is thinkai-ui fully compatible with Next.js 16 and React 19?",
      a: "Yes. All components are built for React 19 Server and Client Components, strict TypeScript, and Tailwind CSS v4. They are tested under Next.js Turbopack and support React 19 features seamlessly.",
    },
    {
      q: "Can I customize the colors, font tracking, or easing curves?",
      a: "Absolutely. The components rely on design tokens declared in globals.css (@theme) and src/lib/motion.ts. Because you own the component source code, you can tweak any CSS class, animation parameter, or Radix prop directly in your project.",
    },
    {
      q: "How does thinkai-ui handle accessibility (WCAG AAA) and reduced motion?",
      a: "Every interactive component includes 4-tier reduced-motion fallbacks (Bail, Snap, Collapse, Reduce). When a user enables prefers-reduced-motion, transitions resolve instantly, WebGL shaders throttle down, and crisp 2px focus outlines are enforced.",
    },
    {
      q: "Is thinkai-ui free and open-source?",
      a: "Yes. thinkai-ui is 100% free and released under the permissive MIT License for both personal and commercial projects.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.08]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase">
          FAQ
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans">
          Answers about installation, ownership, and accessibility.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-tai-sheet border border-white/[0.08] tai-inset-top transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full p-5 flex items-center justify-between text-left font-mono text-sm font-semibold text-white uppercase tracking-tight hover:text-emerald-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="p-1 bg-zinc-900 border border-white/[0.1] text-zinc-400 shrink-0 ml-4">
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
