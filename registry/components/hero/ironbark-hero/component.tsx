"use client";

import { motion } from "motion/react";
import { ArrowUpRight, HardHat, Menu, ShieldCheck } from "lucide-react";

const img = (id: string, w = 2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stats = [
  { n: "340+", l: "homes extended & renovated" },
  { n: "10 yr", l: "structural guarantee" },
  { n: "96%", l: "finished on or before schedule" },
];

export default function IronbarkHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-3xl font-black tracking-tight uppercase">
          <span className="grid size-10 place-items-center bg-accent text-accent-foreground">
            <HardHat className="size-5" />
          </span>{" "}
          Ironbark
        </a>
        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          {["Extensions", "Lofts", "Kitchens", "Projects", "About"].map((l) => (
            <a key={l} href="#" className="underline-offset-4 hover:underline">
              {l}
            </a>
          ))}
        </nav>
        <a href="#quote" className="hidden bg-primary px-5 py-3 text-sm font-bold text-primary-foreground sm:inline-block">
          Get a quote
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <motion.h1
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl font-display text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.85] font-black tracking-tight uppercase"
        >
          We build the room you’ve been <span className="bg-accent px-3 text-accent-foreground">saving</span> photos of.
        </motion.h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg text-muted-foreground">
            Extensions, loft conversions and full renovations across South London. One project manager from first sketch to final snag, and
            a fixed price before we break ground.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#quote" className="group inline-flex items-center gap-2 bg-primary px-7 py-4 font-bold text-primary-foreground">
              Book a free survey{" "}
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#projects" className="border-2 border-foreground px-7 py-4 font-bold hover:bg-foreground hover:text-background">
              See our work
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-14">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          className="mx-auto max-w-[96rem] overflow-hidden px-2 md:px-6"
        >
          <img
            src={img("photo-1758565811522-86b7ba4d5300")}
            alt="Finished open-plan kitchen extension with floor-to-ceiling glazing"
            className="aspect-[21/9] w-full object-cover"
          />
        </motion.div>
        <div className="mx-auto -mt-16 grid max-w-6xl gap-px bg-border px-6 sm:grid-cols-3 md:-mt-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="relative bg-card p-6 text-card-foreground"
            >
              <p className="font-display text-5xl font-black">{s.n}</p>
              <p className="text-sm text-muted-foreground">{s.l}</p>
            </motion.div>
          ))}
        </div>
        <p className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-8 text-sm text-muted-foreground">
          <ShieldCheck className="size-4" /> Fully insured · Building-regs approved · Deposit protected in an independent escrow account
        </p>
      </div>
    </section>
  );
}
