// Pairwise (all-pairs) test design: the smallest set of cases in which every pair of values from any two
// parameters appears together at least once. Most bugs come from two settings interacting (glass surface ×
// dark mode, lively motion × phone width), so pairwise cases catch them with a tiny fraction of the full
// product. The idea follows Microsoft's PICT; this is a small greedy generator, seeded so runs repeat exactly.
//
//   import { pairwise } from "./pairwise.mjs";
//   const cases = pairwise(
//     [{ name: "surface", values: ["solid", "glass"] }, { name: "mode", values: ["light", "dark"] }, ...],
//     { allowed: (c) => !(c.surface === "glass" && c.texture === "dots"), seed: 1 },
//   );
//
// `allowed` receives a partial case (only some parameters set) and must return false only when the values it
// can see already break a rule, so the generator can reject a choice as soon as it's made.

/** Small fast seeded PRNG (mulberry32), so the same seed gives the same cases. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const key = (i, a, j, b) => `${i}:${a}|${j}:${b}`;

/** Every pair of values (across two different parameters) that the rules allow. */
export function allPairs(params, allowed = () => true) {
  const pairs = new Set();
  params.forEach((p, i) =>
    params.forEach((q, j) => {
      if (j <= i) return;
      for (const a of p.values) for (const b of q.values) if (allowed({ [p.name]: a, [q.name]: b })) pairs.add(key(i, a, j, b));
    }),
  );
  return pairs;
}

/** Pairs a list of cases covers. */
export function coveredPairs(params, cases) {
  const pairs = new Set();
  for (const c of cases)
    params.forEach((p, i) =>
      params.forEach((q, j) => {
        if (j > i) pairs.add(key(i, c[p.name], j, c[q.name]));
      }),
    );
  return pairs;
}

/**
 * Generate pairwise cases.
 * @param {{ name: string, values: (string|number|boolean)[] }[]} params
 * @param {{ allowed?: (partial: Record<string, unknown>) => boolean, seed?: number, tries?: number }} [opts]
 * @returns {Record<string, unknown>[]}
 */
export function pairwise(params, { allowed = () => true, seed = 1, tries = 40 } = {}) {
  for (const p of params) if (!p.values.length) throw new Error(`pairwise: "${p.name}" has no values`);
  if (params.length === 1) return params[0].values.filter((v) => allowed({ [params[0].name]: v })).map((v) => ({ [params[0].name]: v }));
  const random = rng(seed);
  const shuffle = (list) => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const uncovered = allPairs(params, allowed);
  const cases = [];

  // New pairs a value would cover, given what's already set in the case.
  const gain = (c, i, v) => {
    let n = 0;
    params.forEach((q, j) => {
      if (j === i || !(q.name in c)) return;
      if (uncovered.has(j < i ? key(j, c[q.name], i, v) : key(i, v, j, c[q.name]))) n++;
    });
    return n;
  };

  // Build one case around a seed pair, filling the other parameters greedily (ties broken at random).
  const build = (seedPair) => {
    const [[i, a], [j, b]] = seedPair.split("|").map((s) => {
      const at = s.indexOf(":");
      return [Number(s.slice(0, at)), s.slice(at + 1)];
    });
    const valueOf = (idx, text) => params[idx].values.find((v) => String(v) === text);
    const c = { [params[i].name]: valueOf(i, a), [params[j].name]: valueOf(j, b) };
    for (const k of shuffle(params.map((_, n) => n))) {
      const p = params[k];
      if (p.name in c) continue;
      let best = [];
      let bestGain = -1;
      for (const v of shuffle(p.values)) {
        if (!allowed({ ...c, [p.name]: v })) continue;
        const g = gain(c, k, v);
        if (g > bestGain) [best, bestGain] = [[v], g];
        else if (g === bestGain) best.push(v);
      }
      if (!best.length) return null; // the rules leave no value here; try another order
      c[p.name] = best[0];
    }
    return allowed(c) ? c : null;
  };

  while (uncovered.size) {
    const pool = [...uncovered];
    let best = null;
    let bestNew = 0;
    for (let t = 0; t < tries; t++) {
      const c = build(pool[Math.floor(random() * pool.length)]);
      if (!c) continue;
      let fresh = 0;
      params.forEach((p, i) =>
        params.forEach((q, j) => {
          if (j > i && uncovered.has(key(i, c[p.name], j, c[q.name]))) fresh++;
        }),
      );
      if (fresh > bestNew) [best, bestNew] = [c, fresh];
    }
    if (!best) {
      // Pairs the rules allow on their own but no complete case can hold: report them rather than loop.
      throw new Error(`pairwise: ${uncovered.size} allowed pair(s) can't be completed, e.g. ${pool[0]}`);
    }
    cases.push(best);
    params.forEach((p, i) =>
      params.forEach((q, j) => {
        if (j > i) uncovered.delete(key(i, best[p.name], j, best[q.name]));
      }),
    );
  }
  return cases;
}

/** Markdown table of cases, for reports and pull request comments. */
export function caseTable(params, cases, extra = []) {
  const head = ["#", ...params.map((p) => p.name), ...extra.map((e) => e.name)];
  const rows = cases.map((c, n) => [String(n + 1), ...params.map((p) => String(c[p.name])), ...extra.map((e) => e.value(c, n))]);
  return [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}
