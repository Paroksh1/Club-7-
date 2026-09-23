import type { Metadata } from "next";
import EventsSection1 from "@/components/events/EventsSection1";
import EventsSection2 from "@/components/events/EventsSection2";
import EventsSection3 from "@/components/events/EventsSection3";
import EventsSection4 from "@/components/events/EventsSection4";

export const metadata: Metadata = {
  title: "Events — Club 7 Arena",
  description: "Office crew, birthday crew — bring them over. Team days and celebrations at Club 7.",
};

export default function EventsPage() {
  return (
    <>
      <EventsSection1 />
      <EventsSection2 />
      <EventsSection3 />
      <EventsSection4 />
    </>
  );
}
