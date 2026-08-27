/** Canonical production origin (no trailing slash). Override via `VITE_SITE_URL`. */
export const DEFAULT_SITE_URL = "https://enjambreapp.vercel.app";

export function resolveSiteUrl(
  envValue: string | undefined,
  mode: string,
): string {
  const trimmed = (envValue ?? "").trim().replace(/\/$/, "");
  if (trimmed) return trimmed;
  return mode === "production" ? DEFAULT_SITE_URL : "";
}
