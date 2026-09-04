"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, LoaderCircle, MessageCircle, Send, Trash2, X } from "lucide-react";
import { answerQuestion, docPages, type Answer, type DocPage } from "./docs-data";

export default function DocsClient({ page = docPages[0] }: { page?: DocPage }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const askTriggerRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const copyCode = async (sectionId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(sectionId);
      window.setTimeout(() => setCopiedCodeId((current) => current === sectionId ? null : current), 1600);
    } catch {
      setCopiedCodeId(null);
    }
  };

  const copyMarkdown = async () => {
    const markdown = [`# ${page.title}`, "", page.summary, "", ...page.sections.flatMap((section) => [`## ${section.title}`, "", section.body, ...(section.code ? ["", "```tsx", section.code, "```"] : []), ""])].join("\n");
    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedMarkdown(true);
      window.setTimeout(() => setCopiedMarkdown(false), 1600);
    } catch {
      setCopiedMarkdown(false);
    }
  };

  return (
    <>
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,920px)_180px] lg:gap-14">
        <article className="min-w-0 w-full">
          <motion.div initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }}><div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-tai-accent">{page.category}</div><h1 className="font-mono text-4xl font-bold uppercase tracking-[-0.05em] text-tai-text sm:text-6xl">{page.title}</h1><p className="mt-5 max-w-3xl text-base leading-8 text-tai-muted">{page.summary}</p><div className="mt-7 flex flex-wrap gap-2"><button type="button" onClick={() => void copyMarkdown()} className="inline-flex items-center gap-2 border border-tai-border bg-tai-surface px-3 py-2 font-mono text-[10px] uppercase text-tai-text transition-[background-color,transform] hover:bg-tai-card active:translate-y-px focus-visible:outline-2 focus-visible:outline-tai-focus" aria-live="polite">{copiedMarkdown ? <Check className="h-3.5 w-3.5 text-tai-accent" /> : <Copy className="h-3.5 w-3.5" />}{copiedMarkdown ? "Copied" : "Copy Markdown"}</button><span className="border border-tai-border px-3 py-2 font-mono text-[10px] uppercase text-tai-subtle">Source-owned</span></div></motion.div>
          <div className="mt-12 space-y-14">{page.sections.map((section, index) => <motion.section id={section.id} key={section.id} initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 25, delay: index * 0.04 }} className="scroll-mt-28"><div className="mb-4 flex items-start gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center bg-tai-surface font-mono text-xs text-tai-muted">{index + 1}</span><h2 className="font-mono text-xl font-bold tracking-tight text-tai-text sm:text-2xl">{section.title}</h2></div><p className="ml-11 max-w-3xl text-sm leading-8 text-tai-text">{section.body}</p>{section.code && <div className="ml-11 mt-5 overflow-hidden border border-tai-border bg-tai-sheet"><div className="flex items-center justify-between gap-3 border-b border-tai-border px-4 py-2.5"><span className="font-mono text-[10px] uppercase tracking-widest text-tai-subtle">Command</span><button type="button" onClick={() => void copyCode(section.id, section.code!)} className="inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-tai-muted transition-colors hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus">{copiedCodeId === section.id ? <Check className="h-3.5 w-3.5 text-tai-accent" /> : <Copy className="h-3.5 w-3.5" />}{copiedCodeId === section.id ? "Copied" : "Copy"}</button></div><pre className="overflow-x-auto p-5 font-mono text-xs leading-7 text-tai-accent"><code>{section.code}</code></pre></div>}</motion.section>)}</div>
        </article>
        <aside className="lg:sticky lg:top-28 lg:h-fit"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-tai-subtle">On this page</p><nav className="space-y-3 border-l border-tai-border pl-4">{page.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block text-xs text-tai-muted transition-colors hover:text-tai-text">{section.title}</a>)}</nav><Link href="https://github.com/ThinkAI-Studio/thinkai-ui" target="_blank" rel="noreferrer" className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase text-tai-muted transition-colors hover:text-tai-text">View source <ArrowUpRight className="h-3.5 w-3.5" /></Link></aside>
      </div>
      <AskAi open={chatOpen} onToggle={() => setChatOpen((open) => !open)} prefersReduced={prefersReduced} triggerRef={askTriggerRef} />
    </>
  );
}

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; answer?: Answer; status: "loading" | "answered" | "error" };

const starterPrompts = ["How do I install a component?", "What is the motion baseline?", "How should I handle keyboard focus?"];

function AskAi({ open, onToggle, prefersReduced, triggerRef }: { open: boolean; onToggle: () => void; prefersReduced: boolean | null; triggerRef: RefObject<HTMLButtonElement | null> }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"Ready" | "Searching" | "Answered">("Ready");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const parent = dialogRef.current?.parentElement;
    const inertSiblings = parent ? Array.from(parent.children).filter((element) => element !== dialogRef.current && !element.hasAttribute("data-ask-ai-backdrop")) : [];
    inertSiblings.forEach((element) => element.setAttribute("inert", ""));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onToggle();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input, [href], select, textarea, [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      inertSiblings.forEach((element) => element.removeAttribute("inert"));
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
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
    <button ref={triggerRef} type="button" onClick={onToggle} aria-expanded={open} aria-controls="ask-ai-panel" className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 border border-tai-border bg-tai-sheet px-4 py-3 font-mono text-xs uppercase text-tai-text shadow-2xl transition-[background-color,transform] hover:-translate-y-1 hover:bg-tai-card focus-visible:outline-2 focus-visible:outline-tai-focus active:translate-y-px"><MessageCircle className="h-4 w-4 text-tai-accent" />Ask AI</button>
    <AnimatePresence>
      {open && <>
        <motion.button type="button" tabIndex={-1} data-ask-ai-backdrop aria-label="Close Ask AI" onClick={onToggle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-tai-bg/70 lg:hidden" />
        <motion.aside ref={dialogRef} id="ask-ai-panel" role="dialog" aria-modal="true" aria-labelledby="ask-ai-title" data-lenis-prevent="true" data-lenis-prevent-wheel="true" data-lenis-prevent-touch="true" initial={{ opacity: 0, x: prefersReduced ? 0 : 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: prefersReduced ? 0 : 18 }} transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 28 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] min-w-0 flex-col border-l border-tai-border bg-tai-sheet shadow-2xl">
          <div className="shrink-0 border-b border-tai-border p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 font-mono text-sm font-bold uppercase" id="ask-ai-title"><span className="h-2 w-2 bg-tai-accent" />Ask AI <span className="text-tai-subtle">· Docs</span></div><div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-tai-subtle" aria-live="polite"><span className={`h-1.5 w-1.5 ${status === "Searching" ? "bg-amber-300" : "bg-tai-accent"}`} />{statusLabel}</div></div><div className="flex items-center gap-2"><button type="button" onClick={clearConversation} aria-label="Clear conversation" disabled={!messages.length} className="p-1.5 text-tai-subtle transition-colors hover:text-tai-text disabled:cursor-not-allowed disabled:opacity-40"><Trash2 className="h-4 w-4" /></button><button type="button" onClick={onToggle} aria-label="Close Ask AI" className="p-1.5 text-tai-muted transition-colors hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"><X className="h-5 w-5" /></button></div></div>
            <p className="mt-4 text-xs leading-6 text-tai-muted">Answers use the local ThinkAI UI docs only. Verify before applying them to your project.</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
            {!messages.length ? <div className="pt-8"><div className="border-l-2 border-tai-accent pl-4"><p className="font-mono text-xs uppercase tracking-widest text-tai-subtle">Docs copilot</p><p className="mt-3 text-sm leading-7 text-tai-text">Ask a focused question about the primitives, their motion, or how to use them.</p></div><div className="mt-8 space-y-2">{starterPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => setPrompt(prompt)} className="block w-full border border-tai-border p-3 text-left text-xs leading-5 text-tai-muted transition-colors hover:border-tai-accent hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus">{prompt}<ArrowUpRight className="float-right mt-0.5 h-3.5 w-3.5 text-tai-subtle" /></button>)}</div></div> : <div className="space-y-6">{messages.map((message) => <ChatBubble key={message.id} message={message} prefersReduced={prefersReduced} />)}</div>}
          </div>
          <form onSubmit={ask} className="shrink-0 border-t border-tai-border bg-tai-sheet p-5 sm:p-6"><label htmlFor="ask-ai-input" className="sr-only">Ask a question</label><div className="flex min-w-0 items-center border border-tai-border bg-tai-bg"><input ref={inputRef} id="ask-ai-input" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about the docs" autoComplete="off" aria-describedby="ask-ai-help" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-tai-text outline-none placeholder:text-tai-subtle focus-visible:outline-2 focus-visible:outline-tai-focus" /><button type="submit" aria-label="Send question" disabled={!question.trim() || status === "Searching"} className="p-3 text-tai-muted transition-colors hover:text-tai-accent focus-visible:outline-2 focus-visible:outline-tai-focus disabled:cursor-not-allowed disabled:opacity-40"><Send className="h-4 w-4" /></button></div><p id="ask-ai-help" className="mt-2 font-mono text-[10px] uppercase tracking-widest text-tai-subtle">Enter to send · local index</p></form>
        </motion.aside>
      </>}
    </AnimatePresence>
  </>;
}

function ChatBubble({ message, prefersReduced }: { message: ChatMessage; prefersReduced: boolean | null }) {
  if (message.role === "user") return <motion.div initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[92%] break-words border border-tai-border bg-tai-surface p-4 text-sm leading-6 text-tai-text [overflow-wrap:anywhere]">{message.text}</motion.div>;
  if (message.status === "loading") return <div role="status" className="flex items-center gap-3 border-l-2 border-tai-accent pl-4 text-xs text-tai-muted" aria-label="Searching local docs"><LoaderCircle className={`h-4 w-4 text-tai-accent ${prefersReduced ? "" : "animate-spin"}`} />Searching local docs…</div>;
  const fallback = message.status === "error";
  return <motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} className={`border-l-2 pl-4 text-sm leading-7 text-tai-text [overflow-wrap:anywhere] ${fallback ? "border-amber-600" : "border-tai-accent"}`}><p>{fallback && <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-amber-700">Topic not indexed</span>}{message.text}</p>{message.answer && <div className="mt-4 flex flex-wrap gap-2">{[message.answer].map((source, index) => <motion.div key={source.sourceSlug} initial={{ opacity: 0, y: prefersReduced ? 0 : 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : index * 0.06 }}><Link href={`/docs/${source.sourceSlug}`} className="inline-flex max-w-full items-center gap-2 border border-tai-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-tai-muted transition-colors hover:border-tai-accent hover:text-tai-text focus-visible:outline-2 focus-visible:outline-tai-focus"><Check className="h-3 w-3 text-tai-accent" /><span className="truncate">{source.sourceTitle}</span></Link></motion.div>)}</div>}</motion.div>;
}
