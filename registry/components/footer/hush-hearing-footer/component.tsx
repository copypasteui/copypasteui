"use client";

import { Accessibility, Clock, MapPin } from "lucide-react";

export default function HushHearingFooter() {
  return (
    <footer className="bg-background px-6 py-16 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-card text-primary shadow-md">
              <MapPin className="size-5" aria-hidden />
            </span>
            <address className="not-italic">
              <p className="font-bold">Hush Hearing</p>
              <p className="text-muted-foreground">14 Church Street, Harrogate HG1 1RU</p>
              <p className="text-muted-foreground">01632 960 380</p>
            </address>
          </div>
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-card text-primary shadow-md">
              <Clock className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-bold">Opening hours</p>
              <p className="text-muted-foreground">Monday to Friday, 9am to 5:30pm</p>
              <p className="text-muted-foreground">Saturday, 9am to 1pm</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-card text-primary shadow-md">
              <Accessibility className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-bold">Getting in</p>
              <p className="text-muted-foreground">Step-free entrance on Church Mews. Hearing loop at reception and in both rooms.</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            © 2027 Hush Hearing Ltd. Audiologist Priya Nair is registered with the Health and Care Professions Council.{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <a href="#" className="font-semibold text-foreground underline-offset-4 hover:underline">
            Privacy and your hearing records
          </a>
        </div>
      </div>
    </footer>
  );
}
