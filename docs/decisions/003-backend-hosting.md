# ADR-003: Backend & hosting

**Status:** Accepted  
**Date:** 2026-08-26  
**Updated:** 2026-08-26  
**Context:** Host the SPA on Vercel; ship a no-backend POC first; add PocketBase later

## Decision summary

| Phase | Frontend | Backend | Goal |
|-------|----------|---------|------|
| **v0 — POC** | **Vercel** (`apps/web`) | **None** | Static UI: map shell, tabs, mock data, brand — validate UX from the mockup |
| **v1 — MVP** | **Vercel** | **PocketBase** (Fly.io / Railway) | Real auth, reports, photos, live map data |
| **v2+** | Vercel (or revisit only if needed) | PocketBase (+ Capacitor shell) | Store apps, push, etc. |

**Hosting:** **Vercel** (free hobby for POC/MVP).  
**Cloudflare:** **out of path** — not part of the plan.  
**Backend:** none for v0; **PocketBase** when we leave the POC.

Still **not default:** Clerk, Supabase (PocketBase covers auth + DB + files when we need a BE).

---

## Context

Needs over time:

- v0: screens that match the mockup (Mapa, Reportes, Aprende, Perfil) with **mock / local data**
- v1+: auth, geolocated reports with photos, map updates, educational content

We previously debated Cloudflare Pages vs Vercel. For a Vite SPA POC, **Vercel is the better default** (free hosting, GitHub → URL, preview deploys). Cloudflare is not required.

## Options considered

| Option | Verdict |
|--------|---------|
| **Vercel** | **Chosen** — POC and default SPA hosting |
| **Cloudflare Pages** | **Rejected for this project path** — no material win over Vercel for a static SPA + external API |
| **PocketBase** | **Chosen for v1+** — auth, DB, files, admin, realtime |
| **No backend (v0)** | **Chosen for POC** — ship UI fast without ops |
| **Firebase / Supabase / Clerk** | Not default |

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
- Mock data only (JSON / in-memory) — **no API, no auth service, no PocketBase yet**

Out of scope for v0:

- PocketBase, Clerk, Supabase, Firebase
- Real uploads, real GPS persistence, notifications

### v1 — same Vercel app + PocketBase

```
GitHub → Vercel (apps/web)
              │
              ▼ HTTPS / realtime
         PocketBase (Fly / Railway)
```

- Wire env-based `VITE_API_URL` (or equivalent)
- Replace mocks with PocketBase collections (users, reports, photos)

## Data model (draft — for v1, not v0)

```
users
  id, email, role (reporter | rescuer | admin), display_name, …

reports
  id, user_id, lat, lng, city, department, neighborhood,
  photo_file, status (reported | visible | in_rescue | resolved),
  created_at, updated_at

learn_articles (v0/v1 can stay static markdown)
  id, slug, title, body, …
```

## Consequences

- **Positive:** POC on free Vercel with zero backend ops.
- **Positive:** Adding PocketBase later is an integration step, not a hosting rewrite.
- **Negative:** v0 demos are fake data — clear that to stakeholders.
- **Neutral:** Cloudflare removed from decisions so the path stays simple.

## Related

- [Mockup analysis](../mockup-analysis.md)
- [ADR-001: App vs webapp](./001-app-vs-webapp.md)
- [ADR-002: Monorepo structure](./002-monorepo-structure.md) — **pnpm workspaces, not Turborepo**
