import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { NightMoment } from "@/lib/night-data";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * Real Club 7 photos are already night-toned and need no help. Stock
 * frames (daylight/sunset source) get a stronger grade so the whole
 * strip reads as one evening rather than three unrelated photoshoots.
 */
function gradeFor(stock: boolean | undefined): string {
  return stock
    ? "saturate(0.8) contrast(1.08) brightness(0.8) sepia(0.06)"
    : "saturate(0.95) contrast(1.03) brightness(0.97)";
}

function PhotoVisual({
  image,
  className = "",
  children,
}: {
  image: NonNullable<NightMoment["image"]>;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden bg-c7-bg-3 ${className}`}>
      <Image
        src={image.src}
        alt=""
        fill
        sizes="320px"
        quality={90}
        className="object-cover"
        style={
          {
            objectPosition: image.position,
            transform: `scale(${image.zoom})`,
            filter: gradeFor(image.stock),
          } as CSSProperties
        }
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/60 via-transparent to-transparent" />
      {children}
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

  const cafeCaption = moment.cafe ? (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5">
      <p className="font-display text-sm leading-[0.95] uppercase text-c7-ink">
        Not Going
        <br />
        Home <span className="text-c7-red">Yet.</span>
      </p>
      <p className="mt-1 font-body text-[0.5rem] tracking-[0.18em] uppercase text-c7-ink-dim">
        Cafe / Club 7
      </p>
    </div>
  ) : null;

  // Desktop-row sizing variation — an explicit width per frame instead
  // of uniform `flex-1`, plus a taller aspect for "Warm Up", so the
  // strip reads as a film contact sheet rather than five equal cards.
  const ROW_ASPECT: Record<string, string> = {
    narrow: "aspect-[3/4]",
    tall: "aspect-[3/5]",
    wide: "aspect-[4/5]",
    default: "aspect-[3/4]",
  };
  const ROW_WIDTH: Record<string, string> = {
    narrow: "md:w-[15%]",
    tall: "md:w-[16%]",
    wide: "md:w-[23%]",
    default: "md:w-[18%]",
  };
  const sizeKey = moment.size ?? "default";

  const visual = (
    <PhotoVisual
      image={moment.image!}
      className={
        orientation === "row" ? `${ROW_ASPECT[sizeKey]} w-full` : "aspect-[3/4] w-28 sm:w-32"
      }
    >
      {cafeCaption}
    </PhotoVisual>
  );

  const rowShiftClass =
    orientation === "row" ? (moment.shift === "down" ? "md:mt-6" : moment.shift === "up" ? "md:-mt-6" : "") : "";

  if (orientation === "row") {
    return (
      <div
        className={`flex w-[42vw] shrink-0 flex-col items-center text-center transition-[opacity,transform] duration-500 ease-out sm:w-40 ${ROW_WIDTH[sizeKey]} ${rowShiftClass}`}
        style={style}
      >
        <p className="font-body text-[0.6875rem] tracking-[0.2em] uppercase text-c7-ink-dim tabular-nums">
          {moment.time}
        </p>
        <div className="relative my-2.5 h-3 w-full" aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-c7-line/25" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-c7-red" />
        </div>
        {visual}
        <p className="mt-2.5 font-display text-base uppercase leading-none text-c7-ink md:text-lg">
          {moment.label}
        </p>
        {moment.micro && (
          <p className="mt-1 font-body text-[0.625rem] tracking-[0.16em] uppercase text-c7-ink-dim/70">
            {moment.micro}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 transition-[opacity,transform] duration-500 ease-out" style={style}>
      <div className="relative flex w-6 shrink-0 justify-center self-stretch" aria-hidden="true">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-c7-line/25" />
        <span className="relative mt-1 h-1.5 w-1.5 rounded-full bg-c7-red" />
      </div>
      <div className="flex-1 pb-9">
        <p className="font-body text-[0.6875rem] tracking-[0.2em] uppercase text-c7-ink-dim tabular-nums">
          {moment.time}
        </p>
        <div className="mt-2">{visual}</div>
        <p className="mt-2 font-display text-lg uppercase leading-none text-c7-ink">{moment.label}</p>
        {moment.micro && (
          <p className="mt-1 font-body text-[0.625rem] tracking-[0.16em] uppercase text-c7-ink-dim/70">
            {moment.micro}
          </p>
        )}
      </div>
    </div>
  );
}
