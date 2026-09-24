"use client";

import { useEffect, useRef, useState } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";

/**
 * Appears only once the visitor has scrolled past the booking section
 * (tracked via IntersectionObserver on #book-enquiry, not a scroll
 * position guess) and only on touch-width viewports — the desktop
 * layout never needs it. Mobile-only, so it can't ever cover the
 * desktop booking controls or summary.
 */
export default function MobileBookingBar({ activeId }: { activeId: PlaySportId }) {
  const [showBar, setShowBar] = useState(false);
  const hasScrolledPastRef = useRef(false);

  useEffect(() => {
    const bookingSection = document.getElementById("book-enquiry");
    if (!bookingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Once seen, only re-show the bar once the visitor has
          // scrolled back below it again — not while it's still on
          // its way into view for the first time.
          hasScrolledPastRef.current = entry.boundingClientRect.top < 0;
          setShowBar(false);
        } else {
          setShowBar(hasScrolledPastRef.current || entry.boundingClientRect.top < 0);
        }
      },
      { threshold: 0 }
    );
    observer.observe(bookingSection);
    return () => observer.disconnect();
  }, []);

  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-c7-line/15 bg-c7-bg-1/95 backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
        showBar ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-hidden={!showBar}
    >
      <a
        href="#book-enquiry"
        tabIndex={showBar ? 0 : -1}
        className="flex items-center justify-between gap-3 px-edge py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-c7-red"
      >
        <span className="font-body text-body-sm font-medium uppercase tracking-[0.04em] text-c7-ink">
          {sport.shortName}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-c7-red px-4 py-2 font-body text-body-sm font-medium uppercase tracking-[0.06em] text-c7-ink">
          Continue Booking
          <span aria-hidden="true">↑</span>
        </span>
      </a>
    </div>
  );
}
