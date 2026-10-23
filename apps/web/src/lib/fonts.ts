// The site's own type, self-hosted by Next.js at build time (no request to Google Fonts, no render-blocking
// stylesheet): Bricolage Grotesque for display, Hanken Grotesk for text, JetBrains Mono for code and keycaps.
// globals.css reads the CSS variables. Theme previews still load each theme's fonts on demand.
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--site-font-display", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--site-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--site-font-mono", display: "swap", preload: false });

export const siteFontVars = `${display.variable} ${sans.variable} ${mono.variable}`;
