"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Flowing silk folds rendered live in WebGL — a fragment shader layers sine fields into
 * fabric-like ridges with a specular sheen. Colours come from --primary and --accent over a
 * deep base, so it suits dark hero sections. One still frame for reduced motion; CSS fallback.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
uniform vec3 u_a, u_b;
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=(uv-.5)*vec2(u_res.x/u_res.y,1.)*2.2;
  float t=u_time*.18;
  p+=u_mouse*.3;
  for(int i=1;i<7;i++){
    float fi=float(i);
    p.x+=.35/fi*sin(fi*2.1*p.y+t+.4*fi);
    p.y+=.35/fi*cos(fi*1.7*p.x+t*1.1+.6*fi);
  }
  float v=.5+.5*sin(p.x*1.3+p.y*.9);
  float shade=pow(v,1.6);
  float sheen=pow(v,14.);
  vec3 base=vec3(.015,.015,.03);
  vec3 col=mix(base,u_a,shade*.9);
  col=mix(col,u_b,pow(v,5.)*.45);
  col+=vec3(1.)*sheen*.55;
  col*=smoothstep(1.6,.2,length((uv-.5)*vec2(1.,1.4))*1.6);
  gl_FragColor=vec4(col,1.);
}`;

function readColor(el: Element, name: string): [number, number, number] {
  const v = getComputedStyle(el).getPropertyValue(name).trim() || "gray";
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const x = c.getContext("2d")!;
  x.fillStyle = v;
  x.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = x.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

export default function SilkWavesBackground({ children }: { children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const gl = cv.getContext("webgl", { antialias: false });
    if (!gl) return setFallback(true);
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return setFallback(true);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = { res: u("u_res"), time: u("u_time"), mouse: u("u_mouse"), a: u("u_a"), b: u("u_b") };
    const setColors = () => {
      gl.uniform3fv(U.a, readColor(el, "--primary"));
      gl.uniform3fv(U.b, readColor(el, "--accent"));
    };
    setColors();
    const mo = new MutationObserver(setColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.max(1, el.clientWidth * dpr);
      cv.height = Math.max(1, el.clientHeight * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(U.res, cv.width, cv.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e?.isIntersecting ?? false));
    io.observe(el);
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      m.tx = (e.clientX - r.left) / r.width - 0.5;
      m.ty = (e.clientY - r.top) / r.height - 0.5;
    };
    el.addEventListener("pointermove", onMove);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const frame = () => {
      if (visible && !document.hidden) {
        m.x += (m.tx - m.x) * 0.03;
        m.y += (m.ty - m.y) * 0.03;
        gl.uniform2f(U.mouse, m.x, -m.y);
        gl.uniform1f(U.time, reduce ? 4 : (performance.now() - start) / 1000 + 4);
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
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-black font-sans text-white"
    >
      <canvas ref={canvas} aria-hidden className={`absolute inset-0 -z-10 size-full ${fallback ? "hidden" : ""}`} />
      {fallback && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,black,var(--primary),black,var(--accent),black)] opacity-70"
        />
      )}
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Silk waves</h2>
          <p className="mt-3 text-white/70">Live WebGL fabric in your theme’s primary and accent.</p>
        </div>
      )}
    </div>
  );
}
