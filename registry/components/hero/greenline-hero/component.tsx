"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Leaf, Menu } from "lucide-react";

const img = (id: string, w = 2200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function GreenlineHero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 1.12]);

  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold">
          <Leaf className="size-6 text-primary" /> Greenline
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Design", "Landscaping", "Maintenance", "Tree care", "Our gardens"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#quote"
          className="hidden rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
        >
          Free consultation
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8 pb-6">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <motion.h1
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="font-display text-[clamp(3rem,7.5vw,6.75rem)] leading-[0.95] font-bold tracking-tight"
          >
            Gardens that get <em className="font-medium text-primary">better</em> every year.
          </motion.h1>
          <div>
            <p className="text-lg text-muted-foreground">
              Design, landscaping and year-round care for homes across Surrey. RHS-trained designers, our own build crews, no
              subcontractors.
            </p>
            <a
              href="#quote"
              className="group mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-4 font-semibold text-primary-foreground"
            >
              Book a free garden visit <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-8 max-w-[96rem] overflow-hidden md:mx-6 md:rounded-[calc(var(--radius)*2)]">
        <motion.img
          style={{ scale }}
          src={img("photo-1623358519330-00f61d89396b")}
          alt="Terraced garden with lawn, steps and lush planting beside a white house"
          className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
        />
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-5 left-5 flex flex-wrap gap-2"
        >
          {["Garden design", "Patios & paths", "Planting", "Lawn care"].map((t) => (
            <span key={t} className="rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-card-foreground backdrop-blur">
              {t}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
          className="absolute top-5 right-5 hidden rounded-[var(--radius)] bg-accent p-4 text-accent-foreground sm:block"
        >
          <p className="font-display text-3xl font-bold">Gold</p>
          <p className="text-xs font-semibold tracking-wider uppercase">Regional Garden Awards 2025</p>
        </motion.div>
      </div>
    </section>
  );
}
