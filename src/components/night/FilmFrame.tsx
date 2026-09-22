import Image from "next/image";
import type { CSSProperties } from "react";
import type { NightMoment } from "@/lib/night-data";
import { FILM_GRAIN_URL } from "@/lib/grain";

function CafeVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center border border-c7-red/25 bg-c7-bg-3 px-3 text-center ${className}`}
    >
      <p className="font-display text-xl sm:text-2xl leading-[0.92] uppercase text-c7-ink">
        Not
        <br />
        Going Home
        <br />
        <span className="text-c7-red">Yet.</span>
      </p>
      <p className="mt-2.5 font-body text-[0.5625rem] tracking-[0.2em] uppercase text-c7-ink-dim">
        Cafe / Club 7
      </p>
    </div>
  );
}

function PhotoVisual({
  image,
  className = "",
}: {
  image: NonNullable<NightMoment["image"]>;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-c7-bg-3 ${className}`}>
      <Image
        src={image.src}
        alt=""
        fill
        sizes="240px"
        className="object-cover"
        style={
          {
            objectPosition: image.position,
            transform: `scale(${image.zoom})`,
          } as CSSProperties
        }
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/45 to-transparent" />
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

  const visual = moment.cafe ? (
    <CafeVisual className={orientation === "row" ? "aspect-[3/4] w-full" : "aspect-[3/4] w-28 sm:w-32"} />
  ) : (
    <PhotoVisual
      image={moment.image!}
      className={orientation === "row" ? "aspect-[3/4] w-full" : "aspect-[3/4] w-28 sm:w-32"}
    />
  );

  if (orientation === "row") {
    return (
      <div
        className="flex w-[42vw] shrink-0 flex-col items-center text-center transition-[opacity,transform] duration-500 ease-out sm:w-40 md:w-auto md:flex-1"
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
