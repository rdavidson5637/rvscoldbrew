import "server-only";

import { SquareClient, SquareEnvironment } from "square";

function getEnvironment(): SquareEnvironment {
  const env = process.env.SQUARE_ENVIRONMENT ?? "sandbox";
  return env === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;
}

let client: SquareClient | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Lazy singleton — throws at call time if env is missing so builds still succeed. */
export function getSquareClient(): SquareClient {
  if (!client) {
    const token = requireEnv("SQUARE_ACCESS_TOKEN");
    client = new SquareClient({
      token,
      environment: getEnvironment(),
    });
  }
  return client;
}

export function getSquareLocationId(): string {
  return requireEnv("SQUARE_LOCATION_ID");
}

export const SQUARE_LOCATION_ID = {
  get value(): string {
    return getSquareLocationId();
  },
};

export function hasSquareCredentials(): boolean {
  return Boolean(
    process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID,
  );
}
