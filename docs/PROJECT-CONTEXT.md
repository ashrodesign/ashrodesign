# Ashro Design Website — Project Context Guide

Context for continuing work on this project in a new session. Read this first.

---

## 1. Critical setup (get these wrong and nothing works)

**Work in `C:\Users\asher\ashro-design`.** There is a stale copy at
`C:\Users\asher\OneDrive\Desktop\Claude Code\ashro-design` with dangling junctions — do not
run or edit it.

**Never move this project into OneDrive.** Proven incompatible with Next 16 + Turbopack:
- OneDrive dehydrates `node_modules` into cloud-only stubs → "Cannot find module"
- Turbopack rejects a `node_modules` symlink pointing outside the project root
- OneDrive syncing `.next` corrupts Turbopack's cache → panics, garbled CSS/JS, EBUSY locks

**Node is not on PATH.** Node 24 / npm 11 live at `C:\Program Files\nodejs`. Either prefix
PATH or run without `cd`:

```bash
npm --prefix C:\Users\asher\ashro-design run dev
```

Python is not installed. Use PowerShell or Node for scripting.

---

## 2. What this is

A premium single-page marketing site for **Ashro Design** — a Bahamian e-commerce marketing
agency (web, ads, email, SMS, graphic design) serving Nassau, Freeport, the Family Islands,
and the Bahamian diaspora.

- **Owner:** Asher Rolle, Founder & CEO (`designashro@gmail.com`)
- **Live site:** https://ashrodesign.net
- **Repo:** https://github.com/ashrodesign/ashrodesign (public, branch `main`)
- **Business contact:** info@ashrodesign.net · (242) 802-6688

The user expects Awwwards-caliber polish and rejects templated/default looks.

---

## 3. Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 (CSS-first `@theme`, no
`tailwind.config`) · Framer Motion · GSAP/ScrollTrigger · Lenis (smooth scroll) ·
react-hook-form + zod · lucide-react · three (WebGL hero shader) · Supabase · Brevo.

**Dark mode only.** There is no light theme.

`package.json` has an `overrides` block pinning `postcss ^8.5.10` and `sharp ^0.35.0` — these
patch CVEs in versions Next bundles internally. Don't remove them.

---

## 4. Repo map

```
src/
  app/
    layout.tsx              Root layout: fonts, metadata, grain overlay, SmoothScroll, BackToTop
    page.tsx                Homepage — composes all section components in order
    globals.css             Design tokens + signature utility classes (see §6)
    icon.png                Favicon (AD mark)
    privacy/page.tsx        /privacy — privacy policy
    free-blueprint/page.tsx /free-blueprint — lead-magnet landing page
    api/contact/route.ts        POST → Supabase contact_submissions
    api/newsletter/route.ts     POST → Brevo list 3 (footer signup)
    api/blueprint-signup/route.ts POST → Brevo list 4 (lead magnet)
  components/ui/Analytics.tsx   Loads GA4 (gtag.js) + Meta Pixel via next/script
  components/
    sections/               One component per page section (Nav, Hero, Services, …, Footer)
    ui/                     Shared primitives (Button, GlowCard, Reveal, SectionHeading, …)
  lib/
    data.ts                 ALL marketing copy lives here
    assets.ts               ALL media paths live here
    schemas.ts              Shared zod schemas (contact + blueprint signup)
    analytics.ts            GA4/Meta IDs + conversion event helpers (trackContactLead, …)
    icons.ts                IconKey → lucide icon map
    motion.ts               EASE curve, shared Framer variants, viewportOnce
    hooks.ts                usePrefersReducedMotion, useMediaQuery, useMounted
    utils.ts                cn() — clsx + tailwind-merge
    supabase/client.ts      Browser client (@supabase/ssr)
    supabase/server.ts      Server client (cookie-aware, used by API routes)
supabase/
  schema.sql                contact_submissions table + RLS (reference; already applied)
  notify-trigger.sql        pg_net trigger → Edge Function (reference; already applied)
  functions/notify-contact-submission/index.ts   Deno Edge Function (emails lead via Resend)
docs/
  PROJECT-CONTEXT.md        This file
  superpowers/specs/        Design specs
public/
  brand/                    Real logos, founder photo, why-section image
  downloads/                The Digital Growth Blueprint PDF
```

### Conventions

- **Copy goes in `src/lib/data.ts`.** Media paths go in `src/lib/assets.ts`. Don't hardcode
  either in components — except for genuinely one-off page-specific content (the privacy
  policy and the blueprint landing page write their copy inline, since it isn't reused).
- One component per section in `src/components/sections/`.
- Shared primitives in `src/components/ui/`.
- Import alias is `@/*` → `./src/*`.
- JSX text needs escaped apostrophes (`&apos;`) or curly quotes (`’`) — `react/no-unescaped-entities` is on.

---

## 5. Routes

| Route | Type | Notes |
|---|---|---|
| `/` | Static | Full marketing page, all sections |
| `/free-blueprint` | Static | Lead-magnet landing page. **No site nav/footer by design** — zero exit paths to maximize opt-in rate |
| `/privacy` | Static | Privacy policy |
| `/api/contact` | Dynamic | Contact form → Supabase |
| `/api/newsletter` | Dynamic | Footer email capture → Brevo list 3 |
| `/api/blueprint-signup` | Dynamic | Lead magnet opt-in → Brevo list 4 |

**`Nav` and `Footer` take an optional `linkPrefix` prop.** Their links are in-page hash
anchors (`#services`) that only resolve on the homepage. From any other route, pass
`linkPrefix="/"` so they become `/#services` and navigate home first. Default is `""` so the
homepage keeps bare hashes — important, because Lenis only intercepts `a[href^="#"]` for
smooth scrolling.

---

## 6. Design system

**Brand:** electric blue on deep near-black, glassmorphism, soft glow blooms.

Tokens are CSS variables in `globals.css`, mapped into Tailwind via `@theme inline`:

| Token | Value | Tailwind |
|---|---|---|
| `--bg` | `#0a0b0f` | `bg-bg` |
| `--surface` | `#13141b` | `bg-surface` |
| `--accent` | `#3a1aff` | `text-accent` |
| `--accent-deep` | `#2d00d6` | `bg-accent-deep` |
| `--accent-glow` | `#5b3bff` | `text-accent-glow` |
| `--fg` | `#f4f5f7` | `text-fg` |
| `--muted` | `#9aa0ac` | `text-muted` |
| `--muted-2` | `#6b7280` | `text-muted-2` |

Fonts: **Sora** (`--font-display`, all headings) + **Inter** (`--font-sans`, body).

### Signature utility classes (in `globals.css`)

- `.glass` — frosted surface (blur + saturate + border)
- `.hairline` — gradient 1px border via masked `::before`
- `.bloom` — soft radial glow; position/size/color set inline per use
- `.text-gradient` — white→lilac→accent gradient text
- `.btn-glow` — outer bloom that intensifies on hover
- `.link-underline` — underline wipes in on hover
- `.grain` — fixed noise overlay (applied once in root layout)
- `.animate-drift`, `.animate-book-float` — ambient motion
- `.marquee-track` / `.marquee-mask` — infinite marquee

A `prefers-reduced-motion` block at the bottom of `globals.css` disables all of it globally —
new animations are covered automatically.

### Reusable components

`Button` (magnetic hover, variants `primary`/`ghost`/`subtle`), `GlowCard`, `SpotlightCard`,
`GlassCard`, `Reveal` (scroll fade-up wrapper), `SectionHeading` (eyebrow + title + subtitle),
`Marquee`, `SocialLinks`, `ShaderBackground` (WebGL hero), `SmoothScroll`, `BackToTop`,
`CursorLight`.

**Reuse these before writing new UI.** Pillar/feature cards, icon tiles, and section headers
all have established patterns — match them.

---

## 7. Integrations & data flows

### Contact form → Supabase → email notification

```
Contact form → POST /api/contact → Supabase `contact_submissions`
  → Postgres trigger (pg_net) → Edge Function `notify-contact-submission`
  → Resend → lead notification email
```

- **Supabase project:** `xynurzuamtbnuvsqyhqq` ("Ashro Design Website", us-west-2)
- **Table:** `contact_submissions`, RLS enabled — `anon` can **INSERT only**, no read/update/
  delete. Leads are viewed in the Supabase Table Editor (owner login bypasses RLS).
- **Trigger:** `on_contact_submission_insert` → `notify_contact_submission()`. The function is
  `SECURITY DEFINER` with `EXECUTE` revoked from `public`/`anon`/`authenticated` so it can't be
  called via RPC.
- **Shared secret** authenticating trigger → Edge Function lives in **Supabase Vault**
  (`contact_notify_secret`) and is looked up at runtime — never in SQL text or the repo. The
  Edge Function compares it against its own `CONTACT_NOTIFY_SECRET` env var.
- Edge Function env vars (set in Supabase dashboard, **not** in this repo): `RESEND_API_KEY`,
  `CONTACT_NOTIFY_SECRET`, `NOTIFY_TO_EMAIL`, `NOTIFY_FROM_EMAIL`.
- `NOTIFY_FROM_EMAIL` must be on the Resend-verified domain (`ashrodesign.net`), otherwise
  Resend only allows sending to the account owner's own address.

### Newsletter + lead magnet → Brevo

- **List 3 — "Website Newsletter":** footer signup, via `/api/newsletter`.
- **List 4 — Blueprint leads:** `/free-blueprint` opt-in, via `/api/blueprint-signup`
  (also sets the `FIRSTNAME` attribute).
- A **Brevo automation** fires on "contact added to list 4" and emails the guide. The email
  links to `https://ashrodesign.net/downloads/ashro-design-digital-growth-blueprint.pdf`
  (linked, not attached — attachments hurt deliverability). Delivery is Brevo's job; the app
  only adds the contact.

### Analytics → Google Analytics 4 + Meta Pixel

GA4 property: **`G-ZQ6JVD6NRC`**. Meta Pixel (dataset) ID: **`606135985426687`**. Meta domain
verification uses the `facebook-domain-verification` meta tag, set via `metadata.verification.other`
in `src/app/layout.tsx` — don't remove it or the domain becomes unverified.

`<Analytics />` in the root layout loads both tags `afterInteractive`, **only in production
builds** (`NODE_ENV === "production"`) so local dev never pollutes real data. A missing ID
just skips that tag.

| Trigger | GA4 event | Meta event |
|---|---|---|
| Page load | `page_view` (auto, from `config`) | `PageView` |
| Contact form success | `generate_lead` `{form_name: "contact"}` | `Lead` |
| Blueprint opt-in success | `generate_lead` `{form_name: "free_blueprint"}` | `Lead` |
| Newsletter signup success | `sign_up` `{method: "newsletter"}` | `CompleteRegistration` |

Events fire only after the API returns OK. Mark `generate_lead` and `sign_up` as **key
events** in GA4 Admin. Client-side route changes: GA4 relies on Enhanced Measurement
(history events); Meta `PageView` is fired by `Analytics.tsx` on pathname change (today all
cross-page links are plain `<a>` full reloads, so this is future-proofing).

---

## 8. Environment variables

| Variable | Secret? | `.env.local` | `.env.production` (committed) | Hostinger hPanel |
|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No | ✅ | ✅ | — |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | No | ✅ | ✅ | — |
| `BREVO_API_KEY` | **Yes** | ✅ | ❌ never | ✅ |
| `BREVO_LIST_ID` (`3`) | No | ✅ | ❌ | ✅ |
| `BREVO_BLUEPRINT_LIST_ID` (`4`) | No | ✅ | ❌ | ✅ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | optional | optional — defaults to `G-ZQ6JVD6NRC` in `src/lib/analytics.ts` | — |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | optional | optional — defaults to `606135985426687` in `src/lib/analytics.ts` | — |

`.env.production` is deliberately committed — it holds only `NEXT_PUBLIC_*` values, which get
inlined into the browser bundle anyway, so committing them is not new exposure. **Never add a
secret to it.** `.gitignore` has `.env*` with `!.env*.example` and `!.env.production`
exceptions.

Secrets for production live only in **hPanel → Environment Variables**. Adding one there
requires a restart to take effect.

Brevo API keys come in two flavors — the REST key starts `xkeysib-`, the SMTP key starts
`xsmtpsib-`. Only `xkeysib-` works with the Contacts API; the other returns "Key not found".

---

## 9. Deployment

**Host:** Hostinger (not Vercel/Netlify). LiteSpeed + `hcdn` CDN. Identifiable by the
`platform: hostinger` response header.

**Auto-deploys on push to `main`.** No manual trigger needed.

**Production builds use webpack, not Turbopack** (`"build": "next build --webpack"`). On
2026-09-28 Hostinger's build panicked with `TurbopackInternalError … globals.css … node process
exited before we could connect to it` — Turbopack spawns a Node worker for PostCSS/Tailwind and
Hostinger's build container killed it. Webpack runs PostCSS in-process and builds fine. `npm run
dev` still uses Turbopack locally. Don't remove the flag.

Two things that bite every time:

1. **The build type-checks the entire repo**, including non-Next code. `supabase/functions` is
   excluded in `tsconfig.json` because it's Deno code (`Deno.env`, `jsr:` imports) that fails a
   Node/Next type-check. **Any future non-Next code needs the same exclusion** or the deploy
   fails. Always run `npm run build` locally before pushing.

2. **The CDN serves stale content after deploys.** `Cache-Control: s-maxage=31536000` (1 year)
   plus edge nodes that don't purge on deploy — repeated requests to the same URL can return
   snapshots 30+ hours old, inconsistently across nodes. **After every deploy, purge the cache
   in hPanel → Performance.** If verifying and content looks stale, check for changed JS chunk
   hashes rather than trusting one request.

Useful check for whether a deploy actually landed:

```bash
curl -s https://ashrodesign.net | grep -o 'chunks/[a-zA-Z0-9_.-]*\.js' | sort -u
```

---

## 10. Verification workflow

The project has **no automated tests**. Verification is: lint → build → browser.

```bash
npm --prefix C:\Users\asher\ashro-design run lint
npm --prefix C:\Users\asher\ashro-design run build
```

**Known lint baseline: 5 problems (4 errors, 1 warning)** — all pre-existing, in
`src/lib/hooks.ts` and `src/components/ui/CursorLight.tsx` (`react-hooks/set-state-in-effect`)
plus a react-hook-form `watch()` warning in `Contact.tsx`. If you see exactly these, you
introduced nothing new.

Then start the preview and check the real page:

```
preview_start { name: "ashro-design" }   → serves on :3000
```

Check `read_console_messages` for errors, `get_page_text` / `read_page` for content, and a
screenshot for visuals. API routes are fastest to verify with `curl` against localhost.

---

## 11. Hard-won gotchas

**Preview browser tabs go stale.** After adding a *new* file, an existing tab can throw
`X is not defined` even though the build succeeds and the file is correct. Open a **fresh tab**
rather than debugging phantom errors. Clearing `.next` doesn't help; a new tab does.

**Brevo blocks this dev machine's IP.** Brevo has "Authorized IPs" enabled, and only the
Hostinger server IP is allowlisted. Direct Brevo API calls from local `curl` fail with
"unrecognised IP address" — this is expected and not a bug. Local `/api/newsletter` and
`/api/blueprint-signup` calls will fail for the same reason; **test those against production**.

**Flexbox stretches images.** In a `flex flex-col` container, `align-items: stretch` overrides
`w-auto` on an `<img>` and distorts it. Add `self-start shrink-0`. Also make sure `next/image`
`width`/`height` props match the file's true aspect ratio (the white logo is 831×264) or the
auto-generated `aspect-ratio` CSS squashes it.

**Safari + 3D transforms escape `overflow: hidden`.** `translateZ` / `transform-style:
preserve-3d` content can bleed outside clipping during pinch-zoom or rubber-band scroll,
showing black edges on iOS. Fake depth with plain 2D offsets instead. `html` also has an
explicit `background-color` as a second line of defense against overscroll reveal.

**`brace-expansion` shows as a vulnerability in Hostinger's scanner — leave it.** `npm audit`
reports 0 vulnerabilities; Hostinger uses a stricter range. It's a transitive dev-only
dependency of `eslint`, never shipped to production. Forcing it to 5.x via `overrides`
**breaks lint entirely** (`TypeError: expand is not a function` — `minimatch@3.1.5` expects the
1.x API). This was tried and reverted. Wait for an upstream fix.

**Patch bundled-dependency CVEs with `overrides`, not version jumps.** Next pins vulnerable
`postcss` and `sharp` internally; `npm audit fix --force` wants to bump Next itself. A scoped
`overrides` entry patches the transitive dep without touching Next's version.

**Git identity is local to this repo** (Asher Rolle / designashro@gmail.com). The machine has
no global `.gitconfig`.

---

## 12. Current state (as of 2026-09-28)

`main` @ `b11dece`, working tree clean, `npm audit` reported 0 vulnerabilities at that point.

Recent work: privacy policy page + footer links → security patches (next 16.2.11, sharp,
postcss) → free-blueprint landing page with CSS 3D book mockup → back-to-top button →
Brevo newsletter wiring → Supabase contact capture + email notifications.

### Known open items

- **Placeholder imagery.** The `works` gallery and the video poster in `src/lib/assets.ts` are
  still Unsplash stock. `video.src` is empty — the VideoSection shows a "Promo video coming
  soon" state until a real MP4 lands in `/public/video/`.
- **Testimonials are generic** ("Local Business Owner", "Bahamian Retailer") — not real named
  clients.
- **Privacy policy was published without attorney review.** The source file recommended a
  Bahamian attorney review it before publishing; that note was removed at publish time as
  instructed, but the review may not have happened.
- **No cookie-consent banner.** GA4 and the Meta Pixel load for every visitor. Fine for
  Bahamian traffic, but add consent (Google Consent Mode + `fbq('consent', …)`) before
  targeting EU/UK visitors.
- **New npm advisories (2026-09-28):** `npm audit` now reports 5 (1 critical in `next` ≤16.3.2,
  plus sharp, browserslist, js-yaml, baseline-browser-mapping). Fix by bumping `next` past
  16.3.2 and adjusting the `sharp` override — not `npm audit fix --force`.
- **Pre-existing lint errors** in `hooks.ts` / `CursorLight.tsx` (see §10) are unaddressed.

### Working style the user expects

Move fast and act rather than over-asking. Verify with real evidence (build output, DB rows,
HTTP responses) instead of claiming success. Commit and push when asked — they generally want
changes live, which means: push → wait for Hostinger → purge CDN → verify on the real domain.
