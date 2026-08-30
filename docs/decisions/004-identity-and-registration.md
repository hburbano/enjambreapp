# ADR-004: Identity & registration (report-first)

**Status:** Accepted  
**Date:** 2026-08-30  
**Context:** Who must create an account before using Enjambres Colombia — and who must not

## Decision summary

**Report without an account.** The default path is **no registration**.

A citizen who sees a swarm should send **photo + location** in one sitting. Email, password, name, and role come later — and only if they help that person (updates, history on another device) or that role (rescuer).

| Path | Registration | Identity we keep |
|------|--------------|------------------|
| **View map / Aprende / list** | None | None |
| **Report a swarm** | None | Device/session id (anonymous) |
| **Optional updates** | One optional contact after submit | Email or WhatsApp on *that* report |
| **Repeat reporter, other device** | Optional magic link / OTP | Convert anonymous session → profile |
| **Rescuer / beekeeper** | Lightweight account required | Email or phone + role `rescuer` |
| **Admin** | Invite-only | Role `admin` |

From the reporter’s point of view this is **no registro**.  
From the system’s point of view it is **registro mínimo**: a silent anonymous session so reports can have an owner, RLS can work, and the person can claim their history later.

This closes open question 1 in [mockup analysis](../mockup-analysis.md).

---

## Product summary (why this matters)

Enjambres Colombia is a **civic / citizen-science** loop:

```
reporta → localizamos → rescatamos → protegemos
```

Two audiences, two frictions:

| Audience | Job to be done | Friction if we gate on signup |
|----------|----------------|-------------------------------|
| **Reporter** (anyone outdoors) | “There is a swarm *now* — tell someone.” | Account form kills the report. The swarm is gone; the person is gone. |
| **Rescuer / beekeeper** | “Claim nearby reports and update status.” | Need a stable identity and a way to contact them. Signup is acceptable. |

v0 is a **no-backend POC** ([ADR-003](./003-backend-hosting.md)): map, list, Aprende, Perfil placeholder, mock data. Perfil already shows **Invitado**. v1 will add Supabase (Auth + Postgres + Storage). This ADR is the identity policy for v1+; v0 only reflects it in copy and types.

Constraints that push toward no signup:

1. **Urgency** — reporting happens in the field, often once.
2. **Reach** — shareable web URL, zero install ([ADR-001](./001-app-vs-webapp.md)).
3. **Privacy** — Ley 1581 de 2012 (habeas data): collect the least PII that still lets a rescue happen.
4. **Trust** — a public map of swarms does not need the reporter’s name or email on the pin.

---

## Options considered

| Option | Verdict |
|--------|---------|
| **Full signup before report** (email + password + name + role) | **Rejected** — highest drop-off on the core action |
| **Minimal signup before report** (magic link or OTP first) | **Rejected for reporters** — still a gate; inbox/SMS delay in the field |
| **No identity at all** (unowned rows, `user_id` null forever) | **Rejected as default** — cannot show “mis reportes”, claim across devices, or apply RLS cleanly |
| **Anonymous session + optional contact + optional account** | **Chosen** — no form before report; stable owner under the hood |
| **Clerk / social-only login** | Not default — extra vendor; social login is not “mínimo” |

---

## Identity tiers

```
guest (anonymous session)
    │
    ├─ optional contact on a single report (email or WhatsApp)
    │
    └─ optional account (magic link / OTP)
           │
           ├─ reporter (default role)
           └─ rescuer  (self-declare in v1; verify later)
```

### 1. Guest — default

- No email, password, display name, or role picker before **Reportar enjambre**.
- v0: conceptual only (no backend).
- v1: **Supabase Anonymous Auth** (`signInAnonymously`). Creates an `auth.users` row and JWT **without credentials**. The person never sees a signup form.
- That session owns the report (`reports.user_id = auth.uid()`).
- Perfil stays **Invitado**: “Puedes reportar sin cuenta. Tus reportes de este dispositivo aparecen aquí.”

### 2. Optional contact — after submit, not before

After a successful report, offer **one optional field**:

> ¿Quieres que te avisemos cuando un rescatista atienda este enjambre?  
> Email o WhatsApp (opcional)

- Stored on the **report**, not as a public profile.
- Never shown on the map, list, or public detail.
- Used only for status updates on that report.
- Skipping it still publishes the report.

### 3. Optional account — claim / multi-device

When the person wants history on another phone or a stable inbox:

- Magic link or one-time code (email or phone).
- Convert the anonymous user (`updateUser` / link identity) so past reports stay theirs.
- No password unless we later need it for rescuers.

### 4. Rescuer — identity required

Claiming a report and changing status is a **privileged write**. That needs a person we can reach and, later, verify.

- Lightweight account: magic link / OTP + role `rescuer`.
- v1: self-declare (open question 2 in the mockup — invite-only vs self-register — stays open).
- v1.1+: verification (admin or peer).
- Rescuers are **not** the reason to force signup on citizens.

### 5. Admin — invite-only

Out of band. Not a public registration path.

---

## What each role can do without vs with an account

| Action | Guest | Optional account | Rescuer account |
|--------|-------|------------------|-----------------|
| View map, list, detail, Aprende | Yes | Yes | Yes |
| Create report (photo + GPS) | **Yes** | Yes | Yes |
| See “mis reportes” on this device | Yes (session) | Yes (all devices) | Yes |
| Leave optional contact | Yes | Yes | Yes |
| Claim / change report status | No | No | Yes |
| Public name / email on the map | Never | Never | Never (contact is handoff, not a public field) |

---

## v0 vs v1 implementation

### v0 (this repo today)

- No Supabase, no API ([ADR-003](./003-backend-hosting.md)).
- Perfil copy describes guest-first; it is not a login wall.
- Shared types allow a report **without** a registered author and a user **without** email.
- Report CTA stays a stub until the real form ships.

### v1 (Supabase)

```
Reporter taps Reportar
        │
        ▼
If no session → signInAnonymously()   // silent, no UI
        │
        ▼
Photo + geolocation + short place text
        │
        ▼
Insert reports row (user_id = auth.uid())
Upload photo to Storage
        │
        ▼
Optional: contact on this report
        │
        ▼
Pin appears on the map
```

Schema implications (extends the draft in ADR-003):

```
profiles  (extends auth.users)
  id, role (reporter | rescuer | admin),
  display_name,              -- optional; guests have none
  email,                     -- nullable until they link an account
  identity (anonymous | registered),
  …

reports
  id, user_id,               -- always set in v1 (anon or registered)
  lat, lng, city, department, neighborhood,
  photo_path, status,
  contact_email,             -- optional, private
  contact_phone,             -- optional, private (WhatsApp)
  created_at, updated_at
```

RLS sketch:

- `SELECT` reports: public (map is the product). Hide `contact_*` columns from anon/authenticated clients that are not owner or rescuer.
- `INSERT` reports: authenticated (including anonymous users).
- `UPDATE` status: rescuer or admin; reporter may not flip to `resolved`.
- Storage: public read for report photos; write only as owner.

Env stays `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`. Enable Anonymous Sign-Ins in the Supabase project; do not add a signup screen for the report flow.

---

## Abuse, spam, and safety

No signup does **not** mean no limits.

| Control | When |
|---------|------|
| Photo required to publish | v1 |
| GPS or map-picked point required | v1 |
| Rate limit per session / IP | v1 |
| Hide reporter contact on all public surfaces | v1 |
| Soft-delete / hide by admin | v1 |
| CAPTCHA or similar only if abuse appears | later |
| Photo moderation before the pin is public | still open (mockup question 4) |

A fake account is cheaper to automate than a photo + location. Requiring signup would not stop spam; requiring a photo might.

---

## Consequences

- **Positive:** Core civic action has zero account friction.
- **Positive:** Least PII for the common case (Ley 1581 alignment).
- **Positive:** Anonymous Auth still gives an owner for “mis reportes”, claim-later, and RLS.
- **Positive:** Perfil remains useful for guests (policy + local reports), not a dead “inicia sesión” wall.
- **Negative:** Cross-device history is opt-in; people who never leave a contact cannot get status messages.
- **Negative:** Anonymous Auth and public inserts need rate limits from day one of v1.
- **Neutral:** Rescuer onboarding (self-register vs invite) is a separate decision.

## Out of scope

- Building the real report form or wiring Supabase (still v1).
- Passwords as the default auth method.
- Social login (Google / Apple) as a prerequisite to report.
- Publishing reporter identity on the map.

## Related

- [Mockup analysis](../mockup-analysis.md) — open question 1 (anonymous reports) → **allowed, no login**
- [ADR-001: App vs webapp](./001-app-vs-webapp.md) — report + map + auth must work in WebView; auth here means optional session, not a signup wall
- [ADR-003: Backend & hosting](./003-backend-hosting.md) — Supabase Auth in v1; this ADR says *how* we use it
