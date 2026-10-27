# HEPRA Store Builder — Phase 1 Foundation

## Included
- Responsive HEPRA marketing homepage and design system.
- Email/password registration and login, bcrypt password hashing, and opaque database-backed HttpOnly sessions.
- Multi-tenant PostgreSQL/Prisma schema and checked-in initial migration.
- Merchant onboarding creates a user, organization, owner membership and draft store.
- Merchant dashboard, product creation/catalog, and database-driven store preview.
- Draft-store preview authorization: only organization members can view drafts; suspended stores return not found.
- Starter/Growth/Business plan seed data, security headers, environment template, CI workflow and Vercel configuration.

## Stack
- Node.js 20.9+, Next.js 15, React 19, TypeScript.
- PostgreSQL + Prisma 6.
- bcryptjs; HMAC-SHA256 session-token digests; random opaque tokens.
- Vercel-compatible deployment.

## Local setup
1. Copy .env.example to .env and configure a development PostgreSQL URL in both database fields.
2. Set SESSION_SECRET to a random value of at least 32 characters.
3. Run npm install.
4. Run npm run db:generate.
5. Run npm run db:deploy to apply the checked-in migration, or npm run db:migrate while developing schema changes.
6. Run npm run db:seed.
7. Run npm run check and npm run build.
8. Run npm run dev.

## Vercel + managed PostgreSQL
- Provision managed PostgreSQL (Neon is one option).
- Set DATABASE_URL to the provider's pooled/runtime URL where supported and DIRECT_URL to its direct connection URL.
- Set SESSION_SECRET and APP_URL in Vercel Preview and Production environments.
- Deploy the branch as a Preview first; verify migrations, registration/login/logout, product creation and draft-store access before promoting.
- Apply reviewed migrations with npm run db:deploy in a controlled release step. Never use destructive schema pushes on production.
- Keep database backups and monitor errors before launch.

## Scope limits
This is a Phase 1 foundation, not the complete commerce SaaS. Product editing/deletion, cart and checkout, payment provider integration, email verification/password reset, production-grade rate limiting, custom-domain verification, subscription-provider webhooks and a visual theme editor remain future work. Marketing plan prices are illustrative. Never commit secrets.
