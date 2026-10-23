"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, Sun } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function SolaHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background font-sans text-foreground">
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 -z-10 size-[720px] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_65%)]"
      />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
          <Sun className="size-6 text-primary" /> sola
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Timetable", "Classes", "Pricing", "Teachers", "Retreats"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#timetable"
          className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background sm:inline-block"
        >
          Book a class
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-10 pb-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="font-display text-[clamp(3.25rem,8vw,7rem)] leading-[0.92] font-extrabold tracking-tight"
          >
            Yoga by
            <br />
            <span className="text-primary">the harbour.</span>
          </motion.h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Yoga, reformer pilates and breathwork in a light-filled studio above the harbour. Beginners very, very welcome.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 inline-flex flex-wrap items-center gap-4 rounded-[var(--radius)] bg-card p-3 pr-5 text-card-foreground shadow-xl shadow-foreground/5"
          >
            <span className="rounded-[calc(var(--radius)*0.7)] bg-primary px-4 py-3 text-primary-foreground">
              <span className="block text-xs font-semibold tracking-wider uppercase opacity-90">New here?</span>
              <span className="font-display text-2xl font-extrabold">2 weeks · £25</span>
            </span>
            <span className="text-sm">
              Unlimited classes,
              <br />
              no contract.
            </span>
            <a href="#pricing" className="group inline-flex items-center gap-1 font-semibold text-primary">
              Claim <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="relative h-[520px]">
          {[
            {
              id: "photo-1552196563-55cd4e45efb3",
              alt: "Woman sitting cross-legged on a mat",
              cls: "left-0 top-6 h-[78%] w-[48%]",
              d: 0.1,
            },
            { id: "photo-1747240549807-fc3962949818", alt: "Pilates plank on a reformer", cls: "right-0 top-0 h-[52%] w-[48%]", d: 0.25 },
            {
              id: "photo-1761971975973-cbb3e59263de",
              alt: "Sunlit studio with mats and big windows",
              cls: "bottom-0 right-0 h-[42%] w-[48%]",
              d: 0.4,
            },
          ].map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: p.d, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute overflow-hidden rounded-full ${p.cls}`}
            >
              <img src={img(p.id)} alt={p.alt} className="size-full object-cover" />
            </motion.div>
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute bottom-8 left-[30%] rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg"
          >
            42 classes a week
          </motion.span>
        </div>
      </div>
    </section>
  );
}
