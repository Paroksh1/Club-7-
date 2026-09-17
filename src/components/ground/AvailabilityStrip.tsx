import { TONIGHT_PROGRAMME } from "@/lib/ground-data";

/**
 * Editorial programming, not a booking widget — see ground-data.ts.
 * Deliberately one consistent text colour throughout (no open/closed
 * distinction) so nothing here reads as real-time availability.
 */
export default function AvailabilityStrip() {
  return (
    <div className="border-t-2 border-c7-red/70 bg-c7-bg-3 px-edge py-4 md:py-3">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim shrink-0 md:pr-6 md:border-r md:border-c7-line/15">
          Tonight at CourtPlay <span aria-hidden="true">→</span>
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:flex md:flex-1 md:flex-wrap">
          {TONIGHT_PROGRAMME.map((slot) => (
            <div
              key={slot.time}
              className="flex items-baseline gap-2 px-0 md:px-6 md:border-l md:border-c7-line/15 first:md:border-l-0"
            >
              <span className="font-body text-body-sm tracking-[0.06em] text-c7-ink whitespace-nowrap tabular-nums">
                {slot.time}
              </span>
              <span className="font-body text-body-sm uppercase tracking-[0.1em] text-c7-turf-light">
                {slot.program}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
