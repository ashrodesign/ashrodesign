// Google Analytics 4 + Meta Pixel helpers.
//
// IDs are public by nature — both ship in the page source anyway — so they're
// safe to commit. A NEXT_PUBLIC_* env var overrides the default below.
// If an ID is empty, that tag simply doesn't load and its calls no-op.

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-ZQ6JVD6NRC";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// Only fire in production builds so local dev doesn't pollute real data.
export const ANALYTICS_ENABLED = process.env.NODE_ENV === "production";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function gaEvent(name: string, params?: Params) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params);
}

function metaEvent(name: string, params?: Params) {
  if (typeof window !== "undefined" && window.fbq) window.fbq("track", name, params);
}

/** Meta PageView for client-side route changes (initial load is fired by the base snippet). */
export function trackMetaPageView() {
  if (typeof window !== "undefined" && window.fbq) window.fbq("track", "PageView");
}

// ---- Conversion events -------------------------------------------------------
// GA4 names use Google's recommended events so they're eligible as key events.
// Meta names use standard events so they're usable for ad optimization.

/** Contact / project-inquiry form submitted successfully. */
export function trackContactLead() {
  gaEvent("generate_lead", { form_name: "contact" });
  metaEvent("Lead", { content_name: "Contact form" });
}

/** Free Digital Growth Blueprint opt-in submitted successfully. */
export function trackBlueprintLead() {
  gaEvent("generate_lead", { form_name: "free_blueprint" });
  metaEvent("Lead", { content_name: "Digital Growth Blueprint" });
}

/** Footer newsletter signup submitted successfully. */
export function trackNewsletterSignup() {
  gaEvent("sign_up", { method: "newsletter" });
  metaEvent("CompleteRegistration", { content_name: "Newsletter" });
}
