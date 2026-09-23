import { entrance } from "@/lib/entrance";
import { WHATSAPP_HREF } from "@/lib/constants";
import HeroMedia from "./HeroMedia";
import LedTicker from "../site/LedTicker";

export default function Hero() {
  return (
    <section className="relative isolate min-h-dvh overflow-hidden">
      <HeroMedia />

      {/* A bounded content grid, shared with the header, so wide
          viewports read as composed rather than the text sitting
          flush against the left edge with dead space to the right.
          The text block sits inside flex-1: bottom-weighted on mobile
          (matches the safely-darkened lower zone of the photo, same
          as before) and centred on desktop, where the scroll cue's
          own height below eats into flex-1's share of the viewport —
          which is what pulls the composition slightly above true
          centre there, no magic-number offsets needed. */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col px-edge pb-16 pt-28 md:pb-20">
        <div className="flex flex-1 flex-col justify-end md:justify-center">
          <div className="max-w-xl md:max-w-2xl">
            {/* Environmental label — one flowing text run after the dot
                (not separate flex items) so it wraps naturally at
                word boundaries on narrow screens instead of breaking
                into two cramped columns. */}
            <p
              className={`c7-anim-reveal flex items-start gap-2.5 font-body text-tag tracking-[0.14em] sm:tracking-[0.18em] uppercase text-c7-ink-dim ${entrance(
                700
              )}`}
            >
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-c7-red c7-anim-pulse-dot" aria-hidden="true" />
              <span>
                Sector 89, Faridabad <span className="text-c7-ink-dim/50">/</span> Open 24 Hours
              </span>
            </p>

            {/* Headline — a slightly gentler ceiling than the shared
                display-1 token so it stays "large and confident"
                without ballooning into comic-huge on very wide
                monitors; still the same tight leading/tracking. */}
            <h1 className="mt-3 -ml-1 md:-ml-2">
              <span
                className={`c7-anim-headline block font-display text-[clamp(3.25rem,2.6vw+2.75rem,9rem)] uppercase leading-[0.92] tracking-[-0.01em] text-c7-ink ${entrance(
                  850
                )}`}
              >
                Play Late.
              </span>
              <span
                className={`c7-anim-headline block font-display text-[clamp(3.25rem,2.6vw+2.75rem,9rem)] uppercase leading-[0.92] tracking-[-0.01em] text-c7-red ${entrance(
                  1000
                )}`}
              >
                Stay Later.
              </span>
            </h1>

            {/* Supporting line + actions */}
            <div className={`c7-anim-reveal mt-7 ${entrance(1150)}`}>
              <p className="font-body text-body uppercase tracking-[0.04em] sm:tracking-[0.06em] text-c7-ink-dim md:text-body-lg">
                Cricket / Football / Pickleball / Cafe
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim"
                >
                  Book a Slot
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-c7-line/35 px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-line/60 hover:bg-c7-bg-3"
                >
                  WhatsApp Club 7
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue — pushed toward the photo on desktop: Section 02
            continues the journey from this aerial view into the ground. */}
        <div
          className={`c7-anim-reveal mt-10 self-start border-l border-c7-line/30 pl-3 md:mt-14 md:self-end md:border-l-0 md:border-r md:pl-0 md:pr-3 md:text-right ${entrance(
            1300
          )}`}
        >
          <a
            href="#the-ground"
            className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim hover:text-c7-ink transition-colors"
          >
            Enter the Ground
            <span className="ml-1.5 inline-block c7-anim-cue-bounce" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      <LedTicker className="absolute inset-x-0 bottom-0 z-20" />
    </section>
  );
}
