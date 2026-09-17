const FIELDS = ["Play", "Practice", "Repeat"];

/**
 * A coaching/selection sheet pinned to the wall — structured like a
 * real form with blank fields, not populated with invented values.
 * Staple graphic top-left; a "tear-off" registration line at the
 * bottom stands in for the CTA rather than a floating button.
 */
export default function AcademySheet({ className = "" }: { className?: string }) {
  return (
    <div className={`group/academy relative ${className}`}>
      {/* Staple */}
      <div
        className="absolute -top-1.5 left-6 z-10 h-3 w-5 rounded-[1px] bg-c7-charcoal-dim/70 rotate-[8deg]"
        aria-hidden="true"
      />
      <div
        className="relative bg-c7-paper shadow-[0_10px_24px_-12px_rgba(34,30,25,0.35)] px-5 py-5 sm:px-6 sm:py-6 transition-transform duration-300 ease-out group-hover/academy:-translate-y-1"
      >
        {/* Corner fold */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-6 w-6 bg-c7-paper-deep/60 transition-all duration-300 group-hover/academy:h-8 group-hover/academy:w-8"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          aria-hidden="true"
        />

        <p className="font-display text-lg leading-none uppercase tracking-tight text-c7-charcoal">
          Court<span className="text-c7-red">Play</span>
        </p>
        <p className="mt-1 font-body text-tag tracking-[0.2em] uppercase text-c7-charcoal-dim">
          Structured Play
        </p>

        <p className="mt-4 font-display text-display-3 leading-[0.92] uppercase text-c7-charcoal">
          Get
          <br />
          <span className="text-c7-red">Better.</span>
        </p>

        <p className="mt-3 font-body text-body-sm text-c7-charcoal-dim max-w-[24ch]">
          More rallies. Better games. More reasons to come back.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-2.5">
          {FIELDS.map((field) => (
            <div key={field} className="flex items-baseline gap-1.5">
              <span className="font-body text-[0.6875rem] tracking-[0.16em] uppercase text-c7-charcoal-dim shrink-0">
                {field}
              </span>
              <span className="flex-1 border-b border-dashed border-c7-charcoal-dim/40 h-px" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 w-full border-t border-dashed border-c7-charcoal-dim/50 pt-3 text-left font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-red hover:text-c7-red-dim transition-colors"
        >
          Explore Play <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
