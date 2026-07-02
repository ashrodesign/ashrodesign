import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Ashro Design is a Bahamian e-commerce marketing agency. We design your website, manage your ads, and run your email, SMS, and social campaigns — so your store sells 24/7.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ashrodesign.net"),
  title: {
    default: "Ashro Design — Bahamas E-Commerce Marketing Agency",
    template: "%s · Ashro Design",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Bahamas marketing agency",
    "e-commerce Bahamas",
    "Nassau web design",
    "Facebook ads Bahamas",
    "Bahamian online store",
    "Ashro Design",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashrodesign.net",
    siteName: "Ashro Design",
    title: "Ashro Design — Bahamas E-Commerce Marketing Agency",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashro Design — Bahamas E-Commerce Marketing Agency",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
