"use client";

import { motion } from "motion/react";
import { CalendarDays, ChevronDown, Compass, MapPin, Menu, Search, Star } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const cards = [
  {
    id: "photo-1627289496743-8a9a08bb228a",
    alt: "Hikers walking single file up a green alpine valley",
    place: "Dolomites, Italy",
    rot: -8,
    x: "-38%",
    y: "8%",
  },
  {
    id: "photo-1775123465209-68d1af71060d",
    alt: "Kayakers on a wide blue lake below mountains",
    place: "Lake Ohrid, N. Macedonia",
    rot: 7,
    x: "38%",
    y: "4%",
  },
  {
    id: "photo-1550486686-a496af34a2d5",
    alt: "Group of hikers above a dark mountain lake",
    place: "Wicklow, Ireland",
    rot: -1,
    x: "0%",
    y: "-4%",
  },
];

export default function FarstepHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight">
          <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground">
            <Compass className="size-5" />
          </span>
          farstep
        </a>
        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          {["Trips", "Destinations", "Private groups", "Why Farstep", "Journal"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="tel:+442000000000" className="hidden text-sm font-semibold lg:block">
            020 0000 0000
          </a>
          <a
            href="#tours"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
          >
            Find a trip
          </a>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-12 text-center md:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground"
        >
          <span className="flex text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </span>
          6,200 travellers since 2014
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] font-black tracking-tight"
        >
          Trips for twelve
          <br />
          <span className="relative inline-block">
            people or fewer.
            <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full text-accent" aria-hidden>
              <motion.path
                d="M4 14 C 80 2, 200 2, 296 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.9 }}
              />
            </svg>
          </span>
        </motion.h1>
        <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground">
          Guided walking, paddling and wildlife trips for 12 people or fewer. Local guides, comfy beds, and every day planned so you don’t
          have to.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 grid max-w-3xl gap-2 rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-2 text-left text-card-foreground shadow-xl shadow-foreground/5 sm:grid-cols-[1fr_1fr_auto]"
        >
          {[
            { icon: MapPin, label: "Where", opts: ["Anywhere", "Europe", "Asia", "Africa", "The Americas"] },
            { icon: CalendarDays, label: "When", opts: ["Any month", "Nov 2026", "Dec 2026", "Jan 2027", "Spring 2027"] },
          ].map((f) => (
            <label key={f.label} className="relative flex items-center gap-3 rounded-[var(--radius)] px-4 py-2 hover:bg-muted">
              <f.icon className="size-5 shrink-0 text-primary" />
              <span className="flex-1">
                <span className="block text-xs font-semibold text-muted-foreground">{f.label}</span>
                <select className="w-full appearance-none bg-transparent font-semibold outline-none">
                  {f.opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </span>
              <ChevronDown className="pointer-events-none size-4 text-muted-foreground" />
            </label>
          ))}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-4 font-semibold text-primary-foreground"
          >
            <Search className="size-4" /> Search trips
          </button>
        </form>
      </div>

      <div className="relative mx-auto mt-14 h-[340px] max-w-5xl md:h-[420px]">
        {cards.map((c, i) => (
          <motion.figure
            key={c.id}
            initial={{ opacity: 0, y: 120, rotate: 0, x: "-50%" }}
            animate={{ opacity: 1, y: c.y, rotate: c.rot, x: `calc(-50% + ${c.x})` }}
            whileHover={{ y: "-8%", rotate: 0, zIndex: 20 }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 80, damping: 15 }}
            className="absolute top-0 left-1/2 w-[58%] overflow-hidden rounded-[calc(var(--radius)*1.5)] border-[6px] border-card bg-card shadow-2xl sm:w-[42%] md:w-[36%]"
            style={{ zIndex: i === 2 ? 10 : 1 }}
          >
            <img src={img(c.id)} alt={c.alt} className="aspect-[4/5] w-full object-cover" />
            <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold text-card-foreground">
              <MapPin className="size-3.5" /> {c.place}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
