"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Users } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const instruments = [
  {
    id: "Piano",
    age: "From age 5",
    photo: "photo-1475275166152-f1e8005f9854",
    body: "Classical, pop or jazz. We teach reading music and playing by ear. Graded exams optional, enjoyment compulsory.",
    teachers: 7,
    price: 21,
  },
  {
    id: "Guitar",
    age: "From age 7",
    photo: "photo-1758524944402-1903b38f848f",
    body: "Acoustic, electric or bass. Learn the songs you love from week one, then the theory behind them.",
    teachers: 5,
    price: 19,
  },
  {
    id: "Voice",
    age: "From age 8",
    photo: "photo-1758525865228-7ead2d650b60",
    body: "Healthy technique for musical theatre, pop and classical. Audition coaching available.",
    teachers: 4,
    price: 21,
  },
  {
    id: "Strings",
    age: "From age 4",
    photo: "photo-1511379938547-c1f69419868d",
    body: "Violin, viola and cello, with instrument hire from £8 a month and a junior string orchestra.",
    teachers: 4,
    price: 21,
  },
  {
    id: "Early years",
    age: "Ages 2 – 5",
    photo: "photo-1758612897794-3bbd1798ca31",
    body: "Rhythm, singing and tiny instruments in small groups. Grown-ups join in (and love it).",
    teachers: 2,
    price: 9,
  },
];

export default function QuavermoorInstruments() {
  const [i, setI] = useState(0);
  const x = instruments[i]!;

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl md:text-6xl">Choose your instrument</h2>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-b border-border">
          {instruments.map((it, k) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setI(k)}
              aria-pressed={i === k}
              className={`relative pb-4 font-display text-2xl transition ${i === k ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {it.id}
              {i === k && <motion.span layoutId="cr-u" className="absolute inset-x-0 -bottom-px h-1 rounded-full bg-accent" />}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={x.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            <div className="overflow-hidden rounded-[var(--radius)]">
              <img src={img(x.photo)} alt={`${x.id} lesson`} className="aspect-[16/10] w-full object-cover" />
            </div>
            <div>
              <p className="text-sm tracking-[0.3em] text-primary uppercase">{x.age}</p>
              <p className="mt-3 font-display text-4xl">{x.id} lessons</p>
              <p className="mt-4 text-lg text-muted-foreground">{x.body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <dt className="text-xs tracking-widest text-muted-foreground uppercase">From</dt>
                  <dd className="font-display text-3xl">£{x.price}</dd>
                  <dd className="text-xs text-muted-foreground">per lesson</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1 text-xs tracking-widest text-muted-foreground uppercase">
                    <Clock className="size-3" /> Length
                  </dt>
                  <dd className="font-display text-3xl">30–60</dd>
                  <dd className="text-xs text-muted-foreground">minutes</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1 text-xs tracking-widest text-muted-foreground uppercase">
                    <Users className="size-3" /> Teachers
                  </dt>
                  <dd className="font-display text-3xl">{x.teachers}</dd>
                  <dd className="text-xs text-muted-foreground">to choose from</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
