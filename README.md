# Ashro Design — Marketing Website

A premium, single-page marketing site for **Ashro Design**, a Bahamian e-commerce
marketing agency. Dark-mode only, electric-blue glow language, smooth inertia
scrolling, and tasteful scroll/cursor motion.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
GSAP (ScrollTrigger) · Lenis · react-hook-form + zod · lucide-react**.

---

## Getting started

> Node.js 18.18+ is required (this project was built against Node 24).
> On this machine Node lives at `C:\Program Files\nodejs` — if `npm` isn't found,
> add it to PATH first: `$env:PATH = "C:\Program Files\nodejs;$env:PATH"`.

```bash
npm install        # already done
npm run dev        # start dev server → http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

---

## Project structure

```
src/
  app/
    layout.tsx          # fonts (Sora + Inter), metadata/OG, grain, SmoothScroll
    page.tsx            # assembles every section in order
    globals.css         # design tokens, glow/glass/marquee utilities, reduced-motion
    icon.svg            # favicon (blue "AD" mark)
  components/
    ui/                 # Button, GlassCard, GlowCard, SectionHeading,
                        #   Marquee, CursorLight, Reveal, SmoothScroll, NewsletterForm
    sections/           # Nav, Hero, VideoSection, WhyChoose, Services, Works,
                        #   HowItWorks, Testimonials, Pricing, Faq, Contact, FinalCta, Footer
  lib/
    data.ts             # ALL copy: services, pricing, FAQs, testimonials, nav, islands…
    assets.ts           # ALL media paths: logos, gallery images, video poster
    icons.ts            # icon registry (keys → lucide icons)
    motion.ts           # shared Framer Motion variants
    hooks.ts            # reduced-motion / media-query hooks
    utils.ts            # cn() class merger
public/
  brand/                # ashro-logo-white.svg · ashro-logo-color.svg
```

**To edit text / pricing / FAQs** → `src/lib/data.ts`.
**To swap any image, logo, or the video** → `src/lib/assets.ts`.

---

## ✅ Drop in your real assets

Everything below is a clearly-marked placeholder. Nothing else needs to change.

| What | Where | Notes |
|------|-------|-------|
| **Logo (nav + footer)** | `public/brand/ashro-logo-white.svg` | Replace with your white-on-transparent logo. To use a **PNG** instead, drop `ashro-logo-white.png` in `public/brand/` and change `brand.logoWhite` in `src/lib/assets.ts`. |
| **Color logo** | `public/brand/ashro-logo-color.svg` | For light surfaces / OG. Update `brand.logoColor` if you switch to PNG. |
| **Favicon** | `src/app/icon.svg` | Currently the blue "AD" mark. Replace the SVG (or drop a `favicon.ico` / `icon.png` in `src/app/`). |
| **Promo video** | `src/lib/assets.ts` → `video.src` | Drop your file in `public/video/` and set e.g. `src: "/video/ashro-promo.mp4"`. Until then the player shows a poster-only state. Search the code for `TODO: replace with Ashro promo video`. |
| **Video poster** | `src/lib/assets.ts` → `video.poster` | Currently an Unsplash URL. |
| **"Works" gallery (12 creatives)** | `src/lib/assets.ts` → `works[]` | Replace each `src` (and `brand` / `tagline` / `category`) with your real client ad creatives. Use Unsplash URLs or drop files in `public/images/`. |
| **Contact form submit** | `src/components/sections/Contact.tsx` | Stubbed — search `TODO: wire to email/CRM endpoint`. Hook it to your provider/CRM. |
| **Newsletter submit** | `src/components/ui/NewsletterForm.tsx` | Stubbed — `TODO: wire to email provider`. |
| **Contact details / socials** | `src/lib/data.ts` | `contactInfo` (info@ashrodesign.net · (242) 802-6688) and `socials` link URLs. |
| **Domain / OG** | `src/app/layout.tsx` | `metadataBase` is set to `https://ashrodesign.net`. Add an `app/opengraph-image.png` (1200×630) for richer social cards. |

### Remote images note

`next.config.ts` allows `images.unsplash.com` and enables `dangerouslyAllowSVG`
(so the inline-SVG brand logo can be served via `next/image`). If you move imagery
to your own CDN, add its hostname to `images.remotePatterns`. If you download images
into `public/images/`, you can remove the Unsplash entry entirely.

Placeholder photography is from [Unsplash](https://unsplash.com) (free license).

---

## Motion & accessibility

- **`prefers-reduced-motion` is fully respected** — Lenis smooth-scroll, the cursor
  light, parallax, the marquee, and scroll reveals all disable, leaving gentle fades
  and native scrolling.
- Animations use **transform/opacity only** for 60fps; below-the-fold images lazy-load.
- Semantic landmarks, keyboard-operable menu / accordion / form, visible focus rings,
  `aria-*` on icon-only controls, and inline form validation with `role="alert"`.
- Touch targets are ≥44px; the cursor-light is disabled on touch devices.
