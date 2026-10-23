import Analytics from "@/components/Analytics";
import CommandPalette from "@/components/CommandPalette";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

/** Header, footer and ⌘K around a page. The site fonts are self-hosted (lib/fonts.ts). */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CommandPalette />
      <Analytics />
    </>
  );
}
