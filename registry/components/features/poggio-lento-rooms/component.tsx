"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ROOMS = [
  {
    name: "La Cantina",
    detail: "Ground floor, opens onto the vines",
    price: "€140",
    photo: "photo-1759139445627-5ce9d5fac8f9",
    alt: "Two beds in a rustic room with tall windows",
  },
  {
    name: "Il Fienile",
    detail: "The old hayloft, beams and a fireplace",
    price: "€190",
    photo: "photo-1768487422639-7ba3900d0f02",
    alt: "Spacious bedroom with a fireplace and a large bed",
  },
  {
    name: "La Torre",
    detail: "Top of the tower, views to Monte Amiata",
    price: "€220",
    photo: "photo-1781781490874-5c8c46637ceb",
    alt: "Bedroom with a wooden headboard and patterned bedding",
  },
  {
    name: "Le Rose",
    detail: "Iron bed, garden terrace, roses in June",
    price: "€160",
    photo: "photo-1775744244614-beb197cfac53",
    alt: "A bedroom with a metal bed frame by a window",
  },
  {
    name: "La Limonaia",
    detail: "Converted lemon house beside the pool",
    price: "€210",
    photo: "photo-1678902177251-7ec8fea483a3",
    alt: "A stone house with a pool surrounded by trees",
  },
  {
    name: "Casa Nonna",
    detail: "Two bedrooms and a kitchen, sleeps four",
    price: "€280",
    photo: "photo-1619387897882-56cedf760e42",
    alt: "A stone villa among cypress trees on a hill",
  },
];

function RoomCard({ r }: { r: (typeof ROOMS)[number] }) {
  return (
    <article className="w-[min(80vw,26rem)] shrink-0">
      <img src={img(r.photo)} alt={r.alt} className="aspect-[4/5] w-full object-cover" />
      <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h3 className="font-display text-3xl">{r.name}</h3>
        <p className="text-sm">
          from <span className="font-semibold text-primary">{r.price}</span>
        </p>
      </div>
      <p className="mt-2 text-muted-foreground">{r.detail}</p>
    </article>
  );
}

export default function PoggioLentoRooms() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  const heading = (
    <div className="max-w-sm shrink-0 pr-8">
      <p className="text-xs tracking-[0.3em] text-primary uppercase">The rooms</p>
      <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">Six rooms, each one different</h2>
      <p className="mt-4 text-muted-foreground">Prices per night for two, with breakfast. Two nights minimum, May to September.</p>
    </div>
  );

  if (reduce)
    return (
      <section className="bg-background px-6 py-24 font-sans text-foreground">
        <div className="mx-auto max-w-6xl">
          {heading}
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 [&>article]:w-full">
            {ROOMS.map((r) => (
              <RoomCard key={r.name} r={r} />
            ))}
          </div>
        </div>
      </section>
    );

  return (
    <section ref={ref} className="relative bg-background font-sans text-foreground md:h-[320vh]">
      <div className="px-6 py-24 md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:overflow-hidden md:py-0">
        <div className="md:hidden">{heading}</div>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 md:hidden [&>article]:w-full">
          {ROOMS.map((r) => (
            <RoomCard key={r.name} r={r} />
          ))}
        </div>
        <motion.div style={{ x }} className="hidden items-center gap-10 pl-[6vw] md:flex">
          {heading}
          {ROOMS.map((r) => (
            <RoomCard key={r.name} r={r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
