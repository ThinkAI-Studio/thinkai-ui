"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Copy, LoaderCircle, MessageCircle, Search, Send, Trash2, X } from "lucide-react";
import { answerQuestion, docPages, searchDocs, type Answer, type DocPage } from "./docs-data";

const groups = [
  { label: "Guide", pages: ["installation"] },
  { label: "Components", pages: ["tai-button", "wipe-button"] },
  { label: "System", pages: ["motion", "accessibility", "design-principles"] },
];

export default function DocsClient({ page = docPages[0] }: { page?: DocPage }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReduced = useReducedMotion();
  const searchResults = searchDocs(searchQuery);
  return (
    <main className="min-h-screen bg-tai-bg text-white font-sans">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#08080a]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <Link href="/" className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:text-emerald-400"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />ThinkAI UI</Link>
          <nav className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500" aria-label="Documentation sections"><button onClick={() => setSearchOpen((value) => !value)} aria-expanded={searchOpen} aria-controls="docs-search" className="inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"><Search className="h-3.5 w-3.5" /><span className="hidden sm:inline">Search</span></button><Link href="/docs" className="hidden transition-colors hover:text-white sm:inline">Docs</Link><Link href="/docs/motion" className="transition-colors hover:text-white">Motion</Link><Link href="/docs/ui" className="transition-colors hover:text-white">UI</Link><BookOpen className="h-4 w-4 text-emerald-400" /></nav>
        </div>
        {searchOpen && <div id="docs-search" className="border-t border-white/[0.08] px-4 py-4 sm:px-8"><div className="mx-auto max-w-[1480px]"><label htmlFor="docs-search-input" className="sr-only">Search docs</label><input id="docs-search-input" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search components, motion, accessibility…" className="w-full border border-white/[0.12] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus-visible:outline-2 focus-visible:outline-emerald-400" /><div className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-4">{searchResults.map((result) => <Link key={`${result.kind}-${result.slug}`} href={`/docs/${result.slug}`} onClick={() => setSearchOpen(false)} className="border border-white/[0.08] px-3 py-2 text-xs text-zinc-400 hover:border-emerald-400/50 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><span className="mr-2 font-mono text-[9px] uppercase text-emerald-400">{result.kind}</span>{result.title}</Link>)}</div></div></div>}
      </header>
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[190px_minmax(0,1fr)_180px] lg:gap-14 lg:py-14">
        <aside className="lg:sticky lg:top-28 lg:h-fit"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Guide</p>{groups.map((group) => <div key={group.label} className="mb-7"><p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{group.label}</p><nav className="space-y-1">{group.pages.map((slug) => { const item = docPages.find((entry) => entry.slug === slug)!; return <Link key={slug} href={`/docs/${slug}`} className={`block border-l px-3 py-2 text-xs transition-[border-color,color,transform] hover:translate-x-1 hover:text-white ${page.slug === slug ? "border-emerald-400 text-white" : "border-white/[0.1] text-zinc-500"}`}>{item.title}</Link>; })}</nav></div>)}</aside>
        <article className="min-w-0">
          <motion.div initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }}><div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">{page.category}</div><h1 className="font-mono text-4xl font-bold uppercase tracking-[-0.05em] sm:text-6xl">{page.title}</h1><p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">{page.summary}</p><div className="mt-7 flex flex-wrap gap-2"><button className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.06] px-3 py-2 font-mono text-[10px] uppercase text-zinc-300 transition-[background-color,transform] hover:bg-white/[0.1] active:translate-y-px"><Copy className="h-3.5 w-3.5" />Copy Markdown</button><span className="border border-white/[0.08] px-3 py-2 font-mono text-[10px] uppercase text-zinc-600">Source-owned</span></div></motion.div>
          <div className="mt-12 space-y-14">{page.sections.map((section, index) => <motion.section id={section.id} key={section.id} initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 25, delay: index * 0.04 }} className="scroll-mt-28"><div className="mb-4 flex items-start gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center bg-white/[0.08] font-mono text-xs text-zinc-400">{index + 1}</span><h2 className="font-mono text-xl font-bold uppercase tracking-tight sm:text-2xl">{section.title}</h2></div><p className="ml-11 max-w-3xl text-sm leading-8 text-zinc-300">{section.body}</p>{section.code && <div className="ml-11 mt-5 overflow-x-auto border border-white/[0.1] bg-tai-sheet p-5 font-mono text-xs leading-7 text-emerald-300"><code>{section.code}</code></div>}</motion.section>)}</div>
        </article>
        <aside className="lg:sticky lg:top-28 lg:h-fit"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">On this page</p><nav className="space-y-3 border-l border-white/[0.1] pl-4">{page.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block text-xs text-zinc-500 transition-colors hover:text-white">{section.title}</a>)}</nav><Link href="https://github.com/ThinkAI-Studio/thinkai-ui" target="_blank" rel="noreferrer" className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase text-zinc-500 transition-colors hover:text-white">View source <ArrowUpRight className="h-3.5 w-3.5" /></Link></aside>
      </div>
      <AskAi open={chatOpen} onToggle={() => setChatOpen((open) => !open)} prefersReduced={prefersReduced} />
    </main>
  );
}

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; answer?: Answer; status: "loading" | "answered" | "error" };

const starterPrompts = ["How do I install a component?", "What is the motion baseline?", "How should I handle keyboard focus?"];

function AskAi({ open, onToggle, prefersReduced }: { open: boolean; onToggle: () => void; prefersReduced: boolean | null }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"Ready" | "Searching" | "Answered">("Ready");
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) onToggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle, open]);

  const ask = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || status === "Searching") return;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    const assistantId = `assistant-${requestId}`;
    setQuestion("");
    setStatus("Searching");
    setMessages((current) => [...current, { id: `user-${requestId}`, role: "user", text: trimmed }, { id: assistantId, role: "assistant", text: "", status: "loading" }]);
    await new Promise((resolve) => window.setTimeout(resolve, 420));
    if (requestRef.current !== requestId) return;
    const result = answerQuestion(trimmed);
    setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, text: result.answer, answer: result, status: result.confidenceState === "fallback" ? "error" : "answered" } : message));
    setStatus("Answered");
  };

  const clearConversation = () => {
    requestRef.current += 1;
    setMessages([]);
    setStatus("Ready");
    inputRef.current?.focus();
  };

  const setPrompt = (prompt: string) => {
    setQuestion(prompt);
    inputRef.current?.focus();
  };

  const statusLabel = status === "Searching" ? "Searching local docs" : status === "Answered" ? "Answered from local docs" : "Ready";
  return <>
    <button onClick={onToggle} aria-expanded={open} aria-controls="ask-ai-panel" className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 border border-white/[0.15] bg-tai-sheet px-4 py-3 font-mono text-xs uppercase text-white shadow-2xl transition-[background-color,transform] hover:-translate-y-1 hover:bg-tai-card focus-visible:outline-2 focus-visible:outline-white active:translate-y-px"><MessageCircle className="h-4 w-4 text-emerald-400" />Ask AI</button>
    <AnimatePresence>
      {open && <>
        <motion.button aria-label="Close Ask AI" onClick={onToggle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/45 lg:hidden" />
        <motion.aside id="ask-ai-panel" role="dialog" aria-modal="true" aria-labelledby="ask-ai-title" initial={{ opacity: 0, x: prefersReduced ? 0 : 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: prefersReduced ? 0 : 18 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 28 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] min-w-0 flex-col border-l border-white/[0.1] bg-tai-sheet shadow-2xl">
          <div className="shrink-0 border-b border-white/[0.1] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 font-mono text-sm font-bold uppercase" id="ask-ai-title"><span className="h-2 w-2 bg-emerald-400" />Ask AI <span className="text-zinc-600">· Docs</span></div><div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500" aria-live="polite"><span className={`h-1.5 w-1.5 ${status === "Searching" ? "bg-amber-300" : "bg-emerald-400"}`} />{statusLabel}</div></div><div className="flex items-center gap-2"><button onClick={clearConversation} aria-label="Clear conversation" disabled={!messages.length} className="p-1.5 text-zinc-600 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"><Trash2 className="h-4 w-4" /></button><button onClick={onToggle} aria-label="Close Ask AI" className="p-1.5 text-zinc-500 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"><X className="h-5 w-5" /></button></div></div>
            <p className="mt-4 text-xs leading-6 text-zinc-500">Answers use the local ThinkAI UI docs only. Verify before applying them to your project.</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6" aria-live="polite">
            {!messages.length ? <div className="pt-8"><div className="border-l-2 border-emerald-400 pl-4"><p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Docs copilot</p><p className="mt-3 text-sm leading-7 text-zinc-300">Ask a focused question about the primitives, their motion, or how to use them.</p></div><div className="mt-8 space-y-2">{starterPrompts.map((prompt) => <button key={prompt} onClick={() => setPrompt(prompt)} className="block w-full border border-white/[0.1] p-3 text-left text-xs leading-5 text-zinc-400 transition-colors hover:border-emerald-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-white">{prompt}<ArrowUpRight className="float-right mt-0.5 h-3.5 w-3.5 text-zinc-600" /></button>)}</div></div> : <div className="space-y-6">{messages.map((message) => <ChatBubble key={message.id} message={message} prefersReduced={prefersReduced} />)}</div>}
          </div>
          <form onSubmit={ask} className="shrink-0 border-t border-white/[0.1] bg-tai-sheet p-5 sm:p-6"><label htmlFor="ask-ai-input" className="sr-only">Ask a question</label><div className="flex min-w-0 items-center border border-white/[0.15] bg-black"><input ref={inputRef} id="ask-ai-input" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about the docs" autoComplete="off" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus-visible:outline-2 focus-visible:outline-emerald-400" /><button type="submit" aria-label="Send question" disabled={!question.trim() || status === "Searching"} className="p-3 text-zinc-400 transition-colors hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40"><Send className="h-4 w-4" /></button></div><p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-700">Enter to send · local index</p></form>
        </motion.aside>
      </>}
    </AnimatePresence>
  </>;
}

function ChatBubble({ message, prefersReduced }: { message: ChatMessage; prefersReduced: boolean | null }) {
  if (message.role === "user") return <motion.div initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[92%] break-words border border-white/[0.08] bg-white/[0.07] p-4 text-sm leading-6 text-white [overflow-wrap:anywhere]">{message.text}</motion.div>;
  if (message.status === "loading") return <div className="flex items-center gap-3 border-l-2 border-emerald-400/50 pl-4 text-xs text-zinc-500" aria-label="Searching local docs"><LoaderCircle className={`h-4 w-4 text-emerald-400/70 ${prefersReduced ? "" : "animate-spin"}`} />Searching local docs…</div>;
  const fallback = message.status === "error";
  return <motion.div initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} className={`border-l-2 pl-4 text-sm leading-7 [overflow-wrap:anywhere] ${fallback ? "border-amber-300/70 text-zinc-300" : "border-emerald-400 text-zinc-300"}`}><p>{fallback && <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-amber-300">Topic not indexed</span>}{message.text}</p>{message.answer && <div className="mt-4 flex flex-wrap gap-2">{[message.answer].map((source, index) => <motion.div key={source.sourceSlug} initial={{ opacity: 0, y: prefersReduced ? 0 : 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : index * 0.06 }}><Link href={`/docs/${source.sourceSlug}`} className="inline-flex max-w-full items-center gap-2 border border-white/[0.12] px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-400 transition-colors hover:border-emerald-400/70 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><Check className="h-3 w-3 text-emerald-400" /><span className="truncate">{source.sourceTitle}</span></Link></motion.div>)}</div>}</motion.div>;
}
