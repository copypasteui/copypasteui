"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Truck, PauseCircle, Gift } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const cadences = [
  { weeks: 1, label: "Weekly", bags: "1 bag" },
  { weeks: 2, label: "Fortnightly", bags: "1 bag" },
  { weeks: 4, label: "Monthly", bags: "2 bags" },
];

export default function CinderwickSubscribeCta() {
  const [c, setC] = useState(1);
  const perBag = 10.2;
  const total = (perBag * (c === 2 ? 2 : 1)).toFixed(2);

  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[var(--radius)] bg-accent text-accent-foreground lg:grid-cols-2">
        <div className="p-8 md:p-14">
          <h2 className="font-display text-5xl leading-[1] font-semibold tracking-tight md:text-6xl">Never run out of good coffee.</h2>
          <p className="mt-5 max-w-md text-lg opacity-90">
            A different single origin each delivery, chosen by our head roaster. Skip, pause or cancel in two clicks.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-2 rounded-full bg-accent-foreground/10 p-1.5">
            {cadences.map((x, i) => (
              <button
                key={x.label}
                type="button"
                onClick={() => setC(i)}
                className={`relative rounded-full py-2.5 text-sm font-semibold ${c === i ? "text-primary-foreground" : ""}`}
              >
                {c === i && <motion.span layoutId="cinderwick-cadence" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-6 flex items-baseline gap-2">
            <motion.span
              key={total}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-6xl font-extrabold"
            >
              £{total}
            </motion.span>
            <span className="opacity-90">
              every {cadences[c]!.weeks === 1 ? "week" : `${cadences[c]!.weeks} weeks`} · {cadences[c]!.bags}
            </span>
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Start my subscription
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <li className="flex items-center gap-2">
              <Truck className="size-4" /> Free delivery
            </li>
            <li className="flex items-center gap-2">
              <PauseCircle className="size-4" /> Pause anytime
            </li>
            <li className="flex items-center gap-2">
              <Gift className="size-4" /> First bag half price
            </li>
          </ul>
        </div>
        <div className="relative min-h-80">
          <img
            src={img("photo-1442512595331-e89e73853f31")}
            alt="Pour-over coffee being brewed"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
