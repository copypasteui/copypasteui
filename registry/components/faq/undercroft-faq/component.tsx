"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    q: "Is it step-free?",
    a: "Yes. There's a lift from the Swinegate entrance down to the bar and screen, and four wheelchair spaces on the front row. Book them online or call us.",
  },
  { q: "Can I bring my drink in?", a: "Anything from our bar, in the glass it came in." },
  {
    q: "What if I'm late?",
    a: "We run 10 minutes of trailers, so you've got until then. After the film starts, our staff will walk you to your seat with a torch.",
  },
  {
    q: "Do you have subtitled screenings?",
    a: "Every Sunday at 18:30 the film has English subtitles, and we mark others in the listings.",
  },
  {
    q: "What's a relaxed screening?",
    a: "The lights stay low, the sound is quieter and you can move about or leave and come back. They're on the first Sunday of the month.",
  },
];

export default function UndercroftFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="visit" className="bg-background px-6 py-16 font-sans text-foreground md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl">Visiting</h2>
          <p className="mt-6">Undercroft, 14 Swinegate, Leeds LS1 4AG</p>
          <p className="mt-2">
            <a href="tel:01134960592" className="underline underline-offset-4">
              0113 496 0592
            </a>
          </p>
          <p className="mt-2">Bar opens an hour before the first film.</p>
        </div>
        <ul className="border-t border-foreground">
          {faqs.map((f, i) => (
            <li key={f.q} className="border-b border-foreground">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-xl font-medium"
              >
                {f.q}
                {open === i ? <Minus className="size-5 shrink-0" aria-hidden /> : <Plus className="size-5 shrink-0" aria-hidden />}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <span className="block pb-5">{f.a}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
