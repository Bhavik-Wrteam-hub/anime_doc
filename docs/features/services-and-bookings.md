---
sidebar_position: 7
sidebar_label: Services & Bookings
title: Services, Bookings & Payments
---

# Services, Bookings & Payments

This is the forward marketplace: artists list **services**, fans browse, **book**, **pay**, track the order, and leave **reviews**. It is the primary revenue surface of the platform.

## Service detail

Reached from Home's Elite Service rail, Search, or an artist's profile, the service detail screen is a rich, conversion-focused page driven by `GET /services/{id}`:

| Block | Content |
| --- | --- |
| **Hero / gallery** | Service imagery |
| **Service info** | Title, price, rating, description |
| **Artist** | Provider summary with their other posts |
| **Reviews** | Recent reviews + "check all reviews" → paginated list |
| **Frequently added together** | Cross-sell suggestions |
| **Bottom action bar** | Persistent **Book** call-to-action |

## Booking & payment flow

```
Service detail ──► Booking Summary ──► Payment Method sheet ──► Stripe (WebView)
                       │                                            │
                       │  price breakdown / bill details            ▼
                       └──────────────────────────────►  Order confirmed → My Bookings
```

1. **Booking Summary** assembles the order with a bill-details breakdown.
2. A **Payment Method** bottom sheet loads the available gateways from `GET /payment-configuration`.
3. Checkout runs through a secure **Stripe WebView**.
4. On success, the booking is created (`POST /bookings`) and the user lands in My Bookings.

:::note Payment gateway
The reference build processes payments through **Stripe**. The payment-configuration model is gateway-aware (it can represent additional providers), but Stripe is the active gateway in this build.
:::

## My Bookings

![Settings → Booking](/img/screens/phone/07-settings.png)

Opened from Settings → Booking, the **My Bookings** screen (`GET /bookings/my`) organizes orders with a segmented tab bar:

| Tab | Shows | Actions |
| --- | --- | --- |
| **Upcoming** | Active / in-progress orders | View detail, cancel |
| **Completed** | Delivered & completed orders | View detail, **leave a review**, rebook |
| **Cancelled** | Cancelled orders | View detail, rebook |

- **Cancel** — `POST /bookings/{id}/cancel`
- **Rebook** — `POST /bookings/{id}/rebook`

The **Booking Detail** screen shows the full order, its services, status, and bill details.

## Reviews & ratings

After a completed booking, the fan can submit a **star rating with photos**:

- Multipart submission to `POST /reviews` (rating, text, images).
- A celebratory **Review Success** screen confirms submission.
- Every service has a fully paginated **all-reviews** screen (`GET /services/{id}/reviews`).

Reviews feed back into the service's rating and the artist's credibility on the Trend/Rank leaderboard.

## Order lifecycle (status model)

Bookings move through a clear set of states, updated by the artist from the [Provider dashboard](./artist-studio.md):

```
pending_payment → confirmed → in_progress → delivered → completed
                                     └────────────► cancelled
```

- Artists advance status via `PATCH /bookings/{id}/status` (`in_progress` | `delivered`) and per-service via `PATCH /booked-services/{id}/status`.
- Completion is a single atomic action — `POST /bookings/{id}/complete` marks the whole booking (and all its services) complete.

## Technical highlights

- **Single-source pricing** — currency symbol comes from admin settings; min-withdraw and limits are centralized constants.
- **WebView checkout** keeps card data off-device and PCI scope minimal.
- **Atomic completion** — a booking is the unit of completion, avoiding partial-state bugs.
- **Reusable pagination** for reviews and booking lists.
- **Cross-sell** via `frequently_added_together` to lift average order value.

## Complete design flow

The full service-to-order journey — service detail, slot/calendar selection, booking confirmation ("Booking Placed Successfully"), order detail, and payment success — exported directly from the source **Figma** design file:

![Service booking flow (Figma)](/img/screens/figma/flow-booking.png)
