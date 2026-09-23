"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { whatsappHref } from "@/lib/constants";

type Occasion = "team-outing" | "birthday" | "private-group" | "";

const OCCASIONS: { value: Occasion; label: string; previewLabel: string }[] = [
  { value: "team-outing", label: "Team Outing", previewLabel: "A TEAM DAY AT CLUB 7" },
  { value: "birthday", label: "Birthday", previewLabel: "A BIRTHDAY AT CLUB 7" },
  { value: "private-group", label: "Private Group", previewLabel: "A GROUP EVENT AT CLUB 7" },
];

type Errors = Partial<Record<"occasion" | "name" | "phone" | "headcount", string>>;

function Field({
  id,
  label,
  error,
  className = "",
  ...rest
}: { id: string; label: string; error?: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="mt-3 w-full border-b border-c7-line/30 bg-transparent pb-2 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red"
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 font-body text-body-sm text-c7-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** The signature moment: as the organiser fills the form, this composes
 * into a small personalised summary of their own plan — not a
 * confirmed package or quote, and worded that way throughout. */
function InvitationPreview({
  occasion,
  headcount,
  stillDeciding,
  date,
  sport,
  helpChoose,
  notes,
}: {
  occasion: Occasion;
  headcount: string;
  stillDeciding: boolean;
  date: string;
  sport: string;
  helpChoose: boolean;
  notes: string;
}) {
  const occasionMeta = OCCASIONS.find((o) => o.value === occasion);
  const dateLine = stillDeciding || !date ? "Date to be decided" : formatDateLine(date);
  const sportLine = helpChoose || !sport ? "Help us choose the sport" : `Interested in ${sport}`;
  const notesLine = notes.trim() ? notes.trim() : "Food and extras to discuss";

  return (
    <div className="border border-c7-line/20 bg-c7-bg-3/60 p-6 md:p-7">
      <p className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(1.375rem,2vw,1.75rem)]">
        {occasionMeta?.previewLabel ?? "YOUR PLAN AT CLUB 7"}
      </p>
      <div className="mt-4 flex flex-col gap-2 font-body text-body-sm text-c7-ink-dim">
        <p key={`h-${headcount}`} className="c7-anim-reveal [animation-duration:300ms]">
          {headcount ? `Around ${headcount} people` : "Headcount to be confirmed"}
        </p>
        <p key={`d-${dateLine}`} className="c7-anim-reveal [animation-duration:300ms]">
          {dateLine}
        </p>
        <p key={`s-${sportLine}`} className="c7-anim-reveal [animation-duration:300ms]">
          {sportLine}
        </p>
        <p key={`n-${notesLine}`} className="c7-anim-reveal [animation-duration:300ms]">
          {notesLine}
        </p>
      </div>
      <p className="mt-5 border-t border-c7-line/10 pt-4 font-body text-body-sm uppercase tracking-[0.08em] text-c7-ink-dim/70">
        A planning preview, not a confirmed booking
      </p>
    </div>
  );
}

function formatDateLine(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Date to be decided";
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/**
 * No backend exists anywhere in the project — no API route, server
 * action, or form service. Submitting opens WhatsApp with the plan
 * pre-filled; it is never labelled "sent" until the visitor actually
 * taps send inside WhatsApp themselves, and the button is labelled for
 * what it actually does rather than implying a server accepted anything.
 */
export default function EventsEnquiry() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  const [occasion, setOccasion] = useState<Occasion>("");
  const [headcount, setHeadcount] = useState("");
  const [stillDeciding, setStillDeciding] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [helpChoose, setHelpChoose] = useState(true);
  const [sport, setSport] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Reads ?plan=team-outing|birthday|private-group from the URL (set by
  // the Team Days / Birthday sections' CTAs) to preselect the occasion.
  // Deliberately an effect, not a lazy useState initializer — a lazy
  // initializer runs during render on both server and client, and
  // `window` is only available on the client, so it would render a
  // different `occasion` on the very first client paint than the
  // server sent, which is exactly a React hydration mismatch. An
  // effect runs strictly after hydration completes, so the first
  // paint always matches the server's "" default and this only
  // updates state on the following paint, correctly.
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan === "team-outing" || plan === "birthday" || plan === "private-group") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading window.location can only happen client-side, after mount; this is the correct pattern, not a derivable-during-render value.
      setOccasion(plan);
    }
  }, []);

  function validate(): Errors {
    const next: Errors = {};
    if (!occasion) next.occasion = "Choose an occasion.";
    if (!name.trim()) next.name = "Enter your name.";
    if (!phone.replace(/[^0-9]/g, "") || phone.replace(/[^0-9]/g, "").length < 8) {
      next.phone = "Add a valid phone number.";
    }
    if (!headcount.trim()) next.headcount = "Let us know how many people.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const occasionLabel = OCCASIONS.find((o) => o.value === occasion)?.label ?? "";
    const lines = [
      `Hi Club 7, I'd like to plan an event.`,
      `Occasion: ${occasionLabel}`,
      `Headcount: around ${headcount.trim()}`,
      `Date: ${stillDeciding || !date ? "Still deciding" : formatDateLine(date)}`,
      time ? `Preferred time: ${time}` : null,
      `Sport: ${helpChoose || !sport ? "Help us choose" : sport}`,
      occasion === "birthday" && ageGroup ? `Age group: ${ageGroup}` : null,
      occasion === "team-outing" && organisation ? `Organisation: ${organisation}` : null,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      notes.trim() ? `Additional requests: ${notes.trim()}` : null,
    ].filter(Boolean);

    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <section id="plan" ref={ref} className="relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-24 pt-20 md:pb-28 md:pt-24">
      <div className="border-t border-c7-line/15" />

      <div className="mt-14 md:mt-16 md:grid md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">04 / Your Plan</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(2.5rem,3.8vw,4rem)]">
            Let&apos;s Put Your Plan Together.
          </h2>
          <p className="mt-5 font-body text-body-lg text-c7-ink/85">
            Tell us the essentials. Dates and arrangements are confirmed with the Club 7 team.
          </p>
        </div>

        <div
          className="mt-12 transition-[opacity,transform] duration-700 ease-out md:mt-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: visible ? "150ms" : "0ms",
          }}
        >
          {submitted ? (
            <div aria-live="polite" className="max-w-md">
              <p className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3.2vw,2.75rem)]">
                Continue on WhatsApp.
              </p>
              <p className="mt-4 font-body text-body-lg text-c7-ink/85">
                We&apos;ve opened WhatsApp with your plan, ready for you to send — nothing has been sent yet until
                you do.
              </p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-14">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-y-9">
                <fieldset>
                  <legend className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">Occasion</legend>
                  <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
                    {OCCASIONS.map((opt) => {
                      const active = occasion === opt.value;
                      return (
                        <label key={opt.value} className="flex cursor-pointer items-center">
                          <input
                            type="radio"
                            name="occasion"
                            value={opt.value}
                            checked={active}
                            onChange={() => setOccasion(opt.value)}
                            className="peer sr-only"
                          />
                          <span
                            className={`border-b pb-1 font-body text-body font-medium uppercase tracking-[0.04em] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-c7-red ${
                              active ? "border-c7-red text-c7-ink" : "border-transparent text-c7-ink-dim"
                            }`}
                          >
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.occasion ? (
                    <p role="alert" className="mt-2 font-body text-body-sm text-c7-red">
                      {errors.occasion}
                    </p>
                  ) : null}
                </fieldset>

                {occasion === "birthday" ? (
                  <Field
                    id="plan-age-group"
                    label="Age Group (Optional)"
                    type="text"
                    placeholder="e.g. Turning 8, or adults"
                    value={ageGroup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAgeGroup(e.target.value)}
                  />
                ) : null}
                {occasion === "team-outing" ? (
                  <Field
                    id="plan-organisation"
                    label="Organisation (Optional)"
                    type="text"
                    placeholder="Company or team name"
                    value={organisation}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOrganisation(e.target.value)}
                  />
                ) : null}

                <Field
                  id="plan-headcount"
                  label="Approximate Headcount"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 20"
                  value={headcount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setHeadcount(e.target.value)}
                  error={errors.headcount}
                />

                <div>
                  <label htmlFor="plan-date" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                    Preferred Date
                  </label>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <input
                      id="plan-date"
                      type="date"
                      disabled={stillDeciding}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border-b border-c7-line/30 bg-transparent pb-2 font-body text-body text-c7-ink outline-none transition-colors focus:border-c7-red disabled:opacity-40 [color-scheme:dark]"
                    />
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={stillDeciding}
                        onChange={(e) => setStillDeciding(e.target.checked)}
                        className="h-4 w-4 accent-c7-red"
                      />
                      <span className="font-body text-body-sm text-c7-ink-dim">Still deciding</span>
                    </label>
                  </div>
                </div>

                <Field
                  id="plan-time"
                  label="Preferred Time (Optional)"
                  type="time"
                  value={time}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
                  className="[color-scheme:dark]"
                />

                <div>
                  <label htmlFor="plan-sport" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                    Sport Preference
                  </label>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <input
                      id="plan-sport"
                      type="text"
                      disabled={helpChoose}
                      placeholder="Football, box cricket, pickleball..."
                      value={sport}
                      onChange={(e) => setSport(e.target.value)}
                      className="min-w-0 flex-1 border-b border-c7-line/30 bg-transparent pb-2 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red disabled:opacity-40"
                    />
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={helpChoose}
                        onChange={(e) => setHelpChoose(e.target.checked)}
                        className="h-4 w-4 accent-c7-red"
                      />
                      <span className="font-body text-body-sm text-c7-ink-dim">Help us choose</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                  <Field
                    id="plan-name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    error={errors.name}
                  />
                  <Field
                    id="plan-phone"
                    label="Contact Number"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 ..."
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    error={errors.phone}
                  />
                </div>

                <div>
                  <label htmlFor="plan-message" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                    Additional Requests (Optional)
                  </label>
                  <textarea
                    id="plan-message"
                    rows={3}
                    placeholder="Food, decoration, anything else to mention."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-3 max-h-32 w-full resize-none border-b border-c7-line/30 bg-transparent pb-2 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red"
                  />
                </div>

                <div className="mt-2 flex flex-col items-start gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
                  >
                    Continue on WhatsApp
                    <span aria-hidden="true">↗</span>
                  </button>
                  <p className="font-body text-body-sm text-c7-ink-dim">
                    Opens WhatsApp with your plan, ready for you to send.
                  </p>
                </div>
              </form>

              <div className="lg:sticky lg:top-28">
                <InvitationPreview
                  occasion={occasion}
                  headcount={headcount}
                  stillDeciding={stillDeciding}
                  date={date}
                  sport={sport}
                  helpChoose={helpChoose}
                  notes={notes}
                />
              </div>
            </div>
          )}

          {!submitted ? (
            <p className="mt-8 max-w-xl font-body text-body-sm uppercase tracking-[0.12em] text-c7-ink-dim/70">
              Team Outings / Birthdays / Private Groups
              <br />
              Sector 89, Faridabad
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
