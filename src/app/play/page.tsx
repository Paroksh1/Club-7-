import { Suspense } from "react";
import type { Metadata } from "next";
import PlaySection1 from "@/components/play/PlaySection1";

export const metadata: Metadata = {
  title: "Play — Club 7 Arena",
  description: "Football, box cricket or pickleball. Pick one. We'll take it from there.",
};

export default function PlayPage() {
  return (
    <Suspense fallback={null}>
      <PlaySection1 />
    </Suspense>
  );
}
