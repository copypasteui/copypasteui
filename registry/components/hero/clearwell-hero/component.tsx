"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarClock, Eye, Menu } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const slots = ["Today 3:40pm", "Tomorrow 9:20am", "Sat 11:00am"];

export default function ClearwellHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Eye className="size-5" aria-hidden />
          </span>
          Clearwell
        </a>
        <nav aria-label="Main" className="hidden gap-7 text-sm font-medium lg:flex">
          {["Eye tests", "Frames", "Contact lenses", "Children", "Prices"].map((l) => (
            <a key={l} href="#" className="hover:opacity-70">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
          >
            Book an eye test
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-6 pb-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Independent opticians on Gloucester Road, Bristol</p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            Eye tests that take 40 minutes, not 15
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Every test includes a retinal photo and an OCT scan of the back of the eye, at no extra cost. Free on the NHS if you qualify,
            £35 if you don&apos;t.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
            >
              Book an eye test <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href="#frames" className="rounded-full border border-border px-6 py-3.5 font-semibold hover:bg-muted">
              Browse 600 frames
            </a>
          </div>
        </div>

        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            src={img("photo-1581915649317-41fc6eb9597d", 1000)}
            alt="Woman in a black shirt wearing white-framed glasses"
            className="aspect-[4/5] w-full rounded-[calc(var(--radius)*1.5)] object-cover sm:aspect-[5/6]"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute inset-x-4 bottom-4 rounded-[var(--radius)] border border-border bg-card/70 p-5 text-card-foreground backdrop-blur sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80"
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CalendarClock className="size-4" aria-hidden /> Next free eye tests
            </p>
            <ul className="mt-3 grid gap-2">
              {slots.map((s) => (
                <li key={s}>
                  <a
                    href="#book"
                    className="flex items-center justify-between rounded-full bg-background/70 px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground"
                  >
                    {s} <ArrowRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">With Priya Nair, optometrist</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
