import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventsWhyClub7 from "@/components/events/EventsWhyClub7";
import EventsTeamDay from "@/components/events/EventsTeamDay";
import EventsBirthday from "@/components/events/EventsBirthday";
import EventsNightStory from "@/components/events/EventsNightStory";
import EventsEnquiry from "@/components/events/EventsEnquiry";

export const metadata: Metadata = {
  title: "Events",
  description: "Office crew, birthday crew — bring them over. Team days and celebrations at Club 7.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventsWhyClub7 />
      <EventsTeamDay />
      <EventsBirthday />
      <EventsNightStory />
      <EventsEnquiry />
    </>
  );
}
