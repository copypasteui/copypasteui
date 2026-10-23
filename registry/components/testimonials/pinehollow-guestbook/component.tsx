"use client";

import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

const entries = [
  {
    date: "12 Oct 2026",
    cabin: "Larch A-frame",
    text: "Saw an otter from the hot tub at dawn. Didn’t look at a screen for four days. We’ve already booked next year.",
    by: "Ruth & Callum, Glasgow",
  },
  {
    date: "28 Sep 2026",
    cabin: "Heron Lodge",
    text: "Three generations, one cabin, zero arguments. Granny won at cards every night. The kids still talk about the jetty.",
    by: "The Mensah family",
  },
  {
    date: "3 Sep 2026",
    cabin: "The Bothy",
    text: "Proposed on the jetty. She said yes. Thank you for the champagne and for pretending not to watch.",
    by: "Tom & Anja",
  },
  {
    date: "19 Aug 2026",
    cabin: "Meadow Cabin",
    text: "Our dog Pepper has decided she lives here now. The welcome hamper (and the sausages) were incredible.",
    by: "Isla & Pepper",
  },
  {
    date: "2 Aug 2026",
    cabin: "Loft at the Mill",
    text: "Wrote eleven thousand words of my novel and ate my body weight in farm-shop flapjack. Perfect.",
    by: "D. Achterberg",
  },
];

export default function PinehollowGuestbook() {
  return (
    <section className="overflow-hidden bg-secondary py-20 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="size-6" />
            </span>
            <div>
              <h2 className="font-display text-4xl font-bold md:text-5xl">From the guestbook</h2>
              <p className="text-muted-foreground">Every cabin has one. These are a few recent pages.</p>
            </div>
          </div>
          <p className="font-display text-xl">
            <span className="text-4xl font-bold">4.88</span> · 860 Airbnb &amp; Google reviews
          </p>
        </div>
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label="Guestbook entries"
        className="mt-12 flex snap-x [scrollbar-width:thin] gap-6 overflow-x-auto px-6 pb-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {entries.map((e, i) => (
          <motion.article
            key={e.date}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative w-[300px] shrink-0 snap-start rounded-[var(--radius)] bg-card p-7 text-card-foreground shadow-md md:w-[360px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent 0 31px, color-mix(in oklab, var(--border) 70%, transparent) 31px 32px)",
              backgroundPosition: "0 76px",
            }}
          >
            <span aria-hidden className="absolute top-0 bottom-0 left-12 w-px bg-accent/40" />
            <div className="pl-8">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{e.date}</p>
              <p className="text-sm font-semibold text-accent">{e.cabin}</p>
              <p className="mt-5 font-display text-xl leading-8">{e.text}</p>
              <p className="mt-6 text-sm font-semibold">— {e.by}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
