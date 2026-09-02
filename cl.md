---
name: motion-portfolio-site-builder
description: Build a scroll-driven, motion-reactive one-page portfolio site for a founder/designer/creative professional (reference pattern: spragadheeshraj.com). Covers full information architecture, copywriting patterns, a signature scroll-linked letter-curl hero animation with working code, device-tilt hero interactions, a design-token system, responsive/accessibility rules, and a fill-in-the-blanks content checklist. Use whenever a user wants a personal portfolio, product-designer landing page, or "site like spragadheeshraj.com".
---

# Motion Portfolio Site — Build Guide

A reusable blueprint for a single-page, scroll-and-tilt-reactive personal
portfolio. Every proper noun in this doc (name, companies, project names,
dates, city) is **placeholder content** from the reference site — replace
with the real person's details using the checklist in §10.

What makes this pattern distinctive, in priority order:
1. A **signature hero animation** that's cheap to build but reads as
   expensive craft (the letter-curl scroll effect).
2. **Small human touches** that no template gives you for free — a
   phonetically-spelled home city, an "under the hood" math reveal, a
   first-person pull-quote.
3. **Two-pass content** — every project list appears once as a big
   image-forward card and once as a dense scannable list, so both skimmers
   and readers are served.

---

## 1. Information Architecture

Single page, anchor-navigated, no client-side routing.

```
#hero        Name · role · mission statement · 5 hero images
             (location strip + "under the hood" reveal live here too)
#what-i-do   5-category capability taxonomy
#featured    2–4 large featured case studies
#built       7+ smaller projects, numbered 01…N
#about       Photo · role timeline · pull-quote
#contact     Email (visible) + one social link
```

Nav bar: name (→ `#hero`) on the left; `Intro` `Work` `About` anchors on the
right; email + LinkedIn icons either in the bar or floating fixed. Footer
repeats the two contact icons plus the raw email as literal text.

---

## 2. Design Token System

Don't guess the reference site's exact hex values — instead, derive tokens
from first principles for whatever brand you're building, using this
scaffold so decisions are consistent rather than ad hoc:

```css
:root {
  /* Type */
  --font-display: /* one confident display face for the hero name */;
  --font-body:    /* a workhorse text face, high x-height, screen-legible */;
  --font-mono:    /* for the "under the hood" code reveal + coordinates */;

  --step-hero: clamp(3rem, 9vw, 8rem);      /* hero name */
  --step-h2:   clamp(1.75rem, 4vw, 3rem);   /* section headings */
  --step-body: clamp(1rem, 1.2vw, 1.125rem);
  --step-kicker: 0.75rem;                    /* small italic section labels */

  /* Color — pick ONE accent, keep everything else near-neutral */
  --bg:      #0a0a0a;   /* or a warm off-white for a lighter mood */
  --fg:      #f5f5f0;
  --muted:   color-mix(in srgb, var(--fg) 55%, transparent);
  --accent:  /* one saturated color used sparingly: links, active states */;
  --hairline: color-mix(in srgb, var(--fg) 12%, transparent);

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 200ms;
  --dur-med:  600ms;

  /* Rhythm */
  --section-pad: clamp(4rem, 10vw, 9rem);
  --content-w: min(1200px, 92vw);
}
```

Typography pairing rule of thumb: one **confident serif or condensed
display** face for the hero name (this is the "personality" font, used
almost nowhere else), one **quiet grotesk/sans** for everything else, one
**monospace** reserved exclusively for the coordinates line and the "under
the hood" code panel — using mono there and nowhere else makes it read as a
deliberate wink rather than a UI default.

---

## 3. Hero Section

**Content slots**
- Display name — largest type on the page, set in `--font-display`
- Role line, pipe-separated: `Founder · Designer · Artist`
- Mission statement, 10–15 words, 2-line wrap: *"I build experiences at the
  intersection of art, science and tech."*
- 5 hero images (portrait/product/texture shots) — tilt-reactive on mobile,
  static parallax or fixed on desktop

**Mobile motion permission gate** (iOS Safari requires explicit consent for
`DeviceOrientationEvent`):

```js
async function requestMotion() {
  if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
    const state = await DeviceOrientationEvent.requestPermission();
    return state === 'granted';
  }
  return true; // Android / desktop: no gate needed
}
```

Gate UI: full-screen overlay, shown once per session —
- Mark/icon (e.g. `◎`) + label `Device Motion · Permission Request`
- One payoff sentence: *"This site moves with you. The hero images respond
  to how you hold and tilt your phone."*
- **Enable Motion** (primary) / **Skip** (ghost)
- On enable → brief numeric loader (0→100) → reveal hero with tilt active
- On skip / desktop / permission denied → reveal hero immediately, tilt
  simply inert; layout must never depend on it

**Signature interaction — scroll-driven letter curl**

Each letter of the hero heading is wrapped in its own `<span>` and animated
along a cosine envelope as the section scrolls out of view, so the two ends
of the word settle before the middle:

```js
// Setup: wrap each letter
const letters = [...headingEl.textContent].map((ch) => {
  const span = document.createElement('span');
  span.textContent = ch === ' ' ? '\u00A0' : ch;
  span.style.display = 'inline-block';
  return span;
});
headingEl.replaceChildren(...letters);

// Per-frame update, p = scroll progress through the hero (0 → 1)
function updateCurl(p) {
  const n = letters.length;
  letters.forEach((span, i) => {
    const t = n > 1 ? i / (n - 1) : 0;      // 0 → 1 across the word
    const curve = Math.abs(Math.cos(t * Math.PI)); // U-shape: 1 at edges, 0 at center
    const startY = -55 * curve;              // px offset at p = 0
    const y = startY * (1 - p);              // interpolates to 0 as p → 1
    span.style.transform = `translateY(${y}px)`;
  });
}

// Drive p with a scroll-progress observer (throttled to rAF)
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const rect = heroEl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -rect.top / rect.height));
    updateCurl(p);
    ticking = false;
  });
}, { passive: true });
```

Why the U-shaped `curve(t)` reads as "edges land first": edge letters have a
smaller starting offset relative to how quickly the eye tracks them, so they
visually settle sooner even though every letter reaches `y = 0` at the same
`p = 1`. For a more pronounced stagger, offset each letter's *effective*
progress by its distance from center:

```js
const pEffective = Math.min(1, Math.max(0,
  (p - 0.1 * curve) / (1 - 0.1 * curve)
));
```

**Optional easter egg — expose the math.** A small monospace panel, revealed
on scroll or tap, showing the formula as pseudocode with a one-line intro:
*"This might look like a simple animation — here's what's actually going
on."* This is the single highest-leverage personality move in the whole
site: it turns a generic scroll effect into proof of craft. Keep the
revealed pseudocode terse (4–6 lines), not the literal JS.

---

## 4. Location Strip

A compact horizontal module near the hero — cheap to build, high in
personality, and the easiest section to make feel hand-made rather than
templated:

```
📍 [City Name]
   pronounced as
   koh · im · buh · tore          ← phonetic spelling, middle-dot separated
   City in [Region], [Country]     ← one factual line
   I call it the city of [X]       ← one personal/opinionated line
   11.0168° N, 76.9558° E          ← decimal coordinates, --font-mono
```

---

## 5. What I Do — Capability Taxonomy

Kicker: `From Idea to Reality` → heading `What I Do`.

5 categories, each expandable, each with 3–4 concrete sub-skills. This is
the template shape — replace labels with the target person's real
discipline mix, but keep the cardinality (5 categories × 3–4 items) since
it's what makes the section scan quickly without feeling like a wall of
tags:

| Category | Sub-items |
|---|---|
| Strategy | Product Vision · Market & User Insight · Go-to-Market · Strategic Narrative & Storytelling |
| Product | Concept to Product · Product Design · Design Systems & Operations · Connected Hardware & IoT |
| Brand & Creative | Brand Architecture · Creative Direction · Visual Identity & Design · Motion & Video |
| Spatial Experiences | Retail Experiences · Brand Activation Design · Service Journey Design |
| Systems | AI-Native Workflow Design · Process & Ops Design · Org and Team Building |

---

## 6. Featured Work

Kicker: `Selected work` → heading `Featured Work`.

2–4 large, image-forward cards. Each needs:
- Project name
- One-line **stance**, not a feature list — the problem solved, framed with
  a point of view (`"Designing Trust in Preventive Health"`, not `"A health
  app with X, Y, Z features"`)
- Parent company / sub-brand
- Year range + status: `2022 · Active`, `2020 · 2023`, `2015 · 2021`
- Link to `/project-slug`

Immediately follow with a **compact recap grid** — the same projects again,
smaller, with an added discipline tag (`Strategy · Product`). This
deliberate repetition is the "two-pass content" principle from the intro:
first pass sells the work visually, second pass lets a scanner extract the
facts in three seconds.

---

## 7. Things I've Built — Numbered Index

Kicker: `Beyond the Brief` → heading `Things I've Built`.
Intro line: one sentence on the range of work, e.g. *"From products to
brands to moving image, every project begins with an idea and ends with
something better than the brief."*

7+ entries, numbered `01…N`, each with:
- Project name
- One-line stance (same voice as §6)
- Client · sub-brand · discipline tags
- Year
- Link to `/project-slug`

Render as both an image card grid and a plain numbered text list — same
two-pass principle as Featured Work.

---

## 8. About

Kicker: `What I've Been Building` → heading `About Me`.

- Portrait — warm/candid framing over corporate headshot
- Role timeline, most recent first:
  `Company — Title — Start – End · computed duration`
  e.g. `Deep Holistics — Co-Founder & Chief Product Officer — Apr 2022 – Feb
  2026 · ~4 years`
- One first-person pull-quote, 2–5 words, set large: `"Always curious about
  new ideas."`

---

## 9. Contact / Footer

- Email as **visible copy-pasteable text**, not hidden behind a mailto only
- Two icon links: email + one professional social profile (LinkedIn or
  equivalent)
- No legal boilerplate, no long footer nav — a personal site earns the
  right to be minimal here

---

## 10. Content Checklist

- [ ] Name + 2–3 role words
- [ ] One-sentence mission statement (10–15 words)
- [ ] Home city: name, phonetic spelling, region/country, personal
      nickname, decimal lat/long
- [ ] 5 capability categories × 3–4 sub-skills
- [ ] 2–4 featured projects: name, one-line stance, company/brand, year
      range, status, slug
- [ ] 7+ smaller projects: name, stance, tags, year, slug
- [ ] Portrait photo
- [ ] Work history: company, title, start–end dates
- [ ] First-person pull-quote (2–5 words)
- [ ] Email + one social link
- [ ] 5 hero images

---

## 11. Technical & Accessibility Notes

- **Scroll performance**: always throttle scroll handlers to `rAF`; prefer
  `IntersectionObserver` for enter/exit detection and a manual scroll
  listener (as in §3) only for continuous progress values.
- **Reduced motion**: wrap all non-essential animation (letter curl, tilt,
  parallax) in a `prefers-reduced-motion` check; fall back to a static,
  fully-legible layout with zero transform delays.
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
  ```
- **Device tilt**: always feature-detect, always gate behind explicit
  permission on iOS, always ship a static fallback — never let a core
  content section depend on tilt working.
- **Semantic structure**: hero name as a single `<h1>`; letter-span wrapping
  must not break screen-reader output — keep the un-split text in an
  `aria-label` on the parent and mark the letter spans `aria-hidden="true"`.
- **No client-side router needed** — anchor links + `scroll-behavior:
  smooth` (or a lightweight scroll library if easing control matters) is
  sufficient for a single page.
- **Images**: 5 hero images + portrait + project thumbnails is the full
  image budget; serve responsive `srcset`/`sizes` and lazy-load everything
  below the fold.

---

## 12. What Actually Makes This Feel Premium

If time is constrained, prioritize in this order — this is the difference
between "portfolio template" and "this person clearly cares":

1. The letter-curl hero animation (§3) — it's the first thing anyone sees.
2. The location strip's personal line (§4) — costs one sentence, reads as
   a signature.
3. The "under the hood" math reveal (§3) — turns a cute effect into a
   demonstration of actual craft.
4. Consistent one-line "stance" copy across every project (§6, §7) — resist
   the urge to write feature lists.
5. Everything else (design tokens, layout grid) is competent-baseline work
   that any well-built site needs, but it's not what makes this one
   distinctive.
