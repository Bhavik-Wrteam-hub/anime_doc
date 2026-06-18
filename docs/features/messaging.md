---
sidebar_position: 8
sidebar_label: Real-time Messaging
title: Real-time Messaging
---

# Real-time Messaging

Commission work needs conversation — reference sharing, revisions, and dispute resolution. The platform ships a full **real-time 1-to-1 chat** built on **Laravel Reverb** (Pusher protocol) over native Dart WebSockets, not polling.

## Conversation list

![Messages tab](/img/screens/phone/05-messages.png)

The Message tab (`GET /chat/conversations`) lists every conversation with the participant's avatar, name, last-message preview, and timestamp. Tapping a row opens the chat detail screen.

## Chat detail

The chat thread is fully live. On open it:

1. Fetches history via `GET /chat/{userId}` (returns `conversation_id` + messages).
2. Subscribes to the private channel `private-chat.{conversationId}` over the Reverb WebSocket.
3. Streams new messages, typing events, and attachment uploads in real time, auto-scrolling to the newest.

| Capability | How it works |
| --- | --- |
| **Send message** | `POST /chat` `{receiver_id, message}` |
| **Live delivery** | Reverb broadcast on the private channel |
| **Typing indicator** | `POST /chat/{userId}/typing` broadcasts to the peer |
| **Read receipts** | `POST /chat/{userId}/read` marks the thread read |
| **Image attachments** | Picked, uploaded, and rendered inline |

## Connection management

The WebSocket layer is production-hardened:

- **Private-channel auth** through `POST /broadcasting/auth` for secure, per-conversation subscriptions.
- **Exponential backoff reconnect** — base delay doubles each attempt up to 60 s, so transient drops self-heal.
- **Standard HTTPS port (443)** routing via nginx, so the WSS connection works on restrictive networks.
- **Pure-Dart WebSocket** (`web_socket_channel`) — no heavyweight third-party chat SDK or per-message cost.

## Technical highlights

- **Reverb / Pusher protocol** gives true push delivery with presence-style channels.
- **Cubit-owned socket lifecycle** — the `ChatCubit` opens the subscription on entry and tears it down on exit, preventing leaks.
- **Optimistic send + reconciliation** keeps the thread snappy.
- **Self-healing transport** via backoff reconnection.

:::tip Why self-hosted realtime
Running chat on **Laravel Reverb** (open-source, self-hosted) instead of a paid SaaS means **no per-message or per-MAU fees** — a meaningful margin advantage at scale, and full data ownership.
:::

## Complete design flow

The messaging experience — conversation list, 1-to-1 chat thread, the attachment sheet (Photos · Document · Scan · Drive · Camera), and the notifications inbox — exported directly from the source **Figma** design file:

![Messaging & notifications flow (Figma)](/img/screens/figma/flow-messaging.png)
