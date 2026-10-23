"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { COLOR_MODE_STORE as STORE } from "@/lib/colorMode";

/**
 * Light / dark for the site itself (not the previews). The choice is kept in this browser and applied
 * before paint (lib/colorMode.ts, run from app/layout.tsx); "system" removes it and follows the OS again.
 */
export type ColorMode = "system" | "light" | "dark";

const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

function apply(mode: ColorMode) {
  const root = document.documentElement;
  if (mode === "system") delete root.dataset.theme;
  else root.dataset.theme = mode;
  try {
    if (mode === "system") localStorage.removeItem(STORE);
    else localStorage.setItem(STORE, mode);
  } catch {
    // storage blocked: the choice still holds for this page
  }
  window.dispatchEvent(new Event("cpui-color-mode"));
}

function useColorMode() {
  const [mode, setMode] = useState<ColorMode>("system");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const read = () => {
      const m = document.documentElement.dataset.theme;
      const current: ColorMode = m === "light" || m === "dark" ? m : "system";
      setMode(current);
      setDark(current === "dark" || (current === "system" && systemDark()));
    };
    read();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", read);
    window.addEventListener("cpui-color-mode", read);
    return () => {
      media.removeEventListener("change", read);
      window.removeEventListener("cpui-color-mode", read);
    };
  }, []);
  return { mode, dark };
}

/** Header icon: flips what you see now. Choosing the system's own mode goes back to following the system. */
export function ColorModeButton({ className = "" }: { className?: string }) {
  const { dark } = useColorMode();
  const next: "light" | "dark" = dark ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => apply(next === (systemDark() ? "dark" : "light") ? "system" : next)}
      aria-label={dark ? "Switch to light colours" : "Switch to dark colours"}
      title={dark ? "Light colours" : "Dark colours"}
      className={`grid size-9 place-items-center rounded-md text-muted-foreground hover:text-foreground ${className}`}
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}

/** Footer and phone menu: all three choices, so "follow my device" is always one tap away. */
export function ColorModeChoice({ className = "" }: { className?: string }) {
  const { mode } = useColorMode();
  const options: { id: ColorMode; label: string; icon: typeof Sun }[] = [
    { id: "system", label: "System", icon: Monitor },
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
  ];
  return (
    <div role="radiogroup" aria-label="Colours" className={`inline-flex rounded-md border border-border p-0.5 text-xs ${className}`}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={mode === o.id}
          onClick={() => apply(o.id)}
          className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-medium ${mode === o.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        >
          <o.icon aria-hidden className="size-3.5" />
          {o.label}
        </button>
      ))}
    </div>
  );
}
