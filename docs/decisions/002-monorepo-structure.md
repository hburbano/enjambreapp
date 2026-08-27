# ADR-002: Monorepo structure

**Status:** Accepted  
**Date:** 2026-08-26  
**Context:** Single repository for Enjambres Colombia frontend, shared packages, and tooling

## Context

Enjambres Colombia will grow beyond a single Vite app: shared UI, types, config, and possibly a backend client layer. We want one repo, one lockfile, and pnpm workspaces.

Constraints from other ADRs and README:

- **pnpm** via Corepack
- **Node** latest (asdf `.tool-versions`)
- Code in English; UI copy in Spanish
- v1 product is the **webapp**; long-term vision is a **full mobile app** via Capacitor ([ADR-001](./001-app-vs-webapp.md))

## Decision

Use a **pnpm workspaces monorepo** at the repository root.

**Not Turborepo.** This is a monorepo via `pnpm-workspace.yaml` + root `package.json` — not [Turborepo](https://turbo.build/). Turborepo/Nx stay out of scope until build orchestration hurts (see below). People sometimes say “turbo repo” meaning “monorepo”; here we mean **pnpm monorepo**.

### Target layout

```
enjambreapp/
├── apps/
│   ├── web/                 # Vite + React SPA (v1 — primary)
│   └── mobile/              # (v2) Capacitor shell → iOS + Android store apps
├── packages/
│   ├── ui/                  # Shared React Aria + Tailwind components (web + mobile)
│   ├── types/               # Shared TypeScript types (Report, User, …)
│   └── config/              # Shared eslint, tsconfig, tailwind presets
├── docs/
│   ├── ENJAMBRE.jpeg
│   ├── mockup-analysis.md
│   └── decisions/           # ADRs
├── pnpm-workspace.yaml
├── package.json             # root scripts (dev, build, lint)
├── .tool-versions           # asdf: nodejs latest
└── README.md
```

### Package boundaries

| Package | Owns | Must not own |
|---------|------|--------------|
| `apps/web` | Routes, pages, map integration, app shell, i18n wiring | Generic buttons/cards (→ `packages/ui`) |
| `apps/mobile` (v2) | Capacitor config, native plugins, store build pipelines | Business logic (stays in web + packages) |
| `packages/ui` | Reusable accessible components (React Aria + Tailwind) | App routing, API keys, map logic |
| `packages/types` | Domain types shared by web (and future apps) | Runtime code |
| `packages/config` | ESLint, TSConfig, Tailwind preset exports | Application logic |

### Root `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Root scripts (planned)

```json
{
  "scripts": {
    "dev": "pnpm --filter @enjambres/web dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint"
  }
}
```

Package naming convention: `@enjambres/<name>` (scope TBD at scaffold time).

## Rationale

1. **One clone, one CI pipeline** — docs, web app, and shared UI stay in sync.
2. **Extract shared UI early** — map markers, report cards, and nav are reused by `apps/web` now and `apps/mobile` (Capacitor) later.
3. **pnpm** — fast installs, strict dependency graph, Corepack-friendly.
4. **Frontend-first monorepo** — v0 has no BE; v1+ uses hosted PocketBase ([ADR-003](./003-backend-hosting.md)); API client can live in `packages/` later if needed.

## Consequences

- **Positive:** Clear place for each concern; easy to add `apps/admin` or `packages/api-client` later.
- **Negative:** Slightly more setup than a flat Vite folder; developers need pnpm workspace basics.
- **Action:** Scaffolded `apps/web` + workspace packages (v0 POC, 2026-08-26).

## Out of scope (for now)

- `apps/mobile` (Capacitor) — **planned v2** per [ADR-001](./001-app-vs-webapp.md); monorepo reserves the slot
- Backend for **v0 POC** — none; UI + mock data on **Vercel** ([ADR-003](./003-backend-hosting.md))
- Backend service in-repo — PocketBase hosted for **v1+**, not a custom API in this repo yet
- **Turborepo / Nx** — not planned; add only if multi-package builds become painful

## Related

- [ADR-001: App vs webapp](./001-app-vs-webapp.md)
- [ADR-003: Backend & hosting](./003-backend-hosting.md)
