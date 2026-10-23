"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Clock, Menu, Phone, Star, Wrench } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function FixwellHero() {
  const [code, setCode] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <span className="grid size-10 place-items-center rounded-[var(--radius)] bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </span>
          Fixwell
        </a>
        <nav className="hidden gap-7 text-sm font-medium md:flex">
          {["Plumbing", "Electrical", "Heating", "Prices", "Reviews"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="tel:+442000000000"
          aria-label="Call 020 0000 0000"
          className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground"
        >
          <Phone className="size-4" aria-hidden /> <span className="hidden sm:inline">020 0000 0000</span>
        </a>
        <button type="button" aria-label="Open menu" className="ml-3 md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-8 pb-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-foreground">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[oklch(0.7_0.17_145)] opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[oklch(0.62_0.17_145)]" />
            </span>
            3 engineers available right now
          </p>
          <motion.h1
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1] font-extrabold tracking-tight"
          >
            Leak? Tripped fuse? We’re <span className="text-primary">45 minutes</span> away.
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Local plumbers and electricians for North London. Fixed prices before we start, tidy work, and a 12-month guarantee on every
            job.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShown(true);
            }}
            className="mt-8 flex max-w-md gap-2"
          >
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setShown(false);
              }}
              placeholder="Your postcode"
              aria-label="Postcode"
              className="w-0 min-w-0 flex-1 rounded-[var(--radius)] border-2 border-border bg-card px-4 py-3.5 text-card-foreground uppercase outline-none placeholder:normal-case focus:border-primary"
            />
            <button type="submit" className="rounded-[var(--radius)] bg-primary px-6 font-bold text-primary-foreground">
              Check
            </button>
          </form>
          <AnimatePresence>
            {shown && code && (
              <motion.p
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 text-sm font-semibold"
              >
                <Clock className="size-4 text-primary" /> Nearest engineer to {code.toUpperCase()}: about 35 minutes.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <span className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <strong>4.8</strong> · 3,400 reviews
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-primary" /> Gas-registered &amp; certified electricians
            </span>
          </div>
        </div>

        <div className="relative">
          <img
            src={img("photo-1749532125405-70950966b0e5")}
            alt="Plumber with a toolbox working in a bathroom"
            className="aspect-[4/5] w-full rounded-[calc(var(--radius)*2)] object-cover"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-10 -left-4 w-60 rounded-[var(--radius)] bg-card p-4 text-card-foreground shadow-xl sm:-left-10"
          >
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Live job · 10:42</p>
            <p className="mt-1 font-semibold">Burst pipe, Highbury</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: "20%" }}
                animate={{ width: "78%" }}
                transition={{ duration: 2.5, delay: 0.8 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Engineer Marcus · arriving in 6 min</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
