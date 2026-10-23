"use client";

import { Leaf, Recycle, Rabbit, Truck } from "lucide-react";

const promises = [
  { icon: Leaf, t: "98% natural origin" },
  { icon: Rabbit, t: "Vegan & cruelty-free" },
  { icon: Recycle, t: "Refillable glass" },
  { icon: Truck, t: "Carbon-neutral delivery" },
];

export default function FloreaFooter() {
  return (
    <footer className="bg-secondary font-sans text-secondary-foreground">
      <div className="border-b border-foreground/10">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {promises.map((p) => (
            <li key={p.t} className="flex items-center gap-3 text-sm">
              <p.icon className="size-5 text-primary" /> {p.t}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl italic">Join the garden</p>
          <p className="mt-2 text-sm text-muted-foreground">10% off your first order, plus early access to seasonal blooms.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm rounded-full bg-background p-1.5">
            <input
              type="email"
              required
              placeholder="Email address"
              aria-label="Email"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
              Subscribe
            </button>
          </form>
        </div>
        {[
          { t: "Shop", l: ["Serums", "Cleansers", "Moisturisers", "Sets", "Refills"] },
          { t: "Help", l: ["Shipping", "Returns", "Skin quiz", "Contact"] },
          { t: "Florea", l: ["Our story", "Ingredients", "Journal", "Stockists"] },
        ].map((c) => (
          <div key={c.t}>
            <p className="text-sm font-medium">{c.t}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="hover:text-foreground">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center font-display text-[22vw] leading-[0.8] font-medium text-primary italic select-none">Florea</p>
      <p className="py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Florea Botanicals · Made in Porto{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
