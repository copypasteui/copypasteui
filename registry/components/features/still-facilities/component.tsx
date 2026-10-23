"use client";

import { motion } from "motion/react";
import { Droplets, Flame, Moon, Waves } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const spaces = [
  {
    icon: Waves,
    name: "Vitality pool",
    temp: "34°C",
    body: "A long, lamplit pool with hydrotherapy jets beneath the original arches.",
    photo: "photo-1776763255459-99ddd8eebbfc",
    cls: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Flame,
    name: "Finnish sauna",
    temp: "85°C",
    body: "Cedar benches, birch whisks on Fridays.",
    photo: "photo-1757940113920-69e3686438d3",
    cls: "",
  },
  {
    icon: Droplets,
    name: "Eucalyptus steam",
    temp: "45°C",
    body: "Tiled, candlelit, scented with our own oil.",
    photo: "photo-1761470575018-135c213340eb",
    cls: "",
  },
  {
    icon: Moon,
    name: "Quiet room",
    temp: "Silence",
    body: "Heated loungers, blankets and a wall of windows over the garden.",
    photo: "photo-1773924093206-9a433a14bb44",
    cls: "md:col-span-2",
  },
];

export default function StillFacilities() {
  return (
    <section className="bg-secondary py-28 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">The thermal suite</p>
          <h2 className="mt-4 font-display text-5xl md:text-6xl">Pool, sauna, steam and a quiet room</h2>
        </div>
        <div className="mt-16 grid auto-rows-[260px] gap-4 md:grid-cols-4">
          {spaces.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ clipPath: "inset(0% 0% 99.5% 0%)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden rounded-[var(--radius)] text-white ${s.cls}`}
            >
              <img
                src={img(s.photo)}
                alt={s.name}
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center justify-between">
                  <s.icon className="size-5" />
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{s.temp}</span>
                </div>
                <h3 className="mt-3 font-display text-3xl">{s.name}</h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/85 transition-all duration-500 group-hover:max-h-20">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
