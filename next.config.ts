import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

// Everything the site loads or talks to besides itself:
//   - res.cloudinary.com: photos (admin previews load them directly)
//   - Firestore / Firebase Auth: the admin area
//   - api.cloudinary.com: direct photo uploads from the admin
// 'unsafe-inline' is needed for Next's inline scripts on statically rendered
// pages (nonces would force every page to render per request).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://res.cloudinary.com",
  "font-src 'self'",
  [
    "connect-src 'self'",
    "https://firestore.googleapis.com",
    "https://identitytoolkit.googleapis.com",
    "https://securetoken.googleapis.com",
    "https://api.cloudinary.com",
  ].join(" "),
  `frame-src ${authDomain ? `https://${authDomain}` : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Not in dev: it would break opening the dev server over plain http on the LAN.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Photos uploaded from the admin area — only this account's uploads, so
      // the image optimizer can't be used as a proxy for anyone else's assets.
      { protocol: "https", hostname: "res.cloudinary.com", pathname: `/${cloudName}/image/upload/**` },
    ],
  },
  // Extra hosts allowed to open the dev server (e.g. a phone on the LAN),
  // comma-separated in DEV_ORIGINS. Dev only; ignored in production.
  allowedDevOrigins: (process.env.DEV_ORIGINS ?? "").split(",").map((o) => o.trim()).filter(Boolean),
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
