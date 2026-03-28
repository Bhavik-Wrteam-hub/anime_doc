---
sidebar_position: 3
---

# File Structure

This document provides a complete overview of the Anime Artist Platform project directory, explaining the purpose of each file and folder.

## Project Structure Overview

The Anime Artist Platform is built with **Next.js 15, React 19, TypeScript, Tailwind CSS, Redux Toolkit, and Firebase**.

```
anime-artist-platform/
├── public/                          # Static assets served directly
│   ├── fonts/                       # Custom font files
│   ├── icons/                       # App icons and favicons
│   ├── images/                      # Static images (logos, placeholders)
│   └── manifest.json                # PWA manifest configuration
├── src/                             # Main source code directory
│   ├── app/                         # Next.js App Router pages
│   │   ├── (auth)/                  # Authentication route group
│   │   │   ├── login/               # Login page
│   │   │   │   └── page.tsx         # Login page component
│   │   │   ├── register/            # Registration page
│   │   │   │   └── page.tsx         # Register page component
│   │   │   └── layout.tsx           # Auth layout wrapper
│   │   ├── (main)/                  # Main app route group
│   │   │   ├── home/                # Home feed page
│   │   │   │   └── page.tsx         # Home feed component
│   │   │   ├── explore/             # Explore/discover page
│   │   │   │   └── page.tsx         # Explore page component
│   │   │   ├── profile/             # User profile pages
│   │   │   │   ├── [userId]/        # Dynamic user profile
│   │   │   │   │   └── page.tsx     # Profile view component
│   │   │   │   └── edit/            # Profile edit page
│   │   │   │       └── page.tsx     # Profile edit component
│   │   │   ├── artist/              # Artist-specific pages
│   │   │   │   ├── [artistId]/      # Dynamic artist profile
│   │   │   │   │   └── page.tsx     # Artist profile component
│   │   │   │   ├── become/          # Become artist application
│   │   │   │   │   └── page.tsx     # Artist application form
│   │   │   │   └── dashboard/       # Artist dashboard
│   │   │   │       └── page.tsx     # Artist dashboard component
│   │   │   ├── services/            # Service marketplace pages
│   │   │   │   ├── [serviceId]/     # Dynamic service detail
│   │   │   │   │   └── page.tsx     # Service detail component
│   │   │   │   ├── create/          # Create new service
│   │   │   │   │   └── page.tsx     # Service creation form
│   │   │   │   └── page.tsx         # Services listing page
│   │   │   ├── bookings/            # Booking management pages
│   │   │   │   ├── [bookingId]/     # Dynamic booking detail
│   │   │   │   │   └── page.tsx     # Booking detail component
│   │   │   │   └── page.tsx         # Bookings list page
│   │   │   ├── posts/               # Post request pages
│   │   │   │   ├── [postId]/        # Dynamic post detail
│   │   │   │   │   └── page.tsx     # Post request detail
│   │   │   │   ├── create/          # Create post request
│   │   │   │   │   └── page.tsx     # Post request form
│   │   │   │   └── page.tsx         # Post requests listing
│   │   │   ├── chat/                # Chat system pages
│   │   │   │   ├── [chatId]/        # Dynamic chat conversation
│   │   │   │   │   └── page.tsx     # Chat conversation component
│   │   │   │   └── page.tsx         # Chat list page
│   │   │   ├── subscriptions/       # Subscription pages
│   │   │   │   └── page.tsx         # Subscriptions management
│   │   │   ├── device/              # BLE device pages
│   │   │   │   └── page.tsx         # Device connect and transfer
│   │   │   ├── notifications/       # Notifications page
│   │   │   │   └── page.tsx         # Notifications list
│   │   │   └── layout.tsx           # Main app layout wrapper
│   │   ├── admin/                   # Admin panel pages
│   │   │   ├── artists/             # Artist verification queue
│   │   │   │   └── page.tsx         # Artist approval page
│   │   │   ├── disputes/            # Dispute resolution center
│   │   │   │   └── page.tsx         # Disputes management page
│   │   │   ├── payouts/             # Payout approval interface
│   │   │   │   └── page.tsx         # Payouts management page
│   │   │   ├── reports/             # User reports dashboard
│   │   │   │   └── page.tsx         # Reports management page
│   │   │   ├── settings/            # Admin settings
│   │   │   │   └── page.tsx         # Commission and config settings
│   │   │   ├── layout.tsx           # Admin layout wrapper
│   │   │   └── page.tsx             # Admin dashboard overview
│   │   ├── api/                     # API route handlers
│   │   │   ├── webhooks/            # Webhook endpoints
│   │   │   │   └── stripe/          # Stripe webhook handler
│   │   │   │       └── route.ts     # Stripe webhook route
│   │   │   ├── payments/            # Payment API routes
│   │   │   │   └── route.ts         # Payment processing route
│   │   │   └── shipping/            # Shipping API routes
│   │   │       └── route.ts         # 17Track integration route
│   │   ├── layout.tsx               # Root layout component
│   │   ├── page.tsx                 # Landing page
│   │   └── globals.css              # Global CSS styles
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                      # Base UI primitives
│   │   │   ├── Button.tsx           # Button component
│   │   │   ├── Input.tsx            # Input field component
│   │   │   ├── Modal.tsx            # Modal dialog component
│   │   │   ├── Card.tsx             # Card component
│   │   │   ├── Avatar.tsx           # Avatar display component
│   │   │   ├── Badge.tsx            # Badge/tag component
│   │   │   └── Spinner.tsx          # Loading spinner component
│   │   ├── auth/                    # Authentication components
│   │   │   ├── LoginForm.tsx        # Login form component
│   │   │   ├── RegisterForm.tsx     # Registration form component
│   │   │   └── AuthGuard.tsx        # Route protection wrapper
│   │   ├── artist/                  # Artist-related components
│   │   │   ├── ArtistCard.tsx       # Artist preview card
│   │   │   ├── PortfolioGrid.tsx    # Portfolio gallery grid
│   │   │   ├── ServiceCard.tsx      # Service listing card
│   │   │   └── SubscriptionTier.tsx # Subscription tier display
│   │   ├── booking/                 # Booking components
│   │   │   ├── BookingCalendar.tsx  # Calendar date picker
│   │   │   ├── TimeSlotPicker.tsx   # Time slot selection
│   │   │   ├── RequirementsForm.tsx # Booking requirements form
│   │   │   └── BookingStatus.tsx    # Booking status tracker
│   │   ├── chat/                    # Chat components
│   │   │   ├── ChatBubble.tsx       # Message bubble component
│   │   │   ├── ChatInput.tsx        # Message input component
│   │   │   ├── FileUpload.tsx       # File upload in chat
│   │   │   └── ChatList.tsx         # Conversation list sidebar
│   │   ├── device/                  # BLE device components
│   │   │   ├── DeviceScanner.tsx    # BLE device scanner
│   │   │   ├── ImagePreview.tsx     # Image preview before transfer
│   │   │   └── TransferProgress.tsx # Transfer progress indicator
│   │   ├── post/                    # Post request components
│   │   │   ├── PostRequestCard.tsx  # Post request card
│   │   │   ├── PostRequestForm.tsx  # Post request creation form
│   │   │   └── ProposalCard.tsx     # Artist proposal card
│   │   ├── layout/                  # Layout components
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── Sidebar.tsx          # Sidebar navigation
│   │   │   ├── Footer.tsx           # Footer component
│   │   │   └── MobileNav.tsx        # Mobile bottom navigation
│   │   └── shared/                  # Shared/common components
│   │       ├── ImageUploader.tsx    # Image upload component
│   │       ├── RatingStars.tsx      # Star rating component
│   │       ├── SearchBar.tsx        # Search bar component
│   │       └── EmptyState.tsx       # Empty state placeholder
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts               # Authentication hook
│   │   ├── useFirestore.ts          # Firestore operations hook
│   │   ├── useChat.ts               # Real-time chat hook
│   │   ├── useBLE.ts                # Bluetooth Low Energy hook
│   │   ├── useBooking.ts            # Booking management hook
│   │   ├── useSubscription.ts       # Subscription management hook
│   │   └── useNotification.ts       # Notification hook
│   ├── store/                       # Redux Toolkit state management
│   │   ├── store.ts                 # Redux store configuration
│   │   ├── slices/                  # Redux slices
│   │   │   ├── authSlice.ts         # Authentication state
│   │   │   ├── artistSlice.ts       # Artist data state
│   │   │   ├── bookingSlice.ts      # Booking state
│   │   │   ├── chatSlice.ts         # Chat state
│   │   │   ├── postSlice.ts         # Post request state
│   │   │   ├── deviceSlice.ts       # BLE device state
│   │   │   └── notificationSlice.ts # Notification state
│   │   └── provider.tsx             # Redux provider wrapper
│   ├── lib/                         # Library and utility modules
│   │   ├── firebase/                # Firebase configuration
│   │   │   ├── config.ts            # Firebase app initialization
│   │   │   ├── auth.ts              # Auth helper functions
│   │   │   ├── firestore.ts         # Firestore helper functions
│   │   │   └── storage.ts           # Cloud Storage helpers
│   │   ├── stripe/                  # Stripe configuration
│   │   │   ├── client.ts            # Stripe client setup
│   │   │   └── webhooks.ts          # Webhook handling utilities
│   │   ├── ble/                     # Bluetooth Low Energy utilities
│   │   │   ├── connection.ts        # BLE connection manager
│   │   │   ├── transfer.ts          # Image transfer protocol
│   │   │   └── compression.ts       # Image compression for BLE
│   │   └── shipping/                # Shipping integration
│   │       └── tracker.ts           # 17Track API integration
│   ├── types/                       # TypeScript type definitions
│   │   ├── user.ts                  # User and Artist types
│   │   ├── service.ts               # Service and booking types
│   │   ├── chat.ts                  # Chat message types
│   │   ├── post.ts                  # Post request types
│   │   ├── payment.ts               # Payment and payout types
│   │   ├── device.ts                # BLE device types
│   │   └── subscription.ts          # Subscription types
│   ├── utils/                       # Utility functions
│   │   ├── formatters.ts            # Date, currency, text formatters
│   │   ├── validators.ts            # Input validation helpers
│   │   ├── constants.ts             # App-wide constants
│   │   └── helpers.ts               # General helper functions
│   └── styles/                      # Additional style files
│       └── theme.ts                 # Tailwind theme extensions
├── .env.example                     # Environment variable template
├── .env.local                       # Local environment variables (gitignored)
├── .gitignore                       # Git ignore configuration
├── .eslintrc.json                   # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies and scripts
├── bun.lockb                        # Bun lock file
├── firebase.json                    # Firebase project configuration
├── firestore.rules                  # Firestore security rules
├── storage.rules                    # Cloud Storage security rules
└── README.md                        # Project readme
```

## Key Directories

### /public

Contains static assets that are served directly without processing. Includes fonts, icons, images, and the PWA manifest file.

### /src/app

The Next.js App Router directory containing all page routes organized by feature groups.

#### /src/app/(auth)

Authentication-related pages including login and registration. Uses a shared auth layout that hides the main navigation.

#### /src/app/(main)

The primary application pages accessible to authenticated users. Includes home feed, explore, profiles, services, bookings, chat, and more.

#### /src/app/admin

Admin panel pages for platform management. Includes artist verification, dispute resolution, payout approval, and content moderation.

#### /src/app/api

Server-side API routes handling webhooks (Stripe), payment processing, and shipping integration (17Track).

### /src/components

Reusable React components organized by feature domain. Each sub-directory groups related components together.

#### /src/components/ui

Base UI primitives (Button, Input, Modal, Card) used throughout the application.

#### /src/components/booking

Components related to the service booking flow including the calendar date picker, time slot selector, and requirements form.

#### /src/components/device

BLE device integration components for scanning, image preview, and transfer progress tracking.

### /src/hooks

Custom React hooks encapsulating reusable logic for authentication, Firestore operations, real-time chat, BLE connections, and more.

### /src/store

Redux Toolkit state management with feature-based slices for auth, artist data, bookings, chat, post requests, device state, and notifications.

### /src/lib

Library modules and third-party service configurations. Includes Firebase setup, Stripe client, BLE connection manager, and shipping API integration.

### /src/types

TypeScript type definitions organized by domain (user, service, chat, payment, device, subscription).

### /src/utils

Utility functions for formatting, validation, constants, and general helpers shared across the application.

## Important Files

### package.json

```json
{
  "name": "anime-artist-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",            // Start development server
    "build": "next build",        // Build for production
    "start": "next start",        // Start production server
    "lint": "next lint",          // Run ESLint
    "type-check": "tsc --noEmit"  // Run TypeScript type checking
  },
  "dependencies": {
    "next": "^15.0.0",            // Next.js framework
    "react": "^19.0.0",           // React library
    "react-dom": "^19.0.0",       // React DOM renderer
    "@reduxjs/toolkit": "^2.0.0", // State management
    "react-redux": "^9.0.0",      // React-Redux bindings
    "firebase": "^11.0.0",        // Firebase SDK
    "@stripe/stripe-js": "^4.0.0", // Stripe client SDK
    "tailwindcss": "^4.0.0"       // Utility-first CSS framework
  }
}
```

### .env.example

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

### next.config.ts

```javascript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,           // Enable React strict mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Firebase Storage images
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',       // Allow large file uploads (PSD delivery)
    },
  },
};

export default nextConfig;
```

### tailwind.config.ts

```javascript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',  // Scan all source files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e94560',            // Brand primary color
        secondary: '#1a1a2e',          // Brand secondary color
        accent: '#0f3460',             // Accent color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default font
      },
    },
  },
  plugins: [],
};

export default config;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",               // Target ECMAScript version
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,                   // Enable strict type checking
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]              // Path alias for imports
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### src/app/layout.tsx

```javascript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/store/provider'; // Redux state provider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anime Artist Platform',
  description: 'A hybrid platform for anime artists and fans',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
```

## File Naming Conventions

- **PascalCase** for React components: `ArtistCard.tsx`, `BookingCalendar.tsx`
- **camelCase** for hooks: `useAuth.ts`, `useBLE.ts`, `useBooking.ts`
- **camelCase** for utility files: `formatters.ts`, `validators.ts`, `helpers.ts`
- **camelCase** for Redux slices: `authSlice.ts`, `bookingSlice.ts`
- **camelCase** for library modules: `config.ts`, `client.ts`, `connection.ts`
- **kebab-case** for route directories: `become/`, `edit/`, `create/`
- **PascalCase** for type definition files: Exported types use PascalCase (`User`, `Service`, `Booking`)
- **page.tsx** for Next.js page components (App Router convention)
- **layout.tsx** for Next.js layout wrappers (App Router convention)
- **route.ts** for Next.js API route handlers (App Router convention)

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit 2
- **Authentication**: Firebase Auth (Email + Social)
- **Database**: Cloud Firestore
- **File Storage**: Firebase Cloud Storage
- **Payments**: Stripe (Services) + IAP (Subscriptions)
- **Shipping**: 17Track API
- **Hardware**: Bluetooth Low Energy (Web Bluetooth API)
- **Device SDK**: JieLi SDK (BLE hardware interaction)
- **Package Manager**: Bun
- **Linting**: ESLint
- **Deployment**: Vercel / GitHub Pages / VPS

## Routing Structure

The Anime Artist Platform uses the Next.js App Router with route groups for logical organization:

- **/login**, **/register** — Authentication pages (grouped under `(auth)`)
- **/home** — Main feed showing followed artists' content
- **/explore** — Discover new artists and content
- **/profile/[userId]** — Dynamic user profile pages
- **/artist/[artistId]** — Dynamic artist profile with portfolio, services, and subscriptions
- **/artist/become** — Artist application form
- **/services** — Service marketplace listing
- **/services/[serviceId]** — Individual service detail and booking
- **/bookings** — User's booking history and active bookings
- **/posts** — Post request feed (Reverse Fiverr)
- **/posts/create** — Create a new post request
- **/chat** — Conversation list
- **/chat/[chatId]** — Individual chat thread
- **/device** — BLE device connection and image transfer
- **/admin** — Admin dashboard (restricted to admin role)

## Best Practices

1. Keep components small and focused on a single responsibility — split large components into smaller sub-components
2. Use TypeScript strict mode and define explicit types for all props, state, and API responses
3. Place business logic in custom hooks (`/hooks`) rather than directly in components
4. Use Redux Toolkit slices for global state and React state for local UI state
5. Store all Firebase configuration in environment variables, never hardcode credentials
6. Follow the existing file naming conventions when adding new files
7. Use Tailwind CSS utility classes for styling; avoid creating custom CSS unless absolutely necessary
8. Implement proper error boundaries and loading states for all async operations
9. Write Firestore security rules before deploying to production to prevent unauthorized data access
10. Compress images before BLE transfer using the compression utilities in `/lib/ble/compression.ts`
