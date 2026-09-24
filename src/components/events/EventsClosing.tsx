"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";

/**
 * Understated on purpose — the visitor has already seen the whole
 * evening and filled in a plan above; this doesn't need to sell
 * anything again. Same compact metadata-bar treatment the homepage
 * uses to close its own last section, so the page hands off to the
 * rest of the site consistently rather than inventing a new footer.
 */
export default function EventsClosing() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section className="relative bg-c7-bg-1">
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge py-14 md:py-16">
        <div
          className="flex flex-col gap-10 border-t border-c7-line/15 pt-10 transition-[opacity,transform] duration-700 ease-out md:flex-row md:items-end md:justify-between"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <div>
            <h2 className="-ml-1 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.25rem,3.6vw,3.5rem)]">
              Bring the People.
            </h2>
            <p className="mt-2 font-body text-body text-c7-ink-dim">We&apos;ll take it from there.</p>
            <a
              href="#plan"
              className="group mt-5 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Plan Your Night
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↗
              </span>
            </a>
          </div>

          <div className="font-body text-body-sm uppercase tracking-[0.1em] text-c7-ink-dim md:text-right">
            <p>Team Days / Birthdays / Private Groups</p>
            <p className="mt-1 text-c7-ink-dim/60">Sector 89, Faridabad</p>
          </div>
        </div>
      </div>

      <div className="border-t border-c7-line/[0.07] px-edge py-3.5 md:py-2.5">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70">
            <span>Club 7</span>
            <span className="text-c7-ink-dim/30">/</span>
            <span>Sector 89 / Faridabad</span>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-fit font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70 transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
