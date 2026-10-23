"use client";

export default function LarderLaneFooter() {
  return (
    <footer className="bg-primary font-sans text-primary-foreground">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block h-10 w-full text-background md:h-14" aria-hidden>
        <path
          d="M0 0 H1200 V20 Q1150 60 1100 20 T1000 20 T900 20 T800 20 T700 20 T600 20 T500 20 T400 20 T300 20 T200 20 T100 20 T0 20 Z"
          fill="currentColor"
        />
      </svg>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-10 pb-12 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl">Larder Lane</p>
          <p className="mt-3 opacity-90">14 Larder Lane, Sheffield S11 8DA</p>
        </div>
        <div>
          <h2 className="font-display text-xl">Open</h2>
          <p className="mt-2 opacity-90">Tuesday to Saturday, from 7am until we sell out (usually around 1pm). Closed Sunday and Monday.</p>
        </div>
        <div>
          <h2 className="font-display text-xl">Wholesale</h2>
          <p className="mt-2 opacity-90">We bake for six cafés nearby. Ask Sam on 0114 496 0177 about a weekly order.</p>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-8 text-sm opacity-90">
        © 2027 Larder Lane Bakery. Our kitchen handles nuts, sesame and gluten.{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
