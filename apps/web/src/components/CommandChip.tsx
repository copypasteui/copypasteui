"use client";

import CopyButton from "@/components/CopyButton";

/** A shell command with a copy button. */
export default function CommandChip({ command, className = "" }: { command: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-md border border-border bg-card py-1.5 pr-1.5 pl-4 ${className}`}>
      <code className="min-w-0 truncate font-mono text-sm">
        <span className="text-muted-foreground">$ </span>
        {command}
      </code>
      <CopyButton getText={() => command} label="Copy" variant="ghost" className="ml-auto shrink-0 px-2.5 py-1 text-xs" />
    </div>
  );
}
