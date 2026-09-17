"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SportId } from "@/lib/ground-data";

/**
 * A top-down pickleball court photograph, treated as the "field" the
 * whole section revolves around. Three things happen here:
 *
 * 1. Entrance: as this stage scrolls into view, the hero's aerial photo
 *    (still visible, continuing the same shot) fades/scales away to
 *    reveal the top-down court beneath it — "camera descending". GSAP
 *    ScrollTrigger scrubs this against the stage's own natural entry
 *    into the viewport; no pin, no added scroll height.
 * 2. Play ⇄ Compete: a graphic line-marking overlay swaps between a
 *    trace around the court boundary and a second painted-on line set
 *    for the "Compete" state. These are explicitly a UI overlay, not
 *    claimed as physically present in the photo.
 * 3. Social: the court photo itself cross-dissolves into a night
 *    social photo, with a small counter-rotation/scale on each layer
 *    standing in for a camera turn — no WebGL, just transform.
 *
 * Coordinates for the line overlays are percentages eyeballed against
 * the source photo (object-position: center, so crops stay symmetric)
 * — tuned visually, not computed.
 */
const PITCH = { left: 52.5, top: 48, width: 26, height: 9 };
const FIELD = { left: 9, top: 20, width: 76, height: 64 };

type FieldStageProps = {
  activeSport: SportId;
  children?: ReactNode;
};

export default function FieldStage({ activeSport, children }: FieldStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const aerialRef = useRef<HTMLDivElement>(null);
  const turfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const aerial = aerialRef.current;
    const turf = turfRef.current;
    if (!aerial || !turf) return;

    if (reducedMotion) {
      aerial.style.opacity = "0";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 95%",
          end: "top 55%",
          scrub: 0.35,
        },
      });
      tl.fromTo(
        aerial,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.22, ease: "none" },
        0
      ).fromTo(
        turf,
        { filter: "brightness(0.82)", scale: 1.05 },
        { filter: "brightness(1)", scale: 1, ease: "none" },
        0
      );
    }, stageRef);

    return () => ctx.revert();
  }, []);

  const isSocial = activeSport === "social";
  const isCompete = activeSport === "compete";

  return (
    <div
      ref={stageRef}
      className="relative w-full aspect-[16/9] overflow-hidden bg-c7-bg-1 md:w-auto md:max-w-full md:shrink-0 md:aspect-[16/9] md:h-[clamp(320px,56svh,560px)]"
    >
      {/* Court — the persistent surface for Play + Compete */}
      <div
        ref={turfRef}
        className="absolute inset-0 transition-[opacity,transform] duration-700 ease-out"
        style={{
          opacity: isSocial ? 0 : 1,
          transform: isSocial ? "scale(1.1) rotate(-1.2deg)" : "scale(1) rotate(0deg)",
        }}
      >
        <Image
          src="/pickleball/court-topdown.jpg"
          alt="Top-down view of a CourtPlay pickleball court"
          fill
          sizes="100vw"
          className="object-cover [filter:saturate(0.88)_contrast(1.05)_brightness(0.95)_hue-rotate(-6deg)]"
        />
      </div>

      {/* Social — cross-dissolves in with a counter-rotation */}
      <div
        className="absolute inset-0 transition-[opacity,transform] duration-700 ease-out"
        style={{
          opacity: isSocial ? 1 : 0,
          transform: isSocial ? "scale(1) rotate(0deg)" : "scale(1.1) rotate(1.2deg)",
        }}
      >
        <Image
          src="/pickleball/social-floodlit.jpg"
          alt="Night social atmosphere courtside at CourtPlay"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover [filter:contrast(1.03)_brightness(0.97)]"
        />
      </div>

      {/* Peripheral darken — keeps the ground in the same late-night
          register as the hero, regardless of which image is showing. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 100% at 50% 50%, transparent 55%, rgba(2,7,4,0.4) 100%)",
        }}
      />

      {/* Aerial — the tail end of the hero shot, fading away on entry */}
      <div ref={aerialRef} className="absolute inset-0">
        <Image
          src="/pickleball/hero-wide.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_44%]"
        />
      </div>

      {/* Play trace — thin line around the court boundary */}
      {!isSocial && (
        <div
          key={`play-${activeSport === "play"}`}
          className="pointer-events-none absolute inset-0"
          style={{ opacity: activeSport === "play" ? 1 : 0, transition: "opacity 400ms ease" }}
          aria-hidden="true"
        >
          <span
            className="c7-anim-grow-x absolute bg-c7-red"
            style={{
              left: `${PITCH.left}%`,
              top: `${PITCH.top}%`,
              width: `${PITCH.width}%`,
              height: 2,
              transformOrigin: "left",
              animationDelay: "0ms",
            }}
          />
          <span
            className="c7-anim-grow-y absolute bg-c7-red"
            style={{
              left: `${PITCH.left + PITCH.width}%`,
              top: `${PITCH.top}%`,
              width: 2,
              height: `${PITCH.height}%`,
              transformOrigin: "top",
              animationDelay: "150ms",
            }}
          />
          <span
            className="c7-anim-grow-x absolute bg-c7-red"
            style={{
              left: `${PITCH.left}%`,
              top: `${PITCH.top + PITCH.height}%`,
              width: `${PITCH.width}%`,
              height: 2,
              transformOrigin: "right",
              animationDelay: "300ms",
            }}
          />
          <span
            className="c7-anim-grow-y absolute bg-c7-red"
            style={{
              left: `${PITCH.left}%`,
              top: `${PITCH.top}%`,
              width: 2,
              height: `${PITCH.height}%`,
              transformOrigin: "bottom",
              animationDelay: "450ms",
            }}
          />
        </div>
      )}

      {/* Compete markings — explicit graphic overlay, not physically real */}
      {!isSocial && (
        <div
          key={`compete-${isCompete}`}
          className="pointer-events-none absolute inset-0"
          style={{ opacity: isCompete ? 1 : 0, transition: "opacity 400ms ease" }}
          aria-hidden="true"
        >
          <span
            className="c7-anim-grow-x absolute bg-c7-ink/45"
            style={{
              left: `${FIELD.left}%`,
              top: `${FIELD.top}%`,
              width: `${FIELD.width}%`,
              height: 2,
              transformOrigin: "left",
            }}
          />
          <span
            className="c7-anim-grow-x absolute bg-c7-ink/45"
            style={{
              left: `${FIELD.left}%`,
              top: `${FIELD.top + FIELD.height}%`,
              width: `${FIELD.width}%`,
              height: 2,
              transformOrigin: "right",
              animationDelay: "80ms",
            }}
          />
          <span
            className="c7-anim-grow-y absolute bg-c7-ink/45"
            style={{
              left: `${FIELD.left}%`,
              top: `${FIELD.top}%`,
              width: 2,
              height: `${FIELD.height}%`,
              transformOrigin: "top",
              animationDelay: "160ms",
            }}
          />
          <span
            className="c7-anim-grow-y absolute bg-c7-ink/45"
            style={{
              left: `${FIELD.left + FIELD.width}%`,
              top: `${FIELD.top}%`,
              width: 2,
              height: `${FIELD.height}%`,
              transformOrigin: "bottom",
              animationDelay: "240ms",
            }}
          />
          <span
            className="c7-anim-grow-y absolute bg-c7-ink/45"
            style={{
              left: `${FIELD.left + FIELD.width / 2}%`,
              top: `${FIELD.top}%`,
              width: 2,
              height: `${FIELD.height}%`,
              transformOrigin: "center",
              animationDelay: "320ms",
            }}
          />
          <span
            className="c7-anim-reveal absolute rounded-full border border-c7-ink/45"
            style={{
              left: `${FIELD.left + FIELD.width / 2 - 8}%`,
              top: `${FIELD.top + FIELD.height / 2 - 15}%`,
              width: "16%",
              height: "30%",
              animationDelay: "380ms",
            }}
          />
        </div>
      )}

      {/* Social bridge — a generic court outline flashes on as the
          court photo fades, then off as the social photo's lines
          resolve underneath it. The "lines reorganizing" handoff, not
          a plain cross-fade. */}
      {isSocial && (
        <div
          key={`social-bridge-${activeSport}`}
          className="c7-anim-line-flash pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <span
            className="absolute bg-c7-line/70"
            style={{ left: "30%", top: "22%", width: "40%", height: 2 }}
          />
          <span
            className="absolute bg-c7-line/70"
            style={{ left: "30%", top: "78%", width: "40%", height: 2 }}
          />
          <span
            className="absolute bg-c7-line/70"
            style={{ left: "30%", top: "22%", width: 2, height: "56%" }}
          />
          <span
            className="absolute bg-c7-line/70"
            style={{ left: "70%", top: "22%", width: 2, height: "56%" }}
          />
          <span
            className="absolute bg-c7-line/70"
            style={{ left: "50%", top: "22%", width: 2, height: "56%" }}
          />
        </div>
      )}

      {children}
    </div>
  );
}
