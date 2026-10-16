// Environment variables the app can't run without (see .env.example).
// Checked once at server start (instrumentation.ts) and read through `env()`
// so a missing one fails loudly with its name instead of as an obscure error.

export const requiredEnv = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "ADMIN_EMAILS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

type EnvName = (typeof requiredEnv)[number];

export const missingEnv = () => requiredEnv.filter((name) => !process.env[name]?.trim());

export function env(name: EnvName) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Variável de ambiente ${name} não definida (veja .env.example).`);
  return value;
}

// Public URL of the site, used for canonical links, sitemap and social cards.
// Set NEXT_PUBLIC_SITE_URL in production; Vercel's own domain is the fallback.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
