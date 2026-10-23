import type { ReactNode } from "react";

/** 1200×630 canvas used by scripts/screenshots.mjs to render social/OG banners. */
export default function OgFrame({
  kicker,
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  kicker: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <main className="relative h-[630px] w-[1200px] overflow-hidden bg-foreground font-sans text-background">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]"
      />
      <div aria-hidden className="absolute -top-40 -left-40 size-[520px] rounded-full bg-accent/25 blur-[120px]" />

      <div className="relative flex h-full w-[520px] flex-col justify-between p-14">
        <p className="flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight">
          <span className="flex gap-1.5 text-xl">
            <kbd className="keycap border-background bg-background text-foreground shadow-none">⌘</kbd>
            <kbd className="keycap border-accent bg-accent text-accent-foreground shadow-none">V</kbd>
          </span>
          copypasteui
        </p>
        <div>
          <p className="text-lg font-semibold tracking-[0.2em] text-accent uppercase">{kicker}</p>
          <h1 className="mt-3 font-display text-[56px] leading-[1.02] font-bold tracking-tight">{title}</h1>
          {description && <p className="mt-4 line-clamp-3 text-xl leading-snug opacity-70">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-2 text-base font-semibold">
          {["Free", "Client work OK", "Local MCP"].map((t) => (
            <span key={t} className="rounded-full border border-background/25 px-4 py-1.5">
              {t}
            </span>
          ))}
        </div>
      </div>

      {image && (
        <div className="absolute top-[70px] left-[560px] w-[760px] rotate-[-3deg] overflow-hidden rounded-xl border border-background/20 bg-background shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          <div className="flex gap-2 border-b border-border bg-muted px-4 py-3">
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt ?? ""} className="block w-full" />
        </div>
      )}
      {children}
    </main>
  );
}
