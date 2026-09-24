import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventManifesto from "@/components/events/EventManifesto";
import NightSequence from "@/components/events/NightSequence";
import EventPosters from "@/components/events/EventPoster";
import PeopleMoment from "@/components/events/PeopleMoment";
import EventPlanner from "@/components/events/EventPlanner";
import EventsClosing from "@/components/events/EventsClosing";

export const metadata: Metadata = {
  title: "Group Events",
  description: "Your people, one ground, a proper night. Team days, birthdays and private groups at Club 7 — tell us the plan, we'll take it from there.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventManifesto />
      <NightSequence />
      <EventPosters />
      <PeopleMoment />
      <EventPlanner />
      <EventsClosing />
    </>
  );
}
