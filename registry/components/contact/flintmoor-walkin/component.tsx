"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, MapPin, Phone } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const hours = [
  ["Mon", "Closed"],
  ["Tue – Fri", "9:00 – 19:00"],
  ["Sat", "8:00 – 17:00"],
  ["Sun", "10:00 – 15:00"],
];
const services = ["Classic cut · £20", "Skin fade · £22", "Cut & beard · £32", "Hot-towel shave · £26"];
const slots = ["10:20", "11:00", "13:40", "14:40", "16:00", "17:20"];

export default function FlintmoorWalkin() {
  const [mode, setMode] = useState<"book" | "queue">("book");
  const [svc, setSvc] = useState(services[1]!);
  const [slot, setSlot] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  return (
    <section id="book" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[var(--radius)] border-2 border-foreground bg-card p-6 text-card-foreground md:p-10">
          <div className="grid grid-cols-2 rounded-[var(--radius)] bg-muted p-1">
            {(["book", "queue"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`relative rounded-[var(--radius)] py-3 text-sm font-bold tracking-wider uppercase ${mode === m ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {mode === m && <motion.span layoutId="iron-mode" className="absolute inset-0 rounded-[var(--radius)] bg-primary" />}
                <span className="relative">{m === "book" ? "Book a time" : "Join the queue"}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === "book" ? (
              <motion.div
                key="book"
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-6"
              >
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSvc(s)}
                      aria-pressed={svc === s}
                      className={`rounded-[var(--radius)] border-2 px-3 py-2 text-sm font-semibold ${svc === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase">Today</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {slots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSlot(t)}
                        aria-pressed={slot === t}
                        className={`rounded-[var(--radius)] border-2 py-2.5 text-sm font-bold tabular-nums ${slot === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!slot}
                  className="w-full rounded-[var(--radius)] bg-primary py-4 font-bold tracking-wider text-primary-foreground uppercase disabled:opacity-40"
                >
                  {slot ? `Confirm ${svc.split(" · ")[0]} at ${slot}` : "Pick a time"}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="queue"
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8"
              >
                {joined ? (
                  <div className="py-6 text-center">
                    <Check className="mx-auto size-10 text-primary" />
                    <p className="mt-3 font-display text-4xl uppercase">You’re 4th</p>
                    <p className="mt-1 text-muted-foreground">We’ll text you when you’re next. Stroll over in about 30 minutes.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setJoined(true);
                    }}
                    className="space-y-4"
                  >
                    <p className="text-lg">
                      3 people waiting · about <strong>25 minutes</strong>. Join from your phone and grab a coffee nearby.
                    </p>
                    <input
                      required
                      placeholder="First name"
                      aria-label="First name"
                      className="w-full rounded-[var(--radius)] border-2 border-border bg-background px-4 py-3 outline-none focus:border-foreground"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Mobile for a text"
                      aria-label="Mobile"
                      className="w-full rounded-[var(--radius)] border-2 border-border bg-background px-4 py-3 outline-none focus:border-foreground"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-[var(--radius)] bg-primary py-4 font-bold tracking-wider text-primary-foreground uppercase"
                    >
                      Join the queue
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-[var(--radius)]">
            <img
              src={img("photo-1781455793310-8427c96454c7")}
              alt="Barbershop interior with a row of chairs"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[var(--radius)] bg-background px-3 py-2 text-sm font-semibold text-foreground">
              <MapPin className="size-4 text-primary" /> 54 Oldham St, Manchester M4 1LE
            </span>
          </div>
          <div className="rounded-[var(--radius)] bg-secondary p-6 text-secondary-foreground">
            <p className="flex items-center gap-2 font-display text-2xl uppercase">
              <Clock className="size-5" /> Hours
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-border pb-2">
                  <dt>{d}</dt>
                  <dd className="font-semibold">{h}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <Phone className="size-4" /> 0161 000 0000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
