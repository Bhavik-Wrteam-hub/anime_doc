---
sidebar_position: 14
sidebar_label: Future-Ready Capabilities
title: Future-Ready Capabilities & Roadmap
---

# Future-Ready Capabilities & Roadmap

Beyond what ships today, the codebase is deliberately structured for expansion. Several capabilities are already scaffolded in the architecture and can be activated without re-architecting. This page is useful for buyers evaluating longevity and for teams planning the next release.

## Already scaffolded

### Creator subscriptions (Patreon-style)

The platform is positioned as **Social + Marketplace + IoT**, and the subscription pillar is **scaffolded but gated off** for a future phase. The profile module references a Subscribe surface behind a `phase-2` flag:

```dart
// TODO(phase-2): Uncomment when Subscribe feature is ready
// import '.../profile_subscribe_list.dart';
```

Activating it would let artists offer recurring, exclusive-content tiers with auto-renewal — a third revenue stream alongside services and commissions.

### Slot & address selection at checkout

The booking summary already contains wiring for **time-slot** and **delivery-address** selection, currently feature-flagged off:

```dart
// TODO(slot-address): re-enable when slot/address flow is restored.
```

The [slot-management APIs](./artist-studio.md#slot-management) (`/slots`, `/slots/artist/{id}`) and address models exist, so calendar-based scheduling and physical-delivery addressing can be switched back on for service types that need them.

## Natural next steps

Because the foundations are in place, these extensions are low-friction:

| Opportunity | Why it's within reach |
| --- | --- |
| **Additional payment gateways** | `payment-configuration` is already gateway-aware (PayPal/Razorpay representable); only Stripe is active today |
| **Group / community chat** | The Reverb channel infrastructure generalizes from `private-chat.{id}` to group channels |
| **Physical product fulfillment & tracking** | Address + booking models support shippable orders; a tracking provider can be layered on |
| **More IoT devices** | The native watch-service bridge pattern can host additional device SDKs |
| **Web & desktop apps** | Flutter web/macOS/Windows/Linux targets are already scaffolded in the repo |
| **Richer localization** | Drop-in language files via the existing label-key system |
| **Stories / reels** | The sliver feed + media pipeline can host short-form formats |

## White-label readiness

The project is built to be **re-skinned and resold**:

- `flutter_launcher_icons` for one-command icon generation.
- `change_app_package_name` for bundle/package rebranding.
- Centralized `core/theme` (colors, text styles, fonts) and a single design-system widget library.
- A single base-URL constant to repoint the backend.
- Admin-driven branding surfaces (currency, legal copy, policies, store links).

## Summary

The app is feature-complete for its core loops today, while carrying **subscriptions** and **slot/address scheduling** as ready-to-activate modules and a clean path to new gateways, devices, platforms, and content formats. It is a foundation to build on, not a dead-end template.
