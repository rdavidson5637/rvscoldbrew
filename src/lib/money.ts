export function formatPrice(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

/** Square money amounts are bigint pence in GBP. */
export function poundsToPence(n: number): bigint {
  return BigInt(Math.round(n * 100));
}

export function penceToPounds(p: bigint | number): number {
  const value = typeof p === "bigint" ? Number(p) : p;
  return value / 100;
}
