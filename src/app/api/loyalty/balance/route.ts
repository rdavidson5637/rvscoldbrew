import { NextResponse } from "next/server";
import { findAccountByPhone, getBalance, getProgram } from "@/lib/loyalty";
import { toE164UK } from "@/lib/phone";
import { hasSquareCredentials } from "@/lib/square";

const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit = 10): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (!rateLimit(clientIp(request))) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  if (!hasSquareCredentials()) {
    return NextResponse.json(
      { error: "Rewards are launching soon." },
      { status: 503 },
    );
  }

  let phone: string;
  try {
    const body = (await request.json()) as { phone?: string };
    const normalised = toE164UK(body.phone ?? "");
    if (!normalised) {
      return NextResponse.json(
        { error: "Enter a valid UK phone number." },
        { status: 400 },
      );
    }
    phone = normalised;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const program = await getProgram();
    if (!program) {
      return NextResponse.json(
        { error: "Rewards are launching soon." },
        { status: 503 },
      );
    }

    const account = await findAccountByPhone(phone);
    if (!account?.id) {
      return NextResponse.json(
        { error: "No account found for that number. Join free below." },
        { status: 404 },
      );
    }

    const balance = await getBalance(account.id);
    return NextResponse.json({
      balance,
      terminology: program.terminology,
      rewardTiers: program.rewardTiers,
    });
  } catch (err) {
    console.error("[loyalty/balance]", err);
    return NextResponse.json(
      { error: "Could not check points. Please try again." },
      { status: 502 },
    );
  }
}
