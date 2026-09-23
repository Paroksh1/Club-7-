"use client";

import { useState, type CSSProperties } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { SportMotif } from "./PlaySection1";

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

function fade(visible: boolean, delayMs: number): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transitionDelay: visible ? `${delayMs}ms` : "0ms",
  };
}

function InfoRows({ info }: { info: { label: string; value: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15">
      {info.map((item) => (
        <div key={item.label} className="flex items-center justify-between py-3.5">
          <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{item.label}</span>
          <span className="font-body text-body-lg font-medium text-c7-ink">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

/** No pills, no tabs — each day is a small editorial stack (day label
 * over date) with a shared hairline baseline and a red accent that
 * only the active day earns. Inactive days get their own quiet hover
 * underline so every day feels responsive, not just the selected
 * one. */
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
      className="flex gap-7 overflow-x-auto border-b border-c7-line/15 [scrollbar-width:none] sm:gap-10 [&::-webkit-scrollbar]:hidden"
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
            className="group relative flex shrink-0 flex-col items-start gap-1.5 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            <span
              className={`font-body text-tag tracking-[0.14em] uppercase transition-colors duration-200 ${
                isActive ? "text-c7-red" : "text-c7-ink-dim group-hover:text-c7-ink"
              }`}
            >
              {d.dayLabel}
            </span>
            <span
              className={`font-display text-[1.375rem] uppercase leading-none tabular-nums transition-colors duration-200 ${
                isActive ? "text-c7-ink" : "text-c7-ink-dim group-hover:text-c7-ink"
              }`}
            >
              {d.dateLabel}
            </span>
            <span
              aria-hidden="true"
              className={`absolute -bottom-px left-0 right-0 h-[2px] origin-left scale-x-0 bg-c7-line/30 transition-transform duration-200 motion-reduce:transition-none ${
                !isActive ? "group-hover:scale-x-100" : ""
              }`}
            />
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
    <div className="mt-9">
      <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Next Step</p>
      <h3 className="-ml-1 mt-1.5 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2rem,3.5vw,3rem)]">
        Check Live Availability
      </h3>
      <p className="mt-3 max-w-[38ch] font-body text-body text-c7-ink-dim">
        {shortName} slots are confirmed through our booking channel.
      </p>
      <a
        href={whatsappHref(WHATSAPP_MESSAGES[sportId])}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-7 inline-flex items-center gap-2.5 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-[background-color,box-shadow] duration-200 hover:bg-c7-red-dim hover:shadow-[0_10px_24px_-10px_color-mix(in_srgb,var(--color-c7-red)_60%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
      >
        Check {shortName} Slots
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
          ↗
        </span>
      </a>
      <p className="mt-4 font-body text-body-sm text-c7-ink-dim/80">Slots confirmed through WhatsApp.</p>
    </div>
  );
}

export default function PlaySection2({ activeId }: { activeId: PlaySportId }) {
  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;
  const [dates] = useState(buildDateRail);
  const [selectedDate, setSelectedDate] = useState(0);
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-24 pt-12 md:pb-28 md:pt-14">
      {/* Intro — sits close to where Section 1 left off rather than
          restarting with a full header-clearance gap, so this reads
          as the next beat in one flow ("you picked pickleball — now
          pick the day") instead of a second, disconnected page. */}
      <div className="max-w-xl">
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          02 / Book
        </p>
        <h2
          className="-ml-1 mt-2 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(3rem,4.5vw,5rem)] transition-[opacity,transform] duration-700"
          style={fade(visible, 80)}
        >
          Lock It In.
        </h2>
        <p
          className="mt-4 font-body text-body text-c7-ink-dim transition-[opacity,transform] duration-700"
          style={fade(visible, 160)}
        >
          Pick a day. We&apos;ll show you the next move.
        </p>
      </div>

      {/* Desktop — two zones split by a single hairline. Left is
          identity: who this is for. Right is the action: pick a day,
          then go. */}
      <div className="mt-12 hidden md:grid md:grid-cols-[minmax(0,38%)_1px_minmax(0,1fr)] md:gap-12">
        <div
          className="relative transition-[opacity,transform] duration-700"
          style={fade(visible, 260)}
        >
          <SportMotif sportId={sport.id} />
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">{sport.name}</p>
          <p className="mt-2 max-w-[26ch] font-display text-[1.625rem] uppercase leading-[1.02] text-c7-ink">
            {sport.info[0]?.value} <span className="text-c7-red">/</span> {sport.tagline}
          </p>
          <div className="mt-8">
            <InfoRows info={sport.info} />
          </div>
        </div>

        <div className="bg-c7-line/15" aria-hidden="true" />

        <div className="transition-[opacity,transform] duration-700" style={fade(visible, 340)}>
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Pick a Day</p>
          <div className="mt-5">
            <DateRail dates={dates} selected={selectedDate} onSelect={setSelectedDate} />
          </div>
          <AvailabilityBlock sportId={sport.id} shortName={sport.shortName} />
        </div>
      </div>

      {/* Mobile — natural stack, same reading order: identity, then
          the day, then the action. */}
      <div className="mt-10 md:hidden">
        <div className="relative transition-[opacity,transform] duration-700" style={fade(visible, 260)}>
          <SportMotif sportId={sport.id} />
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">{sport.name}</p>
          <p className="mt-2 max-w-[26ch] font-display text-[1.5rem] uppercase leading-[1.02] text-c7-ink">
            {sport.info[0]?.value} <span className="text-c7-red">/</span> {sport.tagline}
          </p>
          <div className="mt-6">
            <InfoRows info={sport.info} />
          </div>
        </div>

        <div className="mt-10 transition-[opacity,transform] duration-700" style={fade(visible, 340)}>
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Pick a Day</p>
          <div className="mt-5">
            <DateRail dates={dates} selected={selectedDate} onSelect={setSelectedDate} />
          </div>
          <AvailabilityBlock sportId={sport.id} shortName={sport.shortName} />
        </div>
      </div>
    </section>
  );
}
