"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const photos = [
  { id: "photo-1526927071144-dbe4c41835e4", kind: "Portraits", alt: "Woman standing by a still pond", tall: true },
  { id: "photo-1770871821382-60ea99b0a941", kind: "Families", alt: "Family running through a sunlit garden", tall: false },
  { id: "photo-1619896849560-f92c4330f1a6", kind: "Portraits", alt: "Woman backlit by the setting sun", tall: false },
  { id: "photo-1602255680702-c47261041a97", kind: "Families", alt: "Parents lifting a child into the air in a field", tall: true },
  { id: "photo-1676720372380-309db527869a", kind: "Portraits", alt: "Woman in a shawl standing in shallow water", tall: true },
  { id: "photo-1559734840-f9509ee5677f", kind: "Families", alt: "Family of four arm in arm on the beach", tall: false },
  { id: "photo-1639760749623-3cf6dab57823", kind: "Portraits", alt: "Woman standing in tall grass", tall: false },
  { id: "photo-1561525140-c2a4cc68e4bd", kind: "Families", alt: "Parents holding a baby at golden hour", tall: true },
];
const kinds = ["All", "Portraits", "Families"];

export default function JuniperPortfolio() {
  const [kind, setKind] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = photos.filter((p) => kind === "All" || p.kind === kind);
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length));

  return (
    <section id="portfolio" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl md:text-7xl">Portfolio</h2>
          <div className="flex gap-6 text-sm">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                aria-pressed={kind === k}
                className={`relative pb-1 ${kind === k ? "" : "text-muted-foreground hover:text-foreground"}`}
              >
                {k}
                {kind === k && <motion.span layoutId="jp-u" className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground" />}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-12 columns-2 gap-4 md:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.button
                key={p.id}
                layout
                type="button"
                onClick={() => setOpen(i)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="group mb-4 block w-full overflow-hidden"
              >
                <img
                  src={img(p.id)}
                  alt={p.alt}
                  className={`w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90 ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(18_16_16)]/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={list[open]!.alt}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={list[open]!.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={img(list[open]!.id, 1800)}
                alt={list[open]!.alt}
                className="max-h-[86vh] max-w-full object-contain"
              />
            </AnimatePresence>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-4 grid size-12 place-items-center text-white/80 hover:text-white"
            >
              <ChevronLeft className="size-8" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-4 grid size-12 place-items-center text-white/80 hover:text-white"
            >
              <ChevronRight className="size-8" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-4 right-4 grid size-12 place-items-center text-white"
            >
              <X className="size-6" />
            </button>
            <p className="absolute bottom-4 font-display text-sm text-white/70 italic">{list[open]!.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
