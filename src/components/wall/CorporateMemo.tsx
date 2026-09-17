/**
 * An office memo CourtPlay has visibly hijacked — the crossed-out
 * "Boardroom" is the whole joke, drawn on hover rather than present
 * by default so it reads as a discovered detail.
 */
export default function CorporateMemo({ className = "" }: { className?: string }) {
  return (
    <div className={`group/memo relative ${className}`}>
      {/* Paperclip */}
      <div
        className="absolute -top-2.5 left-5 z-10 h-7 w-4 rounded-full border-2 border-c7-charcoal-dim/50"
        style={{ borderBottomColor: "transparent", borderRightColor: "transparent" }}
        aria-hidden="true"
      />

      <div className="bg-c7-paper-2 shadow-[0_10px_24px_-12px_rgba(34,30,25,0.35)] px-5 py-5 sm:px-6 sm:py-6 transition-transform duration-300 ease-out group-hover/memo:-translate-y-1">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-charcoal-dim">
          Internal Memo
        </p>

        <div className="mt-3 space-y-1 font-body text-body-sm text-c7-charcoal">
          <p>
            <span className="text-c7-charcoal-dim">To:</span> The Whole Team
          </p>
          <p>
            <span className="text-c7-charcoal-dim">Subject:</span> A Better Offsite
          </p>
        </div>

        <p className="relative mt-4 inline-block font-body text-body font-medium uppercase text-c7-charcoal-dim">
          Boardroom
          <span
            className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 scale-x-0 bg-c7-red transition-transform duration-500 ease-out group-hover/memo:scale-x-100"
            aria-hidden="true"
          />
        </p>

        <p className="mt-2 font-display text-display-4 leading-[0.95] uppercase text-c7-charcoal">
          Court.
          <br />
          <span className="text-c7-red">In.</span>
        </p>

        <p className="mt-2 font-body text-tag tracking-[0.2em] uppercase text-c7-charcoal-dim">
          Pickleball + Competition + People
        </p>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            className="font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-charcoal hover:text-c7-red transition-colors"
          >
            Plan a Team Day <span aria-hidden="true">→</span>
          </button>

          {/* Approval stamp */}
          <span
            className="flex h-10 w-10 shrink-0 rotate-6 items-center justify-center rounded-full border border-c7-red/40 font-display text-[0.55rem] uppercase tracking-widest text-c7-red/70"
            aria-hidden="true"
          >
            CP
          </span>
        </div>
      </div>
    </div>
  );
}
