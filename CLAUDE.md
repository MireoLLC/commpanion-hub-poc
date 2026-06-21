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
├─ insights.html            (Insights landing — card grid + filters)
├─ insights-care-team.html          (Article 1 — Our approach)
├─ insights-first-visit.html        (Article 2 — Getting started · Coral)
├─ insights-stop-guessing.html      (Article 3 — Campaigns · Teal)
├─ insights-beyond-physical.html    (Article 4 — Our approach · Gold)
├─ insights-healthier-teams.html    (Article 5 — For organizations)
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
- Nav (sentence case, active page highlighted): Home · About · **Programs ▾** (dropdown: Primary Care, Weight Management, Executive Health, All programs) · Insights · For organizations · Contact
- Right: primary button **"Get started"** → contact.html
- Mobile: hamburger; Programs becomes an expandable group.

### Global footer (identical on every page, --ink)
- Reverse logo + "Powered by Penn State Health."
- Columns: Programs (the 3 internal pages + the 3 live sites), Company (About, Insights, For organizations, Contact), Legal (Privacy → https://www.pennstatehealth.org/privacy-legal-notices · Non-Discrimination → https://www.pennstatehealth.org/non-discrimination).
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

### 5.7 insights.html — Insights (blogs & campaigns)
- Breadcrumb: Home / Insights
- **Hero (navy, slim):** eyebrow "Insights"; H1 **"Ideas, stories, and care that travels."** subhead **"Perspectives, guides, and campaigns from across the COMMpanion programs."**
- **Category filter chips** (JS-filtered, no reload): All · Our approach · Getting started · Campaigns · For organizations. "All" active by default.
- **Card grid** (responsive 3-up → 1-up): one card per article — image (from `image_assets/`), category tag chip, title, excerpt (the share-preview text below), and "Read more →" to the article page. Cards carry a `data-category` for filtering. Program-specific cards may use that program's accent on the category chip (Coral / Teal / Gold); brand-level cards use COMMpanion Blue.

Cards (in this order):
1. **A care team in your corner: the idea behind COMMpanion** — Our approach — → insights-care-team.html — excerpt: "Healthcare works better when someone knows you. The thinking behind COMMpanion, Penn State Health's family of virtual care programs."
2. **What your first COMMpanion video visit is really like** — Getting started (Coral) — → insights-first-visit.html — excerpt: "Wondering what virtual primary care actually feels like? A walk-through of your first visit with COMMpanion Primary Care."
3. **Stop guessing. Start getting answers.** — Campaigns (Teal) — → insights-stop-guessing.html — excerpt: "Skip the guesswork. See what medically guided weight care looks like with COMMpanion Weight Management."
4. **Beyond the annual physical: whole-person care for busy leaders** — Our approach (Gold) — → insights-beyond-physical.html — excerpt: "A physical is a snapshot. Real executive health is a year-round plan."
5. **Healthier teams, fewer missed days** — For organizations — → insights-healthier-teams.html — excerpt: "Offering great care shouldn't be complicated. How COMMpanion helps organizations keep their people healthier — and more present."

### 5.8 Article template (all five article pages share this layout)
- Breadcrumb: Home / Insights / [Title]
- **Article header:** category eyebrow (in the article's accent where program-specific), H1 title, a meta line "By the COMMpanion team · [N] min read" (no fabricated author names or dates).
- **Lead image:** full-width hero image from `image_assets/`, meaningful `alt`.
- **Share bar** (see §5.9) directly under the header, and again at the foot of the article.
- **Body:** the multi-section copy in §5.10, using H2 subheads. Comfortable reading measure (max ~70ch), Roboto body 16/26.
- **Closing CTA box** (accent-tinted): the article's call to action + button (per §5.10).
- **"More insights":** 2–3 cards linking to other articles + a link back to insights.html.
- Per-article `<head>`: unique title, description (= excerpt), and Open Graph/Twitter tags (see §5.9).

### 5.9 Share bar (reusable component)
- Buttons: **LinkedIn · Facebook · X · Copy link** (Lucide icons, brand style, sentence-case labels).
- Build share URLs at runtime from the page's own `window.location.href` (and document title), so they work once deployed:
  - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=ENCODED_URL`
  - Facebook: `https://www.facebook.com/sharer/sharer.php?u=ENCODED_URL`
  - X: `https://twitter.com/intent/tweet?url=ENCODED_URL&text=ENCODED_TITLE`
  - Copy link: copy `location.href` to clipboard via the Clipboard API, show a brief "Copied!" confirmation.
- Share buttons open in a new tab (`rel="noopener"`). No SDKs, no tracking scripts.
- **Per-article Open Graph + Twitter Card tags** in `<head>`: `og:title`, `og:description` (the excerpt), `og:image` (absolute URL to the article's image), `og:type=article`, `og:url`, `twitter:card=summary_large_image`. Add `JSON-LD` `Article`/`BlogPosting` per article.
- **Note (put in README):** social platforms can only generate real preview cards from a publicly reachable URL — they cannot read `localhost`. Test the buttons by sharing the live public URL once deployed.

### 5.10 Article copy (use verbatim)

**Article 1 — insights-care-team.html · Our approach · brand (navy/blue)**
H1: **A care team in your corner: the idea behind COMMpanion**
Read time: 3 min
> Most of us know the feeling of explaining our health history from scratch to someone we've never met — and may never see again. Care that should feel personal ends up feeling like a series of disconnected transactions. COMMpanion was built on a different premise: good care starts with someone who actually knows you.
## Care built on relationship, not transactions
At the center of every COMMpanion program is a dedicated care team — providers, nurses, and health navigators who follow your story over time. You can reach them by message or phone, not only at a once-a-year appointment. The goal isn't to replace the human relationship at the heart of medicine with technology; it's to make that relationship easier to keep up with in a busy life.
## One idea, three programs
COMMpanion isn't a single clinic — it's a family of virtual care programs, each shaped for a different need. Primary Care brings everyday, relationship-based care into a convenient virtual setting. Weight Management offers medically guided, specialist-led support for lasting weight health. Executive Health takes a concierge, whole-person approach for busy professionals. Different programs, one standard of care.
## Virtual-first, but never impersonal
Virtual-first doesn't mean hands-off. It means meeting you where you are — at home, at work, on your schedule — while keeping the continuity that makes care effective. Your plan is built around your history and goals, and it adjusts as life changes.
## Powered by Penn State Health
Behind every COMMpanion program is the clinical expertise of Penn State Health — the convenience of virtual care without trading away the standards you'd expect from an academic health system.
CTA: **Explore the COMMpanion programs** → programs.html

**Article 2 — insights-first-visit.html · Getting started · Primary Care (Coral)**
H1: **What your first COMMpanion video visit is really like**
Read time: 4 min
> If you've never had a primary care visit over video, a little skepticism is fair. Can a screen really stand in for the exam room? With COMMpanion Primary Care, the honest answer is that for a great deal of everyday primary care, it not only works — it's often easier. Here's what to expect.
## Before your visit
You schedule a time that fits your day and share a bit about what's going on. There's no waiting room and no arriving early to fill out forms on a clipboard. You connect from wherever you're comfortable — home, office, or anywhere private.
## During the visit
You meet your primary care provider over video — the same provider you build a relationship with over time, not whoever happens to be free. They take time to understand your history, talk through your concerns, and start a plan that's yours. It's a conversation, not a conveyor belt.
## Between visits
This is where virtual-first care shines. A question after the visit? Message your care team. Need a refill or a referral to a specialist? Your team handles the navigation. You're not on your own until the next appointment — support is ongoing.
## When you need care now
COMMpanion Primary Care includes urgent care visits Monday through Friday, so a sudden issue doesn't have to mean a crowded clinic. And when something genuinely needs in-person attention, your team helps coordinate the next step instead of leaving you to figure it out.
CTA: **See what Primary Care includes** → primary-care.html (secondary: visit the full site, https://www.commpanion.health/)

**Article 3 — insights-stop-guessing.html · Campaigns · Weight Management (Teal)**
H1: **Stop guessing. Start getting answers.**
Read time: 4 min
> There has never been more noise around weight loss — trendy diets, online "programs," and compounded medications sold with big promises and little oversight. It's easy to spend a lot of time, money, and hope on guesswork. COMMpanion Weight Management is built on the opposite approach: real answers, from real specialists.
## The trouble with guessing
Fad diets and unregulated products treat weight as a simple willpower problem. But weight health is medical, and it's individual. Without an actual evaluation, you're guessing — and guessing tends to mean cycles of short-term results and long-term frustration.
## What medically guided care looks like
COMMpanion Weight Management starts with board-certified obesity medicine specialists who look at your full picture — history, health, and goals — and build a treatment plan around you. It's care, not a product you order and hope works.
## Medication, when it's right — and never compounded
When medication is appropriate, your specialist may prescribe an FDA-approved GLP-1 medication — never a compounded version. That distinction matters: a treatment with a clear safety and regulatory standard behind it, prescribed and monitored by a clinician who knows your case.
## Coaching that makes it stick
Medication and visits are only part of the picture. The program includes months of one-on-one coaching with a dietitian or nurse, because lasting change comes from support that continues between appointments.
CTA: **Learn about Weight Management** → weight-management.html (secondary: visit the full site, https://www.weightloss.commpanion.health/)

**Article 4 — insights-beyond-physical.html · Our approach · Executive Health (Gold)**
H1: **Beyond the annual physical: whole-person care for busy leaders**
Read time: 3 min
> Busy leaders tend to optimize everything — calendars, teams, performance — except, often, their own health. The annual physical gets booked (sometimes), checked off, and forgotten until next year. COMMpanion Executive Health is built on the idea that health deserves the same year-round attention as anything else that matters.
## The physical is the starting line, not the finish
A comprehensive annual physical is where it begins — a thorough look at where you are today. But a single snapshot can't capture a year of stress, travel, sleep, and demands. The physical becomes the foundation for a tailored plan, not the whole plan itself.
## Whole-person, not just lab values
Real health is more than bloodwork. COMMpanion Executive Health spans the dimensions that actually shape how you feel and perform: medical care, nutrition, physical fitness, mental health support, and stress reduction and mindfulness. A view of the whole person, not just a chart.
## Care that fits a packed calendar
The program is designed around how busy professionals actually live. Care can come to you — in-clinic, at home, at the worksite, or by telemedicine — so staying well doesn't require clearing your schedule. Your physician and care team stay connected throughout the year.
CTA: **Explore Executive Health** → executive-health.html (secondary: visit the full site, https://executive.commpanion.health/)

**Article 5 — insights-healthier-teams.html · For organizations · brand (navy/blue)**
H1: **Healthier teams, fewer missed days**
Read time: 4 min
> Every benefits leader knows the gap between offering a health benefit and getting people to actually use it. Coverage that's hard to access doesn't move the needle on a workforce's health. COMMpanion is built to close that gap — convenient virtual care people will actually use, backed by a name they trust.
## Access is the whole game
The best care is the care that gets used. By making primary care, weight management, and executive health available virtually — on an employee's schedule, without the friction of waiting rooms and weeks-long waits — COMMpanion turns a benefit on paper into care in practice.
## One partner, three programs
Rather than stitching together separate point solutions, organizations get one partner across the needs of a real workforce: everyday primary care, medically guided weight health, and concierge executive care for leadership. One relationship, one standard of care.
## Backed by Penn State Health
COMMpanion is Powered by Penn State Health — the clinical credibility of a leading academic health system, delivered in a modern, convenient way. A benefit employees recognize and trust.
## How partnership works
Getting started is straightforward: we learn about your organization, recommend the right mix of programs, onboard your people, and stay engaged with ongoing support.
CTA: **Talk to our team about COMMpanion for organizations** → organizations.html

---

## 6. Interactions (`js/main.js`, shared across pages)

- Mobile hamburger nav with the Programs group expandable (accessible: `aria-expanded`, Esc to close).
- Programs dropdown on desktop (hover/focus + click; keyboard accessible).
- Active-page highlight in nav (detect current path).
- Smooth-scroll for in-page anchors with sticky-header offset.
- Header shadow/shrink after scroll.
- Section scroll-reveal (IntersectionObserver), gentle, staggered.
- FAQ accordion (contact page): single-open or multi-open, `aria-expanded`, keyboard operable.
- Insights landing: category-chip filtering of the card grid (show/hide by `data-category`, no reload; "All" resets). Active chip styled.
- Share bar (article pages): build LinkedIn/Facebook/X URLs from `window.location.href` + title at click time; "Copy link" uses the Clipboard API with a brief "Copied!" confirmation.
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
