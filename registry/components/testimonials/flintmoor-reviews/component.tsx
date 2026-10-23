"use client";

import { Star } from "lucide-react";

const rowA = [
  "Best fade in Manchester, no contest. — Liam",
  "Dez has cut my hair for 19 years. My dad’s too. — Ryan",
  "Walked in at 5:55, still got a cut. Legends. — Omar",
  "The hot-towel shave is the most relaxing 40 minutes of my month. — Pete",
];
const rowB = [
  "Aisha actually knows how to cut curly hair. Finally. — Kwesi",
  "Took my 4-year-old for his first haircut. Patient, kind, lollipop. — Sarah",
  "Booked online in 20 seconds, out in 30 minutes. — Jamie",
  "Free coffee, good music, great cut. What else do you want. — Dan",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max shrink-0 gap-4 pr-4 ${reverse ? "[animation:iron-marquee_40s_linear_infinite_reverse]" : "[animation:iron-marquee_40s_linear_infinite]"} hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {[...items, ...items].map((t, i) => {
          const [quote, who] = t.split(" — ");
          return (
            <figure
              key={i}
              aria-hidden={i >= items.length}
              className="w-80 shrink-0 rounded-[var(--radius)] border-2 border-foreground bg-card p-5 text-card-foreground"
            >
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 font-semibold">“{quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">— {who}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export default function FlintmoorReviews() {
  return (
    <section className="overflow-hidden bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto mb-12 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6">
        <h2 className="font-display text-6xl leading-none uppercase md:text-7xl">
          Word on
          <br />
          the street
        </h2>
        <p className="text-right">
          <span className="block font-display text-7xl leading-none">4.8</span>
          <span className="text-sm text-muted-foreground">2,310 Google reviews</span>
        </p>
      </div>
      <div className="space-y-4">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
      <style>{`@keyframes iron-marquee { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
