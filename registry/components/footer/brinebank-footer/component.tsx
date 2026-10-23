"use client";

export default function BrinebankFooter() {
  return (
    <footer className="bg-background px-6 pt-16 pb-10 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="border-y-4 border-double border-foreground py-3 text-center font-display text-4xl">Brinebank Kitchen</p>
        <div className="mt-8 grid gap-8 text-sm sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border">
          <div>
            <h2 className="font-semibold tracking-[0.15em] uppercase">Find us</h2>
            <p className="mt-2 text-muted-foreground">3 Harbour Street, Whitstable CT5 1AH. Two minutes from the harbour car park.</p>
          </div>
          <div className="md:pl-8">
            <h2 className="font-semibold tracking-[0.15em] uppercase">Open</h2>
            <p className="mt-2 text-muted-foreground">
              Wednesday to Sunday
              <br />
              Lunch 12 to 3, dinner 6 to 10
            </p>
          </div>
          <div className="md:pl-8">
            <h2 className="font-semibold tracking-[0.15em] uppercase">Allergies</h2>
            <p className="mt-2 text-muted-foreground">
              Everything here has been near shellfish. Tell us when you book and we&rsquo;ll talk you through the board.
            </p>
          </div>
          <div className="md:pl-8">
            <h2 className="font-semibold tracking-[0.15em] uppercase">Contact</h2>
            <p className="mt-2 text-muted-foreground">
              01632 960 604
              <br />
              table@brinebank.example
            </p>
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-4 text-xs text-muted-foreground">
          © 2027 Brinebank Kitchen Ltd. A discretionary 12.5% service charge is added to tables of five or more and goes to the whole team.{" "}
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
