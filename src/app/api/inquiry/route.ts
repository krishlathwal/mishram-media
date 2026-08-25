import { CONTACT } from "@/config/site";
import {
  INQUIRY_BUDGETS,
  INQUIRY_SERVICES,
  INQUIRY_TIMELINES,
  coerceInquiry,
  labelsFor,
  validateInquiry,
  type InquiryPayload,
} from "@/config/inquiry";

/**
 * POST /api/inquiry — delivers a project inquiry.
 *
 * **Server-side on purpose.** The browser never holds a provider credential and
 * never talks to an email API directly; it posts here, and this route is the
 * only thing that knows the key.
 *
 * **It delivers, and that is all it does.** No database, no file, no log of the
 * message. There is nowhere for an inquiry to sit on this server — which is
 * also why the microcopy under the form can honestly say the details are only
 * used to reply.
 *
 * Delivery is a plain `fetch` against Resend's REST API rather than their npm
 * package: one less runtime dependency for one HTTP call (§15, §16).
 *
 * RESPONSES
 *
 * | Status | `error` | Meaning |
 * | --- | --- | --- |
 * | 200 | — | Delivered (or silently swallowed as spam) |
 * | 400 | `invalid_request` | Body was not JSON |
 * | 400 | `validation` | Field errors, returned in `fields` |
 * | 503 | `delivery_not_configured` | No key/sender/recipient — the client offers WhatsApp |
 * | 502 | `delivery_failed` | The provider rejected it |
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

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

  const errors = validateInquiry(value);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "validation", fields: errors }, 400);
  }

  // Honeypot. A field no real visitor can see or tab to, so anything in it came
  // from something filling the form blind. Answer exactly as a success would,
  // and deliver nothing — telling a bot why it failed only helps it.
  if (value.companyWebsite) {
    return json({ ok: true }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  // The published address is the sensible default recipient; the sender has no
  // default, because it needs a domain verified with the provider and pretending
  // otherwise would fail at send time instead of here.
  const to = process.env.INQUIRY_TO_EMAIL || CONTACT.email;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !from || !to) {
    return json({ ok: false, error: "delivery_not_configured" }, 503);
  }

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
        text: bodyFor(value),
      }),
    });

    if (!response.ok) {
      // The status is worth knowing; the inquiry's contents are not ours to log.
      console.error(`[inquiry] provider responded ${response.status}`);
      return json({ ok: false, error: "delivery_failed" }, 502);
    }
  } catch {
    console.error("[inquiry] provider request failed");
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  return json({ ok: true }, 200);
}

function subjectFor(value: InquiryPayload): string {
  const services = labelsFor(INQUIRY_SERVICES, value.services);
  const what = services.length ? services.join(", ") : "General inquiry";
  return `Project inquiry — ${value.name} · ${what}`;
}

/** Plain text. An inquiry is something to read and reply to, not a newsletter. */
function bodyFor(value: InquiryPayload): string {
  const row = (label: string, v: string) => (v ? `${label}: ${v}` : null);

  return [
    "New project inquiry from the Mishram Media homepage.",
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
  ]
    .filter((line) => line !== null)
    .join("\n");
}
