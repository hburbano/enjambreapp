/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/react" />

interface ImportMetaEnv {
  readonly VITE_CARTO_API_KEY?: string;
  /** Production origin, e.g. https://enjambreapp.vercel.app (no trailing slash). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Injected by `vite.config.ts` from `VITE_CARTO_API_KEY`. */
declare const __CARTO_API_KEY__: string;
