"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, MousePointer2, Square, Type, Circle, Image as ImageIcon, Menu } from "lucide-react";

/* ---------- fluid-gradient background (WebGL), inlined ---------- */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec3 u_bg,u_a,u_b,u_c;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=uv*vec2(u_res.x/u_res.y,1.)*.8; float t=u_time*.05;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*1.5),fbm(p+3.*q+vec2(8.3,2.8)-t));
  float f=fbm(p+2.5*r);
  vec3 col=mix(u_bg,u_a,smoothstep(.2,.9,f)*.85);
  col=mix(col,u_b,smoothstep(.3,1.,length(q))*.8);
  col=mix(col,u_c,smoothstep(.45,1.,r.x)*.7);
  col=mix(col,u_bg,smoothstep(.55,.0,uv.y)*.55);
  col+=(hash(gl_FragCoord.xy+fract(u_time))-.5)*.03;
  gl_FragColor=vec4(col,1.);
}`;

function readColor(el: Element, name: string): [number, number, number] {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const x = c.getContext("2d")!;
  x.fillStyle = getComputedStyle(el).getPropertyValue(name).trim() || "gray";
  x.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = x.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const cv = ref.current!;
    const el = cv.parentElement!;
    const gl = cv.getContext("webgl", { antialias: false });
    if (!gl) return setFailed(true);
    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!;
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return setFailed(true);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const setColors = () => {
      gl.uniform3fv(u("u_bg"), readColor(el, "--background"));
      gl.uniform3fv(u("u_a"), readColor(el, "--primary"));
      gl.uniform3fv(u("u_b"), readColor(el, "--secondary"));
      gl.uniform3fv(u("u_c"), readColor(el, "--accent"));
    };
    setColors();
    const mo = new MutationObserver(setColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.max(1, el.clientWidth * dpr);
      cv.height = Math.max(1, el.clientHeight * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(u("u_res"), cv.width, cv.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e?.isIntersecting ?? false));
    io.observe(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const frame = () => {
      if (visible && !document.hidden) {
        gl.uniform1f(u("u_time"), reduce ? 20 : (performance.now() - start) / 1000 + 20);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
    };
  }, []);
  return failed ? (
    <div className="absolute inset-0 bg-[radial-gradient(at_20%_20%,var(--primary),transparent_50%),radial-gradient(at_80%_10%,var(--secondary),transparent_45%),radial-gradient(at_70%_60%,var(--accent),transparent_50%)]" />
  ) : (
    <canvas ref={ref} className="absolute inset-0 size-full" />
  );
}

/* ---------- multiplayer cursors ---------- */
const cursors = [
  {
    name: "Maya",
    cls: "bg-primary text-primary-foreground",
    fill: "fill-primary text-primary",
    path: { x: [60, 210, 140, 60], y: [40, 120, 210, 40] },
  },
  {
    name: "Leo",
    cls: "bg-accent text-accent-foreground",
    fill: "fill-accent text-accent",
    path: { x: [430, 330, 470, 430], y: [230, 140, 90, 230] },
  },
  {
    name: "Aiko",
    cls: "bg-secondary text-secondary-foreground",
    fill: "fill-secondary text-secondary-foreground",
    path: { x: [300, 520, 380, 300], y: [300, 260, 330, 300] },
  },
];

export default function PrismHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background font-sans text-foreground">
      <div aria-hidden className="absolute inset-0 -z-10">
        <FluidCanvas />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="size-6 rotate-45 rounded-md bg-[conic-gradient(var(--primary),var(--accent),var(--secondary),var(--primary))]" />{" "}
          Prism
        </a>
        <nav className="hidden gap-7 rounded-full bg-background/50 px-6 py-2 text-sm backdrop-blur md:flex">
          {["Features", "Templates", "Community", "Pricing"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background sm:inline-block">
          Open Prism
        </a>
        <button type="button" aria-label="Menu" className="sm:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 text-center md:pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.04em]"
        >
          Design at the speed of thought.
        </motion.h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/75">
          Prism is the multiplayer canvas for teams who sketch, design and prototype in one place, in the browser and in real time.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground"
          >
            Start designing free <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#" className="rounded-full bg-background/70 px-7 py-4 font-medium backdrop-blur">
            Watch the 90-second tour
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/90 text-left text-card-foreground backdrop-blur"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
            <span className="ml-3 text-xs text-muted-foreground">Launch campaign / Hero · v3</span>
            <div className="ml-auto flex -space-x-2">
              {cursors.map((c) => (
                <span
                  key={c.name}
                  className={`grid size-6 place-items-center rounded-full border-2 border-card text-[10px] font-bold ${c.cls}`}
                >
                  {c.name[0]}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[48px_1fr] md:grid-cols-[48px_1fr_200px]">
            <div className="flex flex-col items-center gap-3 border-r border-border py-4 text-muted-foreground">
              {[MousePointer2, Square, Circle, Type, ImageIcon].map((I, i) => (
                <I key={i} className={`size-4 ${i === 0 ? "text-primary" : ""}`} />
              ))}
            </div>
            <div className="relative h-[360px] overflow-hidden bg-muted/60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="absolute top-[12%] left-[8%] h-[58%] w-[46%] rounded-2xl bg-secondary bg-[radial-gradient(at_30%_20%,var(--primary),transparent_60%),radial-gradient(at_80%_70%,var(--accent),transparent_55%)] p-5 shadow-lg">
                <p className="font-display text-2xl font-bold text-primary-foreground">Summer drop</p>
                <span className="mt-3 inline-block rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                  Shop now
                </span>
              </div>
              <div className="absolute top-[18%] right-[10%] w-[30%] space-y-2 rounded-xl bg-card p-3 shadow-md">
                <div className="h-2.5 w-3/4 rounded bg-foreground/80" />
                <div className="h-2 w-full rounded bg-muted-foreground/30" />
                <div className="h-2 w-5/6 rounded bg-muted-foreground/30" />
                <div className="mt-3 h-7 w-20 rounded-md bg-primary" />
              </div>
              <div className="absolute bottom-[10%] left-[40%] h-16 w-16 rounded-full border-2 border-dashed border-primary" />
              {cursors.map((c, i) => (
                <motion.div
                  key={c.name}
                  className="absolute top-0 left-0"
                  animate={{ x: c.path.x, y: c.path.y }}
                  transition={{ duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MousePointer2 className={`size-5 ${c.fill}`} />
                  <span className={`ml-4 rounded-full px-2 py-0.5 text-[11px] font-medium ${c.cls}`}>{c.name}</span>
                </motion.div>
              ))}
            </div>
            <div className="hidden space-y-4 border-l border-border p-4 text-xs md:block">
              <p className="font-medium">Frame</p>
              {[
                ["W", "640"],
                ["H", "420"],
                ["Radius", "24"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg bg-muted px-2.5 py-2">
                  <span className="text-muted-foreground">{k}</span>
                  {v}
                </div>
              ))}
              <p className="pt-2 font-medium">Fill</p>
              <div className="flex gap-2">
                {["bg-primary", "bg-accent", "bg-secondary", "bg-foreground"].map((b) => (
                  <span key={b} className={`size-7 rounded-lg ring-1 ring-border ${b}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
