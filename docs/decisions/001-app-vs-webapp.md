# ADR-001: App vs webapp

**Status:** Accepted  
**Date:** 2026-08-26  
**Context:** Enjambres Colombia — product form factor for v1 and long-term vision

## Product vision

**Start as a webapp. Build toward a full mobile app.**

| Phase | Delivery | Goal |
|-------|----------|------|
| **Now (v1)** | Mobile-first **webapp** (Vite + React) | Ship fast, validate the report → rescue loop |
| **Next (v1.x)** | **PWA** — installable, icons, home screen | App-like feel without store friction |
| **Then (v2)** | **Native shell** — Capacitor wrapping `apps/web` | App Store + Play Store, push notifications, camera/GPS plugins |
| **Future (v3+)** | Full native only if web shell limits us | React Native / Expo or platform-specific code if Capacitor is not enough |

The mockup ([`ENJAMBRE.jpeg`](../ENJAMBRE.jpeg)) is the **target UX for both web and app** — we are not designing two products, one delivery surface at a time.

## Context

The reference mockup is presented in a phone frame. We need to decide whether v1 is a **native mobile app**, a **webapp**, or both.

Product requirements from the mockup:

- Map with geolocated pins and clustering
- Camera photo upload for reports
- Bottom-tab navigation (Map, Reports, Learn, Profile)
- Community workflow: report → map visibility → rescue → resolved

## Decision

**Ship a mobile-first webapp in v1.** Architect the monorepo and UI so the same codebase can become a **full app** (store listings, push, native device APIs) via Capacitor in v2.

| Option | v1 | v2+ vision |
|--------|----|------------|
| **Webapp** (Vite + React) | ✅ Primary delivery | Still the core UI layer inside the native shell |
| **PWA** | Optional v1.1 | Bridge until store apps ship |
| **Capacitor app** (iOS + Android) | ❌ Not v1 | ✅ **Target “full app” path** — reuse `apps/web` build |
| **Pure native** (Swift/Kotlin) | ❌ | ❌ Last resort — only if Capacitor blocks critical features |
| **React Native / Expo** | ❌ | ❌ Parallel codebase — avoid unless web path fails |

## Rationale

### Why webapp first

1. **Mockup maps to web** — tab bar, full-bleed map, and card UI are standard responsive web patterns.
2. **Browser APIs are enough for v1** — geolocation, camera/file input, and service workers cover MVP.
3. **Faster iteration** — deploy without app store review; fix bugs in hours, not days.
4. **Reach** — shareable links, zero install for first-time reporters in the field.
5. **Sets up the app vision** — `packages/ui` + `packages/types` stay shared when `apps/mobile` (Capacitor) is added.

### Why full app is still the vision

1. **Mockup is a phone product** — users will expect home-screen presence and store discoverability.
2. **Rescuers need push** — reliable notifications for nearby swarms are hard on iOS web alone.
3. **Field use** — camera, GPS, and offline tolerance matter when reporting outdoors.
4. **Capacitor fits our stack** — one React codebase, native shell for stores, plugins for push/camera when needed.

### Why not native v1

- Duplicated effort before product validation
- App store cycle slows civic MVP iteration
- Web-first does not block app later if we keep UI in shared packages and avoid web-only hacks

## Architecture rules (webapp now, app later)

Build v1 web code as if it will ship inside Capacitor:

- **Mobile-first layouts** — safe areas, touch targets, bottom nav
- **Shared UI in `packages/ui`** — not trapped inside `apps/web` only
- **Device APIs via abstractions** — e.g. `getLocation()`, `pickPhoto()` wrappers so Capacitor plugins swap in later
- **No browser-only assumptions in core flows** — report + map + auth must work in WebView
- **Env-based config** — API URL, map keys, feature flags for web vs wrapped app

## PWA stance

PWA is a **stepping stone**, not the end state:

- **v1:** responsive web in mobile browser
- **v1.1:** `manifest.json`, icons, “Add to Home Screen”
- **v2:** store apps via Capacitor; PWA remains for users who never install

## Consequences

- **Positive:** Fast MVP today; clear path to App Store / Play Store without rewrite.
- **Positive:** Monorepo can add `apps/mobile` (Capacitor) without forking UI.
- **Negative:** v1 lacks reliable push and polished install until v2 shell ships.
- **Neutral:** Marketing starts on web URL; store listings come when rescue workflow is proven.

## Related

- [Mockup analysis](../mockup-analysis.md)
- [ADR-002: Monorepo structure](./002-monorepo-structure.md) — includes planned `apps/mobile`
