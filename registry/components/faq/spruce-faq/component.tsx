"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, RefreshCcw } from "lucide-react";

const faqs = [
  {
    q: "Do I need to be home?",
    a: "No. Most customers leave a key with us or use a key safe. Keys are coded, never labelled with your address, and stored in a locked safe.",
  },
  {
    q: "Do you bring your own products?",
    a: "Yes, eco-certified products and microfibre cloths are included. If you’d prefer we use yours, just say. We ask you to provide a working vacuum.",
  },
  {
    q: "What if my cleaner is ill or on holiday?",
    a: "We’ll offer a cover cleaner who has read your notes, or you can skip that week free of charge. Your call.",
  },
  { q: "Can I change my day or skip a week?", a: "Any time, from your account, up to 24 hours before the visit." },
  {
    q: "Are you insured?",
    a: "Yes: £5m public liability and accidental damage cover. Breakages are rare, but if it happens, we replace it.",
  },
];

export default function SpruceFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="font-display text-5xl font-semibold">Questions, answered</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className={`overflow-hidden rounded-[var(--radius)] border-2 transition-colors ${open === i ? "border-primary bg-card text-card-foreground" : "border-border"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
                >
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                    <ChevronDown className="size-5 text-primary" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                      <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        <aside className="self-start rounded-[calc(var(--radius)*1.2)] bg-accent p-8 text-accent-foreground lg:sticky lg:top-8">
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="inline-block">
            <RefreshCcw className="size-10" />
          </motion.span>
          <p className="mt-5 font-display text-3xl leading-tight font-semibold">The Spruce re-clean promise</p>
          <p className="mt-3">Missed a spot? Tell us within 24 hours and we’ll come back and re-clean it, free. No forms, no arguing.</p>
          <a href="#prices" className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 font-semibold text-background">
            Book your first clean
          </a>
        </aside>
      </div>
    </section>
  );
}
