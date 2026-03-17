# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rust n Gold is a restaurant/cafe website for a venue in Ballarat, Victoria, Australia. It's a single-page Next.js application — purely presentational with no backend API. Content (menu items, gallery images, site info) is managed via a central data file.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

**Stack:** Next.js 15 (App Router), React 19, CSS Modules + global CSS

**Page composition** (`src/app/page.js`):
```
Header → PromoModal → FloatingPromoButton → MenuSection → Gallery → Enquiry
```

**Key architectural decisions:**

- **`src/data.js`** is the single source of truth for all content — `SITE` (name, address, phone), `MENU` (categories with items), and `GALLERY` (image paths). All components import from here. To update menu items, prices, or restaurant info, edit only this file.
- **`src/app/layout.js`** handles SEO metadata, Schema.org structured data, Google Ads conversion tracking (AW-17459624697), fixed CTA buttons (Call Now, Order Online, Free Delivery), Vercel Analytics, and custom font loading.
- Components use `'use client'` directives where interactivity is needed (modals, carousel). Otherwise they render as server components.
- **`src/app/globals1.css`** is the primary global stylesheet (~15KB). Component-specific styles use CSS Modules (`.module.css` files).

**Import alias:** `@/*` maps to `./src/*` (configured in `jsconfig.json`).

## Design Tokens

- Rust brown accent: `#b85d2a`
- Gold: `#d4af37`
- Background: `#fffefb`
- Fonts: Bebas Neue (Google), Brittany Signature (custom in `/public/fonts/`), Pacifico (Google via next/font)

## External Integrations

- **NextOrder** (online ordering): https://rust-n-gold.nextorder.com — linked from CTAs
- **Google Ads** conversion tracking for phone call clicks (`TrackedCallLink` component)
- **Vercel** Analytics and Speed Insights
