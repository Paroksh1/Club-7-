export type SportId = "cricket" | "football" | "pickleball";

export type SportConfig = {
  id: SportId;
  number: string;
  label: string;
  /** One consistent short/catchy line per sport, same structure across
   * all three states, so the red line reads as one system rather than
   * ad hoc copy that happens to exist for two of three sports. */
  headline: string;
  annotations: string[];
  cta: string;
};

export const SPORTS: SportConfig[] = [
  {
    id: "cricket",
    number: "01",
    label: "Cricket",
    headline: "2 Turfs. Big Hits. Late Games.",
    annotations: ["2 Turfs", "Box Cricket", "Open 24 Hours"],
    cta: "Check Cricket Slots",
  },
  {
    id: "football",
    number: "02",
    label: "Football",
    headline: "7-a-side. Fast Play. Under Lights.",
    annotations: ["Under the Lights", "Open 24 Hours"],
    cta: "Check Football Slots",
  },
  {
    id: "pickleball",
    number: "03",
    label: "Pickleball",
    headline: "Beginner Friendly. Easy to Pick Up.",
    annotations: ["Beginner Friendly"],
    cta: "Check Pickleball Slots",
  },
];
