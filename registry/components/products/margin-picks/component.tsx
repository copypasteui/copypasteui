"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Pick = { title: string; author: string; price: string; by: string; note: string; shelf: "Fiction" | "Non-fiction" | "Children's" };
const picks: Pick[] = [
  {
    title: "The Lamplighter's Daughters",
    author: "Morag Lennox",
    price: "£18.99",
    by: "Ailsa",
    note: "Three sisters, one lighthouse, forty years. I missed my stop twice.",
    shelf: "Fiction",
  },
  {
    title: "Salt Roads",
    author: "Daniel Oyelaran",
    price: "£22",
    by: "Callum",
    note: "A history of Scotland told through what it ate. Better than it sounds, and it sounds good.",
    shelf: "Non-fiction",
  },
  {
    title: "A Field Guide to Small Hours",
    author: "Iona Petrie",
    price: "£10.99",
    by: "Ailsa",
    note: "Short stories set between midnight and dawn. Read one a night.",
    shelf: "Fiction",
  },
  {
    title: "Otto Builds a Boat",
    author: "Fern Mackay",
    price: "£7.99",
    by: "Ruaridh",
    note: "For ages 4 to 7. The ending made a customer's son cheer out loud in the shop.",
    shelf: "Children's",
  },
  {
    title: "The Weight of Rivers",
    author: "Samuel Achterberg",
    price: "£16.99",
    by: "Callum",
    note: "Translated from Dutch. A flood, a family and the quietest ending I've read this year.",
    shelf: "Fiction",
  },
  {
    title: "How to Grow a Garden in a Tenement",
    author: "Priya Sandhu",
    price: "£14.99",
    by: "Ruaridh",
    note: "Window boxes, stairwells and back greens. Practical and very funny.",
    shelf: "Non-fiction",
  },
];
const shelves = ["All", "Fiction", "Non-fiction", "Children's"] as const;

export default function MarginPicks() {
  const [shelf, setShelf] = useState<(typeof shelves)[number]>("All");
  const shown = picks.filter((p) => shelf === "All" || p.shelf === shelf);
  return (
    <section id="picks" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <h2 className="font-display text-5xl md:text-7xl">Staff picks</h2>
          <div role="group" aria-label="Shelf" className="flex flex-wrap gap-x-6 gap-y-2">
            {shelves.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={shelf === s}
                onClick={() => setShelf(s)}
                className={`border-b-2 pb-1 text-sm ${shelf === s ? "border-foreground font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <ol className="grid md:grid-cols-2">
          {shown.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-8 md:odd:pr-10 md:even:border-l md:even:pl-10"
            >
              <span className="font-display text-4xl leading-none">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-3xl leading-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.author} · {p.price}
                </p>
                <p className="mt-4 font-display text-xl italic">&ldquo;{p.note}&rdquo;</p>
                <p className="mt-2 text-sm">Picked by {p.by}</p>
                <a href="#" className="mt-4 inline-block bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                  Reserve a copy
                </a>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
