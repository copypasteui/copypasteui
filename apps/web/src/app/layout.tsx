import type { Metadata } from "next";
import "./globals.css";
import { config, siteImage } from "@/lib/config";
import { COLOR_MODE_SCRIPT } from "@/lib/colorMode";
import { siteFontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: "CopyPasteUI — Free small-business website templates for AI builders",
    template: "%s · CopyPasteUI",
  },
  description:
    "Complete websites for restaurants, salons, trades, clinics and more. Paste one prompt into ChatGPT, Lovable, Bolt or v0, or install the sections from Claude Code, VS Code or Cursor. Free, no account.",
  openGraph: { siteName: "CopyPasteUI", type: "website", images: [{ url: siteImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [siteImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={siteFontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: COLOR_MODE_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
