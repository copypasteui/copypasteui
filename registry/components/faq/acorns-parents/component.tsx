"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarHeart, Heart, Plus } from "lucide-react";

const faqs = [
  {
    q: "How does settling in work?",
    a: "Two free settling sessions: the first with you in the room, the second where you pop out for an hour. We go at your child’s pace, always.",
  },
  {
    q: "What will I hear about my child’s day?",
    a: "Photos, naps, meals and nappy changes go to our parent app throughout the day, plus a proper chat with their key person at pick-up.",
  },
  {
    q: "Do you cater for allergies and diets?",
    a: "Yes. Our kitchen is nut-free and we cook for every allergy and diet, including vegetarian, vegan, halal and dairy-free.",
  },
  {
    q: "What should my child bring?",
    a: "Wellies and a waterproof suit (we have spares), a comforter if they have one, and a spare set of clothes. We provide everything else.",
  },
  {
    q: "Is there a waiting list?",
    a: "For the baby room, usually 3–6 months. Toddler and pre-school spaces often come up sooner, so ask us.",
  },
];

export default function AcornsParents() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="visit" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-extrabold">Questions from parents</h2>
          <ul className="mt-8 space-y-3">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="overflow-hidden rounded-[var(--radius)] bg-card text-card-foreground">
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-bold"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: on ? 135 : 0 }}
                      transition={{ type: "spring" }}
                      className={`grid size-9 shrink-0 place-items-center rounded-full ${on ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <Plus className="size-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-muted-foreground"
                      >
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-5 self-start lg:sticky lg:top-8">
          <figure className="rounded-[var(--radius)] bg-card p-7 text-card-foreground">
            <Heart className="size-7 fill-primary text-primary" />
            <blockquote className="mt-4 font-display text-2xl leading-snug font-bold">
              “Our daughter runs in every morning. I get a photo of her covered in mud by 11. I couldn’t ask for more.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">Hannah, mum to Isla (3)</figcaption>
          </figure>
          <form onSubmit={(e) => e.preventDefault()} className="rounded-[var(--radius)] bg-primary p-7 text-primary-foreground">
            <p className="flex items-center gap-2 font-display text-2xl font-extrabold">
              <CalendarHeart className="size-6" /> Book a show-round
            </p>
            <p className="mt-1 text-sm opacity-90">Weekdays at 10am or 2pm. Bring your little one!</p>
            <input
              required
              placeholder="Your name"
              aria-label="Your name"
              className="mt-4 w-full rounded-full bg-primary-foreground px-5 py-3 text-primary outline-none placeholder:text-primary/60"
            />
            <input
              required
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="mt-2 w-full rounded-full bg-primary-foreground px-5 py-3 text-primary outline-none placeholder:text-primary/60"
            />
            <button type="submit" className="mt-3 w-full rounded-full bg-accent py-3 font-bold text-accent-foreground">
              Request a visit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
