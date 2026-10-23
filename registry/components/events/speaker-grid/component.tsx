"use client";

import { Mic } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const speakers = [
  {
    name: "Maya Okonkwo",
    role: "Owner, Rise Bakery (3 shops, 41 staff)",
    talk: "Opening a second site without breaking the first",
    photo: "photo-1679579664878-2c025e3f87b0",
    alt: "Woman speaking on stage with a microphone",
    keynote: true,
  },
  {
    name: "Lukas Brandt",
    role: "Head brewer, Kettle Yard",
    talk: "Pricing a pint when malt doubles",
    photo: "photo-1542229538-4d8784038379",
    alt: "Man holding a microphone",
  },
  {
    name: "Sana Iqbal",
    role: "Founder, Iqbal & Daughters opticians",
    talk: "What 900 Google reviews taught us",
    photo: "photo-1580894732444-8ecded7900cd",
    alt: "Smiling woman presenting at a whiteboard",
  },
  {
    name: "Chen Wei",
    role: "Accountant, Ledgerline",
    talk: "VAT, cash flow and the January cliff",
    photo: "photo-1559223694-98ed5e272fef",
    alt: "Man standing on stage",
  },
  {
    name: "Inés Duarte",
    role: "Co-owner, Tide Florist",
    talk: "Wedding season: say no to half of it",
    photo: "photo-1715610258704-e8f9f5710fe0",
    alt: "Woman holding a microphone in front of a crowd",
  },
  {
    name: "Rafael Costa",
    role: "Director, Costa Builders",
    talk: "Quoting jobs you'll still like in March",
    photo: "photo-1544531586-fde5298cdd40",
    alt: "Man speaking in front of a crowd",
  },
];

export default function SpeakerGrid() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b-2 border-foreground pb-6 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl">Speakers</h2>
          <p className="max-w-sm text-muted-foreground">
            Twenty-two owners and operators, no keynote from a software company. Talks are 20 minutes, then questions.
          </p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s) => (
            <article key={s.name} className={`group ${s.keynote ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
              <div
                className={`relative overflow-hidden rounded-[var(--radius)] bg-muted ${s.keynote ? "aspect-[4/3] lg:aspect-[3/4]" : "aspect-[16/10]"}`}
              >
                <img
                  src={img(s.photo)}
                  alt={s.alt}
                  loading="lazy"
                  className="size-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                {s.keynote && (
                  <span className="absolute top-3 left-3 bg-background px-2.5 py-1 text-xs font-bold tracking-wide text-foreground uppercase">
                    Opening talk
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.role}</p>
              <p className="mt-2 flex items-start gap-2 text-sm">
                <Mic className="mt-0.5 size-4 shrink-0 text-primary" /> {s.talk}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
