export const config = {
  siteName: "CopyPasteUI",
  siteUrl: process.env.COPYPASTEUI_SITE_URL ?? "https://copypasteui.dev",
  githubRepo: process.env.NEXT_PUBLIC_GITHUB_REPO || "copypasteui/copypasteui",
  // Cloudflare Web Analytics site token. Empty means no analytics, which is the default for forks and local builds.
  cfBeaconToken: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "",
};

// Who runs the site, for the terms, privacy and cookie pages. One place to change if a company takes over.
export const legal = {
  operator: "Nidhin Radh P V, trading as CopyPasteUI",
  email: "privacy@copypasteui.dev",
  updated: "2026-10-23",
};

export const githubUrl = `https://github.com/${config.githubRepo}`;

/** The default licence (see LICENSE). Contributors may mark their own items MIT, Apache-2.0 or CC0-1.0 instead. */
export const license = {
  id: "PolyForm-Shield-1.0.0",
  name: "PolyForm Shield 1.0.0",
  url: "https://polyformproject.org/licenses/shield/1.0.0",
};

/** A pre-filled GitHub issue asking for a template for a trade we don't cover yet. */
export const requestTradeUrl = (trade = "") =>
  `${githubUrl}/issues/new?template=request-a-trade.yml&title=${encodeURIComponent(`Template request: ${trade}`.trim())}${trade ? `&trade=${encodeURIComponent(trade)}` : ""}`;
