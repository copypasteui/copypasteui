"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Heart } from "lucide-react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const products = [
  {
    id: "coat",
    name: "Harlow wool coat",
    label: "Marlowe",
    price: 345,
    photo: "photo-1668952135120-7d997b1b3778",
    sizes: ["6", "8", "10", "12", "14"],
    out: ["6"],
    swatches: ["rgb(176 138 100)", "rgb(43 43 43)"],
    badge: "Made in UK",
  },
  {
    id: "blazer",
    name: "Single-breasted blazer",
    label: "Atelier Nord",
    price: 220,
    photo: "photo-1754315052701-0b98f6ba786b",
    sizes: ["XS", "S", "M", "L"],
    out: [],
    swatches: ["rgb(27 27 27)"],
    badge: "",
  },
  {
    id: "slip",
    name: "Bias-cut silk slip",
    label: "Sœur",
    price: 160,
    photo: "photo-1664076458686-3449062080ac",
    sizes: ["XS", "S", "M", "L"],
    out: ["XS"],
    swatches: ["rgb(214 208 200)", "rgb(107 31 51)"],
    badge: "Low stock",
  },
  {
    id: "check",
    name: "Houndstooth jacket",
    label: "Kemp & Co",
    price: 275,
    photo: "photo-1613915617430-8ab0fd7c6baf",
    sizes: ["S", "M", "L"],
    out: [],
    swatches: ["rgb(138 138 138)"],
    badge: "",
  },
];

export default function MarloweShop() {
  const [size, setSize] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string | null>(null);
  const [liked, setLiked] = useState<string[]>([]);

  return (
    <section id="shop" className="bg-background py-20 font-sans text-foreground">
      <div className="mx-auto max-w-[90rem] px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground pb-4">
          <h2 className="font-display text-4xl md:text-5xl">New this week</h2>
          <nav className="flex gap-5 text-sm">
            {["All", "Coats", "Tailoring", "Dresses", "Knitwear"].map((c, i) => (
              <a key={c} href="#" className={i === 0 ? "underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}>
                {c}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {products.map((p, i) => {
            const chosen = size[p.id];
            const isLiked = liked.includes(p.id);
            return (
              <motion.article
                key={p.id}
                initial={{ clipPath: "inset(0% 0% 99.5% 0%)" }}
                whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={img(p.photo)}
                    alt={p.name}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-background px-2 py-1 text-[11px] font-semibold tracking-wider uppercase">
                      {p.badge}
                    </span>
                  )}
                  <button
                    type="button"
                    aria-pressed={isLiked}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() => setLiked((l) => (isLiked ? l.filter((x) => x !== p.id) : [...l, p.id]))}
                    className="absolute top-3 right-3 grid size-9 place-items-center bg-background/90"
                  >
                    <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                  <div className="absolute inset-x-3 bottom-3 translate-y-[calc(100%+1rem)] bg-background p-3 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">Quick add</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.sizes.map((s) => {
                        const out = p.out.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            disabled={out}
                            onClick={() => {
                              setSize((x) => ({ ...x, [p.id]: s }));
                              setAdded(p.id);
                              setTimeout(() => setAdded(null), 1600);
                            }}
                            className={`min-w-9 border px-2 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:text-muted-foreground disabled:line-through ${chosen === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <AnimatePresence>
                    {added === p.id && (
                      <motion.span
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-3 top-14 flex items-center justify-center gap-2 bg-primary py-2 text-xs font-semibold text-primary-foreground"
                      >
                        <Check className="size-4" /> Size {chosen} added to bag
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{p.label}</p>
                    <h3 className="mt-1 font-medium">{p.name}</h3>
                  </div>
                  <p className="font-semibold tabular-nums">£{p.price}</p>
                </div>
                <div className="mt-2 flex gap-1.5">
                  {p.swatches.map((c) => (
                    <span key={c} className="size-3.5 rounded-full ring-1 ring-border" style={{ background: c }} />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
