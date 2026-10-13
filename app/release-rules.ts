export type ScheduleCheck = { businessDays: number; weekStart: string; weekEnd: string };

export function parseReleaseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

export function businessDaysUntil(value: string, now = new Date()): number {
  const target = parseReleaseDate(value);
  if (!target) return -1;
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (target < today) return -1;
  let count = 0;
  for (let day = new Date(today.getTime() + 86400000); day <= target; day = new Date(day.getTime() + 86400000)) {
    const weekday = day.getUTCDay();
    if (weekday !== 0 && weekday !== 6) count++;
  }
  return count;
}

export function scheduleCheck(value: string, now = new Date()): ScheduleCheck | null {
  const target = parseReleaseDate(value);
  if (!target) return null;
  const weekday = target.getUTCDay();
  const offset = (weekday + 6) % 7;
  const start = new Date(target.getTime() - offset * 86400000);
  const end = new Date(start.getTime() + 7 * 86400000);
  return {
    businessDays: businessDaysUntil(value, now),
    weekStart: start.toISOString().slice(0, 10),
    weekEnd: end.toISOString().slice(0, 10),
  };
}

export function timingLabel(days: number): string {
  if (days < 0) return "Date invalide ou passée";
  if (days <= 2) return "Délai impossible";
  if (days < 15) return "Dérogation de délai";
  return "Préavis conforme — 15 jours ouvrés";
}
