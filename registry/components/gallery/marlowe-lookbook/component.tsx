"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const looks = [
  {
    n: "01",
    photo: "photo-1668952135120-7d997b1b3778",
    alt: "Model in an oversized camel coat",
    items: ["Harlow wool coat, £345", "Ribbed roll-neck, £95"],
  },
  {
    n: "02",
    photo: "photo-1754315052701-0b98f6ba786b",
    alt: "Model in a black blazer and leather gloves",
    items: ["Single-breasted blazer, £220", "Leather gloves, £65"],
  },
  {
    n: "03",
    photo: "photo-1664076458686-3449062080ac",
    alt: "Model in a satin slip dress",
    items: ["Bias-cut silk slip, £160", "Opera gloves, £48"],
  },
  {
    n: "04",
    photo: "photo-1613915617430-8ab0fd7c6baf",
    alt: "Model in a houndstooth jacket",
    items: ["Houndstooth jacket, £275", "Wide trousers, £140"],
  },
  {
    n: "05",
    photo: "photo-1769107805511-0bb7075fca27",
    alt: "Ivory dress on a mannequin in the shop",
    items: ["Column dress, £210", "Woven tote, £85"],
  },
];

export default function MarloweLookbook() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-38%"]);

  return (
    <section id="lookbook" ref={ref} className="overflow-hidden bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">The edit · No. 14</p>
          <h2 className="mt-4 font-display text-6xl leading-none md:text-8xl">
            Five ways
            <br />
            <em className="text-primary">to wear grey</em>
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold tracking-[0.2em] uppercase"
        >
          Shop the edit <ArrowRight className="size-4" />
        </a>
      </div>

      <motion.div style={{ x }} className="mt-16 flex gap-5 pl-6">
        {looks.map((l, i) => (
          <figure key={l.n} className={`group relative w-[70vw] shrink-0 sm:w-[42vw] lg:w-[26vw] ${i % 2 ? "mt-16" : ""}`}>
            <div className="overflow-hidden">
              <img
                src={img(l.photo)}
                alt={l.alt}
                className="aspect-[3/4] w-full object-cover grayscale-[40%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-4 flex gap-4">
              <span className="font-display text-4xl text-primary italic">{l.n}</span>
              <ul className="text-sm">
                {l.items.map((it) => (
                  <li key={it} className="border-b border-border py-1">
                    {it}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </section>
  );
}
