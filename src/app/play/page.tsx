import { Suspense } from "react";
import type { Metadata } from "next";
import PlayPageClient from "@/components/play/PlayPageClient";

export const metadata: Metadata = {
  title: "Play — Club 7 Arena",
  description: "Football, box cricket or pickleball. Pick one. We'll take it from there.",
};

export default function PlayPage() {
  return (
    <Suspense fallback={null}>
      <PlayPageClient />
    </Suspense>
  );
}
