"use client";

export default function PoggioLentoFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 text-center md:grid-cols-3 md:text-left">
        <div>
          <p className="font-display text-3xl">Poggio Lento</p>
          <p className="mt-3 text-sm text-muted-foreground">Agriturismo and winery since 1987</p>
        </div>
        <address className="text-sm leading-relaxed text-muted-foreground not-italic">
          Podere Poggio Lento, Località Sant&rsquo;Angelo
          <br />
          53024 Montalcino (SI), Italy
          <br />
          +39 0577 000 000 · stay@poggiolento.example
        </address>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Two hours from Florence airport and two and a half from Pisa. The last 3 km is a white road: fine for any car, slowly.
        </p>
      </div>
      <p className="mx-auto mt-14 max-w-6xl text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">
        © 2027 Azienda Agricola Poggio Lento{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
