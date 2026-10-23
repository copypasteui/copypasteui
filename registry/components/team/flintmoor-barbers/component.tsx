"use client";

import { motion } from "motion/react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const barbers = [
  {
    name: "Dez",
    role: "Owner · 26 years",
    known: "Old-school scissor work",
    free: "Free at 2:40pm",
    on: true,
    photo: "photo-1506794778202-cad84cf45f1d",
    work: "photo-1647140655214-e4a2d914971f",
  },
  {
    name: "Marco",
    role: "Senior barber",
    known: "Skin fades & designs",
    free: "Fully booked today",
    on: false,
    photo: "photo-1500648767791-00dcc994a43e",
    work: "photo-1657105052497-f996284ffff8",
  },
  {
    name: "Aisha",
    role: "Barber",
    known: "Textured & curly hair",
    free: "Free now",
    on: true,
    photo: "photo-1758599543111-36ce5c34fceb",
    work: "photo-1605497788044-5a32c7078486",
  },
];

export default function FlintmoorBarbers() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-6xl leading-none uppercase md:text-7xl">The chairs</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {barbers.map((b, i) => (
            <motion.article
              key={b.name}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-card text-card-foreground"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={img(b.work)}
                  alt={`Haircut by ${b.name}`}
                  className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <img
                  src={img(b.photo)}
                  alt={`Portrait of ${b.name}`}
                  className="absolute inset-0 size-full object-cover grayscale transition-opacity duration-500 group-hover:opacity-0"
                />
                <span className="absolute top-3 left-3 rounded-[var(--radius)] bg-background px-2.5 py-1 text-xs font-bold tracking-wider text-foreground uppercase">
                  Hover for their work
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-4xl uppercase">{b.name}</h3>
                  <span className="text-sm text-muted-foreground">{b.role}</span>
                </div>
                <p className="mt-1 text-sm">
                  Known for: <span className="font-semibold">{b.known}</span>
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span className={`size-2.5 rounded-full ${b.on ? "animate-pulse bg-[oklch(0.7_0.17_145)]" : "bg-muted-foreground"}`} />{" "}
                    {b.free}
                  </span>
                  <a
                    href="#book"
                    className={`rounded-[var(--radius)] px-4 py-2 text-sm font-bold tracking-wider uppercase ${b.on ? "bg-primary text-primary-foreground" : "pointer-events-none bg-muted text-muted-foreground"}`}
                    aria-disabled={!b.on}
                  >
                    Book
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
