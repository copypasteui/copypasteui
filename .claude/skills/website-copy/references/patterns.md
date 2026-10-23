# Patterns, with before and after

Every pattern has an example to fix and a look-alike to leave alone: a rule without its protected counterpart turns
into over-editing. Sample-copy examples use invented businesses; site-copy examples are real CopyPasteUI copy.

## 1. Hero headline

Fix:
> **Welcome to Harbour Kitchen.** Elevate your dining experience with fresh, local and sustainable seafood.

> **Seafood from the Falmouth boats, cooked over wood.** Lunch from 12, dinner from 6, closed Mondays.

Fix (slogan pair):
> **Fresh bread. Happy mornings.**

> **Sourdough out of the oven at 7am, every day but Sunday.**

Leave alone: a short headline that is already the plain fact. **"Emergency plumber in Leeds, 24 hours"** has no
tell; don't decorate it.

## 2. Eyebrows and section headings

Fix: "Plan your visit" (teaser) → **Opening hours and parking**. "Why choose us?" → **What's included in every
service**. "Our story" over a section that is really about the kitchen → **The kitchen**.

Leave alone: "Prices", "Menu", "Contact" are already labels.

## 3. Feature and service cards

Fix (three identical cards):
> **Quality** — We use only the best materials.
> **Speed** — Fast turnaround on every job.
> **Care** — Your satisfaction is our priority.

> **Boiler service, £85.** Flue check, gas pressure test and a written report you can show your insurer.
> **Same-day leaks.** Call before 2pm and we're there before 6.
> **Bathrooms.** Rip-out to tiling, usually two weeks.

Note the varied lengths and the absence of dashes between title and body.

Leave alone: cards that are uniform because the data is (a price list where every row is name + price).

## 4. Testimonials

Fix:
> "Amazing service! Highly recommend! ★★★★★" — Sarah

> "They found the leak behind the bath panel in ten minutes after two other firms gave up." Priya S., Headingley.
> Rated 4.7 from 212 reviews.

Leave alone: a short real-sounding quote with a concrete detail, even if informal ("Fixed it, cleaned up, gone by
lunch.").

## 5. About and story

Fix:
> We're passionate about coffee. Our mission is to bring the finest beans to our community, crafted with love. It all
> started with a dream, and that's when we knew coffee was more than just a drink.

> Ember started in 2014 as a cart outside Truro station. We roast twice a week on a 15 kg drum in the old dairy on
> Lemon Street and sell most of it within ten days.

The fix opens on an event, names the place and the machine, and stops.

## 6. Pricing

Fix:
> **Essential** — Everything you need. **Pro** — For growing businesses. **Ultimate** — The complete package.

> **One-bedroom clean, £48.** Two hours, kitchen and bathroom deep-cleaned. **Two-bedroom, £66.** Three hours.
> Oven and fridge are £20 each extra.

Leave alone: tier names the business really uses, when each tier's contents are stated plainly.

## 7. FAQ

Fix: answers that all run two balanced sentences and open with "Great question" or a restatement.

> **Do you take card?** Yes, and Apple Pay. Cash too, but not notes over £20.

Answer in the first sentence; let lengths vary because questions do.

## 8. Buttons, labels, errors, empty states

| Fix | To |
|---|---|
| Learn more | See the menu |
| Submit | Send enquiry |
| Get started | Book a table / Plan my site / Copy the prompt |
| Oops! Something went wrong. | Couldn't copy. Try again. |
| No results found. | Nothing for "tattoo". Try a trade, or request it. |
| `aria-label="arrow icon"` | `aria-label="Next review"` |

Leave alone: "Next", "Back", "Close" when the context makes the action obvious.

## 9. Metadata

Fix: `title: "Home | Best Bakery Templates | Free | Modern"`, `description: "Discover our amazing collection of
stunning, responsive and modern templates."`

> `title: "Free bakery website template — Crumb"`, `description: "A bakery site with a daily bake list, pre-orders
> and opening hours. One prompt for Lovable, Bolt or v0."`

## 10. Site copy: CopyPasteUI's own pages

These came from real rewrites in this repo.

Plan page, before:
> **Plan your website, one question at a time.** Tell us about the business and what visitors should do. You get one
> prompt for your AI builder with the right template, the pages you want and your details already in — or a plan file
> for Claude Code and Cursor.

After:
> **What does your business need from its website?** We'll ask what you do, where you are and what customers should
> do when they land on your site. At the end you copy one prompt into Lovable, Bolt, v0 or ChatGPT. Using Claude Code
> or Cursor? Download the plan as a file instead.

What changed: the slogan headline became the question the page actually asks; "the right template" (vague claim)
became what the page does; the dash went.

About page, before: a slogan headline ("Who makes this, and why it's free."), a stats bar, tick-and-cross icons, "the
result is something you'd actually put your name to". After: two plain paragraphs and four questions people ask
("Is it really free?", "What can I do with it?"), each answered in its first sentence.

Leave alone: technical copy that is already precise. "Runs on your machine. No account, no API key." is fine.

## 11. Changelog

Fix:
> We're excited to announce a powerful new way to seamlessly plan your website!

> The MCP now asks the owner in short rounds and saves their answers to `copypasteui.config.json`, so a later chat
> builds the same site.

## 12. Em dashes

Fix:
> Book online — or call us — we'll find a time that works.

> Book online or call us, and we'll find a time.

Leave alone: one deliberate dash in a long paragraph; a spaced en dash in a range ("Mon–Sat 9–5").

## Credits

Pattern format (fix plus protected look-alike) adapted from [unslop](https://github.com/jlwin/unslop_ai) by
Jean-Luc Winkler (MIT). The examples are ours.
