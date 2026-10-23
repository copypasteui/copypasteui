"use client";

import { useEffect, useRef, useState } from "react";
import Select from "@/components/Select";
import { AlertTriangle, ExternalLink, Loader2, Monitor, Moon, RotateCw, Smartphone, Sun, Tablet } from "lucide-react";

export type ThemeOption = { slug: string; name: string; swatch: string };

const viewports = [
  { id: "desktop", label: "Desktop", icon: Monitor, px: null },
  { id: "tablet", label: "Tablet", icon: Tablet, px: 768 },
  { id: "mobile", label: "Mobile", icon: Smartphone, px: 390 },
] as const;
type Viewport = (typeof viewports)[number]["id"];

// How long to wait for the preview to report it rendered before trying the fallback.
const READY_TIMEOUT_MS = 4500;

export default function PreviewFrame({
  src,
  themes,
  theme,
  onThemeChange,
  height = 640,
}: {
  src: string;
  themes: ThemeOption[];
  theme: string;
  onThemeChange: (slug: string) => void;
  height?: number;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [initialSrc] = useState(() => `${src}?theme=${theme}&mode=light`);
  const [replay, setReplay] = useState(0);
  // Previews run in a sandboxed, opaque-origin iframe. Some embedded browsers and privacy
  // extensions refuse to load those; if the frame never reports "ready" we retry unsandboxed
  // (no more exposure than the "open in new tab" link, which runs the same page top-level).
  // `next dev` rejects asset requests from opaque-origin frames, so only sandbox built sites.
  const [sandboxed, setSandboxed] = useState(process.env.NODE_ENV !== "development");
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [stageWidth, setStageWidth] = useState(0);

  // The ready handler below is registered once, so it reads the current choice from a ref: a theme picked
  // (or read from the address) before the preview loaded must still be the one sent when it's ready.
  const latest = useRef({ theme, mode });
  const sendTheme = () => frame.current?.contentWindow?.postMessage({ type: "cpui-theme", ...latest.current }, "*");
  useEffect(() => {
    latest.current = { theme, mode };
    sendTheme();
  }, [theme, mode]);

  // Ready handshake + fallback.
  useEffect(() => {
    setStatus("loading");
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || e.data?.type !== "cpui-ready") return;
      setStatus("ready");
      sendTheme();
    };
    window.addEventListener("message", onMessage);
    const timer = setTimeout(() => {
      setStatus((s) => {
        if (s === "ready") return s;
        if (sandboxed) {
          setSandboxed(false);
          return "loading";
        }
        return "failed";
      });
    }, READY_TIMEOUT_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, [replay, sandboxed]);

  // Track available width so device sizes that can't fit are disabled instead of silently ignored.
  useEffect(() => {
    const el = stage.current!;
    const ro = new ResizeObserver(() => setStageWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fits = (px: number | null) => px === null || stageWidth === 0 || px < stageWidth - 16;
  useEffect(() => {
    const current = viewports.find((v) => v.id === viewport)!;
    if (!fits(current.px)) setViewport("desktop");
  }, [stageWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = viewports.find((v) => v.id === viewport)!;
  const width = current.px ? `${current.px}px` : "100%";
  const shownWidth = current.px ?? Math.max(0, stageWidth - 2);
  const active = themes.find((t) => t.slug === theme);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        <Select
          label="Preview theme"
          value={theme}
          onChange={onThemeChange}
          options={themes.map((t) => ({ value: t.slug, label: t.name }))}
          leading={<span className="size-3.5 rounded-full ring-1 ring-black/10" style={{ background: active?.swatch }} />}
        />
        <button
          type="button"
          onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
          aria-label={mode === "light" ? "Switch preview to dark mode" : "Switch preview to light mode"}
          className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {mode === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>

        <div className="ml-auto flex items-center gap-1">
          <span className="mr-1 hidden font-mono text-xs text-muted-foreground tabular-nums sm:inline">{shownWidth}px</span>
          <div role="radiogroup" aria-label="Preview width" className="flex rounded-md bg-muted p-0.5">
            {viewports.map((v) => {
              const ok = fits(v.px);
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={viewport === v.id}
                  aria-label={`${v.label} width${v.px ? ` (${v.px}px)` : ""}`}
                  title={ok ? `${v.label}${v.px ? ` · ${v.px}px` : ""}` : `${v.label} needs a wider window`}
                  disabled={!ok}
                  onClick={() => setViewport(v.id)}
                  className={`grid size-7 place-items-center rounded transition disabled:cursor-not-allowed disabled:opacity-30 ${viewport === v.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <v.icon className="size-4" />
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setReplay((n) => n + 1)}
            aria-label="Reload preview and replay animations"
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <RotateCw className="size-4" />
          </button>
          <a
            href={`${src}?theme=${theme}&mode=${mode}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open preview in a new tab"
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>

      <div
        ref={stage}
        className="relative flex justify-center bg-muted/60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
      >
        <iframe
          key={`${replay}-${sandboxed}`}
          ref={frame}
          src={initialSrc}
          title="Section preview"
          sandbox={sandboxed ? "allow-scripts" : undefined}
          onLoad={sendTheme}
          style={{ width, height }}
          className={`max-w-full bg-background transition-[width] duration-300 ${current.px ? "border-x border-border shadow-xl" : ""}`}
        />
        {status === "loading" && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" aria-label="Loading preview" />
          </div>
        )}
        {status === "failed" && (
          <div className="absolute inset-0 grid place-items-center bg-muted p-6 text-center">
            <div className="max-w-sm">
              <AlertTriangle className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 font-semibold">This browser blocked the live preview</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Some embedded browsers and privacy extensions block preview frames. The section itself is fine.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <a
                  href={`${src}?theme=${theme}&mode=${mode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Open preview <ExternalLink className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setReplay((n) => n + 1)}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
