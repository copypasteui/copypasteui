"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Users, Search, Star, Menu, ArrowUpRight } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const guests = ["photo-1494790108377-be9c29b29330", "photo-1500648767791-00dcc994a43e", "photo-1758599543111-36ce5c34fceb"];

export default function SolenneHero() {
  const [count, setCount] = useState(2);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden font-sans text-white">
      <motion.img
        src={img("photo-1766214573285-1b3df1b0a980")}
        alt="Infinity pool meeting the sea"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/10 to-black/65" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-3xl tracking-tight">
          Solenne
        </a>
        <nav className="hidden items-center gap-9 text-sm text-white/85 md:flex">
          {["Rooms", "Experiences", "Dining", "Spa", "Journal"].map((l) => (
            <a key={l} href="#" className="transition hover:text-white">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 sm:inline-block"
          >
            Book a stay
          </a>
          <button type="button" aria-label="Menu" className="grid size-10 place-items-center rounded-full border border-white/40 md:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xs tracking-[0.35em] text-white/80 uppercase"
        >
          Boutique hotel · Amalfi coast
        </motion.p>
        <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.92] tracking-tight">
          {["Where the sea", "slows you down."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${i ? "italic" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.form
            id="book"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/25 bg-white/15 backdrop-blur-xl sm:grid-cols-[1fr_1fr_1fr_auto]"
          >
            {[
              { label: "Check in", value: "Fri, 14 Jun", icon: CalendarDays },
              { label: "Check out", value: "Mon, 17 Jun", icon: CalendarDays },
            ].map((f) => (
              <label key={f.label} className="flex cursor-pointer items-center gap-3 bg-black/10 px-5 py-4 transition hover:bg-black/20">
                <f.icon className="size-5 text-white/70" />
                <span>
                  <span className="block text-[11px] tracking-[0.2em] text-white/70 uppercase">{f.label}</span>
                  <span className="block text-sm font-medium">{f.value}</span>
                </span>
              </label>
            ))}
            <div className="col-span-2 flex items-center gap-3 bg-black/10 px-5 py-4 sm:col-span-1">
              <Users className="size-5 text-white/70" />
              <span className="flex-1">
                <span className="block text-[11px] tracking-[0.2em] text-white/70 uppercase">Guests</span>
                <span className="block text-sm font-medium">{count} adults</span>
              </span>
              <span className="flex gap-1">
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setCount((c) => Math.min(6, Math.max(1, c + d)))}
                    className="grid size-7 place-items-center rounded-full border border-white/40 text-sm hover:bg-white hover:text-black"
                    aria-label={d < 0 ? "Fewer guests" : "More guests"}
                  >
                    {d < 0 ? "−" : "+"}
                  </button>
                ))}
              </span>
            </div>
            <button
              type="submit"
              className="col-span-2 flex items-center justify-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-primary hover:text-primary-foreground sm:col-span-1"
            >
              <Search className="size-4" /> Check availability
            </button>
          </motion.form>

          <motion.a
            href="#"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="group hidden w-72 shrink-0 items-center gap-3 rounded-2xl bg-white/90 p-2 pr-4 text-black shadow-2xl backdrop-blur lg:flex"
          >
            <img src={img("photo-1662385930165-49ebaa03b152", 400)} alt="" className="size-16 rounded-xl object-cover" />
            <span className="flex-1">
              <span className="block text-xs text-black/60">Sea-view suite</span>
              <span className="block font-display text-2xl leading-tight">from €340</span>
            </span>
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="mt-8 flex items-center gap-4 border-t border-white/20 pt-6 text-sm text-white/85">
          <div className="flex -space-x-3">
            {guests.map((g) => (
              <img key={g} src={img(g, 120)} alt="" className="size-9 rounded-full border-2 border-white/80 object-cover" />
            ))}
          </div>
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-current" /> 4.8 from 2,300 guest reviews
          </span>
          <span className="ml-auto hidden sm:inline">24 rooms · 3 pools · 1 very long lunch</span>
        </div>
      </div>
    </section>
  );
}
