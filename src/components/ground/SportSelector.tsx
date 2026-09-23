"use client";

import { SPORTS, type SportId } from "@/lib/ground-data";

type SportSelectorProps = {
  active: SportId;
  onSelect: (id: SportId) => void;
};

/**
 * Not a tab component — a rail of stadium-signage-style labels along
 * the field's left edge on desktop, and a full-width touch-sized bar
 * beneath the field on mobile (per brief: "do not build tiny
 * controls" for touch).
 */
export function SportSelectorRail({ active, onSelect }: SportSelectorProps) {
  return (
    <div className="hidden md:flex md:shrink-0 md:w-28 lg:w-32 flex-col justify-center gap-6 lg:gap-7">
      {SPORTS.map((sport) => {
        const isActive = sport.id === active;
        return (
          <button
            key={sport.id}
            type="button"
            onClick={() => onSelect(sport.id)}
            aria-pressed={isActive}
            className="group text-left transition-transform duration-200 ease-out hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            <span className="flex items-center gap-2.5">
              <span
                className="h-px bg-c7-red transition-[width] duration-300"
                style={{ width: isActive ? 16 : 0 }}
                aria-hidden="true"
              />
              <span
                className={`block font-body text-body-sm tracking-[0.1em] transition-colors ${
                  isActive ? "text-c7-red" : "text-c7-ink-dim"
                }`}
              >
                {sport.number}
              </span>
            </span>
            <span
              className={`mt-1.5 block font-display uppercase leading-none transition-colors text-[clamp(1.5rem,1.3vw+1rem,2.125rem)] ${
                isActive ? "text-c7-red" : "text-c7-ink/70 group-hover:text-c7-ink"
              }`}
            >
              {sport.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SportSelectorBar({ active, onSelect }: SportSelectorProps) {
  return (
    <div className="md:hidden flex border-y border-c7-line/20">
      {SPORTS.map((sport) => {
        const isActive = sport.id === active;
        return (
          <button
            key={sport.id}
            type="button"
            onClick={() => onSelect(sport.id)}
            aria-pressed={isActive}
            className={`flex-1 min-h-12 py-3 border-t-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-c7-red ${
              isActive
                ? "border-c7-red text-c7-red"
                : "border-transparent text-c7-ink-dim"
            }`}
          >
            {sport.label}
          </button>
        );
      })}
    </div>
  );
}
