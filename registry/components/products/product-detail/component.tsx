"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, ChevronDown, Leaf, ShieldCheck, Truck } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sizes = ["XS", "S", "M", "L", "XL"];
const soldOut = ["XS"];
const colors = [
  {
    name: "Tobacco",
    swatch: "rgb(122 86 58)",
    photo: "photo-1607160199580-1b0c9b736b66",
    alt: "Brown crew-neck top laid flat on a white table",
  },
  { name: "Chalk", swatch: "rgb(240 238 232)", photo: "photo-1620799140408-edc6dcb6d633", alt: "White crew-neck long-sleeve top" },
  { name: "Black", swatch: "rgb(24 24 24)", photo: "photo-1589884047253-28d52f2891e7", alt: "Black crew-neck top" },
];
const extra = [
  { name: "On the rail", photo: "photo-1699275303942-47957eea44b1", alt: "A row of sweatshirts in different colours hanging on a rail" },
];
const details = [
  {
    q: "Materials & care",
    a: "100% organic cotton loopback, 380 gsm, knitted in Portugal. Wash cold, dry flat. It softens over the first five washes.",
  },
  { q: "Fit", a: "Boxy through the body with a dropped shoulder. Sami is 183 cm and wears M; size down for a closer fit." },
  { q: "Delivery & returns", a: "Free UK delivery over £50, usually two working days. Returns are free for 60 days if it's unworn." },
];

export default function ProductDetail() {
  const [color, setColor] = useState(colors[0]!);
  const [shown, setShown] = useState<{ photo: string; alt: string }>(colors[0]!);
  const gallery = [color, ...extra];
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>(details[0]!.q);
  const [added, setAdded] = useState(false);

  return (
    <section className="bg-background px-6 py-16 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
          <div className="order-2 grid grid-cols-5 gap-3 sm:order-1 sm:flex sm:flex-col">
            {gallery.map((g) => (
              <button
                key={g.photo}
                type="button"
                onClick={() => setShown(g)}
                aria-label={`Show ${g.alt}`}
                className={`relative aspect-square w-full overflow-hidden rounded-md bg-muted ring-offset-2 ring-offset-background sm:w-20 ${shown.photo === g.photo ? "ring-2 ring-foreground" : ""}`}
              >
                <img src={img(g.photo, 200)} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-lg bg-muted sm:order-2">
            <AnimatePresence mode="wait">
              <motion.img
                key={shown.photo}
                src={img(shown.photo)}
                alt={shown.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:pt-6">
          <p className="text-sm text-muted-foreground">Essentials / Sweatshirts</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Heavyweight Crew</h1>
          <p className="mt-3 font-display text-2xl font-bold">£88</p>
          <p className="mt-5 text-muted-foreground">
            Heavy loopback cotton that holds its shape. We’ve made this one since 2019 and changed only the neck rib.
          </p>

          <div className="mt-7">
            <p className="text-sm font-medium">Colour: {color.name}</p>
            <div className="mt-2 flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  onClick={() => {
                    setColor(c);
                    setShown(c);
                  }}
                  style={{ background: c.swatch }}
                  className={`size-9 rounded-full border border-border ${c.name === color.name ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm">
              <p className="font-medium">Size</p>
              <a href="#" className="text-muted-foreground underline underline-offset-4">
                Size guide
              </a>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {sizes.map((s) => {
                const out = soldOut.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={out}
                    onClick={() => setSize(s)}
                    className={`rounded-md border py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:text-muted-foreground disabled:line-through ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-12 place-items-center"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
              <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="grid size-12 place-items-center">
                <Plus className="size-4" />
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setAdded(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground"
            >
              <ShoppingBag className="size-5" /> {added ? `Added ${qty} × ${size}` : `Add to bag · £${88 * qty}`}
            </motion.button>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            {[
              { icon: Truck, t: "Free UK delivery £50+" },
              { icon: ShieldCheck, t: "Free repairs, for life" },
              { icon: Leaf, t: "Organic cotton" },
            ].map((b) => (
              <li key={b.t} className="rounded-md bg-muted px-2 py-3">
                <b.icon className="mx-auto mb-1 size-4 text-foreground" />
                {b.t}
              </li>
            ))}
          </ul>

          <div className="mt-6 divide-y divide-border border-y border-border">
            {details.map((d) => (
              <div key={d.q}>
                <button
                  type="button"
                  onClick={() => setOpen(open === d.q ? null : d.q)}
                  className="flex w-full items-center justify-between py-4 text-left font-medium"
                >
                  {d.q}
                  <ChevronDown className={`size-4 transition-transform ${open === d.q ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === d.q && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-4 text-sm text-muted-foreground"
                    >
                      {d.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
