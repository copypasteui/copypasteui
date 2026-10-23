import type { ReactNode } from "react";

/** Always-dark terminal panel used to show the MCP and CLI in use. */
export default function Terminal({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-lg border border-foreground bg-[#141412] font-mono text-[13px] leading-relaxed text-[#e9e6da] ${className}`}
    >
      <p className="border-b border-white/10 px-4 py-2.5 text-xs text-white/50">{title}</p>
      <div className="space-y-3 overflow-x-auto p-4 sm:p-5">{children}</div>
    </div>
  );
}

export const Prompt = ({ children }: { children: ReactNode }) => (
  <p>
    <span className="text-[#ffe14d]">&gt;</span> {children}
  </p>
);
export const Call = ({ tool, arg }: { tool: string; arg: string }) => (
  <p className="text-white/55">
    ● copypasteui · {tool} <span className="text-white/80">{arg}</span>
  </p>
);
export const Out = ({ children }: { children: ReactNode }) => <p className="pl-4 text-white/55">⎿ {children}</p>;
export const File = ({ children }: { children: ReactNode }) => <span className="text-[#9be59b]">{children}</span>;
