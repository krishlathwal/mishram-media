"use client";

import { useCallback, useRef, useState } from "react";

import { Arrow } from "@/components/ui/Arrow";
import {
  EMPTY_INQUIRY,
  INQUIRY_BUDGETS,
  INQUIRY_COPY,
  INQUIRY_LIMITS,
  INQUIRY_SERVICES,
  INQUIRY_TIMELINES,
  inquiryWhatsappMessage,
  preselectedServices,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryPayload,
} from "@/config/inquiry";
import { whatsappHref } from "@/config/site";
import { onTrackedClick, track } from "@/lib/analytics";
import { useInquiryAttribution } from "@/hooks/useInquiryAttribution";

import { Honeypot, OptionGroup, TextAreaField, TextField } from "./fields";

/**
 * The project brief form.
 *
 * Plain React and the platform — no form library, no validation package, no
 * new dependency for one form (§15, §16). State is a single object, validation
 * is the shared validator from `config/inquiry.ts`, and submission is one
 * `fetch` to `/api/inquiry`.
 *
 * SUBMISSION IS HONEST, AND IT NOW MEANS SOMETHING SLIGHTLY DIFFERENT. The
 * success state appears **only** after the server confirms the inquiry was
 * *captured* — written to the lead database. Whether the notification email
 * then went out is Mishram's operational problem, not the visitor's, so a
 * failed send is invisible here and correctly so: their brief is safe.
 *
 * What is still never faked is the other direction. If the brief could not be
 * stored, no success is shown. WhatsApp is offered as a fallback the visitor
 * chooses — it never opens by itself, and nothing is ever sent behind their
 * back.
 *
 * Errors never clear what was typed. The not-configured case in particular
 * hands the same details straight to WhatsApp, so a visitor who writes a long
 * brief on a site whose backend is not switched on yet does not lose it.
 */

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

/** The order errors are reported in, which is the order the fields appear. */
const FIELD_ORDER: InquiryField[] = [
  "name",
  "email",
  "phone",
  "business",
  "message",
];

/** GA4's `form_name`, and the site's only form. */
const FORM_NAME = "project_inquiry";

/**
 * Which page the form was filled in on, as a **label rather than a URL**.
 *
 * Derived from the pathname so no prop has to be threaded through
 * `ProjectInquiry` from seven different routes, and so a route added later
 * needs no change here. It is not the page path — `page_path` is sent
 * separately and `page_location` rides on every GA4 event anyway — it is the
 * shape of the context, which is what a report is actually read by.
 */
function formContext(): string {
  if (typeof window === "undefined") return "unknown";
  const path = window.location.pathname;
  if (path === "/") return "homepage";
  const service = path.match(/^\/services\/([a-z0-9-]+)/);
  return service ? `service:${service[1]}` : path.replace(/^\//, "") || "unknown";
}

export function InquiryForm({
  /**
   * Services a route arrives with already ticked — a service page preselects
   * its own. **Seeded, never locked**: they are ordinary checkboxes from the
   * first render, so the visitor can untick, add or ignore them. Allow-listed
   * through `preselectedServices`, so a page cannot introduce an option the
   * server would then reject.
   */
  initialServices,
}: {
  initialServices?: readonly string[];
} = {}) {
  const [value, setValue] = useState<InquiryPayload>(() => ({
    ...EMPTY_INQUIRY,
    services: preselectedServices(initialServices),
  }));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  /**
   * Campaign attribution, read at submit rather than held in state — it is not
   * something the visitor edits, so it has no business causing a render. It
   * travels beside the brief and never appears in it: nothing here is shown
   * back, included in the notification email, or written into the WhatsApp
   * fallback.
   */
  const attribution = useInquiryAttribution();
  /**
   * `form_start`, once per mounted form.
   *
   * A ref rather than state, because starting the form is not something the
   * form looks different for — and a ref is what makes "once" true across
   * every keystroke after the first without a render in between. **Never fires
   * on page load**: it takes a real edit, which is the whole distinction
   * between "saw the form" and "began filling it in".
   */
  const started = useRef(false);

  const begin = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track({
      name: "form_start",
      form_name: FORM_NAME,
      form_context: formContext(),
    });
  }, []);

  const set = useCallback(
    <K extends keyof InquiryPayload>(key: K, next: InquiryPayload[K]) => {
      begin();
      setValue((prev) => ({ ...prev, [key]: next }));
      // Clear a field's error the moment it is being corrected, rather than
      // leaving it shouting until the next submit.
      setErrors((prev) => {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key as InquiryField];
        return next;
      });
    },
    [begin],
  );

  const toggleService = useCallback(
    (id: string) => {
      begin();
      setValue((prev) => ({
        ...prev,
        services: prev.services.includes(id)
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      }));
    },
    [begin],
  );

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === "sending") return;

      const found = validateInquiry(value);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        setStatus("idle");
        // Move focus to the first problem so a keyboard or screen-reader user
        // lands on it instead of hunting for the red rule.
        const first = FIELD_ORDER.find((f) => f in found);
        if (first) {
          formRef.current
            ?.querySelector<HTMLElement>(`#inquiry-${first}`)
            ?.focus();
        }
        return;
      }

      setErrors({});
      setStatus("sending");

      try {
        const response = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...value, attribution: attribution() }),
        });

        if (response.ok) {
          /**
           * THE CONVERSION, AND IT IS TIED TO THE DATABASE.
           *
           * A `200` from `/api/inquiry` means one thing and only one thing:
           * **the row was written to Supabase** (§10ac). So this fires exactly
           * where the visitor is told "Brief received." and nowhere else — not
           * on a validation error, not on a honeypot (which never reaches this
           * branch from a real form), not on a failed insert, not when the
           * WhatsApp fallback is clicked, and not when somebody merely looks at
           * the form.
           *
           * **Nothing the visitor typed is in the payload.** No name, email,
           * phone, business or message — only option ids, a count, and where
           * the form was. Everything here is drawn from the allow-lists in
           * `config/inquiry.ts`, so a free-text field cannot reach GA even by
           * accident.
           *
           * `track` no-ops when analytics is off or blocked, and cannot throw,
           * so the success state below is never conditional on Google.
           */
          track({
            name: "generate_lead",
            services: value.services.join(","),
            service_count: value.services.length,
            budget_range: value.budget,
            timeline: value.timeline,
            page_path: window.location.pathname,
            form_context: formContext(),
          });
          setStatus("success");
          return;
        }

        const data = (await response.json().catch(() => null)) as {
          error?: string;
          fields?: InquiryErrors;
        } | null;

        if (data?.error === "validation" && data.fields) {
          setErrors(data.fields);
          setStatus("idle");
          return;
        }

        // `storage_not_configured` is the one failure worth naming differently:
        // nothing is wrong with what the visitor wrote, and retrying will not
        // help, so the copy says so and points at WhatsApp instead of a button
        // that would fail again. A `storage_failed` is worth retrying.
        setStatus(
          data?.error === "storage_not_configured" ? "unconfigured" : "error",
        );
      } catch {
        setStatus("error");
      }
    },
    [attribution, status, value],
  );

  // Sending another inquiry returns the form to the state the route opened in,
  // preselection included — not to a blank one it never had.
  const reset = useCallback(() => {
    setValue({
      ...EMPTY_INQUIRY,
      services: preselectedServices(initialServices),
    });
    setErrors({});
    setStatus("idle");
  }, [initialServices]);

  if (status === "success") {
    return <Success onAgain={reset} />;
  }

  const sending = status === "sending";
  const failed = status === "error" || status === "unconfigured";
  const summary = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="inq-form">
      <Honeypot
        value={value.companyWebsite}
        onChange={(v) => set("companyWebsite", v)}
      />

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <TextField
          id="inquiry-name"
          label={INQUIRY_COPY.fields.name}
          value={value.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
          maxLength={INQUIRY_LIMITS.name.max}
        />
        <TextField
          id="inquiry-email"
          label={INQUIRY_COPY.fields.email}
          type="email"
          inputMode="email"
          value={value.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
          maxLength={INQUIRY_LIMITS.email.max}
        />
        <TextField
          id="inquiry-phone"
          label={INQUIRY_COPY.fields.phone}
          type="tel"
          inputMode="tel"
          value={value.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          autoComplete="tel"
          optional
          maxLength={INQUIRY_LIMITS.phone.max}
        />
        <TextField
          id="inquiry-business"
          label={INQUIRY_COPY.fields.business}
          value={value.business}
          onChange={(v) => set("business", v)}
          error={errors.business}
          placeholder={INQUIRY_COPY.fields.businessPlaceholder}
          autoComplete="organization"
          optional
          maxLength={INQUIRY_LIMITS.business.max}
        />
      </div>

      <div className="mt-9">
        <OptionGroup
          name="services"
          legend={INQUIRY_COPY.fields.services}
          options={INQUIRY_SERVICES}
          selected={value.services}
          onToggle={toggleService}
          multiple
        />
      </div>

      {/* Budget and timeline share a row from lg up. Both are short optional
          qualifiers, and stacking them cost ~190px of a section that has to
          stay near one and a half viewports — see §10h. */}
      <div className="mt-9 grid gap-y-9 lg:grid-cols-2 lg:gap-x-8">
        <OptionGroup
          name="budget"
          legend={INQUIRY_COPY.fields.budget}
          options={INQUIRY_BUDGETS}
          selected={value.budget ? [value.budget] : []}
          onToggle={(id) => set("budget", id)}
          multiple={false}
          layout="compact"
        />
        <OptionGroup
          name="timeline"
          legend={INQUIRY_COPY.fields.timeline}
          options={INQUIRY_TIMELINES}
          selected={value.timeline ? [value.timeline] : []}
          onToggle={(id) => set("timeline", id)}
          multiple={false}
          layout="compact"
        />
      </div>

      <div className="mt-9">
        <TextAreaField
          id="inquiry-message"
          label={INQUIRY_COPY.fields.message}
          value={value.message}
          onChange={(v) => set("message", v)}
          error={errors.message}
          placeholder={INQUIRY_COPY.fields.messagePlaceholder}
          maxLength={INQUIRY_LIMITS.message.max}
        />
      </div>

      {/* One live region for everything the form has to say back, so a screen
          reader hears the outcome without the focus moving. */}
      <div
        role="status"
        aria-live="polite"
        className={summary || failed ? "mt-10" : undefined}
      >
        {summary ? (
          <p className="inq-error">{INQUIRY_COPY.errors.summary}</p>
        ) : null}
        {failed ? (
          <p className="inq-notice max-w-[52ch]">
            {status === "unconfigured"
              ? INQUIRY_COPY.errors.unconfigured
              : INQUIRY_COPY.errors.failed}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <button type="submit" disabled={sending} className="inq-submit group/cta">
          <span>{sending ? INQUIRY_COPY.submitting : INQUIRY_COPY.submit}</span>
          <Arrow
            size={14}
            className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1"
          />
        </button>

        {/* Only ever offered after a real failure, and only as a link the
            visitor decides to follow. Nothing opens on its own. */}
        {failed ? (
          <a
            href={whatsappHref(inquiryWhatsappMessage(value))}
            target="_blank"
            rel="noopener noreferrer"
            /* `contact_click`, and deliberately **not** `generate_lead`.
               This link only exists because the insert failed, so there is no
               lead — and following it is not proof the visitor ever pressed
               send inside WhatsApp. Counting it as a conversion would inflate
               the one number this site is measured on with leads Mishram never
               received. The prefilled brief is in the href and none of it goes
               to Google. */
            onClick={onTrackedClick({
              name: "contact_click",
              method: "whatsapp",
              context: "inquiry_fallback",
            })}
            className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink"
          >
            <span className="relative">
              {INQUIRY_COPY.whatsapp}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
              />
            </span>
            <span aria-hidden className="block h-3 w-3 overflow-hidden">
              <Arrow
                size={12}
                className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4"
              />
            </span>
          </a>
        ) : null}
      </div>

      {/* Sentence case rather than the site's tracked caps: at 56 characters
          this is a sentence, and caps that long stop being a micro-label. */}
      <p className="mt-6 text-[0.75rem] leading-[1.6] text-ink-muted">
        {INQUIRY_COPY.privacy}
      </p>
    </form>
  );
}

/**
 * Shown only after the server has confirmed the brief was stored. No
 * response-time promise — that is Mishram's commitment to make, not the site's.
 */
function Success({ onAgain }: { onAgain: () => void }) {
  return (
    <div role="status" aria-live="polite" className="inq-success">
      <p className="font-display text-[clamp(1.5rem,2.4vw,2.15rem)] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
        {INQUIRY_COPY.success.title}
      </p>
      <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-ink/72">
        {INQUIRY_COPY.success.body}
      </p>
      <button
        type="button"
        onClick={onAgain}
        className="group mt-9 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink"
      >
        <span className="relative">
          {INQUIRY_COPY.success.again}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
          />
        </span>
        <Arrow
          size={12}
          className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}
