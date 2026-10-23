"use client";

const cols = [
  { t: "Product", l: ["Canvas", "Prototyping", "Dev mode", "Plugins", "What’s new"] },
  { t: "Resources", l: ["Templates", "Community", "Tutorials", "Design systems"] },
  { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
];

export default function PrismFooter() {
  return (
    <footer className="overflow-hidden bg-background px-6 pt-16 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-border pt-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="size-6 rotate-45 rounded-md bg-[conic-gradient(var(--primary),var(--accent),var(--secondary),var(--primary))]" />{" "}
            Prism
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">The multiplayer canvas for design teams.</p>
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
      <p
        aria-hidden
        className="mt-12 text-center font-display text-[24vw] leading-[0.8] font-bold tracking-[-0.06em] text-primary select-none"
      >
        prism
      </p>
      <p className="mx-auto max-w-6xl py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Prism Studio Inc.{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
