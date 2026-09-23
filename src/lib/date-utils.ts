const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Club 7 is one physical venue in Asia/Kolkata — "today" for booking
 * purposes should always mean today at the venue, not in whichever
 * timezone a visitor's browser happens to be set to. Reads the real
 * Kolkata calendar date via Intl (not the browser's local `new Date()`)
 * and returns it as a local-midnight Date, which is all any of the
 * date-only comparisons/formatting below need.
 */
export function getTodayInKolkata(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return new Date(`${y}-${m}-${d}T00:00:00`);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function isSameDate(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** "Today" / "Tomorrow" / "Fri" — short label for the quick-pick rail. */
export function shortDayLabel(date: Date, today: Date): string {
  if (isSameDate(date, today)) return "Today";
  if (isSameDate(date, addDays(today, 1))) return "Tomorrow";
  return WEEKDAYS[date.getDay()];
}

/** "25 Sep" — compact label for the quick-pick rail. */
export function shortDateLabel(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

/** "Friday, 25 September 2026" — unambiguous, always includes the year,
 * for anywhere the date is used to actually confirm an enquiry rather
 * than just navigate a quick-pick rail. */
export function fullDateLabel(date: Date): string {
  return `${WEEKDAYS_FULL[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

const WEEKDAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** "8:00 PM" from a 24h "HH:MM" input value. */
export function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  let h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${period}`;
}
