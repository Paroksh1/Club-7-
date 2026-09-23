import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventsTeamDay from "@/components/events/EventsTeamDay";
import EventsBirthday from "@/components/events/EventsBirthday";
import EventsPlanningInfo from "@/components/events/EventsPlanningInfo";
import EventsEnquiry from "@/components/events/EventsEnquiry";

export const metadata: Metadata = {
  title: "Group Events",
  description: "Team outings, birthdays and private group games at Club 7. Tell us the essentials — we'll help you plan the rest.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventsTeamDay />
      <EventsBirthday />
      <EventsPlanningInfo />
      <EventsEnquiry />
    </>
  );
}
