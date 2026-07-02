import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow our own inline-SVG brand logo to be served via next/image.
    // (Also lets a real PNG/JPG logo drop in later with zero code changes.)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Imagery is routed through src/lib/assets.ts. Swap these for your own CDN
    // or drop files into /public/images and reference them locally.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
