"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  { name: "Leah", handle: "@leahmakes", body: "Finally an app that doesn’t guilt-trip me. Just gentle, useful nudges." },
  { name: "Omar", handle: "@omar.k", body: "Three weeks in and I’m sleeping an hour more. Not exaggerating." },
  { name: "Mei", handle: "@meiwrites", body: "The wind-down sounds are unreal. I fall asleep before they end." },
  { name: "Jonas", handle: "@jns", body: "Beautiful design and it respects my privacy. Rare combo." },
  { name: "Ava", handle: "@avaruns", body: "Streaks got me hooked, the insights kept me here." },
  { name: "Diego", handle: "@dgo", body: "Switched from two other apps. This one is calmer and smarter." },
  { name: "Noor", handle: "@noor", body: "Widgets are gorgeous. My lock screen has never looked better." },
  { name: "Ben", handle: "@benbuilds", body: "Customer support replied in 10 minutes on a Sunday. Wow." },
];

function Row({ items, reverse }: { items: typeof reviews; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-4 pr-4"
      >
        {[...items, ...items].map((r, i) => (
          <figure key={i} className="w-80 shrink-0 rounded-xl border border-border bg-card p-5 text-card-foreground">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 leading-relaxed">{r.body}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 text-sm">
              <span className="grid size-8 place-items-center rounded-full bg-accent font-bold text-accent-foreground">{r.name[0]}</span>
              <span>
                <span className="font-semibold">{r.name}</span> <span className="text-muted-foreground">{r.handle}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeTestimonials() {
  return (
    <section className="space-y-4 overflow-hidden bg-background py-24 font-sans text-foreground">
      <div className="mx-auto mb-10 max-w-2xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">What 2 million people say about their sleep</h2>
        <p className="mt-3 text-muted-foreground">Real reviews from the App Store and Google Play.</p>
      </div>
      <Row items={reviews.slice(0, 4).concat(reviews.slice(4))} />
      <Row items={reviews.slice(4).concat(reviews.slice(0, 4))} reverse />
    </section>
  );
}
