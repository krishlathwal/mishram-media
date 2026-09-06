"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

import { INQUIRY_COPY, type Option } from "@/config/inquiry";

/**
 * The form primitives — shared by the project brief and, since Revision 43,
 * by the feedback page.
 *
 * Every one of them is a real control with a real `<label>` — the styling sits
 * on top of native inputs rather than replacing them, so mobile keyboards,
 * autofill, checkbox and radio semantics and keyboard navigation all behave the
 * way the browser already knows how to.
 *
 * Fields are **bottom rules, not boxes**: no filled card, no 16px radius, no
 * SaaS input chrome. The rule goes teal on focus and error-coloured when
 * invalid — but every error also has words, so nothing is communicated by
 * colour alone.
 */

function Optional() {
  return (
    <span className="ml-2 text-ink-muted/70 normal-case">
      ({INQUIRY_COPY.optional.toLowerCase()})
    </span>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  autoComplete,
  inputMode,
  placeholder,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: "text" | "email" | "tel" | "url";
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  maxLength?: number;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="caps block text-ink-muted">
        {label}
        {optional ? <Optional /> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx("inq-input mt-3", value && "inq-input--filled")}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  rows = 4,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  maxLength: number;
  rows?: number;
}) {
  const errorId = `${id}-error`;
  const countId = `${id}-count`;
  // Only worth showing once it is close enough to matter.
  const remaining = maxLength - value.length;
  const showCount = remaining <= 240;

  return (
    <div>
      <label htmlFor={id} className="caps block text-ink-muted">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, showCount ? countId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={clsx("inq-input inq-textarea mt-3", value && "inq-input--filled")}
      />
      <div className="flex items-start justify-between gap-4">
        <FieldError id={errorId} message={error} />
        {showCount ? (
          <p id={countId} className="caps mt-3 shrink-0 text-ink-muted">
            {remaining} left
          </p>
        ) : null}
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="inq-error mt-3">
      {message}
    </p>
  );
}

/**
 * A group of selectable options.
 *
 * Real `checkbox`es for a multi-select, real `radio`s for a single one — so the
 * keyboard behaves as the visitor expects (space toggles a checkbox, arrows move
 * within a radio group) and the accessible name comes from the label itself.
 * The native control is visually hidden, never `display: none`, so it stays
 * focusable and reachable.
 *
 * Visually these are **project tags, not filter pills**: a hairline row with a
 * small square that fills teal when chosen. No bright filled capsules.
 */
export function OptionGroup({
  name,
  legend,
  options,
  selected,
  onToggle,
  multiple,
  optional = true,
  layout = "wide",
  error,
}: {
  name: string;
  legend: string;
  options: readonly Option[];
  selected: readonly string[];
  onToggle: (id: string) => void;
  multiple: boolean;
  optional?: boolean;
  /**
   * `wide` for long labels like the service names, which need the full column
   * on a phone. `compact` for short ones like the budget ranges, which pair up
   * at every width rather than becoming six stacked rows.
   */
  layout?: "wide" | "compact";
  /** For a required group. Read with the fieldset, so it needs no `aria-describedby`. */
  error?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <fieldset className="border-0 p-0" aria-invalid={error ? true : undefined}>
      <legend className="caps mb-4 block p-0 text-ink-muted">
        {legend}
        {optional ? <Optional /> : null}
      </legend>

      {/* `auto-fit` rather than a breakpoint for `wide`: seven service rows in
          one column cost 396px of a phone, and the options pair up perfectly
          well from about 375px. The browser decides where they stop fitting;
          at 640 and above both layouts resolve to exactly two columns, so
          nothing above a phone moves. */}
      <div
        className={clsx(
          "inq-optgrid",
          layout === "compact" && "inq-optgrid--compact",
        )}
      >
        {options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label key={option.id} className="inq-option">
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option.id}
                checked={checked}
                onChange={() => onToggle(option.id)}
                aria-describedby={error ? errorId : undefined}
                className="inq-native"
              />
              <span aria-hidden className="inq-box" />
              <span className="inq-option-label">{option.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

/**
 * One standalone checkbox with a sentence for a label — consent, and the
 * display permissions on the feedback page. The same row treatment as an
 * option, but top-aligned so a two-line label reads as a sentence rather
 * than a tag. **Never pre-checked**: `checked` is state the person sets.
 */
export function CheckRow({
  id,
  name,
  label,
  checked,
  onChange,
  error,
  hint,
}: {
  id: string;
  name?: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  /** A sentence under the row, e.g. what ticking it does not mean. */
  hint?: string;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label htmlFor={id} className="inq-option inq-check">
        <input
          id={id}
          name={name ?? id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="inq-native"
        />
        <span aria-hidden className="inq-box" />
        <span className="inq-option-label">{label}</span>
      </label>
      {hint ? (
        <p id={hintId} className="mt-3 text-[0.75rem] leading-[1.6] text-ink-muted">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/**
 * A numbered group of fields — `01 About you`, `02 What you need`… — so a long
 * form reads as a short sequence rather than a wall. A real `<section>` with
 * its own heading, which is what lets a screen reader jump between groups;
 * `as` follows the page's outline (h3 under the homepage chapter's h2, h2 on
 * the feedback page under its h1).
 */
export function FormGroup({
  index,
  title,
  as = "h3",
  children,
}: {
  index: string;
  title: string;
  as?: "h2" | "h3";
  children: ReactNode;
}) {
  const Heading = as;
  const id = `group-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={id} className="inq-group">
      <div className="inq-group-head">
        <span aria-hidden className="caps text-accent">
          {index}
        </span>
        <Heading
          id={id}
          className="font-display text-[1.0625rem] leading-none font-medium tracking-[-0.02em] text-ink"
        >
          {title}
        </Heading>
        <span aria-hidden className="inq-group-rule" />
      </div>
      {children}
    </section>
  );
}

/**
 * A field no visitor can see, tab to or hear — so anything that arrives in it
 * was filled by something submitting the form blind. The server answers those
 * exactly as it answers a success, and delivers nothing.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden className="inq-honeypot">
      <label htmlFor="company-website">Company website</label>
      <input
        id="company-website"
        name="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
