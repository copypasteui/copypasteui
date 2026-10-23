"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin, Pause, Play } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Each photo drifts a different way so the slideshow never repeats the same move twice in a row.
const SLIDES = [
  {
    id: "photo-1615729947596-a598e5de0ab3",
    alt: "Green ridge of the Seceda mountains with yellow flowers in the foreground",
    caption: "Day 2: the ridge walk above Ortisei",
    from: { scale: 1.04, x: "0%", y: "0%" },
    to: { scale: 1.16, x: "-3%", y: "-2%" },
  },
  {
    id: "photo-1501786223405-6d024d7c3b8d",
    alt: "Still lake in front of a mountain range",
    caption: "Day 4: lunch and a cold swim at the lake",
    from: { scale: 1.16, x: "2%", y: "0%" },
    to: { scale: 1.04, x: "-1%", y: "1%" },
  },
  {
    id: "photo-1760301269447-fbc82b5a8d14",
    alt: "Mountain peak lit pink at sunrise",
    caption: "Day 5: sunrise from the Puez hut",
    from: { scale: 1.06, x: "-2%", y: "1%" },
    to: { scale: 1.18, x: "2%", y: "-1%" },
  },
  {
    id: "photo-1627289496743-8a9a08bb228a",
    alt: "Walkers on a path between mountain huts in the Dolomites",
    caption: "Day 6: hut to hut on the high path",
    from: { scale: 1.1, x: "0%", y: "-2%" },
    to: { scale: 1.02, x: "0%", y: "1%" },
  },
] as const;

const SLIDE_MS = 7000;

export default function CrestlineHero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduce;
  const slide = SLIDES[index % SLIDES.length]!;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, playing]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-foreground font-sans text-white">
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.id}
          src={img(slide.id)}
          alt={slide.alt}
          initial={{ opacity: 0, ...(reduce ? {} : slide.from) }}
          animate={{ opacity: 1, ...(reduce ? {} : slide.to) }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            default: { duration: (SLIDE_MS + 1600) / 1000, ease: "linear" },
          }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pt-32 pb-10 md:pb-14">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase">Guided walking weeks · Dolomites</p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.98] font-semibold">
          Seven days walking hut to hut in the Dolomites
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/90">
          Groups of eight, led by Anna and Luca, who grew up in Val Gardena. A van moves your bag each morning; you carry water and a
          jacket. June to September, from £1,650 with half board.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:brightness-110"
          >
            See the 2027 dates <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-[var(--radius)] border border-white/60 px-7 py-4 font-semibold backdrop-blur-sm transition hover:bg-white/15"
          >
            Download the route
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/30 pt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={slide.caption}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm"
              aria-live="polite"
            >
              <MapPin className="size-4" aria-hidden /> {slide.caption}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}: ${s.caption}`}
                aria-current={i === index}
                className="group grid h-6 place-items-center"
              >
                <span
                  className={`block h-1 rounded-full transition-all ${i === index ? "w-10 bg-white" : "w-4 bg-white/50 group-hover:bg-white/90"}`}
                />
              </button>
            ))}
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
                className="ml-2 grid size-9 place-items-center rounded-full border border-white/50 transition hover:bg-white/15"
              >
                {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
