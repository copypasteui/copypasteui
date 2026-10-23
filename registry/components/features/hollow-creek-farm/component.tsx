"use client";

import { motion } from "motion/react";
import { Bird, Droplets, Sprout, Sun } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const values = [
  { icon: Sprout, title: "Regenerative soil", body: "No ploughing, cover crops all winter and 40% more organic matter than 2015." },
  { icon: Bird, title: "Truly free range", body: "Our 600 hens move to fresh grass every week in mobile coops." },
  { icon: Droplets, title: "No sprays", body: "Not certified organic; we just don’t use pesticides. Ladybirds do the work." },
  { icon: Sun, title: "Solar barn roof", body: "Powers the farm shop, the cold store and the café espresso machine." },
];

export default function HollowCreekFarm() {
  return (
    <section className="overflow-x-clip bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
          <div className="grid h-[480px] grid-cols-6 grid-rows-6 gap-3 md:h-[600px]">
            <motion.img
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={img("photo-1761839257475-4ca368dae6c3")}
              alt="Margaret and Jim holding freshly harvested garlic in the polytunnel"
              className="col-span-3 row-span-4 size-full rounded-[var(--radius)] object-cover"
            />
            <motion.img
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              src={img("photo-1548550023-2bdb3c5beed7", 600)}
              alt="A brown hen"
              className="col-span-3 col-start-4 row-span-3 size-full rounded-[var(--radius)] object-cover"
            />
            <motion.img
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              src={img("photo-1791395777778-bf511ee0cc94", 800)}
              alt="Children leaping across hay bales"
              className="col-span-3 col-start-4 row-span-3 row-start-4 size-full rounded-[var(--radius)] object-cover"
            />
            <div className="col-span-3 row-span-2 row-start-5 grid place-items-center rounded-[var(--radius)] bg-primary p-4 text-center text-primary-foreground">
              <span>
                <span className="block font-display text-5xl font-bold">74</span>
                <span className="text-sm">years of Hendersons</span>
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Our farm</p>
            <h2 className="mt-3 font-display text-5xl leading-tight font-bold">Three generations, 220 acres, one stubborn idea.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Grandad Jim bought Hollow Creek with a borrowed tractor in 1952. Today Margaret runs the veg, her son Tom the cattle, and the
              grandchildren run the egg honesty box with alarming efficiency.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {values.map((v, i) => (
                <motion.li
                  key={v.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-[var(--radius)] bg-card p-5 text-card-foreground"
                >
                  <v.icon className="size-6 text-primary" />
                  <p className="mt-3 font-display text-lg font-bold">{v.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
