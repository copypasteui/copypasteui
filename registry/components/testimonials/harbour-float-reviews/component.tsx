"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const REVIEWS = [
  {
    quote: "I didn't think I'd switch off. Woke up when the music came on and had no idea where an hour went.",
    name: "Morwenna T.",
    what: "First float",
  },
  {
    quote: "Sauna, plunge, sauna, plunge, then chips on the harbour. Best Tuesday evening I've had in years.",
    name: "Jago P.",
    what: "Sauna session",
  },
  { quote: "Floating has done more for my lower back than six months of stretches.", name: "Ruth E.", what: "Five-pack" },
  { quote: "The staff explained everything without making it weird. Spotless rooms.", name: "Dev S.", what: "First float" },
  {
    quote: "Bought my dad a voucher. He's been back four times and won't stop talking about the cold tub.",
    name: "Lowenna C.",
    what: "Gift voucher",
  },
  { quote: "Window seat in the sauna looking at the boats coming in. Worth it for that alone.", name: "Tom B.", what: "Sauna session" },
];

function Column({ items, reverse, paused }: { items: typeof REVIEWS; reverse?: boolean; paused: boolean }) {
  return (
    <div className="h-[32rem] overflow-hidden [mask-image:linear-gradient(transparent,black_12%,black_88%,transparent)]">
      <ul
        className={`flex flex-col gap-4 motion-safe:animate-[harbour-drift_32s_linear_infinite] ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {[...items, ...items].map((r, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground"
          >
            <p>&ldquo;{r.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold">
              {r.name} <span className="font-normal text-muted-foreground">· {r.what}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HarbourFloatReviews() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <style>{`@keyframes harbour-drift { to { transform: translateY(-50%); } }`}</style>
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold">What people say after</h2>
            <p className="mt-2 text-muted-foreground">Rated 4.8 from 412 Google reviews.</p>
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            {paused ? "Play reviews" : "Pause reviews"}
          </button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <Column items={REVIEWS.slice(0, 3)} paused={paused} />
          <div className="hidden md:block">
            <Column items={REVIEWS.slice(3)} paused={paused} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
