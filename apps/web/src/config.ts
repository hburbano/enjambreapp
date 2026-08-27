import { DEFAULT_SITE_URL } from "../site";

/** Client-safe app config (values come from Vite / `VITE_*` env). */
export const config = {
  cartoApiKey: __CARTO_API_KEY__,
  /** Canonical origin for SEO (no trailing slash). Falls back to production URL in prod builds. */
  siteUrl: (
    import.meta.env.VITE_SITE_URL?.trim() ||
    (import.meta.env.PROD ? DEFAULT_SITE_URL : "")
  ).replace(/\/$/, ""),
} as const;
