"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bath, BedDouble, Heart, Maximize2, MapPin } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const homes = [
  {
    id: 1,
    mode: "Buy",
    price: "£1,250,000",
    title: "Contemporary villa with pool",
    place: "Leckhampton",
    beds: 5,
    baths: 4,
    sqft: "3,400",
    tag: "New",
    photo: "photo-1512917774080-9991f1c4c750",
  },
  {
    id: 2,
    mode: "Buy",
    price: "£685,000",
    title: "Victorian family house",
    place: "Montpellier",
    beds: 4,
    baths: 2,
    sqft: "2,150",
    tag: "Under offer",
    photo: "photo-1570129477492-45c003edd2be",
  },
  {
    id: 3,
    mode: "Buy",
    price: "£545,000",
    title: "Detached house, quiet close",
    place: "Charlton Kings",
    beds: 4,
    baths: 3,
    sqft: "1,980",
    tag: "",
    photo: "photo-1781797221329-c3d083ab6d99",
  },
  {
    id: 4,
    mode: "Rent",
    price: "£1,650 pcm",
    title: "Bright two-bed apartment",
    place: "Town centre",
    beds: 2,
    baths: 1,
    sqft: "820",
    tag: "Available now",
    photo: "photo-1522708323590-d24dbb6b0267",
  },
  {
    id: 5,
    mode: "Buy",
    price: "£895,000",
    title: "Farmhouse with wraparound porch",
    place: "Prestbury",
    beds: 5,
    baths: 3,
    sqft: "2,900",
    tag: "Price reduced",
    photo: "photo-1758158452965-ef267a639880",
  },
  {
    id: 7,
    mode: "Buy",
    price: "£475,000",
    title: "Red-brick family home",
    place: "Hatherley",
    beds: 4,
    baths: 2,
    sqft: "1,760",
    tag: "",
    photo: "photo-1598228723793-52759bba239c",
  },
  {
    id: 8,
    mode: "Buy",
    price: "£399,950",
    title: "Period cottage with porch",
    place: "Bishop’s Cleeve",
    beds: 3,
    baths: 1,
    sqft: "1,240",
    tag: "New",
    photo: "photo-1787094497609-5efe6029b950",
  },
  {
    id: 6,
    mode: "Rent",
    price: "£2,400 pcm",
    title: "Modern house with garden",
    place: "Pittville",
    beds: 3,
    baths: 2,
    sqft: "1,400",
    tag: "",
    photo: "photo-1523217582562-09d0def993a6",
  },
  {
    id: 9,
    mode: "Rent",
    price: "£1,250 pcm",
    title: "Garden flat near the park",
    place: "Pittville",
    beds: 1,
    baths: 1,
    sqft: "610",
    tag: "",
    photo: "photo-1502672260266-1c1ef2d93688",
  },
];

export default function KeystoneListings() {
  const [mode, setMode] = useState<"Buy" | "Rent">("Buy");
  const [saved, setSaved] = useState<number[]>([2]);
  const list = homes.filter((h) => h.mode === mode);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Featured properties</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Just listed</h2>
          </div>
          <div className="flex border border-border">
            {(["Buy", "Rent"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`relative px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase ${mode === m ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {mode === m && <motion.span layoutId="ks-mode" className="absolute inset-0 bg-primary" />}
                <span className="relative">{m === "Buy" ? "For sale" : "To rent"}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((h) => {
              const isSaved = saved.includes(h.id);
              return (
                <motion.article
                  key={h.id}
                  layout
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group"
                >
                  <div className="relative overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
                    <img
                      src={img(h.photo)}
                      alt={h.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {h.tag && (
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${h.tag === "Under offer" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
                      >
                        {h.tag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setSaved((s) => (isSaved ? s.filter((x) => x !== h.id) : [...s, h.id]))}
                      aria-pressed={isSaved}
                      aria-label={isSaved ? "Remove from saved" : "Save property"}
                      className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-card/95 text-card-foreground"
                    >
                      <Heart className={`size-4 ${isSaved ? "fill-accent text-accent" : ""}`} />
                    </button>
                    <span className="absolute bottom-0 left-0 bg-card px-4 py-2 font-display text-2xl text-card-foreground">{h.price}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{h.title}</h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {h.place}, Cheltenham
                  </p>
                  <ul className="mt-3 flex gap-5 border-t border-border pt-3 text-sm">
                    <li className="flex items-center gap-1.5">
                      <BedDouble className="size-4 text-accent" /> {h.beds}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Bath className="size-4 text-accent" /> {h.baths}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Maximize2 className="size-4 text-accent" /> {h.sqft} sq ft
                    </li>
                  </ul>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <div className="mt-12 text-center">
          <a href="#" className="inline-block border-b-2 border-accent pb-1 text-sm font-semibold tracking-[0.2em] uppercase">
            View all {mode === "Buy" ? 214 : 58} properties
          </a>
        </div>
      </div>
    </section>
  );
}
