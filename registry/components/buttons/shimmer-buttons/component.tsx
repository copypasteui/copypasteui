"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Check, Download, Send } from "lucide-react";

type State = "idle" | "loading" | "done";

function StatefulButton() {
  const [state, setState] = useState<State>("idle");
  const run = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("done"), 1400);
    setTimeout(() => setState("idle"), 3200);
  };
  return (
    <motion.button
      type="button"
      layout
      onClick={run}
      className={`inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 font-semibold transition-colors ${state === "done" ? "bg-accent text-accent-foreground" : "bg-foreground text-background"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          className="flex items-center gap-2"
        >
          {state === "idle" && (
            <>
              <Download className="size-4" /> Download report
            </>
          )}
          {state === "loading" && (
            <>
              <Loader2 className="size-4 animate-spin" /> Preparing…
            </>
          )}
          {state === "done" && (
            <>
              <Check className="size-4" /> Ready
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default function ShimmerButtons() {
  return (
    <section className="flex min-h-[22rem] flex-wrap items-center justify-center gap-6 bg-background px-6 py-20 font-sans text-foreground">
      {/* Shimmer sweep */}
      <button
        type="button"
        className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-lg bg-primary px-6 font-semibold text-primary-foreground"
      >
        <motion.span
          aria-hidden
          className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary-foreground/40 to-transparent"
          initial={{ x: "-150%" }}
          animate={{ x: "350%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
        <Send className="relative size-4" />
        <span className="relative">Publish site</span>
      </button>

      {/* Pressable 3D */}
      <button
        type="button"
        className="h-12 rounded-lg border-b-4 border-foreground/30 bg-accent px-6 font-bold text-accent-foreground transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-0"
      >
        Press me
      </button>

      {/* Stateful */}
      <StatefulButton />

      {/* Underline link button */}
      <a href="#" className="group relative h-12 px-2 leading-[3rem] font-semibold text-foreground">
        See how it works
        <span className="absolute right-2 bottom-2 left-2 h-0.5 origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
      </a>
    </section>
  );
}
