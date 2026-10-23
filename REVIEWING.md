# Reviewing a contribution

CI checks the mechanics (rules, types, rendering, accessibility, interactions, duplicates). A reviewer judges what
a machine can't: does this section make a small business's website better, and does it look like a person made it?
Read this once; then the checklist in each pull request is enough.

## 1. Let CI do its part first

Don't review until CI is green. What each check means, so you can explain a failure to a contributor:

| Check | Fails when | Usual fix |
| --- | --- | --- |
| `registry:validate` | imports outside react/motion/lucide-react, network or storage calls, photos not from Unsplash, missing alt text, machine-made tells, bad meta | the message names the file and rule |
| `check:components` | the section doesn't compile on its own with strict TypeScript, on React 18 or 19 | usually `items[i]!` for a bounded index, or a type for a prop |
| `check:a11y` | a runtime error, any axe violation except contrast, or more contrast failures than the baseline (in its own theme, Midnight or Sunset, light or dark) | use theme tokens that pair (`text-primary-foreground` on `bg-primary`), not accent as small text |
| `check:interactions` | clicking, typing or submitting throws, a form reloads the page, or nothing reacts | `e.preventDefault()` and show a result; handle promise rejections |
| `check:duplicates` | the code shape is 75%+ the same as another section | change the structure, or explain in `scripts/duplicates-allow.json` |
| `check:mobile` | anything scrolls sideways on a 360px phone | `min-w-0`, `flex-wrap`, smaller type on small screens |
| `check:design` (part of validate) | blurred blobs, gradient text, neon glows, emoji, Sparkles, 4.9-star ratings, buzzwords | write specifics; `// design-ok: rule — why` only when the pattern is the point |

Every section passes in every theme and mode today, so the accessibility baseline (`apps/web/scripts/a11y-baseline.json`)
is empty. Keep it that way: fix the contrast rather than adding an entry. Themes are held to the pairs sections rely on
(primary as text on every surface, primary-foreground at 90% on primary), and `check:design` gives advice on the two
habits that break in other themes: accent as a text colour, and text faded below 90%.

## 2. Then judge it

Score each line 0–2. Merge at 9 or more out of 12 with no 0s; otherwise ask for changes and say which line.

| | 0 | 1 | 2 |
| --- | --- | --- | --- |
| **Fit** | generic SaaS block | usable by a small business | clearly written for a trade (menu, price list, booking, before/after) |
| **Looks made by a person** | template-y, could be any AI output | decent | has one expressive idea that suits the brand |
| **Copy** | lorem or buzzwords | plain | specific: names, places, prices, hours, real-sounding reviews (see `.claude/skills/website-copy`) |
| **Code** | hard to follow, magic numbers, dead code | fine | small, readable, data at the top, props for anything an owner would change |
| **Accessibility & motion** | keyboard can't reach things, motion everywhere | basics right | labels, focus, reduced motion, and the motion means something |
| **Originality & licence** | copied from a paid kit or a real brand | original but close to an existing section | original; licence field correct; photos from Unsplash only |

## 3. Things to check by eye

- Open the preview in three themes and dark mode: does it still look intentional?
- At phone width: are tap targets big enough, does the text wrap well?
- Read the generated prompt once (`/components/<category>/<slug>` → "See what gets copied"): would an AI builder know what to change?
- New template (a trade): six sections, the conversion that trade needs (book, call, order, quote), photos that match, `brief` filled in, slug added to `apps/web/src/lib/industries.ts`.
- Backend recipe: follows the shared data model, explains the first owner, protects `/admin` on the server, no secrets in client code.

## 4. Merging

- Squash-merge with a title like `Add olea-hero (restaurant hero with booking bar)`.
- Thank the contributor and credit them; their GitHub handle is on the section page automatically.
