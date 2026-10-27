# HEPRA Store Builder — Final Consolidated Delivery

**Release:** v2.6.0  
**Scope:** Cumulative project through Phase 26.

## Included platform areas

- Multi-tenant store builder foundation, merchant dashboard, storefront and themes
- Store, product, category, order and checkout flows
- Authentication, store membership/access checks and subscription/billing foundations
- Store launch, settings, template marketplace and website builder routes
- Coupons, customer CRM, loyalty and product reviews
- Abandoned cart recovery and marketing automations
- Analytics and CSV export
- Inventory management and stock movement tracking
- Fulfillment and shipment tracking
- Public customer order tracking
- Transactional email notifications and notification history
- WhatsApp Cloud API notification integration with opt-in field and approved-template support
- Prisma schema and additive database migrations

## Before production

1. Configure valid database, Auth.js, email, and optional payment/WhatsApp credentials.
2. Install dependencies: `npm install`.
3. Apply migrations: `npx prisma migrate deploy`.
4. Generate Prisma Client: `npx prisma generate`.
5. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Test checkout, payment, email, WhatsApp opt-in, shipment updates, tracking, and tenant boundaries in staging.

## Validation note

The archive's ZIP integrity and Phase 26 feature/file checks passed. A complete production build, live database migration, live payment-provider test, and live email/WhatsApp delivery test have not been run. This project has not been deployed.
