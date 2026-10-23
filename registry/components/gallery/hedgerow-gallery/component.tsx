"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Photo = { id: string; alt: string; caption: string; tall?: boolean };

const COLUMNS: Photo[][] = [
  [
    {
      id: "photo-1457089328109-e5d9bd499191",
      alt: "Arrangement of deep red roses and orange flowers on a dark table",
      caption: "Autumn wedding tables, Ducklington · October",
      tall: true,
    },
    { id: "photo-1523693916903-027d144a2b7d", alt: "Bouquet of pink roses", caption: "Birthday bunch · £45" },
    { id: "photo-1706796204047-42799881e989", alt: "Pink and white peonies on display", caption: "Peony week in the shop · May" },
  ],
  [
    {
      id: "photo-1531058240690-006c446962d8",
      alt: "Florist working at the bench at the back of the shop",
      caption: "The workshop on Corn Street, open 8 to 4",
    },
    {
      id: "photo-1589244159943-460088ed5c92",
      alt: "Buckets of peonies, roses and stocks outside the shop",
      caption: "Market Square, Witney, most Saturdays",
      tall: true,
    },
    { id: "photo-1572454591674-2739f30d8c40", alt: "Bouquet of peach and pink roses", caption: "Garden roses bunch · £38" },
  ],
  [
    { id: "photo-1523694576729-dc99e9c0f9b4", alt: "Hand holding a bouquet of white flowers", caption: "Bridesmaids' posies · August" },
    {
      id: "photo-1639696194673-67b86204b885",
      alt: "Flower shop full of buckets of stems under string lights",
      caption: "Late opening before Valentine's · February",
    },
    {
      id: "photo-1587317996237-eddd7e834d84",
      alt: "Stems of white flowers against a plain wall",
      caption: "Single stems for the table · from £3",
      tall: true,
    },
  ],
];

function Column({ photos, y, className = "" }: { photos: Photo[]; y: MotionValue<number> | number; className?: string }) {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-5 ${className}`}>
      {photos.map((p) => (
        <figure key={p.id} className="relative overflow-hidden rounded-[var(--radius)]">
          <img src={img(p.id)} alt={p.alt} loading="lazy" className={`w-full object-cover ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-[var(--radius)] bg-card/90 px-3 py-2 text-sm font-medium text-card-foreground backdrop-blur">
            {p.caption}
          </figcaption>
        </figure>
      ))}
    </motion.div>
  );
}

export default function HedgerowGallery() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The middle column runs against the outer two, which is what makes the wall feel deep.
  const left = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const middle = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const right = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <section className="overflow-hidden bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Hedgerow &amp; Co, florist in Witney</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-bold">
              Flowers from the last few weekends
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-muted-foreground">
              Mostly grown within twenty miles of the workshop. Weddings start at £850, including set-up on the day and clearing away after.
            </p>
            <a href="#" className="group mt-4 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline">
              Ask about your date <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <Column photos={COLUMNS[0] ?? []} y={reduce ? 0 : left} />
          <Column photos={COLUMNS[1] ?? []} y={reduce ? 0 : middle} className="md:pt-16" />
          <Column photos={COLUMNS[2] ?? []} y={reduce ? 0 : right} className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}
