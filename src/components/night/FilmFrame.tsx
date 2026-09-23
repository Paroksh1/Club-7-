import Image from "next/image";
import type { CSSProperties } from "react";
import type { NightMoment } from "@/lib/night-data";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * Real Club 7 photos are already night-toned and need less help than
 * the stock frames (daylight/sunset source). Layered on top of that,
 * every frame also carries an intentional colour temperature: sports
 * beats stay cool/green-toned (deep shadows, floodlights preserved);
 * the cafe beat runs warm/amber to mark the shift from playing to
 * hanging out; "Still Here" returns to the cool register to close the
 * loop. One consistent cinematic grade, not five different treatments.
 */
function gradeFor(stock: boolean | undefined, tone: "cool" | "warm"): string {
  if (tone === "warm") {
    return stock
      ? "saturate(0.9) contrast(1.06) brightness(0.85) sepia(0.22) hue-rotate(-8deg)"
      : "saturate(0.95) contrast(1.04) brightness(0.92) sepia(0.14) hue-rotate(-6deg)";
  }
  return stock
    ? "saturate(0.82) contrast(1.1) brightness(0.82) hue-rotate(6deg)"
    : "saturate(0.94) contrast(1.05) brightness(0.94) hue-rotate(4deg)";
}

function PhotoVisual({
  image,
  tone,
  className = "",
}: {
  image: NonNullable<NightMoment["image"]>;
  tone: "cool" | "warm";
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-c7-bg-3 ${className}`}>
      <Image
        src={image.src}
        alt=""
        fill
        sizes="320px"
        quality={90}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        style={
          {
            objectPosition: image.position,
            transform: `scale(${image.zoom})`,
            filter: gradeFor(image.stock, tone),
          } as CSSProperties
        }
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/60 via-transparent to-transparent" />
      {/* Restrained hover response — a faint overlay lift rather than
          touching the graded filter directly (which is already an
          inline style, so a class-based hover couldn't win against it
          anyway). No overlay panel, no text reveal. */}
      <div className="pointer-events-none absolute inset-0 bg-white opacity-0 mix-blend-overlay transition-opacity duration-500 ease-out group-hover:opacity-[0.06]" />
    </div>
  );
}

type FilmFrameProps = {
  moment: NightMoment;
  visible: boolean;
  delay: number;
  orientation: "row" | "col";
};

/**
 * One frame of the evening's filmstrip. `orientation` swaps the
 * connector between a horizontal segment (desktop row — segments from
 * adjacent frames join into one continuous line) and a vertical one
 * (mobile stack, same idea rotated 90°).
 */
export default function FilmFrame({ moment, visible, delay, orientation }: FilmFrameProps) {
  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate(0, 0)"
      : orientation === "row"
        ? "translateY(16px)"
        : "translateX(-10px)",
    transitionDelay: visible ? `${delay}ms` : "0ms",
  };

  const tone = moment.tone ?? "cool";

  // Sizing variation — the visual arc: small (Arrive) → medium (Warm
  // Up) → largest (Last Goal) → medium (Cafe) → small (Still Here),
  // so the strip rises toward the middle and falls again instead of
  // reading as five equal tiles. Applied on both row (desktop) and
  // col (mobile) — the brief is explicit that Last Goal stays the
  // biggest visual on mobile too, not just desktop.
  const ROW_ASPECT: Record<string, string> = {
    narrow: "aspect-[3/4]",
    tall: "aspect-[3/5]",
    wide: "aspect-[4/5]",
    default: "aspect-[3/4]",
  };
  const ROW_WIDTH: Record<string, string> = {
    narrow: "md:w-[14%]",
    tall: "md:w-[17%]",
    wide: "md:w-[26%]",
    default: "md:w-[17%]",
  };
  const COL_WIDTH: Record<string, string> = {
    narrow: "w-24 sm:w-28",
    tall: "w-28 sm:w-32",
    wide: "w-36 sm:w-44",
    default: "w-28 sm:w-32",
  };
  const sizeKey = moment.size ?? "default";

  const visual = (
    <PhotoVisual
      image={moment.image!}
      tone={tone}
      className={orientation === "row" ? `${ROW_ASPECT[sizeKey]} w-full` : `aspect-[3/4] ${COL_WIDTH[sizeKey]}`}
    />
  );

  const rowShiftClass =
    orientation === "row" ? (moment.shift === "down" ? "md:mt-6" : moment.shift === "up" ? "md:-mt-6" : "") : "";

  const caption = (
    <>
      <p className="font-display text-base uppercase leading-none text-c7-ink transition-colors duration-300 group-hover:text-c7-red md:text-lg">
        {moment.label}
      </p>
      {moment.micro && (
        <p className="mt-1 font-body text-[0.625rem] tracking-[0.16em] uppercase text-c7-ink-dim/70">
          {moment.micro}
        </p>
      )}
    </>
  );

  if (orientation === "row") {
    return (
      <div
        className={`group flex w-[42vw] shrink-0 flex-col items-center text-center transition-[opacity,transform] duration-500 ease-out sm:w-40 ${ROW_WIDTH[sizeKey]} ${rowShiftClass}`}
        style={style}
      >
        <p className="font-body text-[0.6875rem] tracking-[0.2em] uppercase text-c7-ink-dim tabular-nums">
          {moment.time}
        </p>
        {/* One continuous editorial thread, not five separate
            dashboard progress bars: each segment overhangs its own
            frame by roughly half the row's gap, so adjacent segments
            meet in the gap and read as one unbroken line under the
            dots. Very thin, low-contrast — supports the photos rather
            than competing with them. */}
        <div className="relative my-2.5 h-3 w-full" aria-hidden="true">
          <span className="absolute -left-2 -right-2 top-1/2 h-px -translate-y-1/2 bg-c7-line/18 lg:-left-3 lg:-right-3" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-c7-red" />
        </div>
        {visual}
        <div className="mt-2.5">{caption}</div>
      </div>
    );
  }

  return (
    <div className={`group flex items-start gap-4 transition-[opacity,transform] duration-500 ease-out`} style={style}>
      <div className="relative flex w-6 shrink-0 justify-center self-stretch" aria-hidden="true">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-c7-line/18" />
        <span className="relative mt-1 h-1.5 w-1.5 rounded-full bg-c7-red" />
      </div>
      <div className="flex-1 pb-9">
        <p className="font-body text-[0.6875rem] tracking-[0.2em] uppercase text-c7-ink-dim tabular-nums">
          {moment.time}
        </p>
        <div className="mt-2">{visual}</div>
        <div className="mt-2">{caption}</div>
      </div>
    </div>
  );
}
