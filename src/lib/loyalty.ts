import "server-only";

import { randomUUID } from "crypto";
import {
  getSquareClient,
  getSquareLocationId,
  hasSquareCredentials,
} from "@/lib/square";

/**
 * Loyalty program creation and configuration happen in the Square Dashboard,
 * not via API. This module only reads the program and accumulates points.
 */

export type LoyaltyProgramView = {
  id: string;
  pointsPerPound: number | null;
  terminology: { one: string; other: string };
  rewardTiers: { name: string; points: number }[];
};

let programCache: { at: number; value: LoyaltyProgramView | null } | null =
  null;
const PROGRAM_TTL_MS = 10 * 60 * 1000;

export async function getProgram(): Promise<LoyaltyProgramView | null> {
  if (!hasSquareCredentials()) return null;
  if (programCache && Date.now() - programCache.at < PROGRAM_TTL_MS) {
    return programCache.value;
  }

  try {
    const client = getSquareClient();
    const res = await client.loyalty.programs.list();
    const program = res.programs?.[0] ?? null;
    if (!program?.id) {
      programCache = { at: Date.now(), value: null };
      return null;
    }

    let pointsPerPound: number | null = null;
    const rules = program.accrualRules ?? [];
    for (const rule of rules) {
      if (rule.spendData?.amountMoney?.amount != null && rule.points) {
        const pence = Number(rule.spendData.amountMoney.amount);
        if (pence > 0) {
          pointsPerPound = (rule.points * 100) / pence;
        }
      }
    }

    const view: LoyaltyProgramView = {
      id: program.id,
      pointsPerPound,
      terminology: {
        one: program.terminology?.one ?? "point",
        other: program.terminology?.other ?? "points",
      },
      rewardTiers: (program.rewardTiers ?? []).map((tier) => ({
        name: tier.name ?? "Reward",
        points: tier.points ?? 0,
      })),
    };
    programCache = { at: Date.now(), value: view };
    return view;
  } catch (err) {
    console.warn("[loyalty] getProgram failed", err);
    programCache = { at: Date.now(), value: null };
    return null;
  }
}

export async function findAccountByPhone(phoneE164: string) {
  const client = getSquareClient();
  const res = await client.loyalty.accounts.search({
    query: { mappings: [{ phoneNumber: phoneE164 }] },
    limit: 1,
  });
  return res.loyaltyAccounts?.[0] ?? null;
}

export async function createAccount(phoneE164: string) {
  const program = await getProgram();
  if (!program) throw new Error("Loyalty program not configured");

  const client = getSquareClient();
  const res = await client.loyalty.accounts.create({
    loyaltyAccount: {
      programId: program.id,
      mapping: { phoneNumber: phoneE164 },
    },
    idempotencyKey: randomUUID(),
  });
  return res.loyaltyAccount ?? null;
}

export async function getBalance(accountId: string): Promise<number> {
  const client = getSquareClient();
  const res = await client.loyalty.accounts.get({ accountId });
  return res.loyaltyAccount?.balance ?? 0;
}

export async function accumulatePointsForOrder(orderId: string): Promise<void> {
  if (!hasSquareCredentials()) return;

  try {
    const client = getSquareClient();
    const orderRes = await client.orders.get({ orderId });
    const order = orderRes.order;
    if (!order) {
      console.warn("[loyalty] order not found", orderId);
      return;
    }

    const customerId = order.customerId;
    let accountId: string | undefined;

    if (customerId) {
      const search = await client.loyalty.accounts.search({
        query: { customerIds: [customerId] },
        limit: 1,
      });
      accountId = search.loyaltyAccounts?.[0]?.id;
    }

    if (!accountId) {
      console.info("[loyalty] no account for order — skipping", orderId);
      return;
    }

    await client.loyalty.accounts.accumulatePoints({
      accountId,
      accumulatePoints: { orderId },
      idempotencyKey: `order-${orderId}`,
      locationId: getSquareLocationId(),
    });
  } catch (err) {
    console.error("[loyalty] accumulatePointsForOrder failed", err);
  }
}
