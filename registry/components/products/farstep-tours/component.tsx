"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Clock, Heart, Users } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const tours = [
  {
    slug: "dolo",
    type: "Walking",
    name: "Dolomites hut to hut",
    place: "Italy",
    days: 8,
    group: 12,
    level: 3,
    price: 2190,
    left: 3,
    photo: "photo-1627289496743-8a9a08bb228a",
  },
  {
    slug: "ohrid",
    type: "Paddling",
    name: "Lake Ohrid by kayak",
    place: "North Macedonia",
    days: 7,
    group: 10,
    level: 2,
    price: 1450,
    left: 6,
    photo: "photo-1499720565725-bd574541a3ee",
  },
  {
    slug: "wick",
    type: "Walking",
    name: "Wicklow Way",
    place: "Ireland",
    days: 6,
    group: 12,
    level: 2,
    price: 1290,
    left: 8,
    photo: "photo-1550486686-a496af34a2d5",
  },
  {
    slug: "ice",
    type: "Wildlife",
    name: "Iceland waterfalls & puffins",
    place: "Iceland",
    days: 9,
    group: 12,
    level: 1,
    price: 2890,
    left: 2,
    photo: "photo-1503818535644-7a4d8894d43d",
  },
  {
    slug: "pata",
    type: "Walking",
    name: "Patagonia lakes trek",
    place: "Chile",
    days: 12,
    group: 10,
    level: 4,
    price: 3950,
    left: 5,
    photo: "photo-1726091983472-a7da2540c492",
  },
  {
    slug: "fjell",
    type: "Wildlife",
    name: "Arctic tundra & reindeer",
    place: "Norway",
    days: 7,
    group: 8,
    level: 2,
    price: 2350,
    left: 7,
    photo: "photo-1544111048-2c57f89dbb49",
  },
];
const types = ["All trips", "Walking", "Paddling", "Wildlife"];
const levels = ["", "Easy", "Moderate", "Challenging", "Tough"];

export default function FarstepTours() {
  const [type, setType] = useState("All trips");
  const [saved, setSaved] = useState<string[]>(["ice"]);
  const list = tours.filter((t) => type === "All trips" || t.type === type);

  return (
    <section id="tours" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-5xl font-black tracking-tight md:text-6xl">Trips for 2027</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Every departure is guaranteed to run from four travellers. Prices include all accommodation, guides and most meals.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${type === t ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-background"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((t) => {
              const isSaved = saved.includes(t.slug);
              return (
                <motion.article
                  key={t.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-col overflow-hidden rounded-[calc(var(--radius)*1.5)] bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={img(t.photo)}
                      alt={t.name}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold">{t.type}</span>
                    <button
                      type="button"
                      onClick={() => setSaved((s) => (isSaved ? s.filter((x) => x !== t.slug) : [...s, t.slug]))}
                      aria-pressed={isSaved}
                      aria-label={isSaved ? `Remove ${t.name} from wishlist` : `Save ${t.name} to wishlist`}
                      className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-card/95"
                    >
                      <motion.span animate={{ scale: isSaved ? [1, 1.35, 1] : 1 }}>
                        <Heart className={`size-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                      </motion.span>
                    </button>
                    {t.left <= 3 && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                        Only {t.left} places left
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-semibold text-primary">{t.place}</p>
                    <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight">{t.name}</h3>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" /> {t.days} days
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="size-4" /> Max {t.group}
                      </span>
                      <span className="inline-flex items-center gap-1.5" title={`Difficulty: ${levels[t.level]}`}>
                        <span className="flex gap-0.5">
                          {[1, 2, 3, 4].map((n) => (
                            <span key={n} className={`h-3 w-1.5 rounded-full ${n <= t.level ? "bg-primary" : "bg-border"}`} />
                          ))}
                        </span>
                        {levels[t.level]}
                      </span>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-6">
                      <p>
                        <span className="text-xs text-muted-foreground">from</span>{" "}
                        <span className="font-display text-2xl font-black">£{t.price.toLocaleString("en-GB")}</span>
                      </p>
                      <a href="#" className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                        View trip <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
