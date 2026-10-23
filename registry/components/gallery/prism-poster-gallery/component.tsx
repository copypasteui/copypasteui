"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

/* Posters are generated with CSS mesh gradients and type — no images to license or host. */
const posters = [
  {
    title: "Soft Noise",
    author: "@kai",
    likes: 842,
    bg: "bg-secondary bg-[radial-gradient(at_20%_20%,var(--primary),transparent_55%),radial-gradient(at_80%_80%,var(--accent),transparent_50%)]",
    text: "text-primary-foreground",
    tall: true,
  },
  {
    title: "Bloom 04",
    author: "@lin",
    likes: 610,
    bg: "bg-[conic-gradient(from_200deg_at_30%_70%,var(--accent),var(--secondary),var(--primary),var(--accent))]",
    text: "text-foreground",
  },
  {
    title: "GRID/STATE",
    author: "@ola",
    likes: 395,
    bg: "bg-foreground [background-image:linear-gradient(var(--primary)_1px,transparent_1px),linear-gradient(90deg,var(--primary)_1px,transparent_1px)] [background-size:28px_28px]",
    text: "text-background",
  },
  {
    title: "Peach Hour",
    author: "@maya",
    likes: 1204,
    bg: "bg-[radial-gradient(circle_at_50%_110%,var(--accent)_0,var(--secondary)_45%,var(--background)_75%)]",
    text: "text-foreground",
    tall: true,
  },
  {
    title: "Orbitals",
    author: "@ren",
    likes: 507,
    bg: "bg-primary [background-image:repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_18px,color-mix(in_oklab,var(--primary-foreground)_25%,transparent)_19px,transparent_20px)]",
    text: "text-primary-foreground",
  },
  {
    title: "Wavelength",
    author: "@zoe",
    likes: 733,
    bg: "bg-[repeating-linear-gradient(115deg,var(--secondary)_0_24px,var(--accent)_24px_48px,var(--primary)_48px_72px)]",
    text: "text-foreground",
  },
];

export default function PrismPosterGallery() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Community</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">Made in Prism this week</h2>
          </div>
          <a href="#" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
            Browse 40k remixable files
          </a>
        </div>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {posters.map((p, i) => (
            <motion.figure
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group mb-5 break-inside-avoid"
            >
              <div
                className={`relative flex ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"} flex-col justify-between overflow-hidden rounded-3xl p-6 ring-1 ring-border transition duration-500 group-hover:scale-[1.02] group-hover:-rotate-1 ${p.bg}`}
              >
                <span className={`font-display text-xs font-semibold tracking-[0.3em] uppercase ${p.text} opacity-80`}>
                  Poster · {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-display text-4xl leading-none font-bold tracking-tight ${p.text}`}>{p.title}</span>
              </div>
              <figcaption className="mt-3 flex items-center justify-between px-1 text-sm">
                <span className="text-muted-foreground">{p.author}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="size-4" /> {p.likes.toLocaleString()}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
