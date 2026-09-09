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
    <div className="hidden md:flex md:shrink-0 md:w-28 lg:w-36 flex-col justify-center gap-3 lg:gap-4">
      {SPORTS.map((sport) => {
        const isActive = sport.id === active;
        return (
          <button
            key={sport.id}
            type="button"
            onClick={() => onSelect(sport.id)}
            aria-pressed={isActive}
            className="group text-left"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-px bg-c7-red transition-[width] duration-300"
                style={{ width: isActive ? 14 : 0 }}
                aria-hidden="true"
              />
              <span
                className={`block font-body text-body-sm tracking-[0.08em] transition-colors ${
                  isActive ? "text-c7-red" : "text-c7-ink-dim"
                }`}
              >
                {sport.number}
              </span>
            </span>
            <span
              className={`block font-display text-display-4 uppercase leading-none transition-colors ${
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
            className={`flex-1 min-h-12 py-3 border-t-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] transition-colors ${
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
