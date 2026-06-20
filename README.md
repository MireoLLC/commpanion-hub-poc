# COMMpanion Hub — POC

A multi-page static site for the COMMpanion umbrella hub — **Powered by Penn State Health**.

This is the missing umbrella for Penn State Health's three virtual care programs (Primary Care, Weight Management, Executive Health). It introduces each program at the hub level and links out to the live program sites for the full experience.

**Status:** Proof of concept / "art of the possible" for leadership. All copy is **DRAFT pending Penn State Health Marketing approval**. Stock photography in `image_assets/` is **placeholder** for approved PSH photography.

---

## What's in here

```
commpanion-hub-poc/
├─ index.html               Home
├─ about.html               About COMMpanion
├─ programs.html            All programs + comparison table
├─ primary-care.html        Program detail — Coral accent
├─ weight-management.html   Program detail — Teal accent
├─ executive-health.html    Program detail — Gold accent (rule only)
├─ organizations.html       For employers & organizations
├─ contact.html             Contact + FAQ accordion
├─ css/styles.css           Shared stylesheet
├─ js/main.js               Shared script (nav, dropdown, reveal, FAQ)
├─ image_assets/            Logo SVG, favicon, stock photos (placeholders)
└─ README.md
```

No framework. No build step. No npm. Each page opens directly from disk and works the same on GitHub Pages.

Because there is no build step, the shared header/footer markup is **duplicated** in each HTML file (fetch-based partial includes would break under `file://`). If you change one, mirror the change across all 8.

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

## Accessibility & SEO

- Unique `<title>` and meta description per page.
- One `<h1>` per page; semantic landmarks throughout.
- Breadcrumb on every sub-page (rendered visually + as `BreadcrumbList` JSON-LD).
- Site-wide `MedicalOrganization` JSON-LD on the home page with `parentOrganization` (Penn State Health) and three `subOrganization` entries; per-program `MedicalBusiness` JSON-LD on the program detail pages.
- `FAQPage` JSON-LD on the contact page.
- Visible focus rings, AA contrast, keyboard navigation, `prefers-reduced-motion` respected.
- No PII collected — contact is by phone (`tel:` links) and external program-site links only.

---

## Phones

- **833-PSH-CMPN** · `tel:18337742676` — Primary Care &amp; Weight Management · Mon–Fri 7 a.m.–7 p.m.
- **1-833-774-5395** · `tel:18337745395` — Executive Health
