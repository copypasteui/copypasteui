"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Frame = { name: string; maker: string; price: string; shape: string; photo: string; alt: string };
const frames: Frame[] = [
  {
    name: "Avon",
    maker: "Clearwell own",
    price: "£95",
    shape: "Round",
    photo: "photo-1615468822882-4828d2602857",
    alt: "Silver round glasses on a clear glass shelf",
  },
  {
    name: "Severn",
    maker: "Clearwell own",
    price: "£95",
    shape: "Square",
    photo: "photo-1577410114274-ef015b5b6d29",
    alt: "Black square glasses on a white surface",
  },
  {
    name: "Kenmore 52",
    maker: "Penrose Optical",
    price: "£189",
    shape: "Square",
    photo: "photo-1617791932882-a70117e3564d",
    alt: "Black-framed glasses lying on a white surface",
  },
  {
    name: "Lark",
    maker: "Ottoline Eyewear",
    price: "£215",
    shape: "Cat-eye",
    photo: "photo-1564805280186-5d7056d538ca",
    alt: "Woman wearing black cat-eye glasses",
  },
  {
    name: "Brandon",
    maker: "Clearwell own",
    price: "£120",
    shape: "Round",
    photo: "photo-1576614965955-4e015da6a29c",
    alt: "Man wearing thin round glasses",
  },
  {
    name: "Mira",
    maker: "Ottoline Eyewear",
    price: "£198",
    shape: "Cat-eye",
    photo: "photo-1525786210598-d527194d3e9a",
    alt: "Close-up of a woman wearing black-framed glasses",
  },
];
const shapes = ["All", "Round", "Square", "Cat-eye"];

export default function ClearwellFrames() {
  const [shape, setShape] = useState("All");
  const shown = frames.filter((f) => shape === "All" || f.shape === shape);
  return (
    <section id="frames" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Frames</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              600 frames, single-vision lenses included
            </h2>
          </div>
          <div role="group" aria-label="Filter by shape" className="flex flex-wrap gap-2">
            {shapes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={shape === s}
                onClick={() => setShape(s)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${shape === s ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((f) => (
              <motion.li
                key={f.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-[var(--radius)] border border-border bg-card text-card-foreground"
              >
                <img src={img(f.photo)} alt={f.alt} className="aspect-[4/3] w-full object-cover" />
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-semibold">{f.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {f.maker} · {f.shape}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">{f.price}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <a
          href="#book"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-muted"
        >
          Try frames on in the shop <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
