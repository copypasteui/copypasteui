"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does a full groom take?",
    a: "Two to three hours for most dogs, longer for doodles and double coats. We text you 30 minutes before they're ready.",
  },
  {
    q: "My dog is nervous. Can you help?",
    a: "Yes. Book a 20-minute 'meet and treat' first (free). We go slowly, no cage drying, and we'll stop if they're unhappy.",
  },
  {
    q: "Do you take puppies?",
    a: "From 12 weeks, once they've had their second jab. A puppy intro is £25: a bath, a nail trim and lots of praise.",
  },
  {
    q: "What if my dog has matted fur?",
    a: "We'll always try to brush it out. If it's too tight to do kindly, we'll call you before clipping short.",
  },
  { q: "Where do I park?", a: "Two spaces right outside on Mill Lane, or free on-street after 9:30am." },
];

export default function SplitAccordionFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Things people ask at the desk</h2>
          <p className="mt-4 text-muted-foreground">
            Something else?{" "}
            <a href="#" className="font-medium text-foreground underline decoration-primary underline-offset-4">
              Call us on 01632 960 214
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"
                >
                  {f.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`grid size-8 shrink-0 place-items-center rounded-full border ${
                      isOpen ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
