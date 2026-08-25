"use client";

import clsx from "clsx";

import { INQUIRY_COPY, type Option } from "@/config/inquiry";

/**
 * The form's primitives.
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
  type?: "text" | "email" | "tel";
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  maxLength: number;
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
        rows={4}
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
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="caps mb-4 block p-0 text-ink-muted">
        {legend}
        {optional ? <Optional /> : null}
      </legend>

      <div
        className={clsx(
          "grid gap-2.5",
          layout === "wide" ? "sm:grid-cols-2" : "grid-cols-2",
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
                className="inq-native"
              />
              <span aria-hidden className="inq-box" />
              <span className="inq-option-label">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
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
