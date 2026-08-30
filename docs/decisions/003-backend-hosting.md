# ADR-003: Backend & hosting

**Status:** Accepted  
**Date:** 2026-08-26  
**Updated:** 2026-08-26  
**Context:** Host the SPA on Vercel; ship a no-backend POC first; add Supabase (free tier) for v1+

## Decision summary

| Phase | Frontend | Backend | Goal |
|-------|----------|---------|------|
| **v0 — POC** | **Vercel** (`apps/web`) | **None** | Static UI: map shell, tabs, mock data, brand — validate UX from the mockup |
| **v1 — MVP** | **Vercel** | **Supabase** (free tier) | Real auth, reports, photos, live map data |
| **v2+** | Vercel (or revisit only if needed) | Supabase (+ Capacitor shell) | Store apps, push, etc. |

**Hosting:** **Vercel** (free hobby for POC/MVP).  
**Cloudflare:** **out of path** — not part of the plan.  
**Backend:** none for v0; **Supabase free tier** when we leave the POC.

**Liked but not chosen for now:** PocketBase — great DX (single binary, admin UI, SQLite), but free-tier hosting still means running/ops on Fly/Railway. Supabase’s managed free tier covers auth + Postgres + storage + realtime with less ops for an early MVP.

Still **not default:** Clerk, Firebase, self-hosted custom API.

---

## Context

Needs over time:

- v0: screens that match the mockup (Mapa, Reportes, Aprende, Perfil) with **mock / local data**
- v1+: auth, geolocated reports with photos, map updates, educational content

We previously debated Cloudflare Pages vs Vercel. For a Vite SPA POC, **Vercel is the better default** (free hosting, GitHub → URL, preview deploys). Cloudflare is not required.

For the backend, PocketBase remains attractive (simple, open source, excellent admin). For v1 we prioritize **zero-ops free tier**: Supabase hosts Postgres, Auth, Storage, and Realtime on a free plan that fits civic MVP traffic without managing a VPS.

## Options considered

| Option | Verdict |
|--------|---------|
| **Vercel** | **Chosen** — POC and default SPA hosting |
| **Cloudflare Pages** | **Rejected for this project path** — no material win over Vercel for a static SPA + external API |
| **Supabase (free tier)** | **Chosen for v1+** — managed auth, Postgres, storage, realtime; free tier fits early MVP |
| **PocketBase** | **Liked alternative** — prefer if we later want self-host / fewer SaaS limits; not default while free managed tier matters more |
| **No backend (v0)** | **Chosen for POC** — ship UI fast without ops |
| **Firebase / Clerk** | Not default |

## Phase detail

### v0 — Vercel POC, no backend

```
GitHub → Vercel → apps/web (static Vite build)
                    │
                    └── mock reports / fixtures in the client
```

In scope:

- pnpm monorepo + `apps/web` (Vite + React + Tailwind + React Aria)
- Mobile-first shell: bottom nav, map placeholder, report list UI, static Aprende, Perfil placeholder
- Mock data only (JSON / in-memory) — **no API, no auth service, no Supabase yet**

Out of scope for v0:

- Supabase, PocketBase, Clerk, Firebase
- Real uploads, real GPS persistence, notifications

### v1 — same Vercel app + Supabase

```
GitHub → Vercel (apps/web)
              │
              ▼ HTTPS / realtime
         Supabase (Auth + Postgres + Storage)
```

- Wire env-based `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (or equivalent)
- Replace mocks with Supabase tables / Storage (users/profiles, reports, photos)
- Use Supabase Auth as a **silent anonymous session** for reporters (no signup wall); optional magic link later. RLS policies for reporter vs rescuer access. See [ADR-004](./004-identity-and-registration.md).

## Data model (draft — for v1, not v0)

```
profiles  (extends auth.users)
  id, role (reporter | rescuer | admin),
  identity (anonymous | registered),
  display_name,              -- optional; guests have none
  email,                     -- nullable until they link an account
  …

reports
  id, user_id,               -- v1: always set (anon or registered session)
  lat, lng, city, department, neighborhood,
  photo_path, status (reported | visible | in_rescue | resolved),
  contact_email, contact_phone,   -- optional, never public (ADR-004)
  created_at, updated_at

learn_articles (v0/v1 can stay static markdown)
  id, slug, title, body, …
```

Identity policy (who signs up, who does not): [ADR-004](./004-identity-and-registration.md).

Geo: store `lat`/`lng` (or PostGIS later if queries hurt); clustering stays client-side on the map.

## Consequences

- **Positive:** POC on free Vercel with zero backend ops.
- **Positive:** v1 uses Supabase free tier — auth, DB, files, realtime without self-hosting.
- **Positive:** PocketBase remains a clean fallback if we outgrow free-tier limits or want full self-host control.
- **Negative:** v0 demos are fake data — clear that to stakeholders.
- **Negative:** Supabase free-tier quotas and pause policies apply; monitor before growth spikes.
- **Neutral:** Cloudflare removed from decisions so the path stays simple.

## Related

- [Mockup analysis](../mockup-analysis.md)
- [SEO](../seo.md) — `VITE_SITE_URL`, Open Graph, sitemap on the Vercel SPA
- [ADR-001: App vs webapp](./001-app-vs-webapp.md)
- [ADR-002: Monorepo structure](./002-monorepo-structure.md) — **pnpm workspaces, not Turborepo**
- [ADR-004: Identity & registration](./004-identity-and-registration.md) — report without an account; how v1 uses Supabase Auth
