# HEPRA Store Builder

HEPRA is a multi-tenant commerce SaaS foundation for Indian small businesses and D2C brands. It combines a public marketing site, merchant workspace, and store-specific storefronts.

## Phase 1 foundation

This branch adds a Next.js App Router application, PostgreSQL/Prisma data model, email/password registration and login, secure database-backed sessions, a merchant dashboard, and a database-driven storefront route.

See [PHASE-1.md](./PHASE-1.md) for architecture, setup, and deployment notes.

## Stack

- Node.js 20.9+
- Next.js 15, React 19 and TypeScript
- PostgreSQL and Prisma ORM
- bcryptjs password hashing
- HttpOnly session cookie with random opaque token; only its hash is stored
- Vercel-compatible deployment

## Local setup

1. Install Node.js 20.9 or newer.
2. Copy `.env.example` to `.env`.
3. Configure `DATABASE_URL`, `DIRECT_URL`, and `SESSION_SECRET` (at least 32 characters).
4. Run `npm install`.
5. Run `npm run db:generate`.
6. Run `npm run db:migrate` against a development PostgreSQL database.
7. Run `npm run db:seed`.
8. Run `npm run check` and `npm run build`.
9. Start locally with `npm run dev`.

## Important scope notes

This is the Phase 1 foundation, not yet a complete production commerce platform. Product editing, cart and checkout, payment gateway webhooks, email verification and password reset, rate limiting, custom-domain verification, subscription provider integration, and the visual theme editor are planned for subsequent phases. The plan prices on the marketing page are illustrative.

Do not commit secrets or real credentials. Tenant-scoped authorization and staging validation are required before production use.