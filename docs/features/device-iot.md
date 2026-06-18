---
sidebar_position: 10
sidebar_label: IoT Device Companion
title: IoT Device Companion (Smart-watch)
---

# IoT Device Companion (Smart-watch)

The **Device** tab is the platform's hardware differentiator: it turns fans' artwork into a wearable. Users connect a **Bluetooth smart-watch** (a JieLi-chipset device) and push a custom image straight to the watch face — taking digital art off the screen and onto a physical display.

This is the "IoT" in the platform's **Social + Marketplace + IoT** positioning.

## What it does

```
Device tab ──► Scan (Bluetooth) ──► Pick watch ──► Connect
                                                     │
Pick/capture image ──► Circular crop (360×360) ──► Preview ──► Upload background
                                                     │  live progress %
                                                     ▼
                                          Watch face updated ✔
```

## Connection flow

The companion is driven by a `DeviceBluetoothCubit` over a native **`JieLiWatchService`** bridge. On entering the tab it:

1. Reads any **previous-crash log** from the native layer (diagnostics).
2. Requests the required runtime permissions: `bluetooth`, `bluetoothScan`, `bluetoothConnect`, and `location`.
3. Initializes the Bluetooth stack and **syncs the current connection state** (so a returning user sees their already-paired watch).

The connection has three explicit states — **disconnected (0)**, **connecting (1)**, **connected (2)** — reflected live in the UI through event streams (`scanStatus`, `deviceFound`, `connectionState`).

| Action | Cubit method |
| --- | --- |
| Start/stop discovery | `startScan()` / `stopScan()` |
| Connect to a device | `connect(address)` |
| Disconnect | `disconnect()` |
| Push an image | `uploadBackground(imagePath)` |

Discovered devices are de-duplicated by hardware address and updated in place as scan results refine.

## Image capture & crop

The image pipeline is purpose-built for the round display:

1. Capture from **camera** or pick from **gallery**.
2. Pan/zoom inside a **circular crop** area.
3. Export the **actual cropped 360×360 PNG** — the exact resolution of the 1.85″ round watch — so the watch shows precisely what the user framed (not the raw camera image).
4. Confirm on a glowing-circle **preview** before sending.

## Upload with live feedback

Uploading streams real-time progress to the UI:

- `uploadStarted` → progress bar appears at 0%.
- `uploadProgress` → continuous `0.0 → 1.0` updates.
- `uploadSuccess` → "Custom background uploaded & enabled successfully!"
- `uploadFailed` → inline error.

## Reliability engineering

This module is notably robust for a hardware bridge:

- **Live state re-validation before upload** — because a watch can drop off Bluetooth a moment before the user taps upload, the cubit re-queries the *native* connection state and refuses with "Please connect your device first" rather than firing a doomed request.
- **Crash-log capture** from the native SDK surfaces hardware/driver issues for support.
- **Full stream-subscription cleanup** on dispose prevents leaks across tab switches.
- **Three-state connection model** keeps the UI honest about what the radio is actually doing.

:::tip Why this matters
A working IoT bridge is extremely rare in marketplace templates. It creates a tangible, giftable product (custom watch faces) and a hardware upsell channel that pure-software competitors cannot match.
:::

:::note Hardware dependency
The companion targets JieLi-chipset watches through a native service bridge. The Bluetooth/upload capability requires the corresponding native SDK and a compatible device; all other app features work independently of the watch.
:::

## Complete design flow

The end-to-end device companion journey — pair (Connect), choose/capture an image, circular crop, and Publish to the watch face — exported directly from the source **Figma** design file:

![Device companion flow (Figma)](/img/screens/figma/flow-device.png)
