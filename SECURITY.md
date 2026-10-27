# Security Policy

## Reporting a vulnerability

Do not disclose exploitable vulnerabilities in public issues. Contact the repository owner privately through GitHub's security advisory feature, including affected routes, reproduction steps, and impact. Do not include customer data or live credentials.

## Before production

- Use unique, high-entropy production secrets; never reuse CI or example values.
- Configure distributed rate limiting for authentication, OTP, checkout, coupon, and public tracking endpoints.
- Keep database credentials server-side and use a least-privilege database role where possible.
- Configure Razorpay webhook signature verification and test replay/idempotency behavior.
- Verify consent is captured before sending optional WhatsApp messages.
- Review authorization and tenant scoping for every dashboard/API route.
- Keep dependencies patched and review Dependabot changes before merging.
