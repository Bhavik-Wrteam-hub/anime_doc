---
sidebar_position: 5
---

# Deployment Guide

This guide covers deploying the Anime Artist Platform to production using GitHub Pages, Vercel, and a self-hosted VPS with PM2.

## Prerequisites

- Completed all steps in the [Installation Guide](./installation-steps.md)
- All environment variables configured for production
- Firebase project configured with production security rules
- Stripe account set to live mode with live API keys
- A GitHub repository with the latest code pushed to the `main` branch

## Deployment Options

### Option 1: Deploy on GitHub Pages

GitHub Pages is ideal for hosting the documentation site. For the full Next.js application, use Vercel or a VPS instead.

#### Step 1: Configure GitHub Repository

1. Push your code to a GitHub repository
2. Ensure the repository is public (or you have a GitHub Pro plan for private pages)

#### Step 2: Add GitHub Actions Workflow

1. Create the workflow directory and file:

```bash
mkdir -p .github/workflows
```

2. Create `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy Docusaurus Site

on:
  push:
    branches:
      - main

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build website
        run: bun run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          user_name: github-actions[bot]
          user_email: github-actions[bot]@users.noreply.github.com
```

#### Step 3: Configure Base URL

1. Update `docusaurus.config.ts` with your GitHub repository details:

```javascript
const config = {
  url: 'https://your-username.github.io',
  baseUrl: '/your-repo-name/',
  organizationName: 'your-username',
  projectName: 'your-repo-name',
};
```

#### Step 4: Push and Deploy

1. Commit and push your changes:

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

2. Navigate to your repository on GitHub
3. Go to **Settings** > **Pages**
4. Set the source to **Deploy from a branch** and select `gh-pages`
5. Your site will be available at `https://your-username.github.io/your-repo-name/`

:::info
The first deployment may take 2-3 minutes. Subsequent deployments are faster as GitHub caches the build dependencies.
:::

### Option 2: Deploy on Vercel

Vercel is the recommended platform for deploying the full Next.js application with server-side rendering and API routes.

#### Step 1: Create a Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up using your GitHub account

#### Step 2: Import the Project

1. Click **Add New** > **Project** in the Vercel dashboard
2. Select your GitHub repository
3. Vercel will auto-detect the Next.js framework

#### Step 3: Configure Environment Variables

1. In the project settings, navigate to **Environment Variables**
2. Add all required environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-production-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_APP_ID=1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_17TRACK_API_KEY=your-17track-api-key
NEXT_PUBLIC_BLE_SERVICE_UUID=your-ble-service-uuid
NEXT_PUBLIC_BLE_CHARACTERISTIC_UUID=your-ble-characteristic-uuid
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=Anime Artist Platform
```

:::warning
Use **live** Stripe keys for production. Double-check that you are not using test keys (`pk_test_`, `sk_test_`) in your production environment.
:::

#### Step 4: Configure Build Settings

1. Framework Preset: **Next.js** (auto-detected)
2. Build Command: `bun run build`
3. Output Directory: `.next` (default)
4. Install Command: `bun install`

#### Step 5: Deploy

1. Click **Deploy**
2. Vercel will build and deploy your application
3. Your site will be available at `https://your-project.vercel.app`

#### Step 6: Configure Custom Domain (Optional)

1. Go to **Settings** > **Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. SSL certificate is provisioned automatically

#### Step 7: Configure Stripe Webhook for Production

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter your production webhook URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and update `STRIPE_WEBHOOK_SECRET` in Vercel

:::note
After updating environment variables on Vercel, you must redeploy for the changes to take effect. Trigger a redeployment from the Vercel dashboard or push a new commit.
:::

### Option 3: Deploy on VPS with PM2

For full control over the server environment, deploy to a VPS (Virtual Private Server) using PM2 as the process manager.

#### Step 1: Provision a VPS

1. Provision a VPS from your preferred provider (DigitalOcean, Hetzner, AWS EC2, etc.)
2. Ensure the server has at least 1GB RAM and 25GB storage
3. Set up SSH access to the server

#### Step 2: Install Server Dependencies

1. SSH into your server:

```bash
ssh user@your-server-ip
```

2. Install Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Install Bun:

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

4. Install PM2 globally:

```bash
npm install -g pm2
```

5. Install Nginx (reverse proxy):

```bash
sudo apt-get install -y nginx
```

#### Step 3: Clone and Build the Project

1. Clone the repository on the server:

```bash
git clone https://github.com/your-username/anime-artist-platform.git
cd anime-artist-platform
```

2. Install dependencies:

```bash
bun install
```

3. Create the production environment file:

```bash
nano .env.local
```

4. Add all production environment variables (same as the Vercel list above)

5. Build the project:

```bash
bun run build
```

#### Step 4: Configure PM2

1. Create a PM2 ecosystem file:

```bash
nano ecosystem.config.js
```

2. Add the following configuration:

```javascript
module.exports = {
  apps: [
    {
      name: 'anime-artist-platform',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/user/anime-artist-platform',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

3. Start the application with PM2:

```bash
pm2 start ecosystem.config.js
```

4. Save the PM2 process list and set up auto-start on reboot:

```bash
pm2 save
pm2 startup
```

#### Step 5: Configure Nginx Reverse Proxy

1. Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/anime-artist-platform
```

2. Add the following configuration:

```apache
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/anime-artist-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: Set Up SSL with Let's Encrypt

1. Install Certbot:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

2. Obtain and install the SSL certificate:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

3. Verify auto-renewal is configured:

```bash
sudo certbot renew --dry-run
```

:::warning
Always use HTTPS in production. The Web Bluetooth API (required for BLE device integration) only works over secure connections.
:::

## Troubleshooting

### Issue: Build Fails on GitHub Pages

**Solution:**

- Verify that the `baseUrl` in `docusaurus.config.ts` matches your repository name
- Ensure all dependencies are listed in `package.json` (not just installed locally)
- Check the GitHub Actions logs for specific error messages

### Issue: Environment Variables Not Working on Vercel

**Solution:**

- Verify that all `NEXT_PUBLIC_` prefixed variables are set in the Vercel dashboard
- Redeploy the application after adding or updating environment variables
- Check that server-side-only variables (without `NEXT_PUBLIC_`) are not accessed in client-side code

### Issue: PM2 Process Crashes on VPS

**Solution:**

- Check PM2 logs for error details:

```bash
pm2 logs anime-artist-platform
```

- Ensure the server has sufficient memory (at least 1GB RAM)
- Verify that all environment variables are set in `.env.local`
- Rebuild the project if dependencies have changed:

```bash
bun install && bun run build && pm2 restart anime-artist-platform
```

### Issue: Nginx Returns 502 Bad Gateway

**Solution:**

- Verify that the PM2 process is running:

```bash
pm2 status
```

- Check that the proxy port in Nginx config matches the application port
- Restart both PM2 and Nginx:

```bash
pm2 restart anime-artist-platform
sudo systemctl restart nginx
```

### Issue: SSL Certificate Renewal Fails

**Solution:**

- Verify that port 80 is open for the ACME challenge
- Run the renewal manually to check for errors:

```bash
sudo certbot renew --force-renewal
```

- Ensure Nginx is running and the domain DNS is pointing to the server
