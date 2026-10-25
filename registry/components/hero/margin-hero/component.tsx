"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function MarginHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-border px-6 py-4">
        <a href="#" className="font-display text-3xl italic">
          Margin
        </a>
        <nav aria-label="Main" className="hidden gap-8 text-sm lg:flex">
          {["Staff picks", "Events", "Book of the month", "Visit"].map((l) => (
            <a key={l} href="#" className="hover:underline">
              {l}
            </a>
          ))}
        </nav>
        <button type="button" aria-label="Open menu" className="lg:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-16 md:pt-16">
        <div className="flex flex-wrap justify-between gap-2 text-xs tracking-wide uppercase">
          <span>Independent booksellers, Bruntsfield</span>
          <span>Issue 412 · week of 27 October</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-6xl leading-[0.92] md:text-8xl"
        >
          Every book on our shelves, one of us has <em>read</em>
        </motion.h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between gap-6">
            <p className="text-lg">
              Eleven thousand titles across two floors, a café at the back and a handwritten note in every staff pick. Open till 8pm on
              Thursdays.
            </p>
            <a
              href="#picks"
              className="inline-flex w-fit items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
            >
              This week&apos;s picks <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            src={img("photo-1764337482439-ae67981bff34")}
            alt="Bookshelves filled with books in a cosy bookshop"
            className="aspect-[16/9] w-full rounded-[var(--radius)] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
