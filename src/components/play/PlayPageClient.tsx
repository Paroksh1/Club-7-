"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import PlaySection1 from "./PlaySection1";
import PlaySection2 from "./PlaySection2";

/**
 * Sport selection is the one piece of state both sections need —
 * lifted here so Section 1's selector and Section 2's booking panel
 * always agree, and so `?sport=` on the URL can seed either section
 * without the visitor picking twice.
 */
export default function PlayPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = PLAY_SPORTS.find((s) => s.id === searchParams.get("sport"))?.id ?? PLAY_SPORTS[0].id;
  const [activeId, setActiveId] = useState<PlaySportId>(initial);

  function handleSelect(id: PlaySportId) {
    setActiveId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sport", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <PlaySection1 activeId={activeId} onSelect={handleSelect} />
      <PlaySection2 activeId={activeId} />
    </>
  );
}
