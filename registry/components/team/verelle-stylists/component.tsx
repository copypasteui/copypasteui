"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const team = [
  {
    name: "Céline Moreau",
    role: "Founder & creative director",
    tags: ["Balayage", "Colour correction"],
    photo: "photo-1594756154841-ac5d160dbf46",
  },
  { name: "Jade Okafor", role: "Senior stylist", tags: ["Curly cuts", "Textured hair"], photo: "photo-1662850886700-4ec19bd30d11" },
  { name: "Tom Ashby", role: "Senior colourist", tags: ["Blonding", "Vivids"], photo: "photo-1568602471122-7832951cc4c5" },
  { name: "Mia Laurent", role: "Stylist", tags: ["Bridal", "Updos"], photo: "photo-1611695434369-a8f5d76ceb7b" },
];

export default function VerelleStylists() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl leading-none md:text-7xl">The team</h2>
          <p className="max-w-sm text-muted-foreground">
            Every stylist trains with us for two years before they hold scissors on the floor.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`group ${i % 2 ? "lg:mt-16" : ""}`}
            >
              <div className="relative overflow-hidden rounded-t-full rounded-b-[var(--radius)]">
                <img
                  src={img(t.photo)}
                  alt={`Portrait of ${t.name}`}
                  className="aspect-[3/4] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <a
                  href="#book"
                  className="absolute inset-x-4 bottom-4 flex translate-y-4 items-center justify-between rounded-full bg-background px-5 py-3 text-sm font-semibold opacity-0 transition group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Book with {t.name.split(" ")[0]} <ArrowUpRight className="size-4" />
                </a>
              </div>
              <h3 className="mt-5 font-display text-3xl">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.tags.map((g) => (
                  <span key={g} className="rounded-full border border-border px-3 py-1 text-xs">
                    {g}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
