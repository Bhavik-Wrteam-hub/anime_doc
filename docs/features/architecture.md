---
sidebar_position: 2
sidebar_label: Architecture & Modules
title: Architecture & Module Breakdown
---

# Architecture & Module Breakdown

This page is the technical map of the app: how the code is organized, how data flows, how the user moves between screens, and what each role is allowed to do. It is written for engineers onboarding to the codebase and for technical buyers evaluating quality.

## Design principles

The app follows a **feature-first, clean-layered** architecture:

- **Feature isolation** — every feature is a self-contained folder with its own `screens/`, `widgets/`, `blocs/`, `models/`, and `repositories/`. Features do not reach into each other's internals.
- **Unidirectional state** — UI dispatches intent → **Cubit/BLoC** mutates state → UI rebuilds from state. No business logic in widgets.
- **Repository pattern** — every network call lives behind a repository; cubits never touch Dio directly.
- **Single source of truth for constants** — all URLs, durations, and layout numbers live in `core/constants`; no magic numbers inline.
- **Graceful degradation** — cached settings hydrate instantly at cold start; every getter has a sensible fallback so the UI renders before the first API response.

## Layered structure

```
lib/
├── core/                    # Cross-cutting infrastructure
│   ├── api/                 # Dio client, endpoints, exceptions, cURL logger
│   ├── configs/             # App bootstrap (initializeApp)
│   ├── constants/           # URLs, keys, spacing, notification channels
│   ├── localization/        # Languages + translations
│   ├── routes/              # Centralized GetX route table
│   ├── services/            # Singletons: connectivity, follow, likes,
│   │                        #   force-update, notifications, settings
│   └── theme/               # Colors, text styles, fonts, app theme
├── commons/                 # Shared, feature-agnostic building blocks
│   ├── blocs/               # Base pagination cubit, etc.
│   ├── models/ repositories/
│   └── widgets/             # Glassmorphism design system (cards, buttons,
│                            #   sheets, fields, nav bars, dialogs, shimmers)
├── features/                # All product features (see map below)
└── utils/                   # Label keys + helpers
```

### Feature module map

| Module | Folder | Responsibility |
| --- | --- | --- |
| **Splash** | `features/splash` | Bootstrap, config fetch, routing decision |
| **Onboarding** | `features/onboarding` | First-run intro carousel |
| **Auth** | `features/auth` | Email/phone/Google/Apple sign-in, OTP, reset, profile completion |
| **Main shell** | `features/main/screens` | 5-tab `NavShell` with lazy tab building |
| **Home** | `features/main/home` | Sliders, live events, elite services & creators |
| **Explore** | `features/main/explore` | Post feed, popular rail, tag filtering |
| **Search** | `features/main/search` | Services + creators search |
| **Trend/Rank** | `features/main/trend_rank` | Leaderboard |
| **Profile** | `features/main/profile` | Own & artist profiles, posts, services, edit |
| **Create Post** | `features/create_post` | 3-step commission brief |
| **Service Booking** | `features/main/service_booking` | Service detail, summary, payment, reviews |
| **Booking** | `features/main/booking` | My bookings, detail, review submission |
| **Messages** | `features/main/messages` | Realtime chat + conversations |
| **Invitations** | `features/main/invitations` | Tagged commission invites |
| **Provider (Artist Studio)** | `features/provider` | Application, dashboard, jobs, bidding, withdraw |
| **Manage** | `features/main/manage` | Manage own posts & services |
| **Device** | `features/main/device` | Bluetooth watch companion |
| **Scanner** | `features/main/scanner` | QR scanning |
| **Settings** | `features/main/settings` | Preferences, legal, support |
| **Connectivity** | `features/connectivity` | Global no-internet gate |
| **Maintenance** | `features/maintenance` | Maintenance-mode block |

## State management

The app uses **`flutter_bloc`** with the lightweight **Cubit** flavor for most features and full BLoC where event streams help.

- Each screen creates its cubit(s) via `BlocProvider`, triggering an initial fetch.
- Lists use a shared **`BasePaginationCubit`** that standardizes initial load, empty, error+retry, pull-to-refresh, and infinite scroll — wired through the reusable `PaginatedListView` widget.
- Global cross-screen state (follow status, wishlist/likes, currency, connectivity) is held in **singleton services** so deeply nested widgets and plain models can read it without a `BuildContext`.

## Navigation

Routing is centralized in `core/routes/routes.dart` as a GetX route table (50+ named routes). The authenticated root is **`NavShell`**, a five-tab `IndexedStack`:

```
Home (0) · Explore (1) · Device (2) · Message (3) · Profile (4)
```

Tabs are **built lazily** — a hidden tab spends no build/layout time until first opened — and the shell exposes helpers like `openExploreWithTags()` so a Live Event banner on Home can jump to a pre-filtered Explore feed.

### App-start decision flow

```
Splash
  ├─ fetch /settings (currency, versions, maintenance, legal)
  ├─ maintenance_mode == 1 ……………………→ Maintenance screen (hard block)
  ├─ force_update && version < min ……→ Force-update dialog
  ├─ first run ………………………………………………→ Onboarding
  ├─ not authenticated ………………………………→ Auth
  └─ authenticated ……………………………………………→ NavShell (Home)
```

A **ConnectivityGate** wraps the whole app and overlays a No-Internet screen the moment the device drops offline — over any screen — restoring the underlying screen automatically on reconnect.

## API surface

All endpoints derive from a single base (`https://admin.hype-muse.com/api/v1/`). Representative groups:

| Group | Endpoints |
| --- | --- |
| Auth | `auth/login`, `auth/login/phone`, `auth/register`, `auth/forgot-password`, `auth/change-password`, `auth/logout` |
| Profile | `auth/profile`, `auth/update-profile` |
| Content | `posts`, `posts/{id}/interact`, `styles`, `categories`, `sliders`, `live-events` |
| Services | `services`, `services/{id}`, `services/{id}/reviews`, `reviews`, `update-service-like` |
| Artists | `artists`, `artists/{id}`, `artists/{id}/follow`, `posts/artists/search` |
| Bookings | `bookings`, `bookings/my`, `bookings/{id}/cancel`, `bookings/{id}/rebook`, `bookings/artist`, `bookings/{id}/status`, `bookings/{id}/complete` |
| Artist app | `artist/apply`, `artist/application/status`, `artist/stats`, `slots`, `slots/artist/{id}` |
| Payments | `payment-configuration` |
| Chat | `chat/conversations`, `chat/{userId}`, `chat`, `chat/{userId}/read`, `chat/{userId}/typing` |
| Earnings | `withdraw-requests` |
| Config | `settings`, `faqs` |

## User roles & permissions

| Capability | Fan | Artist | Admin |
| --- | :---: | :---: | :---: |
| Browse, search, follow, like/save/download | ✅ | ✅ | ✅ |
| Chat with artists | ✅ | ✅ | — |
| Post a commission brief & invite artists | ✅ | ✅ | — |
| Book & pay for services | ✅ | ✅ | — |
| Leave reviews | ✅ | ✅ | — |
| Connect & push to IoT watch | ✅ | ✅ | — |
| Apply for artist verification | ✅ | — | — |
| Publish services / portfolio work | — | ✅ | — |
| Receive & bid on jobs | — | ✅ | — |
| Manage availability slots | — | ✅ | — |
| View earnings & request withdrawals | — | ✅ | — |
| Approve artists, manage payouts, content, config | — | — | ✅ |

Artists are Fans who completed the [verification application](./artist-studio.md#becoming-an-artist) and were approved by an admin. The app reads `artist/application/status` to decide which surfaces to show.

## Admin-driven runtime configuration

A `SystemSettingsService` singleton holds remote config fetched from `GET /settings` (hydrated instantly from a Hive cache, then refreshed). Admin-controlled keys include:

`currency_symbol` · `force_update` · `ios_version` · `android_version` · `app_store_link` · `play_store_link` · `maintenance_mode` · `privacy_policy` · `terms_conditions` · `refund_policy` · `about_us` · `contact_us` · `showcase_store_policy` · `project_commission_policy`

This means currency, store links, legal copy, the two artist commission policies, force-update thresholds, and maintenance mode are all changeable **without an app release**.
