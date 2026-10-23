import type { Metadata } from "next";

// The MCP page moved into the Developers hub. Static export has no server redirects, so this page
// forwards in the browser (keeping #shadcn and other anchors) and tells search engines where it went.
export const metadata: Metadata = {
  title: "Moved to For developers",
  robots: { index: false, follow: true },
  alternates: { canonical: "/developers" },
};

export default function McpMoved() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem 1rem", textAlign: "center" }}>
      <meta httpEquiv="refresh" content="0; url=/developers#mcp" />
      <script dangerouslySetInnerHTML={{ __html: 'location.replace("/developers" + (location.hash || "#mcp"));' }} />
      <p>
        The MCP set-up has moved to <a href="/developers#mcp">For developers</a>.
      </p>
    </main>
  );
}
