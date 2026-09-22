import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * Was a hard-coded hourly Open/— grid — read as a live booking feed
 * even though nothing behind it was real. Replaced with an honest
 * routing strip until an actual availability feed exists; swap the
 * content below for a real per-slot render at that point, not before.
 */
export default function AvailabilityStrip() {
  return (
    <div className="border-t-2 border-c7-red/70 bg-c7-bg-3 px-edge py-4 md:py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
          Tonight <span aria-hidden="true">→</span>
        </p>
        <a
          href={whatsappHref(WHATSAPP_MESSAGES.availability)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink hover:text-c7-red transition-colors"
        >
          Ask for Availability <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
