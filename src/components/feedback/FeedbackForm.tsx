"use client";

import { useCallback, useRef, useState } from "react";

import { Arrow } from "@/components/ui/Arrow";
import {
  CheckRow,
  FormGroup,
  Honeypot,
  OptionGroup,
  TextAreaField,
  TextField,
} from "@/components/inquiry/fields";
import {
  EMPTY_FEEDBACK,
  FEEDBACK_COPY,
  FEEDBACK_LIMITS,
  FEEDBACK_RELATIONSHIPS,
  validateFeedback,
  type FeedbackErrors,
  type FeedbackField,
  type FeedbackPayload,
} from "@/config/feedback";

/**
 * The feedback form — the private testimonial intake.
 *
 * Built from the project brief's own primitives and the same discipline: plain
 * React, the shared validator from `config/feedback.ts`, one `fetch` to
 * `/api/feedback`, and **a success state only after the server confirms the
 * row was written.** What that row is written *as* is `pending`; the success
 * copy says so in plain words rather than implying anything was published.
 *
 * **Consent is a real tick.** The checkbox starts unchecked, the validator
 * refuses the submission without it, the route refuses it again, and the
 * database's CHECK constraint refuses a row without it a third time. The
 * three display permissions start unchecked too — the most private answer is
 * the default.
 *
 * NO ANALYTICS EVENT. This is not a lead form and a testimonial is not a
 * conversion; `form_start` and `generate_lead` stay the inquiry form's (§10ad).
 */

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

/** The order errors are reported in, which is the order the fields appear. */
const FIELD_ORDER: FeedbackField[] = [
  "name",
  "organization",
  "role",
  "relationship",
  "email",
  "profileUrl",
  "testimonial",
  "consent",
];

/** Where focus goes for a field's error. Radios focus their first control. */
function focusTarget(form: HTMLFormElement, field: FeedbackField) {
  if (field === "relationship") {
    return form.querySelector<HTMLElement>('input[name="relationship"]');
  }
  return form.querySelector<HTMLElement>(`#feedback-${field}`);
}

export function FeedbackForm() {
  const [value, setValue] = useState<FeedbackPayload>(EMPTY_FEEDBACK);
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = useCallback(
    <K extends keyof FeedbackPayload>(key: K, next: FeedbackPayload[K]) => {
      setValue((prev) => ({ ...prev, [key]: next }));
      setErrors((prev) => {
        if (!(key in prev)) return prev;
        const rest = { ...prev };
        delete rest[key as FeedbackField];
        return rest;
      });
    },
    [],
  );

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === "sending") return;

      const found = validateFeedback(value);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        setStatus("idle");
        const first = FIELD_ORDER.find((f) => f in found);
        if (first && formRef.current) {
          focusTarget(formRef.current, first)?.focus();
        }
        return;
      }

      setErrors({});
      setStatus("sending");

      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        if (response.ok) {
          setStatus("success");
          return;
        }

        const data = (await response.json().catch(() => null)) as {
          error?: string;
          fields?: FeedbackErrors;
        } | null;

        if (data?.error === "validation" && data.fields) {
          setErrors(data.fields);
          setStatus("idle");
          return;
        }

        setStatus(
          data?.error === "storage_not_configured" ? "unconfigured" : "error",
        );
      } catch {
        setStatus("error");
      }
    },
    [status, value],
  );

  if (status === "success") {
    return <Success />;
  }

  const sending = status === "sending";
  const failed = status === "error" || status === "unconfigured";
  const summary = Object.keys(errors).length > 0;
  const G = FEEDBACK_COPY.groups;
  const F = FEEDBACK_COPY.fields;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="inq-form">
      <Honeypot
        value={value.companyWebsite}
        onChange={(v) => set("companyWebsite", v)}
      />

      <p className="inq-panel-label caps text-ink">{FEEDBACK_COPY.panelLabel}</p>

      <FormGroup index={G.about.index} title={G.about.title} as="h2">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <TextField
            id="feedback-name"
            label={F.name}
            value={value.name}
            onChange={(v) => set("name", v)}
            error={errors.name}
            autoComplete="name"
            maxLength={FEEDBACK_LIMITS.name.max}
          />
          <TextField
            id="feedback-email"
            label={F.email}
            type="email"
            inputMode="email"
            value={value.email}
            onChange={(v) => set("email", v)}
            error={errors.email}
            autoComplete="email"
            maxLength={FEEDBACK_LIMITS.email.max}
          />
          <TextField
            id="feedback-organization"
            label={F.organization}
            value={value.organization}
            onChange={(v) => set("organization", v)}
            error={errors.organization}
            placeholder={F.organizationPlaceholder}
            autoComplete="organization"
            optional
            maxLength={FEEDBACK_LIMITS.organization.max}
          />
          <TextField
            id="feedback-role"
            label={F.role}
            value={value.role}
            onChange={(v) => set("role", v)}
            error={errors.role}
            placeholder={F.rolePlaceholder}
            autoComplete="organization-title"
            optional
            maxLength={FEEDBACK_LIMITS.role.max}
          />
        </div>

        <div className="mt-9">
          <OptionGroup
            name="relationship"
            legend={F.relationship}
            options={FEEDBACK_RELATIONSHIPS}
            selected={value.relationship ? [value.relationship] : []}
            onToggle={(id) => set("relationship", id)}
            multiple={false}
            optional={false}
            layout="compact"
            error={errors.relationship}
          />
        </div>

        <div className="mt-9">
          <TextField
            id="feedback-profileUrl"
            label={F.profileUrl}
            type="url"
            inputMode="url"
            value={value.profileUrl}
            onChange={(v) => set("profileUrl", v)}
            error={errors.profileUrl}
            placeholder={F.profileUrlPlaceholder}
            autoComplete="url"
            optional
            maxLength={FEEDBACK_LIMITS.profileUrl.max}
          />
        </div>
      </FormGroup>

      <FormGroup index={G.words.index} title={G.words.title} as="h2">
        <TextAreaField
          id="feedback-testimonial"
          label={F.testimonial}
          value={value.testimonial}
          onChange={(v) => set("testimonial", v)}
          error={errors.testimonial}
          placeholder={F.testimonialPlaceholder}
          maxLength={FEEDBACK_LIMITS.testimonial.max}
          rows={6}
        />
      </FormGroup>

      <FormGroup index={G.permission.index} title={G.permission.title} as="h2">
        <fieldset className="border-0 p-0">
          <legend className="caps mb-4 block p-0 text-ink-muted">
            {FEEDBACK_COPY.permissions.legend}
            <span className="ml-2 text-ink-muted/70 normal-case">
              ({FEEDBACK_COPY.optional.toLowerCase()})
            </span>
          </legend>
          <div className="grid gap-y-2.5">
            <CheckRow
              id="feedback-displayName"
              label={FEEDBACK_COPY.permissions.displayName}
              checked={value.displayName}
              onChange={(v) => set("displayName", v)}
            />
            <CheckRow
              id="feedback-displayOrganization"
              label={FEEDBACK_COPY.permissions.displayOrganization}
              checked={value.displayOrganization}
              onChange={(v) => set("displayOrganization", v)}
            />
            <CheckRow
              id="feedback-mediaAllowed"
              label={FEEDBACK_COPY.permissions.mediaAllowed}
              checked={value.mediaAllowed}
              onChange={(v) => set("mediaAllowed", v)}
            />
          </div>
        </fieldset>

        {/* The one required tick. Its own block, its own rule above it, so it
            is never read as the fourth of the optional three. */}
        <div className="mt-8 border-t border-line pt-7">
          <CheckRow
            id="feedback-consent"
            label={FEEDBACK_COPY.consent.label}
            checked={value.consent}
            onChange={(v) => set("consent", v)}
            error={errors.consent}
            hint={FEEDBACK_COPY.consent.hint}
          />
        </div>

        <div
          role="status"
          aria-live="polite"
          className={summary || failed ? "mt-8" : undefined}
        >
          {summary ? (
            <p className="inq-error">{FEEDBACK_COPY.errors.summary}</p>
          ) : null}
          {failed ? (
            <p className="inq-notice max-w-[52ch]">
              {status === "unconfigured"
                ? FEEDBACK_COPY.errors.unconfigured
                : FEEDBACK_COPY.errors.failed}
            </p>
          ) : null}
        </div>

        <div className="mt-8">
          <button type="submit" disabled={sending} className="inq-submit group/cta">
            <span>{sending ? FEEDBACK_COPY.submitting : FEEDBACK_COPY.submit}</span>
            <Arrow
              size={14}
              className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1"
            />
          </button>
        </div>

        <p className="mt-6 text-[0.75rem] leading-[1.6] text-ink-muted">
          {FEEDBACK_COPY.privacy}
        </p>
      </FormGroup>
    </form>
  );
}

/**
 * Shown only after the server has confirmed the submission was stored — as
 * `pending`. The copy says it will be read before anything is published, and
 * promises nothing else.
 */
function Success() {
  return (
    <div role="status" aria-live="polite" className="inq-success">
      <p className="caps text-ink-muted">{FEEDBACK_COPY.panelLabel}</p>
      <p className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.15rem)] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
        {FEEDBACK_COPY.success.title}
      </p>
      <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-[1.7] text-ink/72">
        {FEEDBACK_COPY.success.body}
      </p>
    </div>
  );
}
