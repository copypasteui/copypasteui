# Word lists

Three tiers, by how reliable the signal is:

- **Tier 1: look at every hit; replace stock uses.** Far more common in generated text than in human prose.
- **Tier 2: flag when two or more sit in the same paragraph.** Fine alone.
- **Tier 3: flag only when they pile up.** Ordinary words that generated text stacks as filler.

Inflected forms count (delve → delving). A hit is a reason to look, not a licence to edit: keep literal, quoted,
technical and real-brand uses ("a robust API", "the shadcn ecosystem", a business actually called Elevate). These
lists age; add phrases that keep turning up.

## Tier 1: replace stock uses

| Instead of | Use |
|---|---|
| delve (into), deep dive, unpack | look at, explain, go through |
| landscape / realm / tapestry / journey (figurative) | the actual field, or say what happens |
| leverage, utilise | use |
| robust / seamless / comprehensive | say what it does: "works offline", "one prompt for the whole page" |
| pivotal / crucial / vital (as filler) | important, or give the reason |
| testament to, serves as, boasts, features (as "has") | shows, is, has |
| underscore / highlight (as "show") | show |
| game-changer / cutting-edge / groundbreaking / revolutionary | say what is new |
| unlock / unleash / harness / empower / supercharge | let, help, or the concrete result |
| elevate / transform / streamline your X | say what measurably improves |
| meticulous / intricate / nuanced / curated (as filler) | careful, detailed, chosen, or the detail itself |
| foster / cultivate / facilitate | build, support, help, run |
| in order to, due to the fact that | to, because |
| vibrant / thriving / bustling / nestled | the fact behind it, or cut |
| holistic / multifaceted / myriad / plethora | complete, varied, many |
| actionable / impactful / learnings | practical, effective, lessons |
| best-in-class / world-class / state-of-the-art | what makes it good, with a number |
| ever-evolving / fast-paced | say how it changes, or cut |

## Tier 2: flag when two or more cluster

navigate (figurative), bolster, spearhead, resonate, catalyse, augment, illuminate, cornerstone, paramount, poised
to, burgeoning, quintessential, overarching, ecosystem (figurative), interplay, encompass, notably, moreover,
furthermore, additionally

## Tier 3: flag only when they pile up

significant(ly), innovative, effective(ly), dynamic, scalable, compelling, unprecedented, remarkable, sophisticated,
premium, exceptional, unparalleled, passionate, dedicated

## Website clichés

These are the website-specific versions. Most belong to the hero, the about section and calls to action.

**Hero and intro openers:** "Welcome to [Business]", "Elevate your…", "Discover…", "Experience…", "Look no
further", "Your one-stop shop for…", "Where X meets Y", "More than just a…", "Imagine a world where", "In today's
fast-paced world", "Whether you're a… or a…"

**About and story:** "We pride ourselves on", "passionate about", "dedicated to excellence", "our mission is to",
"crafted with love", "nestled in the heart of", "a labour of love", "it all started with a dream", "and that's when
we knew"

**Calls to action:** "Learn more", "Click here", "Submit", "Get started" (when something more specific is true:
"Book a table", "Get a quote", "Copy the prompt"), "Don't miss out", "Join thousands of happy customers", "What are
you waiting for?"

**Trust theatre (P0 on site copy, fine only when true):** "trusted by", "loved by", "as seen in", "award-winning",
"thousands of happy customers", "5 stars", "rated #1"

**Testimonials:** "Amazing service!", "Highly recommend!", "Couldn't be happier", "Exceeded all my expectations",
"They truly care" (with nothing concrete after it)

**Feature headings:** "Quality you can trust", "Fast and reliable", "Peace of mind", "Expert team", "Tailored
solutions", "Why choose us?", "Our services", "Key features"

**Transitions and steering:** "It's worth noting that", "At its core", "When it comes to", "That being said",
"Here's the thing", "The best part?", "Not just X, but Y", "This is where X comes in", "As you can see", "Make no
mistake"

**Closers:** "The future is bright", "At the end of the day", "In conclusion", "Ready to take the next step?", "The
choice is yours"

**Chat artifacts (P0):** "Certainly!", "I hope this helps!", "Feel free to reach out", "Great question!", "I'd be
happy to…", "As an AI…", "Here's a revised version", "Let me know if you'd like…"

**Leaked placeholders (P0):** `[Business name]`, `[INSERT CITY]`, "Lorem ipsum", "Your Company", `TODO`, `example.com`
in visible copy, `utm_source=chatgpt.com`

## Punctuation

- **Em dash (—):** at most one per section of a page; none in buttons, labels, card titles, headings or metadata
  descriptions. Replace with a full stop, colon, comma, brackets or "and". (A spaced en dash in a range, "9–5",
  "£12–£18", is fine.)
- **Exclamation marks:** none on site copy; at most one per page in sample copy, and only where the business would
  really shout ("Open late on Fridays!").
- **Title Case Headings:** use sentence case.
- **Mixed conventions** in one page (£ and $, 9am and 09:00, colour and color) are a tell.

## Credits

The tiers and the English lists are adapted from [unslop](https://github.com/jlwin/unslop_ai) by Jean-Luc Winkler
(MIT). The website clichés and punctuation budget are ours.
