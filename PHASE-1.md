# HEPRA Store Builder — Phase 1 Foundation

## Included in this branch
- Next.js App Router + TypeScript foundation
- Responsive HEPRA marketing landing page and design system
- Email/password registration and login backed by PostgreSQL sessions
- Merchant onboarding creates a user, organization, membership and draft store
- Initial multi-tenant commerce schema using Prisma
- Merchant dashboard with store, product count, order count and paid revenue summaries
- Tenant-scoped product creation form and API; newly added products render in the store preview
- Database-driven public storefront at `/store/[slug]`
- Configurable Starter, Growth and Business plan seed data
- Baseline security headers and environment template

## Stack
- Node.js 20.9+
- Next.js 15, React 19, TypeScript
- PostgreSQL + Prisma 6
- bcryptjs password hashing
- Random opaque HttpOnly session cookies; only SHA-256 token hashes are stored
- Vercel-compatible application deployment

## Local setup
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `DIRECT_URL`, and a strong `SESSION_SECRET` (32+ characters).
3. Run `npm install`.
4. Run `npm run db:generate`.
5. Run `npm run db:migrate` against a development database.
6. Run `npm run db:seed`.
7. Run `npm run check` and `npm run build`.
8. Run `npm run dev`.

## Security and release notes
- Never commit `.env` or provider credentials.
- Use a pooled PostgreSQL URL for serverless runtime and a direct URL for migrations when supported.
- Registration and login require a migrated database and `SESSION_SECRET`.
- Scope tenant-owned queries to verified membership and store ownership.
- Payment processing, email verification, password reset, rate limiting, product editing, checkout, custom-domain verification and subscription-provider webhooks remain future work.
- Marketing plan prices are illustrative and must be finalized before public launch.

## Deployment checklist
1. Provision managed PostgreSQL (Neon or another supported provider).
2. Configure `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET` and `APP_URL` in Vercel.
3. Review and commit migrations, then run `npm run db:deploy` as a controlled release step.
4. Build with `npm run build`.
5. Test registration, login, logout, dashboard authorization and store rendering against staging data.
6. Configure a production domain, monitoring and backups before launch.
