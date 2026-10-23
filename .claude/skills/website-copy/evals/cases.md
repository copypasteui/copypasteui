# Regression cases

After changing this skill, run each case in check mode and compare the findings. Clean cases must stay clean:
over-flagging is a regression too.

## Case 1: Sample hero (sample copy)

> **Welcome to Petal & Stem.** Discover stunning, handcrafted and sustainable floral arrangements for every occasion.
> Get started today!

Expected: P1 "Welcome to" opener; P1 "Discover"; P1 decorative triad (stunning, handcrafted and sustainable); P1 vague
CTA "Get started"; P2 nothing specific (no place, price, delivery time). Fix should name the shop, town and one
concrete offer, with a CTA like "Order flowers".

## Case 2: Feature cards (sample copy)

> **Expert team** — Our certified experts bring years of experience. **Fast service** — We work quickly to get the
> job done. **Fair prices** — Quality work at prices you can afford.

Expected: P1 identical card shape; P1 em dashes in card titles; P1 portability (all three fit any business); P1 vague
claims. Fix: three real services with a price or time each, varied length.

## Case 3: Testimonial (sample copy)

> "Absolutely amazing! Best service ever! 5 stars!" ★★★★★ 5.0

Expected: P1 5.0 rating (also blocked by the design check); P1 empty praise; exclamation marks over budget. Fix: a
named reviewer and one concrete detail, rating 4.6–4.8 with a count.

## Case 4: Site claim without a source (site copy)

> Trusted by over 10,000 small businesses worldwide.

Expected: P0 invented fact. The fix is to remove it or replace it with something the registry proves ("39 templates,
327 sections, 52 themes", rendered from the data, not typed in).

## Case 5: Changelog (site copy)

> We're thrilled to unveil a game-changing update that seamlessly elevates your workflow!

Expected: P1 "thrilled to unveil", "game-changing", "seamlessly", "elevates"; P1 no content. Fix leads with what
changed.

## Case 6: Already good (sample copy), must stay clean

> Lunch 12–3, dinner 6–10, closed Mondays. Book online or call 01326 555 014. Dogs welcome in the bar.

Expected: clean. The en dashes are ranges; three facts in a row are real information, not a decorative triad.

## Case 7: Already good (site copy), must stay clean

> Runs on your machine. No account, no API key. Your editor asks the owner a few questions and saves the answers to
> copypasteui.config.json.

Expected: clean. Short sentences here carry distinct facts; they are not a slogan cadence.

## Case 8: Legal text (site copy), must stay clean

> You must not use the Licensed Work to provide a product that competes with it.

Expected: clean. "must not" is load-bearing; don't soften it.

## Case 9: Refactor without losing facts (sample copy)

> Our team of qualified engineers — Gas Safe registered since 2011 — offers boiler servicing from £85, usually within
> 48 hours.

Expected: P1 two em dashes; P2 "offers" (copula avoidance). Fix must keep "Gas Safe registered", "since 2011", "from
£85" and "usually within 48 hours" at the same strength: "Our engineers have been Gas Safe registered since 2011.
Boiler servicing is from £85, usually within 48 hours."

## Case 10: Teaser heading and announcement (site copy)

> ## Getting started
> In this section, we'll walk you through everything you need to know to get up and running quickly.

Expected: P1 teaser/scaffolding heading; P2 text about the page; P1 no content. Fix: a heading that names the first
step and a first sentence that does it.
