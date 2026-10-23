"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const products = [
  {
    name: "Bloom Serum",
    kind: "Rosehip + bakuchiol",
    price: 38,
    rating: 4.7,
    reviews: 6214,
    photo: "photo-1576426863848-c21f53c60b19",
    alt: "photo-1670201203208-055d6d79db4a",
    badge: "Bestseller",
    sizes: ["15ml", "30ml"],
  },
  {
    name: "Petal Cleanser",
    kind: "Gentle gel wash",
    price: 24,
    rating: 4.7,
    reviews: 2890,
    photo: "photo-1597931752949-98c74b5b159f",
    alt: "photo-1605769574581-b2511b6afa08",
    sizes: ["150ml", "300ml"],
  },
  {
    name: "Cloud Cream",
    kind: "Barrier moisturiser",
    price: 42,
    rating: 4.6,
    reviews: 4102,
    photo: "photo-1609097164502-59a1f0f9a66f",
    alt: "photo-1527061011665-3652c757a4d4",
    badge: "New",
    sizes: ["50ml"],
  },
  {
    name: "Amber Facial Oil",
    kind: "Overnight repair",
    price: 46,
    rating: 4.4,
    reviews: 1355,
    photo: "photo-1781344116880-029945a42b75",
    alt: "photo-1556113275-62dd94fd0578",
    sizes: ["30ml"],
  },
];

export default function FloreaBestsellers() {
  const [size, setSize] = useState<Record<string, string>>({});
  const [liked, setLiked] = useState<string[]>([]);
  const [added, setAdded] = useState<string | null>(null);

  return (
    <section id="shop" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-5xl font-medium tracking-tight md:text-6xl">
            The <em>beloved</em> four
          </h2>
          <a href="#" className="text-sm underline underline-offset-4">
            Shop all 18 products
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {products.map((p, i) => {
            const s = size[p.name] ?? p.sizes[0];
            const price = p.sizes.length > 1 && s === p.sizes[1] ? Math.round(p.price * 1.7) : p.price;
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-secondary">
                  <img
                    src={img(p.photo)}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <img
                    src={img(p.alt)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
                  />
                  {p.badge && <span className="absolute top-3 left-3 rounded-full bg-background px-3 py-1 text-xs">{p.badge}</span>}
                  <button
                    type="button"
                    aria-label="Save"
                    onClick={() => setLiked((l) => (l.includes(p.name) ? l.filter((x) => x !== p.name) : [...l, p.name]))}
                    className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/90"
                  >
                    <Heart className={`size-4 ${liked.includes(p.name) ? "fill-primary text-primary" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdded(p.name);
                      setTimeout(() => setAdded(null), 1500);
                    }}
                    className="absolute inset-x-3 bottom-3 translate-y-16 rounded-full bg-background py-3 text-sm font-medium transition duration-500 group-hover:translate-y-0"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span key={added === p.name ? "y" : "n"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="block">
                        {added === p.name ? "Added to bag ✓" : `Add to bag · €${price}`}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-medium">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.kind}</p>
                  </div>
                  <p className="font-medium">€{price}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3.5 fill-primary text-primary" /> {p.rating} ({p.reviews.toLocaleString()})
                  </span>
                  <div className="flex gap-1">
                    {p.sizes.map((x) => (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setSize({ ...size, [p.name]: x })}
                        className={`rounded-full border px-2 py-0.5 text-[11px] ${s === x ? "border-foreground" : "border-border text-muted-foreground"}`}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
