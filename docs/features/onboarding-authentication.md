---
sidebar_position: 3
sidebar_label: Onboarding & Authentication
title: Onboarding & Authentication
---

# Onboarding & Authentication

This module covers everything from first launch to a signed-in session: the bootstrap splash, the intro carousel, the four sign-in methods, OTP verification, profile completion, password recovery, and the security center.

## Splash & bootstrap

![Splash screen](/img/screens/phone/01-splash.png)

The splash screen is more than a logo — it is the app's **bootstrap stage**. While the brand animation plays, the app:

1. Hydrates last-known settings from the Hive cache (instant).
2. Fetches fresh remote config from `GET /settings`.
3. Evaluates **maintenance mode**, **force-update**, first-run, and auth state.
4. Routes to Maintenance, Force-update, Onboarding, Auth, or Home accordingly.

See the [app-start decision flow](./architecture.md#app-start-decision-flow).

## Onboarding carousel

A multi-page, swipeable intro shown only on first run. Each page presents a value proposition with a page indicator and a Skip/Next control, ending on the authentication entry point.

## Authentication landing

![Sign up options](/img/screens/phone/02-auth-signup.png)

The auth screen offers four ways in, with the loading spinner rendered **inside** whichever button was tapped so the layout never shifts:

| Method | Flow |
| --- | --- |
| **Email** | Email + password registration / login |
| **Phone number** | Phone → Firebase OTP → verify → profile completion |
| **Google** | Google Sign-In → Firebase → profile completion |
| **Apple** | Sign in with Apple → Firebase → profile completion |

All methods authenticate through **Firebase Auth**; the Firebase ID token is then exchanged with the backend (`auth/register` / `auth/login`) to establish the app session.

### Email sign in / sign up

The login screen has an **email ⇄ phone tab toggle**, a validated form (minimum 8-character password), inline social-sign-in options, and a link to the create-account screen.

### Phone & OTP flow

```
Phone signup → enter number (country-code picker)
            → Firebase sends OTP
            → OTP screen (auto-advancing input boxes)
            → verify via Firebase
            → Social-profile completion (phone pre-filled, email editable)
            → registered & signed in
```

### Social-profile completion

Shown the first time a phone/Google/Apple user arrives. It adapts to the entry path:

- **Phone login** — phone pre-filled & editable; email empty & editable.
- **Google/Email login** — email pre-filled & disabled; phone empty & editable.

It registers the user with the backend using the Firebase ID token.

## Password recovery

The forgot-password screen takes the user's email and triggers a **Firebase password-reset link** delivered straight to their inbox — no custom OTP infrastructure required.

## Security center

From Settings, the Security screen lets a signed-in user **change their password** and manage reset methods, backed by `auth/change-password`.

## Technical highlights

- **Firebase-first identity** with four providers unified behind one session model.
- **No layout shift** on async actions — buttons own their own loading state.
- **Country-code picker** with a sensible default (`IN`) for phone entry.
- **Token exchange** pattern keeps the backend authoritative while Firebase handles credential security.
- **Apple Sign In + crypto nonce** for App Store compliance.

:::tip Buyer note
Because identity runs on Firebase, buyers can enable/disable providers, configure SMS quotas, and manage users from the Firebase console without touching app code.
:::

## Complete design flow

The full onboarding-to-authenticated journey — splash, onboarding, sign-up options, email/phone login, OTP verification, and password recovery — exported directly from the source **Figma** design file:

![Authentication & onboarding flow (Figma)](/img/screens/figma/flow-auth.png)
