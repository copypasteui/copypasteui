"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { Github } from "@/components/icons";
import { ColorModeChoice } from "@/components/ColorModeSwitch";

export type NavItem = { href: string; label: string; hint: string; match: string[] };

// Builders' and developers' doors sit side by side.
export const NAV: NavItem[] = [
  { href: "/templates", label: "Templates", hint: "Complete small-business websites", match: ["/templates"] },
  { href: "/components", label: "Sections", hint: "Heroes, menus, pricing, booking and more", match: ["/components"] },
  { href: "/themes", label: "Themes", hint: "Colours, corners and fonts", match: ["/themes"] },
  {
    href: "/backgrounds",
    label: "Backgrounds",
    hint: "Animated photo, WebGL and canvas backdrops",
    match: ["/backgrounds", "/components/background"],
  },
  { href: "/get-started", label: "Get started", hint: "Build with Lovable, Bolt, v0 or ChatGPT", match: ["/get-started"] },
  { href: "/developers", label: "Developers", hint: "MCP, shadcn CLI, CLI and JSON API", match: ["/developers"] },
];

// The most specific match wins, so a background section (/components/background/…) lights up Backgrounds, not Sections.
const matchLength = (path: string, item: NavItem) =>
  Math.max(-1, ...item.match.filter((m) => path === m || path.startsWith(`${m}/`)).map((m) => m.length));
const isActive = (path: string, item: NavItem) => {
  const len = matchLength(path, item);
  return len >= 0 && NAV.every((other) => matchLength(path, other) <= len);
};
const openSearch = () => window.dispatchEvent(new Event("open-command-palette"));

/** Desktop links with the current section underlined by the highlighter. */
export function DesktopNav() {
  const path = usePathname() ?? "/";
  return (
    <nav aria-label="Main" className="hidden min-w-0 flex-1 gap-0.5 text-[15px] font-medium lg:flex">
      {NAV.map((n) => {
        const on = isActive(path, n);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={on ? "page" : undefined}
            className={`shrink-0 rounded-md px-3 py-2 transition hover:text-foreground ${on ? "text-foreground [background:linear-gradient(transparent_62%,var(--accent)_62%,var(--accent)_88%,transparent_88%)]" : "text-muted-foreground"}`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Phone menu: a button in the header that opens a full-height sheet. */
export function MobileMenu({ githubUrl }: { githubUrl: string }) {
  const path = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center rounded-md border border-border bg-card lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Portalled to <body>: the header's backdrop blur would otherwise trap a fixed sheet inside it. */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-foreground bg-background px-4 pb-10 lg:hidden"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSearch();
              }}
              className="mt-4 flex w-full items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-left text-muted-foreground"
            >
              <Search className="size-4" /> Search templates, sections and themes
            </button>
            <nav aria-label="Main" className="mt-4">
              {NAV.map((n) => {
                const on = isActive(path, n);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={on ? "page" : undefined}
                    className="flex items-center justify-between gap-4 border-b border-border py-4"
                  >
                    <span>
                      <span className={`block font-display text-2xl font-extrabold tracking-tight ${on ? "highlight" : ""}`}>
                        {n.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{n.hint}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-muted-foreground" />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Link href="/contribute" onClick={() => setOpen(false)} className="text-muted-foreground">
                Contribute
              </Link>
              <Link href="/about" onClick={() => setOpen(false)} className="text-muted-foreground">
                About
              </Link>
              <a href={githubUrl} className="inline-flex items-center gap-2 text-muted-foreground">
                <Github className="size-4" /> GitHub
              </a>
            </div>
            <ColorModeChoice className="mt-6" />
          </div>,
          document.body,
        )}
    </>
  );
}
