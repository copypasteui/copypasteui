"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp, Users, DollarSign, Menu, Search } from "lucide-react";

const question = "Why did revenue dip in the EU last Tuesday?";
const answer =
  "Checkout errors on Safari 17 rose 4.2× after the 14:05 deploy. 61% of failed EU sessions were on that browser. Rolling back recovered €18.4k.";
const bars = [38, 52, 47, 61, 58, 72, 44, 81, 76, 88, 92, 86];

function useTyped(text: string, start: number, speed = 28) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      id = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, start);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, [text, start, speed]);
  return text.slice(0, n);
}

export default function LumenHero() {
  const q = useTyped(question, 600);
  const a = useTyped(answer, 600 + question.length * 28 + 500, 14);

  return (
    <section className="relative isolate overflow-hidden bg-foreground font-sans text-background">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] [background-size:56px_56px] opacity-[0.15]"
      />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-foreground">◐</span>{" "}
          Lumen
        </a>
        <nav className="hidden gap-8 text-sm text-background/70 md:flex">
          {["Product", "Integrations", "Customers", "Pricing", "Docs"].map((l) => (
            <a key={l} href="#" className="hover:text-background">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a href="#" className="hidden text-background/70 hover:text-background sm:inline">
            Sign in
          </a>
          <a href="#" className="rounded-[var(--radius)] bg-background px-4 py-2 font-medium text-foreground">
            Connect your data
          </a>
          <button type="button" aria-label="Menu" className="md:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-16 text-center md:pt-24">
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-3 py-1 text-sm text-background/80 backdrop-blur"
        >
          <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">New</span> Root-cause agent is
          live <ArrowRight className="size-3.5" />
        </motion.a>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9 }}
          className="mt-8 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
        >
          Ask your data
          <span className="block text-accent">anything.</span>
        </motion.h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-background/65">
          Lumen connects to your warehouse and answers questions in plain English, with the chart, the SQL and the reason why.
        </p>

        <motion.div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-background/15 bg-background/5 p-2 text-left shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 rounded-xl bg-background/5 px-4 py-3">
            <Search className="size-5 shrink-0 text-accent" />
            <p className="min-h-6 flex-1 font-mono text-sm">
              {q}
              <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />
            </p>
            <span className="hidden rounded-md border border-background/20 px-2 py-0.5 text-xs text-background/50 sm:block">⌘K</span>
          </div>
          <p className="min-h-[4.5rem] px-4 py-3 text-sm leading-relaxed text-background/80">{a}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 25 }}
        animate={{ opacity: 1, y: 0, rotateX: 12 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1600 }}
        className="mx-auto mt-16 max-w-6xl px-6"
      >
        <div className="rounded-t-2xl border border-b-0 border-background/15 bg-background p-4 text-foreground shadow-[0_-30px_120px_-20px]">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: DollarSign, k: "Revenue", v: "€2.84M", d: "+12.4%" },
              { icon: Users, k: "Active accounts", v: "18,240", d: "+3.1%" },
              { icon: TrendingUp, k: "Net retention", v: "118%", d: "+4 pts" },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-border p-4">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <m.icon className="size-3.5" /> {m.k}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold">
                  {m.v} <span className="text-xs font-medium text-primary">{m.d}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-44 items-end gap-2 rounded-xl border border-border p-4">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1 + i * 0.05, duration: 0.6 }}
                className={`flex-1 rounded-t-md ${i === 6 ? "bg-accent" : "bg-primary/80"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
