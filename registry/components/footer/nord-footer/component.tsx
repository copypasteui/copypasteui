"use client";

import { useEffect, useState } from "react";

function useClock(timeZone: string) {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date()));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return t;
}

export default function NordFooter() {
  const oslo = useClock("Europe/Oslo");
  const cph = useClock("Europe/Copenhagen");

  return (
    <footer className="bg-background px-6 pt-16 font-sans text-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-10 border-t border-foreground pt-8 text-sm md:grid-cols-4">
        {[
          { city: "Oslo", time: oslo, addr: ["Tollbugata 24", "0157 Oslo"] },
          { city: "Copenhagen", time: cph, addr: ["Strandgade 91", "1401 København K"] },
        ].map((o) => (
          <div key={o.city}>
            <p className="flex justify-between font-semibold">
              {o.city} <span className="text-muted-foreground tabular-nums">{o.time}</span>
            </p>
            <p className="mt-3 text-muted-foreground">
              {o.addr[0]}
              <br />
              {o.addr[1]}
            </p>
          </div>
        ))}
        <ul className="space-y-1">
          {["Projects", "Studio", "Process", "Careers"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:underline">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <ul className="space-y-1">
          {["Instagram", "LinkedIn", "Press kit", "studio@nord.example"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:underline">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-16 text-[25.5vw] leading-[0.75] font-extrabold tracking-[-0.06em] uppercase select-none">
        Nord<span className="text-accent">.</span>
      </p>
      <div className="mx-auto flex max-w-[1600px] justify-between border-t border-foreground py-4 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Nord Arkitekter AS{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <p>Org. 000 000 000</p>
      </div>
    </footer>
  );
}
