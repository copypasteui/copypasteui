"use client";

import { motion } from "motion/react";
import { Ticket } from "lucide-react";

const GIGS = [
  { day: "12", month: "Mar", act: "The Lacemakers", what: "Album launch, acoustic set", price: "£8", cap: "60 people" },
  { day: "19", month: "Mar", act: "Crate Night", what: "Three local DJs, records only, all night", price: "Free", cap: "Walk-in" },
  { day: "02", month: "Apr", act: "Marigold Jones", what: "Soul covers and a signing", price: "£10", cap: "60 people" },
  { day: "18", month: "Apr", act: "Record Store Day", what: "Doors 7am, queue from whenever", price: "Free", cap: "One in, one out" },
];

export default function WaxCellarGigs() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none font-extrabold">In the basement</h2>
        <p className="mt-3 text-muted-foreground">Gigs start at 7:30pm. Tickets include £5 off any record bought on the night.</p>
        <ul className="mt-10 space-y-4">
          {GIGS.map((g) => (
            <motion.li key={g.act} whileHover="shift" initial="rest" className="relative">
              <motion.span
                aria-hidden
                variants={{ rest: { x: 0, y: 0 }, shift: { x: 6, y: 5 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute inset-0 rounded-[var(--radius)] bg-primary"
              />
              <div className="relative grid items-center gap-4 rounded-[var(--radius)] border border-foreground bg-card p-5 text-card-foreground sm:grid-cols-[5rem_1fr_auto]">
                <p className="text-center leading-none">
                  <span className="block font-display text-4xl font-extrabold">{g.day}</span>
                  <span className="text-sm font-semibold uppercase">{g.month}</span>
                </p>
                <div>
                  <h3 className="text-xl font-bold">{g.act}</h3>
                  <p className="text-muted-foreground">
                    {g.what} · {g.cap}
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 justify-self-start rounded-[var(--radius)] bg-accent px-4 py-2 font-semibold text-accent-foreground sm:justify-self-end"
                >
                  <Ticket className="size-4" aria-hidden /> {g.price === "Free" ? "Free entry" : `Tickets ${g.price}`}
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
