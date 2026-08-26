import { NextResponse } from "next/server";
import { WebhooksHelper } from "square";
import { onOrderPaid } from "@/lib/fulfillment";
import { SITE_URL } from "@/lib/brand";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!signatureKey) {
    console.error("[webhooks/square] SQUARE_WEBHOOK_SIGNATURE_KEY missing");
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";
  const notificationUrl = `${SITE_URL}/api/webhooks/square`;

  const valid = await WebhooksHelper.verifySignature({
    requestBody: body,
    signatureHeader: signature,
    signatureKey,
    notificationUrl,
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(body) as {
      type?: string;
      data?: {
        object?: {
          payment?: {
            id?: string;
            status?: string;
            orderId?: string;
            order_id?: string;
            amountMoney?: { amount?: number | string; currency?: string };
            locationId?: string;
          };
        };
      };
    };

    if (event.type === "payment.updated") {
      const payment = event.data?.object?.payment;
      const status = payment?.status;
      const orderId = payment?.orderId ?? payment?.order_id;
      if (status === "COMPLETED" && orderId) {
        console.info("[webhooks/square] payment completed", {
          orderId,
          amount: payment?.amountMoney?.amount,
          locationId: payment?.locationId,
        });
        await onOrderPaid(orderId, {
          id: payment?.id,
          amountMoney: {
            amount:
              typeof payment?.amountMoney?.amount === "string"
                ? Number(payment.amountMoney.amount)
                : payment?.amountMoney?.amount,
            currency: payment?.amountMoney?.currency,
          },
          locationId: payment?.locationId,
        });
      }
    }
  } catch (err) {
    console.error("[webhooks/square] processing error", err);
  }

  return NextResponse.json({ ok: true });
}
