/**
 * Demo/placeholder values only — flagged here so they're easy to find
 * and replace once real Club 7 details are supplied. Nothing below is
 * presented to users as a verified fact; UI copy never prints the raw
 * number itself.
 */

// TODO: replace with Club 7's real WhatsApp Business number (E.164, no "+").
export const WHATSAPP_NUMBER_DEMO = "910000000000";

/**
 * Every booking/enquiry CTA on the site routes here with a contextual
 * prefilled message rather than a bare, unexplained chat open — the
 * routing is the same everywhere, only the message changes.
 */
export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER_DEMO}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = whatsappHref("Hi Club 7, I'd like to book a slot.");

export const WHATSAPP_MESSAGES = {
  booking: "Hi Club 7, I'd like to book a slot.",
  availability: "Hi Club 7, can you tell me tonight's availability?",
  cricket: "Hi Club 7, I want to check box cricket slots.",
  football: "Hi Club 7, I want to check football availability.",
  pickleball: "Hi Club 7, I want to check pickleball slots.",
  academy: "Hi Club 7, I'd like to enquire about a cricket academy trial.",
  teamDay: "Hi Club 7, I'm planning a team outing.",
  birthday: "Hi Club 7, I'd like to plan a birthday.",
  events: "Hi Club 7, I'd like to plan an event.",
  tournament: "Hi Club 7, I'd like to enquire about tournaments.",
} as const;

/**
 * No verified Google Maps / place URL exists anywhere in the project
 * — this is a plain text search built from the location string
 * already displayed sitewide, not an invented pin or coordinate.
 * Swap for a real verified place link the moment one exists.
 */
export const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Club 7, Sector 89, Faridabad"
)}`;
