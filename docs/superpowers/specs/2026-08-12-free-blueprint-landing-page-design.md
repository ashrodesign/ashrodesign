# Free Blueprint Landing Page — Design

## Goal

A standalone, distraction-free lead-magnet landing page at `/free-blueprint` that captures
email addresses in exchange for "The Bahamian Store Owner's Digital Growth Blueprint" PDF,
maximizing opt-in rate. Styled after leadpages.com/templates/lead-magnet-ebook, using Ashro
Design's existing brand system (dark electric-blue theme, existing UI components/icons).

## Non-goals

- No CMS/admin UI for editing this page's copy — content is hardcoded like every other section
  on the site.
- No Supabase storage of these leads — Brevo is the single source of truth for this list
  (unlike the contact form, which intentionally has a DB record + email notification).
- No instant on-page PDF download. Delivery is exclusively via the Brevo automation email.

## Page structure (`/free-blueprint`)

No site header/footer — this route simply doesn't render `Nav`/`Footer` (the root layout
doesn't force them), so it's a clean page with zero exit links except a small text link back to
the main site in the footer copy line.

### 1. Hero (opt-in form inline, above the fold)

- Eyebrow: "FREE GUIDE FOR BAHAMIAN STORE OWNERS"
- Headline: "The Bahamian Store Owner's Digital Growth Blueprint"
- Subheadline: "How to get your store online, reach more customers, and sell more — even if
  you're not techy and you're running the whole thing yourself."
- Form: First Name + Email, single button "Send Me The Free Blueprint"
- Microcopy under form: "Free forever. No spam. Unsubscribe anytime."

### 2. What's Inside (the 5 Pillars, icon cards)

Reuses existing icon set from `src/lib/icons.ts` (`web`, `social`, `email`, `sms`, `graphic`) —
same icons already used in the Services section, so no new assets needed.

- Eyebrow: "WHAT'S INSIDE"
- Heading: "The 5 Pillars of Selling More Online"
- Subheading: "A clear, no-jargon framework for turning 'I have a nice product' into 'I have a
  store that consistently sells.'"
- Cards:
  1. **web** — "A Real Online Store" — "Not just a social page — a website where customers
     browse, add to cart, and pay, 24/7."
  2. **social** — "Paid Ads That Work" — "Facebook, Instagram & Google ads that put your
     products in front of the right people — locals, tourists, and the diaspora."
  3. **email** — "Email Marketing" — "The one audience you actually own. Turn first-time
     buyers into repeat customers."
  4. **sms** — "SMS Marketing" — "Short, punchy texts for drops and flash sales — opened
     almost instantly."
  5. **graphic** — "Branding & Design" — "Consistent visuals that make a small store look
     like an established brand."

### 3. The Real Cost (motivation / loss-aversion section)

- Eyebrow: "THE REAL COST"
- Heading: "What Staying Offline Is Quietly Costing You"
- Intro: "Nobody likes thinking about what they're losing — but the cost of staying offline is
  real, it's just invisible."
- Bullets:
  - "Sales that quietly disappear — every 'how much?' you don't answer fast enough is a sale
    gone to someone else."
  - "You're invisible on Google — a ready-to-buy customer searches, and buys from whoever they
    find."
  - "You're at the mercy of the algorithm — you're renting attention, not owning it."
  - "You look smaller than you are — inconsistent visuals read as 'hobby,' not 'brand.'"
- Closing line: "None of this means the sky is falling. It just means there's money on the
  table — and it's very fixable."

### 4. Why Ashro Design (condensed trust section)

- Eyebrow: "WHY ASHRO"
- Heading: "You Don't Have To Do This By Yourself"
- Body: "Building a store, running ads, writing emails, setting up SMS, and keeping your
  branding sharp is basically five part-time jobs. Ashro Design is a Bahamian-owned e-commerce
  marketing agency that handles all five pillars under one roof — one team, one strategy, no
  juggling vendors. Because we're here, we understand your market: the seasons, the culture,
  the local customer, and the diaspora opportunity most overseas agencies don't even know
  exists."
- Trust bullets: "Bahamian-owned" · "One team, all 5 pillars" · "Local + diaspora reach"

### 5. Second CTA (bottom form, repeat for scrollers)

- Heading: "Get Your Free Blueprint"
- Subtext: "Join Bahamian store owners already getting our best growth strategies straight to
  their inbox."
- Same form component as hero.

### 6. Minimal footer

- "© 2026 Ashro Design · info@ashrodesign.net" — plain text, no links. Consistent with the
  zero-exit-path decision: even a small link back to the main site is still a way out before
  conversion.

### Success state (replaces the form in place after a successful submit)

- Check icon (same visual language as the existing Contact form's success state)
- Heading: "Check Your Email!"
- Body: "We've sent The Digital Growth Blueprint straight to your inbox. If you don't see it in
  a minute, peek in your spam or promotions folder."

## Data flow

Form (First Name + Email) → `POST /api/blueprint-signup` → Brevo Contacts API: upsert contact
with `FIRSTNAME` attribute, `listIds: [BREVO_BLUEPRINT_LIST_ID]` → the already-configured Brevo
automation (trigger: "contact added to list 4") sends the PDF-link email. No involvement from
our own email/Resend pipeline.

## Components / files

- `src/app/free-blueprint/page.tsx` — page shell + static sections (everything except the form
  itself), with route-specific `metadata` export (title/description for SEO + social sharing).
- `src/components/sections/BlueprintOptInForm.tsx` — the only interactive piece: form +
  submit handling + success state. Rendered twice (hero and bottom CTA) so both forms work
  independently.
- `src/app/api/blueprint-signup/route.ts` — new API route, same shape as the existing
  `/api/newsletter` route but posts to Brevo list `BREVO_BLUEPRINT_LIST_ID` and includes
  `FIRSTNAME`.
- `src/lib/schemas.ts` — add `blueprintSignupSchema` (`firstName`, `email`) alongside the
  existing `contactSchema`.
- `public/downloads/ashro-design-digital-growth-blueprint.pdf` — the PDF asset, copied from
  `C:\Users\asher\Downloads\Ashro_Design_Digital_Growth_Blueprint.pdf` into the repo. Its
  deployed URL (`https://ashrodesign.net/downloads/ashro-design-digital-growth-blueprint.pdf`)
  is what gets pasted into the Brevo automation email's download button — this is a manual step
  for the user after deploy, since it's inside Brevo's own email editor.
- `.env.local` / `.env.local.example` — add `BREVO_BLUEPRINT_LIST_ID=4`.

## Reused vs. new

Reused: `Button`, `SectionHeading`, `Reveal`, `GlowCard`/`SpotlightCard` (for the pillar cards),
`Icons` map, existing Tailwind design tokens, existing `contactSchema`-style validation pattern,
existing `NewsletterForm.tsx` fetch/status-state pattern (adapted for two fields + a fuller
success state).

New: the page itself, the opt-in form component, the API route, the schema, the PDF asset.

## Out of scope / explicitly deferred

- No automated tests — this codebase has none currently; verification is manual via the
  browser preview workflow, consistent with how every other section was built and verified in
  this project.
- No admin/analytics dashboard for this page's conversion rate — Brevo's own list/automation
  stats cover that.
