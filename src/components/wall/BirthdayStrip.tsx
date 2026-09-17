import Image from "next/image";

/**
 * A taped-together memory strip, not a party graphic. Two crops of the
 * same representative night-social photograph — a wide shot and a
 * tight detail — standing in for "Rally After Dark" until real event
 * photography exists. No placeholder labels anywhere.
 */
export default function BirthdayStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`group/bday relative ${className}`}>
      {/* Tape */}
      <div
        className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-2 bg-c7-paper-2/80 shadow-sm"
        aria-hidden="true"
      />

      <div className="bg-c7-paper shadow-[0_10px_24px_-12px_rgba(34,30,25,0.35)] p-3 sm:p-4">
        <div className="flex gap-2">
          <div className="relative w-1/2 aspect-[3/4] overflow-hidden bg-c7-paper-deep transition-transform duration-300 ease-out group-hover/bday:-translate-y-1">
            <Image
              src="/pickleball/social-floodlit.jpg"
              alt="CourtPlay after dark — night social atmosphere courtside"
              fill
              sizes="200px"
              className="object-cover [filter:sepia(0.12)_saturate(0.9)]"
            />
          </div>
          <div className="relative w-1/2 aspect-[3/4] overflow-hidden bg-c7-paper-deep">
            <Image
              src="/pickleball/social-floodlit.jpg"
              alt="Detail of CourtPlay's after-dark social scene"
              fill
              sizes="200px"
              className="object-cover object-top scale-[1.8] [filter:sepia(0.12)_saturate(0.9)]"
            />
          </div>
        </div>

        <p className="mt-4 font-display text-display-4 leading-[0.95] uppercase text-c7-charcoal">
          Lights On.
          <br />
          <span className="text-c7-red">Game On.</span>
        </p>
        <p className="mt-2 font-body text-tag tracking-[0.2em] uppercase text-c7-charcoal-dim">
          Pickleball + Music + People
        </p>
        <p className="mt-2 -rotate-1 font-body text-body-sm italic text-c7-red/80">
          The court changes after dark.
        </p>

        <button
          type="button"
          className="mt-4 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-charcoal hover:text-c7-red transition-colors"
        >
          See What&apos;s On <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
