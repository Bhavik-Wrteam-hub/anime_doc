---
sidebar_position: 12
sidebar_label: Admin Panel
title: Admin Panel & Backend Operations
---

# Admin Panel & Backend Operations

The mobile app is powered by a **Laravel admin panel + REST API** at `admin.hype-muse.com`. The admin is where operators run the business — moderating content, approving artists, paying out earnings, configuring payments, and controlling the app remotely.

The panel is organized into a single left-hand navigation: **Dashboard · Artist Management · Services · Bookings · Posts · Live Events · Sliders · FAQs · Activity Log · Settings · Notifications**. Every screen below is from the live Hypemuse admin.

---

## Artist Management

Operators own the quality gate for the supply side of the marketplace.

![Admin — Artist Applications](/img/admin/artist-applications.png)

The **Artist Applications** table lists every verification request with the applicant, **Common ID**, **Common Site**, the submitted **Works** (portfolio thumbnails), **Status**, and submission time. Admins approve or reject each one; the app then reflects the decision through `GET /artist/application/status`.

This section also contains:

- **Artist Policies** — the editable *Showcase Store* and *Project Commission* policy texts surfaced in the app's [Become an Artist](./artist-studio.md#becoming-an-artist) intro.
- **Withdraw Requests** — the payout queue admins review and manually fulfill (see [Earnings & withdrawals](./artist-studio.md#earnings--withdrawals)).

---

## Services

![Admin — Services](/img/admin/services.png)

The **Services** catalog manages every bookable listing — **Title**, **Artist**, **Category**, **Price**, **Rating**, and a **Status** workflow (`Active` · `Draft` · `Inactive` · `Rejected`). A **Categories** sub-section manages the service taxonomy (`GET /categories`). These drive the Home **Elite Service** rail and the marketplace.

---

## Bookings

![Admin — Bookings](/img/admin/bookings.png)

The **Bookings** screen gives full order oversight — reference, customer, artist, service, amount, **status** (`Confirmed` · `In Progress` · `Completed` · `Cancelled` · `Pending`), and payment state. A **Payment Transactions** sub-section records settlement detail. With the [chat transcript](./messaging.md) as evidence, admins can mediate disputes and report on marketplace GMV.

---

## Posts (Commission requests)

![Admin — Posts](/img/admin/posts.png)

Every fan-created commission brief from the [Create Post](./commissions.md) flow appears here — **image**, **posted by**, **type**, **budget** range, **deadline**, **visibility**, **invites**, **status** (`Open` …), and creation date. A **Styles** sub-section manages the art-style options offered during brief creation (`GET /styles`). Admins moderate and remove posts as needed.

---

## Live Events

![Admin — Live Events](/img/admin/live-events.png)

The **Live Events** manager controls the time-boxed event banners shown beneath the Home slider. Each event has a **Banner**, **Title**, **Starts At**, **Ends At**, and **Status** — created with the **+ Create Live Event** button. In the capture above, a **Football** event runs from `13/06/2026` to `31/12/2026`.

This is the heart of the [Live Events feature flow](./home-and-discovery.md#live-events-feature-end-to-end): an active event shows on Home, deep-links into a tag-filtered Explore feed, and **automatically disappears once its end time passes**, returning the app to the normal feed — no release required.

---

## Sliders

![Admin — Sliders](/img/admin/sliders.png)

The **Sliders** manager controls the Home promotional carousel — **Image**, **Title**, **Order**, and **Status**, added via **+ Add Slider**. Served to the app through the public `GET /sliders` endpoint (each row returns an absolute `image_url`).

---

## Settings (remote app configuration)

![Admin — Settings](/img/admin/settings.png)

The **Settings** hub remotely controls the live app without a release. Each card maps to a setting delivered in the app's `GET /settings` payload:

| Card | Controls in the app |
| --- | --- |
| **Settings** | Core config flags (force-update, versions, store links, maintenance) |
| **Notification Settings** | Push configuration |
| **About Us / Terms & Conditions / Privacy Policy / Refund Policy / Contact Us** | The app's legal/support screens (HTML) |
| **Payment Gateways** | Active checkout gateway (Stripe) via `GET /payment-configuration` |
| **Default Currency Settings** | App-wide `currency_symbol` |
| **System Status / File Manager / Log Viewer** | Operational tooling |

This is why currency, legal copy, store links, force-update thresholds, and maintenance mode are all changeable **server-side**.

---

## Notifications

![Admin — Send Notification](/img/admin/notifications.png)

The **Send Notification** screen broadcasts push messages — target **All** users or a selected subset, set a **Title** and **Message**, optionally **Include Image**, and **Submit**. Delivery runs over **Firebase Cloud Messaging**; the app renders the push (with deep-link tap routing) via `awesome_notifications`. A history table logs every sent notification.

---

## Dashboard, FAQs & Activity Log

- **Dashboard** — at-a-glance KPIs (users, artists, bookings, revenue).
- **FAQs** — the admin-authored Help Center content served via `GET /faqs`.
- **Activity Log** — an audit trail of admin actions.

---

## Admin capability summary

- ✅ Approve / reject artist verifications & edit commission policies
- ✅ Manage catalog (services, categories, posts, styles, FAQs)
- ✅ Oversee bookings, payment transactions & mediate disputes
- ✅ Create time-boxed **Live Events** (auto-expiring)
- ✅ Curate the Home slider carousel
- ✅ Review & fulfill withdrawals
- ✅ Configure payment gateways & default currency
- ✅ Author all legal/support content
- ✅ Toggle maintenance & force-update remotely
- ✅ Send targeted push notifications
