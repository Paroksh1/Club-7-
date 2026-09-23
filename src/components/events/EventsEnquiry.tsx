"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

type PlanType = "team-day" | "birthday" | "private-group";

const PLAN_OPTIONS: { value: PlanType; number: string; label: string }[] = [
  { value: "team-day", number: "01", label: "Team Day" },
  { value: "birthday", number: "02", label: "Birthday" },
  { value: "private-group", number: "03", label: "Private Group" },
];

type Errors = Partial<Record<"name" | "phone" | "planType" | "people" | "date", string>>;

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

/**
 * No backend exists anywhere in the project — no API route, server
 * action, or form service. The only verified, real destination on the
 * whole site is Club 7's WhatsApp — so submission assembles the
 * answers into one readable message and opens that chat prefilled,
 * exactly like every other CTA already does. This is a genuine
 * handoff (the enquiry really does reach Club 7 once the visitor taps
 * send inside WhatsApp), not a faked success screen.
 */
export default function EventsEnquiry() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [planType, setPlanType] = useState<PlanType | "">("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!phone.replace(/[^0-9]/g, "") || phone.replace(/[^0-9]/g, "").length < 8) {
      next.phone = "Add a valid phone number.";
    }
    if (!planType) next.planType = "Choose what you're planning.";
    if (!people.trim()) next.people = "Let us know how many people.";
    if (!date) next.date = "Select a date.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const planLabel = PLAN_OPTIONS.find((o) => o.value === planType)?.label ?? "";
    const lines = [
      `Hi Club 7, I'd like to plan a ${planLabel}.`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `People: ${people.trim()}`,
      `Date: ${date}`,
    ];
    if (message.trim()) lines.push(`Notes: ${message.trim()}`);

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
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(4rem,6vw,7rem)]">
            Tell Us
            <br />
            The Plan.
          </h2>
          <p className="mt-5 font-body text-body-lg text-c7-ink/85">
            Team day or birthday —
            <br />
            give us the basics.
          </p>
          <p className="mt-3 font-body text-body-sm text-c7-ink-dim">30 seconds. We&apos;ll take it from there.</p>
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
                Your Plan Is Ready.
              </p>
              <p className="mt-4 font-body text-body-lg text-c7-ink/85">
                We&apos;ve opened WhatsApp with your message — hit send to reach Club 7.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex max-w-xl flex-col gap-y-9">
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
                  label="Phone / WhatsApp"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 ..."
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  error={errors.phone}
                />
              </div>

              <fieldset>
                <legend className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                  What Are You Planning?
                </legend>
                <div className="mt-3 flex flex-wrap gap-x-10 gap-y-3">
                  {PLAN_OPTIONS.map((opt) => {
                    const active = planType === opt.value;
                    return (
                      <label key={opt.value} className="flex cursor-pointer items-center">
                        <input
                          type="radio"
                          name="planType"
                          value={opt.value}
                          checked={active}
                          onChange={() => setPlanType(opt.value)}
                          className="peer sr-only"
                        />
                        <span
                          className={`border-b pb-1 font-body text-body font-medium uppercase tracking-[0.04em] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-c7-red ${
                            active ? "border-c7-red text-c7-ink" : "border-transparent text-c7-ink-dim"
                          }`}
                        >
                          <span className={active ? "text-c7-red" : ""}>{opt.number}</span> {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.planType ? (
                  <p role="alert" className="mt-2 font-body text-body-sm text-c7-red">
                    {errors.planType}
                  </p>
                ) : null}
              </fieldset>

              <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                <Field
                  id="plan-people"
                  label="How Many People?"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 20"
                  value={people}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPeople(e.target.value)}
                  error={errors.people}
                />
                <Field
                  id="plan-date"
                  label="Preferred Date"
                  type="date"
                  value={date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                  error={errors.date}
                />
              </div>

              <div>
                <label htmlFor="plan-message" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                  Anything We Should Know?
                </label>
                <textarea
                  id="plan-message"
                  rows={3}
                  placeholder="Tell us what you have in mind."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-3 max-h-32 w-full resize-none border-b border-c7-line/30 bg-transparent pb-2 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red"
                />
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
                >
                  Send the Plan
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          )}

          {!submitted ? (
            <div className="mt-8 max-w-xl border-t border-c7-line/15 pt-6">
              <a
                href={whatsappHref(WHATSAPP_MESSAGES.events)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                Prefer WhatsApp? Message Club 7
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                  ↗
                </span>
              </a>
              <p className="mt-3 font-body text-body-sm text-c7-ink-dim">We&apos;ll get back to you on WhatsApp.</p>
            </div>
          ) : null}

          <p className="mt-8 max-w-xl font-body text-body-sm uppercase tracking-[0.12em] text-c7-ink-dim/70">
            Team Days / Birthdays
            <br />
            Sector 89, Faridabad
          </p>
        </div>
      </div>
    </section>
  );
}
