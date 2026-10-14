import { WEEKLY_HOURS } from "@/lib/brand";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export type OpenState =
  | { open: true; closesAt: string }
  | { open: false; opensLabel: string | null };

export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

/** Current day (0 = Sunday) and minutes past midnight in Belfast. */
export function londonNow(date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getOpenState(date = new Date()): OpenState {
  const { day, minutes } = londonNow(date);
  const today = WEEKLY_HOURS[day];

  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, closesAt: formatMinutes(today.close) };
  }

  if (today && minutes < today.open) {
    return { open: false, opensLabel: `today at ${formatMinutes(today.open)}` };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = (day + offset) % 7;
    const hours = WEEKLY_HOURS[next];
    if (hours) {
      const when = offset === 1 ? "tomorrow" : DAY_NAMES[next];
      return { open: false, opensLabel: `${when} at ${formatMinutes(hours.open)}` };
    }
  }

  return { open: false, opensLabel: null };
}
