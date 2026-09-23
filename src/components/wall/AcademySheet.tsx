import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import PaperGrain from "./PaperGrain";

const FIELDS = ["Trial", "Batch", "Coach", "Session"];

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
        className="relative overflow-hidden bg-c7-paper shadow-[0_10px_24px_-12px_color-mix(in_srgb,var(--color-c7-charcoal)_35%,transparent)] ring-1 ring-inset ring-c7-charcoal/[0.06] px-5 py-5 sm:px-6 sm:py-6 transition-[transform,box-shadow] duration-300 ease-out group-hover/academy:-translate-y-1 group-hover/academy:shadow-[0_20px_34px_-16px_color-mix(in_srgb,var(--color-c7-charcoal)_45%,transparent)]"
      >
        <PaperGrain />

        {/* Corner fold */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-6 w-6 bg-c7-paper-deep/60 transition-all duration-300 group-hover/academy:h-8 group-hover/academy:w-8"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          aria-hidden="true"
        />

        <p className="font-display text-lg leading-none uppercase tracking-tight text-c7-charcoal">
          Club<span className="text-c7-red">7</span>
        </p>
        <p className="relative mt-1 inline-block font-body text-tag tracking-[0.2em] uppercase text-c7-charcoal-dim">
          Cricket Academy
          <span
            className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-c7-red transition-transform duration-300 ease-out group-hover/academy:scale-x-100"
            aria-hidden="true"
          />
        </p>

        <p className="mt-4 font-display text-display-3 leading-[0.92] uppercase text-c7-charcoal">
          Train
          <br />
          <span className="text-c7-red">Here.</span>
        </p>

        <p className="mt-3 font-body text-body-sm text-c7-charcoal-dim max-w-[22ch]">
          Coaching for different age groups.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
          {FIELDS.map((field) => (
            <div key={field} className="flex items-baseline gap-1.5">
              <span className="font-body text-[0.625rem] tracking-[0.14em] uppercase text-c7-charcoal-dim/55 shrink-0">
                {field}
              </span>
              <span className="flex-1 border-b border-dashed border-c7-charcoal-dim/25 h-px" />
            </div>
          ))}
        </div>

        <a
          href={whatsappHref(WHATSAPP_MESSAGES.academy)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block w-full border-t border-dashed border-c7-charcoal-dim/50 pt-3 text-left font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-red transition-colors group-hover/academy:text-c7-red-dim"
        >
          Book a Trial <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
