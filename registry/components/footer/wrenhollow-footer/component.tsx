"use client";

import { motion } from "motion/react";
import { AtSign, MapPin, Phone } from "lucide-react";

const img = (id: string, w = 500) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const strip = [
  "photo-1758810743028-6b8e150ec98f",
  "photo-1769812344337-ec16a1b7cef8",
  "photo-1494955870715-979ca4f13bf0",
  "photo-1663185776079-33231c5242eb",
  "photo-1758810744028-689670b0877c",
  "photo-1759954644836-a57275881ded",
];

export default function WrenhollowFooter() {
  return (
    <footer className="bg-secondary font-sans text-secondary-foreground">
      <div className="grid grid-cols-3 md:grid-cols-6">
        {strip.map((p, i) => (
          <motion.a
            key={p}
            href="#"
            whileHover={{ opacity: 0.8 }}
            className="block aspect-square overflow-hidden"
            aria-label="View on Instagram"
          >
            <motion.img
              initial={{ scale: 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.8 }}
              src={img(p)}
              alt=""
              className="size-full object-cover"
            />
          </motion.a>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="font-display text-5xl font-semibold">Wrenhollow</p>
        <p className="mt-1 text-[10px] font-semibold tracking-[0.5em] text-muted-foreground uppercase">House &amp; Gardens</p>
        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold tracking-[0.2em] uppercase">
          {["Weddings", "Spaces", "Pricing", "Suppliers", "Stay", "Open days", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4" /> Wrenhollow, near Stow-on-the-Wold GL54
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="size-4" /> 01451 000 000
          </span>
          <span className="inline-flex items-center gap-2">
            <AtSign className="size-4" /> wrenhollowhouse
          </span>
        </div>
        <p className="mt-12 border-t border-foreground/15 pt-6 text-xs text-muted-foreground">
          © 2026 Wrenhollow House Ltd · Next open day: Sunday 16 November, 11–3{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
      </div>
    </footer>
  );
}
