"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, Menu, Star } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function VerelleHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-3xl tracking-[0.12em]">
          Maison Verelle
        </a>
        <nav className="hidden gap-8 text-sm font-medium lg:flex">
          {["Services", "Stylists", "Our work", "Products", "Gift cards"].map((l) => (
            <a key={l} href="#" className="hover:opacity-60">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#book"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
          >
            Book now
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-6 pt-4 pb-16">
        <motion.h1
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-display text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.85] tracking-tight"
        >
          Hair that
          <br />
          <span className="ml-[12vw] inline-block">catches light.</span>
        </motion.h1>

        <div className="relative -mt-10 grid gap-6 md:-mt-24 md:grid-cols-12">
          <div className="flex flex-col justify-end gap-6 pt-14 md:col-span-4 md:pt-32">
            <p className="max-w-xs text-lg text-muted-foreground">
              Lived-in colour, precision cuts and the best blow-dry in Clifton. Award-winning team of nine, open late Thursdays.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </span>
              <span>
                <span className="font-semibold">4.8</span> · 1,240 reviews
              </span>
            </div>
            <a
              href="#book"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold whitespace-nowrap text-primary-foreground"
            >
              Book an appointment <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
            transition={{ delay: 0.2, duration: 1.1 }}
            className="overflow-hidden rounded-t-full md:col-span-4"
          >
            <img
              src={img("photo-1580618672591-eb180b1a973f", 900)}
              alt="Stylist blow-drying a client’s hair with a round brush"
              className="aspect-[3/4.2] w-full object-cover"
            />
          </motion.div>
          <div className="flex flex-col gap-6 md:col-span-4 md:pt-40">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              transition={{ delay: 0.35, duration: 1.1 }}
              className="overflow-hidden rounded-[var(--radius)]"
            >
              <img
                src={img("photo-1781450090585-1a511b7066d9", 800)}
                alt="Bright salon floor with styling chairs and arched mirrors"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="rounded-[var(--radius)] bg-secondary p-5 text-secondary-foreground"
            >
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CalendarCheck className="size-4" /> Next available
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Today 4:15pm", "Tomorrow 10:00", "Thu 7:30pm"].map((s) => (
                  <a
                    key={s}
                    href="#book"
                    className="rounded-full bg-card px-3 py-1.5 text-sm text-card-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
