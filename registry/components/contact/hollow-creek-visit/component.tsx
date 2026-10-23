"use client";

import { motion } from "motion/react";
import { Car, Coffee, Dog, MapPin, Star, Store } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const hours = [
  { place: "Farm shop", icon: Store, times: "Mon–Sat 9–5 · Sun 10–4" },
  { place: "Barn café", icon: Coffee, times: "Wed–Sun 9–3:30" },
  { place: "Pick your own", icon: MapPin, times: "Daily 9–4, in season" },
];

export default function HollowCreekVisit() {
  return (
    <section id="visit" className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl leading-tight font-bold">
            Come and see us.
            <br />
            Wellies optional.
          </h2>
          <p className="mt-4 max-w-md opacity-90">
            Two miles outside Monmouth on the B4233. Follow the brown signs and the smell of bacon rolls.
          </p>
          <ul className="mt-10 space-y-4">
            {hours.map((h, i) => (
              <motion.li
                key={h.place}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-[var(--radius)] border border-primary-foreground/25 p-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <h.icon className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold">{h.place}</span>
                  <span className="text-sm opacity-90">{h.times}</span>
                </span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <span className="inline-flex items-center gap-2">
              <Car className="size-4" /> Free parking for 80 cars
            </span>
            <span className="inline-flex items-center gap-2">
              <Dog className="size-4" /> Dogs on leads welcome
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[var(--radius)]">
            <img
              src={img("photo-1633630663326-2b48b25c6fb2")}
              alt="Red barn in a green field beside woodland"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-[var(--radius)] bg-card px-3 py-2 text-sm font-semibold text-card-foreground shadow">
              <MapPin className="size-4 text-primary" /> Hollow Lane, Monmouth NP25 4AA
            </span>
          </div>
          <figure className="rounded-[var(--radius)] bg-card p-6 text-card-foreground">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 font-display text-xl leading-snug">
              “The best farm shop in Wales and I will not be taking questions. The kids love the hens; I love the sausage rolls.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">Bethan, Abergavenny · one of 1,900 Google reviews</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
