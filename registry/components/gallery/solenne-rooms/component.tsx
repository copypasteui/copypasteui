"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, BedDouble, Maximize, Users } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const rooms = [
  {
    name: "Garden Room",
    photo: "photo-1761757821641-3b347c034042",
    size: 28,
    guests: 2,
    bed: "Queen",
    price: 220,
    note: "Opens onto the lemon grove",
  },
  {
    name: "Sea-view Suite",
    photo: "photo-1662385930165-49ebaa03b152",
    size: 46,
    guests: 3,
    bed: "King",
    price: 340,
    note: "Private terrace, sunrise side",
  },
  {
    name: "Terrace Loft",
    photo: "photo-1776763018821-8feeaeeee0a5",
    size: 54,
    guests: 4,
    bed: "King + sofa",
    price: 410,
    note: "Reading nook and soaking tub",
  },
  {
    name: "Cliff Villa",
    photo: "photo-1790774885419-20dfe3a7a01c",
    size: 92,
    guests: 4,
    bed: "2 Kings",
    price: 690,
    note: "Plunge pool over the water",
  },
];

export default function SolenneRooms() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * (track.current.clientWidth * 0.7), behavior: "smooth" });

  return (
    <section className="overflow-hidden bg-background py-24 font-sans text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">Rooms & suites</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[1.02] md:text-7xl">
            Twenty-four rooms, <em>each with the sea in it.</em>
          </h2>
        </div>
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              aria-label={d < 0 ? "Previous rooms" : "Next rooms"}
              onClick={() => scroll(d)}
              className="grid size-12 place-items-center rounded-full border border-border transition hover:bg-primary hover:text-primary-foreground"
            >
              {d < 0 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        className="mt-12 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth px-6 pb-4 md:px-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))]"
      >
        {rooms.map((r, i) => (
          <motion.article
            key={r.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className="group w-[82vw] shrink-0 snap-start sm:w-[420px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)]">
              <img
                src={img(r.photo)}
                alt={r.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">{r.note}</span>
              <div className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between rounded-2xl bg-background/95 p-4 opacity-0 shadow-xl backdrop-blur transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm text-muted-foreground">Includes breakfast & late checkout</span>
                <a href="#" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Reserve
                </a>
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-3xl">{r.name}</h3>
              <p className="shrink-0 text-sm text-muted-foreground">
                from <span className="font-display text-2xl text-foreground">€{r.price}</span>
              </p>
            </div>
            <div className="mt-3 flex gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Maximize className="size-4" /> {r.size} m²
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" /> {r.guests} guests
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble className="size-4" /> {r.bed}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
