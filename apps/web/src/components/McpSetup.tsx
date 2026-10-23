"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const server = { command: "npx", args: ["-y", "copypasteui@latest", "mcp"] };
const json = (key: string, extra: Record<string, unknown> = {}) =>
  JSON.stringify({ [key]: { copypasteui: { ...extra, ...server } } }, null, 2);

// Ordered by how many developers use each tool (2026 surveys); revisit quarterly.
const clients = [
  {
    id: "claude_code",
    name: "Claude Code",
    file: "Terminal",
    snippet: "claude mcp add --scope user copypasteui -- npx -y copypasteui@latest mcp",
  },
  { id: "vscode", name: "VS Code", file: "User mcp.json (MCP: Open User Configuration)", snippet: json("servers", { type: "stdio" }) },
  {
    id: "codex",
    name: "Codex",
    file: "~/.codex/config.toml",
    snippet: `[mcp_servers.copypasteui]\ncommand = "npx"\nargs = ["-y", "copypasteui@latest", "mcp"]`,
  },
  { id: "cursor", name: "Cursor", file: "~/.cursor/mcp.json", snippet: json("mcpServers") },
  { id: "windsurf", name: "Windsurf", file: "~/.codeium/windsurf/mcp_config.json", snippet: json("mcpServers") },
  { id: "gemini_cli", name: "Gemini CLI", file: "~/.gemini/settings.json", snippet: json("mcpServers") },
  { id: "claude_desktop", name: "Claude Desktop", file: "claude_desktop_config.json", snippet: json("mcpServers") },
  { id: "other", name: "Any MCP client", file: "stdio command", snippet: "npx -y copypasteui@latest mcp" },
];

export default function McpSetup() {
  const [active, setActive] = useState(clients[0]!.id);
  const c = clients.find((x) => x.id === active)!;
  const auto = c.id === "other" ? null : `npx copypasteui setup --client ${c.id}`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex gap-1 overflow-x-auto border-b border-border p-2">
        {clients.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(x.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium ${active === x.id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="space-y-5 p-5">
        {auto && (
          <div>
            <p className="text-sm font-medium">Automatic (shows changes with --dry-run, backs up your config)</p>
            <Snippet text={auto} />
          </div>
        )}
        <div>
          <p className="text-sm font-medium">
            {auto ? "Or manually" : "Command"}: <span className="text-muted-foreground">{c.file}</span>
          </p>
          <Snippet text={c.snippet} />
        </div>
        <p className="text-sm text-muted-foreground">
          Restart the client, then ask: “Add a pricing section from copypasteui with the midnight theme.”
        </p>
      </div>
    </div>
  );
}

function Snippet({ text }: { text: string }) {
  return (
    <div className="mt-2 flex items-start gap-3 rounded-lg bg-muted p-4">
      <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] leading-relaxed">{text}</pre>
      <CopyButton getText={() => text} label="Copy" variant="ghost" className="shrink-0 px-3 py-1.5" />
    </div>
  );
}
