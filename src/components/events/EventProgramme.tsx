import type { Occasion } from "./EventPlanner";

const OCCASION_LABEL: Record<Occasion, string> = {
  "team-outing": "Team Day",
  birthday: "Birthday",
  "private-group": "Private Group",
  "": "Your Night",
};

function formatDateLine(iso: string): string {
  if (!iso) return "Date to be decided";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Date to be decided";
  return d
    .toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
    .toUpperCase()
    .replace(",", " /");
}

/**
 * A live match-programme / invitation, not a fake ticket — no barcode,
 * no ticket number, no price. Reads entirely from the planner's own
 * state (passed in as props); it holds nothing of its own, so there's
 * exactly one source of truth for what the visitor has typed.
 */
export default function EventProgramme({
  occasion,
  headcount,
  date,
  notes,
}: {
  occasion: Occasion;
  headcount: string;
  date: string;
  notes: string;
}) {
  const rows = [
    { key: "occasion", label: OCCASION_LABEL[occasion] || "Your Night", isTitle: true },
  ];

  return (
    <div className="border border-c7-line/20 bg-c7-bg-3/70 p-7 md:p-8">
      <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
        Club 7 <span className="text-c7-ink-dim/40">/</span> Your Night
      </p>

      <p key={occasion} className="c7-anim-reveal mt-5 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(1.75rem,2.6vw,2.5rem)] [animation-duration:300ms]">
        {rows[0].label}
      </p>

      <div className="mt-6 flex flex-col divide-y divide-c7-line/10 border-t border-c7-line/10">
        <div className="flex items-baseline justify-between gap-4 py-3">
          <span className="font-body text-body-sm text-c7-ink-dim">People</span>
          <span key={headcount} className="c7-anim-reveal font-body text-body font-medium text-c7-ink [animation-duration:300ms]">
            {headcount ? `${headcount} people` : "To be confirmed"}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <span className="font-body text-body-sm text-c7-ink-dim">Date</span>
          <span key={date} className="c7-anim-reveal font-body text-body font-medium text-c7-ink [animation-duration:300ms]">
            {formatDateLine(date)}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <span className="font-body text-body-sm text-c7-ink-dim">Venue</span>
          <span className="font-body text-body font-medium text-c7-ink">Sector 89, Faridabad</span>
        </div>
      </div>

      <div className="mt-6 border-t border-c7-line/10 pt-5">
        <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">Sport</p>
        <p className="mt-1.5 font-body text-body-sm text-c7-ink/85">We&apos;ll sort it together.</p>
      </div>

      {notes.trim() ? (
        <div className="mt-5 border-t border-c7-line/10 pt-5">
          <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">Notes</p>
          <p className="mt-1.5 line-clamp-2 font-body text-body-sm text-c7-ink/85">{notes.trim()}</p>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between border-t border-c7-line/10 pt-5">
        <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim/70">Status</p>
        <p className="font-body text-body-sm font-medium uppercase tracking-[0.06em] text-c7-red">Enquiry</p>
      </div>
    </div>
  );
}
