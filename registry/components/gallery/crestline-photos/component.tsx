"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const PHOTOS = [
  {
    id: "photo-1722974036021-4d9a4d2963af",
    alt: "Wildflowers and daisies below a mountain range",
    caption: "Alpe di Siusi meadows, day 1",
  },
  { id: "photo-1723835143596-623c49909018", alt: "A trail climbing the side of a rocky mountain", caption: "The climb to Forcella, day 3" },
  { id: "photo-1699388714044-dbf0e8c20537", alt: "Two walkers on a mountain trail", caption: "Puez plateau, day 4" },
  {
    id: "photo-1792404621797-aea0320e5ed0",
    alt: "A wooden barn in a mountain meadow with snowy peaks behind",
    caption: "Hay barn above Lavarella, day 5",
  },
  {
    id: "photo-1519904981063-b0cf448d479e",
    alt: "A walker with a red backpack on a cliff edge facing the mountains",
    caption: "Lagazuoi summit, day 6",
  },
  { id: "photo-1606771967934-f516d3dc907c", alt: "Green pasture below a rocky peak", caption: "Down towards Cortina, day 7" },
];
const STEP = 336;

export default function CrestlinePhotos() {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const max = -(PHOTOS.length - 2) * STEP;
  const go = (dir: number) => setX((v) => Math.min(0, Math.max(max, v + dir * STEP)));

  return (
    <section className="overflow-hidden bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-t-4 border-foreground pt-6 md:grid-cols-4">
          <p className="font-bold tracking-tight">04 / On the trail</p>
          <div className="flex flex-wrap items-end justify-between gap-4 md:col-span-3">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-none font-extrabold tracking-tight">
              Last September&rsquo;s group
            </h2>
            <div className="flex">
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Previous photos"
                className="grid size-12 place-items-center border border-foreground hover:bg-muted"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Next photos"
                className="-ml-px grid size-12 place-items-center border border-foreground hover:bg-muted"
              >
                <ArrowRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <div ref={track} className="mt-10">
          <motion.ul
            drag={reduce ? false : "x"}
            dragConstraints={{ left: max, right: 0 }}
            animate={{ x }}
            onDragEnd={(_, info) => setX((v) => Math.min(0, Math.max(max, Math.round((v + info.offset.x) / STEP) * STEP)))}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
            className="flex w-max cursor-grab gap-4 active:cursor-grabbing"
          >
            {PHOTOS.map((p, i) => (
              <li key={p.id} className="w-80 shrink-0">
                <img src={img(p.id)} alt={p.alt} draggable={false} className="aspect-[4/5] w-full object-cover" />
                <p className="mt-3 flex gap-3 border-t border-foreground pt-2 text-sm">
                  <span className="font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span> {p.caption}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
