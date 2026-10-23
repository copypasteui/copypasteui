"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";

const HOURS = [
  ["Mon to Thu", "10am to 9pm"],
  ["Fri, Sat", "8am to 10pm"],
  ["Sun", "9am to 6pm"],
];

export default function HarbourFloatFooter() {
  return (
    <footer className="bg-background px-6 pt-16 pb-10 font-sans text-foreground">
      <div className="mx-auto max-w-6xl rounded-[var(--radius)] border border-border bg-card p-8 text-card-foreground shadow-xl md:p-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-8">
          <p className="text-2xl font-bold">Harbour Float &amp; Sauna</p>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Clock className="size-4" aria-hidden /> Next free float today at 4:30pm
          </p>
        </div>
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <address className="space-y-3 not-italic">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> The Old Net Loft, Harbour Wall, Penzance TR18 4AF
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> 01632 960 210
            </p>
            <p className="flex gap-2">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> hello@harbourfloat.example
            </p>
          </address>
          <dl className="space-y-2">
            {HOURS.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
          <ul className="space-y-2 font-semibold">
            {["Book a float", "Sauna times", "Gift vouchers", "First-visit guide", "Accessibility"].map((l) => (
              <li key={l}>
                <a href="#" className="underline-offset-4 hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          © 2027 Harbour Float Ltd. Floating isn&rsquo;t advised in the first trimester of pregnancy; ask us first.{" "}
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
