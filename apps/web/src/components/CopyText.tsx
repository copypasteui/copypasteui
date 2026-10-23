"use client";

import CopyButton from "@/components/CopyButton";

/** A block of text people copy as a whole, e.g. a message to paste into an AI tool. */
export default function CopyText({ text, label = "Copy" }: { text: string; label?: string }) {
  return (
    <div className="relative slip">
      <pre className="p-4 pr-24 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">{text}</pre>
      <CopyButton getText={() => text} label={label} variant="ghost" className="absolute top-2 right-2 px-2.5 py-1 text-xs" />
    </div>
  );
}
