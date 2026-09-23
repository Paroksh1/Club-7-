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
      {/* Editorial header — one clear stack (label, then the question,
          then the sport's own line), not three elements competing on
          one baseline. Same bounded grid as the header/hero so this
          section's left edge lines up with the rest of the page. */}
      <div
        ref={headerRef}
        className="mx-auto w-full max-w-[1600px] px-edge pt-24 pb-8 md:pt-20 md:pb-10"
      >
        <p
          className="font-body text-tag tracking-[0.2em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          02 / The Ground
        </p>
        <h2
          className="mt-3 -ml-1 max-w-2xl font-display uppercase leading-[0.98] text-c7-ink transition-[opacity,transform] duration-700 text-[clamp(2.5rem,2.6vw+1.8rem,4.5rem)] [text-wrap:balance]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Tonight, What Are We Playing?
        </h2>

        <p
          key={sport.id}
          className="c7-anim-reveal mt-3 font-display uppercase leading-none tracking-[0.01em] text-c7-red text-[clamp(1.1rem,0.6vw+0.95rem,1.375rem)]"
        >
          {sport.headline}
        </p>
      </div>

      {/* Mobile selector — sits above the field, per the mobile flow */}
      <SportSelectorBar active={activeSport} onSelect={setActiveSport} />

      {/* One stage: selector, field and annotations as a single row on
          desktop, left-aligned to the same edge as the heading above
          it — rather than centred in the leftover width — so the two
          read as one deliberately composed block, not two unrelated
          rows sharing a section. */}
      <div className="mx-auto w-full max-w-[1600px] px-edge md:flex md:items-center md:gap-6 lg:gap-10 mt-1 md:mt-0">
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
        <div className="mx-auto w-full max-w-[1600px] px-edge pb-6">
          <GroundCta label={sport.cta} href={sportCtaHref} className="flex w-full justify-center" />
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        <AvailabilityStrip />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-edge py-6 md:py-4 flex justify-end border-t border-c7-line/10">
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
