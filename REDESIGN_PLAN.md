# Paradise Enterprise — redesign plan (tasteskill 2.5)

Skill: `C:\Users\HP\.agents\skills\design-taste-frontend` (referred to as `<skill>` below).
Scope: main site (`index.html` → `src/`) first, then the shop (`ecommerce/`) in the same system.

---

## 0. Diagnosis — why it reads "simple and AI-made"

What I saw in the running site at 1440 and in the source:

| Problem | Where | Skill rule broken |
|---|---|---|
| Every product is a flat SVG drawing (boards, desks, a TV) — no real photographs anywhere | `ProductVisual`, `AnimatedBoard`, hero tiles, `public/products/` is empty | Product kind: "shown in photographs, never a drawing" |
| Same layout repeated: pastel card grid with icon + title + paragraph, 3x, 2x2, 2x3 | Products, WhyChooseUs, Services, Clients | Card layout at most twice; neighbours never share a layout |
| Big stat strip "25+ / 10+ / 500+ / 2" plus marquee ticker | ModernHero, ProductTicker | "No row of big stat numbers, no filler stat strips" |
| Generic slogans: "Great spaces. Greater possibilities.", "The right products. One trusted partner.", "Better spaces. Made possible." | almost every h2 | Copy: h1 names the category and the buyer; a noun in every heading; no stock lines |
| Two-tone "black + blue" heading trick on every section, eyebrow label above every heading | all sections | The look of a template |
| Everything fades/slides in on scroll; reduced-motion deliberately switched off | `useMotionReveal`, `MotionCard`, `MotionPreferences` | "Never a card or section that fades in on scroll"; reduced motion must rest |
| Sections are 240–1700px tall, short ones stacked (CTA 277px, map 240px, ticker 44px) | whole page | One section per screen (1 or 2 screens at 1440x900) |
| Two entrances (board intro overlay, then hero) | `BoardEntrance` + `ModernHero` | One hero entrance, once |
| Broken characters: "â€”" in product text | `Products.jsx` (encoding) | — (bug) |
| Hero has 4 visuals competing (board demo, furniture tile, digital tile, stats) | ModernHero | One subject at true size |

---

## 1. Brief (skill step 1)

- **Kind:** product (physical goods, site-kind `other`) → `data-type="product"`, `site-kind=other`.
  No shader effects, no CSS grounds, no scenes. Photographs, flat colour, type, the hero entrance,
  1–2 dealt moments, the hover layer.
- **What is sold:** whiteboards, greenboards, notice/pin-up boards, specialty boards (ceramic,
  magnetic, acrylic, digital), classroom furniture — made and installed in Nagpur since 2001.
- **Who buys:** schools, colleges, coaching institutes, offices, institutions.
- **Main action (one wording everywhere):** `Request a quote` (nav, hero, close, phone bar).
  Secondary: `Browse the boards` → `/ecommerce/`.
- **Real material we have:** logo, price list (`ecommerce/src/products.js`), address, founders,
  client list, history since 2001. **Missing:** photographs (see §5 — biggest decision).

## 2. Look and the deal (skill step 4)

Run from the project folder, write every result on plan line 2 and at the top of `<body>`:

```bash
node <skill>/assets/layout/deal.mjs --type product --has photo --history .taste-skill/layout-history.json
node <skill>/scripts/start.mjs deal --page product --trade "classroom boards" --history .taste-skill/history.json
node <skill>/scripts/moments.mjs pick --page product --count 2 --fits section,statement --photo --history .taste-skill/history.json
node -e "...random pick..." "nav-cards|nav-split|nav-mega" "footer-columns|footer-dark" "close-photo|close-type|close-word" "dark-band|brand-band" "arrow|solid|block|pill" "wordmark|initial|arc|ring|stack|dots"
```

- **Palette:** use the client's own colours via `start.mjs brand` instead of a dealt palette —
  white ground, logo blue `#3158ed` as accent, orange `#ffac7b` and aqua `#8be8d7` only as the
  `brand-band` / small marks. This keeps AGENTS.md's "white theme, blue/orange/aqua" rule and
  satisfies the skill. Radius `soft`.
- **Type:** the dealt pairing from `start.mjs` (replaces Manrope-everywhere).
- **Mark:** the existing "P" logo replaces the dealt mark.

## 3. New page, screen by screen (skill step 3)

Line 1: product · Line 2: (deal results). One idea, one h2, one real picture per section.

| # | id | One idea | Picture (kind) | Screens 1440 / 768 | Replaces |
|---|---|---|---|---|---|
| 1 | `hero` | "Whiteboards and classroom furniture for schools and offices in Nagpur" + fact "Made in Nagpur since 2001" + `Request a quote` / `Browse the boards` | Dealt product/photo hero: a fitted classroom wall board, big (object) — enters once on load | 1 / 1 | BoardEntrance, ModernHero, ProductTicker, stats strip |
| 2 | `range` | The line-up: 11 boards + furniture, "from ₹" prices from `products.js`, each card links to its shop page | Grid of 4–8 product photos on one backdrop (object) | 1–2 / 2 | Products |
| 3 | `surfaces` | One benefit: the writing surface (ceramic vs magnetic vs green) | `strip`: four close-ups of surfaces (parts) | 1 / 1 | part of WhyChooseUs |
| 4 | `install` | One benefit: we measure, make and fit on site, then service it | `tall-small`: installer mounting a board tall + bracket detail small (use) | 1 / 1 | Services |
| 5 | `classrooms` | **brand-band / dark-band**: rooms we have equipped — **Moment 1** (photo-led, dealt) | `bleed` classroom photo across the viewport (use/place) | 1–2 / 2 | BoardMoment, ProjectCTA |
| 6 | `sizes` | Sizes and prices table (`rows--spec`), no fact repeated from #2 | none allowed (price list) | 1 / 1 | new, from products.js |
| 7 | `about` | Since 2001: the story + founders with faces + named client institutions (with permission) as a small proof line | `pair`: workshop photo + founders portrait (people) — **Moment 2** type-led ("2001" set large) | 1–2 / 2 | Story, Founders, Clients, WhyChooseUs |
| 8 | `faq` | 5 questions max (delivery time, custom sizes, installation, GST invoice, warranty) | none (FAQ) — not next to #6 | 1 / 1 | new |
| 9 | `quote` | Quote form (existing mailto ContactForm, restyled as starter `booking-form`) + address by district | `split`: form beside a product photo | 1 / 1 | Contact, LocationMap |
| — | `footer.closing` | Dealt close + footer (address, hours, links, one credits line) | close-photo or name set wide | — | ProjectCTA, Footer |

Rules held: product whole in at most 3 sections (1, 2, 9), never the same picture twice, neighbours
never share a composition, one contrasting ground (#5), back third calm (6, 8) before the close.

## 4. Motion (replaces the current animation layer)

Keep framer-motion, but change *what* moves:

- **Remove:** `useMotionReveal` blanket reveals, `MotionCard` scroll-in, `BoardEntrance` overlay,
  `ScrollProgress` bar, marquee ticker, `useSmoothScroll` (if it hijacks the wheel).
- **Restore reduced motion:** delete the forced `reducedMotion="never"`; everything rests and stays
  visible under `prefers-reduced-motion`.
- **Add (skill motion layer, `assets/motion`):**
  - Hero entrance once on load (`data-enter`): headline lines rise, photo un-masks, buttons last.
  - Hover layer: linked cards lift 2px, photos zoom 1.02–1.03 inside their frame, buttons step on
    hover / press on click, underlines draw. No tilt, no carousel.
  - 1–2 dealt moments (§3 #5 and #7), each moving only inside its own section, with a still
    fallback.
- Load the kit's `system.js` + motion files from `public/assets` as plain files; React components
  keep only the enquiry state logic.

> This is calmer than today but reads as *crafted* rather than *busy*. AGENTS.md says "expressive
> Motion animations" — the expressiveness moves into the hero entrance and the two moments instead
> of every card. AGENTS.md needs a one-line update if you agree.

## 5. Photographs (the biggest lever)

The skill's rule for a product with no photos: licensed **stand-ins** of the same kind of thing
(`photos.mjs pick --product-without-photos`, then `photos.mjs search "classroom whiteboard"`,
"school classroom green chalkboard", "office meeting room whiteboard", "installer mounting board",
"wooden school desks classroom"…), one light and grade, no other maker's logo, credits in one footer
line, every stand-in listed so you can replace it.

**Much better:** the owner shoots real photos (phone is fine, daylight, landscape + square):
1. Each of the 11 boards, front-on on a plain wall (→ `public/products/<id>.webp`, already wired in the shop)
2. 4 surface close-ups (ceramic, magnetic, green, cork)
3. Installation in progress; finished classrooms/offices (3–5)
4. Workshop / factory; founders portrait

Plan: build with stand-ins now, swap in real photos as they arrive (same file names).

## 6. Shop (`ecommerce/`) — phase 2

Same tokens, fonts, buttons and hover layer as the main site; product cards and product page use
the photos from §5; cart/quote/OTP logic untouched. Gate it separately (`--start dist/ecommerce/index.html --root dist`).

## 7. Build steps (skill steps 0, 5)

1. Copy `<skill>/assets` → `public/assets`; link `system.css` / `system.js` / motion from `index.html`.
2. Arm the gate: `node <skill>/scripts/gate.mjs --start dist/index.html --root dist --kind product --category "classroom whiteboards and furniture" --primary "Request a quote"`.
3. Write all copy first in `docs/copy.md`, lint it: `node <skill>/scripts/copy-lint.mjs docs/copy.md --kind product`.
4. Run the deals (§2), set `<html lang="en" data-type="product" data-radius="soft" data-buttons=… data-motion>` + metas, head/og tags, `share.jpg`.
5. Fetch stand-in photos (`photos.mjs`), convert to webp, sized.
6. Build each section as a **new** component file (`src/sections/*.jsx`) using the starter's markup
   and classes; switch `App.jsx` imports only once each new file exists (AGENTS.md rule).
7. Delete the old components/CSS once nothing imports them (`expressive.css`, `boards.css`,
   `ProductVisual`, `AnimatedBoard`, `BoardPlayground`, `Counter`, unused historical files).
8. Fix the "â€”" encoding bug while rewriting copy.
9. Update `CLAUDE.local.md` and `AGENTS.md` for the new structure.

## 8. Check (skill step 6)

After `npm run build`, one at a time:

```bash
node <skill>/scripts/copy-lint.mjs dist/index.html --kind product
node <skill>/scripts/consistency.mjs dist/index.html --root dist --widths 1440,1024,820,768,390 --rhythm-widths 1440,820,768,390 --profile .taste-skill/chrome-check --page product --category "classroom whiteboards and furniture" --primary "Request a quote"
node <skill>/assets/layout/check.mjs --url dist/index.html --profile .taste-skill/chrome-check --sizes 1440x900,1024x768,820x1180,768x1024,390x844 --shots shots/layout
node <skill>/scripts/shoot.mjs --url dist/index.html --w 1440 --out shots/1440.png --profile .taste-skill/chrome-check
node <skill>/scripts/perf.mjs dist/index.html --profile .taste-skill/chrome-check
node <skill>/scripts/gate.mjs dist/index.html
```

Fix until `GATE: PASS` (max 3 rounds). Expected waivers (in `.taste-skill/waivers.json`): the real
phone number, email and street address — rule 9 targets invented contacts, these are the client's
own. Add `.taste-skill/` and `shots/` to `.gitignore`.

## 9. Order of work

1. Decisions below → 2. copy → 3. deals + photos → 4. hero + range (review screenshots with you)
→ 5. remaining sections → 6. motion layer + cleanup → 7. gate → 8. shop restyle → 9. gate shop.

## 10. Decisions needed from you

1. **Photos:** stand-ins now and real ones later, or will you shoot the list in §5 first?
2. **Colours:** keep the logo blue + orange/aqua accents (recommended, via `brand`), or let the skill deal a fresh palette?
3. **Motion:** OK to drop the scroll fade-ins and the intro overlay for the hero entrance + hover + two moments?
4. **Facts:** confirm which figures are true and usable — "500+ institutions", "25+ years", the client institution names (permission to show them), founders' names/photos.
5. **Scope:** main site first, shop second — or both together?
