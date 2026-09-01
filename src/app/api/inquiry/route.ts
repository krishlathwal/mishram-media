import { leadStore } from "@/lib/supabase/server";
import { CONTACT } from "@/config/site";
import {
  INQUIRY_BUDGETS,
  INQUIRY_SERVICES,
  INQUIRY_TIMELINES,
  coerceAttribution,
  coerceInquiry,
  labelsFor,
  validateInquiry,
  type InquiryAttribution,
  type InquiryPayload,
} from "@/config/inquiry";

/**
 * POST /api/inquiry — captures a project inquiry.
 *
 * **Server-side on purpose.** The browser never holds a provider credential,
 * never talks to an email API and — since the lead database arrived — never
 * talks to Supabase either. It posts here; this route is the only thing that
 * holds either key.
 *
 * ── THE ORDER IS THE WHOLE DESIGN ──────────────────────────────────────────
 *
 * ```
 * validate → honeypot → INSERT → notify → mark the notification → respond
 * ```
 *
 * **The database is the source of truth and the email is a notification.**
 * That sentence decides every branch below:
 *
 * - The insert happens **before** the email, so a delivery failure cannot lose
 *   an inquiry. It only writes `failed` into a column.
 * - A failed email therefore returns **200**. The visitor's brief was captured;
 *   telling them otherwise would be a lie that costs Mishram the lead when they
 *   give up rather than resend.
 * - A failed *insert* returns an error and **no success is faked**, because
 *   there is then genuinely nothing on the server. The form says so and offers
 *   WhatsApp — a link the visitor chooses to follow, which never opens itself.
 *
 * The previous version of this route wrote nothing anywhere (§10h): every
 * inquiry lived or died on one email send. That is what changed.
 *
 * Both outbound calls stay plain `fetch`/one client. Resend has no npm package
 * here for one HTTP call (§15); Supabase has `@supabase/supabase-js` because
 * hand-rolling PostgREST auth would be the worse trade.
 *
 * RESPONSES
 *
 * | Status | `error` | Meaning |
 * | --- | --- | --- |
 * | 200 | — | **Lead captured.** The email may have gone out, failed, or not been configured — none of that changes this. Also the honeypot's answer |
 * | 400 | `invalid_request` | Body was not JSON |
 * | 400 | `validation` | Field errors, returned in `fields` |
 * | 503 | `storage_not_configured` | No Supabase URL/key — nowhere to put it |
 * | 502 | `storage_failed` | The database rejected the insert |
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const LEADS_TABLE = "leads";

/** How much of a provider's complaint is worth keeping. */
const ERROR_MAX = 200;

type EmailOutcome = {
  status: "sent" | "failed" | "not_configured";
  /** Short, sanitised, and only ever set alongside `failed`. */
  error?: string;
};

function json(body: unknown, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_request" }, 400);
  }

  const value = coerceInquiry(raw);
  const attribution = coerceAttribution(
    (raw as { attribution?: unknown } | null)?.attribution,
  );

  const errors = validateInquiry(value);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "validation", fields: errors }, 400);
  }

  // Honeypot. A field no real visitor can see or tab to, so anything in it came
  // from something filling the form blind. Answer exactly as a success would,
  // and store nothing — telling a bot why it failed only helps it, and a row
  // per bot would make the leads table useless within a week.
  if (value.companyWebsite) {
    return json({ ok: true }, 200);
  }

  const store = leadStore();
  if (!store) {
    // Nowhere to put it, so there is no honest success to report.
    return json({ ok: false, error: "storage_not_configured" }, 503);
  }

  // ── 1. CAPTURE ───────────────────────────────────────────────────────────
  // Everything after this point is best-effort. The lead is already safe.
  const { data, error } = await store
    .from(LEADS_TABLE)
    .insert(rowFor(value, attribution))
    .select("id")
    .single();

  if (error || !data) {
    // The failure is worth knowing about; the inquiry's contents are not ours
    // to log, so only the database's own message is recorded.
    console.error(`[inquiry] lead insert failed: ${error?.message ?? "no row"}`);
    return json({ ok: false, error: "storage_failed" }, 502);
  }

  const id = data.id as string;

  // ── 2. NOTIFY ────────────────────────────────────────────────────────────
  // The attribution goes with it: whoever reads the inbox needs to know which
  // page the brief came from and which campaign sent them, and re-deriving
  // that from the Table Editor afterwards is the step nobody takes.
  const outcome = await notify(value, attribution);

  // ── 3. RECORD WHAT THE NOTIFICATION DID ──────────────────────────────────
  // Awaited rather than fired and forgotten: a promise left dangling on a
  // serverless instance is not guaranteed to run after the response is sent.
  const marked = await store
    .from(LEADS_TABLE)
    .update({
      email_notification_status: outcome.status,
      email_notification_error: outcome.error ?? null,
    })
    .eq("id", id);

  if (marked.error) {
    // The column is now stale, and that is all. The lead itself is stored, so
    // this is a note to whoever reads the logs — never a failure for the
    // visitor, who did nothing wrong and whose brief arrived.
    console.error(
      `[inquiry] notification status not recorded: ${marked.error.message}`,
    );
  }

  // Captured. The only thing that could have made this a failure was the
  // insert, and the insert succeeded.
  return json({ ok: true }, 200);
}

/**
 * The row, built from the two coerced halves.
 *
 * **Normalisation happens here, once.** `coerceInquiry` has already trimmed
 * every string; this lowercases the address so `Info@X.com` and `info@x.com`
 * are one person in the Table Editor, and leaves the phone number exactly as
 * it was typed — a visitor writing `+44` or `+971` means it, and silently
 * prefixing `+91` would corrupt the one field that has to dial correctly.
 *
 * Optional text goes in as `null` rather than `""`, so "not supplied" reads as
 * empty in the dashboard instead of as a blank the eye has to check twice.
 */
function rowFor(value: InquiryPayload, attribution: InquiryAttribution) {
  const orNull = (v: string) => (v.length > 0 ? v : null);

  return {
    name: value.name,
    email: value.email.toLowerCase(),
    phone: orNull(value.phone),
    business: orNull(value.business),
    services: value.services,
    budget: orNull(value.budget),
    timeline: orNull(value.timeline),
    message: value.message,

    // The channel, not the campaign. A form submission is always 'website';
    // which ad sent them is `utm_source`'s question and is kept separate so
    // neither answer overwrites the other.
    source: "website",
    page_path: orNull(attribution.pagePath),
    referrer: orNull(attribution.referrer),
    utm_source: orNull(attribution.utm_source),
    utm_medium: orNull(attribution.utm_medium),
    utm_campaign: orNull(attribution.utm_campaign),
    utm_content: orNull(attribution.utm_content),
    utm_term: orNull(attribution.utm_term),
  };
}

/**
 * Sends the notification email, and **cannot throw**.
 *
 * Every path returns an outcome to write into the row instead, because by the
 * time this runs the lead is already captured and nothing here is allowed to
 * turn that into a failure.
 */
async function notify(
  value: InquiryPayload,
  attribution: InquiryAttribution,
): Promise<EmailOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  // The published address is the sensible default recipient; the sender has no
  // default, because it needs a domain verified with the provider and pretending
  // otherwise would fail at send time instead of here.
  const to = process.env.INQUIRY_TO_EMAIL || CONTACT.email;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !from || !to) return { status: "not_configured" };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So a reply from the inbox goes straight to the person who wrote in.
        reply_to: value.email,
        subject: subjectFor(value),
        text: bodyFor(value, attribution),
      }),
    });

    if (response.ok) return { status: "sent" };

    console.error(`[inquiry] provider responded ${response.status}`);
    return {
      status: "failed",
      error: shortError(`provider ${response.status}`, await reason(response)),
    };
  } catch {
    console.error("[inquiry] provider request failed");
    return { status: "failed", error: "request failed" };
  }
}

/**
 * The provider's own explanation, when it gives one — "domain is not verified"
 * is the difference between a five-minute fix and an afternoon.
 */
async function reason(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: unknown };
    return typeof body.message === "string" ? body.message : "";
  } catch {
    return "";
  }
}

/**
 * A short, safe string for `email_notification_error`.
 *
 * **Never a stack trace and never a credential.** Resend does not echo the key
 * back, but the redaction is here anyway: a column that will be read in a
 * dashboard is the wrong place to find out that assumption was wrong.
 */
function shortError(prefix: string, detail: string): string {
  const safe = detail.replace(/re_[A-Za-z0-9_-]+/g, "[redacted]").trim();
  return (safe ? `${prefix}: ${safe}` : prefix).slice(0, ERROR_MAX);
}

function subjectFor(value: InquiryPayload): string {
  const services = labelsFor(INQUIRY_SERVICES, value.services);
  const what = services.length ? services.join(", ") : "General inquiry";
  return `Project inquiry — ${value.name} · ${what}`;
}

/**
 * Plain text. An inquiry is something to read and reply to, not a newsletter.
 *
 * **The attribution block is the half this was missing.** The row carries
 * `page_path`, `referrer` and five UTMs; the email carried none of them, so
 * anyone replying from the inbox could not tell a cold homepage visit from a
 * campaign click without opening the Table Editor. It renders only when there
 * is something in it — a direct visit prints no empty headings.
 *
 * **What is deliberately absent, and it is a list.** No IP address, no user
 * agent, no cookie, no session or GA client id, no request header and no
 * database id. None of those is collected (the table does not have columns for
 * them), and a notification is not the place to start.
 */
function bodyFor(
  value: InquiryPayload,
  attribution: InquiryAttribution,
): string {
  const row = (label: string, v: string) => (v ? `${label}: ${v}` : null);

  const context = [
    row("Page", attribution.pagePath),
    row("Referrer", attribution.referrer),
    row("Campaign source", attribution.utm_source),
    row("Campaign medium", attribution.utm_medium),
    row("Campaign", attribution.utm_campaign),
    row("Campaign content", attribution.utm_content),
    row("Campaign term", attribution.utm_term),
  ].filter((line) => line !== null);

  return [
    "New project inquiry from the Mishram Media website.",
    "",
    row("Name", value.name),
    row("Email", value.email),
    row("Phone", value.phone),
    row("Business", value.business),
    row("Services", labelsFor(INQUIRY_SERVICES, value.services).join(", ")),
    row("Budget", labelsFor(INQUIRY_BUDGETS, [value.budget])[0] ?? ""),
    row("Timeline", labelsFor(INQUIRY_TIMELINES, [value.timeline])[0] ?? ""),
    "",
    "Project:",
    value.message,
    ...(context.length > 0 ? ["", "Where it came from:", ...context] : []),
  ]
    .filter((line) => line !== null)
    .join("\n");
}
