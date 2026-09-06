import "server-only";

import { CONTACT } from "@/config/site";

/**
 * ONE NOTIFICATION EMAIL, SERVER-SIDE, AND IT CANNOT THROW.
 *
 * The same shape `/api/inquiry` has carried since Revision 25: a plain-text
 * email through Resend's REST API by `fetch`, with **no npm package for one
 * HTTP call** (§15), reading the same three environment variables —
 * `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL` (no default, on purpose: it needs a
 * domain verified with the provider) and `INQUIRY_TO_EMAIL` (defaults to the
 * published address). Set on Vercel Production only, so a preview deployment
 * can never email the business.
 *
 * Extracted in Revision 43 so the feedback route could notify without a
 * second copy of the provider call. **`/api/inquiry` still carries its own
 * inline version and was deliberately not touched** — that route's behaviour
 * is locked and this helper is byte-for-byte the same logic; it can adopt
 * this module whenever that route is next reopened.
 *
 * Every path returns an outcome for the caller to write into its row,
 * because by the time this runs the submission is already stored and nothing
 * here is allowed to turn that into a failure.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** How much of a provider's complaint is worth keeping. */
const ERROR_MAX = 200;

export type EmailOutcome = {
  status: "sent" | "failed" | "not_configured";
  /** Short, sanitised, and only ever set alongside `failed`. */
  error?: string;
};

export async function sendNotification({
  subject,
  text,
  replyTo,
  tag,
}: {
  subject: string;
  text: string;
  /** So a reply from the inbox goes straight to the person who wrote in. */
  replyTo?: string;
  /** Prefix for the server log line — which route is speaking. */
  tag: string;
}): Promise<EmailOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
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
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });

    if (response.ok) return { status: "sent" };

    console.error(`[${tag}] provider responded ${response.status}`);
    return {
      status: "failed",
      error: shortError(`provider ${response.status}`, await reason(response)),
    };
  } catch {
    console.error(`[${tag}] provider request failed`);
    return { status: "failed", error: "request failed" };
  }
}

/** The provider's own explanation, when it gives one. */
async function reason(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: unknown };
    return typeof body.message === "string" ? body.message : "";
  } catch {
    return "";
  }
}

/**
 * A short, safe string for an `email_notification_error` column. **Never a
 * stack trace and never a credential** — Resend does not echo the key back,
 * but the redaction is here anyway.
 */
function shortError(prefix: string, detail: string): string {
  const safe = detail.replace(/re_[A-Za-z0-9_-]+/g, "[redacted]").trim();
  return (safe ? `${prefix}: ${safe}` : prefix).slice(0, ERROR_MAX);
}
