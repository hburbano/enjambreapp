/** Client-safe app config (values come from Vite / `VITE_*` env). */
export const config = {
  cartoApiKey: __CARTO_API_KEY__,
} as const;
