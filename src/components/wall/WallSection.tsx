"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import AcademySheet from "./AcademySheet";
import BirthdayStrip from "./BirthdayStrip";
import LeaguePoster from "./LeaguePoster";
import CorporateMemo from "./CorporateMemo";

/**
 * One paper being placed at a time — reuses the same "poster being
 * pasted up" motion vocabulary from Section 01 (c7-anim-poster-paste),
 * staggered per artefact. Rotation is a separate transform, combined
 * live with two more: a hover response (lifts ~5px, eases toward flat)
 * and a whole-canvas cursor drift (a few px, read from the CSS custom
 * properties the wall canvas writes on mousemove — same technique as
 * the hero's cursor spotlight, so this never causes a React re-render
 * on every mouse pixel). Both are intentionally tiny — tactile, not a
 * parallax effect.
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
  const [hovered, setHovered] = useState(false);
  const settledRotate = hovered ? rotate * 0.25 : rotate;
  const lift = hovered ? -5 : 0;

  return (
    <div
      className={`${className} ${visible ? "c7-anim-poster-paste" : "opacity-0"}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{
          transform: `translate(var(--wall-shift-x, 0px), calc(var(--wall-shift-y, 0px) + ${lift}px)) rotate(${settledRotate}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function WallSection() {
  const { ref: introRef, visible: introVisible } = useRevealOnView<HTMLDivElement>();
  const { ref: wallRef, visible: wallVisible } = useRevealOnView<HTMLDivElement>(0.1);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const el = canvasRef.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el!.style.setProperty("--wall-shift-x", `${x * 6}px`);
      el!.style.setProperty("--wall-shift-y", `${y * 6}px`);
    }
    function handleLeave() {
      el!.style.setProperty("--wall-shift-x", "0px");
      el!.style.setProperty("--wall-shift-y", "0px");
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

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

      {/* Section intro — enough top clearance that the heading is
          fully clear of the fixed header's footprint (~112–128px) the
          moment this section reaches the top of the viewport, instead
          of arriving already half-hidden behind it. It still scrolls
          under the header later, same as every other section — that
          part was never the bug. */}
      <div ref={introRef} className="mx-auto w-full max-w-[1600px] px-edge pt-12 pb-6 md:pt-16 md:pb-6">
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
      {/* ---------- THE WALL — desktop/tablet: one composed canvas ----------
          An asymmetric editorial spread, not a centred cluster: the
          collage leans into the middle-right two-thirds of the canvas,
          balancing the left-aligned heading above rather than sitting
          in a small huddle with the whole right side left empty.
          Leagues is sized and placed as the clear anchor; everything
          else supports it. Every position is a percentage of this
          canvas, so the whole composition — including how much the
          cards overlap — naturally scales down at tablet widths
          without a separate breakpoint variant. */}
      <div
        ref={canvasRef}
        className="hidden md:block relative mx-auto w-full max-w-[1600px] px-edge mb-16 md:mb-24"
        style={{ height: "clamp(560px, 68vh, 760px)" }}
      >
        {/* League — the dominant artefact, sized and placed to anchor
            the composition rather than share equal footing. */}
        <WallItem
          visible={wallVisible}
          delay={100}
          rotate={1}
          className="absolute z-10"
          style={{ left: "36%", top: "0%", width: "30%" }}
        >
          <LeaguePoster />
        </WallItem>

        <WallItem
          visible={wallVisible}
          delay={230}
          rotate={-2}
          className="absolute z-20"
          style={{ left: "10%", top: "6%", width: "25%" }}
        >
          <AcademySheet />
        </WallItem>

        <WallItem
          visible={wallVisible}
          delay={480}
          rotate={-1}
          className="absolute z-20"
          style={{ left: "63%", top: "24%", width: "25%" }}
        >
          <CorporateMemo />
        </WallItem>

        <WallItem
          visible={wallVisible}
          delay={360}
          rotate={2.5}
          className="absolute z-30"
          style={{ left: "34%", top: "54%", width: "20%" }}
        >
          <BirthdayStrip />
        </WallItem>
      </div>

      {/* ---------- THE WALL — mobile: overlapping vertical stack ---------- */}
      <div className="md:hidden px-edge pb-16 space-y-0">
        <WallItem visible={wallVisible} delay={100} rotate={1} className="relative z-10 max-w-sm mx-auto">
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
          rotate={2.5}
          className="relative z-30 -mt-10 mr-[4%] ml-auto max-w-[13rem]"
        >
          <BirthdayStrip />
        </WallItem>
        <WallItem
          visible={wallVisible}
          delay={460}
          rotate={-1}
          className="relative z-20 -mt-8 ml-[8%] max-w-[15rem]"
        >
          <CorporateMemo />
        </WallItem>
      </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-edge pb-8 flex justify-end border-t border-c7-charcoal/10">
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
