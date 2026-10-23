"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Phone, Plus } from "lucide-react";

const img = (id: string, w = 200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const faqs = [
  {
    q: "How fit do I need to be?",
    a: "Each trip has a difficulty rating from Easy to Tough. Easy means 3–4 hours of walking on good paths; Tough means 7+ hours with steep ascents. If you can walk for a few hours at home and enjoy it, our Moderate trips will suit you.",
  },
  {
    q: "Can I travel on my own?",
    a: "About 60% of our travellers come solo. Rooms are shared with a traveller of the same gender at no extra cost, or you can book a private room for a single supplement.",
  },
  {
    q: "What’s included in the price?",
    a: "All accommodation, a qualified local guide, luggage transfers, most meals (listed on each itinerary) and all transport during the trip. Flights are not included, but we’re happy to suggest the best ones.",
  },
  {
    q: "What if the trip doesn’t run?",
    a: "Every 2027 departure is guaranteed from four travellers. If we ever have to cancel, you get a full refund within seven days, and your money is ATOL protected.",
  },
  {
    q: "Can you organise a private trip?",
    a: "Yes, for families, friends or clubs from four people. Any trip, your dates, and we can adapt the pace.",
  },
];

export default function FarstepFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="font-display text-5xl font-black tracking-tight">Good questions</h2>
          <ul className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="overflow-hidden rounded-[var(--radius)] bg-card text-card-foreground">
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-bold"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: on ? 45 : 0 }}
                      className={`grid size-8 shrink-0 place-items-center rounded-full ${on ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                        <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="self-start rounded-[calc(var(--radius)*1.5)] bg-primary p-8 text-primary-foreground lg:sticky lg:top-8">
          <div className="flex -space-x-3">
            {["photo-1758691737646-79dbce8e25fb", "photo-1570840934347-4dc56c98b8ef", "photo-1758599543111-36ce5c34fceb"].map((p) => (
              <img key={p} src={img(p)} alt="" className="size-14 rounded-full border-4 border-primary object-cover" />
            ))}
          </div>
          <p className="mt-6 font-display text-3xl leading-tight font-black">Talk to someone who’s been.</p>
          <p className="mt-3 opacity-90">Our trip planners have walked every route we sell. Call, chat or book a 15-minute video call.</p>
          <div className="mt-8 space-y-3">
            <a
              href="tel:+442000000000"
              className="flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent py-3.5 font-bold text-accent-foreground"
            >
              <Phone className="size-4" /> 020 0000 0000
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 rounded-[var(--radius)] border border-primary-foreground/40 py-3.5 font-bold hover:bg-primary-foreground/10"
            >
              <MessageCircle className="size-4" /> Start a chat
            </a>
          </div>
          <p className="mt-4 text-center text-xs opacity-90">Mon–Fri 9–6 · Sat 10–2 (UK time)</p>
        </aside>
      </div>
    </section>
  );
}
