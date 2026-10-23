"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Liquid metal blobs, raymarched in a WebGL fragment shader: five spheres blended with a smooth minimum, so they
 * merge and split as they move. The "environment" they reflect is a gradient of your primary and accent, and one
 * blob follows the cursor. Falls back to a still gradient without WebGL; pauses off-screen.
 */
const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision highp float;
uniform vec2 res; uniform float t; uniform vec2 mouse; uniform vec3 c1; uniform vec3 c2;
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float scene(vec3 q) {
  float d = 1e3;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec3 c = vec3(sin(t * 0.35 + fi * 1.7) * 1.3, cos(t * 0.28 + fi * 2.3) * 0.8, sin(t * 0.2 + fi) * 0.6);
    d = smin(d, length(q - c) - (0.55 + 0.12 * sin(fi + t * 0.5)), 0.6);
  }
  d = smin(d, length(q - vec3(mouse * vec2(2.2, 1.3), 0.0)) - 0.45, 0.6);
  return d;
}
vec3 normalAt(vec3 q) { vec2 e = vec2(0.002, 0.0); return normalize(vec3(scene(q + e.xyy) - scene(q - e.xyy), scene(q + e.yxy) - scene(q - e.yxy), scene(q + e.yyx) - scene(q - e.yyx))); }
vec3 env(vec3 d) { float h = d.y * 0.5 + 0.5; vec3 base = mix(c2 * 0.15, c1, smoothstep(0.1, 0.9, h)); return base + vec3(1.0) * pow(max(dot(d, normalize(vec3(0.4, 0.8, 0.5))), 0.0), 40.0); }
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * res) / res.y;
  vec3 ro = vec3(0.0, 0.0, 4.0); vec3 rd = normalize(vec3(uv, -1.6));
  float dist = 0.0; vec3 col = mix(vec3(0.02), c1 * 0.12, uv.y + 0.5);
  for (int i = 0; i < 64; i++) {
    vec3 q = ro + rd * dist; float d = scene(q);
    if (d < 0.001) {
      vec3 n = normalAt(q); vec3 r = reflect(rd, n);
      float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      col = mix(env(r) * 0.9, c2, fres * 0.6) + fres * 0.25;
      break;
    }
    dist += d; if (dist > 10.0) break;
  }
  gl_FragColor = vec4(col, 1.0);
}`;

const toRgb = (css: string, fallback: [number, number, number]): [number, number, number] => {
  const probe = document.createElement("span");
  probe.style.color = css;
  document.body.appendChild(probe);
  const m = getComputedStyle(probe).color.match(/[\d.]+/g);
  probe.remove();
  return m && m.length >= 3 ? [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255] : fallback;
};

function Blobs() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const gl = cv.getContext("webgl", { antialias: true });
    if (!gl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const css = getComputedStyle(cv);
    gl.uniform3fv(gl.getUniformLocation(prog, "c1"), toRgb(css.getPropertyValue("--primary").trim(), [0.5, 0.4, 1]));
    gl.uniform3fv(gl.getUniformLocation(prog, "c2"), toRgb(css.getPropertyValue("--accent").trim(), [0.4, 0.9, 1]));
    const uRes = gl.getUniformLocation(prog, "res");
    const uT = gl.getUniformLocation(prog, "t");
    const uMouse = gl.getUniformLocation(prog, "mouse");
    const mouse = [0.6, -0.3];
    const target = [0.6, -0.3];
    let raf = 0;
    let visible = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      target[0] = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target[1] = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const draw = (now: number) => {
      mouse[0]! += (target[0]! - mouse[0]!) * 0.06;
      mouse[1]! += (target[1]! - mouse[1]!) * 0.06;
      gl.uniform1f(uT, reduce ? 3 : now / 1000);
      gl.uniform2f(uMouse, mouse[0]!, mouse[1]!);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize();
    draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}

export default function ChromeBlobsBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_30%,black),black)] font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Blobs />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.45),transparent_60%)]" />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Chrome blobs</h2>
          <p className="mt-3">Liquid metal that merges and splits. One blob follows your cursor.</p>
        </div>
      )}
    </div>
  );
}
