"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CakeSlice, Check, Clock, MapPin } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sizes = [
  { id: "6", label: '6"', serves: "Serves 8–10", price: 38 },
  { id: "8", label: '8"', serves: "Serves 14–16", price: 52 },
  { id: "10", label: '10"', serves: "Serves 22–25", price: 74 },
];
const flavours = ["Vanilla & raspberry", "Chocolate fudge", "Lemon & elderflower", "Carrot & walnut", "Biscoff", "Vegan chocolate"];

export default function CrumbOrders() {
  const [size, setSize] = useState("8");
  const [flavour, setFlavour] = useState(flavours[0]!);
  const [sent, setSent] = useState(false);
  const s = sizes.find((x) => x.id === size)!;

  return (
    <section id="order" className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <CakeSlice className="size-10" />
          <h2 className="mt-6 font-display text-5xl leading-[1] md:text-6xl">Celebration cakes, made to order.</h2>
          <p className="mt-5 max-w-md text-lg opacity-90">
            Birthdays, weddings, “just because”. Order at least 72 hours ahead and we’ll call to talk through decoration and dietary needs.
          </p>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[var(--radius)]">
            <img
              src={img("photo-1597528662465-55ece5734101")}
              alt="Pastries, chocolate and baking tools on a marble counter"
              className="size-full object-cover"
            />
          </div>
          <ul className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0" />
              <span>
                22 Mill Lane, Bristol BS3 4LJ
                <br />
                Pickup from the side hatch
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0" />
              <span>
                Tue–Fri 7–4 · Sat 7–2
                <br />
                Sun 8–1 · Closed Mon
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-[calc(var(--radius)*1.5)] bg-card p-6 text-card-foreground shadow-2xl md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="py-14 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-foreground"
                >
                  <Check className="size-8" />
                </motion.div>
                <p className="mt-6 font-display text-3xl">Request received!</p>
                <p className="mt-2 text-muted-foreground">
                  {s.label} {flavour.toLowerCase()}. We’ll call within one working day to confirm.
                </p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-semibold underline underline-offset-4">
                  Order another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-7"
              >
                <fieldset>
                  <legend className="font-semibold">Size</legend>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {sizes.map((x) => (
                      <button
                        key={x.id}
                        type="button"
                        aria-pressed={size === x.id}
                        onClick={() => setSize(x.id)}
                        className={`rounded-[var(--radius)] border-2 p-3 text-left transition ${size === x.id ? "border-primary bg-secondary" : "border-border hover:border-foreground"}`}
                      >
                        <span className="block font-display text-2xl">{x.label}</span>
                        <span className="block text-xs text-muted-foreground">{x.serves}</span>
                        <span className="mt-1 block text-sm font-semibold">from £{x.price}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="font-semibold">Flavour</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {flavours.map((f) => (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={flavour === f}
                        onClick={() => setFlavour(f)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${flavour === f ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Pickup date
                    <input
                      required
                      type="date"
                      className="mt-1.5 w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 font-normal outline-none focus:border-ring"
                    />
                  </label>
                  <label className="text-sm font-semibold">
                    Message on cake
                    <input
                      placeholder="Happy 30th, Jo!"
                      className="mt-1.5 w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 font-normal outline-none focus:border-ring"
                    />
                  </label>
                  <label className="text-sm font-semibold">
                    Name
                    <input
                      required
                      className="mt-1.5 w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 font-normal outline-none focus:border-ring"
                    />
                  </label>
                  <label className="text-sm font-semibold">
                    Phone
                    <input
                      required
                      type="tel"
                      className="mt-1.5 w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 font-normal outline-none focus:border-ring"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-between rounded-full bg-primary py-2 pr-2 pl-6 font-semibold text-primary-foreground"
                >
                  Request this cake
                  <span className="rounded-full bg-primary-foreground px-4 py-2 text-sm text-primary">from £{s.price}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
