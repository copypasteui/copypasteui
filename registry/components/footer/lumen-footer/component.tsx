"use client";

const cols = [
  { t: "Product", l: ["Ask", "Alerts", "Reports", "SQL editor", "Changelog"] },
  { t: "Company", l: ["About", "Customers", "Careers", "Press"] },
  { t: "Resources", l: ["Docs", "API", "Security", "Status"] },
];

export default function LumenFooter() {
  return (
    <footer className="bg-background px-6 pt-16 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-border pt-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-foreground">◐</span>{" "}
            Lumen
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Answers from your data in seconds. Built in Berlin and Lisbon.</p>
          <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            All systems operational
          </a>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <p className="text-sm font-medium">{c.t}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="hover:text-foreground">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} Lumen Analytics GmbH{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <p>Privacy · Terms · DPA · Cookie settings</p>
      </div>
      <p
        aria-hidden
        className="mx-auto max-w-6xl text-center font-display text-[20vw] leading-[0.8] font-semibold tracking-[-0.06em] text-foreground/10 select-none"
      >
        lumen
      </p>
    </footer>
  );
}
