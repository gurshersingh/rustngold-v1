# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rust n Gold is a restaurant/cafe website and ordering platform for a venue in Ballarat, Victoria, Australia. The project is a monorepo with two main parts:

- **`client/`** — Next.js 15 frontend (public website, ordering UI, admin panel, kitchen dashboard)
- **`server/`** — Node.js/Express backend (REST API, auth, Stripe payments, Prisma ORM)

## Monorepo Structure

```
rustngold-v2/
├── client/          # Next.js 15 frontend (deployed to Vercel)
│   ├── src/
│   │   ├── app/     # App Router pages
│   │   ├── components/
│   │   ├── hooks/
│   │   └── data.js  # Static content for landing page
│   └── public/
├── server/          # Express backend (deployed to Railway/Render)
│   ├── src/
│   │   ├── config/       # DB, Stripe, Cloudinary, env validation
│   │   ├── middleware/   # auth, rbac, validate, rateLimiter, errorHandler
│   │   ├── routes/       # API route definitions
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── validators/   # Zod schemas
│   │   ├── utils/        # Logger, AppError, priceCalc
│   │   └── index.js      # Express app entry point
│   └── prisma/
│       ├── schema.prisma # Database schema
│       └── seed.js       # Menu data seeder
├── package.json     # Root monorepo scripts
└── CLAUDE.md
```

## Commands

```bash
# Root (monorepo)
npm run dev              # Start both client and server concurrently
npm run install:all      # Install deps for root, client, and server

# Client (Next.js)
cd client
npm run dev              # Start dev server with Turbopack (http://localhost:3000)
npm run build            # Production build
npm run lint             # ESLint

# Server (Express)
cd server
npm run dev              # Start with nodemon (http://localhost:4000)
npm run start            # Production start
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed menu data + default users
npm run db:studio        # Open Prisma Studio
```

No test framework is configured.

## Architecture

### Client (Next.js 15, React 19)

**Landing page composition** (`client/src/app/page.js`):
```
Navbar → Header → PromoModal → FloatingPromoButton → About → MenuSection → Gallery → Hours → Enquiry → Footer
```

- **`client/src/data.js`** — static content for landing page (SITE info, MENU display, GALLERY images)
- **`client/src/app/layout.js`** — SEO metadata, Schema.org, Google Ads tracking, Vercel Analytics
- **Import alias:** `@/*` maps to `./src/*` (configured in `jsconfig.json`)

### Server (Node.js, Express 4, Prisma)

- **Database:** PostgreSQL (Neon free tier) with Prisma ORM
- **Auth:** bcrypt + JWT stored in httpOnly cookies, role-based access (admin, manager, kitchen)
- **Payments:** Stripe Checkout (hosted) with webhook signature verification
- **Image uploads:** Cloudinary via multer
- **Security:** Helmet, CORS, rate limiting, Zod validation, server-side price calculation
- **Prices stored in cents** — `$15.99` = `1599` to avoid float issues

### API Routes

```
Public:    GET /api/menu, POST /api/orders/checkout, GET /api/orders/:id/status
Auth:      POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me
Admin:     /api/admin/menu/*, /api/admin/customisations/*, /api/admin/orders/*, /api/admin/staff/*
Kitchen:   GET /api/kitchen/orders, PATCH /api/kitchen/orders/:id/status
Webhook:   POST /api/webhooks/stripe
```

## Design Tokens

- Rust brown accent: `#b85d2a`
- Gold: `#d4af37`
- Background: `#fffefb`
- Fonts: Bebas Neue (Google), Brittany Signature (custom in `/public/fonts/`), Pacifico (Google via next/font)

## External Integrations

- **Stripe** — payment processing (hosted checkout + webhooks)
- **Cloudinary** — menu item image uploads
- **Google Ads** conversion tracking for phone call clicks (`TrackedCallLink` component)
- **Vercel** Analytics and Speed Insights
