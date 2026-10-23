"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const quotes = [
  {
    name: "Priya Raman",
    role: "Passed first time, March",
    body: "I'd failed twice with another school. Dee spotted that I was braking late on every roundabout and fixed it in two lessons.",
  },
  { name: "Marcus Lee", role: "Passed, 2 minors", body: "Booked lessons at 7am before work. Never once cancelled on me." },
  {
    name: "Sofia Alvarez",
    role: "Passed in an automatic",
    body: "I was 41 and terrified of motorways. We did the M6 junction three times on a Sunday until it was boring. Thank you, honestly.",
  },
  { name: "Daniel Okafor", role: "Intensive course, passed", body: "Ten days, 30 hours, test on the Friday. Tiring, but it worked." },
  { name: "Hana Kim", role: "Passed first time", body: "The mock test with a different instructor was the most useful hour of the lot." },
  {
    name: "Tom Becker",
    role: "Dad of two learners",
    body: "Both my kids learned with Dee. Patient, straight-talking, and cheaper than the big schools.",
  },
];

export default function MasonryTestimonials() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight md:text-5xl">71% of our learners pass first time</h2>
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              className={`mb-5 break-inside-avoid rounded-xl border border-border p-6 ${
                i === 2 ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
              }`}
            >
              <Quote className={`size-6 ${i === 2 ? "opacity-70" : "text-primary"}`} />
              <blockquote className="mt-4 text-lg leading-relaxed">{q.body}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`grid size-10 place-items-center rounded-full text-sm font-bold ${
                    i === 2 ? "border border-primary-foreground/25" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {q.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold">{q.name}</span>
                  <span className={`block text-sm ${i === 2 ? "opacity-90" : "text-muted-foreground"}`}>{q.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
