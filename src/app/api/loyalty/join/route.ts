import { NextResponse } from "next/server";
import { createAccount, findAccountByPhone, getProgram } from "@/lib/loyalty";
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

    const existing = await findAccountByPhone(phone);
    if (existing) {
      return NextResponse.json({
        joined: true,
        alreadyMember: true,
        balance: existing.balance ?? 0,
        terminology: program.terminology,
      });
    }

    const account = await createAccount(phone);
    return NextResponse.json({
      joined: true,
      alreadyMember: false,
      balance: account?.balance ?? 0,
      terminology: program.terminology,
    });
  } catch (err) {
    console.error("[loyalty/join]", err);
    return NextResponse.json(
      { error: "Could not join rewards. Please try again." },
      { status: 502 },
    );
  }
}
