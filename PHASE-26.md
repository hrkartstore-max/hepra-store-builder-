# HEPRA Store Builder — Phase 26 (v2.6.0)

## WhatsApp customer notifications

- Adds a WhatsApp channel to customer notification history.
- Supports order placed, shipped, delivered, and delivery-attention notifications through the WhatsApp Cloud API.
- Uses an approved WhatsApp message template; business-initiated messages are not sent as arbitrary free-form text.
- Persists explicit per-order consent (`Order.whatsappOptIn`, default `false`).
- Missing consent, phone, credentials, or template is recorded as `SKIPPED`; provider errors are recorded as `FAILED`.
- Notification errors do not block order or fulfillment writes.
- Duplicate SENT messages for the same store/order/type/channel are suppressed.

## Environment

Configure `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_ORDER_UPDATE` (approved template name), optional `WHATSAPP_TEMPLATE_LANGUAGE`, and `WHATSAPP_GRAPH_API_VERSION`.

The configured template must be approved by Meta and its body must accept four text parameters in this order: customer name, order number, event label, and message details. Adjust the template or parameter mapping to match your approved template.

## Important

- Integrate a clearly worded, unchecked opt-in checkbox into storefront checkout before enabling WhatsApp in production.
- A successful Graph API request means accepted by the provider, not proof of delivery; provider webhooks are not included in this phase.
- Full production build and live WhatsApp/Meta tests were not run in the packaging environment.
