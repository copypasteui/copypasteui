"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const events = [
  {
    day: "06",
    month: "Nov",
    title: "Morag Lennox on The Lamplighter's Daughters",
    detail: "Thursday 7pm, upstairs. In conversation with Callum Reid.",
    left: "18 seats left",
  },
  {
    day: "14",
    month: "Nov",
    title: "Translators' night: three books, three languages",
    detail: "Friday 7:30pm, with wine from the café.",
    left: "32 seats left",
  },
  { day: "23", month: "Nov", title: "Otto Builds a Boat story time", detail: "Sunday 10:30am, ages 3 to 7, free.", left: "Drop in" },
];

export default function MarginEvents() {
  return (
    <section className="bg-foreground px-6 py-20 font-sans text-background md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl md:text-7xl">Readings and events</h2>
          <p className="max-w-xs text-sm">Tickets are £5 and come off the book if you buy one on the night.</p>
        </div>
        <ul className="mt-12 border-t border-background/30">
          {events.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <a
                href="#"
                className="group grid grid-cols-[4.5rem_1fr] items-center gap-6 border-b border-background/30 py-7 md:grid-cols-[7rem_1fr_auto]"
              >
                <span className="font-display leading-none">
                  <span className="block text-5xl md:text-6xl">{e.day}</span>
                  <span className="text-sm uppercase">{e.month}</span>
                </span>
                <span>
                  <span className="block font-display text-2xl md:text-3xl">{e.title}</span>
                  <span className="mt-1 block text-sm">{e.detail}</span>
                </span>
                <span className="col-start-2 flex items-center gap-2 text-sm font-semibold md:col-start-auto">
                  {e.left}{" "}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
