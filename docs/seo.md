# SEO — Enjambres Colombia

How search and social previews work for the Vite SPA in `apps/web`.

## Goals (v0)

| Goal | Approach |
|------|----------|
| Shareable homepage | Static meta + Open Graph + Twitter cards in `index.html` |
| Crawl hints | `robots.txt` + `sitemap.xml` for primary routes |
| Brand in tabs / SERP | Favicon, apple-touch icon, web manifest |
| Route UX | Per-route `document.title` + description via `usePageMeta` |
| Structured data | JSON-LD `WebApplication` on the homepage |

## Production site URL

Open Graph, canonical, and sitemap **need an absolute origin**.

**Current production URL:** `https://enjambreapp.vercel.app` (defined in `apps/web/site.ts` as `DEFAULT_SITE_URL`).

Production builds use that default when `VITE_SITE_URL` is unset. Override anytime (custom domain, preview) via env:

```bash
# apps/web/.env.local (local) or Vercel → Environment Variables
VITE_SITE_URL=https://enjambreapp.vercel.app
```

No trailing slash. After changing it, redeploy so `index.html`, `robots.txt`, and `sitemap.xml` pick up the new origin (see `apps/web/vite.seo.ts`).

Local dev (`pnpm dev`) leaves the site URL empty unless you set `VITE_SITE_URL` in `.env.local`, so canonical tags do not point at production while you work locally.

## Assets (`apps/web/public/`)

| File | Role |
|------|------|
| `favicon.svg` / `favicon-32.png` | Browser tab icon |
| `apple-touch-icon.png` | iOS home-screen icon |
| `og-image.png` | 1200×630 social share card |
| `site.webmanifest` | Install / PWA name + theme |
| `robots.txt` | Crawl policy (rewritten at build if site URL set) |
| `sitemap.xml` | Primary routes (rewritten at build if site URL set) |

## Per-route titles

`apps/web/src/hooks/usePageMeta.ts` updates title and description when the SPA navigates. That helps browsers and crawlers that execute JavaScript.

**Limit:** Most social crawlers (WhatsApp, Slack, Facebook, X) **do not run SPA JS**. For those, only the static homepage tags in `index.html` matter. Deep-link previews for `/reportes/:id` need SSR or prerender later.

## SPA caveats (honest)

1. **Client-only routes** — HTML for every path is the same shell after the Vercel rewrite. Google generally executes JS; social OG does not.
2. **Mock content** — Report detail pages are POC data; do not expect durable indexing until Supabase-backed reports ship.
3. **Next steps (v1+)** — Consider prerender (e.g. `vite-plugin-ssr` / Vite SSG for marketing routes) or edge HTML for report detail OG tags when URLs become shareable.

## Checklist after deploy

- [x] Production default: `https://enjambreapp.vercel.app` (override with `VITE_SITE_URL` when the domain changes)
- [ ] Open `/robots.txt` and `/sitemap.xml` — locs should be absolute
- [ ] Share the homepage URL in [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or similar and confirm `og:image`
- [ ] Confirm favicon and theme color in the browser tab

## Related docs

- [ADR-001: App vs webapp](./decisions/001-app-vs-webapp.md) — web-first delivery
- [ADR-003: Backend & hosting](./decisions/003-backend-hosting.md) — Vercel hosting
