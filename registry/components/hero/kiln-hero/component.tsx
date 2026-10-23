"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, Menu } from "lucide-react";

const words = ["bakeries", "breweries", "clinics", "farm shops", "you"];

export default function KilnHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-background font-sans text-foreground">
      <motion.div
        aria-hidden
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -right-32 -z-10 size-[520px] rounded-full bg-secondary"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 -left-24 -z-10 size-[360px] rounded-full bg-accent/30"
      />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-2xl font-black [font-stretch:125%]">
          kiln<span className="text-accent">●</span>
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Work", "Services", "Studio", "Journal"].map((l) => (
            <a key={l} href="#" className="hover:text-accent">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#brief"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
        >
          Start a project
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-12 pb-16 md:pt-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-card-foreground"
        >
          <span className="size-2 animate-pulse rounded-full bg-accent" /> Booking projects for January
        </motion.p>
        <h1 className="mt-8 font-display text-[clamp(3rem,9.5vw,9rem)] leading-[0.86] font-black tracking-tight uppercase">
          <motion.span
            initial={{ fontStretch: "75%", opacity: 0 }}
            animate={{ fontStretch: "125%", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Brands for
          </motion.span>
          <span className="relative block h-[1em] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={words[i]}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-x-0 block text-primary [font-stretch:110%]"
              >
                {words[i]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg text-muted-foreground">
            Studio Kiln is a seven-person design studio in Sheffield. We make identities, websites and packaging for independent businesses
            that are too good to be this quiet.
          </p>
          <a href="#work" className="group inline-flex items-center gap-3 font-display text-xl font-black uppercase [font-stretch:120%]">
            See the work{" "}
            <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-[-45deg]">
              <ArrowDownRight className="size-6" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
