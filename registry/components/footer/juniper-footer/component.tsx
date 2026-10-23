"use client";

import { motion } from "motion/react";
import { AtSign, Mail } from "lucide-react";

const img = (id: string, w = 400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const grid = [
  "photo-1526835746352-0b9da4054862",
  "photo-1602255680702-c47261041a97",
  "photo-1710286148404-edd1aef18b82",
  "photo-1559734840-f9509ee5677f",
  "photo-1619896849560-f92c4330f1a6",
];

export default function JuniperFooter() {
  return (
    <footer className="bg-secondary font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="font-display text-5xl italic md:text-7xl">Juniper Hart</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="flex items-center gap-2">
              <AtSign className="size-4" /> juniper.hart
            </a>
            <a href="#" className="flex items-center gap-2">
              <Mail className="size-4" /> hello@juniperhart.example
            </a>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-5 gap-2">
          {grid.map((g, i) => (
            <motion.a
              key={g}
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden"
              aria-label="View on Instagram"
            >
              <img
                src={img(g)}
                alt=""
                className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
            </motion.a>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>Based in Falmouth, photographing across Cornwall &amp; Devon, and further for the right story.</p>
          <p>
            © 2026 Juniper Hart Photography{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
