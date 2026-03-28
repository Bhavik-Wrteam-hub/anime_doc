---
sidebar_position: 1
sidebar_label: Intro
---

import DocBanner from '@site/src/components/DocBanner/DocBanner';

<DocBanner />

# Anime Artist Platform

## Overview

The **Anime Artist Platform** is a hybrid system that combines social media, a service marketplace, subscription-based content, and IoT device integration into a single comprehensive hub for anime artists and their fans. It is designed for three user roles — Normal Users (anime fans), Artists, and Admins — enabling content sharing, custom service bookings, exclusive subscriptions, and direct image transfer to external hardware devices.

## What's Covered

This documentation covers everything you need to set up, configure, and deploy the Anime Artist Platform:

- **File Structure**: Complete breakdown of the project directory, key files, and naming conventions
- **Installation**: Step-by-step guide to installing dependencies, configuring environment variables, and running the project locally
- **Firebase Setup**: Authentication, Firestore database, and Cloud Storage configuration
- **Payment Integration**: Stripe payment gateway and In-App Purchase (IAP) setup for services and subscriptions
- **BLE Device Integration**: Bluetooth Low Energy setup for hardware image transfer
- **Deployment**: Production deployment guides for GitHub Pages, Vercel, and VPS environments

## Key Features

- Social platform with follow, like, and engagement features (Instagram-like)
- Service marketplace where users book custom artwork from artists (Fiverr-like)
- Subscription system for exclusive artist content with auto-renewal (Patreon-like)
- Post Request system allowing users to create project briefs and hire artists (Reverse Fiverr / Upwork-like)
- Real-time chat system for service discussion, collaboration, and dispute resolution
- BLE-based device connection with image transfer to external display hardware
- Dual profile system with separate Normal User and Artist profile views
- Artist verification flow with admin approval pipeline
- Calendar-based booking with time slot selection and requirements form
- Digital file delivery (PSD) and physical product shipping with 17Track integration
- Payout system with admin-reviewed manual transfers
- Ranking system based on sales, engagement, and admin boosts

## Prerequisites

### Node.js (version 20 or higher)

Node.js is the JavaScript runtime required to run the development server, install dependencies, and build the project for production.

**Official Download**: [https://nodejs.org/en/download](https://nodejs.org/en/download)

#### Installation Instructions

##### For Windows:

1. Download the Node.js LTS installer (.msi) from the official website
2. Run the installer and follow the setup wizard
3. Ensure the "Add to PATH" option is checked during installation
4. Restart your terminal after installation

```bash
node --version
npm --version
```

##### For macOS:

1. Download the Node.js LTS installer (.pkg) from the official website
2. Open the downloaded file and follow the installation prompts
3. Restart your terminal after installation

```bash
node --version
npm --version
```

##### Alternative for macOS (using Homebrew):

```bash
brew install node@20
node --version
npm --version
```

### Git (version 2.30 or higher)

Git is required for version control, cloning the repository, and collaborating on the codebase.

**Official Download**: [https://git-scm.com/downloads](https://git-scm.com/downloads)

#### Installation Instructions

##### For Windows:

1. Download the Git installer from the official website
2. Run the installer and follow the setup wizard
3. Select "Git from the command line and also from 3rd-party software" when prompted
4. Restart your terminal after installation

```bash
git --version
```

##### For macOS:

1. Git is pre-installed on most macOS systems
2. If not available, install via Xcode Command Line Tools

```bash
xcode-select --install
git --version
```

##### Alternative for macOS (using Homebrew):

```bash
brew install git
git --version
```

### Other Requirements

- **Bun** (latest version) — Fast JavaScript runtime and package manager used for dependency installation and build scripts. Install from [https://bun.sh](https://bun.sh)
- **Firebase Account** — Required for authentication (Email/Social login), Firestore database, and Cloud Storage. Create an account at [https://console.firebase.google.com](https://console.firebase.google.com)
- **Stripe Account** — Required for payment processing on service bookings. Sign up at [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
- **17Track API Access** — Required for physical product shipping and order tracking. Register at [https://api.17track.net](https://api.17track.net)
- **VS Code or any modern code editor** — Recommended for development. Download from [https://code.visualstudio.com](https://code.visualstudio.com)
- **Basic knowledge of React, TypeScript, and Firebase** — Familiarity with component-based architecture, type safety, and serverless backends

## Next Steps

Use the sidebar navigation to proceed to the Installation Steps guide and begin setting up the Anime Artist Platform on your local machine.
