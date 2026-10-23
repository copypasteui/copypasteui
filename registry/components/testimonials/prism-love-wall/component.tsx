"use client";

import { motion } from "motion/react";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=160&q=80`;

const quotes = [
  {
    name: "Maya Chen",
    role: "Design lead, Fieldnote",
    photo: "photo-1758599543111-36ce5c34fceb",
    body: "We moved our whole design team in a week. The multiplayer cursors alone killed half our meetings.",
  },
  {
    name: "Daniel Okoro",
    role: "Founder, Parallax",
    photo: "photo-1758691737646-79dbce8e25fb",
    body: "Prototypes that engineers actually trust. Handoff went from days to minutes.",
  },
  {
    name: "Sara Lind",
    role: "Product designer",
    photo: "photo-1494790108377-be9c29b29330",
    body: "Auto-layout finally works the way my brain does.",
  },
  {
    name: "Tom Becker",
    role: "Brand designer, Arcadia",
    photo: "photo-1500648767791-00dcc994a43e",
    body: "I made our entire launch campaign in one file and the client commented right on the canvas.",
  },
  {
    name: "Lena Vogt",
    role: "Freelancer",
    photo: "photo-1548382131-e0ebb1f0cdea",
    body: "Fast, gorgeous and it never loses my work. That’s all I want from a tool.",
  },
  {
    name: "Ravi Shah",
    role: "Design systems, Kestrel",
    photo: "photo-1568602471122-7832951cc4c5",
    body: "Variants + tokens + branching. Our system finally has one source of truth.",
  },
];

export default function PrismLoveWall() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-28 font-sans text-foreground">
      {/* grain-gradient background, inlined */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 size-full opacity-20 mix-blend-overlay">
          <filter id="prism-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#prism-grain)" />
        </svg>
      </div>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">
          2 million designers, in their own words
        </h2>
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="mb-4 break-inside-avoid rounded-3xl border border-border bg-card/80 p-6 text-card-foreground backdrop-blur-xl"
            >
              <blockquote className={`leading-relaxed ${i % 4 === 0 ? "font-display text-2xl leading-snug font-semibold" : ""}`}>
                “{q.body}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={img(q.photo)} alt="" className="size-10 rounded-full object-cover" />
                <span className="text-sm">
                  <span className="block font-medium">{q.name}</span>
                  <span className="text-muted-foreground">{q.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
