"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const tonight = [
  { time: "18:15", title: "The Long Field", note: "2025 · 1h 52m · subtitled" },
  { time: "20:40", title: "Salt Year", note: "2024 · 2h 08m" },
  { time: "23:00", title: "Night Bus to Halifax", note: "1998 · 35mm print" },
];

export default function UndercroftHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="flex items-center justify-between border-b border-foreground px-6 py-4 text-sm uppercase">
        <a href="#" className="font-bold tracking-widest">
          Undercroft
        </a>
        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {["Listings", "Membership", "Hire", "Visit"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:underline">
              {l}
            </a>
          ))}
        </nav>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="grid border-b border-foreground lg:grid-cols-[1.4fr_1fr]">
        <div className="border-foreground px-6 py-12 lg:border-r lg:py-20">
          <p className="text-sm uppercase">62 seats under Swinegate, Leeds</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-6xl leading-[0.9] font-medium tracking-tight md:text-8xl"
          >
            A cinema in a cellar
          </motion.h1>
          <p className="mt-8 max-w-md">
            New films, old prints and a bar that stays open till the last one ends. Tickets £9, or £6 with a membership card.
          </p>
          <a href="#listings" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3.5 font-bold text-primary-foreground">
            This week&apos;s films <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
        <div className="flex flex-col">
          <img
            src={img("photo-1485095329183-d0797cdc5676", 1000)}
            alt="Audience in a dark cinema with red velvet seats facing a bright screen"
            className="aspect-[16/10] w-full border-b border-foreground object-cover grayscale"
          />
          <div className="flex-1 px-6 py-6">
            <h2 className="text-sm uppercase">Tonight</h2>
            <ul className="mt-4 divide-y divide-foreground border-y border-foreground">
              {tonight.map((f) => (
                <li key={f.time}>
                  <a
                    href="#listings"
                    className="grid grid-cols-[4rem_1fr_auto] items-baseline gap-3 py-3 hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="font-bold">{f.time}</span>
                    <span>
                      <span className="block font-display text-lg font-medium">{f.title}</span>
                      <span className="block text-xs">{f.note}</span>
                    </span>
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
