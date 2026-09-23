import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * Was a hard-coded hourly Open/— grid — read as a live booking feed
 * even though nothing behind it was real. Replaced with an honest
 * routing strip until an actual availability feed exists; swap the
 * content below for a real per-slot render at that point, not before.
 */
export default function AvailabilityStrip() {
  return (
    <div className="border-t border-c7-line/15 bg-c7-bg-3/60">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-edge py-3.5 md:flex-row md:items-center md:justify-between">
        <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
          Tonight <span aria-hidden="true">→</span>
        </p>
        <a
          href={whatsappHref(WHATSAPP_MESSAGES.availability)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
        >
          Ask for Availability
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}
