/** Client-safe app config (values come from Vite / `VITE_*` env). */
export const config = {
  cartoApiKey: __CARTO_API_KEY__,
  /** Canonical origin for SEO (no trailing slash). Empty in local/dev until set. */
  siteUrl: (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, ""),
} as const;
