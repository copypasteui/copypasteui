"use client";

import { motion } from "motion/react";
import { Menu } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const arches = [
  { id: "photo-1769812344337-ec16a1b7cef8", alt: "Floral aisle leading to a garden ceremony arch", cls: "mt-16" },
  { id: "photo-1731515672817-0491d19c9f19", alt: "Newlyweds walking back down the aisle at sunset", cls: "" },
  { id: "photo-1758810744028-689670b0877c", alt: "Long wooden tables dressed for an autumn wedding breakfast", cls: "mt-16" },
];

export default function WrenhollowHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 py-6">
        <div>
          <nav className="hidden gap-7 text-xs font-semibold tracking-[0.2em] uppercase md:flex">
            {["Weddings", "Spaces", "Stay"].map((l) => (
              <a key={l} href="#" className="hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
        <a href="#" className="text-center font-display text-3xl font-semibold tracking-wide md:text-4xl">
          Wrenhollow
          <span className="block font-sans text-[10px] font-semibold tracking-[0.5em] text-muted-foreground uppercase">
            House &amp; Gardens
          </span>
        </a>
        <div className="flex justify-end gap-7 text-xs font-semibold tracking-[0.2em] uppercase">
          <a href="#" className="hidden hover:text-primary md:inline">
            Pricing
          </a>
          <a href="#visit" className="hidden border-b border-foreground pb-0.5 sm:inline">
            Arrange a visit
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-10 text-center md:pt-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xs font-semibold tracking-[0.4em] text-primary uppercase"
        >
          A wedding venue in the Cotswolds
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-medium"
        >
          One wedding a day,
          <br />
          <em className="font-medium text-primary">and it’s yours.</em>
        </motion.h1>
        <motion.p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          A Georgian house, a walled garden and a glasshouse for up to 160 guests, exclusively yours from 10am until the last carriage at
          midnight.
        </motion.p>
        <motion.div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="#visit"
            className="bg-primary px-8 py-4 text-sm font-semibold tracking-[0.2em] text-primary-foreground uppercase hover:opacity-90"
            style={{ borderRadius: "var(--radius)" }}
          >
            Arrange a visit
          </a>
          <a
            href="#pricing"
            className="border border-foreground/30 px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase hover:border-foreground"
            style={{ borderRadius: "var(--radius)" }}
          >
            See 2027 dates
          </a>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-3 items-start gap-3 px-6 md:gap-6">
        {arches.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden rounded-t-full ${a.cls}`}
          >
            <motion.img
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.8 }}
              src={img(a.id)}
              alt={a.alt}
              className="aspect-[3/4.4] w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-border py-6 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
          <span>Now booking 2027 &amp; 2028</span>
          <span className="hidden size-1 rounded-full bg-border sm:block" />
          <span>Up to 160 guests</span>
          <span className="hidden size-1 rounded-full bg-border sm:block" />
          <span>Licensed for ceremonies</span>
        </div>
      </div>
    </section>
  );
}
