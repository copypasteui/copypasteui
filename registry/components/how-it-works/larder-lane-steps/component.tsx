"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const STEPS = [
  {
    time: "9pm",
    title: "Mix",
    body: "Stoneground flour from a mill thirty miles up the road, water, salt and a starter we have fed every day since 2014. The dough rests in the cold room overnight.",
    photo: "photo-1597528662465-55ece5734101",
    alt: "Rolling pin, whisk and fresh rolls on a marble counter",
  },
  {
    time: "4am",
    title: "Shape",
    body: "Two of us divide and shape about 180 loaves by hand. Seeded rye goes into tins, everything else into cane baskets.",
    photo: "photo-1586765501019-cbe3973ef8fa",
    alt: "Long loaves cooling side by side",
  },
  {
    time: "5am",
    title: "Bake",
    body: "The deck oven runs at 250°C. Country loaves take 42 minutes and come out dark, the way the regulars ask for them.",
    photo: "photo-1509440159596-0249088772ff",
    alt: "Round country sourdough loaves with a dark crust",
  },
  {
    time: "7am",
    title: "Open",
    body: "Doors open at 7, Tuesday to Saturday, at 14 Larder Lane. The country loaf is £4.80 and usually sells out by 11.",
    photo: "photo-1711672284661-bd70e38f31b2",
    alt: "Bread and pastries laid out on the shop counter",
  },
] as const;

function Step({ step, index, onActive }: { step: (typeof STEPS)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex min-h-[60vh] flex-col justify-center py-10 lg:min-h-[85vh]">
      <img src={img(step.photo, 900)} alt={step.alt} className="mb-6 aspect-[4/3] w-full rounded-[var(--radius)] object-cover lg:hidden" />
      <p className="font-display text-5xl text-primary md:text-6xl">{step.time}</p>
      <h3 className="mt-3 font-display text-3xl">{step.title}</h3>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{step.body}</p>
    </li>
  );
}

export default function LarderLaneSteps() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase">Larder Lane Bakery</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
          From last night&rsquo;s mix to your 7am loaf
        </h2>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <ol>
            {STEPS.map((s, i) => (
              <Step key={s.title} step={s} index={i} onActive={setActive} />
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[12vh] h-[76vh] overflow-hidden rounded-[var(--radius)] border border-border bg-muted">
              {STEPS.map((s, i) => (
                <motion.img
                  key={s.photo}
                  src={img(s.photo)}
                  alt={i === active ? s.alt : ""}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active || reduce ? 1 : 1.08 }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <p className="absolute top-4 left-4 rounded-[var(--radius)] bg-card px-3 py-1.5 font-display text-lg text-card-foreground">
                {STEPS[active]?.time} · {STEPS[active]?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
