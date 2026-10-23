import Link from "next/link";
import { ColorModeChoice } from "@/components/ColorModeSwitch";
import Logo from "@/components/Logo";
import { githubUrl, requestTradeUrl } from "@/lib/config";
import { components, templates, themes } from "@/lib/registry";

const groups = [
  {
    title: "Library",
    links: [
      { href: "/templates", label: `${templates.length} templates` },
      { href: "/components", label: `${components.length} sections` },
      { href: "/themes", label: `${themes.length} themes` },
      { href: "/backgrounds", label: "Backgrounds" },
    ],
  },
  {
    title: "Use it from",
    links: [
      { href: "/get-started", label: "An AI builder" },
      { href: "/plan", label: "Plan your site" },
      { href: "/developers#mcp", label: "Your editor (MCP)" },
      { href: "/developers", label: "shadcn, CLI and API" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/about", label: "About" },
      { href: "/contribute", label: "Contribute" },
      { href: requestTradeUrl(), label: "Request a trade" },
      { href: githubUrl, label: "GitHub" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo className="text-xl" />
            <p className="mt-5 max-w-sm text-muted-foreground">Free for any website you build, client work included.</p>
            <ColorModeChoice className="mt-6" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">{g.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="hover:highlight">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5 font-mono text-xs text-muted-foreground sm:px-6">
          <p>
            © {new Date().getFullYear()} Nidhin Radh P V and CopyPasteUI contributors · PolyForm Shield 1.0.0 · free to use in any website
          </p>
          <p className="flex gap-4">
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
