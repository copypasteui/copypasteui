"use client";

import { ArrowUpRight } from "lucide-react";

const links = ["Work", "About", "Journal", "Contact"];
const socials = ["Instagram", "Dribbble", "LinkedIn", "Read.cv"];

export default function MinimalFooter() {
  return (
    <footer className="bg-background px-6 font-sans text-foreground">
      <div className="mx-auto max-w-6xl border-t border-border py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-3xl font-bold tracking-tight md:text-5xl">Have an idea?</p>
            <a
              href="mailto:hello@example.com"
              className="group mt-2 inline-flex items-center gap-2 font-display text-3xl font-bold tracking-tight text-primary md:text-5xl"
            >
              hello@example.com
              <ArrowUpRight className="size-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:size-10" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm">
            <p className="mb-1 font-semibold text-muted-foreground">Pages</p>
            <p className="mb-1 font-semibold text-muted-foreground">Elsewhere</p>
            {links.map((l, i) => (
              <span key={l} className="contents">
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
                <a href="#" className="hover:text-primary">
                  {socials[i]} ↗
                </a>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Ana Lindqvist. All rights reserved.{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <p>Designed and built in Stockholm</p>
        </div>
      </div>
    </footer>
  );
}
