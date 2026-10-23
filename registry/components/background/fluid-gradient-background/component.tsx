"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Real-time WebGL mesh gradient. No video, no image: a fragment shader blends the theme's
 * background, primary, accent and secondary colours through domain-warped noise.
 * Re-reads colours when the theme changes, pauses off-screen, renders one still frame
 * for prefers-reduced-motion, and falls back to CSS gradients without WebGL.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
uniform vec3 u_bg, u_a, u_b, u_c;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=uv*vec2(u_res.x/u_res.y,1.)*.85;
  float t=u_time*.06;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*1.5+u_mouse*.4),fbm(p+3.*q+vec2(8.3,2.8)-t));
  float f=fbm(p+2.5*r);
  vec3 col=mix(u_bg,u_a,smoothstep(.15,.85,f));
  col=mix(col,u_b,smoothstep(.35,1.,length(q))*.85);
  col=mix(col,u_c,smoothstep(.5,1.,r.x)*.6);
  col+=(hash(gl_FragCoord.xy+fract(u_time))-.5)*.035;
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

export default function FluidGradientBackground({ children }: { children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return setFallback(true);

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return setFallback(true);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = { res: u("u_res"), time: u("u_time"), mouse: u("u_mouse"), bg: u("u_bg"), a: u("u_a"), b: u("u_b"), c: u("u_c") };

    const setColors = () => {
      gl.uniform3fv(U.bg, readColor(el, "--background"));
      gl.uniform3fv(U.a, readColor(el, "--primary"));
      gl.uniform3fv(U.b, readColor(el, "--accent"));
      gl.uniform3fv(U.c, readColor(el, "--secondary"));
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
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width - 0.5;
      mouse.ty = (e.clientY - r.top) / r.height - 0.5;
    };
    el.addEventListener("pointermove", onMove);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const frame = () => {
      if (visible && !document.hidden) {
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        gl.uniform2f(U.mouse, mouse.x, mouse.y);
        gl.uniform1f(U.time, reduce ? 12 : (performance.now() - start) / 1000 + 12);
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
    <div ref={wrap} className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background font-sans">
      <canvas ref={canvas} aria-hidden className={`absolute inset-0 -z-10 size-full ${fallback ? "hidden" : ""}`} />
      {fallback && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(at_20%_30%,var(--primary),transparent_50%),radial-gradient(at_80%_20%,var(--accent),transparent_45%),radial-gradient(at_60%_80%,var(--secondary),transparent_50%)]"
        />
      )}
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl">Fluid gradient</h2>
          <p className="mt-3 text-foreground/75">Real-time WebGL. Colours come from your theme. Move your cursor.</p>
        </div>
      )}
    </div>
  );
}
