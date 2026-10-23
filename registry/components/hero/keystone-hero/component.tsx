"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BedDouble, ChevronDown, MapPin, Menu, Search } from "lucide-react";

const img = (id: string, w = 2200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function KeystoneHero() {
  const [mode, setMode] = useState<"Buy" | "Rent">("Buy");

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden font-sans text-white">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        src={img("photo-1600596542815-ffad4c1539a9")}
        alt="Contemporary white house with a pool at dusk"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-3xl">
          Keystone
        </a>
        <nav className="hidden gap-8 text-xs font-semibold tracking-[0.2em] uppercase md:flex">
          {["Buy", "Rent", "Sell", "Landlords", "About"].map((l) => (
            <a key={l} href="#" className="opacity-85 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#valuation"
          className="hidden border border-white/60 px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black sm:inline-block"
          style={{ borderRadius: "var(--radius)" }}
        >
          Free valuation
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-semibold tracking-[0.35em] text-accent uppercase"
        >
          Independent estate agents · Cheltenham
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]"
        >
          Find the one you’ll call home.
        </motion.h1>

        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10 max-w-4xl">
          <div className="flex">
            {(["Buy", "Rent"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition ${mode === m ? "bg-card text-card-foreground" : "bg-black/40 text-white backdrop-blur hover:bg-black/60"}`}
              >
                {m}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-px bg-border text-card-foreground shadow-2xl sm:grid-cols-[1.5fr_1fr_1fr_auto]"
          >
            <label className="flex items-center gap-3 bg-card px-5 py-4">
              <MapPin className="size-5 shrink-0 text-accent" />
              <input placeholder="Town, street or postcode" aria-label="Location" className="w-full bg-transparent outline-none" />
            </label>
            <label className="relative flex items-center bg-card px-5 py-4">
              <select aria-label="Max price" className="w-full appearance-none bg-transparent outline-none">
                {(mode === "Buy"
                  ? ["Any price", "£300k", "£500k", "£750k", "£1m+"]
                  : ["Any rent", "£1,000 pcm", "£1,500 pcm", "£2,500 pcm"]
                ).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 size-4" />
            </label>
            <label className="relative flex items-center gap-2 bg-card px-5 py-4">
              <BedDouble className="size-4 shrink-0 text-muted-foreground" />
              <select aria-label="Bedrooms" className="w-full appearance-none bg-transparent outline-none">
                {["Any beds", "1+", "2+", "3+", "4+", "5+"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 size-4" />
            </label>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary px-8 py-4 text-sm font-semibold tracking-[0.15em] text-primary-foreground uppercase"
            >
              <Search className="size-4" /> Search
            </button>
          </form>
          <p className="mt-4 text-sm text-white/80">214 homes for sale · 58 to rent · 9 added today</p>
        </motion.div>
      </div>
    </section>
  );
}
