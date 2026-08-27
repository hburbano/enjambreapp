# Enjambres Colombia — Documentation

Technical and product documentation for the **enjambreapp** monorepo. All docs here are in **English**. UI copy in the product remains **Spanish**.

## Index

| Document | Description |
|----------|-------------|
| [Mockup analysis](./mockup-analysis.md) | Read of the UI mockup (`ENJAMBRE.jpeg`) — screens, flows, implied data model |
| [ADR-001: App vs webapp](./decisions/001-app-vs-webapp.md) | Why we ship a webapp first, not a native app |
| [ADR-002: Monorepo structure](./decisions/002-monorepo-structure.md) | pnpm workspaces monorepo (not Turborepo) |
| [ADR-003: Backend & hosting](./decisions/003-backend-hosting.md) | Vercel POC (no BE) → Supabase free tier; PocketBase liked alternative; Cloudflare out |

## Conventions

| Area | Language |
|------|----------|
| Code (identifiers, comments, commits) | English |
| UI copy (labels, messages, marketing) | Spanish |
| Docs in `docs/` | English |
| README (root) | Spanish (product-facing summary) |

## Assets

- [`app-screenshot.png`](./app-screenshot.png) — current POC screenshot (used in root README)
- [`ENJAMBRE.jpeg`](./ENJAMBRE.jpeg) — brand logo + mobile UI mockup (reference design)
- Analysis: [mockup-analysis.md](./mockup-analysis.md)
