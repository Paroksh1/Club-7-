"use client";

import { useState } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

type DateOption = { key: string; dayLabel: string; dateLabel: string };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Today + the next 4 days, computed live rather than hardcoded.
 * Formatted by hand instead of `toLocaleDateString` — the server and
 * a visitor's browser can resolve the default locale differently
 * (e.g. "Sep 22" vs "22 Sept"), which is a real hydration mismatch,
 * not just a style nit. Fixed tables sidestep that entirely. */
function buildDateRail(): DateOption[] {
  const out: DateOption[] = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      key: d.toDateString(),
      dayLabel: i === 0 ? "Today" : WEEKDAYS[d.getDay()],
      dateLabel: `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`,
    });
  }
  return out;
}

function InfoRows({ info }: { info: { label: string; value: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15">
      {info.map((item) => (
        <div key={item.label} className="flex items-center justify-between py-3">
          <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{item.label}</span>
          <span className="font-body text-body font-medium text-c7-ink">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function DateRail({
  dates,
  selected,
  onSelect,
}: {
  dates: DateOption[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      className="flex gap-6 overflow-x-auto border-b border-c7-line/15 [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Pick a day"
    >
      {dates.map((d, i) => {
        const isActive = i === selected;
        return (
          <button
            key={d.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(i)}
            className="group relative flex shrink-0 flex-col items-start gap-1 pb-4"
          >
            <span
              className={`font-body text-tag tracking-[0.1em] uppercase transition-colors duration-200 ${
                isActive ? "text-c7-red" : "text-c7-ink-dim group-hover:text-c7-ink"
              }`}
            >
              {d.dayLabel}
            </span>
            <span
              className={`font-body text-body font-medium tabular-nums transition-colors duration-200 ${
                isActive ? "text-c7-ink" : "text-c7-ink-dim group-hover:text-c7-ink"
              }`}
            >
              {d.dateLabel}
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
  );
}

function AvailabilityBlock({ sportId, shortName }: { sportId: PlaySportId; shortName: string }) {
  return (
    <div className="mt-10">
      <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Next Step</p>
      <h3 className="-ml-1 mt-2 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(1.75rem,3vw,2.5rem)]">
        Check Live Availability
      </h3>
      <p className="mt-2 max-w-[42ch] font-body text-body text-c7-ink/85">
        {shortName} slots are confirmed through our booking channel.
      </p>
      <a
        href={whatsappHref(WHATSAPP_MESSAGES[sportId])}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 bg-c7-red px-7 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim"
      >
        Check {shortName} Slots
        <span aria-hidden="true">↗</span>
      </a>
      <p className="mt-4 font-body text-body-sm text-c7-ink-dim">Slots confirmed through WhatsApp.</p>
    </div>
  );
}

export default function PlaySection2({ activeId }: { activeId: PlaySportId }) {
  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;
  const [dates] = useState(buildDateRail);
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <section className="relative bg-c7-bg-1 px-edge pb-24 pt-24 md:pb-28 md:pt-24">
      <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">02 / Book</p>
      <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(3.8rem,6vw,6.5rem)]">
        Lock It In.
      </h2>
      <p className="mt-5 max-w-xl font-body text-body-lg text-c7-ink/85">
        Pick a day. We&apos;ll show you the next move.
      </p>

      {/* Desktop — two zones split by a single vertical rule */}
      <div className="mt-14 hidden md:grid md:grid-cols-[minmax(0,38%)_1px_minmax(0,1fr)] md:gap-12">
        <div key={`${sport.id}-left`} className="c7-anim-reveal">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">{sport.name}</p>
          <p className="mt-1 font-body text-body-lg text-c7-ink">
            {sport.info[0]?.value} / {sport.tagline}
          </p>
          <div className="mt-8">
            <InfoRows info={sport.info} />
          </div>
        </div>

        <div className="bg-c7-line/15" aria-hidden="true" />

        <div key={`${sport.id}-right`} className="c7-anim-reveal">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Pick a Day</p>
          <div className="mt-4">
            <DateRail dates={dates} selected={selectedDate} onSelect={setSelectedDate} />
          </div>
          <AvailabilityBlock sportId={sport.id} shortName={sport.shortName} />
        </div>
      </div>

      {/* Mobile — natural stack */}
      <div className="mt-10 md:hidden">
        <div key={`${sport.id}-mobile-left`} className="c7-anim-reveal">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">{sport.name}</p>
          <p className="mt-1 font-body text-body-lg text-c7-ink">
            {sport.info[0]?.value} / {sport.tagline}
          </p>
          <div className="mt-6">
            <InfoRows info={sport.info} />
          </div>
        </div>

        <div key={`${sport.id}-mobile-right`} className="c7-anim-reveal mt-10">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Pick a Day</p>
          <div className="mt-4">
            <DateRail dates={dates} selected={selectedDate} onSelect={setSelectedDate} />
          </div>
          <AvailabilityBlock sportId={sport.id} shortName={sport.shortName} />
        </div>
      </div>
    </section>
  );
}
