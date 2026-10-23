"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Search } from "lucide-react";

const suggestions = ["Churn by cohort last 6 months", "Which campaigns drove paid signups?", "Forecast MRR for Q3"];

export default function LumenCommandCta() {
  const [q, setQ] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) setSent(true);
  };

  return (
    <section className="bg-background px-6 py-20 font-sans">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground px-6 py-20 text-center text-background md:px-16">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">What would you ask first?</h2>
        <p className="mx-auto mt-4 max-w-lg text-background/90">
          Type a question. We’ll answer it on your own data when you connect a source. The first 1,000 are free.
        </p>
        <form
          onSubmit={submit}
          className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-2xl border border-background/15 bg-background/5 p-2 backdrop-blur"
        >
          <Search className="ml-3 size-5 shrink-0 text-accent" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask anything about your business…"
            aria-label="Your question"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-left outline-none placeholder:text-background/40"
          />
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-medium text-foreground">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                  <Check className="size-4" /> Saved
                </motion.span>
              ) : (
                <motion.span key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                  Try it <ArrowRight className="size-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className="rounded-full border border-background/15 px-3 py-1.5 text-xs text-background/70 transition hover:border-background/40 hover:text-background"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
