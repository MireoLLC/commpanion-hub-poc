# CARE_TEAM.md — COMMpanion Care Team page (POC add-on)

This is an **add-on to `CLAUDE.md`**. Read `CLAUDE.md` first for the brand system, shared components, and constraints (Roboto + navy/blue palette, Lucide icons, duotone-in-circle, sticky header, `noindex`/`robots.txt` guards, and **no git / no deploy** — just write files). This file adds **one new page** and a **nav change**.

These care team profiles are **fictional / sample** content for the POC. They are NOT real Penn State Health clinicians. Do not emit `Person` structured data for them (see §5).

---

## 1. Nav change — apply on EVERY page

Turn **About** into a dropdown, mirroring the existing **Programs ▾** dropdown pattern (same styling, same dropdown behavior, same mobile-expandable treatment, and the same fix already applied to the Programs dropdown so menu items use **dark navy text on the light panel** — never white-on-white):

- **About ▾**
  - About COMMpanion → `about.html`
  - Care team → `care-team.html`

Also add **Care team** to the footer's Company column (next to About) on every page. Keep active-state logic correct — highlight only the current page's nav item; do not double-highlight.

---

## 2. New page — `care-team.html`

- **Breadcrumb:** Home / About / Care team
- **Hero (navy, slim):** eyebrow "Our people"; H1 **"Meet your care team."**; subhead **"COMMpanion care is built on relationships. Here are some of the people who make it personal."**
- **Filter chips** (JS-filtered by `data-program`, same pattern as the Insights filters): All · Primary Care · Weight Management · Executive Health. "All" active by default.
- **Card grid** (responsive 3-up → 2-up → 1-up). Each card:
  - **Photo** at top (the specific file named in §3), good `alt` text (name + role).
  - **Name + credentials** (H3).
  - **Role / focus tagline** (one line).
  - **Program tag chip**, colored by program: Primary Care = Coral `#FF6B4A`, Weight Management = Teal `#00BFA5`, Executive Health = Gold `#FFD100` (gold as a chip fill is fine; keep chip text dark for contrast), cross-program = COMMpanion Blue `#2E5A8A`.
  - **Click to expand inline** (the card itself is an accessible toggle — `<button>`/`aria-expanded`, keyboard operable): expanding reveals the **bio** plus a row of **focus-area chips**. Clicking again collapses. Smooth height transition; respect `prefers-reduced-motion`.
- Keep the card styling consistent with the rest of the site (white cards, hairline border, soft hover lift, rounded corners).
- Close the page with a short CTA band: "Care that knows you, across every program." + button to `programs.html`.

---

## 3. The care team (10 profiles — use verbatim; fictional)

Each entry: **photo file → name, credentials · role · program (chip) · focus-area chips · bio (expanded view).**

1. **`image_assets/Doc1.jpeg`** — **Dr. Daniel Cho, MD** · Primary Care Physician · **Primary Care**
   Focus: Preventive care · Everyday primary care · Chronic condition management
   Bio: "Daniel is a board-certified family medicine physician who believes the best care comes from knowing his patients over time. Through COMMpanion's virtual model, he focuses on building lasting relationships and catching small issues before they become big ones."

2. **`image_assets/Doc2.jpeg`** — **Dr. Marcus Reyes, MD** · Medical Director, Primary Care · **Primary Care**
   Focus: Care model · Clinical quality · Internal medicine
   Bio: "Marcus leads the clinical vision for COMMpanion Primary Care. With a background in internal medicine, he has spent his career expanding access to high-quality care — and sees virtual-first medicine as the natural next step."

3. **`image_assets/Doc3.jpeg`** — **Dr. Howard Klein, DO** · Medical Director, Weight Management · **Weight Management**
   Focus: Obesity medicine · Metabolic health · Evidence-based weight care
   Bio: "Howard is board-certified in obesity medicine and takes an evidence-based, judgment-free approach to weight health. He helps patients move past fad diets toward treatment plans grounded in real science."

4. **`image_assets/Doc4.jpeg`** — **Amara Okafor, CRNP** · Nurse Practitioner, Primary Care · **Primary Care**
   Focus: Everyday visits · Chronic care · Care coordination
   Bio: "Amara brings a whole-person approach to virtual visits, coordinating care between patients, providers, and specialists so nothing falls through the cracks."

5. **`image_assets/Doc6.jpeg`** — **Selena Marsh, RD** · Registered Dietitian, Weight Management · **Weight Management**
   Focus: Nutrition coaching · Sustainable habits · Lifestyle support
   Bio: "Selena is a registered dietitian who meets members one-on-one to turn goals into sustainable habits. She believes lasting change happens between appointments, not just during them."

6. **`image_assets/Doc7.jpeg`** — **Dr. Elliot Grant, MD** · Physician, Executive Health · **Executive Health**
   Focus: Comprehensive physicals · Diagnostics · Medical care
   Bio: "Elliot oversees the comprehensive medical care at the heart of Executive Health, coordinating diagnostics and specialist care so busy professionals get a complete picture of their health."

7. **`image_assets/Doc8.jpeg`** — **Dr. Andre Williams, MD** · Primary Care Physician (Urgent & Acute Care) · **Primary Care**
   Focus: Urgent virtual care · Acute conditions · Clear communication
   Bio: "Andre handles many of COMMpanion's urgent virtual visits and is known for the calm, clear communication patients appreciate when they need answers quickly."

8. **`image_assets/Doc9.jpeg`** — **Dr. Priya Nair, MD** · Obesity Medicine Physician · **Weight Management**
   Focus: Medical weight care · GLP-1 therapy · Metabolic health
   Bio: "Priya is board-certified in obesity medicine and pairs thoughtful medication management with ongoing coaching, tailoring each plan to the person in front of her."

9. **`image_assets/Doc10.jpeg`** — **Jordan Ellis, RN** · Care Team Nurse & Health Navigator · **All programs** (cross-program chip)
   Focus: Care coordination · Messaging support · Referrals & refills
   Bio: "Jordan is often the first person you'll hear back from. As a care navigator, she coordinates refills, referrals, and messages across every program — keeping your care moving between visits."

10. **`image_assets/Dpc5.jpeg`** — **Dr. Susan Hartwell, MD** · Medical Director, Executive Health · **Executive Health**
    Focus: Preventive medicine · Concierge care · Whole-person health
    Bio: "Susan leads COMMpanion Executive Health, bringing decades of preventive medicine experience to a concierge model designed around busy lives and long-term wellbeing."

---

## 4. Interactions (add to the shared `js/main.js`)

- **Expandable team cards:** toggle expanded detail on click/Enter/Space; `aria-expanded` reflects state; only the clicked card toggles. Smooth height animation, gated behind `prefers-reduced-motion`.
- **Program filter chips:** show/hide cards by `data-program` (cross-program cards show under "All" and may show under every program, or only "All" — your call; keep it simple). Active chip styled like the Insights filters.
- **About dropdown:** mirror the Programs dropdown behavior exactly (desktop hover/focus + click, keyboard accessible, mobile expandable group).

---

## 5. SEO & structured data

- `<title>`: **Meet the care team | COMMpanion by Penn State Health**
- Meta description: **The people behind COMMpanion — providers, specialists, and navigators across primary care, weight management, and executive health.**
- **Do NOT emit `Person` or staff `MedicalOrganization` member JSON-LD** for these profiles — they are fictional, and structured data should not seed fake clinicians. Plain semantic HTML only for the cards.
- Keep the `noindex`/`robots.txt` guards from the main brief in place.

---

## 6. Notes

- All 10 profiles are **sample/fictional** for the POC. Keep them clearly internal-demo only.
- Photos are already in `image_assets/` with the exact filenames listed in §3 (note: there is no `Doc5` — the tenth file is `Dpc5.jpeg`). Use each photo only for its assigned profile.
- Do not run git or deploy — just write `care-team.html`, update the shared nav/footer and `js/main.js`, and you're done.
