# HEPRA Store Builder

**Release target:** v2.6.0

HEPRA Store Builder is a multi-tenant commerce platform project with a merchant dashboard, storefronts, catalog and order flows, analytics, inventory, fulfillment, and customer notifications.

## Project source archive

The consolidated source ZIP is available in the ChatGPT conversation as **hepra-store-builder-final-v2-6-0.zip**. The GitHub connector available for this session can create text files and Git objects, but cannot upload a local binary archive directly; the full source archive has therefore **not** been committed to this repository yet.

## Local setup

1. Extract the consolidated source archive into this repository directory.
2. Install Node.js 20.9 or newer.
3. Copy `.env.example` to `.env` and configure your database and provider credentials.
4. Run `npm install`.
5. Run `npx prisma migrate deploy`.
6. Run `npx prisma generate`.
7. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

See `FINAL-RESULT.md` and `PHASE-26.md` for scope and setup notes.

## Validation status

The source ZIP passed archive integrity and required-file checks. A full production build, live database migration, live payment test, and live email/WhatsApp test have not been run.
