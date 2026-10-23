"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Bus, Car, Clock, MapPin, PartyPopper, Ticket } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const hours = [
  ["Mon – Tue", "Closed"],
  ["Wed – Thu", "4pm – 11pm"],
  ["Fri – Sat", "12pm – midnight"],
  ["Sun", "12pm – 9pm"],
];
const tours = ["Sat 1pm", "Sat 3pm", "Sun 1pm", "Sun 3pm"];

export default function FoxgloveVisit() {
  const [tour, setTour] = useState(tours[0]);
  const [qty, setQty] = useState(2);

  return (
    <section id="visit" className="bg-foreground py-24 font-sans text-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius)] border border-background/15 p-8 lg:row-span-2">
          <h2 className="font-display text-6xl leading-[0.9] uppercase">
            Come
            <br />
            drink
            <br />
            with us.
          </h2>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                Unit 4, The Old Tram Shed
                <br />
                Canal Street, Leeds LS9 8AP
              </span>
            </li>
            <li className="flex gap-3">
              <Bus className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>Buses 16 & 42 stop outside</span>
            </li>
            <li className="flex gap-3">
              <Car className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>Free parking after 6pm</span>
            </li>
          </ul>
          <div className="mt-10">
            <p className="flex items-center gap-2 font-display text-2xl uppercase">
              <Clock className="size-5 text-accent" /> Opening hours
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-background/15 pb-2">
                  <dt className="opacity-75">{d}</dt>
                  <dd className="font-semibold">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[var(--radius)] lg:col-span-2">
          <img
            src={img("photo-1779591211635-5e3daafab2a2")}
            alt="Fermenting tanks inside the brewery"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
          <div className="relative max-w-md p-8 text-stone-100">
            <p className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-accent uppercase">
              <Ticket className="size-4" /> Brewery tour
            </p>
            <p className="mt-3 font-display text-5xl leading-none uppercase">60 minutes behind the tanks</p>
            <p className="mt-3 text-sm opacity-85">
              Grain to glass with one of our brewers, four tasters and a glass to take home. £18 per person, 18+.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tours.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tour === t}
                  onClick={() => setTour(t)}
                  className={`rounded-[var(--radius)] px-3 py-2 text-sm font-semibold transition ${tour === t ? "bg-accent text-accent-foreground" : "bg-white/10 hover:bg-white/20"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-[var(--radius)] bg-white/10">
                <button
                  type="button"
                  aria-label="Fewer tickets"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                <button
                  type="button"
                  aria-label="More tickets"
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  className="px-3 py-2 text-lg"
                >
                  +
                </button>
              </div>
              <motion.a
                whileTap={{ scale: 0.96 }}
                href="#"
                className="flex-1 rounded-[var(--radius)] bg-primary px-5 py-3 text-center font-bold tracking-wider text-primary-foreground uppercase"
              >
                Book · £{qty * 18}
              </motion.a>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius)] bg-accent p-8 text-accent-foreground">
          <PartyPopper className="size-8" />
          <p className="mt-4 font-display text-4xl leading-none uppercase">Private hire</p>
          <p className="mt-2 text-sm">The mezzanine seats 60 for birthdays, work dos and wakes that turn into parties.</p>
          <a href="#" className="mt-5 inline-block font-bold underline underline-offset-4">
            Enquire →
          </a>
        </div>
        <div className="rounded-[var(--radius)] border border-background/15 p-8">
          <p className="font-display text-4xl leading-none uppercase">Trade & kegs</p>
          <p className="mt-2 text-sm opacity-75">
            Pour Foxglove at your bar. Kegs, casks and cans delivered across Yorkshire every Tuesday.
          </p>
          <a href="#" className="mt-5 inline-block font-bold underline underline-offset-4">
            Wholesale price list →
          </a>
        </div>
      </div>
    </section>
  );
}
