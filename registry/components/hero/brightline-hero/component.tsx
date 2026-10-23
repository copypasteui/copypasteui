"use client";

import { motion } from "motion/react";
import { CalendarClock, Check, Menu, Phone } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const points = ["Taking new NHS & private patients", "Evening & Saturday appointments", "Calm, unhurried care for nervous patients"];

export default function BrightlineHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-2 text-sm">
          <p>In pain? Same-day emergency appointments available.</p>
          <a href="tel:+441130000000" className="inline-flex items-center gap-1.5 font-semibold">
            <Phone className="size-3.5" /> 0113 000 0000
          </a>
        </div>
      </div>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight">
          <span className="grid size-9 place-items-center rounded-[calc(var(--radius)*0.6)] bg-accent text-accent-foreground">✦</span>{" "}
          Brightline
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Treatments", "Our team", "Prices", "Nervous patients", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
        >
          Book online
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-8 pb-20 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-[1] font-black tracking-tight"
          >
            The dentist you{" "}
            <span className="relative isolate whitespace-nowrap text-primary">
              won’t dread
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-1 left-0 -z-10 h-3 w-full origin-left rounded-full bg-accent/70"
              />
            </span>
            .
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            A family dental practice in Headingley. Check-ups, hygiene, clear aligners and whitening, explained clearly and priced upfront.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="size-3.5" />
                </span>{" "}
                {p}
              </motion.li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#book" className="rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground">
              Book a check-up · £55
            </a>
            <a href="#plans" className="rounded-full border-2 border-border px-7 py-4 font-semibold hover:border-foreground">
              See care plans
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[calc(var(--radius)*2)]">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4 }}
              src={img("photo-1777331903190-341a3dd0441b")}
              alt="Dentist chatting with a relaxed patient in a bright surgery"
              className="aspect-[4/3.6] w-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
              <CalendarClock className="size-5" />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">Next available</span>
              <span className="font-semibold">Today, 4:30pm</span>{" "}
              <span className="text-sm text-muted-foreground">· Dr Okafor · 860 patient reviews</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
