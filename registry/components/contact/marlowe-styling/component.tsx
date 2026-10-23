"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, MapPin } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sessions = [
  { id: "edit", name: "Wardrobe edit", time: "60 min", price: "Free", note: "Bring three things you love and three you never wear." },
  {
    id: "occasion",
    name: "Occasion styling",
    time: "90 min",
    price: "£45",
    note: "Weddings, interviews, black tie. Redeemable against purchases.",
  },
  {
    id: "capsule",
    name: "Capsule build",
    time: "2 hrs",
    price: "£95",
    note: "A season’s wardrobe from twelve pieces, with a printed lookbook.",
  },
];
const slots = ["Thu 10:00", "Thu 14:30", "Fri 11:00", "Sat 09:30", "Sat 13:00", "Sun 12:00"];

export default function MarloweStyling() {
  const [session, setSession] = useState("occasion");
  const [slot, setSlot] = useState(slots[3]);
  const [done, setDone] = useState(false);
  const s = sessions.find((x) => x.id === session)!;

  return (
    <section id="styling" className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <img
            src={img("photo-1777307224241-e0aa9dbea6f8")}
            alt="Rail of black and ivory pieces in the fitting room"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="size-4" /> 41 Western Road, Hove
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <Clock className="size-4" /> Mon–Sat 10–6 · Sun 11–4
            </p>
          </div>
        </div>
        <div className="px-6 py-16 md:px-14">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase opacity-90">Personal styling</p>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">
            An hour with <em className="text-primary">us</em>, the fitting room to yourself.
          </h2>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 border border-primary-foreground/30 p-8"
              >
                <Check className="size-8" />
                <p className="mt-4 font-display text-3xl">
                  Booked: {s.name}, {slot}.
                </p>
                <p className="mt-2 opacity-90">We’ll text the day before. There’ll be coffee.</p>
                <button type="button" onClick={() => setDone(false)} className="mt-6 text-sm underline underline-offset-4">
                  Change
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="mt-10 space-y-8"
              >
                <div className="space-y-2">
                  {sessions.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => setSession(x.id)}
                      aria-pressed={session === x.id}
                      className={`flex w-full items-start justify-between gap-4 border p-4 text-left transition ${session === x.id ? "border-primary-foreground bg-primary-foreground text-primary" : "border-primary-foreground/25 hover:border-primary-foreground/60"}`}
                    >
                      <span>
                        <span className="block font-semibold">
                          {x.name} <span className="font-normal opacity-90">· {x.time}</span>
                        </span>
                        <span className="mt-0.5 block text-sm opacity-90">{x.note}</span>
                      </span>
                      <span className="font-display text-xl">{x.price}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSlot(t)}
                      aria-pressed={slot === t}
                      className={`border py-2.5 text-sm transition ${slot === t ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/25 hover:border-primary-foreground/60"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Name"
                    aria-label="Name"
                    className="border-b border-primary-foreground/40 bg-transparent py-3 outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile"
                    aria-label="Mobile"
                    className="border-b border-primary-foreground/40 bg-transparent py-3 outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-foreground py-4 text-sm font-semibold tracking-[0.2em] text-primary uppercase"
                >
                  Book {s.name.toLowerCase()} · {slot}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
