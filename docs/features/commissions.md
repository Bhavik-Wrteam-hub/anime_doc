---
sidebar_position: 6
sidebar_label: Commissions (Create Post)
title: Commissions — The Reverse Marketplace
---

# Commissions — The Reverse Marketplace

Most marketplaces only let sellers list. This platform also lets **fans post a brief and have artists come to them** — an Upwork-style reverse marketplace. A fan describes the artwork they want, sets a budget and deadline, and either broadcasts it or invites a specific artist.

This is the **Create Post** flow: a focused, 3-step wizard that ends in a published commission request.

## The flow

```
Profile  ──(＋ FAB)──►  Create Post (step 1)
                          │  reference image · type · description
                          ▼
                       Post Privacy (step 2)
                          │  privacy · style · format · deadline · budget
                          ▼
                       Post Review (step 3)
                          │  summary  +  direct-invite an artist
                          ▼
                       Post Success  ──►  Invitation delivered to artist(s)
```

### Step 1 — Reference & description

The brief starts with the essentials:

- **Reference image** — upload a visual reference (image picker).
- **Type** — the kind of work requested.
- **Description** — free-text detail of the commission.

### Step 2 — Privacy, style, format, deadline & budget

Step two captures the commercial and creative parameters:

| Field | Purpose |
| --- | --- |
| **Privacy** | Who can see/respond to the brief |
| **Style** | Art style (sourced from `GET /styles`) |
| **Format** | Deliverable format |
| **Deadline** | When the work is needed |
| **Budget** | What the fan will pay |

### Step 3 — Review & direct invite

A read-only summary of the entire brief before publishing. Crucially, this step supports **direct invite** — the fan can target a specific artist, which lands in that artist's [Invitations](./social-and-profiles.md#invitations) inbox rather than (or in addition to) the open job pool.

### Success

A confirmation screen closes the loop; the brief is now live and, if invited, the chosen artist is notified.

## How artists receive briefs

Published briefs surface to artists through the [Artist Studio → Discover Jobs](./artist-studio.md#discover-jobs) board, where they can review details and submit a [bid/application](./artist-studio.md#bidding-on-a-job). Directly-invited artists also see the brief in their Invitations inbox.

## Technical highlights

- **Wizard state** is owned by a dedicated `CreatePostCubit`, bound to the route so it is created on entry and disposed on exit.
- **Style options are remote** (`GET /styles`) so the admin can extend the creative taxonomy without an app update.
- **Multipart upload** of the reference image through the shared Dio client.
- Clean separation of the brief's three steps into independent screens that share one cubit — easy to reorder or extend.

:::tip Why this matters commercially
The reverse marketplace doubles liquidity: even fans who don't know which artist to pick can still spend money, and artists get a steady inbound pipeline of paid work. It is a genuine differentiator versus single-direction marketplace templates.
:::
