"use client";

import type { SportConfig } from "@/lib/ground-data";

type FieldAnnotationsProps = {
  sport: SportConfig;
};

/**
 * Information attached to the field itself — leader lines pointing out
 * from the edge to a label, like a broadcast graphic or architectural
 * drawing. Not a card, not a HUD: one thin line, one small label.
 */
export function FieldAnnotationsRail({ sport }: FieldAnnotationsProps) {
  return (
    <div
      key={sport.id}
      className="hidden md:flex md:shrink-0 md:w-40 lg:w-48 flex-col justify-center gap-3 lg:gap-4"
    >
      {sport.annotations.map((label, i) => (
        <div
          key={label}
          className="c7-anim-reveal flex items-center gap-2.5"
          style={{ animationDelay: `${200 + i * 110}ms` }}
        >
          <span
            className="h-1 w-1 rounded-full bg-c7-line/60 shrink-0"
            aria-hidden="true"
          />
          <span
            className="h-px bg-c7-line/45 shrink-0"
            style={{ width: i % 2 === 0 ? 28 : 18 }}
            aria-hidden="true"
          />
          <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FieldAnnotationsList({ sport }: FieldAnnotationsProps) {
  return (
    <ul key={sport.id} className="md:hidden flex flex-col gap-2 px-edge py-5">
      {sport.annotations.map((label) => (
        <li
          key={label}
          className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
