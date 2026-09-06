-- ============================================================================
-- TESTIMONIALS — public.testimonials (Revision 43)
--
-- What a brand, creator, client or partner writes on the private `/feedback`
-- page. Written only by `/api/feedback`, on the server, with the project's
-- secret key. **Every row starts `pending` and nothing reads a row to the
-- public site until a person sets it `approved` in the Table Editor.**
--
-- Deliberately its own table. `public.leads` is a sales record with a
-- pipeline; this is editorial material with a moderation state. They share a
-- database and nothing else.
--
-- WHAT IS DELIBERATELY NOT STORED: no IP address, no user agent, no device or
-- browser fingerprint, no cookie, no session id. The email address is kept so
-- Mishram can confirm the words came from the person named, and it is never
-- rendered anywhere.
-- ============================================================================

create table if not exists public.testimonials (
  -- Identity and time.
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- Who wrote it. `name`, `email`, `relationship` and the feedback are the
  -- fields the form requires, so they are the columns that are `not null`.
  name          text not null,
  organization  text,
  role          text,
  relationship  text not null default 'other',
  email         text not null,
  profile_url   text,

  -- The words, as typed. Never edited in place: a published excerpt is a
  -- display decision, and the original stays here untouched.
  testimonial   text not null,

  -- Permissions, each an explicit tick. `consent` is the publish permission
  -- and the CHECK below makes a row without it impossible, not merely
  -- unexpected. The three display flags default to the most private answer.
  consent                       boolean not null default false,
  display_name_allowed          boolean not null default false,
  display_organization_allowed  boolean not null default false,
  media_allowed                 boolean not null default false,

  -- Moderation. Edited by hand in the Table Editor. `featured` picks the one
  -- quote the homepage leads with; with none set, the newest approved leads.
  status    text    not null default 'pending',
  featured  boolean not null default false,

  -- Where it came from. 'feedback_form' for the page; anything else is a
  -- future channel and is named when it exists.
  source    text not null default 'feedback_form',

  -- Written by the route after the insert: what the Resend notification did.
  -- Never affects whether the submission was captured.
  email_notification_status text not null default 'pending',
  email_notification_error  text,

  constraint testimonials_relationship_check
    check (relationship in ('brand', 'creator', 'client', 'partner', 'other')),

  constraint testimonials_consent_check
    check (consent = true),

  constraint testimonials_status_check
    check (status in ('pending', 'approved', 'rejected')),

  constraint testimonials_email_notification_status_check
    check (email_notification_status in ('pending', 'sent', 'failed', 'not_configured'))
);

-- ── Indexes ────────────────────────────────────────────────────────────────
-- Two. The public read is `status = 'approved'` ordered by `featured`, then
-- newest first; the dashboard reads newest first. Nothing else is queried.

create index if not exists testimonials_status_created_idx
  on public.testimonials (status, featured desc, created_at desc);
create index if not exists testimonials_created_at_idx
  on public.testimonials (created_at desc);

-- ── Row Level Security ─────────────────────────────────────────────────────
-- RLS ON, AND DELIBERATELY NO POLICIES — the same design as `public.leads`.
-- A table with RLS enabled and zero policies denies every read and write to
-- `anon` and `authenticated`. The browser never touches this table: the form
-- posts to `/api/feedback`, and the homepage reads approved rows on the
-- server. Both use the secret key, whose role bypasses RLS by design.

alter table public.testimonials enable row level security;

revoke all on table public.testimonials from anon, authenticated;

-- ── Dashboard legibility ───────────────────────────────────────────────────

comment on table public.testimonials is
  'Feedback submitted through the private /feedback page. Every row starts pending; set status to approved to publish it on the homepage, rejected to keep it off. Written only by /api/feedback with the server-side secret key; RLS denies all browser access.';

comment on column public.testimonials.status is
  'Moderation state, edited by hand: pending (default — never shown), approved (shown on the homepage), rejected (never shown).';
comment on column public.testimonials.featured is
  'Tick exactly one approved row to lead the homepage section with it. With none ticked the newest approved row leads.';
comment on column public.testimonials.consent is
  'The person''s explicit permission to publish. Always true — the CHECK constraint refuses a row without it.';
comment on column public.testimonials.display_name_allowed is
  'Whether the name may be shown. When false the site says what the relationship was instead — never the name.';
comment on column public.testimonials.display_organization_allowed is
  'Whether the company or creator name may be shown.';
comment on column public.testimonials.media_allowed is
  'Whether a logo or profile photo may be used alongside the quote. Recorded only; no media is collected or shown yet.';
comment on column public.testimonials.relationship is
  'How they worked with Mishram: brand, creator, client, partner, other. Also the wording used for an anonymous quote.';
comment on column public.testimonials.email is
  'To confirm the feedback is theirs and to reach them about it. Never rendered.';
comment on column public.testimonials.email_notification_status is
  'Whether the Resend notification for this row went out: pending, sent, failed, not_configured. Never affects whether the submission was captured.';
