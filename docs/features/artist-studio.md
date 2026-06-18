---
sidebar_position: 9
sidebar_label: Artist Studio & Earnings
title: Artist Studio, Jobs & Earnings
---

# Artist Studio, Jobs & Earnings

The Artist Studio is the supply side of the marketplace — the toolset a verified creator uses to win work, deliver it, and get paid. It is gated behind an admin-approved verification flow, so quality stays high.

## Becoming an artist

A fan becomes an artist through a guided, four-stage pipeline:

```
"Become an Artist" badge ──► Artist Intro ──► Artist Application (rules)
                                                      │
                                                      ▼
                                          Artist Certification (form)
                                                      │  POST /artist/apply
                                                      ▼
                                          Admin review ──► Approved → Artist Studio unlocked
```

### 1. Artist Intro

Explains the two ways artists earn on the platform — both configurable from the admin panel (`showcase_store_policy`, `project_commission_policy`):

| Model | Description |
| --- | --- |
| **Showcase Store** | List ready-made services buyers book directly (forward marketplace) |
| **Project Commission** | Take on custom briefs fans post (reverse marketplace) |

### 2. Artist Application (rules & agreement)

A rules/restrictions screen ("Ensure works are complete and clear") with a required **agreement checkbox** before the applicant can start.

### 3. Artist Certification (the form)

The qualification form collects everything admins need to verify a creator:

- **Profile introduction** (about the artist)
- **Works** — a portfolio of **4–10 images**
- **Common ID** (identity)
- **Common site** (portfolio/social link)

Submitted via `POST /artist/apply`. The app then tracks state through `GET /artist/application/status`, so the UI reflects pending/approved without guesswork.

## Provider dashboard

Once approved, the artist opens their **Provider Home** — a dashboard summarizing performance with live stats from `GET /artist/stats`: earnings, active jobs, completed work, ratings, and an earnings card that launches the withdrawal flow.

## Discover Jobs

The job board (`GET /bookings/artist`) is where artists find and manage work. A tab bar filters client-side:

| Tab | Includes |
| --- | --- |
| **All** | Every booking/brief |
| **Active** | `confirmed` · `in_progress` · `delivered` |
| **History** | `completed` · `cancelled` · `pending_payment` |

Tapping a job opens **Request Details** — title, tags, detail rows, "about the project," and "about the client" — with a **Next Step** CTA into the application/bid screen.

## Bidding on a job

The **Apply Request** screen is a structured bid:

1. **Payment bid** input with a transparent **fee breakdown**.
2. **Project timeline** dropdown.
3. **Additional details** textarea.
4. **Document upload** area (attach proposals/samples).
5. **Submit** CTA.

This is how artists compete for the briefs created in the [Commissions](./commissions.md) flow.

## Order delivery

From the dashboard, artists advance an order through its lifecycle:

- `PATCH /bookings/{id}/status` → `in_progress` / `delivered`
- `PATCH /booked-services/{id}/status` for per-service progress
- `POST /bookings/{id}/complete` to atomically complete the booking

See the [order lifecycle](./services-and-bookings.md#order-lifecycle-status-model).

## Slot management

Artists publish their **availability slots** so fans book into real, open times:

- `GET /slots/artist/{userId}` — list an artist's slots
- `POST /slots` — create availability
- `DELETE /slots/{id}` — remove a slot

## Earnings & withdrawals

The withdraw screen shows the artist's **available balance**, a guarded **Withdraw** action, and a paginated history of past requests (`GET`/`POST /withdraw-requests`).

- Withdrawals are enabled only above a **minimum balance** (a centralized constant — $50 in the reference build).
- Requests are **reviewed and paid manually by an admin** (see [Admin Panel → Artist Management](./admin-panel.md#artist-management)), giving the operator fraud control over real-money movement.

## Service management

Artists administer their listings from [Manage](./social-and-profiles.md#manage-artist-content): create new services (`add-new-service`), edit (`PUT /services/{id}`), and delete (`DELETE /services/{id}`).

## Technical highlights

- **Admin-gated supply** — verification keeps the marketplace credible.
- **Status-driven job board** with client-side filtering for instant tab switches.
- **Transparent fee breakdown** at bid time builds artist trust.
- **Min-balance guard + manual payout review** protects against abuse of real money.
- **Two configurable earning models** surfaced from admin policy text — no code change to adjust the rules.
