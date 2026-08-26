import { NextResponse } from "next/server";
import { getSquareClient, getSquareLocationId, hasSquareCredentials } from "@/lib/square";

export async function GET() {
  if (process.env.SQUARE_ENVIRONMENT === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!hasSquareCredentials()) {
    return NextResponse.json(
      { ok: false, error: "Square credentials not configured" },
      { status: 500 },
    );
  }

  try {
    const client = getSquareClient();
    const locationId = getSquareLocationId();
    const res = await client.locations.get({ locationId });
    return NextResponse.json({
      ok: true,
      locationName: res.location?.name ?? locationId,
    });
  } catch (err) {
    console.error("[square/health]", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach Square" },
      { status: 500 },
    );
  }
}
