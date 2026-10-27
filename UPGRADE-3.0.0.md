# HEPRA Store Builder 3.0.0 — Upgrade Notes

This is a platform-hardening pass over the consolidated Phase 1–26 source package.

## Changes

- Fixed a syntax-breaking newline in environment-validation error formatting.
- Fixed a literal escaped newline in the store creation API source.
- Added baseline HTTP security headers and disabled the framework signature header.
- Added an explicit, unchecked WhatsApp order-update consent control to storefront checkout and pass its boolean value to the existing checkout API.
- Added GitHub Actions CI for dependency installation, Prisma Client generation, type checking, linting, and production build.
- Added Dependabot configuration for npm packages and GitHub Actions.
- Added a security policy and production-hardening checklist.
- Bumped the package version to `3.0.0` and added a combined `npm run check` command.

## Validation status

The source archive passed integrity checks and structural assertions. A full typecheck, lint, production build, database migration, and provider integration tests remain unverified because dependency installation did not complete in this environment.

## Before production

1. Run `npm install`, `npm run db:generate`, `npm run check`, and `npm run build`.
2. Apply Prisma migrations to a staging database and verify schema drift.
3. Test checkout, Razorpay success/failure/webhook retries, email delivery, WhatsApp consent behavior, and tenant isolation.
4. Add distributed rate limiting and confirm public endpoints have appropriate abuse controls.
5. Store real provider secrets only in deployment environment variables; never commit `.env`.

## Repository status

This repository currently contains release documentation only. Upload the source archive's files before treating this repository as a buildable or deployable application.
