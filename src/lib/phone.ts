/** Normalise UK phone input to E.164 (+44…). Returns null if invalid. */
export function toE164UK(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  let n = digits;
  if (n.startsWith("+44")) n = n.slice(3);
  else if (n.startsWith("44")) n = n.slice(2);
  else if (n.startsWith("0")) n = n.slice(1);
  n = n.replace(/\D/g, "");
  if (n.length < 9 || n.length > 10) return null;
  return `+44${n}`;
}
