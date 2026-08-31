-- ============================================================================
-- LEAD CAPTURE — public.leads
--
-- The one table behind the project inquiry form (§10h). Everything a visitor
-- types into `/api/inquiry`, plus where they came from, plus two operational
-- columns for following the lead up by hand in the Supabase Table Editor.
--
-- THE DATABASE IS THE SOURCE OF TRUTH, THE EMAIL IS A NOTIFICATION. The route
-- inserts first and only then attempts Resend, so a delivery failure can never
-- lose an inquiry — it only changes `email_notification_status`.
--
-- WHAT IS DELIBERATELY NOT STORED: no IP address, no user agent, no device or
-- browser fingerprint, no cookie, no session id, no password. This is a sales
-- record, not a tracking record, and the privacy policy says exactly that.
-- ============================================================================

create table if not exists public.leads (
  -- Identity and time.
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- The brief, as typed. `name`, `email` and `message` are the three fields the
  -- form requires, so they are the three columns that are `not null`.
  name        text        not null,
  email       text        not null,
  phone       text,
  business    text,
  -- The multi-select, stored as an array rather than a joined string so it can
  -- be filtered on (`services @> '{web}'`) without parsing text.
  services    text[]      not null default '{}',
  budget      text,
  timeline    text,
  message     text        not null,

  -- Attribution. `source` is the channel this row arrived through and stays
  -- 'website' for a normal form submission; the campaign that sent them is a
  -- separate question, answered by the utm_* columns.
  source        text      not null default 'website',
  page_path     text,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text,

  -- Operational. Edited by hand in the Table Editor while working a lead.
  status                    text not null default 'new',
  -- Written by the route: 'pending' at insert, then one of the three outcomes.
  email_notification_status text not null default 'pending',
  -- A short sanitised reason when delivery failed. Never a stack trace, never
  -- a credential, never the provider's raw response body.
  email_notification_error  text,

  constraint leads_status_check
    check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),

  constraint leads_email_notification_status_check
    check (email_notification_status in ('pending', 'sent', 'failed', 'not_configured'))
);

-- ── Indexes ────────────────────────────────────────────────────────────────
-- Three, and no more. This is a small operational table read by a person in a
-- dashboard, not an analytics store: the newest-first list, the pipeline
-- filter, and looking someone up by the address they wrote in with.

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_email_idx      on public.leads (email);

-- ── Row Level Security ─────────────────────────────────────────────────────
-- RLS ON, AND DELIBERATELY NO POLICIES. A table with RLS enabled and zero
-- policies denies every read and every write to `anon` and `authenticated`,
-- which is exactly right: the browser must never touch this table.
--
-- The only writer is `/api/inquiry`, running on the server with the project's
-- secret key. That key's role bypasses RLS by design, so it needs no policy —
-- and adding one would only widen the surface.
--
-- Grants are revoked as well as denied. RLS alone would be enough, but a future
-- policy added without thinking would then have no table privileges behind it
-- to accidentally open.

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;

-- ── Dashboard legibility ───────────────────────────────────────────────────
-- These render as descriptions in the Table Editor, so whoever works the leads
-- can read the table without reading this file.

comment on table public.leads is
  'Project inquiries from the Mishram Media website. Written only by /api/inquiry using the server-side secret key; RLS denies all browser access.';

comment on column public.leads.services is
  'Selected service option ids from config/inquiry.ts (social, influencer, performance, web, software, shoots, unsure).';
comment on column public.leads.budget is
  'Engagement budget range option id, never media spend.';
comment on column public.leads.source is
  'Channel this lead arrived through. ''website'' for the inquiry form; the campaign is recorded in utm_source.';
comment on column public.leads.status is
  'Sales pipeline stage, edited by hand: new, contacted, qualified, won, lost, spam.';
comment on column public.leads.email_notification_status is
  'Whether the Resend notification for this row went out: pending, sent, failed, not_configured. Never affects whether the lead was captured.';
