"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu } from "lucide-react";

const img = (id: string, w = 2200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function StillHero() {
  const [inhale, setInhale] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setInhale((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden font-sans text-white">
      <img
        src={img("photo-1761470575018-135c213340eb")}
        alt="Candlelit steam room with warm wall lights"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <nav className="hidden flex-1 gap-8 text-sm md:flex">
          {["Treatments", "Thermal suite", "Memberships"].map((l) => (
            <a key={l} href="#" className="opacity-80 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="font-display text-3xl tracking-[0.4em]">
          STILL
        </a>
        <div className="flex flex-1 justify-end gap-6 text-sm">
          <a href="#" className="hidden opacity-80 hover:opacity-100 md:inline">
            Gift vouchers
          </a>
          <a href="#book" className="hidden rounded-full border border-white/50 px-5 py-2 hover:bg-white hover:text-black sm:inline">
            Book
          </a>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
        <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.span
            animate={{ scale: inhale ? 1.35 : 0.85, opacity: inhale ? 0.35 : 0.15 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="block size-[min(80vw,560px)] rounded-full border border-white/40 bg-white/5 backdrop-blur-[2px]"
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={String(inhale)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-xs tracking-[0.5em] uppercase"
          >
            {inhale ? "Breathe in" : "Breathe out"}
          </motion.p>
        </AnimatePresence>
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2 }}
          className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] leading-[1]"
        >
          Two hours where nothing is asked of you.
        </motion.h1>
        <p className="mt-6 max-w-lg text-lg text-white/80">
          A day spa in a restored Georgian bathhouse. Thermal suite, massage and facials. Phones stay in the locker.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#book" className="rounded-full bg-white px-8 py-4 font-semibold text-black">
            Book a treatment
          </a>
          <a href="#" className="rounded-full border border-white/50 px-8 py-4 font-semibold hover:bg-white/10">
            Spa day from £85
          </a>
        </div>
      </div>
    </section>
  );
}
