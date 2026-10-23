"use client";

import { AtSign, MapPin } from "lucide-react";

const HOURS = [
  ["Tue, Wed, Fri", "10am to 6pm"],
  ["Thursday", "10am to 9pm (grown-ups from 6)"],
  ["Sat, Sun", "9:30am to 6pm"],
  ["Monday", "Closed, kiln day"],
];

export default function GlazeDaysFooter() {
  return (
    <footer className="bg-background px-6 pt-10 pb-10 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="rounded-[calc(var(--radius)*1.4)] bg-primary p-8 text-primary-foreground shadow-xl">
          <p className="font-display text-3xl font-semibold">Glaze Days</p>
          <p className="mt-3 max-w-xs">Paint-your-own pottery and coffee for all ages, since 2016.</p>
          <p className="mt-6 flex items-start gap-2">
            <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden /> 82 Gloucester Road, Bristol BS7 8BN
          </p>
        </div>
        <div className="rounded-[calc(var(--radius)*1.4)] bg-card p-8 text-card-foreground shadow-xl">
          <h2 className="font-display text-xl font-semibold">Opening hours</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {HOURS.map(([d, h]) => (
              <div key={d}>
                <dt className="font-semibold">{d}</dt>
                <dd className="text-muted-foreground">{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-[calc(var(--radius)*1.4)] bg-accent p-8 text-accent-foreground shadow-xl">
          <h2 className="font-display text-xl font-semibold">Say hello</h2>
          <p className="mt-4">0117 496 0192</p>
          <p className="mt-1">hello@glazedays.example</p>
          <p className="mt-4 flex items-center gap-2 font-semibold">
            <AtSign className="size-5" aria-hidden /> glazedaysbristol
          </p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-sm text-muted-foreground">
        © 2027 Glaze Days. All glazes are lead-free and food-safe once fired.{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
