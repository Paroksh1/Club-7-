"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * No genuine café photography exists in the project's asset library.
 * The only candidate (/stock/cafe-porch.jpg) is a residential-porch
 * photo — string lights, a home kitchen visible through a sliding
 * door, a backyard grill — not Club 7's café, and was previously used
 * twice (main + a tighter crop) to fake two distinct photos from one
 * source. Both are explicitly wrong per this section's brief: don't
 * reuse a photo, and don't use residential-porch imagery.
 *
 * Rather than mislabel an unrelated photo as "Club 7's café," these
 * are honest, clearly-identified placeholders — toned frames with a
 * plain "photography pending" label, not a broken-image state and not
 * a disguised stock photo. They carry the exact same grid position,
 * aspect ratio and motion treatment a real photo would, so dropping in
 * real Club 7 café photography later is a one-line src swap, not a
 * layout change.
 *
 * MISSING ASSETS (report):
 * - Main: landscape, a candid group at the café after sport, warm
 *   practical lighting, ~1600-2000px source width.
 * - Detail: portrait, a table moment / hands / drinks / verified food,
 *   same warm register as the main shot.
 */
function PlaceholderFrame({ note, className = "" }: { note: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-c7-bg-3 via-c7-bg-2 to-c7-bg-3 ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
      />
      <div className="pointer-events-none absolute inset-0 border border-c7-line/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-amber/80">Photography Pending</p>
        <p className="max-w-[24ch] font-body text-body-sm text-c7-ink-dim/70">{note}</p>
      </div>
    </div>
  );
}

/** Small scroll-linked drift, desktop fine-pointer only, capped well
 * under 16px of travel and never applied to text. Sets a CSS custom
 * property on the static, overflow-hidden frame (never the frame's own
 * transform) — the same imperative, no-re-render pattern HeroMedia
 * already uses for its cursor spotlight — so descendants can read it
 * without the frame's own clipping boundary ever moving. */
function useScrollDrift(ref: RefObject<HTMLElement | null>, maxPx = 12) {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    function update() {
      raf = 0;
      const rect = el!.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const elMid = rect.top + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, (viewportMid - elMid) / (window.innerHeight / 2 + rect.height / 2)));
      el!.style.setProperty("--drift-y", `${(progress * maxPx).toFixed(1)}px`);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, maxPx]);
}

/** Composes three independent transform sources (entrance scale-settle,
 * scroll drift, hover scale) as CSS custom properties multiplied
 * together in one arbitrary Tailwind class, rather than three
 * competing `transform` declarations fighting over specificity. */
function PhotoLayer({
  note,
  visible,
  entranceScale,
  className = "",
}: {
  note: string;
  visible: boolean;
  entranceScale: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute transition-transform duration-[900ms] ease-out motion-reduce:transition-none [--hz:1] [transform:translateY(var(--drift-y,0px))_scale(calc(var(--reveal-scale,1)*var(--hz)))] md:group-hover:[--hz:1.025] ${className}`}
      style={{ "--reveal-scale": visible ? 1 : entranceScale } as CSSProperties}
    >
      <PlaceholderFrame note={note} className="h-full w-full" />
    </div>
  );
}

export default function CafeSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);
  const mainFrameRef = useRef<HTMLDivElement>(null);
  const detailFrameRef = useRef<HTMLDivElement>(null);
  useScrollDrift(mainFrameRef, 12);
  useScrollDrift(detailFrameRef, 8);

  return (
    <section id="the-cafe" className="relative bg-c7-bg-1">
      <div ref={ref} className="mx-auto w-full max-w-[1280px] px-edge py-10 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
          {/* Copy — columns 1-5 */}
          <div className="md:[grid-column:1/6] md:[grid-row:1]">
            <p
              className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-[opacity,transform] duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
            >
              The Café
            </p>
            <h2 className="-ml-1 mt-3 font-display uppercase text-c7-ink text-[clamp(2.75rem,3vw+2rem,5rem)] leading-[0.98]">
              <span
                className="block transition-[opacity,transform] duration-500 ease-out"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transitionDelay: visible ? "60ms" : "0ms" }}
              >
                One More
              </span>
              <span
                className="block transition-[opacity,transform] duration-500 ease-out"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transitionDelay: visible ? "150ms" : "0ms" }}
              >
                Conversation.
              </span>
            </h2>
            <p
              className="mt-4 max-w-[34ch] font-body text-[1.0625rem] leading-[1.55] text-c7-ink-dim md:text-[1.125rem]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 600ms ease-out, transform 600ms ease-out",
                transitionDelay: visible ? "230ms" : "0ms",
              }}
            >
              The game&apos;s done. Your catch-up doesn&apos;t have to be. Take a seat at the café before heading
              out.
            </p>
          </div>

          {/* Main photograph — columns 6-12, a fixed static frame; the
              image layer inside it does all the moving. */}
          <div
            ref={mainFrameRef}
            className="group relative aspect-[4/3] h-auto overflow-hidden bg-c7-bg-3 transition-opacity duration-700 ease-out md:aspect-[6/5] md:h-auto md:max-h-[600px] md:[grid-column:6/13] md:[grid-row:1/3]"
            style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "100ms" : "0ms" }}
          >
            <PhotoLayer
              note="Main café photo — candid group, warm practical lighting, landscape"
              visible={visible}
              entranceScale={1.04}
              className="-inset-4"
            />
          </div>

          {/* Detail photograph — inset within columns 2-5, below the copy.
              Genuinely portrait (3:4) and deliberately narrower than the
              full column span — "smaller" per the brief, not just a
              second landscape crop. Row spacing comes from the grid's
              own row-gap (no redundant margin stacking on top of it). */}
          <div
            ref={detailFrameRef}
            className="group relative ml-auto aspect-[3/4] w-[200px] max-w-full overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-[600ms] ease-out md:ml-0 md:[grid-column:2/6] md:[grid-row:2] md:w-[220px]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: visible ? "320ms" : "0ms",
            }}
          >
            <PhotoLayer note="Detail — hands, drinks or a table moment, portrait" visible={visible} entranceScale={1.04} className="-inset-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
