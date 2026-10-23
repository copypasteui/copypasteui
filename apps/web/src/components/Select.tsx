"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string };
export type SelectGroup = { label: string; options: SelectOption[] };

/**
 * The site's dropdown: a pill with a spaced chevron, an optional leading mark (a theme swatch) and optional
 * groups. It's a real <select>, so keyboards, screen readers and phones get the native behaviour; browsers
 * that support customisable selects also get a styled open list (`.ui-select` in globals.css).
 */
export default function Select({
  value,
  onChange,
  label,
  showLabel = false,
  options,
  groups,
  leading,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  showLabel?: boolean;
  options?: SelectOption[];
  groups?: SelectGroup[];
  leading?: ReactNode;
  className?: string;
}) {
  const option = (o: SelectOption) => (
    <option key={o.value} value={o.value}>
      {o.label}
    </option>
  );
  return (
    <label className={`flex items-center gap-2 ${className}`}>
      <span className={showLabel ? "text-muted-foreground" : "sr-only"}>{label}</span>
      <span className="relative flex min-w-0 items-center">
        {leading && <span className="pointer-events-none absolute left-3 z-10 flex">{leading}</span>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`ui-select max-w-full min-w-0 appearance-none truncate rounded-full border border-border bg-background py-1.5 pr-9 text-sm font-medium transition outline-none hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring ${leading ? "pl-8" : "pl-3.5"}`}
        >
          {groups
            ? groups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map(option)}
                </optgroup>
              ))
            : options?.map(option)}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
      </span>
    </label>
  );
}
