import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * THE SERVER-SIDE SUPABASE CLIENT — and there is deliberately no other one.
 *
 * **The browser never talks to Supabase.** There is no client provider, no
 * publishable key in the bundle, no `useSupabase` hook and no direct insert
 * from the form. The form posts to `/api/inquiry`; that route validates, and
 * only that route writes. `import "server-only"` makes it a build error rather
 * than a review question — importing this file from a client component fails
 * the build.
 *
 * The credential is a **secret** key, so it is never `NEXT_PUBLIC_`, never
 * logged and never returned in a response. Its role bypasses Row Level
 * Security by design, which is why `public.leads` needs no policy at all: RLS
 * is on with zero policies, denying `anon` and `authenticated` everything, and
 * this key is the single exception.
 *
 * **Two names, because Supabase is mid-migration.** Projects now issue
 * `sb_secret_…` keys alongside the legacy `service_role` JWT, and both
 * authenticate the same way. `SUPABASE_SECRET_KEY` wins when present so a
 * project on the new scheme needs no code change; `SUPABASE_SERVICE_ROLE_KEY`
 * keeps working for one on the old one.
 *
 * Scope is minimal on purpose. No Auth, no Realtime, no Storage, no ORM — one
 * table, one insert, one update. `@supabase/supabase-js` is the only database
 * dependency this project has (§15).
 */

const url = process.env.SUPABASE_URL;
const secret =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Built once per server instance, and only when it can actually be used. */
let client: SupabaseClient | null = null;

/**
 * The client, or `null` when the project is not configured.
 *
 * Returning `null` rather than throwing keeps the "not configured" case a
 * normal branch the route already has to handle, instead of an exception that
 * would read as a failure the visitor caused. The route checks it **before**
 * telling a visitor anything: with no database there is no honest success to
 * report, so it answers `storage_not_configured` and the form offers WhatsApp —
 * the same discipline §10h applied to email delivery, now applied to the thing
 * that actually matters.
 */
export function leadStore(): SupabaseClient | null {
  if (!url || !secret) return null;

  client ??= createClient(url, secret, {
    auth: {
      // Nothing here has a session. Persisting or refreshing one on a
      // serverless instance would be state that outlives the request.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: { "X-Client-Info": "mishram-media-inquiry" },
    },
  });

  return client;
}
