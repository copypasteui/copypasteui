"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Car, Check, Menu, Star, Wrench } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function GearwrightHero() {
  const [reg, setReg] = useState("");
  const [found, setFound] = useState(false);

  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-display text-3xl font-extrabold tracking-tight uppercase italic">
          <span className="grid size-9 -skew-x-12 place-items-center bg-primary text-primary-foreground">
            <Wrench className="size-5 skew-x-12" />
          </span>{" "}
          Gearwright
        </a>
        <nav className="hidden gap-8 text-sm font-semibold tracking-wider uppercase md:flex">
          {["MOT", "Servicing", "Repairs", "Tyres", "Prices"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="hidden bg-primary px-5 py-2.5 text-sm font-bold tracking-wider text-primary-foreground uppercase sm:inline-block"
        >
          Book online
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="relative overflow-hidden">
        <img
          src={img("photo-1625047509248-ec889cbff17f")}
          alt="Mechanic inspecting an engine bay under the bonnet"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(18_21_24)] via-[rgb(18_21_24)]/85 to-[rgb(18_21_24)]/20" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-white md:py-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.25em] text-white/80 uppercase"
          >
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>{" "}
            4.7 · 2,700 drivers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-5 max-w-3xl font-display text-[clamp(3.25rem,8vw,7rem)] leading-[0.88] font-extrabold uppercase italic"
          >
            We show you
            <br />
            <span className="text-primary">before we fix it.</span>
          </motion.h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">
            MOTs, servicing and repairs for every make. Free video health check with every visit: we show you, then you decide.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (reg.trim()) setFound(true);
            }}
            className="mt-8 flex max-w-lg overflow-hidden rounded-[var(--radius)] bg-white shadow-2xl"
          >
            <span className="grid w-12 shrink-0 place-items-center bg-[rgb(0_48_135)] text-[10px] font-bold text-white">GB</span>
            <input
              value={reg}
              onChange={(e) => {
                setReg(e.target.value.toUpperCase());
                setFound(false);
              }}
              placeholder="ENTER REG"
              aria-label="Vehicle registration"
              maxLength={8}
              className="min-w-0 flex-1 bg-[rgb(255_210_0)] px-4 py-4 text-center font-display text-3xl font-extrabold tracking-[0.12em] text-black outline-none placeholder:text-black/40"
            />
            <button type="submit" className="bg-primary px-6 font-bold tracking-wider text-primary-foreground uppercase">
              Go
            </button>
          </form>
          <AnimatePresence>
            {found && (
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[var(--radius)] bg-white/10 px-4 py-3 text-sm backdrop-blur"
              >
                <span className="flex items-center gap-2">
                  <Car className="size-4" /> {reg} · 1.0 petrol hatchback
                </span>
                <span className="flex items-center gap-2 text-white/80">
                  <Check className="size-4 text-primary" /> MOT due 14 Nov. Book from £45
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {[
          ["Same-day", "most repairs"],
          ["Free", "courtesy car"],
          ["12 mth", "parts & labour warranty"],
          ["Main-dealer", "standard, half the price"],
        ].map(([a, b]) => (
          <div key={b} className="bg-background p-5">
            <p className="font-display text-2xl font-extrabold uppercase italic">{a}</p>
            <p className="text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
