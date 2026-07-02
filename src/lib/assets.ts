/**
 * Central asset registry.
 * ----------------------------------------------------------------------------
 *  Everything visual is referenced through this file so it's trivially
 *  swappable later. To use your own media:
 *   • Brand logos  -> drop files in /public/brand and update `brand` below.
 *   • Promo video  -> drop an .mp4 in /public/video and set `video.src`.
 *   • Imagery      -> replace the Unsplash URLs (or download into /public/images).
 *
 *  The Unsplash photos below are tasteful, license-free placeholders standing in
 *  for real client ad creatives. Replace them with your own work.
 */

/** Build a sized, auto-formatted Unsplash URL. */
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const brand = {
  /** White logo — used on the dark nav & footer. Swap for ashro-logo-white.png. */
  logoWhite: "/brand/ashro-logo-white.png",
  /** Full-color logo — kept for light surfaces / OG / favicon source. */
  logoColor: "/brand/ashro-logo-color.png",
} as const;

/** Founder / CEO portrait. Swap for your own headshot in /public/brand. */
export const founderImage = "/brand/founder.png";

/** "Why Ashro" section image — swap for a team / Bahamas photo (or drop one in /public/brand). */
export const whyImage = "/brand/why.jpeg";

export const video = {
  // TODO: replace with Ashro promo video — drop the file in /public/video/
  // and set src to e.g. "/video/ashro-promo.mp4".
  src: "",
  poster: u("photo-1542744173-8e7e53415bb0", 1280),
} as const;

export type WorkCreative = {
  src: string;
  alt: string;
  brand: string;
  tagline: string;
  category: string;
};

/** "Works" marquee — framed as past client ad creatives. */
export const works: WorkCreative[] = [
  {
    src: u("photo-1483985988355-763728e1935b"),
    alt: "Fashion boutique ad creative with shopping bags",
    brand: "Bayfront Boutique",
    tagline: "Summer Collection — Now Live",
    category: "Fashion",
  },
  {
    src: u("photo-1523275335684-37898b6baf30"),
    alt: "Luxury wristwatch product photography",
    brand: "Tide Watches",
    tagline: "Time, Island-Made",
    category: "Accessories",
  },
  {
    src: u("photo-1595950653106-6c9ebd614d3a"),
    alt: "Premium skincare bottle on neutral backdrop",
    brand: "Island Glow",
    tagline: "Skincare For The Sun",
    category: "Beauty",
  },
  {
    src: u("photo-1542291026-7eec264c27ff"),
    alt: "Vibrant sneaker product shot",
    brand: "Nassau Kicks",
    tagline: "Drop 03 — Sold Out Fast",
    category: "Footwear",
  },
  {
    src: u("photo-1556909114-f6e7ad7d3136"),
    alt: "Restaurant plating, fresh island cuisine",
    brand: "Conch & Co.",
    tagline: "Order Online Tonight",
    category: "Dining",
  },
  {
    src: u("photo-1556228720-195a672e8a03"),
    alt: "Cosmetics flat lay ad creative",
    brand: "Lumi Cosmetics",
    tagline: "Colour That Lasts",
    category: "Beauty",
  },
  {
    src: u("photo-1572635196237-14b3f281503f"),
    alt: "Designer sunglasses product photography",
    brand: "Cay Eyewear",
    tagline: "Shade, Reimagined",
    category: "Accessories",
  },
  {
    src: u("photo-1505740420928-5e560c06d30e"),
    alt: "Premium headphones product ad",
    brand: "Harbour Audio",
    tagline: "Hear The Difference",
    category: "Electronics",
  },
  {
    src: u("photo-1490481651871-ab68de25d43d"),
    alt: "Editorial fashion campaign image",
    brand: "Paradise Apparel",
    tagline: "Resort '26 Lookbook",
    category: "Apparel",
  },
  {
    src: u("photo-1523293182086-7651a899d37f"),
    alt: "Spa and wellness product flat lay",
    brand: "Out Island Spa",
    tagline: "Book Your Escape",
    category: "Wellness",
  },
  {
    src: u("photo-1511707171634-5f897ff02aa9"),
    alt: "Lifestyle coffee and mobile commerce shot",
    brand: "Harbour Roast",
    tagline: "Fresh Beans, Delivered",
    category: "Cafe",
  },
  {
    src: u("photo-1441986300917-64674bd600d8"),
    alt: "Modern retail storefront ad",
    brand: "Junkanoo Goods",
    tagline: "Shop The Whole Store",
    category: "Retail",
  },
];
