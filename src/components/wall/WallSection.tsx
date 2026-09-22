"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import AcademySheet from "./AcademySheet";
import BirthdayStrip from "./BirthdayStrip";
import LeaguePoster from "./LeaguePoster";
import CorporateMemo from "./CorporateMemo";

/**
 * One paper being placed at a time — reuses the same "poster being
 * pasted up" motion vocabulary from Section 01 (c7-anim-poster-paste),
 * staggered per artefact. Rotation is a separate, static inner
 * transform so it doesn't get overwritten by the entrance keyframe's
 * own rotate(0) end state.
 */
function WallItem({
  visible,
  delay,
  rotate,
  className = "",
  style,
  children,
}: {
  visible: boolean;
  delay: number;
  rotate: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={`${className} ${visible ? "c7-anim-poster-paste" : "opacity-0"}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined, ...style }}
    >
      <div style={{ transform: `rotate(${rotate}deg)` }}>{children}</div>
    </div>
  );
}

export default function WallSection() {
  const { ref: introRef, visible: introVisible } = useRevealOnView<HTMLDivElement>();
  const { ref: wallRef, visible: wallVisible } = useRevealOnView<HTMLDivElement>(0.1);

  return (
    <section id="off-the-pitch" className="relative bg-c7-paper">
      {/* Transition — the field boundary line stretches across, then
          the ground itself changes from turf to paper. Short, not a
          hard cut. */}
      <div
        className="relative h-16 md:h-20"
        style={{
          background:
            "linear-gradient(180deg, var(--color-c7-bg-3) 0%, var(--color-c7-paper) 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className={`absolute top-5 md:top-7 inset-x-0 h-px bg-c7-line/50 origin-center transition-transform duration-700 ease-out ${
            introVisible ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>

      {/* Section intro */}
      <div ref={introRef} className="px-edge pt-5 pb-6 md:pt-6 md:pb-5">
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: introVisible ? 1 : 0 }}
        >
          03 / Off the Pitch
        </p>
        <h2
          className="mt-3 -ml-1 font-display text-display-2 uppercase leading-[0.92] text-c7-charcoal transition-[opacity,transform] duration-700"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          There&apos;s More
          <br />
          Happening Here.
        </h2>
        <p
          className="mt-4 font-body text-tag tracking-[0.3em] uppercase text-c7-charcoal-dim transition-opacity duration-700"
          style={{ opacity: introVisible ? 1 : 0, transitionDelay: introVisible ? "200ms" : "0ms" }}
        >
          Play / Train / Celebrate / Compete
        </p>
      </div>

      {/* Shared visibility trigger — must wrap both variants, since
          only one is ever rendered (display:block) per breakpoint and
          a hidden element never intersects the viewport. */}
      <div ref={wallRef}>
      {/* ---------- THE WALL — desktop: one composed canvas ---------- */}
      <div
        className="hidden md:block relative mx-edge mb-16 md:mb-24"
        style={{ height: "clamp(520px, 64vh, 700px)" }}
      >
        {/* League — dominant, centred; everything else clusters around
            its edges rather than spreading across the box. */}
        <WallItem
          visible={wallVisible}
          delay={100}
          rotate={-1}
          className="absolute z-10"
          style={{ left: "37%", top: "0%", width: "27%" }}
        >
          <LeaguePoster />
        </WallItem>

        <WallItem
          visible={wallVisible}
          delay={230}
          rotate={-2.5}
          className="absolute z-20"
          style={{ left: "12%", top: "4%", width: "24%" }}
        >
          <AcademySheet />
        </WallItem>

        <WallItem
          visible={wallVisible}
          delay={480}
          rotate={-1.5}
          className="absolute z-20"
          style={{ left: "62%", top: "20%", width: "24%" }}
        >
          <CorporateMemo />
        </WallItem>

        <WallItem
          visible={wallVisible}
          delay={360}
          rotate={2.5}
          className="absolute z-30"
          style={{ left: "27%", top: "58%", width: "19%" }}
        >
          <BirthdayStrip />
        </WallItem>
      </div>

      {/* ---------- THE WALL — mobile: overlapping vertical stack ---------- */}
      <div className="md:hidden px-edge pb-16 space-y-0">
        <WallItem visible={wallVisible} delay={100} rotate={-1} className="relative z-10 max-w-sm mx-auto">
          <LeaguePoster />
        </WallItem>
        <WallItem
          visible={wallVisible}
          delay={220}
          rotate={-2}
          className="relative z-20 -mt-8 ml-[6%] max-w-[15rem]"
        >
          <AcademySheet />
        </WallItem>
        <WallItem
          visible={wallVisible}
          delay={340}
          rotate={2}
          className="relative z-30 -mt-10 mr-[4%] ml-auto max-w-[13rem]"
        >
          <BirthdayStrip />
        </WallItem>
        <WallItem
          visible={wallVisible}
          delay={460}
          rotate={-1.5}
          className="relative z-20 -mt-8 ml-[8%] max-w-[15rem]"
        >
          <CorporateMemo />
        </WallItem>
      </div>
      </div>

      <div className="px-edge pb-8 flex justify-end border-t border-c7-charcoal/10">
        <p className="pt-5 font-body text-tag tracking-[0.24em] uppercase text-c7-charcoal-dim">
          After the Game
          <span className="ml-1.5 inline-block c7-anim-cue-bounce" aria-hidden="true">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}
