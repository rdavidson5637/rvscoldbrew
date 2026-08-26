# RV's Cold Brew

Next.js 14 (App Router) site for the Belfast coffee kiosk at Unit 11, Great Northern Mall. Commerce, catalogue, checkout, and loyalty run through **Square**.

## Stack

- Next.js 14 + TypeScript + Tailwind
- Square Node SDK (`square`) — server-only
- Vercel deployment

## Local development

```bash
npm install
cp .env.example .env.local
# fill sandbox Square credentials
npm run dev
```

Without Square env vars the app still builds and renders the menu from `src/lib/menu-data.ts` (prices show as “Price at till”; rewards show “launching soon”).

Dev health check (sandbox only): `GET /api/square/health`

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `SQUARE_ACCESS_TOKEN` | server | Square API token |
| `SQUARE_ENVIRONMENT` | server | `sandbox` or `production` |
| `SQUARE_LOCATION_ID` | server | Unit 11 location |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | server | Webhook HMAC key |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical site URL / checkout redirect |
| `NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID` | public | Optional in-store playlist |

Never prefix Square secrets with `NEXT_PUBLIC_`.

## Ordering flow

1. `/menu` loads live catalogue via Catalog API (fallback: `menu-data.ts`).
2. Cart is client-side (`rvs-cart` in localStorage).
3. `POST /api/checkout` builds a Square order with **PICKUP** fulfillment and a Payment Link. Prices come from Square, never the client.
4. Customer pays on Square Hosted Checkout; redirect to `/order/confirmed`.
5. `payment.updated` webhook → `onOrderPaid` → loyalty point accumulation when an account is linked.

## Loyalty

Configured in the Square Seller Dashboard (not via API). Website joins / balance checks use phone number (E.164). In-store and online share one program.

See `WEBHOOKS.md` and `CUTOVER.md` for go-live steps.
