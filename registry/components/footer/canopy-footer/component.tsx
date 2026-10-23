"use client";

import { motion } from "motion/react";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";

const img = (id: string, w = 2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function CanopyFooter() {
  return (
    <footer className="font-sans">
      <div className="relative isolate overflow-hidden px-6 py-28 text-center text-white">
        <img src={img("photo-1636484807469-e33af13716b7")} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl font-display text-5xl leading-tight md:text-6xl"
        >
          The forest is waiting.
        </motion.p>
        <p className="mx-auto mt-4 max-w-md text-white/85">Rates from $220 a night, breakfast and airport transfer included.</p>
        <a
          href="#stay"
          className="mt-8 inline-block bg-white px-8 py-4 font-semibold text-black hover:bg-white/90"
          style={{ borderRadius: "var(--radius)" }}
        >
          Check availability
        </a>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">CANOPY</p>
            <p className="mt-4 text-sm opacity-90">
              An eco-retreat in the Ubud highlands. Member of Small Luxury Lodges and certified B Corp.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="size-4 shrink-0" /> Jl. Raya Sayan, Ubud, Bali 80571
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0" /> +62 361 000 000
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 shrink-0" /> stay@canopy.example
            </li>
          </ul>
          <ul className="space-y-3 text-sm">
            {["Villas", "Experiences", "Spa & wellness", "Weddings", "Gift a stay"].map((l) => (
              <li key={l}>
                <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <p className="text-sm font-semibold">Letters from the forest</p>
            <p className="mt-1 text-sm opacity-90">Four emails a year. Offers first.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex border-b border-primary-foreground/50">
              <input
                type="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-primary-foreground/90"
              />
              <button type="submit" className="text-sm font-semibold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t border-primary-foreground/20 px-6 py-6 text-xs opacity-90">
          <p>
            © 2026 Canopy Retreats{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <a href="#" className="inline-flex items-center gap-1.5">
            <AtSign className="size-3.5" /> canopyretreats
          </a>
        </div>
      </div>
    </footer>
  );
}
