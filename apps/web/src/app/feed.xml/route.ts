import { changelog } from "@/lib/changelog";
import { config } from "@/lib/config";

// Static export: written to /feed.xml at build time. RSS 2.0, one item per release note.
export const dynamic = "force-static";

const abs = (href: string) => (href.startsWith("http") ? href : `${config.siteUrl}${href}`);
const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString();

export function GET() {
  const entries = changelog().slice(0, 50);
  const items = entries
    .map((e) => {
      const html = [
        `<p>${xml(e.body)}</p>`,
        e.links.length ? `<p>${e.links.map((l) => `<a href="${xml(abs(l.href))}">${xml(l.label)}</a>`).join(" · ")}</p>` : "",
        e.items.length
          ? `<ul>${e.items
              .slice(0, 40)
              .map((it) => `<li><a href="${xml(abs(it.href))}">${xml(it.name)}</a></li>`)
              .join("")}</ul>`
          : "",
        e.items.length > 40 ? `<p>…and ${e.items.length - 40} more.</p>` : "",
      ].join("");
      const link = `${config.siteUrl}/changelog#${e.id}`;
      return `    <item>
      <title>${xml(e.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <description>${xml(html)}</description>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CopyPasteUI release notes</title>
    <link>${config.siteUrl}/changelog</link>
    <atom:link href="${config.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>New templates, sections, themes and MCP features from CopyPasteUI.</description>
    <language>en-gb</language>
    <lastBuildDate>${rfc822(entries[0]?.date ?? "2026-01-01")}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
