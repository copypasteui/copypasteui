import Link from "next/link";
import { ColorModeButton } from "@/components/ColorModeSwitch";
import { CommandPaletteButton } from "@/components/CommandPalette";
import { Github } from "@/components/icons";
import Logo from "@/components/Logo";
import { DesktopNav, MobileMenu } from "@/components/SiteNav";
import { githubUrl } from "@/lib/config";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:gap-6">
        <Link href="/" aria-label="CopyPasteUI home" className="mr-auto shrink-0 text-lg lg:mr-0">
          <Logo />
        </Link>
        <DesktopNav />
        <CommandPaletteButton className="shrink-0" />
        <ColorModeButton className="hidden shrink-0 lg:grid" />
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hidden size-9 place-items-center rounded-md text-muted-foreground hover:text-foreground lg:grid"
        >
          <Github className="size-5" />
        </a>
        <MobileMenu githubUrl={githubUrl} />
      </div>
    </header>
  );
}
