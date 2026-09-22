import { entrance } from "@/lib/entrance";
import { WHATSAPP_HREF } from "@/lib/constants";
import HeroMedia from "./HeroMedia";
import LedTicker from "../site/LedTicker";

export default function Hero() {
  return (
    <section className="relative isolate min-h-dvh overflow-hidden">
      <HeroMedia />

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-edge pb-16 pt-28 md:pb-20">
        <div className="max-w-xl md:max-w-2xl">
          {/* Environmental label */}
          <p
            className={`c7-anim-reveal flex items-center gap-2.5 font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim ${entrance(
              700
            )}`}
          >
            <span className="h-1.5 w-1.5 bg-c7-red c7-anim-pulse-dot" aria-hidden="true" />
            Sector 89, Faridabad
            <span className="text-c7-ink-dim/50">/</span>
            Open 24 Hours
          </p>

          {/* Headline */}
          <h1 className="mt-4 -ml-1 md:-ml-2">
            <span
              className={`c7-anim-headline block font-display text-display-1 uppercase leading-[0.92] text-c7-ink ${entrance(
                850
              )}`}
            >
              Play Late.
            </span>
            <span
              className={`c7-anim-headline block font-display text-display-1 uppercase leading-[0.92] text-c7-red ${entrance(
                1000
              )}`}
            >
              Stay Later.
            </span>
          </h1>

          {/* Supporting line + actions */}
          <div className={`c7-anim-reveal mt-8 ${entrance(1150)}`}>
            <p className="font-body text-body-lg text-c7-ink/85">
              Cricket · Football · Pickleball · Cafe
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink hover:bg-c7-red-dim transition-colors"
              >
                Book a Slot <span aria-hidden="true">→</span>
              </button>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-c7-line/40 px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink hover:bg-c7-bg-3 transition-colors"
              >
                WhatsApp Club 7
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue — pushed toward the photo on desktop: Section 02
            continues the journey from this aerial view into the ground. */}
        <div
          className={`c7-anim-reveal mt-10 self-start border-l-2 border-c7-line/30 pl-3 md:mt-14 md:self-end md:border-l-0 md:border-r-2 md:pl-0 md:pr-3 md:text-right ${entrance(
            1300
          )}`}
        >
          <a
            href="#the-ground"
            className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim hover:text-c7-ink transition-colors"
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
