"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarHeart, Gift, PauseCircle, Sprout } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const plans = [
  { id: "weekly", label: "Weekly", price: 32, save: "Save 25%" },
  { id: "fortnightly", label: "Fortnightly", price: 36, save: "Save 15%" },
  { id: "monthly", label: "Monthly", price: 40, save: "" },
];
const steps = [
  { icon: Sprout, title: "We pick", body: "Our florists choose the best seasonal stems each week: tulips in spring, dahlias in August." },
  { icon: CalendarHeart, title: "You choose the day", body: "Delivered on a Tuesday, Thursday or Friday, to home or office." },
  { icon: PauseCircle, title: "Pause any time", body: "Away? Skip a delivery or pause from your account. No fees." },
  { icon: Gift, title: "Or gift it", body: "Three, six or twelve months, with a card in the first box." },
];

export default function PetalSubscription() {
  const [plan, setPlan] = useState(0);
  const p = plans[plan]!;

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={img("photo-1706796204047-42799881e989", 700)}
              alt="Pink and white peonies on display"
              className="aspect-[3/4] w-full rounded-[var(--radius)] object-cover"
            />
            <img
              src={img("photo-1589243853654-393fcf7c870b", 700)}
              alt="Pink roses and peony buds in a metal bucket"
              className="mt-12 aspect-[3/4] w-full rounded-[var(--radius)] object-cover"
            />
          </div>
          <motion.div
            key={p.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-1/2 left-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-center text-primary-foreground shadow-2xl ring-8 ring-background"
          >
            <span>
              <span className="block font-display text-4xl">£{p.price}</span>
              <span className="text-xs">per delivery</span>
            </span>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold text-primary">Flower subscription</p>
          <h2 className="mt-3 font-display text-5xl leading-tight md:text-6xl">Fresh flowers on the table, without remembering.</h2>
          <div className="mt-8 inline-flex rounded-full bg-secondary p-1.5 text-secondary-foreground">
            {plans.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setPlan(i)}
                aria-pressed={plan === i}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold ${plan === i ? "text-primary-foreground" : ""}`}
              >
                {plan === i && <motion.span layoutId="ps-plan" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
          {p.save && <p className="mt-3 text-sm font-semibold text-primary">{p.save} compared with one-off bouquets</p>}
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                  <s.icon className="size-5" />
                </span>
                <p className="mt-4 font-display text-xl">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </motion.li>
            ))}
          </ol>
          <a href="#" className="mt-10 inline-block rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground">
            Start my {p.label.toLowerCase()} flowers
          </a>
        </div>
      </div>
    </section>
  );
}
