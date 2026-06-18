---
sidebar_position: 5
sidebar_label: Social & Profiles
title: Social, Profiles & Engagement
---

# Social, Profiles & Engagement

The social layer turns the marketplace into a community: profiles, portfolios, follows, post engagement, invitations, and a personal QR identity.

## Profiles (dual-mode)

![Profile screen](/img/screens/phone/06-profile.png)

A single profile screen renders two very different experiences depending on whose profile is shown:

| | **Own profile** | **Another artist's profile** |
| --- | --- | --- |
| Top bar | Become Artist / My Studio + Settings + QR | Back arrow only |
| Action buttons | — | **Follow** + **Message** |
| Counters | Following · Followers · Likes | Following · Followers · Likes |
| Tabs | **Work** · **Service** | **Work** · **Service** |
| Floating button | **+** create post | — |
| Extra | Artists see a **Manage** button | — |
| Data source | local session | `GET /artists/{id}` |

The header shows the avatar, display name, `@username`, a bio, and the three engagement counters. The **Work** tab is the portfolio grid; the **Service** tab lists the artist's bookable services.

## Posts & engagement

Each post supports three persisted interactions, all with **optimistic UI** (the icon flips instantly; the API confirms in the background):

| Action | Endpoint | Result |
| --- | --- | --- |
| **Like** | `POST /posts/{id}/interact` `{type:"like"}` | Toggles, returns new state |
| **Save / Wishlist** | `POST /posts/{id}/interact` `{type:"save"}` | Toggles, returns new state |
| **Download** | `POST /posts/{id}/interact` `{type:"download"}` | Records & returns new `downloads_count`; saves image to gallery |

Tapping a post opens a read-only **Post Preview** with the full-screen zoomable image, author, type chip, and caption.

## Follow system

Follow/unfollow is available from profiles, search rows, and creator rails. State is **optimistic** and centralized in a `FollowService` singleton so the same artist's follow state stays consistent everywhere it appears in the UI. Backed by `POST`/`DELETE /artists/{id}/follow`.

## Invitations

![Settings entry](/img/screens/phone/07-settings.png)

The **Invitations** inbox (Settings → Invitations) is a paginated list of commission briefs the user has been **directly invited/tagged** into — the inbound side of the [Create Post](./commissions.md) direct-invite feature. Each row is an invitation card with full pagination, pull-to-refresh, and load-more.

## QR identity & scanner

- **My QR** — every profile can render its own QR code (via `qr_flutter`) from its profile link, for fast in-person sharing.
- **Scanner** — a full camera-lifecycle QR scanner (`mobile_scanner`) that handles permission requests, in-screen denied-state prompts, and releases the camera while backgrounded.

## Manage (artist content)

Artists open **Manage** from their own profile to administer their published content:

- Delete posts (`DELETE /posts/{id}`)
- Edit services (`PUT /services/{id}`)
- Delete services (`DELETE /services/{id}`)

## Edit profile

The Edit Profile screen updates name, username, and avatar. Name/username open a focused single-field editor with a live character counter; the avatar "Change" pill opens the gallery and uploads immediately. A circular image cropper ensures clean avatars.

## Technical highlights

- **Optimistic interactions** with singleton-backed consistency (follow, likes/wishlist).
- **Source-agnostic post preview** — one payload built from either a profile post or an artist post model.
- **Full camera lifecycle management** for the QR scanner, including background release.
- **Gallery save** of downloaded artwork via `gal` with runtime permission handling.

## Complete design flow

The profile and content-management surfaces — profile view, QR identity, edit profile, portfolio grid, service detail, and the manage/settings stack — exported directly from the source **Figma** design file:

![Profile & studio flow (Figma)](/img/screens/figma/flow-profile-studio.png)
