import "server-only";

/**
 * Fulfillment hooks for paid Square orders.
 * Loyalty program creation/configuration happens in the Square Dashboard, not via API.
 */

export async function onOrderPaid(
  orderId: string,
  payment: {
    id?: string;
    amountMoney?: { amount?: bigint | number; currency?: string };
    locationId?: string;
  },
): Promise<void> {
  console.info("[fulfillment] order paid", {
    orderId,
    paymentId: payment.id,
    amount: payment.amountMoney?.amount?.toString(),
    locationId: payment.locationId,
  });

  try {
    const { accumulatePointsForOrder } = await import("@/lib/loyalty");
    await accumulatePointsForOrder(orderId);
  } catch (err) {
    console.error("[fulfillment] loyalty accumulate failed", err);
  }
}
