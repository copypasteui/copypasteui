"use client";

export default function UndercroftFooter() {
  return (
    <footer className="border-t border-foreground bg-background font-sans text-foreground">
      <p
        aria-hidden
        className="overflow-hidden border-b border-foreground px-6 py-6 font-display text-[18vw] leading-[0.8] font-medium tracking-tight whitespace-nowrap"
      >
        Undercroft
      </p>
      <div className="grid gap-8 px-6 py-10 text-sm md:grid-cols-4">
        <p>
          14 Swinegate
          <br />
          Leeds LS1 4AG
        </p>
        <p>
          0113 496 0592
          <br />
          hello@undercroft.example
        </p>
        <nav aria-label="Footer">
          <ul className="space-y-1 uppercase">
            {["Listings", "Membership", "Hire", "Access"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p>
          © 2026 Undercroft Cinema CIC{" "}
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
