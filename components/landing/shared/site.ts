/**
 * Canonical-URL helper for the five landing pages (/attorney, /doctor, /ecommerce, /plumber,
 * /restaurant), copied unchanged from company-site-frontend so their metadata stays identical.
 *
 * Kept separate from `lib/site.ts` on purpose: that file's `url` is still pending the owner's
 * decision and must not be guessed, while these pages already shipped with these canonicals.
 * Set NEXT_PUBLIC_SITE_URL in production to the exact canonical origin.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://www.waywisetech.com"
    : "http://localhost:3000");

export const SITE_URL = rawUrl.replace(/\/+$/, "");

export function absoluteUrl(path?: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
