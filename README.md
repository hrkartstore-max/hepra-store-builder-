# HEPRA Store Builder — v3.0.0

**Release target:** v3.0.0

HEPRA Store Builder is a multi-tenant commerce platform project with a merchant dashboard, storefronts, catalog and order flows, analytics, inventory, fulfillment, and customer notifications.

## v3.0.0 upgrade package

The upgraded source archive is available in this ChatGPT conversation as **hepra-store-builder-v3.0.0-upgraded.zip**. This release includes source-level fixes, baseline security headers, optional WhatsApp checkout consent, GitHub Actions CI configuration, Dependabot configuration, and security/upgrade documentation.

**Important:** the full source archive is not yet committed to this GitHub repository. The GitHub connector available for this session can commit UTF-8 text files, but cannot upload a local binary archive directly. Do not treat this documentation-only repository as a deployable application until the source files are uploaded.

## Local setup

1. Extract the v3.0.0 source archive into a working directory.
2. Install Node.js 20.9 or newer.
3. Copy `.env.example` to `.env` and configure database and provider credentials.
4. Run `npm install`.
5. Run `npm run db:generate`.
6. Apply migrations to a staging database with `npm run db:deploy`.
7. Run `npm run check` and `npm run build`.

See `UPGRADE-3.0.0.md`, `FINAL-RESULT.md`, and `PHASE-26.md` for scope and operational notes.

## Validation status

The v3.0.0 ZIP passed archive integrity and structural assertions, and no TypeScript parser diagnostics were found. A full typecheck, lint, production build, live database migration, payment test, and live email/WhatsApp test have not been completed because dependencies could not be installed in this environment. Run the included CI workflow after the full source is uploaded.
