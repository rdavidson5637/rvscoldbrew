export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let minutes = 8 * 60; minutes <= 17 * 60 + 30; minutes += 30) {
    const hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
  }
  return slots;
}

export function getNearestPickupSlot(slots: string[]): string {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = 8 * 60;
  const closeMinutes = 17 * 60 + 30;

  let targetMinutes = Math.ceil(nowMinutes / 30) * 30;
  if (targetMinutes < openMinutes) targetMinutes = openMinutes;
  if (targetMinutes > closeMinutes) targetMinutes = closeMinutes;

  const hour24 = Math.floor(targetMinutes / 60);
  const minute = targetMinutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const formatted = `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;

  if (slots.includes(formatted)) return formatted;
  return slots[0] ?? formatted;
}

export function generateOrderRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "RV-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
