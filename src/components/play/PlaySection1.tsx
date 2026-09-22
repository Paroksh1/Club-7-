"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { useRevealOnView } from "@/lib/useRevealOnView";

function gradeFor(stock: boolean | undefined): string {
  return stock ? "saturate(0.85) contrast(1.06) brightness(0.92)" : "saturate(0.96) contrast(1.02)";
}

type SportRowProps = {
  sport: (typeof PLAY_SPORTS)[number];
  isActive: boolean;
  onActivate: () => void;
};

function SportRow({ sport, isActive, onActivate }: SportRowProps) {
  const revealed = isActive; // desktop reveal also happens on hover/focus via CSS below

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onActivate}
      className={`group relative flex w-full flex-col border-t py-6 text-left transition-colors duration-300 last:border-b hover:border-c7-red/40 focus-visible:border-c7-red/40 md:flex-row md:items-center md:justify-between md:gap-8 md:py-10 ${
        isActive ? "border-c7-red/40" : "border-c7-line/15"
      }`}
    >
      {/* number + name — both breakpoints; mobile arrow rides along here */}
      <div className="flex items-center justify-between gap-4 md:justify-start md:gap-6">
        <div className="flex items-baseline gap-3 md:gap-6">
          <span
            className={`font-body text-body-sm tracking-[0.08em] tabular-nums transition-colors duration-300 ${
              isActive ? "text-c7-red" : "text-c7-ink-dim group-hover:text-c7-red group-focus-visible:text-c7-red"
            }`}
          >
            {sport.number}
          </span>
          <span
            className={`font-display uppercase leading-[0.9] text-c7-ink text-[clamp(2.8rem,4.8vw,5.5rem)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
              isActive
                ? "translate-x-2 md:translate-x-3"
                : "group-hover:translate-x-2 md:group-hover:translate-x-3 group-focus-visible:translate-x-2 md:group-focus-visible:translate-x-3"
            }`}
          >
            {sport.name}
          </span>
        </div>
        <span
          aria-hidden="true"
          className={`font-body text-body-sm transition-[transform,color] duration-300 motion-reduce:transition-none md:hidden ${
            isActive ? "translate-x-1 text-c7-red" : "text-c7-ink-dim group-hover:translate-x-1 group-hover:text-c7-red"
          }`}
        >
          ↗
        </span>
      </div>

      {/* descriptor — its own line on mobile, centered column on desktop */}
      <p className="mt-1.5 font-body text-body-sm tracking-[0.04em] uppercase text-c7-ink-dim md:mt-0">
        {sport.descriptor}
      </p>

      {/* arrow — desktop only, far right */}
      <span
        aria-hidden="true"
        className={`hidden font-body text-body-sm transition-[transform,color] duration-300 motion-reduce:transition-none md:inline-block ${
          isActive ? "translate-x-1 text-c7-red" : "text-c7-ink-dim group-hover:translate-x-1 group-hover:text-c7-red group-focus-visible:translate-x-1 group-focus-visible:text-c7-red"
        }`}
      >
        ↗
      </span>

      {/* Desktop preview — small photographic insert, absolutely
          positioned so it never dictates row height. Hidden by
          default; hover/focus/active reveal it via clip-path + a
          short translate, never a giant image. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-[clamp(1rem,4vw,3rem)] top-1/2 hidden h-[170px] w-[260px] -translate-y-1/2 overflow-hidden bg-c7-bg-3 opacity-0 transition-[opacity,clip-path,transform] duration-[350ms] ease-out motion-reduce:transition-none md:block ${
          isActive
            ? "translate-x-0 opacity-100 [clip-path:inset(0)]"
            : "translate-x-2 [clip-path:inset(0_0_0_100%)] group-hover:translate-x-0 group-hover:opacity-100 group-hover:[clip-path:inset(0)] group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0)]"
        }`}
      >
        <Image
          src={sport.image.src}
          alt=""
          fill
          sizes="260px"
          quality={90}
          className="object-cover"
          style={{ objectPosition: sport.image.position, filter: gradeFor(sport.image.stock) }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
        />
      </div>

      {/* Mobile preview — expands in normal flow beneath the active
          row. No hover on touch, so this is purely `isActive`-driven. */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-[350ms] ease-out motion-reduce:transition-none md:hidden ${
          revealed ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="relative h-[160px] w-full max-w-[280px] bg-c7-bg-3">
            <Image
              src={sport.image.src}
              alt={sport.image.alt}
              fill
              sizes="280px"
              quality={90}
              className="object-cover"
              style={{ objectPosition: sport.image.position, filter: gradeFor(sport.image.stock) }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function PlaySection1() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ref: introRef, visible: introVisible } = useRevealOnView<HTMLDivElement>();

  const initialSport = PLAY_SPORTS.find((s) => s.id === searchParams.get("sport"))?.id ?? null;
  const [activeSport, setActiveSport] = useState<PlaySportId | null>(initialSport);

  function handleActivate(id: PlaySportId) {
    const next = activeSport === id ? null : id;
    setActiveSport(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set("sport", next);
    } else {
      params.delete("sport");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <section className="relative bg-c7-bg-1 px-edge pb-20 pt-24 md:pb-28 md:pt-28">
      <div ref={introRef} className="max-w-3xl">
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: introVisible ? 1 : 0 }}
        >
          01 / Play
        </p>
        <h1
          className="-ml-1 mt-3 font-display uppercase leading-[0.9] text-c7-ink text-[clamp(4.5rem,8vw,8.5rem)] transition-[opacity,transform] duration-700"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Pick
          <br />
          Your Game.
        </h1>
        <p
          className="mt-5 font-body text-body-lg text-c7-ink/85 transition-opacity duration-700"
          style={{ opacity: introVisible ? 1 : 0, transitionDelay: introVisible ? "150ms" : "0ms" }}
        >
          Football, box cricket or pickleball. Same club. Different kind of night.
        </p>
      </div>

      <div className="mt-12 md:mt-16">
        {PLAY_SPORTS.map((sport) => (
          <SportRow
            key={sport.id}
            sport={sport}
            isActive={activeSport === sport.id}
            onActivate={() => handleActivate(sport.id)}
          />
        ))}
      </div>

      <p className="mt-10 text-right font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/50">
        03 Games / Club 7
      </p>
    </section>
  );
}
