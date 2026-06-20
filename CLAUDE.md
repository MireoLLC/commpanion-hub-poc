# CLAUDE.md — COMMpanion Hub (POC, multi-page)

Claude Code reads this file automatically. It is the complete brief for building the COMMpanion umbrella hub as a **multi-page static site**. Where exact copy or tokens are given, use them verbatim. Do not invent statistics, credentials, or claims not in this file.

**Project folder:** `commpanion-hub-poc/` (you are pointed at it)
**Status:** Proof of concept / "art of the possible" for leadership. All copy is DRAFT, pending Penn State Health Marketing approval.

---

## 1. What this is

COMMpanion is Penn State Health's family of virtual care programs. Today there is **no umbrella site** — only three separate program sites. This POC builds that missing umbrella as a small **multi-page** marketing site.

- **Hub-level only.** Do NOT rebuild the full program sites. The internal program pages here are rich *introductions* that each link OUT to the live program site for the full experience.
- **Audience:** balanced — individuals/patients and employers/organizations.

**Brand architecture (mirror in structure + JSON-LD):**
Penn State Health (parent) → **COMMpanion, Powered by Penn State Health** (consumer brand) → three service lines:
- COMMpanion Primary Care → https://www.commpanion.health/
- COMMpanion Weight Management → https://www.weightloss.commpanion.health/
- COMMpanion Executive Health → https://executive.commpanion.health/

(The brand guide labels the third line "Executive Care," but the live program and this hub use **"Executive Health."**)

---

## 2. Tech & constraints

- Static multi-page site: semantic HTML5 + modern CSS + vanilla JS. **No framework, no build step, no npm dependencies.** Each page opens directly and deploys to GitHub Pages with zero config.
- **Multiple HTML pages** (see §3) sharing a consistent header, nav, and footer. Because there is no build step and pages must work via `file://` and GitHub Pages, **duplicate the shared header/footer markup in each page** (do not use fetch-based partial includes — they fail on `file://`). Keep that shared markup identical across pages; treat the header/footer in `index.html` as the source of truth.
- Fonts via Google Fonts `<link>`. No other third-party scripts.
- Fully responsive (360px → 1440px+), keyboard-accessible (visible focus), respects `prefers-reduced-motion`.
- High Lighthouse scores, no layout shift.
- **Do not run git or deploy.** Build files locally only. No `git push/commit/init`, no repo creation, no deploy — the human handles all git manually. Your job ends at writing the files and the README.

---

## 3. File structure (use the existing folder)

```
commpanion-hub-poc/
├─ index.html               (Home)
├─ about.html               (About COMMpanion)
├─ programs.html            (All programs + comparison)
├─ primary-care.html        (Program detail — Coral accent)
├─ weight-management.html   (Program detail — Teal accent)
├─ executive-health.html    (Program detail — Gold accent)
├─ organizations.html       (For employers)
├─ contact.html             (Contact + FAQ)
├─ css/
│  └─ styles.css            (one shared stylesheet for all pages)
├─ js/
│  └─ main.js               (one shared script: nav, accordion, reveal, segmenter)
├─ image_assets/            (ALREADY EXISTS — stock photos + COMMpanion_Logo.svg)
│  ├─ COMMpanion_Logo.svg   (official logo — use this; see §4.3)
│  └─ (stock photos — inventory & map; see §8)
└─ README.md                (preview + manual deploy steps for the human)
```

---

## 4. Brand system — follow the official style guide exactly

### 4.1 Color (CSS custom properties)
Navy/blue-anchored. Teal is NOT a brand primary — it is only the Weight Management accent.
```
--psh-navy:   #1B365D   /* Penn State Navy — dark heroes, headings, navy bands */
--comm-blue:  #2E5A8A   /* COMMpanion Blue — primary accent, links, buttons */
--comm-sky:   #4A90C2   /* COMMpanion Sky — secondary accent, icon circles */
--light-sky:  #B5D1E8
--cloud:      #F1F5F9   /* light section background */
--white:      #FFFFFF
--slate-ash:  #6B7280   /* secondary text */
--ink:        #112133   /* deepest background, footer */
--hairline:   #E2E8EE
/* Service-line accents — use SPARINGLY (page themes, active states, accent rules) */
--accent-primary: #FF6B4A   /* Primary Care — Vivid Coral */
--accent-weight:  #00BFA5   /* Weight Management — Vital Teal */
--accent-exec:    #FFD100   /* Executive Health — PSH Gold */
```
Hub-level pages (Home, About, Programs, Organizations, Contact) live in navy/blue/sky. Each **program detail page** is themed with its own accent (coral / teal / gold) used as a restrained highlight (hero accent rule, section labels, buttons-on-hover, the active service tag) — everything else stays navy/blue. PSH Gold fails contrast for text on white — use it only as a shape/rule, never small text.

### 4.2 Typography
- **Roboto** — headers AND body. 400 / 500 / 700 + italics. Google Fonts.
- **Roboto Condensed** — accent/"call attention" text and captions (italic). 300 / 400 / 600. Google Fonts.
- Scale: H1 48/56 (fluid), H2 32/40, H3 24/32, body 16/26 (Regular), body-short 14/22 (Medium), caption 12/18 (Roboto Condensed Italic), button 15 Roboto Medium **sentence case, never all caps**.
- Eyebrows/labels: Roboto Condensed SemiBold ~13px, COMMpanion Blue, light tracking, sentence case (avoid all-caps).
- Emphasis device (sparingly): one key word in Roboto Condensed Italic in --comm-sky.

### 4.3 Logo & endorsement
- The COMMpanion wordmark always carries **"Powered by Penn State Health."**
- **Use `image_assets/COMMpanion_Logo.svg`.** Inspect it first (colors, whether it includes the endorsement line, whether it can recolor via `currentColor`).
  - Light backgrounds: use as-is.
  - Dark navy header/hero/footer: render a **reverse (white)** version — recolor if possible, else CSS knockout (`filter: brightness(0) invert(1)`), verify contrast. Add the "Powered by Penn State Health" line in Roboto if the SVG lacks it.
- Favicon = the **"O" mark** at 32px (isolate from the logo if possible, else a simple navy/sky "O" placeholder).

### 4.4 Icons
- **Lucide** (lucide.dev) — line style, 1.5px stroke, 24px grid, inline SVG (no runtime library).
- Featured callouts: **duotone-in-circle** — white Lucide icon inside a solid **Navy or Sky** circle (not teal).

---

## 5. Pages, structure & copy

Global rules for every page: shared sticky header (reverse logo on navy) + footer; one `<h1>` per page; breadcrumb on all sub-pages (Home / …); consistent section rhythm (alternate white and --cloud; one --ink navy band where noted).

### Global header / nav (identical on every page)
- Left: COMMpanion logo (reverse) + "Powered by Penn State Health."
- Nav (sentence case, active page highlighted): Home · About · **Programs ▾** (dropdown: Primary Care, Weight Management, Executive Health, All programs) · For organizations · Contact
- Right: primary button **"Get started"** → contact.html
- Mobile: hamburger; Programs becomes an expandable group.

### Global footer (identical on every page, --ink)
- Reverse logo + "Powered by Penn State Health."
- Columns: Programs (the 3 internal pages + the 3 live sites), Company (About, For organizations, Contact), Legal (Privacy → https://www.pennstatehealth.org/privacy-legal-notices · Non-Discrimination → https://www.pennstatehealth.org/non-discrimination).
- Phones: 833-PSH-CMPN (Primary Care & Weight Management); 1-833-774-5395 (Executive Health).
- `© Penn State Health` + current year.

---

### 5.1 index.html — Home
- **Hero (dark navy):** eyebrow "Penn State Health virtual care"; H1 **"Your care team, in your corner."** (one word may be Roboto Condensed Italic / Sky); subhead **"COMMpanion is Penn State Health's family of virtual care programs — primary care, weight management, and executive health — each built around a dedicated team that knows you and a plan made just for you."**; buttons **"Explore programs"** → programs.html and **"For organizations"** → organizations.html; trust chip "Backed by the clinical expertise of Penn State Health." Optional approved photo with navy scrim.
- **What is COMMpanion (cloud):** H2 **"One companion. Many ways to feel your best."** + the two paragraphs from §5.2-about (short version), with a "Learn about COMMpanion →" link to about.html.
- **Programs preview (white):** H2 **"Three programs, *one* standard of care."** + lead "Choose the path that fits where you are today." Three cards (each themed with its accent): name, one-liner, 1–2 sentence overview, "Learn more →" linking to the **internal** program page. (The full external site link lives on the detail page.)
- **The COMMpanion difference (cloud):** four duotone-in-circle pillars (see §5.6 difference list).
- **Organizations teaser (navy --ink band):** short pitch + **"COMMpanion for organizations →"** → organizations.html.
- **Closing CTA (white):** "Ready to meet your COMMpanion?" + buttons to programs.html and contact.html.

### 5.2 about.html — About COMMpanion
- Breadcrumb: Home / About
- **Hero (navy, slimmer):** H1 **"Care that knows you."** subhead about the COMMpanion idea.
- **The idea:** **"COMMpanion brings the relationship of a trusted care team into a convenient, virtual-first experience. Whether you need everyday primary care, medically guided support on a weight-loss journey, or a concierge approach to executive wellness, every COMMpanion program shares the same foundation."** + **"Real Penn State Health clinicians. A plan built around you. And a care team you can reach when you actually need them."**
- **How COMMpanion works (step sequence, 4 steps):**
  1. **Choose your program** — Pick the COMMpanion program that fits your needs today.
  2. **Meet your care team** — Connect with Penn State Health clinicians who take time to understand you.
  3. **Get a plan built around you** — Receive an individualized plan shaped by your history and goals.
  4. **Stay supported** — Reach your team by message or phone, with care that adjusts as life changes.
- **The COMMpanion difference:** the four pillars (§5.6).
- **Backed by Penn State Health:** H2 **"The expertise of Penn State Health, made personal."** + **"Every COMMpanion program is staffed by Penn State Health clinicians and built on the standards of care you'd expect from an academic health system — now delivered in a more convenient, connected way."**
- CTA to programs.html.

### 5.3 programs.html — All programs
- Breadcrumb: Home / Programs
- **Hero (navy):** H1 **"Three programs, one standard of care."** subhead "Explore each COMMpanion program and find the right fit."
- **Three program sections** (stacked, each accent-themed): name, one-liner, overview (2–3 sentences from §5.4), "ideal for" tag, two buttons — **"Learn more"** (internal page) and **"Visit the full site →"** (external live site, new tab).
- **Comparison table** (responsive; on mobile, stack to cards): rows = Best for / Format / Care team / How to start; columns = Primary Care, Weight Management, Executive Health. Keep cells short and factual (derive only from §5.4 content; no invented data).
- CTA to contact.html.

### 5.4 Program detail pages (accent-themed)
Each page: breadcrumb (Home / Programs / [Name]); **program hero** in navy with the service-line accent as a rule/eyebrow; overview; a **"what's included"** features grid (duotone-in-circle icons); a short **how it works** step row; a **"who it's for"** note; and a prominent **external CTA** to the full live site. End each with a secondary link back to programs.html.

**primary-care.html — Coral (#FF6B4A)**
- Eyebrow: Primary Care · H1 **"Primary care on your terms."**
- Overview: **"Build a lasting relationship with a dedicated primary care provider and care team — without the waiting room. COMMpanion Primary Care brings well visits, urgent care, messaging, and everyday support into one convenient virtual experience."**
- What's included (grid): Personalized healthcare plan · Scheduled video visits · Urgent care visits (Mon–Fri, 7 a.m.–7 p.m.) · Unlimited care-team messaging & calls · Prescription refills · Referral & specialist navigation.
- How it works: 1) Join — individual or through your employer. 2) Meet your PCP and care team. 3) Build your personalized health plan. 4) Get proactive, year-round support.
- Who it's for: Individuals and employers who want convenient, relationship-based primary care.
- CTA: **"Visit the full Primary Care site →"** https://www.commpanion.health/ · Call 833-PSH-CMPN.

**weight-management.html — Teal (#00BFA5)**
- Eyebrow: Weight Management · H1 **"Real doctors. Real medications. Real results."** (sub: *Stop guessing. Start getting answers.* in Roboto Condensed Italic)
- Overview: **"A medically guided path to lasting weight health — led by board-certified obesity medicine specialists, supported by FDA-approved medication when appropriate, and grounded in real lifestyle coaching."**
- What's included (grid): Board-certified obesity medicine specialists · FDA-approved GLP-1 medications, never compounded · Personalized treatment plan · Six months of dietitian/nurse coaching · Insurance & prior-authorization support · Ongoing dose management and follow-up.
- How it works: 1) Reach out — call or request a callback. 2) Meet an obesity medicine specialist. 3) Get a personalized treatment plan. 4) Stay supported with coaching and follow-up.
- Who it's for: Individuals and employers seeking expert, medically supervised weight care.
- CTA: **"Visit the full Weight Management site →"** https://www.weightloss.commpanion.health/ · Call 833-PSH-CMPN.

**executive-health.html — Gold (#FFD100)**
- Eyebrow: Executive Health · H1 **"Personalized care for your busy lifestyle."**
- Overview: **"A concierge approach to health for busy professionals — anchored by a comprehensive annual physical and extending across the dimensions of well-being, delivered however suits your schedule."**
- What's included (grid): Comprehensive annual physical · Medical care & easy prescription renewals · Nutritional coaching · Physical fitness · Mental health support · Stress reduction & mindfulness · Aesthetic medicine. (Delivered in-clinic, at home, at the worksite, or via telemedicine.)
- How it works: 1) Begin with your comprehensive annual physical. 2) Build a tailored yearly health plan. 3) Access services across the year, your way. 4) Stay connected to your physician and nurse.
- Who it's for: Executives and organizations investing in premium, whole-person care.
- CTA: **"Visit the full Executive Health site →"** https://executive.commpanion.health/ · Call 1-833-774-5395.

### 5.5 organizations.html — For employers & organizations
- Breadcrumb: Home / For organizations
- **Hero (navy):** H1 **"Bring COMMpanion to your people."** subhead **"Convenient, high-quality virtual care that keeps your workforce healthier and more engaged."**
- **Why COMMpanion for organizations (3–4 value cards):** Better access to care · Healthier, more present employees · One trusted Penn State Health partner · Programs that flex to your workforce.
- **How partnership works (step row):** 1) Tell us about your organization. 2) We recommend the right program mix. 3) We onboard your people. 4) Ongoing support and reporting.
- **Which programs fit:** brief recap of the three with internal links.
- CTA: **"Talk to our team →"** → contact.html (or https://www.commpanion.health/organizational-membership).

### 5.6 contact.html — Contact & get started
- Breadcrumb: Home / Contact
- **Hero (navy, slim):** H1 **"Ready to meet your COMMpanion?"** subhead "Choose your program to get started, or reach our care team directly."
- **Program contact cards (3):** each with the program name, the right phone, hours, and a "Visit site →" external link.
  - Primary Care & Weight Management: **833-PSH-CMPN (833-774-2676)**, Mon–Fri 7 a.m.–7 p.m. → `tel:18337742676`
  - Executive Health: **1-833-774-5395** → `tel:18337745395`
- **FAQ accordion (interactive):** 5–6 Q&As derived only from known facts, e.g.: "What is COMMpanion?" · "Is COMMpanion part of Penn State Health?" (yes — Powered by Penn State Health) · "Do I need insurance?" (varies by program) · "Is my visit virtual or in person?" (virtual-first; Executive Health also in-clinic/at-home/worksite) · "How do I get started?" (choose a program or call). Keep answers short and factual; no invented specifics.
- Note: no personal/health data is collected on this site — contact is by phone and links only (no PII forms in the POC).

### The four "COMMpanion difference" pillars (reuse on Home and About)
1. **A dedicated care team** — Providers, nurses, and navigators who know you by name — reachable by message or phone. (icon: users)
2. **A plan built around you** — Care shaped by your history, goals, and life — and adjusted as things change. (icon: clipboard-list)
3. **Virtual-first convenience** — Visits, messaging, and support that fit your schedule, from wherever you are. (icon: monitor-check)
4. **Backed by Penn State Health** — The clinical expertise and trust of a leading academic health system. (icon: shield-check)

---

## 6. Interactions (`js/main.js`, shared across pages)

- Mobile hamburger nav with the Programs group expandable (accessible: `aria-expanded`, Esc to close).
- Programs dropdown on desktop (hover/focus + click; keyboard accessible).
- Active-page highlight in nav (detect current path).
- Smooth-scroll for in-page anchors with sticky-header offset.
- Header shadow/shrink after scroll.
- Section scroll-reveal (IntersectionObserver), gentle, staggered.
- FAQ accordion (contact page): single-open or multi-open, `aria-expanded`, keyboard operable.
- Comparison table → stacks to cards on mobile (CSS).
- **All motion gated behind `prefers-reduced-motion: no-preference`.** Pages fully readable/navigable with JS disabled.
- No console errors.

---

## 7. SEO, AI-search & accessibility (per page)

- Unique `<title>` and meta description per page; semantic landmarks; one `<h1>`; logical headings; breadcrumb markup.
- Open Graph + Twitter Card per page (`og:image` → an image in `image_assets/`, 1200×630).
- **JSON-LD:** site-wide `MedicalOrganization` (name "COMMpanion", `parentOrganization` "Penn State Health", url, telephone) with three `subOrganization` entries; on each program detail page add a `MedicalBusiness`/`Service`-style entry for that program with its URL. Breadcrumb `BreadcrumbList` on sub-pages.
- Descriptive `alt` on every image; `aria-label` on icon-only controls; visible focus rings; AA contrast; tap targets ≥ 44px.

---

## 8. Images — use `image_assets/` (already populated)

- **First, inventory `image_assets/`** (list files). Map stock photos to: home hero, each program detail hero/panel, about, organizations. Prefer warm, human, clinical-but-approachable images. Optimize for web; meaningful `alt` on each.
- These stock photos are **placeholders** for approved PSH photography — say so in README.
- The logo is provided: **`image_assets/COMMpanion_Logo.svg`** — use per §4.3.
- **Do NOT scrape images/logos from the live Wix sites** (copyrighted).

---

## 9. Deployment — MANUAL, done by the human (do NOT perform)

Do not push or deploy. Write these steps into `README.md` for the human:
1. Push the repo to GitHub (`main`). *(Human does this.)*
2. Settings → Pages → Source: Deploy from a branch → `main` / root → Save.
3. Publishes at `https://<user-or-org>.github.io/commpanion-hub-poc/` in ~1 min.
4. Local preview: open `index.html`, or run `python3 -m http.server` → `http://localhost:8000`.

---

## 10. Quality bar & notes

- "Art of the possible" for leadership — polished, intentional, unmistakably COMMpanion (navy/blue, Roboto, the real brand system), not templated.
- All copy DRAFT pending **Penn State Health Marketing approval**.
- No PII collected — links and `tel:` only.
- Two phone numbers (general vs. Executive Health) are intentional.
- Spend visual boldness in the heroes and the per-program accents; keep everything else quiet and consistent across pages.
