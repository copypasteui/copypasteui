"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const seasons = [
  { id: "winter", label: "Winter", months: "Nov – Mar", venue: 6500, perHead: 95 },
  { id: "shoulder", label: "Spring & autumn", months: "Apr, May, Sep, Oct", venue: 8900, perHead: 110 },
  { id: "summer", label: "Summer", months: "Jun – Aug", venue: 11500, perHead: 120 },
];
const days = ["Mon–Thu", "Friday & Sunday", "Saturday"];
const dayFactor = [0.75, 0.9, 1];
const included = [
  "Exclusive use, 10am – midnight",
  "Ceremony, drinks & breakfast spaces",
  "Tables, chairs, linen & tableware",
  "Dedicated wedding coordinator",
  "Bridal Suite + 11 guest bedrooms",
  "Late licence & pizza oven",
];

export default function WrenhollowPricing() {
  const [season, setSeason] = useState(1);
  const [day, setDay] = useState(2);
  const [guests, setGuests] = useState(100);
  const s = seasons[season]!;
  const venue = Math.round((s.venue * dayFactor[day]!) / 50) * 50;
  const catering = guests * s.perHead;
  const total = venue + catering;

  return (
    <section id="pricing" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-primary uppercase">2027 pricing</p>
          <h2 className="mt-5 font-display text-5xl font-medium md:text-6xl">
            Clear prices, <em>no surprises</em>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Build a guide price below. Every quote includes VAT, service and our coordinator, with nothing hidden in the small print.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div
            className="space-y-10 border border-border bg-card p-6 text-card-foreground md:p-10"
            style={{ borderRadius: "var(--radius)" }}
          >
            <fieldset>
              <legend className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">Season</legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {seasons.map((x, k) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setSeason(k)}
                    aria-pressed={season === k}
                    className={`border p-4 text-left transition ${season === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    <span className="block font-display text-xl">{x.label}</span>
                    <span className="text-xs opacity-90">{x.months}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">Day of the week</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {days.map((d, k) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDay(k)}
                    aria-pressed={day === k}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${day === k ? "border-primary bg-secondary text-secondary-foreground" : "border-border hover:border-foreground"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label
                htmlFor="lk-guests"
                className="flex items-baseline justify-between text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase"
              >
                Day guests <span className="font-display text-4xl tracking-normal text-foreground normal-case tabular-nums">{guests}</span>
              </label>
              <input
                id="lk-guests"
                type="range"
                min={30}
                max={160}
                step={5}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--primary)]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>30</span>
                <span>160</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-secondary p-6 text-secondary-foreground md:p-10" style={{ borderRadius: "var(--radius)" }}>
            <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">Your guide price</p>
            <motion.p
              key={total}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 font-display text-6xl tabular-nums"
            >
              £{total.toLocaleString("en-GB")}
            </motion.p>
            <dl className="mt-6 space-y-2 border-t border-foreground/15 pt-6 text-sm">
              <div className="flex justify-between">
                <dt>
                  Venue hire · {s.label}, {days[day]}
                </dt>
                <dd className="tabular-nums">£{venue.toLocaleString("en-GB")}</dd>
              </div>
              <div className="flex justify-between">
                <dt>
                  Food & drink · {guests} × £{s.perHead}
                </dt>
                <dd className="tabular-nums">£{catering.toLocaleString("en-GB")}</dd>
              </div>
            </dl>
            <ul className="mt-6 space-y-2 text-sm">
              {included.map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {x}
                </li>
              ))}
            </ul>
            <a
              id="visit"
              href="#"
              className="mt-8 bg-primary py-4 text-center text-sm font-semibold tracking-[0.2em] text-primary-foreground uppercase"
              style={{ borderRadius: "var(--radius)" }}
            >
              Check my date &amp; book a visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
