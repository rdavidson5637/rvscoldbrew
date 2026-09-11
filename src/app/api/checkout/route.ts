import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/brand";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getSquareClient, getSquareLocationId, hasSquareCredentials } from "@/lib/square";

type CheckoutBody = {
  items?: { variationId?: string; quantity?: number }[];
  note?: string;
  pickupName?: string;
};

export async function POST(request: Request) {
  if (!rateLimit(getClientIp(request), 20, 60_000)) {
    return NextResponse.json(
      { error: "Too many checkout requests. Please wait a moment." },
      { status: 429 }
    );
  }

  if (!hasSquareCredentials()) {
    return NextResponse.json(
      { error: "Ordering is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length < 1 || items.length > 50) {
    return NextResponse.json(
      { error: "Order must contain between 1 and 50 items." },
      { status: 400 },
    );
  }

  const lineItems: { catalogObjectId: string; quantity: string }[] = [];
  for (const item of items) {
    if (
      !item ||
      typeof item.variationId !== "string" ||
      !item.variationId ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 20
    ) {
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    }
    lineItems.push({
      catalogObjectId: item.variationId,
      quantity: String(item.quantity),
    });
  }

  const locationId = getSquareLocationId();
  const noteParts = [
    body.pickupName ? `Pickup: ${body.pickupName}` : null,
    body.note || null,
  ].filter(Boolean);

  try {
    const client = getSquareClient();
    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId,
        lineItems,
        fulfillments: [
          {
            type: "PICKUP",
            state: "PROPOSED",
            pickupDetails: {
              recipient: {
                displayName: body.pickupName || "Collection guest",
              },
              scheduleType: "ASAP",
            },
          },
        ],
        ...(noteParts.length
          ? { note: noteParts.join(" · ").slice(0, 500) }
          : {}),
      },
      checkoutOptions: {
        redirectUrl: `${SITE_URL}/order/confirmed`,
        askForShippingAddress: false,
      },
    });

    const url = result.paymentLink?.url;
    if (!url) {
      return NextResponse.json(
        { error: "Could not create checkout. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[checkout] payment link failed", err);
    return NextResponse.json(
      { error: "Checkout failed. Please try again shortly." },
      { status: 502 },
    );
  }
}
