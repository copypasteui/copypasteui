"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sophie K., Todmorden",
    text: "Pennine fire is the only candle my partner hasn't complained about. It smells like the pub after a walk.",
  },
  {
    name: "Imran H., Halifax",
    text: "Did the Thursday workshop for a birthday. Ruth let us mix as many test strips as we wanted, and my blend is still on the shelf six months later.",
  },
  { name: "Jen B., Leeds", text: "The 200g jar burned evenly to the bottom. I've reused three as plant pots." },
];

export default function HearthWickReviews() {
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl md:text-5xl">From people who&apos;ve burned them</h2>
          <p className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-primary text-primary" aria-hidden /> <span className="font-semibold">4.7</span> from 1,083 reviews
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-[var(--radius)] bg-card p-6 text-card-foreground shadow-md">
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
