"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { whatsappHref } from "@/lib/constants";
import { useRevealOnView } from "@/lib/useRevealOnView";
import {
  addDays,
  formatTime12h,
  fromISODate,
  fullDateLabel,
  getTodayInKolkata,
  isSameDate,
  shortDateLabel,
  shortDayLabel,
  toISODate,
} from "@/lib/date-utils";

const QUICK_TIMES = ["18:00", "19:00", "20:00", "21:00", "22:00"];
const DURATIONS = [
  { minutes: 60, label: "60 min" },
  { minutes: 90, label: "90 min" },
  { minutes: 120, label: "120 min" },
];
const RAIL_DAYS = 5;

function fade(visible: boolean, delayMs: number): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transitionDelay: visible ? `${delayMs}ms` : "0ms",
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">{children}</p>;
}

/** Today + the next 4 days as quick-pick chips, plus a native date input
 * for anything further out — the rail alone can't reach next month, and
 * a visitor planning two weeks ahead shouldn't be blocked from doing so. */
function DatePicker({
  today,
  selected,
  onSelect,
}: {
  today: Date;
  selected: Date;
  onSelect: (d: Date) => void;
}) {
  const railDates = useMemo(() => Array.from({ length: RAIL_DAYS }, (_, i) => addDays(today, i)), [today]);
  const selectedInRail = railDates.some((d) => isSameDate(d, selected));

  return (
    <div>
      <div
        className="flex gap-6 overflow-x-auto [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Pick a day"
      >
        {railDates.map((d) => {
          const isActive = isSameDate(d, selected);
          return (
            <button
              key={toISODate(d)}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(d)}
              className="group relative flex shrink-0 flex-col items-start gap-1.5 pb-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              <span
                className={`font-body text-tag tracking-[0.14em] uppercase transition-colors duration-200 ${
                  isActive ? "text-c7-red" : "text-c7-ink-dim group-hover:text-c7-ink"
                }`}
              >
                {shortDayLabel(d, today)}
              </span>
              <span
                className={`font-display text-[1.25rem] uppercase leading-none tabular-nums transition-colors duration-200 ${
                  isActive ? "text-c7-ink" : "text-c7-ink-dim group-hover:text-c7-ink"
                }`}
              >
                {shortDateLabel(d)}
              </span>
              <span
                aria-hidden="true"
                className={`absolute -bottom-px left-0 right-0 h-[2px] origin-left scale-x-0 bg-c7-red transition-transform duration-300 motion-reduce:transition-none ${
                  isActive ? "scale-x-100" : ""
                }`}
              />
            </button>
          );
        })}
      </div>

      <label className="mt-5 flex items-center gap-3">
        <span className="font-body text-body-sm text-c7-ink-dim">Or pick another date</span>
        <input
          type="date"
          min={toISODate(today)}
          value={selectedInRail ? "" : toISODate(selected)}
          onChange={(e) => {
            if (e.target.value) onSelect(fromISODate(e.target.value));
          }}
          className="border-b border-c7-line/30 bg-transparent py-1 font-body text-body-sm text-c7-ink outline-none transition-colors focus:border-c7-red [color-scheme:dark]"
        />
      </label>
    </div>
  );
}

function TimePicker({ value, onChange }: { value: string; onChange: (t: string) => void }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {QUICK_TIMES.map((t) => {
          const isActive = t === value;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(t)}
              className={`border px-3.5 py-2 font-body text-body-sm font-medium tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red ${
                isActive
                  ? "border-c7-red text-c7-red"
                  : "border-c7-line/30 text-c7-ink-dim hover:border-c7-line/60 hover:text-c7-ink"
              }`}
            >
              {formatTime12h(t)}
            </button>
          );
        })}
      </div>
      <label className="mt-3 flex items-center gap-3">
        <span className="font-body text-body-sm text-c7-ink-dim">Or choose another time</span>
        <input
          type="time"
          value={value}
          onChange={(e) => e.target.value && onChange(e.target.value)}
          className="border-b border-c7-line/30 bg-transparent py-1 font-body text-body-sm text-c7-ink outline-none transition-colors focus:border-c7-red [color-scheme:dark]"
        />
      </label>
    </div>
  );
}

function DurationPicker({ value, onChange }: { value: number; onChange: (m: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {DURATIONS.map((d) => {
        const isActive = d.minutes === value;
        return (
          <button
            key={d.minutes}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(d.minutes)}
            className={`border px-3.5 py-2 font-body text-body-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red ${
              isActive
                ? "border-c7-red text-c7-red"
                : "border-c7-line/30 text-c7-ink-dim hover:border-c7-line/60 hover:text-c7-ink"
            }`}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
}

/** The signature moment: a match-slip summary that updates one line at
 * a time as the visitor changes a field, rather than the whole panel
 * re-rendering flatly. Explicitly an unconfirmed request, never styled
 * or worded like a held reservation. */
function SummarySlip({
  shortName,
  date,
  today,
  time,
  duration,
  flexible,
}: {
  shortName: string;
  date: Date;
  today: Date;
  time: string;
  duration: number;
  flexible: boolean;
}) {
  const rows = [
    { key: "sport", label: "Sport", value: shortName },
    { key: "date", label: "Date", value: isSameDate(date, today) ? `Today, ${fullDateLabel(date)}` : fullDateLabel(date) },
    { key: "time", label: "Preferred start", value: formatTime12h(time) },
    { key: "duration", label: "Duration", value: `${duration} minutes${flexible ? " (flexible)" : ""}` },
  ];

  return (
    <div className="border border-c7-line/20 bg-c7-bg-3/60 p-6 md:p-7">
      <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Your Game</p>
      <div className="mt-4 flex flex-col divide-y divide-c7-line/10">
        {rows.map((row) => (
          <div key={row.key} className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="font-body text-body-sm text-c7-ink-dim">{row.label}</span>
            <span
              key={row.value}
              className="c7-anim-reveal font-body text-body-sm font-medium text-c7-ink [animation-duration:300ms]"
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-c7-line/10 pt-4 font-body text-body-sm uppercase tracking-[0.08em] text-c7-ink-dim/80">
        Status: Availability to be confirmed
      </p>
    </div>
  );
}

export default function PlaySection2({ activeId }: { activeId: PlaySportId }) {
  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;
  const today = useMemo(() => getTodayInKolkata(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [time, setTime] = useState("20:00");
  const [duration, setDuration] = useState(60);
  const [flexible, setFlexible] = useState(false);
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  const message = [
    `Hi Club 7, I'd like to ask about a slot.`,
    `Sport: ${sport.shortName}`,
    `Date: ${fullDateLabel(selectedDate)}`,
    `Preferred start: ${formatTime12h(time)}`,
    `Duration: ${duration} minutes`,
    flexible ? "Another time that day works too." : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section
      id="book-enquiry"
      ref={ref}
      className="relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-24 pt-12 md:pb-28 md:pt-14"
    >
      <div className="max-w-xl">
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          02 / Book
        </p>
        <h2
          className="-ml-1 mt-2 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,3.6vw,4rem)] transition-[opacity,transform] duration-700"
          style={fade(visible, 80)}
        >
          When Are We Playing?
        </h2>
      </div>

      <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[1fr_minmax(280px,360px)] md:items-start md:gap-16">
        <div className="flex flex-col gap-8 transition-[opacity,transform] duration-700" style={fade(visible, 160)}>
          <div>
            <FieldLabel>Preferred Date</FieldLabel>
            <div className="mt-4">
              <DatePicker today={today} selected={selectedDate} onSelect={setSelectedDate} />
            </div>
          </div>

          <div>
            <FieldLabel>Preferred Start Time</FieldLabel>
            <div className="mt-4">
              <TimePicker value={time} onChange={setTime} />
            </div>
          </div>

          <div>
            <FieldLabel>Duration</FieldLabel>
            <div className="mt-4">
              <DurationPicker value={duration} onChange={setDuration} />
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={flexible}
              onChange={(e) => setFlexible(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-c7-red"
            />
            <span className="font-body text-body-sm text-c7-ink-dim">Another time that day works too.</span>
          </label>
        </div>

        <div className="transition-[opacity,transform] duration-700" style={fade(visible, 240)}>
          <SummarySlip shortName={sport.shortName} date={selectedDate} today={today} time={time} duration={duration} flexible={flexible} />

          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-[background-color,box-shadow] duration-200 hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Ask About This Slot
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
              ↗
            </span>
          </a>
          <p className="mt-3 font-body text-body-sm text-c7-ink-dim">
            Opens WhatsApp with your choices. Your booking is confirmed by Club 7.
          </p>
        </div>
      </div>
    </section>
  );
}
