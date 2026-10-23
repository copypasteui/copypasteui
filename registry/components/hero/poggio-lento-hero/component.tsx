"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CalendarDays } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const PHOTO = img("photo-1568930157403-9ad464e5f075");
const ALT = "Rolling vineyard hills at golden hour below the farmhouse";

function Headline() {
  return (
    <>
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Agriturismo · Montalcino</p>
      <h1 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">
        Six rooms and a vineyard outside Montalcino
      </h1>
    </>
  );
}

function BookingCard() {
  return (
    <div className="max-w-sm rounded-[var(--radius)] bg-card p-6 text-card-foreground shadow-xl">
      <p className="flex items-center gap-2 text-sm font-semibold text-primary">
        <CalendarDays className="size-4" aria-hidden /> Harvest week, 14 to 20 September
      </p>
      <p className="mt-3 text-muted-foreground">
        Pick grapes in the morning, eat at the long table at two. We make about 9,000 bottles of Rosso a year. Rooms from €140 a night with
        breakfast, two nights minimum.
      </p>
      <a
        href="#"
        className="group mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-5 py-3 font-semibold text-primary-foreground"
      >
        Check availability <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}

export default function PoggioLentoHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // 1 = framed, 0 = full bleed. The frame finishes opening at 60% of the scroll, the card follows.
  const closed = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const clipPath = useTransform(closed, (v) => `inset(${v * 36}% ${v * 8}% ${v * 6}% ${v * 8}% round ${v * 28}px)`);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.18, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const cardOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);

  if (reduce)
    return (
      <section className="bg-background px-6 pt-24 pb-16 font-sans text-foreground">
        <div className="text-center">
          <Headline />
        </div>
        <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-[calc(var(--radius)*2)]">
          <img src={PHOTO} alt={ALT} className="aspect-[16/9] w-full object-cover" />
          <div className="p-4 sm:absolute sm:bottom-6 sm:left-6 sm:p-0">
            <BookingCard />
          </div>
        </div>
      </section>
    );

  return (
    <section ref={ref} className="relative h-[240vh] bg-background font-sans text-foreground">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute inset-x-0 top-[9%] z-10 px-6 text-center">
          <Headline />
        </motion.div>
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.img src={PHOTO} alt={ALT} style={{ scale }} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="absolute inset-x-6 bottom-8 md:inset-x-auto md:bottom-12 md:left-12"
        >
          <BookingCard />
        </motion.div>
      </div>
    </section>
  );
}
