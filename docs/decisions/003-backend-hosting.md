# ADR-003: Backend & hosting

**Status:** Proposed (pending implementation)  
**Date:** 2026-08-26  
**Context:** Fastest path to MVP without Vercel, Clerk, or Supabase

## Context

The webapp needs:

- User auth (Perfil tab, reporter vs rescuer roles)
- Geolocated reports with photos
- Realtime or frequent map updates
- Static/educational content (Aprende)

Explicit **non-goals for v1 stack selection:**

- Vercel (hosting)
- Clerk (auth)
- Supabase (BaaS)

## Options considered

| Stack | Time to MVP | Pros | Cons |
|-------|-------------|------|------|
| **Firebase** (Auth + Firestore + Storage + Hosting) | ~days | One SDK, geo patterns, uploads | Google vendor lock-in |
| **PocketBase + Cloudflare Pages** | ~days | Self-contained BaaS, admin UI, SQL | Host/manage PocketBase instance |
| **Cloudflare Pages + Workers + R2 + D1** | ~1–2 weeks | Edge, cheap, no Vercel | More custom API code |
| **Custom Node API + Postgres** | ~weeks+ | Full control | Slowest for solo MVP |

## Decision (recommended v1)

**Frontend:** `apps/web` deployed to **Cloudflare Pages**  
**Backend:** **PocketBase** on Fly.io or Railway  
**Map:** **Leaflet + OpenStreetMap** (free; switch to Mapbox if UX requires)  
**Auth:** PocketBase built-in (email; OAuth optional later)

### Why this combo

- Matches [ADR-001](./001-app-vs-webapp.md) static SPA + API model
- No Clerk/Supabase/Vercel
- PocketBase covers auth, CRUD, file uploads, admin panel, realtime subscriptions — fits report + photo model
- Cloudflare Pages: fast deploys, good LATAM CDN, pairs with GitHub repo

### Alternative fast path

**Firebase** if accepting Google ecosystem is OK — equally valid, slightly different ops story.

## Data model (draft)

```
users
  id, email, role (reporter | rescuer | admin), display_name, …

reports
  id, user_id, lat, lng, city, department, neighborhood,
  photo_file, status (reported | visible | in_rescue | resolved),
  created_at, updated_at

learn_articles (v1 can be static markdown instead)
  id, slug, title, body, …
```

Geo queries: PocketBase supports lat/lng fields; clustering stays client-side (map library).

## Hosting diagram

```
┌─────────────────┐     HTTPS      ┌──────────────────┐
│ Cloudflare Pages│ ◄──────────────│  GitHub (main)   │
│  apps/web build │                └──────────────────┘
└────────┬────────┘
         │ REST / realtime
         ▼
┌─────────────────┐
│   PocketBase    │
│  Fly.io/Railway │
│  (auth, DB, S3) │
└─────────────────┘
```

## Consequences

- **Positive:** MVP in days; admin UI for moderating reports; excluded vendors avoided.
- **Negative:** Operate PocketBase uptime/backups; plan migration if scale exceeds SQLite comfort.
- **Open:** Final host choice (Fly vs Railway) at scaffold time.

## Related

- [Mockup analysis](../mockup-analysis.md) — implied entities and flows
- [ADR-002: Monorepo structure](./002-monorepo-structure.md)
