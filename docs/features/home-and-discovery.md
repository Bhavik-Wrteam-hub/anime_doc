---
sidebar_position: 4
sidebar_label: Home & Discovery
title: Home & Discovery
---

# Home & Discovery

Discovery is how fans find artists and work. It spans four surfaces — **Home**, **Explore**, **Search**, and **Trend/Rank** — each tuned for a different intent.

## Home feed

![Home feed](/img/screens/phone/03-home.png)

The Home tab is a personalized, pull-to-refresh feed assembled from four independent data sources, each loaded by its own cubit so a slow section never blocks the rest:

| Section | Source | Behavior |
| --- | --- | --- |
| **Greeting + search bar** | profile | "Hey, _name_!" with a tappable search bar and QR scanner shortcut |
| **Sliders** | `GET /sliders` | Auto-rotating promotional carousel (5-second interval) |
| **Live Events** | `GET /live-events` | Tappable event banners that deep-link into a tag-filtered Explore feed |
| **Elite Service** | `GET /services` | Curated services with price + "Book Now" → service detail |
| **Elite Creator** | `GET /artists` | Curated artists with inline Follow |

Performance is engineered in: the feed uses a `CustomScrollView` with **slivers** so heavy off-screen creator cards build lazily, content renders without waiting on asset pre-cache, and pull-to-refresh fans out to all four sources concurrently.

:::note Smart first-run UX
The OS notification-permission prompt is intentionally deferred until **after** the first feed load — a calmer first impression than prompting on a blank launch screen.
:::

## Live Events feature (end-to-end)

Live Events are **time-boxed, themed campaigns** that temporarily turn the Home and Explore surfaces into an event hub — then quietly disappear when the event is over. The whole lifecycle is admin-driven and requires no app release.

### How it works

```
ADMIN                          HOME SCREEN                 EXPLORE SCREEN
─────                          ───────────                 ──────────────
Create "Football" event   ─►   Banner appears below   ─►   Tap banner ─► feed
  • banner image               the slider (only while      filtered to the event's
  • title: Football            the event is Active)        tagged posts
  • starts_at / ends_at                                         │
  • tags: [football]                                            ▼
        │                                                  Shows only posts
        ▼                                                  related to Football
  ends_at passes ───────►  Banner auto-removed ───────►  Feed returns to the
  (event Completed)        from Home                      normal, unfiltered posts
```

1. **Admin creates the event** in the [Live Events manager](./admin-panel.md#live-events) with a banner, title, a **Starts At / Ends At** window, and a set of **tags** (e.g. `football`).
2. **Home shows it below the slider.** While the event is active, its banner renders in the Live Events carousel directly beneath the promotional slider.

   ![Home with a Football live event](/img/screens/phone/03-home.png)

3. **Tapping the event opens Explore, filtered.** The tap forwards the event's tags to the Explore feed, which requests `GET /posts?tags[]=football`. Only posts related to the event are shown — *the API decides what to return; the app performs no client-side filtering*.
4. **When the event completes, the app reverts to normal.** Once `Ends At` passes (or the admin deactivates it), the event drops out of `GET /live-events`, so its banner disappears from Home and the standard Explore feed shows the **normal posts** again — automatically, with no update.

### Event lifecycle

| State | Condition | Behavior in the app |
| --- | --- | --- |
| **Scheduled** | now &lt; `Starts At` | Not shown yet |
| **Active** | `Starts At` ≤ now ≤ `Ends At` | Banner on Home; tap → tag-filtered Explore |
| **Completed** | now &gt; `Ends At` | Removed from Home; Explore shows normal posts |

### What ties it together

- **Live event** → carries `banner_image`, `title`, `tags`, and the active window.
- **Posts** → tagged with the same keywords by the artist/admin.
- **Explore** → passes `tags[]` straight to the Posts API, so event filtering is a server concern and stays consistent as posts are added or the event ends.

:::tip Marketing lever
Operators can spin up a seasonal or trending campaign (a new anime release, a sports final, a holiday) in seconds, and it self-retires on schedule — a powerful, zero-engineering merchandising tool.
:::

## Explore

![Explore feed](/img/screens/phone/04-explore.png)

Explore is the full-bleed art-browsing experience: a large immersive post card with the creator's name, and a **Popular** rail of circular avatars across the top. Each post supports the core engagement actions — **like**, **save**, **download**, and **+** (add) — with counts.

- Tapping **View All** on Popular opens a fully paginated `PopularListScreen`.
- Arriving from a Home **Live Event** banner loads Explore pre-filtered by the event's tags.

## Search

![Search — Services & Creators](/img/screens/phone/08-search.png)

One shared search field drives **two independently-paginated tabs**:

| Tab | Returns | Row actions |
| --- | --- | --- |
| **Services** | Matching services with thumbnails & rating | Open service detail |
| **Creators** | Matching artists with work previews & rating | **Follow / Unfollow** inline |

The inactive tab is fetched **lazily** the first time it's shown with a stale query, so the app never fires redundant requests. Both tabs reuse the shared pagination engine (initial load, empty, error+retry, pull-to-refresh, infinite scroll).

## Trend / Rank

A leaderboard surface that ranks artists/work — by sales, engagement, and admin boosts — giving fans a "what's hot" entry point and giving artists a growth incentive.

## Responsive layout

Discovery scales gracefully to tablets, widening rails and showing more per row.

| Phone | Tablet |
| :---: | :---: |
| ![Explore phone](/img/screens/phone/04-explore.png) | ![Explore tablet](/img/screens/tablet/explore-ipad.png) |

## Technical highlights

- **Section-level resilience** — four cubits, four loaders; failures are isolated.
- **Sliver-based lazy rendering** for buttery scroll on long feeds.
- **Concurrent refresh** — `Future.wait` across all sources for a single, correct spinner.
- **Tag deep-linking** from Live Events into Explore via the shell's `openExploreWithTags()`.
- **Lazy cross-tab fetching** in Search to minimize API calls.

:::tip Admin control
Sliders, Live Events, and the Elite Service/Creator rails are all curated from the admin panel — see [Admin Panel](./admin-panel.md).
:::

## Complete design flow

The discovery surfaces — Home (sliders, Elite Service & Creator rails), the in-app QR scanner, and the artist profile/portfolio — exported directly from the source **Figma** design file:

![Discovery & scanner flow (Figma)](/img/screens/figma/flow-discovery.png)
