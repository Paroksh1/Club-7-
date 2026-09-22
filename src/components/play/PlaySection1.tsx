"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import { FILM_GRAIN_URL } from "@/lib/grain";

function gradeFor(stock: boolean | undefined): string {
  return stock ? "saturate(0.85) contrast(1.06) brightness(0.92)" : "saturate(0.96) contrast(1.02)";
}

/** All three photos stay mounted and cross-fade via opacity/translate —
 * same technique FieldStage already uses on the homepage's Ground
 * section, just without the line-marking overlay. */
function SportPhoto({ activeId, className }: { activeId: PlaySportId; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-c7-bg-3 ${className}`}>
      {PLAY_SPORTS.map((sport) => (
        <div
          key={sport.id}
          className="absolute inset-0 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
          style={{
            opacity: sport.id === activeId ? 1 : 0,
            transform: sport.id === activeId ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <Image
            src={sport.image.src}
            alt={sport.image.alt}
            fill
            sizes="(min-width: 768px) 440px, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: sport.image.position, filter: gradeFor(sport.image.stock) }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
        </div>
      ))}
    </div>
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
    <div className="flex items-baseline gap-5 border-b border-c7-line/15 sm:gap-8 md:gap-12">
      {PLAY_SPORTS.map((sport) => {
        const isActive = sport.id === activeId;
        return (
          <button
            key={sport.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(sport.id)}
            className="group relative flex items-baseline gap-2 pb-4 md:pb-5"
          >
            <span
              className={`hidden font-body text-body-sm tracking-[0.04em] tabular-nums transition-colors duration-300 sm:inline ${
                isActive ? "text-c7-red" : "text-c7-ink-dim"
              }`}
            >
              {sport.number}
            </span>
            <span
              className={`font-body text-body-sm font-medium uppercase tracking-[0.04em] transition-colors duration-300 ${
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

function InfoGrid({ info }: { info: { label: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {info.map((item) => (
        <div key={item.label}>
          <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{item.label}</p>
          <p className="mt-1 font-body text-body font-medium text-c7-ink">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function PlaySection1() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = PLAY_SPORTS.find((s) => s.id === searchParams.get("sport"))?.id ?? PLAY_SPORTS[0].id;
  const [activeId, setActiveId] = useState<PlaySportId>(initial);
  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;

  function handleSelect(id: PlaySportId) {
    setActiveId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sport", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="relative bg-c7-bg-1 px-edge pb-20 pt-24 md:pb-24 md:pt-20">
      {/* Intro — controlled, not hero-scale */}
      <div className="max-w-2xl">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">01 / Play</p>
        <h1 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(4rem,6vw,7rem)]">
          What Are You
          <br />
          Playing Tonight?
        </h1>
        <p className="mt-5 font-body text-body-lg text-c7-ink/85">
          Football, box cricket or pickleball. Pick one. We&apos;ll take it from there.
        </p>
      </div>

      {/* Selector */}
      <div className="mt-14 md:mt-16">
        <Selector activeId={activeId} onSelect={handleSelect} />
      </div>

      {/* Active panel — desktop: two columns, image never dominant */}
      <div className="mt-8 hidden md:mt-10 md:grid md:grid-cols-[minmax(0,1fr)_440px] md:items-center md:gap-16">
        <div key={sport.id} className="c7-anim-reveal max-w-xl">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            {sport.number} / {sport.shortName}
          </p>
          <h2 className="-ml-1 mt-2 font-display uppercase leading-[0.94] text-display-3">
            <span className="text-c7-ink">{sport.name}</span>
            <br />
            <span className="text-c7-red">{sport.tagline}</span>
          </h2>
          <p className="mt-4 max-w-[38ch] font-body text-body-lg text-c7-ink/85">{sport.line}</p>
          <div className="mt-8">
            <InfoGrid info={sport.info} />
          </div>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES[sport.id])}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red"
          >
            Check {sport.shortName} Slots
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>

        <SportPhoto activeId={activeId} className="h-[320px] w-[440px]" />
      </div>

      {/* Active panel — mobile: stacked, image between copy and info */}
      <div className="mt-8 md:hidden">
        <div key={`${sport.id}-mobile-head`} className="c7-anim-reveal">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            {sport.number} / {sport.shortName}
          </p>
          <h2 className="-ml-1 mt-2 font-display uppercase leading-[0.94] text-display-3">
            <span className="text-c7-ink">{sport.name}</span>
            <br />
            <span className="text-c7-red">{sport.tagline}</span>
          </h2>
          <p className="mt-3 font-body text-body-lg text-c7-ink/85">{sport.line}</p>
        </div>

        <SportPhoto activeId={activeId} className="mt-5 h-[220px] w-full" />

        <div key={`${sport.id}-mobile-info`} className="c7-anim-reveal mt-6">
          <InfoGrid info={sport.info} />
          <a
            href={whatsappHref(WHATSAPP_MESSAGES[sport.id])}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red"
          >
            Check {sport.shortName} Slots
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
