import type { IconKey } from "@/lib/icons";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
] as const;

export const contactInfo = {
  email: "info@ashrodesign.net",
  phone: "(242) 802-6688",
  phoneHref: "+12428026688",
} as const;

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ashrodesign/",
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/designashro",
    icon: "facebook" as const,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ashrodesign",
    icon: "youtube" as const,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ashrodesign?lang=en",
    icon: "tiktok" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Why choose Ashro                                                   */
/* ------------------------------------------------------------------ */
export type ValueCard = { icon: IconKey; title: string; body: string };

export const whyCards: ValueCard[] = [
  {
    icon: "market",
    title: "We Know Your Market",
    body: "We're not an overseas agency guessing what works in The Bahamas. We're here. We understand the seasons, the culture, the customers, and the unique challenges of operating in this market. That local knowledge is built into everything we do.",
  },
  {
    icon: "everything",
    title: "We Do Everything",
    body: "Web design, paid ads, email marketing, SMS campaigns, and graphic design — all under one roof. No juggling multiple vendors. No communication gaps. One team, one vision, seamless execution.",
  },
  {
    icon: "customize",
    title: "We Customize Every Plan",
    body: "Your business is not the same as the next person's. We create marketing plans based on your business size, your stage of growth, and your budget. Starter, Growth, or Enterprise — there's a plan that fits exactly where you are right now.",
  },
  {
    icon: "measure",
    title: "We Measure Everything",
    body: "Every campaign is tracked. Every dollar is accounted for. We provide clear, transparent reporting so you always know what's working, what's improving, and what your investment is returning.",
  },
  {
    icon: "invested",
    title: "We're Invested In Your Success",
    body: "When you win, we win. Your growth is our reputation. We're not interested in quick transactions — we're building long-term partnerships with Bahamian businesses who are serious about scaling.",
  },
];

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export type Service = { icon: IconKey; title: string; body: string };

export const services: Service[] = [
  {
    icon: "web",
    title: "Web Design & E-Commerce Development",
    body: "Your store deserves more than a Facebook page. We design professional, high-converting e-commerce websites that take orders, showcase your products, and build your brand — 24/7. No tech skills needed on your end. Just great products and the ambition to sell them.",
  },
  {
    icon: "email",
    title: "Email Marketing",
    body: "Your customers want to hear from you. We create and manage targeted email campaigns that turn first-time visitors into loyal buyers — from welcome sequences to promotional campaigns to re-engagement emails. We write it, design it, and send it. You just watch the sales come in.",
  },
  {
    icon: "sms",
    title: "SMS Marketing",
    body: "SMS messages are opened 98% of the time. We put your brand directly in your customer's hand with targeted text campaigns that drive immediate action — new arrivals, flash sales, exclusive offers, and more. Short. Direct. Effective.",
  },
  {
    icon: "social",
    title: "Facebook & Instagram Ads",
    body: "Organic reach is dead. Paid ads done right are not. We create and manage Meta ad campaigns that target Bahamians at home, Bahamians abroad, and tourists who love what the islands offer — turning scrollers into buyers and browsers into customers.",
  },
  {
    icon: "google",
    title: "Google Ads",
    body: "When customers search for what you sell, will they find you or your competitor? We put your business at the top of Google — right in front of people who are already looking to buy — and make sure every click counts.",
  },
  {
    icon: "graphic",
    title: "Graphic Design",
    body: "First impressions are everything online. We design logos, social media graphics, ad creatives, email templates, and branded materials that make your business look as professional online as it does in person. Because great products deserve great presentations.",
  },
];

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */
export type Step = { num: string; icon: IconKey; title: string; body: string };

export const steps: Step[] = [
  {
    num: "01",
    icon: "book",
    title: "Book A Free Strategy Session",
    body: "Tell us about your business, your goals, and where you're struggling. We'll listen, ask the right questions, and give you an honest assessment of what's possible. No pressure. No sales pitch.",
  },
  {
    num: "02",
    icon: "plan",
    title: "Get Your Custom Plan",
    body: "Every Bahamian business is different. We don't do cookie-cutter. Based on your conversation, we build a strategy and package tailored specifically to your business size, budget, and growth goals.",
  },
  {
    num: "03",
    icon: "build",
    title: "We Build & Launch",
    body: "Our team gets to work — designing your website, creating your brand assets, setting up your marketing campaigns, and building everything you need to launch professionally online.",
  },
  {
    num: "04",
    icon: "grow",
    title: "Grow & Scale",
    body: "We monitor performance, optimize campaigns, report results, and continuously improve your strategy. As your business grows, we grow with you. This is a long-term partnership, not a one-time transaction.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
export type Testimonial = { quote: string; name: string; location: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ashro Design took my Nassau boutique from zero online sales to fully booked in 60 days.",
    name: "Local Business Owner",
    location: "Nassau",
  },
  {
    quote:
      "I didn't know where to start. Ashro Design handled everything. Now I ship worldwide.",
    name: "Bahamian Retailer",
    location: "Freeport",
  },
  {
    quote: "Finally a marketing agency that actually understands The Bahamas.",
    name: "Restaurant Owner",
    location: "Nassau",
  },
];

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */
export type FeatureGroup = { group: string; items: string[] };
export type PricingTier = {
  name: string;
  subtitle?: string;
  price: number;
  cadence: string;
  bestFor: string;
  blurb: string;
  popular: boolean;
  features: FeatureGroup[];
};

export const pricing: PricingTier[] = [
  {
    name: "Starter",
    subtitle: "Digital Launch",
    price: 700,
    cadence: "/month",
    bestFor: "Best for small local stores just getting online.",
    blurb: "Perfect for getting your store online and making your first sales.",
    popular: false,
    features: [
      {
        group: "Website Design",
        items: [
          "Product upload (up to 10/month)",
          "Basic website maintenance",
          "Basic local-search SEO setup",
        ],
      },
      { group: "Paid Media", items: ["1 ad campaign setup (Facebook/Instagram)"] },
      {
        group: "Graphic Design (3/month)",
        items: ["Flyers", "Product promotional graphics"],
      },
      {
        group: "Email Marketing",
        items: [
          "Platform setup (Omnisend)",
          "Basic email template design",
          "1 campaign/month",
        ],
      },
      { group: "Support", items: ["Monthly performance summary"] },
    ],
  },
  {
    name: "Growth",
    price: 1200,
    cadence: "/month",
    bestFor: "Best for stores serious about scaling revenue.",
    blurb: "Everything you need to generate consistent online sales.",
    popular: true,
    features: [
      {
        group: "Web Design",
        items: [
          "Product upload (50+/month)",
          "Full eCommerce management",
          "Landing pages for promotions",
        ],
      },
      {
        group: "Graphic Design (10–12/month)",
        items: ["Flyers", "Promotional product graphics"],
      },
      {
        group: "Product Design",
        items: [
          "2–3 product designs/month",
          "Mockups and high-end marketing videos",
        ],
      },
      {
        group: "Paid Media",
        items: [
          "Up to 3 campaigns/month",
          "Ad creatives",
          "Basic performance optimization",
          "Facebook Pixel & conversion",
          "Retargeting & scaling strategy",
        ],
      },
      {
        group: "Email Marketing",
        items: [
          "3–4 campaigns/month",
          "Automated flows (welcome, abandoned cart recovery)",
        ],
      },
      { group: "Support", items: ["Monthly performance summary"] },
    ],
  },
  {
    name: "Elite",
    price: 2200,
    cadence: "/month",
    bestFor: "Established brands scaling fast.",
    blurb: "For brands ready to dominate online and scale aggressively.",
    popular: false,
    features: [
      {
        group: "Website",
        items: [
          "Unlimited updates",
          "Advanced conversion optimization",
          "Unlimited product uploads",
        ],
      },
      { group: "Graphic Design", items: ["Unlimited design requests"] },
      {
        group: "Product Design",
        items: [
          "Full product line development",
          "Unlimited product design & video production",
        ],
      },
      {
        group: "Paid Media",
        items: [
          "Up to 5 campaigns/month",
          "Advanced optimization",
          "Facebook Pixel & conversion",
          "Retargeting & scaling strategy",
        ],
      },
      {
        group: "Email Marketing",
        items: [
          "8–10 campaigns/month",
          "Automated flows (welcome, abandoned cart, retention)",
        ],
      },
      {
        group: "Support",
        items: [
          "Monthly performance summary",
          "Bi-weekly strategy calls",
          "Priority 24/7 support",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "I don't have a website yet. Can you still help me?",
    a: "Absolutely. Many of our clients come to us with no online presence at all — that's actually the perfect starting point. We build your entire online foundation from the ground up: website, branding, marketing systems, and all. By the time we're done, you'll have a professional e-commerce presence ready to generate sales.",
  },
  {
    q: "I already have a website. Can you improve what I have?",
    a: "Yes. Whether your current site is outdated, not converting, or simply not reflecting the quality of your brand, we can redesign, optimize, and upgrade it. We'll audit your existing site and recommend exactly what needs to change to start driving results.",
  },
  {
    q: "I'm not tech-savvy at all. Will this be overwhelming?",
    a: "Not at all. That's exactly why we exist. You don't need to understand code, ad platforms, or email software. We handle everything from setup to management to reporting. Your only job is to run your business. Ours is to grow it online.",
  },
  {
    q: "How long does it take to build my website?",
    a: "A standard e-commerce website typically takes 2 to 4 weeks from project start to launch, depending on size and complexity. We move efficiently without sacrificing quality, and keep you updated at every stage.",
  },
  {
    q: "How soon will I see results from my ads?",
    a: "Most clients begin seeing meaningful results within the first 30 to 60 days. The first few weeks involve testing and optimization to find what resonates, then we scale what works. Patience and consistency are key — marketing is a marathon, not a sprint.",
  },
  {
    q: "Do you work with businesses outside of Nassau?",
    a: "Yes. We work across all of The Bahamas: Nassau, Freeport, Grand Bahama, the Family Islands, and beyond. All services are delivered digitally, so location within The Bahamas is never a barrier.",
  },
  {
    q: "Can you help me reach Bahamians living abroad?",
    a: "That's one of our specialties. Through targeted Facebook, Instagram, and Google campaigns we reach Bahamian communities in the US, Canada, the UK, and beyond. The diaspora market is enormous and largely untapped — and your products are exactly what they're looking for.",
  },
  {
    q: "What makes Ashro Design different from other agencies?",
    a: "Most agencies don't understand the Bahamian market and apply overseas strategies to a local context. We're a Bahamian agency serving Bahamian businesses — we understand the culture, customer behavior, seasonal fluctuations, and the unique opportunities here. We also offer fully integrated services (web, ads, email, SMS, graphic design) in one place. No fragmentation, no communication gaps — one unified strategy, one team.",
  },
  {
    q: "Is there a contract or minimum commitment?",
    a: "We offer flexible arrangements tailored to your comfort level. Some services have recommended minimum terms to allow time for meaningful results — paid advertising, for example, typically performs best over a 3-month minimum. We'll discuss options clearly during your strategy session.",
  },
  {
    q: "What's included in the free strategy session?",
    a: "We'll discuss your business goals, current marketing challenges, target customers, and growth ambitions, and give you an honest assessment of where you stand online and what we'd recommend as a first step. No obligation — it's simply a conversation to see if we're the right fit.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. We understand marketing is a significant investment, especially for small businesses, so we offer flexible payment arrangements for most services. Reach out and we'll find a structure that fits your budget.",
  },
  {
    q: "Can you manage my social media accounts too?",
    a: "We currently focus on paid media advertising on Facebook and Instagram rather than organic social management. However, our graphic design team provides professional social media graphics and templates you can use for your own organic posting. We can discuss expanded social services during your consultation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Contact form options                                              */
/* ------------------------------------------------------------------ */
export const islands = [
  "New Providence (Nassau)",
  "Grand Bahama (Freeport)",
  "Abaco",
  "Eleuthera",
  "Exuma",
  "Andros",
  "Bimini",
  "Cat Island",
  "Long Island",
  "Inagua",
  "Other Family Island",
] as const;

export const businessStages = [
  "Just starting out – no online presence",
  "Have social media but no website",
  "Have a website but need better marketing",
  "Established and ready to scale",
] as const;

export type ServiceOption = { id: string; label: string; icon: IconKey };

export const serviceOptions: ServiceOption[] = [
  { id: "web", label: "Web Design & Online Store", icon: "web" },
  { id: "meta", label: "Facebook & Instagram Ads", icon: "social" },
  { id: "google", label: "Google Ads", icon: "google" },
  { id: "email", label: "Email Marketing", icon: "email" },
  { id: "sms", label: "SMS Marketing", icon: "sms" },
  { id: "graphic", label: "Graphic Design", icon: "graphic" },
];

/* ------------------------------------------------------------------ */
/*  Founder                                                            */
/* ------------------------------------------------------------------ */
export const founder = {
  name: "Asher Rolle",
  title: "Founder & CEO",
  org: "Ashro Design",
  quote:
    "Every Bahamian business deserves a real shot at competing online — not someday, but now. I started Ashro Design to give our local stores the same firepower the big brands have: a professional storefront, marketing that actually sells, and a team that understands this market because we live in it. My goal is to see island brands shipping worldwide — and becoming names every Bahamian knows.",
} as const;
