---
sidebar_position: 1
---

# Installation Steps

This guide walks you through installing and configuring the Anime Artist Platform on your local development environment, from cloning the repository to running the application.

## Prerequisites

### Required Tools

1. **Node.js 20+** — [Download](https://nodejs.org/en/download)
   JavaScript runtime required to run the development server and build the project.

2. **Bun (latest)** — [Download](https://bun.sh)
   Fast package manager and runtime used for dependency installation and build scripts.

3. **Git 2.30+** — [Download](https://git-scm.com/downloads)
   Version control system for cloning and managing the project repository.

4. **Firebase CLI** — [Download](https://firebase.google.com/docs/cli)
   Command-line tool for managing Firebase services, deploying functions, and configuring authentication.

5. **VS Code (Recommended)** — [Download](https://code.visualstudio.com)
   Code editor with excellent TypeScript and React support via extensions.

### Required Files

- Access to the project repository (GitHub)
- Firebase project configuration credentials (from Firebase Console)
- Stripe API keys (from Stripe Dashboard)
- 17Track API key (for shipping integration)
- JieLi Device SDK documentation (for BLE hardware integration)

## Installation Process

### Step 1: Clone the Repository

Clone the Anime Artist Platform repository to your local machine.

1. Open your terminal
2. Navigate to the directory where you want to store the project
3. Run the following command:

```bash
git clone https://github.com/your-username/anime-artist-platform.git
cd anime-artist-platform
```

### Step 2: Install Dependencies

Install all project dependencies using Bun.

1. Ensure you are in the project root directory
2. Run the install command:

```bash
bun install
```

3. Wait for all dependencies to be installed

**Important Notes:** If you encounter permission errors on macOS/Linux, do not use `sudo`. Instead, fix your npm/bun permissions by following the official documentation.

### Step 3: Configure Environment Variables

Set up the required environment variables for Firebase, Stripe, and third-party services.

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_APP_ID=1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXX

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXX

# 17Track Shipping API
NEXT_PUBLIC_17TRACK_API_KEY=your-17track-api-key

# BLE Device Configuration
NEXT_PUBLIC_BLE_SERVICE_UUID=your-ble-service-uuid
NEXT_PUBLIC_BLE_CHARACTERISTIC_UUID=your-ble-characteristic-uuid

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Anime Artist Platform
```

**Important Notes:** Never commit your `.env.local` file to version control. The `.gitignore` file is pre-configured to exclude it.

### Step 4: Set Up Firebase Project

Configure Firebase services required by the platform.

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select an existing one
3. Enable the following services:

#### Authentication

1. Navigate to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider (for social login)
4. Add your development domain to **Authorized domains**

#### Firestore Database

1. Navigate to **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** for development
4. Choose your preferred region

#### Cloud Storage

1. Navigate to **Storage**
2. Click **Get started**
3. Configure storage rules for development

<!-- Add screenshot: ![Firebase Console Setup](./images/firebase-setup.png) -->

### Step 5: Initialize Firebase in the Project

Link your Firebase project to the local codebase.

1. Install Firebase CLI globally if not already installed:

```bash
npm install -g firebase-tools
```

2. Log in to Firebase:

```bash
firebase login
```

3. Initialize Firebase in the project:

```bash
firebase init
```

4. Select the following features when prompted:
   - Firestore
   - Storage
   - Hosting (if deploying via Firebase)

### Step 6: Configure Stripe Webhooks (for Local Development)

Set up Stripe webhook forwarding for local testing of payment flows.

1. Install the Stripe CLI from [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Log in to Stripe CLI:

```bash
stripe login
```

3. Forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Copy the webhook signing secret displayed in the terminal and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Step 7: Run the Development Server

Start the local development server to verify everything is working.

1. Run the development command:

```bash
bun run dev
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

3. You should see the Anime Artist Platform landing page

**Important Notes:** The first build may take longer as it compiles TypeScript and generates optimized assets. Subsequent hot-reloads will be near-instant.

## Verification

After completing all installation steps, verify the following:

1. The development server starts without errors
2. The landing page loads at `http://localhost:3000`
3. Firebase Authentication is working (try registering a test user)
4. Firestore reads/writes are functional (check the browser console for errors)
5. The Stripe checkout flow renders correctly in test mode
6. BLE device scanning initializes without errors (requires a compatible browser)

## Common Installation Issues

### Issue 1: Node.js Version Mismatch

**Error:** `The engine "node" is incompatible with this module`

**Solution:**

1. Check your current Node.js version:

```bash
node --version
```

2. Install Node.js 20+ using nvm:

```bash
nvm install 20
nvm use 20
```

3. Restart your terminal and reinstall dependencies:

```bash
bun install
```

### Issue 2: Bun Not Found

**Error:** `command not found: bun`

**Solution:**

1. Install Bun globally:

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Restart your terminal or source your profile:

```bash
source ~/.bashrc
# or
source ~/.zshrc
```

### Issue 3: Firebase Configuration Error

**Error:** `Firebase: Error (auth/invalid-api-key)`

**Solution:**

1. Verify your Firebase API key in `.env.local`
2. Ensure the key matches the one in your Firebase Console > Project Settings > General
3. Restart the development server after updating environment variables

### Issue 4: Port Already in Use

**Error:** `Error: listen EADDRINUSE :::3000`

**Solution:**

1. Find the process using port 3000:

```bash
lsof -i :3000
```

2. Kill the process:

```bash
kill -9 <PID>
```

3. Restart the development server

### Issue 5: Stripe Webhook Signature Verification Failed

**Error:** `Webhook signature verification failed`

**Solution:**

1. Ensure the Stripe CLI is running and forwarding to the correct port
2. Copy the latest webhook secret from the Stripe CLI output
3. Update `STRIPE_WEBHOOK_SECRET` in `.env.local`
4. Restart the development server

### Issue 6: BLE Connection Fails in Browser

**Error:** `Web Bluetooth API is not available`

**Solution:**

1. Ensure you are using Google Chrome (Web Bluetooth is not supported in all browsers)
2. Enable the Web Bluetooth flag if prompted:

```
chrome://flags/#enable-web-bluetooth
```

3. Serve your app over HTTPS (required for Web Bluetooth in production)

### Issue 7: TypeScript Compilation Errors

**Error:** `Type 'X' is not assignable to type 'Y'`

**Solution:**

1. Ensure you have the correct TypeScript version:

```bash
bun add -d typescript@latest
```

2. Clear the TypeScript cache:

```bash
rm -rf .next
bun run dev
```

## Important Notes

### Security

- Never expose your Firebase Admin SDK credentials in client-side code
- Always use environment variables for API keys and secrets
- Enable Firebase Security Rules before deploying to production
- Use Stripe test keys during development; switch to live keys only in production
- Validate all user inputs on both client and server side

### Performance

- Enable Firebase Firestore offline persistence for better mobile experience
- Compress images before uploading to Cloud Storage (especially for BLE transfer)
- Use lazy loading for heavy components like the chat system and image galleries
- Implement pagination for service listings and post request feeds

### Updates

- Run `bun update` periodically to keep dependencies current
- Check Firebase Console for SDK version updates and deprecation notices
- Monitor Stripe API changelog for breaking changes
- Test BLE functionality with each JieLi SDK update

## Next Steps

Proceed to the [Deployment Guide](./deployment.md) to learn how to deploy the Anime Artist Platform to production.
