"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, BadgeCheck } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Skin = "Dry" | "Oily" | "Sensitive" | "Combination";
const reviews: { name: string; skin: Skin; stars: number; title: string; body: string; weeks: number }[] = [
  {
    name: "Mira K.",
    skin: "Sensitive",
    stars: 5,
    title: "Finally, no redness",
    body: "Every retinol made me flake. This gave me the glow without a single bad day.",
    weeks: 6,
  },
  {
    name: "Jess P.",
    skin: "Dry",
    stars: 5,
    title: "Dewy by week two",
    body: "The Cloud Cream + serum combo is the first thing that’s fixed my winter skin.",
    weeks: 8,
  },
  {
    name: "Leah O.",
    skin: "Oily",
    stars: 4,
    title: "Light and doesn’t break me out",
    body: "Absorbs in seconds. I use two drops instead of four and it’s plenty.",
    weeks: 4,
  },
  {
    name: "Ana R.",
    skin: "Combination",
    stars: 5,
    title: "Dark spots faded",
    body: "Old acne marks are noticeably lighter. The smell is lovely too, like a garden.",
    weeks: 12,
  },
  {
    name: "Tara W.",
    skin: "Sensitive",
    stars: 5,
    title: "Calm, happy skin",
    body: "Fragrance-sensitive and had zero reaction. Repurchased twice now.",
    weeks: 10,
  },
];
const dist = [82, 12, 4, 1, 1];

export default function FloreaReviews() {
  const [skin, setSkin] = useState<"All" | Skin>("All");
  const list = reviews.filter((r) => skin === "All" || r.skin === skin);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[360px_1fr]">
        <aside>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)]">
            <img
              src={img("photo-1605769574581-b2511b6afa08")}
              alt="Close-up of glowing, freckled skin beside white petals"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <p className="mt-6 font-display text-6xl">
            4.6<span className="text-2xl text-muted-foreground"> / 5</span>
          </p>
          <p className="text-sm text-muted-foreground">6,214 verified reviews</p>
          <div className="mt-4 space-y-1.5">
            {dist.map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="w-3">{5 - i}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="block h-full bg-primary"
                  />
                </span>
                <span className="w-8 text-right text-muted-foreground">{d}%</span>
              </div>
            ))}
          </div>
        </aside>

        <div>
          <h2 className="font-display text-5xl font-medium tracking-tight">
            Real skin, <em>real results.</em>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", "Dry", "Oily", "Sensitive", "Combination"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSkin(s)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${skin === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
              >
                {s === "All" ? "All skin types" : s}
              </button>
            ))}
          </div>
          <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((r) => (
                <motion.li
                  layout
                  key={r.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex text-primary">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className={`size-4 ${k < r.stars ? "fill-current" : "opacity-25"}`} />
                      ))}
                    </div>
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">{r.skin} skin</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                  <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <BadgeCheck className="size-4 text-primary" /> {r.name} · verified buyer · used {r.weeks} weeks
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
