# Square webhooks

## Register the endpoint

1. Open the [Square Developer Dashboard](https://developer.squareup.com/apps) → your app → **Webhooks**.
2. Add notification URL: `https://rvscoldbrew.com/api/webhooks/square`
3. Subscribe to **payment.updated**.
4. Copy the **Signature Key** into Vercel / `.env.local` as `SQUARE_WEBHOOK_SIGNATURE_KEY`.

The handler verifies `x-square-hmacsha256-signature` with `WebhooksHelper.verifySignature` and never skips verification. Missing signature key returns 500.

## Local testing (sandbox)

1. Set `SQUARE_ENVIRONMENT=sandbox` and sandbox token / location / signature key.
2. Expose localhost with a tunnel (e.g. `ngrok http 3000`) and register that tunnel URL + `/api/webhooks/square` in the sandbox webhook config.
3. Place a sandbox payment-link order; when payment completes, the webhook should log `payment completed` and call `onOrderPaid`.

## Production

Use the production app credentials, production signature key, and `SQUARE_ENVIRONMENT=production`. Confirm `/api/square/health` returns 404 in production.
