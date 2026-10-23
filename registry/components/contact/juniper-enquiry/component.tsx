"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const kinds = ["Portrait", "Family", "Couple", "Day in the life"];

export default function JuniperEnquiry() {
  const [kind, setKind] = useState("Family");
  const [sent, setSent] = useState(false);

  return (
    <section id="enquire" className="bg-background font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative hidden min-h-[640px] lg:block">
          <img
            src={img("photo-1541516160071-4bb0c5af65ba")}
            alt="Juniper holding her camera up to her eye among trees"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="px-6 py-20 md:px-14">
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">Say hello</p>
          <h2 className="mt-4 font-display text-6xl leading-none">
            Let’s make <em className="text-primary">something</em> you’ll keep.
          </h2>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                className="mt-14"
              >
                <p className="font-display text-4xl italic">Thank you. I’ll be in touch within two days.</p>
                <p className="mt-3 text-muted-foreground">In the meantime, have a think about a place that feels like you.</p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-12 space-y-8"
              >
                <fieldset>
                  <legend className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Session</legend>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {kinds.map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setKind(k)}
                        aria-pressed={kind === k}
                        className={`font-display text-2xl transition ${kind === k ? "text-foreground italic underline decoration-accent decoration-2 underline-offset-8" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </fieldset>
                {[
                  ["Your name", "text"],
                  ["Email", "email"],
                  ["Rough date or season", "text"],
                  ["Where would you like to be photographed?", "text"],
                ].map(([l, t]) => (
                  <label key={l} className="block">
                    <span className="text-xs tracking-[0.25em] text-muted-foreground uppercase">{l}</span>
                    <input
                      required={l !== "Where would you like to be photographed?"}
                      type={t}
                      className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none focus:border-foreground"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Tell me about you</span>
                  <textarea
                    rows={3}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none focus:border-foreground"
                  />
                </label>
                <button type="submit" className="bg-primary px-10 py-4 text-sm tracking-[0.25em] text-primary-foreground uppercase">
                  Send enquiry
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
