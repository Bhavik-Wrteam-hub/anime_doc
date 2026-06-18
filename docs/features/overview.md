---
sidebar_position: 1
sidebar_label: Platform Overview
title: Platform Overview & Feature Matrix
---

# Platform Overview & Feature Matrix

**Hypemuse** is a hybrid mobile application that fuses four proven business models into a single, vertically-integrated product for the anime art community:

| Pillar | Familiar analogue | What it means here |
| --- | --- | --- |
| **Social network** | Instagram | Artists publish work, fans follow, like, save, and download |
| **Service marketplace** | Fiverr | Artists list paid services; fans book, pay, and review |
| **Reverse marketplace** | Upwork | Fans post commission briefs; artists discover and bid on them |
| **Creator subscriptions** | Patreon | Exclusive artist content tiers *(scaffolded — see [Roadmap](./roadmap.md))* |
| **IoT companion** | Wearable display | Push custom artwork to a Bluetooth smart-watch screen |

The reference build ships as a cross-platform **Flutter** app (iOS, Android, iPad/tablet) backed by a **Laravel** admin panel and REST API, with **Firebase** authentication and **real-time WebSocket** messaging.

:::tip For evaluators & buyers
This is not a template skin over a single feed. It is a complete two-sided economy: a **consumer app**, an **artist studio/dashboard**, an **earnings & payout system**, an **IoT hardware bridge**, and an **admin-controlled backend** — all production-wired against a live API.
:::

---

## The three roles

The entire product is organized around three roles. A single account can progress from Fan → Artist after verification.

| Role | Who they are | Primary surface |
| --- | --- | --- |
| **Fan / Normal User** | Anime enthusiasts who browse, follow, commission, book, and chat | The 5-tab consumer app |
| **Artist / Provider** | Verified creators who sell services, take commissions, and earn | Artist Studio + Provider dashboard |
| **Admin** | Platform operators | Web admin panel (content, approvals, payouts, config) |

See [User Roles & Permissions](./architecture.md#user-roles--permissions) for the full capability matrix.

---

## Complete feature list

A bird's-eye inventory of everything in the build. Each item links to its detailed module page.

### Onboarding & accounts — _[details](./onboarding-authentication.md)_
- Animated splash with remote config bootstrap (currency, version, maintenance)
- Multi-page onboarding carousel
- Sign up / sign in with **Email**, **Phone (OTP)**, **Google**, and **Apple**
- Firebase-backed password reset via email link
- Social-profile completion step for first-time social/phone sign-ups
- Security center — change password & reset methods

### Discovery & home — _[details](./home-and-discovery.md)_
- Personalized home feed with pull-to-refresh
- Auto-rotating promotional **sliders**
- **Live Events** banners that deep-link into a tag-filtered Explore feed
- **Elite Service** and **Elite Creator** curated rails with "Book Now"
- Full-screen **Explore** feed with Popular rail
- Unified **Search** across Services and Creators (independently paginated)
- **Trend / Rank** leaderboard

### Social & profiles — _[details](./social-and-profiles.md)_
- Dual-mode profile (own vs. another artist)
- Work & Service tabs, follower / following / likes counters
- Posts with **like**, **save/wishlist**, and **download** interactions (optimistic UI)
- Follow / unfollow with optimistic state
- **Invitations** inbox (tagged commission invites)
- Personal **QR code** + in-app QR **scanner**

### Commissions (reverse marketplace) — _[details](./commissions.md)_
- 3-step **Create Post** brief: reference image → privacy/style/format/deadline/budget → review
- Direct-invite an artist to a brief
- Publish-success flow

### Services & bookings — _[details](./services-and-bookings.md)_
- Rich service detail (gallery, artist, reviews, "frequently added together")
- Booking summary, **Stripe** payment (WebView), order confirmation
- **My Bookings** with Upcoming / Completed / Cancelled tabs
- Cancel & rebook
- Star-rating **reviews** with photos; paginated review lists

### Messaging — _[details](./messaging.md)_
- Real-time 1-to-1 chat over **Laravel Reverb** WebSockets
- Conversation list, typing indicators, read receipts
- Image attachments, auto-scroll, reconnect with backoff

### Artist Studio & earnings — _[details](./artist-studio.md)_
- "Become an Artist" intro explaining the two commission models
- Multi-step **verification application** (portfolio, ID, agreement)
- Provider **dashboard** with live stats
- **Discover Jobs** with All / Active / History filters
- **Bid/apply** on jobs with fee breakdown
- **Slot management** (availability scheduling)
- **Earnings & withdrawals** with admin-reviewed payouts (min-balance gated)
- Service management (create / edit / delete)

### IoT device companion — _[details](./device-iot.md)_
- Bluetooth pairing with a **JieLi smart-watch**
- Camera/gallery capture → circular crop → 360×360 export
- Push a custom background image to the watch face

### Settings & support — _[details](./settings-and-support.md)_
- Multi-language localization
- Push-notification inbox & preferences
- Help Center / FAQs
- Legal: Privacy, Terms, Refund, About, Contact (admin-authored HTML)
- Rate-us deep links

### Platform-wide systems — _[details](./technical-highlights.md)_
- **Force-update** gate, **Maintenance mode**, **Connectivity** gate
- FCM **push notifications** with deep-link routing
- Admin-driven runtime configuration

### Admin panel — _[details](./admin-panel.md)_
- Content management (sliders, live events, services, posts)
- Artist application review & approval
- Withdrawal/payout review
- Payment-gateway configuration
- App configuration (currency, versions, maintenance, legal content)

---

## Screens at a glance

The consumer app is a five-tab shell — **Home · Explore · Device · Message · Profile** — with deep stacks beneath each. Below are real screens from the live build.

<div className="screen-gallery">

| | | |
| :---: | :---: | :---: |
| ![Splash](/img/screens/phone/01-splash.png) | ![Sign up](/img/screens/phone/02-auth-signup.png) | ![Home](/img/screens/phone/03-home.png) |
| **Splash** | **Sign up / Sign in** | **Home feed** |
| ![Explore](/img/screens/phone/04-explore.png) | ![Messages](/img/screens/phone/05-messages.png) | ![Profile](/img/screens/phone/06-profile.png) |
| **Explore** | **Messages** | **Profile** |

</div>

---

## Technology at a glance

| Layer | Technology |
| --- | --- |
| **App framework** | Flutter (Dart 3.11+), Material 3 |
| **State management** | flutter_bloc (Cubit/BLoC) + Equatable |
| **Navigation** | GetX routing |
| **Networking** | Dio (with cURL request logging in debug) |
| **Local storage** | Hive |
| **Auth** | Firebase Auth — Email, Phone OTP, Google, Apple |
| **Realtime** | Laravel Reverb (Pusher protocol) over `web_socket_channel` |
| **Push** | Firebase Cloud Messaging + awesome_notifications |
| **Payments** | Stripe (via WebView checkout) |
| **Media** | image_picker, file_picker, cached_network_image, flutter_svg |
| **Device/IoT** | Bluetooth bridge to JieLi watch SDK |
| **QR** | mobile_scanner (scan) + qr_flutter (generate) |
| **Backend** | Laravel REST API + admin panel (`/api/v1`) |

See [Architecture & Module Breakdown](./architecture.md) for how these fit together.

---

## Responsive by design

Every screen adapts from phone to tablet. The same codebase renders a comfortable iPad layout with wider rails and multi-column content.

| Phone | Tablet (iPad) |
| :---: | :---: |
| ![Home phone](/img/screens/phone/03-home.png) | ![Home tablet](/img/screens/tablet/home-ipad.png) |

:::note
Screenshots throughout this documentation are captured from the live reference build (`admin.hype-muse.com` API). Sample content (artist names, artwork, prices) is placeholder data and is fully managed from the admin panel.
:::
