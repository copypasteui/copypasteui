"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "Do I need a GP referral?", a: "No. Book directly with us by phone or online." },
  {
    q: "Is the hearing test really free?",
    a: "Yes, with no catch. About half the people we test don't need hearing aids, and we'd rather you trusted us when you do.",
  },
  {
    q: "Can someone come with me?",
    a: "Please do. A familiar voice helps us test how well you follow speech, and two people remember the advice better than one.",
  },
  {
    q: "What if I already have NHS hearing aids?",
    a: "We can test you, clean and retube them, or talk through private options. Keep using them while you decide; there's no pressure to switch.",
  },
  { q: "Is there parking?", a: "Two spaces behind the clinic, off Church Mews, and a step-free entrance on that side." },
];

export default function HushHearingFaq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold">Before your first appointment</h2>
        <ul className="mt-10 space-y-5">
          {FAQS.map((f, i) => (
            <li key={f.q} className="rounded-[var(--radius)] bg-card text-card-foreground shadow-md">
              <h3>
                <button
                  type="button"
                  id={`hush-faq-q-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`hush-faq-a-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-semibold"
                >
                  {f.q}
                  <ChevronDown className={`size-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} aria-hidden />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`hush-faq-a-${i}`}
                    role="region"
                    aria-labelledby={`hush-faq-q-${i}`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
