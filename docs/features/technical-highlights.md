---
sidebar_position: 13
sidebar_label: Technical Highlights
title: Technical Highlights & Platform Systems
---

# Technical Highlights & Platform Systems

This page collects the engineering decisions and cross-cutting systems that make the app production-grade — the things a technical reviewer or buyer's developer will care about.

## Architecture quality

- **Feature-first clean architecture** — every feature is a self-contained module (`screens / widgets / blocs / models / repositories`). See [Architecture](./architecture.md).
- **Strict layering** — UI → Cubit/BLoC → Repository → Dio. Widgets hold no business logic; cubits never touch the network directly.
- **Reusable design system** — a `commons/widgets` glassmorphism kit (glass cards, sheets, buttons, fields, nav bars, shimmers, dialogs) ensures visual consistency and fast new-screen development.
- **Centralized constants** — all URLs, durations, and layout numbers live in `core/constants`; no magic values inline.

## State & data

- **flutter_bloc (Cubit/BLoC)** with `Equatable` for cheap, correct rebuilds.
- **Shared pagination engine** — one `BasePaginationCubit` + `PaginatedListView` powers every infinite list (search, reviews, bookings, invitations, withdrawals) with consistent loading/empty/error/refresh behavior.
- **Singleton services** for cross-screen truth (follow, likes/wishlist, currency, connectivity) accessible without a `BuildContext`.
- **Hive** for fast local persistence (cached settings, session) enabling instant cold-start rendering.
- **Optimistic UI** on follows, likes, saves — instant feedback, background reconciliation.

## Real-time messaging

Self-hosted **Laravel Reverb** (Pusher protocol) over pure-Dart WebSockets, with private-channel auth, typing/read events, and **exponential-backoff reconnect** (up to 60 s). No paid chat SaaS. Full detail in [Messaging](./messaging.md).

## Push notifications

```
FCM message ──► NotificationService ──► awesome_notifications (render)
     │                                          │
     │  foreground / background / terminated     ▼
     └────────────────────────────►  tap ──► NotificationNavigationHandler ──► deep route
```

- Receives **Firebase Cloud Messaging** in all app states.
- Renders foreground notifications and handles taps via `awesome_notifications`.
- **Deep-link routing** sends a tapped notification to the right screen.
- **Cold-start handling** — a notification that launched the app from a terminated state is processed once the authenticated shell mounts (`processInitialMessage`).
- Permission prompt is **deferred** to after first feed load for a calmer first run.

## Platform resilience systems

Three always-on guards protect the experience:

| System | Trigger | Behavior |
| --- | --- | --- |
| **Connectivity gate** | Device goes offline | Global No-Internet overlay over any screen; auto-restores on reconnect (with a Retry re-probe) |
| **Maintenance mode** | `maintenance_mode = 1` | Full-screen, undismissable block at startup |
| **Force update** | Installed version &lt; admin minimum | Blocking dialog routing to the store |

These are driven entirely by admin config — operators can take the app down for maintenance or force an upgrade remotely.

## Networking

- **Dio** HTTP client with typed exceptions (`ApiException`).
- **cURL request logging** in debug builds — every API call is printed as a runnable `curl` command (guarded by `kDebugMode`, silent in release). Excellent for debugging and QA.
- All endpoints derive from one base URL constant; switching environments is a one-line change.

## Security & compliance

- **Firebase-managed credentials** (Email/Phone/Google/Apple) — passwords never stored by the app.
- **Apple Sign In with crypto nonce** for App Store compliance.
- **WebView-isolated payments** keep card data off-device (minimal PCI scope).
- **Private-channel WebSocket auth** for chat.
- **Runtime permission handling** (camera, gallery, Bluetooth, location, notifications) via `permission_handler` with in-app denied-state guidance.
- **Admin-authored legal content** keeps store policies current.

## Performance

- **Lazy tab building** in the nav shell — hidden tabs cost nothing until opened.
- **Sliver-based feeds** build heavy cards on demand.
- **`cached_network_image`** for disk/memory image caching.
- **Concurrent section loading** with isolated failure on Home.
- **Instant cold start** via Hive-cached settings before the first network response.

## Cross-platform reach

One Flutter codebase targets **iOS, Android, and tablets/iPad**, with responsive layouts throughout. The repository also contains scaffolding for web, macOS, Windows, and Linux targets.

## Tooling & testing

- `flutter_lints` for static analysis.
- `bloc_test` + `mocktail` for cubit/BLoC unit testing.
- `flutter_launcher_icons` and `change_app_package_name` for white-label rebranding.
