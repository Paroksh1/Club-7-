"use client";

import { useState } from "react";
import { SPORTS, type SportId } from "@/lib/ground-data";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import FieldStage from "./FieldStage";
import { SportSelectorRail, SportSelectorBar } from "./SportSelector";
import { FieldAnnotationsRail, FieldAnnotationsList } from "./FieldAnnotations";
import GroundCta from "./GroundCta";
import AvailabilityStrip from "./AvailabilityStrip";

export default function GroundSection() {
  const [activeSport, setActiveSport] = useState<SportId>("cricket");
  const { ref: headerRef, visible } = useRevealOnView<HTMLDivElement>();
  const sport = SPORTS.find((s) => s.id === activeSport)!;
  const sportCtaHref = whatsappHref(WHATSAPP_MESSAGES[activeSport]);

  return (
    <section id="the-ground" className="relative bg-c7-bg-1 md:py-5">
      {/* Editorial header — compact, single line where width allows.
          Clears the fixed nav, then gets straight to the ground. */}
      <div
        ref={headerRef}
        className="px-edge pt-24 pb-4 md:pt-20 md:pb-4 md:flex md:items-baseline md:gap-5 lg:gap-8"
      >
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red shrink-0 transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          02 / The Ground
        </p>
        <h2
          className="mt-3 md:mt-0 -ml-1 font-display uppercase leading-[0.94] text-c7-ink transition-[opacity,transform] duration-700 text-display-2 md:text-[clamp(1.5rem,2.4vw,2.75rem)] md:leading-[1.05]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <span className="md:hidden">
            Tonight, What Are
            <br />
            We Playing?
          </span>
          <span className="hidden md:inline">Tonight, What Are We Playing?</span>
        </h2>

        {sport.headline && (
          <p
            key={sport.id}
            className="c7-anim-reveal mt-4 md:mt-0 font-display uppercase leading-[0.98] text-c7-red text-display-3 md:text-[clamp(1.25rem,1.8vw,2rem)] md:leading-none"
          >
            {sport.headline.map((line, i) => (
              <span key={line} className="block md:inline">
                {line}
                {i === 0 && <span className="hidden md:inline">&nbsp;</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Mobile selector — sits above the field, per the mobile flow */}
      <SportSelectorBar active={activeSport} onSelect={setActiveSport} />

      {/* One stage: selector, field and annotations as a single row on
          desktop so they read as one composition, not stacked blocks. */}
      <div className="px-edge md:flex md:items-center md:justify-center md:gap-4 lg:gap-6 mt-1 md:mt-0">
        <SportSelectorRail active={activeSport} onSelect={setActiveSport} />

        <FieldStage activeSport={activeSport}>
          <GroundCta
            label={sport.cta}
            href={sportCtaHref}
            className="hidden md:inline-flex absolute bottom-4 right-4 z-10"
          />
        </FieldStage>

        <FieldAnnotationsRail sport={sport} />
      </div>

      {/* Mobile annotations + CTA — plain text beneath the field */}
      <div className="md:hidden">
        <FieldAnnotationsList sport={sport} />
        <div className="px-edge pb-6">
          <GroundCta label={sport.cta} href={sportCtaHref} className="flex w-full justify-center" />
        </div>
      </div>

      <div className="mt-3 md:mt-4">
        <AvailabilityStrip />
      </div>

      <div className="px-edge py-6 md:py-4 flex justify-end border-t border-c7-line/10">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink">
          Off the Pitch
          <span className="ml-1.5 inline-block c7-anim-cue-bounce" aria-hidden="true">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}
