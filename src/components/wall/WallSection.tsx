"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

/**
 * Was a four-artefact noticeboard (tournament, academy, corporate
 * outings, birthdays) that reproduced Events' own headlines ("Take It
 * to the Turf", "Your Birthday. Your Rules.") a second time and gave
 * this section too many competing jobs. Its only real job on Home is
 * routing — introduce the possibility, let Events explain and convert
 * it. Academy content moved to a small factual module on Play.
 */
const IMAGE = {
  src: "/stock/warmup-turf.jpg",
  alt: "A group warming up together on a floodlit pitch at Club 7",
  position: "50% 60%",
};

export default function WallSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section id="off-the-pitch" className="relative bg-c7-bg-1">
      <div className="mx-auto w-full max-w-[1600px] px-edge py-14 md:py-20">
        <div
          ref={ref}
          className="border-l-2 border-c7-red pl-6 transition-[opacity,transform] duration-700 ease-out md:grid md:grid-cols-[1fr_360px] md:items-center md:gap-6 md:pl-8"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <div>
            <h2 className="-ml-1 font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3vw,3rem)]">
              Make It a Group Thing.
            </h2>
            <p className="mt-3 max-w-sm font-body text-body text-c7-ink-dim">
              Office outings, birthdays and plans that need a little more room.
            </p>
            <a
              href="/events"
              className="group mt-5 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Explore Group Events
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↗
              </span>
            </a>
          </div>

          <div className="relative mt-8 h-[200px] w-full overflow-hidden bg-c7-bg-3 md:mt-0 md:h-[220px] md:w-[360px]">
            <Image
              src={IMAGE.src}
              alt={IMAGE.alt}
              fill
              sizes="(min-width: 768px) 360px, 100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: IMAGE.position, filter: "saturate(0.85) contrast(1.06) brightness(0.92)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
