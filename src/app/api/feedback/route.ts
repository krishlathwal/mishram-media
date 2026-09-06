import { leadStore } from "@/lib/supabase/server";
import { sendNotification } from "@/lib/email/notify";
import {
  coerceFeedback,
  relationshipLabel,
  validateFeedback,
  type FeedbackPayload,
} from "@/config/feedback";

/**
 * POST /api/feedback — captures a testimonial submission.
 *
 * The same shape as `/api/inquiry`, on purpose, and the same order:
 *
 * ```
 * validate → honeypot → INSERT (pending) → notify → mark the notification → respond
 * ```
 *
 * **The database is the source of truth and the email is a notification.**
 * The insert happens before the email, so a delivery failure cannot lose a
 * submission; a failed insert returns an error and no success is faked.
 *
 * **Every row is inserted as `pending`.** This route has no way to approve
 * anything — the column's default is `pending`, the route never writes
 * `status`, and the public read filters on `approved`. Publication is a
 * person's decision in the Table Editor, never a side effect of a POST.
 *
 * SPAM. The honeypot answers exactly as a success would and stores nothing;
 * the validator refuses a testimonial carrying two or more links and requires
 * the consent tick to be a real `true`. Rate limiting is **not** application
 * code here either (§10h): the inquiry endpoint's Vercel Firewall rule is
 * scoped to `/api/inquiry` and was deliberately left alone. The matching rule
 * for this route — `path == /api/feedback` and `method == POST`, fixed window,
 * a handful per IP per ten minutes, `deny`, **and never `actionDuration`**
 * (§10as) — is documented in the brief's §10au and is an account action.
 *
 * RESPONSES
 *
 * | Status | `error` | Meaning |
 * | --- | --- | --- |
 * | 200 | — | **Captured as pending.** Also the honeypot's answer |
 * | 400 | `invalid_request` | Body was not JSON |
 * | 400 | `validation` | Field errors, returned in `fields` |
 * | 503 | `storage_not_configured` | No Supabase URL/key — nowhere to put it |
 * | 502 | `storage_failed` | The database rejected the insert |
 */

const TABLE = "testimonials";

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

  const value = coerceFeedback(raw);

  const errors = validateFeedback(value);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "validation", fields: errors }, 400);
  }

  // Honeypot — before the store check, so a bot cannot probe whether the
  // database is configured. Answer as a success would; store nothing.
  if (value.companyWebsite) {
    return json({ ok: true }, 200);
  }

  const store = leadStore();
  if (!store) {
    return json({ ok: false, error: "storage_not_configured" }, 503);
  }

  // ── 1. CAPTURE, AS PENDING ──────────────────────────────────────────────
  const { data, error } = await store
    .from(TABLE)
    .insert(rowFor(value))
    .select("id")
    .single();

  if (error || !data) {
    console.error(`[feedback] insert failed: ${error?.message ?? "no row"}`);
    return json({ ok: false, error: "storage_failed" }, 502);
  }

  const id = data.id as string;

  // ── 2. NOTIFY ───────────────────────────────────────────────────────────
  const outcome = await sendNotification({
    subject: subjectFor(value),
    text: bodyFor(value),
    replyTo: value.email,
    tag: "feedback",
  });

  // ── 3. RECORD WHAT THE NOTIFICATION DID ─────────────────────────────────
  const marked = await store
    .from(TABLE)
    .update({
      email_notification_status: outcome.status,
      email_notification_error: outcome.error ?? null,
    })
    .eq("id", id);

  if (marked.error) {
    console.error(
      `[feedback] notification status not recorded: ${marked.error.message}`,
    );
  }

  return json({ ok: true }, 200);
}

/**
 * The row. Trimmed already by `coerceFeedback`; the address is lowercased so
 * one person is one person in the Table Editor; optional text goes in as
 * `null`. **`status` is not set here** — the column default is `pending`, and
 * this route has no business writing anything else.
 */
function rowFor(value: FeedbackPayload) {
  const orNull = (v: string) => (v.length > 0 ? v : null);

  return {
    name: value.name,
    organization: orNull(value.organization),
    role: orNull(value.role),
    relationship: value.relationship,
    email: value.email.toLowerCase(),
    profile_url: orNull(value.profileUrl),
    testimonial: value.testimonial,
    consent: value.consent,
    display_name_allowed: value.displayName,
    display_organization_allowed: value.displayOrganization,
    media_allowed: value.mediaAllowed,
    source: "feedback_form",
  };
}

function subjectFor(value: FeedbackPayload): string {
  const who = value.organization
    ? `${value.name} / ${value.organization}`
    : value.name;
  return `New testimonial submission — ${who}`;
}

/**
 * Plain text, for a person to read and act on. It says what to do next in
 * its first line, because the whole point of the notification is the
 * approval step.
 */
function bodyFor(value: FeedbackPayload): string {
  const row = (label: string, v: string) => (v ? `${label}: ${v}` : null);
  const yesNo = (v: boolean) => (v ? "yes" : "no");

  return [
    "New feedback from the Mishram Media website.",
    "It is stored as PENDING and is not shown anywhere until you set its status to approved in the Supabase Table Editor (public.testimonials).",
    "",
    row("Name", value.name),
    row("Organisation", value.organization),
    row("Role", value.role),
    row("Worked together", relationshipLabel(value.relationship)),
    row("Email", value.email),
    row("Profile", value.profileUrl),
    "",
    "Feedback:",
    value.testimonial,
    "",
    "Permissions:",
    `Publish: ${yesNo(value.consent)}`,
    `Show name: ${yesNo(value.displayName)}`,
    `Show organisation: ${yesNo(value.displayOrganization)}`,
    `Logo / photo: ${yesNo(value.mediaAllowed)}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
