"use client";

import { motion } from "motion/react";
import { Bike, Clock, MapPin, Phone, Scissors } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const zones = [
  { area: "Brighton & Hove (BN1–BN3)", fee: "£4.95", when: "Same day, order by 2pm" },
  { area: "Lewes, Shoreham, Rottingdean", fee: "£7.95", when: "Same day, order by 12pm" },
  { area: "Rest of the UK", fee: "£6.95", when: "Next day by courier" },
];

export default function PetalVisit() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
        <div className="relative min-h-[460px] overflow-hidden rounded-[var(--radius)]">
          <img
            src={img("photo-1757946614783-d449c6b35cb5")}
            alt="The flower shop lit up at dusk"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <h2 className="font-display text-5xl">Come and smell the stock.</h2>
            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <li className="flex gap-2">
                <MapPin className="size-4 shrink-0" /> 18 St George’s Road, Kemp Town
              </li>
              <li className="flex gap-2">
                <Clock className="size-4 shrink-0" /> Tue–Sat 8:30–5:30 · Sun 10–2
              </li>
              <li className="flex gap-2">
                <Phone className="size-4 shrink-0" /> 01273 000 000
              </li>
              <li className="flex gap-2">
                <Scissors className="size-4 shrink-0" /> Wreath workshops every December
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[var(--radius)] bg-secondary p-8 text-secondary-foreground">
            <p className="flex items-center gap-2 font-display text-2xl">
              <Bike className="size-6 text-primary" /> Delivery
            </p>
            <ul className="mt-6 divide-y divide-border">
              {zones.map((z, i) => (
                <motion.li
                  key={z.area}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-semibold">{z.area}</span>
                    <span className="text-sm text-muted-foreground">{z.when}</span>
                  </span>
                  <span className="font-display text-xl">{z.fee}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-1 flex-col rounded-[var(--radius)] border border-border bg-card p-8 text-card-foreground"
          >
            <p className="font-display text-2xl">Something specific in mind?</p>
            <p className="mt-1 text-sm text-muted-foreground">Funerals, corporate flowers, a very particular shade of orange: tell us.</p>
            <textarea
              rows={3}
              placeholder="What’s the occasion?"
              aria-label="Message"
              className="mt-5 flex-1 rounded-[calc(var(--radius)*0.5)] border border-border bg-background p-4 outline-none focus:border-ring"
            />
            <div className="mt-3 flex gap-3">
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 outline-none focus:border-ring"
              />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
