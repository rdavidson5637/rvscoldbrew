# Production cutover checklist

## Vercel env vars

- `SQUARE_ACCESS_TOKEN` — production access token
- `SQUARE_ENVIRONMENT=production`
- `SQUARE_LOCATION_ID` — Unit 11 location ID
- `SQUARE_WEBHOOK_SIGNATURE_KEY` — from production webhook subscription
- `NEXT_PUBLIC_SITE_URL=https://rvscoldbrew.com`

## Square Dashboard

1. Register webhook `https://rvscoldbrew.com/api/webhooks/square` for `payment.updated`; paste the new signature key into Vercel.
2. Confirm the Loyalty program is live with accrual rule and reward tiers (created in Dashboard, not API).
3. Confirm catalogue items, prices, and images. Reconcile any items logged by Prompt 6 / `[catalog]` as missing from `menu-data.ts`.
4. Decide fate of `rvs-cold-brew-coffee.square.site`: keep, redirect, or retire. If retiring, 301 product URLs to `/menu`.

## Smoke test

1. One real £ order end-to-end: checkout → webhook fires → points accrue → refund in Square Dashboard.
2. Confirm `/api/square/health` returns **404** in production.
3. Confirm `/shop` redirects to `/menu`.
4. Confirm menu, rewards, and order pages still render if Square is briefly unreachable.
