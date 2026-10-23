"use client";

import { motion } from "motion/react";
import { Heart, Menu } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const raised = 38420;
const goal = 50000;

export default function CommonGroundHero() {
  const pct = Math.round((raised / goal) * 100);

  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-extrabold text-primary">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
            <Heart className="size-5 fill-current" />
          </span>{" "}
          Common Ground
        </a>
        <nav className="hidden gap-7 font-medium md:flex">
          {["What we do", "Get help", "Volunteer", "Our impact", "About"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a href="#donate" className="rounded-[var(--radius)] bg-accent px-5 py-2.5 font-bold text-accent-foreground">
          Donate
        </a>
        <button type="button" aria-label="Open menu" className="ml-3 md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-8 pb-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="font-bold text-primary">Winter appeal 2026</p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-4 font-display text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.02] font-extrabold"
          >
            No one in our neighbourhood should face winter alone.
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Common Ground runs a food pantry, warm hubs and a youth club in Hackney, run by 300 volunteers and funded by people like you.
          </p>

          <div className="mt-8 max-w-lg rounded-[var(--radius)] border-2 border-border bg-card p-5 text-card-foreground">
            <div className="flex items-baseline justify-between">
              <p>
                <span className="font-display text-3xl font-extrabold">£{raised.toLocaleString("en-GB")}</span>{" "}
                <span className="text-muted-foreground">raised of £{goal.toLocaleString("en-GB")}</span>
              </p>
              <span className="font-bold text-primary">{pct}%</span>
            </div>
            <div className="mt-3 h-4 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full rounded-full bg-accent"
              >
                <span className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.35),transparent)]" />
              </motion.div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">612 donors · 19 days left · every £1 matched until Friday</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#donate" className="rounded-[var(--radius)] bg-primary px-7 py-4 text-lg font-bold text-primary-foreground">
              Give to the appeal
            </a>
            <a href="#volunteer" className="rounded-[var(--radius)] border-2 border-foreground px-7 py-4 text-lg font-bold">
              Volunteer
            </a>
          </div>
        </div>

        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src={img("photo-1628717341663-0007b0ee2597")}
            alt="Volunteers packing food parcels into paper bags"
            className="aspect-[4/5] w-full rounded-[calc(var(--radius)*2)] object-cover"
          />
          <blockquote className="mt-5 border-l-4 border-accent pl-4">
            <p className="font-display text-lg font-bold">
              “The pantry got us through when my hours were cut. Now I volunteer there every Saturday.”
            </p>
            <footer className="mt-1 text-sm text-muted-foreground">— Denise, Clapton</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
