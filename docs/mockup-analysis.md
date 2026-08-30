# Mockup analysis — ENJAMBRE.jpeg

Reference asset: [`ENJAMBRE.jpeg`](./ENJAMBRE.jpeg)

![Enjambres Colombia mockup](./ENJAMBRE.jpeg)

## Summary

The mockup defines **Enjambres Colombia** — a **mobile-first map application** for citizen reporting of bee swarms (*enjambres*) across Colombia. The product connects everyday reporters with beekeepers and rescuers through a shared live map, a simple report flow, and educational content.

Tagline (UI copy, Spanish): **"Juntos protegemos a las abejas"** (*Together we protect the bees*).

---

## Brand & visual language

| Element | Observation |
|---------|-------------|
| **Palette** | Yellow `#F5C518`-range primary, black text/accents, white cards, light gray map background |
| **Logo** | Hexagonal honeycomb frame + bee silhouette — reads clearly at small sizes |
| **Typography** | Bold sans-serif headings; high contrast for outdoor/mobile use |
| **Tone** | Community, urgency without alarm, conservation-focused |

The yellow/black pairing is intentional (bee association) and should carry through Tailwind design tokens.

---

## Primary screen — Map (Mapa)

Center of the experience. Colombia map with:

- **Individual markers** — yellow bee pin per report
- **Cluster badges** — black circles with counts (`7`, `3`, `5`, `2`) when reports group geographically
- **Header** — logo + product name + tagline
- **Primary CTA** — full-width yellow button: **"REPORTAR ENJAMBRE"**
- **Bottom nav** — 4 tabs (see Navigation)

### Implied technical needs

- Interactive map (Leaflet/Mapbox) centered on Colombia
- Geolocation for new reports + "near me" discovery
- Marker clustering at zoom levels
- Realtime or near-realtime updates when new reports arrive

---

## Navigation (bottom bar)

| Tab | Label (ES) | Likely scope |
|-----|------------|--------------|
| 1 | **Mapa** | Live map (default/home) |
| 2 | **Reportes** | List/history of reports — user's own + possibly nearby open ones |
| 3 | **Aprende** | Static or CMS-driven educational content about bees, safety, what to do |
| 4 | **Perfil** | Account, role (reporter vs rescuer), settings, maybe verification |

Icons in mockup: map pin, list, book, person — standard tab pattern.

---

## Feature pillars (right column in mockup)

Four value props map directly to product capabilities:

| # | Label | Meaning | Product capability |
|---|-------|---------|-------------------|
| 1 | **Reporta** | Report a swarm easily and quickly | Camera + GPS + short form |
| 2 | **Ubica** | See nearby reports on the map | Map + geospatial queries |
| 3 | **Conecta** | Connect with rescuers and beekeepers | Notifications, contact handoff, status updates |
| 4 | **Protegemos** | Protect bees, protect life | Closed-loop rescue workflow |

---

## Report detail card (example)

Sample card shown:

> **Enjambre reportado**  
> Medellín, Antioquia — Barrio La América  
> Hace 2 horas  
> [ **VER DETALLE** ]

### Implied fields on a `Report`

- `title` or type label ("Enjambre reportado")
- `city`, `department` (admin region), `neighborhood`
- `createdAt` (relative time in UI)
- `status` (open / assigned / rescued — not shown but implied by workflow)
- `photo` (referenced in "How it works")
- `coordinates` (map placement)

Detail view (not mocked) likely adds: photo gallery, map pin, status timeline, rescuer contact.

---

## How it works — 4-step flow

Section: **¿CÓMO FUNCIONA?**

| Step | Label | Description (from mockup) |
|------|-------|---------------------------|
| 1 | **Reporta** | Take a photo and send the location |
| 2 | **Localizamos** | Swarm appears on the map for everyone to see |
| 3 | **Rescatamos** | Rescuers and beekeepers are contacted to relocate |
| 4 | **Protegemos** | Bees relocated safely; community protected |

This is the **core state machine** for v1:

```
reported → visible_on_map → rescue_in_progress → resolved
```

---

## User roles (inferred)

| Role | Actions |
|------|---------|
| **Reporter** (citizen) | Create report, view own reports, read Aprende |
| **Rescuer / beekeeper** | View open reports on map, claim/update status, contact reporter |
| **Admin** (future) | Moderate reports, manage Aprende content, verify rescuers |

**Reports do not require an account** ([ADR-004](./decisions/004-identity-and-registration.md)). Perfil is guest-first: optional identity later; rescuers need a lightweight account.

---

## Platform read — phone frame vs webapp

The mockup is framed as a **phone**, but the layout is a standard **responsive web pattern**:

- Bottom tab bar → works in mobile browser and PWA
- Full-bleed map → no native-only APIs required for v1 (camera/GPS available via browser)
- No OS-specific chrome (no iOS nav bar styling dependency)

**Conclusion:** The design targets **mobile-first webapp** now, with a **full app** (store listings, push, native APIs) as the v2 goal via Capacitor — not a separate native rewrite. See [ADR-001](./decisions/001-app-vs-webapp.md).

---

## MVP scope derived from mockup

### Must have (v1)

- [ ] Map with report markers + clustering
- [ ] Report flow: photo + geolocation + neighborhood/city
- [ ] Report list (Reportes tab)
- [ ] Report detail view
- [ ] Guest-first Perfil (optional identity; no signup wall) — [ADR-004](./decisions/004-identity-and-registration.md)
- [ ] Static Aprende section (even if markdown-backed initially)

### Should have (v1.1)

- [ ] Rescuer role + status updates
- [ ] Push or email notifications on new nearby reports
- [ ] Relative timestamps ("Hace 2 horas")

### Later

- [ ] Rescuer verification
- [ ] Admin CMS for Aprende
- [ ] Offline/PWA install prompt
- [ ] Native app shell (Capacitor) reusing same web package

---

## Open questions

1. **Anonymous reports** — **decided (ADR-004):** allowed without login. Silent anonymous session; optional contact after submit; optional account to claim/history. Rescuers still need identity.
2. **Rescuer onboarding** — self-register or invite-only?
3. **Map provider** — OSM/Leaflet (free) vs Mapbox (richer, quota)?
4. **Photo moderation** — manual review before public map pin?
5. **Geographic scope** — all Colombia day one, or pilot city (e.g. Medellín)?

Track decisions in `docs/decisions/` as they are resolved.
