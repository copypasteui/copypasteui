"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Grape, Menu } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function HollinmereHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden font-sans text-white">
      <motion.img
        style={{ y }}
        src={img("photo-1568930157403-9ad464e5f075")}
        alt="Rolling vineyard hills at golden hour"
        className="absolute inset-0 -z-10 h-[115%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-2xl">
          Hollinmere <em>Estate</em>
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          {["Our wines", "Visit & taste", "The estate", "Wine club", "Weddings"].map((l) => (
            <a key={l} href="#" className="opacity-85 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <a href="#wines" className="hidden rounded-[var(--radius)] bg-white px-5 py-2.5 text-sm font-semibold text-black sm:inline-block">
          Shop wines
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto mt-auto w-full max-w-7xl px-6 pb-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 text-sm"
        >
          <Grape className="size-4" /> Single-estate wines from the South Downs · since 1987
        </motion.p>
        <motion.h1
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.92]"
        >
          Chalk, sun &amp; <em>patience.</em>
        </motion.h1>
        <div className="mt-10 grid gap-6 border-t border-white/25 pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-lg text-lg text-white/85">
            English sparkling and still wines from forty acres of south-facing chalk. Taste them at the cellar door, Thursday to Sunday.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#tastings"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-4 font-semibold text-primary-foreground"
            >
              Book a tasting <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#wines"
              className="rounded-[var(--radius)] border border-white/60 px-6 py-4 font-semibold hover:bg-white hover:text-black"
            >
              Shop the 2024 release
            </a>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute top-28 right-6 hidden size-32 place-items-center rounded-full border border-white/40 text-center backdrop-blur md:grid"
      >
        <span>
          <span className="block text-[10px] tracking-[0.25em] uppercase">Gold medal</span>
          <span className="block font-display text-2xl italic">2025</span>
          <span className="block text-[10px] tracking-[0.2em] uppercase">Wine Awards</span>
        </span>
      </motion.div>
    </section>
  );
}
