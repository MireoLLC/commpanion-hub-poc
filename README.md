# COMMpanion Hub — POC

A multi-page static site for the COMMpanion umbrella hub — **Powered by Penn State Health**.

This is the missing umbrella for Penn State Health's three virtual care programs (Primary Care, Weight Management, Executive Health). It introduces each program at the hub level and links out to the live program sites for the full experience.

**Status:** Proof of concept / "art of the possible" for leadership. All copy is **DRAFT pending Penn State Health Marketing approval**. Stock photography in `image_assets/` is **placeholder** for approved PSH photography.

---

## What's in here

```
commpanion-hub-poc/
├─ index.html                       Home
├─ about.html                       About COMMpanion
├─ programs.html                    All programs + comparison table
├─ primary-care.html                Program detail — Coral accent
├─ weight-management.html           Program detail — Teal accent
├─ executive-health.html            Program detail — Gold accent (rule only)
├─ organizations.html               For employers & organizations
├─ contact.html                     Contact + FAQ accordion
├─ insights.html                    Insights landing — filterable card grid
├─ insights-care-team.html          Article — Our approach (brand)
├─ insights-first-visit.html        Article — Getting started (Coral)
├─ insights-stop-guessing.html      Article — Campaigns (Teal)
├─ insights-beyond-physical.html    Article — Our approach (Gold)
├─ insights-healthier-teams.html    Article — For organizations (brand)
├─ css/styles.css                   Shared stylesheet
├─ js/main.js                       Shared script (nav, dropdown, reveal, FAQ, filter, share)
├─ image_assets/                    Logo SVG, favicon, stock photos (placeholders)
└─ README.md
```

No framework. No build step. No npm. Each page opens directly from disk and works the same on GitHub Pages.

Because there is no build step, the shared header/footer markup is **duplicated** in each HTML file (fetch-based partial includes would break under `file://`). If you change one, mirror the change across all 14 pages.

---

## Image map

| Slot | File |
|---|---|
| Home hero background | `AdobeStock_566555291.jpeg` (clinical silhouettes, blue tones) |
| About hero background | `AdobeStock_567074807.jpeg` (couple outdoors, well-being) |
| Programs hero background | `AdobeStock_224173795.jpeg` (clinicians in corridor) |
| Primary Care hero + card | `AdobeStock_479767497.jpeg` (parent + child telehealth) |
| Weight Management hero + card | `AdobeStock_441948253.jpeg` (woman in calm home setting) |
| Executive Health hero + card | `AdobeStock_1692480270.jpeg` (professional with digital overlay) |
| Organizations hero | `AdobeStock_633523073.jpeg` (clinical team meeting) |
| Trust band (About) | `PSH_Campus.jpeg` (Milton S. Hershey Medical Center) |
| Insight: care team | `AdobeStock_633523073.jpeg` (multidisciplinary team meeting) |
| Insight: first visit | `AdobeStock_728718037.jpeg` (patient on telehealth video call) |
| Insight: stop guessing | `AdobeStock_958900811.jpeg` (clinician + data visualization) |
| Insight: beyond physical | `AdobeStock_372451052.jpeg` (clinician + health-icon overlay) |
| Insight: healthier teams | `AdobeStock_637360931.jpeg` (energized healthcare team) |

All photos are stock placeholders. Replace with approved PSH photography before publishing externally.

---

## Local preview

Open any HTML page directly in a browser, or run a tiny local server:

```bash
cd commpanion-hub-poc
python3 -m http.server
```

Then visit `http://localhost:8000/` in your browser.

> **Tip:** Use the local server (not direct `file://`) when testing — it more closely mirrors how the site behaves on GitHub Pages.

---

## Deploy to GitHub Pages (manual — done by a human)

The build files do not deploy themselves. From your machine:

1. Push this folder to GitHub on `main`.
2. In the repo: **Settings → Pages → Source → Deploy from a branch → `main` / root → Save**.
3. The site publishes at `https://<user-or-org>.github.io/commpanion-hub-poc/` in about a minute.

No CI, no Pages workflow needed — GitHub serves the files as-is.

---

## Brand notes

- **Colors** — Navy/blue anchored (`#1B365D` / `#2E5A8A` / `#4A90C2`). Service-line accents (Coral / Teal / Gold) are used sparingly, only on each program's detail page as a hero rule, eyebrow, tag, or media-edge accent.
- **Typography** — Roboto for headings + body; Roboto Condensed for accents, eyebrows, and italic emphasis.
- **Logo** — `image_assets/COMMpanion_Logo.svg` already includes the "Powered by Penn State Health" endorsement. On dark backgrounds (header, hero, footer) it's knocked out to white via `filter: brightness(0) invert(1)`.
- **Favicon** — `image_assets/favicon.svg` is a simple navy "O" mark in COMMpanion colors.
- **Icons** — Lucide line icons, inlined as SVG (no runtime library).

---

## Insights (blogs & campaigns)

[insights.html](insights.html) is the landing page — a filterable card grid for short articles and campaign pieces from across the COMMpanion programs. Filter chips (All · Our approach · Getting started · Campaigns · For organizations) hide and show cards by `data-category` with no page reload; "All" resets.

The five article pages share one template (`insights-*.html`). Each has:
- Slim navy hero with category eyebrow + breadcrumb + read-time meta
- A wide lead image that overlaps the hero
- A **share bar** at the top and again at the foot (LinkedIn · Facebook · X · Copy link). Share URLs are built at click time from `window.location.href` + `document.title`, so they work as soon as the site is publicly reachable. Copy link uses the Clipboard API and shows a brief "Copied!" toast.
- Body in a comfortable ~70ch reading measure, with an accent-tinted closing CTA box
- A "More insights" grid (2–3 cards) plus a link back to insights.html
- Per-article `<head>` carries unique title, description (= the card excerpt), Open Graph + Twitter Card tags, and a `BreadcrumbList` + `BlogPosting` JSON-LD pair

> **Share-card preview note:** LinkedIn / Facebook / X can only fetch real preview cards from a publicly reachable URL — they can't read `localhost`. To test the share previews, share the live GitHub Pages URL after deploying. The buttons themselves work locally; only the rich preview rendering needs a public URL.

---

## Accessibility & SEO

- **`<meta name="robots" content="noindex,nofollow">` on every page** while this POC is in review — the site is not meant to be indexed yet. Remove from each `<head>` when Marketing approves the copy and you're ready to publish.
- Unique `<title>` and meta description per page.
- One `<h1>` per page; semantic landmarks throughout.
- Breadcrumb on every sub-page (rendered visually + as `BreadcrumbList` JSON-LD).
- Site-wide `MedicalOrganization` JSON-LD on the home page with `parentOrganization` (Penn State Health) and three `subOrganization` entries; per-program `MedicalBusiness` JSON-LD on the program detail pages.
- `FAQPage` JSON-LD on the contact page; `BlogPosting` JSON-LD on each article.
- Visible focus rings, AA contrast, keyboard navigation, `prefers-reduced-motion` respected.
- No PII collected — contact is by phone (`tel:` links) and external program-site links only.

---

## Phones

- **833-PSH-CMPN** · `tel:18337742676` — Primary Care &amp; Weight Management · Mon–Fri 7 a.m.–7 p.m.
- **1-833-774-5395** · `tel:18337745395` — Executive Health
