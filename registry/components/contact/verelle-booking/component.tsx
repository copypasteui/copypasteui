"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Clock, MapPin } from "lucide-react";

const img = (id: string, w = 160) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const services = [
  { name: "Cut & finish", time: "60 min", price: 58 },
  { name: "Balayage", time: "3 hrs", price: 174 },
  { name: "Root colour", time: "90 min", price: 74 },
  { name: "Blow-dry", time: "45 min", price: 41 },
];
const stylists = [
  { name: "Anyone available", photo: "" },
  { name: "Céline", photo: "photo-1594756154841-ac5d160dbf46" },
  { name: "Jade", photo: "photo-1662850886700-4ec19bd30d11" },
  { name: "Tom", photo: "photo-1568602471122-7832951cc4c5" },
];
const times = ["9:30", "10:45", "12:00", "14:15", "15:30", "17:00", "18:30"];
const steps = ["Service", "Stylist", "Time"];

export default function VerelleBooking() {
  const [step, setStep] = useState(0);
  const [svc, setSvc] = useState<number | null>(null);
  const [who, setWho] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const done = time !== null;

  return (
    <section id="book" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-6 text-card-foreground md:p-10">
          <div className="flex items-center gap-3">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition ${i < step || done ? "bg-primary text-primary-foreground" : i === step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {i < step || done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="text-sm font-semibold">{s}</span>
                {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>

          <div className="mt-8 min-h-[300px]">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <p className="font-display text-5xl">You’re booked.</p>
                  <p className="mt-3 text-muted-foreground">
                    {services[svc!]!.name} with{" "}
                    {stylists[who!]!.name === "Anyone available" ? "our next free stylist" : stylists[who!]!.name}, Thursday at {time}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setSvc(null);
                      setWho(null);
                      setTime(null);
                    }}
                    className="mt-6 text-sm font-semibold underline underline-offset-4"
                  >
                    Book another
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="size-4" /> Back
                    </button>
                  )}
                  {step === 0 && (
                    <ul className="space-y-2">
                      {services.map((s, i) => (
                        <li key={s.name}>
                          <button
                            type="button"
                            onClick={() => {
                              setSvc(i);
                              setStep(1);
                            }}
                            className="flex w-full items-center justify-between rounded-[var(--radius)] border border-border p-4 text-left transition hover:border-foreground"
                          >
                            <span>
                              <span className="block font-semibold">{s.name}</span>
                              <span className="text-sm text-muted-foreground">{s.time}</span>
                            </span>
                            <span className="text-xl font-light">£{s.price}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {step === 1 && (
                    <div className="grid grid-cols-2 gap-3">
                      {stylists.map((s, i) => (
                        <button
                          key={s.name}
                          type="button"
                          onClick={() => {
                            setWho(i);
                            setStep(2);
                          }}
                          className="flex flex-col items-center gap-3 rounded-[var(--radius)] border border-border p-5 transition hover:border-foreground"
                        >
                          {s.photo ? (
                            <img src={img(s.photo)} alt="" className="size-16 rounded-full object-cover" />
                          ) : (
                            <span className="grid size-16 place-items-center rounded-full bg-secondary font-display text-2xl text-secondary-foreground">
                              ✶
                            </span>
                          )}
                          <span className="font-semibold">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <p className="font-semibold">Thursday 23 October</p>
                      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className="rounded-full border border-border py-3 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <div>
            <h2 className="font-display text-6xl leading-none">Book in three taps.</h2>
            <p className="mt-4 text-muted-foreground">
              No account needed. We’ll text a reminder 24 hours before, and you can move your appointment up to 24 hours ahead for free.
            </p>
          </div>
          <ul className="space-y-4 rounded-[var(--radius)] bg-secondary p-6 text-secondary-foreground">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0" /> 12 Princess Victoria St, Clifton, Bristol
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0" /> Tue–Wed 9–6 · Thu–Fri 9–8 · Sat 8:30–5
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
