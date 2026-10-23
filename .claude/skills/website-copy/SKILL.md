---
name: website-copy
description: >-
  Writing and editing rules for every word a visitor reads in this repo, so it doesn't read as AI-generated.
  Use automatically, without being asked, whenever you write or change copy: pages and components in
  apps/web (headings, intros, buttons, labels, empty states, errors, aria-labels, metadata titles and
  descriptions), registry sections and templates (the sample business copy inside component.tsx, meta.json
  descriptions, template briefs), registry/changelog.json, README, CONTRIBUTING, REVIEWING and the MCP
  README. Covers creating new copy and refactoring existing copy in place. Also use on requests like
  "unslop", "de-slop", "sounds like AI", "sounds like ChatGPT", "make this sound human", "too generic",
  "rewrite the copy", "check the copy". Skip code, class names, slugs, URLs and test fixtures.
---

# Website copy

How CopyPasteUI writes. Two kinds of copy live in this repo and they follow different rules about facts, so first
decide which one you are touching:

| | **Site copy** | **Sample copy** |
|---|---|---|
| Where | `apps/web/src/**`, README/CONTRIBUTING/REVIEWING, `registry/changelog.json`, `packages/mcp/README.md`, prompt text in `scripts/build-registry.mjs` | text inside `registry/components/**/component.tsx`, template `brief`s, sample data in `registry/recipes` |
| Who it's about | CopyPasteUI itself | a fictional small business (Olea, Crumb, Brightline…) |
| Facts | **never invented.** Counts come from the registry (`templates.length`, not "39"), claims from the code. No users, testimonials, ratings, "trusted by", logos or press that don't exist | **invent them, specifically and consistently**: a street, a phone number, opening hours, prices in £, a named reviewer with a concrete detail. Same brand name, address and phone across every section of one template |
| Voice | plain, direct, second person ("you"), the word you'd say out loud | the business talking to its customers, in its trade's language: a plumber says "call-out", a bakery says "sourdough", not "artisanal solutions" |

Both use British English (colour, licence as a noun, organise, £) and sentence case headings.

## The one rule

Swap the vague claim for the specific one: a number, a name, a price, a time, a place, or the mechanism behind the
claim. "Fast delivery" → "Order by 2pm, on your doorstep tomorrow". On site copy, if the specific fact isn't in the
code or the registry, don't make one up: say less, or ask. On sample copy, make it up, but make it plausible for
that trade and town.

## Ten checks (the short version)

1. Is every claim specific? (vague → number, name, price, time, place, mechanism)
2. Does each heading name its content, rather than tease it? ("Opening hours", not "Plan your visit")
3. Does each button say what happens? ("Book a table", "Copy the prompt"; never "Learn more", "Click here", "Submit", "Get started" as a reflex)
4. Is the point made once? No intro that announces the section, no closing line that restates it.
5. Any em dashes? Budget: one per section of a page, none in buttons, labels, cards or headings. Use a full stop, a colon, a comma or "and".
6. Any group of three that only exists for rhythm? ("fast, simple and reliable") Take two, take four, or say the one that's true.
7. Any "not X, but Y" / "more than just a…" / "X, not Y"? At most one per page, and only if someone really thinks X.
8. Do neighbouring cards, features or FAQ answers all have the same length and shape? Vary them.
9. Would the sentence still fit another business or product? (the portability test) Then it's filler: replace it with what's true only here, or cut it.
10. Did the edit lose a fact, a price, a condition or a warning that was there before? Put it back.

## Website patterns

These are the places AI copy shows most on a website. Examples: `references/patterns.md`.

- **Hero.** The headline says what the business is or does for the visitor, in words they'd search for. No "Welcome to", no "Elevate your", no slogan pair ("Fresh bread. Happy mornings."). The supporting line adds the fact the headline couldn't hold: where, when, how much. One primary action, named for what it does.
- **Eyebrows and section labels.** Short noun labels ("Opening hours", "Prices", "What we fix"). Not a teaser half-sentence.
- **Feature or service cards.** Each card names a real thing the business does, with one concrete detail (a price, a time, a part, a place). Vary length: roughly two thirds at the base length, the rest shorter or longer. Never three cards of "Quality / Speed / Care".
- **Testimonials.** A named person (first name + initial or town), what they bought, one concrete detail they noticed. No 5.0 ratings, no "amazing service!!", no reviews that read like the business's own ad copy. Ratings sit at 4.6–4.8 with a count.
- **About / story.** Start with something that happened ("We opened in 2009 with one oven on Harbour Row"), not with a mission. No realisation ending ("…and that's when we knew"), no epilogue after the natural end.
- **Pricing.** Real numbers, what's included, what costs extra. No "Most popular!" unless it's true. Plan names describe the plan ("Two-bedroom clean"), not a mood ("Essential", "Pro", "Ultimate") unless that's the business's real tiering.
- **FAQ.** Real questions customers ask, answered in the first sentence. Answers vary in length because questions do.
- **Calls to action and microcopy.** Buttons are verbs plus object. Errors say what went wrong and what to do. Empty states say what will appear and how to get it. `aria-label`s name the action, not the icon.
- **Metadata.** Titles: what the page is, in search words ("Free restaurant website template — Olea"). Descriptions: one or two plain sentences, no keyword lists, no "Discover…".
- **Changelog entries.** Lead with what changed for the reader, then the detail. No "We're excited to announce".

## Sentence and rhythm

- **Actor and verb early.** "The registry validator rejects…", not "Validation of registry entries is performed by…".
- **Everyday words.** use, not utilise; help, not facilitate; build, not foster. The word list is in `references/word-lists.md`.
- **Vary sentence length** by building sentences differently, never by chopping them into fragments. Three short fragments in a row ("Simple. Fast. Free.") is the tell, not the fix.
- **Cut the participle tail** ("…, making it the perfect choice for families"). Say the fact, or stop.
- **No staged reveals.** "The best part? It's free." → "It's free." Same for "Here's the thing:", "The secret:", colon drumrolls.
- **No false agency.** "The numbers speak for themselves" → say what the number is.
- **One hedge per claim**, and only when it's really uncertain.
- **No reader steering** ("This matters more than it sounds", "As you can see").

## Structure

- **Open on the news or the claim**, not on wide-angle context ("In today's fast-paced world…").
- **End on the most concrete sentence** the section already has. No aphoristic kicker ("Good coffee isn't a luxury. It's a ritual."), no "The future is bright".
- **Headings name content.** Template scaffolding ("Overview", "Key features", "Why choose us?") becomes what the section is actually about.
- **Lists only for parallel, skimmable items.** Don't chop an argument into bullets, don't bold a label on every bullet.
- **Counted lists only when the count is information.** "Five reasons to choose us" → just make the points.
- **No text about the page.** "This section shows…", "Below you'll find…": cut.

## Modes

- **Write** (new copy, default): apply everything silently. Before you hand it back, run the self-check once against your own draft.
- **Check** ("check the copy", "what reads as AI here"): flag, change nothing. Group findings as P0 / P1 / P2 (below), quote each span, say which are clear defects and which are defensible. Clean copy gets reported as clean.
- **Refactor** (existing copy in a file): edit in place, smallest change that fixes the defect. Leave passages that already read human exactly as they are. A word-list hit is a reason to look, not a licence to edit.

### Refactoring code safely

Copy lives inside code here, so edit only the text:

- Change JSX text, string literals that are visible copy, `alt`, `aria-label`, `title`, `placeholder`, metadata `title`/`description`, and `meta.json` `description`/`name`/`brief`. Never change class names, `id`s, `href`s, slugs, keys, data shapes, export names or code samples.
- Keep sample copy internally consistent: if you change a brand's phone number or street in one section, change it in every section of that template (`grep -r` the old value).
- Some copy is asserted by tests (the prompt contract, smoke tests, MCP tests). If a test pins a string you changed on purpose, update the test in the same change.
- Limits that CI enforces: `meta.json` `description` ≤ 240 chars, template `name` ≤ 60, changelog title 3–90 and body 20–900 chars.
- After editing, run what covers the change:
  - registry sections: `npm run registry:validate && npm run check:design` (buzzwords, emoji, 5.0 ratings, and advice on accent-as-text and faded text), then `npm test`
  - site pages: `npm run lint && npm run build -w apps/web && npm run test:smoke`
  - anything visible: look at it once in the preview (`/preview/<slug>` or the page).

## Severity

- **P0, trust breakers (fix on sight):** invented facts in site copy (users, ratings, testimonials, press, "trusted by", counts that aren't from the registry), chat artifacts ("Certainly!", "I hope this helps"), unfilled placeholders (`[Business name]`, "Lorem ipsum"), real brands or real people in sample copy.
- **P1, clear AI tells (fix before shipping):** word-list hits that qualify, "Welcome to" / "Elevate your" / "Look no further" openers, slogan pairs in headlines, decorative triads, "not X but Y" beyond one, em dashes over budget, vague CTAs, teaser headings, identical card shapes, aphoristic kickers, staged reveals, 5.0 ratings, significance inflation ("a game-changing approach to…").
- **P2, polish:** uniform sentence lengths, repeated sentence openings, copula avoidance ("serves as" → "is"), counted lists, text about the page, generic endings.

## Guardrails

The usual failure is trading one fingerprint for another. Each of these counts as a failed edit:

- **No invented facts in site copy.** If a sentence needs a number the registry doesn't have, flag it, don't fill it.
- **No real people or brands in sample copy.** Fictional businesses, fictional reviewers, Unsplash photos.
- **No staccato.** Don't fix long sentences by chopping them into fragments.
- **No performed candour or personality** ("Honestly?", "Real talk:", jokes the source didn't have).
- **No silent loss.** Prices, hours, conditions, warnings, legal wording and every list item survive the edit at the same strength. "From £45" doesn't become "£45"; "usually within a day" doesn't become "within a day".
- **Legal and licence text is content.** In privacy, cookies, licence and contribution terms, "must", "may", "never" are deliberate: don't soften or strengthen them.
- **Don't sand it down.** If copy is already specific and plain, leave it, and say so.

## Self-check before handing copy back

1. Word-list hits in context? (`references/word-lists.md`)
2. Every claim specific, and on site copy, true to the code?
3. Headings name content; buttons say what happens?
4. Em dashes within budget; no decorative triads; at most one "not X but Y"?
5. Cards / features / answers vary in length and shape?
6. Portability test passed: nothing that would fit any other business?
7. Opener is the claim; ending is the most concrete line?
8. Sample copy consistent across the template (name, phone, street, prices)?
9. Nothing lost from the original (prices, conditions, warnings, list items)?
10. The checks for the files you touched pass?

## Credits

Adapted for CopyPasteUI's website and template copy from [unslop](https://github.com/jlwin/unslop_ai) by
Jean-Luc Winkler (MIT, commit d65241e). The three-level model, severity tiers, guardrails and English word lists
come from there; the two-kinds-of-copy split, website patterns, refactoring rules and examples are ours. Licence:
`LICENSE` in this folder.
