"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, RotateCcw } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const questions = [
  { q: "How does your skin feel by midday?", options: ["Tight and dry", "Shiny in places", "Shiny all over", "Easily irritated"] },
  { q: "What would you most like to change?", options: ["Dullness", "Dark spots", "Fine lines", "Redness"] },
];
const picks: Record<string, { product: string; why: string; photo: string; price: number }> = {
  default: {
    product: "Bloom Serum",
    why: "Brightens and smooths with rosehip and bakuchiol, and is gentle enough for daily use.",
    photo: "photo-1576426863848-c21f53c60b19",
    price: 38,
  },
  "Tight and dry": {
    product: "Cloud Cream + Bloom Serum",
    why: "Barrier-first moisture with a brightening serum underneath.",
    photo: "photo-1609097164502-59a1f0f9a66f",
    price: 68,
  },
  "Easily irritated": {
    product: "Petal Cleanser + Cloud Cream",
    why: "A calming, fragrance-light duo to settle reactive skin first.",
    photo: "photo-1597931752949-98c74b5b159f",
    price: 56,
  },
};

export default function FloreaSkinQuiz() {
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;
  const done = step >= questions.length;
  const result = (answers[0] && picks[answers[0]]) || picks.default!;

  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[var(--radius)] bg-accent text-accent-foreground md:grid-cols-2">
        <div className="relative min-h-72">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={done ? result.photo : "intro"}
              src={img(done ? result.photo : "photo-1670201203208-055d6d79db4a")}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
        </div>
        <div className="flex min-h-[26rem] flex-col p-8 md:p-12">
          <div className="flex items-center justify-between text-sm">
            <span className="tracking-[0.2em]">SKIN QUIZ</span>
            {!done && (
              <span>
                {step + 1} / {questions.length}
              </span>
            )}
          </div>
          <div className="mt-3 h-1 rounded-full bg-accent-foreground/15">
            <motion.div
              animate={{ width: `${(Math.min(step, questions.length) / questions.length) * 100}%` }}
              className="h-full rounded-full bg-accent-foreground"
            />
          </div>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="r" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex flex-1 flex-col">
                <p className="text-sm">Your ritual</p>
                <h3 className="mt-2 font-display text-4xl font-medium italic md:text-5xl">{result.product}</h3>
                <p className="mt-4 opacity-80">{result.why}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  <a href="#" className="rounded-full bg-accent-foreground px-7 py-3.5 text-sm font-medium text-accent">
                    Add to bag · €{result.price}
                  </a>
                  <button
                    type="button"
                    onClick={() => setAnswers([])}
                    className="flex items-center gap-2 text-sm underline underline-offset-4"
                  >
                    <RotateCcw className="size-4" /> Start over
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="mt-10 flex flex-1 flex-col"
              >
                <h3 className="font-display text-4xl leading-tight font-medium">{questions[step]!.q}</h3>
                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {questions[step]!.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setAnswers([...answers, o])}
                      className="rounded-full border border-accent-foreground/30 px-5 py-3 text-left text-sm transition hover:bg-accent-foreground hover:text-accent"
                    >
                      {o}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setAnswers(answers.slice(0, -1))}
                    className="mt-auto flex w-fit items-center gap-2 pt-6 text-sm"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
