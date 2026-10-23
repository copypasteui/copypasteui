"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({
  getText,
  label = "Copy",
  className = "",
  variant = "primary",
}: {
  getText: () => string;
  label?: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const [copied, setCopied] = useState(false);
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90"
      : "border border-border bg-card text-card-foreground hover:bg-muted";

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(getText());
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${styles} ${className}`}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied!" : label}
    </button>
  );
}
