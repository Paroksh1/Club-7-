"use client";

import type { SportConfig } from "@/lib/ground-data";

type FieldAnnotationsProps = {
  sport: SportConfig;
};

/**
 * One subtle information block — a single rule along the left edge
 * (not a leader-line-per-item HUD with arbitrary varying widths) so
 * this reads as supporting proof points attached to the field, not
 * floating decoration.
 */
export function FieldAnnotationsRail({ sport }: FieldAnnotationsProps) {
  return (
    <div className="hidden md:flex md:shrink-0 md:w-40 lg:w-44 flex-col justify-center border-l border-c7-line/15 pl-5 lg:pl-6">
      <ul key={sport.id} className="flex flex-col gap-3.5">
        {sport.annotations.map((label, i) => (
          <li
            key={label}
            className="c7-anim-reveal flex items-baseline gap-2"
            style={{ animationDelay: `${200 + i * 110}ms` }}
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-c7-red/70" aria-hidden="true" />
            <span className="font-body text-body-sm tracking-[0.04em] text-c7-ink/80">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FieldAnnotationsList({ sport }: FieldAnnotationsProps) {
  return (
    <ul
      key={sport.id}
      className="mx-auto flex w-full max-w-[1600px] flex-wrap gap-x-5 gap-y-2.5 px-edge py-5"
    >
      {sport.annotations.map((label) => (
        <li
          key={label}
          className="flex items-center gap-2 font-body text-body-sm tracking-[0.04em] text-c7-ink/80"
        >
          <span className="h-1 w-1 shrink-0 rounded-full bg-c7-red/70" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}
