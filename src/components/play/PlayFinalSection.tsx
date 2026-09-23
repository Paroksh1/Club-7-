"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * The visitor has already seen the sport, its details and the booking
 * builder above — another full-height headline and aerial photo here
 * added a fifth big moment without adding anything new. A compact
 * closing link back to the booking flow (or coaching, if that's what
 * they came for) does the actual job.
 */
export default function PlayFinalSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-20 pt-4 md:pb-24">
      <div
        className="flex flex-col items-start gap-3 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:flex-row md:items-center md:justify-between"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="font-body text-body text-c7-ink-dim">Still deciding? Ask Club 7 directly.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#book-enquiry"
            className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Back to booking
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-[2px]">
              ↑
            </span>
          </a>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.booking)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-body-sm uppercase tracking-[0.06em] text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Ask Club 7 →
          </a>
        </div>
      </div>
    </section>
  );
}
