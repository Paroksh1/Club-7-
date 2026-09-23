"use client";

import Image from "next/image";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { entrance } from "@/lib/entrance";

/** Same cinematic night-register formula used elsewhere on the site —
 * deep, cool, controlled contrast, floodlights preserved rather than
 * blown out. Stock frames get a touch more correction to sit in the
 * same register as the real venue photography. */
function gradeFor(stock: boolean | undefined): string {
  return stock
    ? "saturate(0.85) contrast(1.1) brightness(0.9) hue-rotate(5deg)"
    : "saturate(0.92) contrast(1.05) brightness(0.95) hue-rotate(3deg)";
}

/** All three photos stay mounted and cross-fade via opacity/transform —
 * same technique the homepage's Ground section uses. The very slight
 * scale-settle (1.02 → 1) on switch stands in for depth without any
 * cursor-tracking machinery. */
function SportPhoto({ activeId, className }: { activeId: PlaySportId; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-c7-bg-3 ${className}`}>
      {PLAY_SPORTS.map((sport) => (
        <div
          key={sport.id}
          className="absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
          style={{
            opacity: sport.id === activeId ? 1 : 0,
            transform: sport.id === activeId ? "translateY(0) scale(1)" : "translateY(8px) scale(1.02)",
          }}
        >
          <Image
            src={sport.image.src}
            alt={sport.image.alt}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            quality={90}
            priority={sport.id === PLAY_SPORTS[0].id}
            className="object-cover"
            style={{ objectPosition: sport.image.position, filter: gradeFor(sport.image.stock) }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
        </div>
      ))}
    </div>
  );
}

/** Extremely faint per-sport line-art — a goal-net grid, a crease and
 * stumps, a court and net — anchored to the corner behind the identity
 * block as atmosphere, not a framed illustration. Small and low-
 * opacity enough that it reads as structure in the background rather
 * than a pattern crossing through the metadata/CTA text. */
function SportMotif({ sportId }: { sportId: PlaySportId }) {
  const common = "pointer-events-none absolute -z-10 -bottom-10 -left-8 h-[260px] w-[260px] text-c7-ink opacity-[0.035] md:h-[320px] md:w-[320px]";
  if (sportId === "football") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className={common}>
        <path d="M0 55 H130 M0 95 H160 M0 135 H130" stroke="currentColor" strokeWidth="1" />
        <path d="M45 20 V180 M90 20 V180 M135 20 V180" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (sportId === "cricket") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className={common}>
        <path d="M64 40 V150 M80 40 V150 M96 40 V150" stroke="currentColor" strokeWidth="1.5" />
        <path d="M62 42 H98 M20 150 H160 M20 150 V170 M160 150 V170" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className={common}>
      <rect x="24" y="24" width="152" height="152" stroke="currentColor" strokeWidth="1" />
      <path d="M24 100 H176 M24 68 H176 M24 132 H176" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Selector({
  activeId,
  onSelect,
}: {
  activeId: PlaySportId;
  onSelect: (id: PlaySportId) => void;
}) {
  return (
    <div
      className="flex items-baseline gap-6 overflow-x-auto border-b border-c7-line/15 sm:gap-9 md:gap-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {PLAY_SPORTS.map((sport) => {
        const isActive = sport.id === activeId;
        return (
          <button
            key={sport.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(sport.id)}
            className="group relative flex shrink-0 items-baseline gap-2 pb-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red md:pb-4"
          >
            <span
              className={`hidden font-body text-body-sm tracking-[0.04em] tabular-nums transition-colors duration-300 sm:inline ${
                isActive ? "text-c7-red" : "text-c7-ink-dim/60"
              }`}
            >
              {sport.number}
            </span>
            <span
              className={`font-body text-body font-medium uppercase tracking-[0.02em] transition-colors duration-300 ${
                isActive ? "text-c7-ink" : "text-c7-ink-dim group-hover:text-c7-ink"
              }`}
            >
              {sport.shortName}
            </span>
            <span
              aria-hidden="true"
              className={`absolute -bottom-px left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 motion-reduce:transition-none ${
                isActive ? "scale-x-100 bg-c7-red" : "bg-c7-ink-dim group-hover:scale-x-100"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function InfoRow({ info }: { info: { label: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-c7-line/10 pt-5">
      {info.map((item) => (
        <div key={item.label}>
          <p className="font-body text-[0.6875rem] tracking-[0.22em] uppercase text-c7-ink-dim/70">{item.label}</p>
          <p className="mt-1.5 font-body text-body-sm font-medium uppercase tracking-[0.03em] text-c7-ink">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function SportCta({ shortName, href }: { shortName: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-8 inline-flex w-fit items-center gap-2 pb-1.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
    >
      Check {shortName} Slots
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
        ↗
      </span>
      <span
        aria-hidden="true"
        className="absolute -inset-x-1.5 bottom-0 h-px bg-c7-line/40 transition-colors duration-200 group-hover:bg-c7-red"
      />
    </a>
  );
}

type PlaySection1Props = {
  activeId: PlaySportId;
  onSelect: (id: PlaySportId) => void;
};

export default function PlaySection1({ activeId, onSelect }: PlaySection1Props) {
  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;

  return (
    <section
      className="relative bg-c7-bg-1 px-edge pb-20 md:pb-24"
      style={{ paddingTop: "calc(var(--header-height, 90px) + 40px)" }}
    >
      {/* Intro — controlled, not hero-scale. One quick staged reveal on
          mount (this is always the first thing on screen, no scroll
          needed) rather than a scroll-triggered one. */}
      <div className="max-w-2xl">
        <p className={`c7-anim-reveal font-body text-tag tracking-[0.24em] uppercase text-c7-red ${entrance(0)}`}>
          01 / Play
        </p>
        <h1
          className={`c7-anim-headline -ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(3.5rem,5.5vw,6.5rem)] ${entrance(
            120
          )}`}
        >
          What Are You
          <br />
          Playing Tonight?
        </h1>
        <p className={`c7-anim-reveal mt-4 font-body text-body text-c7-ink-dim ${entrance(240)}`}>
          Football, box cricket or pickleball. Pick one. We&apos;ll take it from there.
        </p>
      </div>

      {/* Selector — connected to the title, not floating below it */}
      <div className={`c7-anim-reveal mt-9 md:mt-10 ${entrance(360)}`}>
        <Selector activeId={activeId} onSelect={onSelect} />
      </div>

      {/* Active panel — desktop: asymmetric 42/58 split, image begins
          at the same level as the eyebrow rather than being vertically
          centred against it, so the two columns read as one scene. */}
      <div className="relative mt-7 hidden md:mt-8 md:grid md:grid-cols-[42%_1fr] md:items-start md:gap-14">
        <div key={sport.id} className="relative max-w-xl [animation:c7-reveal_320ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]">
          <SportMotif sportId={sport.id} />
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            {sport.number} / {sport.shortName}
          </p>
          <h2 className="-ml-1 mt-2 font-display uppercase leading-[0.92] text-[clamp(2.75rem,4vw,5rem)]">
            <span className="text-c7-ink">{sport.name}</span>
            <br />
            <span className="text-c7-red">{sport.tagline}</span>
          </h2>
          <p className="mt-3 max-w-[36ch] font-body text-body-lg text-c7-ink/85">{sport.line}</p>
          <div className="mt-7">
            <InfoRow info={sport.info} />
          </div>
          <SportCta shortName={sport.shortName} href={whatsappHref(WHATSAPP_MESSAGES[sport.id])} />
        </div>

        <SportPhoto activeId={activeId} className="h-[480px] w-full" />
      </div>

      {/* Active panel — mobile: sport identity, then a strong near-
          full-width image, then the statement, metadata and CTA below
          it — never beside the text. */}
      <div className="relative mt-7 md:hidden">
        <div key={`${sport.id}-mobile-head`} className="relative [animation:c7-reveal_320ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]">
          <SportMotif sportId={sport.id} />
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            {sport.number} / {sport.shortName}
          </p>
          <h2 className="-ml-1 mt-2 font-display uppercase leading-[0.92] text-[clamp(2.75rem,10vw,3.75rem)]">
            <span className="text-c7-ink">{sport.name}</span>
            <br />
            <span className="text-c7-red">{sport.tagline}</span>
          </h2>
        </div>

        <SportPhoto activeId={activeId} className="mt-5 h-[260px] w-full" />

        <div
          key={`${sport.id}-mobile-body`}
          className="mt-6 [animation:c7-reveal_320ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]"
        >
          <p className="max-w-[36ch] font-body text-body-lg text-c7-ink/85">{sport.line}</p>
          <div className="mt-6">
            <InfoRow info={sport.info} />
          </div>
          <SportCta shortName={sport.shortName} href={whatsappHref(WHATSAPP_MESSAGES[sport.id])} />
        </div>
      </div>
    </section>
  );
}
