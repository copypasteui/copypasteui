"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const moments = [
  {
    time: "10:00",
    title: "The house is yours",
    body: "Get ready in the Bridal Suite and the Garden Room, with breakfast and fizz sent up.",
    photo: "photo-1494955870715-979ca4f13bf0",
    alt: "Bride holding a pink bouquet beside the groom",
  },
  {
    time: "14:00",
    title: "Ceremony in the Walled Garden",
    body: "Our registrar-licensed lawn, string trio optional, confetti very much encouraged.",
    photo: "photo-1769812344142-00c7f6584885",
    alt: "Rows of guests seated in a garden",
  },
  {
    time: "15:00",
    title: "Drinks on the lawn",
    body: "Canapés, lawn games and golden-hour portraits under the lime trees.",
    photo: "photo-1731515672817-0491d19c9f19",
    alt: "Newlyweds walking on the lawn at sunset",
  },
  {
    time: "17:30",
    title: "Wedding breakfast",
    body: "Three courses from our kitchen garden, served at long tables in the Glasshouse.",
    photo: "photo-1758810743028-6b8e150ec98f",
    alt: "Table set with flowers, glasses and linen napkins",
  },
  {
    time: "20:00",
    title: "First dance & party",
    body: "The Glasshouse becomes a dance floor. Pizza oven fired up at ten.",
    photo: "photo-1635341108990-9201f2f48625",
    alt: "Candlelit wedding table at night",
  },
  {
    time: "00:00",
    title: "Carriages",
    body: "Sparklers down the drive. Twelve bedrooms upstairs for whoever can’t bear to leave.",
    photo: "photo-1583939413139-19eeeb3a198c",
    alt: "Woodland ceremony with guests",
  },
];

export default function WrenhollowDay() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-primary uppercase">A Wrenhollow day</p>
          <h2 className="mt-5 font-display text-5xl font-medium md:text-6xl">
            From first coffee <em>to last dance</em>
          </h2>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2" />
          <motion.div style={{ height }} className="absolute top-0 left-4 w-px bg-primary md:left-1/2" />
          <ol className="space-y-14">
            {moments.map((m, i) => (
              <motion.li
                key={m.time}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`relative grid gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0`}
              >
                <span className="absolute top-2 left-4 size-3 -translate-x-1/2 rounded-full bg-primary ring-8 ring-background md:left-1/2" />
                <div className={i % 2 ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right"}>
                  <p className="font-display text-5xl text-primary italic">{m.time}</p>
                  <h3 className="mt-2 font-display text-3xl">{m.title}</h3>
                  <p className="mt-2 text-muted-foreground">{m.body}</p>
                </div>
                <div className={i % 2 ? "md:pr-4" : "md:pl-4"}>
                  <img
                    src={img(m.photo)}
                    alt={m.alt}
                    className="aspect-[3/2] w-full object-cover"
                    style={{ borderRadius: "var(--radius)" }}
                  />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
