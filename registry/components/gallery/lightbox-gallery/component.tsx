"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const items = [
  {
    title: "Seceda ridge, 6:40am",
    place: "Dolomites",
    h: "row-span-2",
    photo: "photo-1615729947596-a598e5de0ab3",
    alt: "Green ridge of the Seceda mountains with yellow flowers",
  },
  {
    title: "Lake at first light",
    place: "Canadian Rockies",
    h: "",
    photo: "photo-1465056836041-7f43ac27dcb5",
    alt: "Lake in front of a mountain range",
  },
  { title: "Snowline", place: "Lofoten", h: "", photo: "photo-1501786223405-6d024d7c3b8d", alt: "Snow-covered mountain near water" },
  {
    title: "Valley road",
    place: "Glencoe",
    h: "row-span-2",
    photo: "photo-1768409234914-96f61529b7e2",
    alt: "Mountain valley with a winding road and a cabin",
  },
  {
    title: "Long shadows",
    place: "Atlas",
    h: "",
    photo: "photo-1604223190546-a43e4c7f29d7",
    alt: "Layered mountain ridges under an orange sky",
  },
  { title: "Summit at sunrise", place: "Valais", h: "", photo: "photo-1760301269447-fbc82b5a8d14", alt: "Mountain peak lit by sunrise" },
];

export default function LightboxGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Mountains, 2019–2026</h2>
          <p className="text-sm text-muted-foreground">Prints from £60 · click any photo to see it large</p>
        </div>
        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3">
          {items.map((it, i) => (
            <motion.button
              key={it.title}
              type="button"
              layoutId={`gallery-${i}`}
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden rounded-lg ${it.h}`}
            >
              <img
                src={img(it.photo, 800)}
                alt={it.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-background/90 text-foreground opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="size-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-6"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={items[open]!.title}
          >
            <motion.div
              layoutId={`gallery-${open}`}
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={img(items[open]!.photo, 1600)} alt={items[open]!.alt} className="absolute inset-0 size-full object-cover" />
              <p className="absolute bottom-4 left-4 rounded-md bg-background/90 px-3 py-1.5 text-sm font-semibold text-foreground">
                {items[open]!.title}, {items[open]!.place} · {open + 1}/{items.length}
              </p>
            </motion.div>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-6 right-6 grid size-11 place-items-center rounded-full bg-background text-foreground"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => (e.stopPropagation(), step(-1))}
              className="absolute left-4 grid size-11 place-items-center rounded-full bg-background text-foreground"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => (e.stopPropagation(), step(1))}
              className="absolute right-4 grid size-11 place-items-center rounded-full bg-background text-foreground"
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
