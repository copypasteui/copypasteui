"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Music2 } from "lucide-react";

const instruments = ["Piano", "Guitar", "Voice", "Violin", "Cello", "Drums", "Not sure yet"];
const levels = ["Total beginner", "A little", "Grade 1–4", "Grade 5+"];
const when = ["Weekday after school", "Weekday daytime", "Saturday", "Online"];

const Chips = ({ items, value, set }: { items: string[]; value: string; set: (s: string) => void }) => (
  <div className="mt-2 flex flex-wrap gap-2">
    {items.map((x) => (
      <button
        key={x}
        type="button"
        onClick={() => set(x)}
        aria-pressed={value === x}
        className={`rounded-full border px-4 py-2 text-sm transition ${value === x ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/30 hover:border-primary-foreground"}`}
      >
        {x}
      </button>
    ))}
  </div>
);

export default function QuavermoorTrial() {
  const [inst, setInst] = useState("Piano");
  const [level, setLevel] = useState(levels[0]!);
  const [time, setTime] = useState(when[0]!);
  const [forWho, setForWho] = useState<"Me" | "My child">("My child");
  const [sent, setSent] = useState(false);

  return (
    <section id="trial" className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Music2 className="size-10 text-accent" />
          <h2 className="mt-5 font-display text-5xl leading-tight">Your first lesson is on us.</h2>
          <p className="mt-4 opacity-90">
            A free 30-minute trial with a teacher matched to your instrument, level and goals. No instrument? Borrow one of ours.
          </p>
          <ul className="mt-8 space-y-3">
            {["Matched to the right teacher", "No obligation to continue", "Pay monthly, cancel any time"].map((x) => (
              <li key={x} className="flex gap-3">
                <Check className="size-5 text-accent" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--radius)] border border-primary-foreground/20 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                <p className="font-display text-4xl">♪ Lovely!</p>
                <p className="mt-3 opacity-85">We’ll match a {inst.toLowerCase()} teacher and call within two days to book your trial.</p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <div className="flex rounded-full bg-primary-foreground/10 p-1">
                  {(["Me", "My child"] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setForWho(w)}
                      aria-pressed={forWho === w}
                      className={`relative flex-1 rounded-full py-2.5 text-sm font-semibold ${forWho === w ? "text-primary" : ""}`}
                    >
                      {forWho === w && <motion.span layoutId="cr-who" className="absolute inset-0 rounded-full bg-primary-foreground" />}
                      <span className="relative">Lessons for {w.toLowerCase()}</span>
                    </button>
                  ))}
                </div>
                <fieldset>
                  <legend className="text-sm opacity-90">Instrument</legend>
                  <Chips items={instruments} value={inst} set={setInst} />
                </fieldset>
                <fieldset>
                  <legend className="text-sm opacity-90">Experience</legend>
                  <Chips items={levels} value={level} set={setLevel} />
                </fieldset>
                <fieldset>
                  <legend className="text-sm opacity-90">Best time</legend>
                  <Chips items={when} value={time} set={setTime} />
                </fieldset>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder={forWho === "Me" ? "Your name" : "Parent’s name"}
                    aria-label="Name"
                    className="rounded-[var(--radius)] border border-primary-foreground/30 bg-transparent px-4 py-3 outline-none placeholder:text-primary-foreground/60 focus:border-accent"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="rounded-[var(--radius)] border border-primary-foreground/30 bg-transparent px-4 py-3 outline-none placeholder:text-primary-foreground/60 focus:border-accent"
                  />
                </div>
                <button type="submit" className="w-full rounded-[var(--radius)] bg-accent py-4 font-semibold text-accent-foreground">
                  Book my free {inst === "Not sure yet" ? "taster" : inst.toLowerCase()} lesson
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
