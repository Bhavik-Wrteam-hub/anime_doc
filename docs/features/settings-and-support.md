---
sidebar_position: 11
sidebar_label: Settings & Support
title: Settings, Localization & Support
---

# Settings, Localization & Support

The settings module is the user's control center and the platform's compliance surface — preferences, localization, notifications, support, and all legal content.

![Settings screen](/img/screens/phone/07-settings.png)

## Settings menu

| Item | Destination |
| --- | --- |
| **Booking** | [My Bookings](./services-and-bookings.md#my-bookings) |
| **Invitations** | [Invitations inbox](./social-and-profiles.md#invitations) |
| **Language** | Language picker (shows current, e.g. "English (US)") |
| **Help Center** | FAQs |
| **Rate us** | Opens the App Store / Play Store listing |
| **Privacy & Policy** | Legal HTML |
| **Terms of Services** | Legal HTML |
| **About us** | Legal HTML |
| **Contact Us** | Legal HTML |
| **Refund Policy** | Legal HTML |
| **Log out** | Ends the session |

## Localization

The app ships a multi-language system (`core/localization`) with bundled language assets (`assets/languages/`) and a label-key indirection layer (`utils/label_keys.dart`) — every user-facing string resolves through `getTranslatedLabel(...)`. Adding a language is a matter of dropping in a translation file; the **Language** screen lets users switch at runtime.

## Notifications

- A **notification inbox/preferences** screen lets users review and manage push notifications.
- Delivery runs on **Firebase Cloud Messaging** rendered through `awesome_notifications`, so pushes display in the foreground and handle taps across all app states (foreground, background, terminated). See [Technical Highlights](./technical-highlights.md#push-notifications).

## Help Center / FAQs

The Help Center renders a searchable FAQ list from `GET /faqs`, so support content is **admin-managed** and updatable without a release.

## Legal & policy content

Privacy, Terms, Refund, About, and Contact are **not hard-coded**. Each screen renders HTML authored in the admin panel and delivered via `GET /settings` (`privacy_policy`, `terms_conditions`, `refund_policy`, `about_us`, `contact_us`) using a safe HTML renderer. This keeps the app **store-compliant and legally current** without code changes.

## Rate us

"Rate us" opens the correct store listing per platform — App Store on iOS, Play Store on Android — using the admin-configured `app_store_link` / `play_store_link`, with a graceful snackbar when a link isn't set.

## Technical highlights

- **Admin-authored legal & support content** — compliance updates ship instantly.
- **Label-key localization** decouples copy from code and enables painless translation.
- **Platform-aware store routing** for ratings.
- **HTML content rendering** via `flutter_widget_from_html_core` for rich admin content.

## Complete design flow

The settings and preferences surfaces — settings menu, notification preferences, and the legal/support detail screens — exported directly from the source **Figma** design file:

![Settings & preferences flow (Figma)](/img/screens/figma/flow-settings.png)
