"use client";

import { useCallback, useEffect } from "react";

import {
  EMPTY_ATTRIBUTION,
  UTM_PARAMS,
  type InquiryAttribution,
  type UtmParam,
} from "@/config/inquiry";

/**
 * WHERE THE INQUIRY CAME FROM — and nothing else.
 *
 * Outreach and paid campaigns are coming, and a lead nobody can attribute is a
 * campaign nobody can judge. This reads the five standard `utm_*` parameters
 * off the URL the visitor arrived on, plus the site that sent them, and hands
 * them to the form at submit time.
 *
 * **IT IS NOT ANALYTICS, AND THE DIFFERENCE IS DELIBERATE.** No identifier is
 * generated, no cookie is set, nothing is sent anywhere until the visitor
 * presses submit, and if they never submit, nothing ever leaves the device. No
 * IP address, no user agent, no fingerprint, no page-view beacon, no library
 * (§15 — the cookie policy can only say what it says because nothing like that
 * exists here).
 *
 * **`sessionStorage`, not a cookie, and not `localStorage`.**
 * - A cookie would travel on every request and would need a consent banner.
 * - `localStorage` would outlive the visit — a campaign parameter is about
 *   *this* visit, and one still sitting there in November would attribute a
 *   February lead to the wrong ad.
 * - `sessionStorage` is scoped to the tab and dies when it closes, which is
 *   exactly the lifetime of the thing being remembered.
 *
 * **First touch wins.** The stored entry is written once and never overwritten,
 * so a visitor who arrives from an ad, reads three service pages and then fills
 * the form is still credited to the ad rather than to the last page they were
 * on. Internal navigation cannot launder the source.
 *
 * The referrer is kept **only when it is external**. A same-origin referrer is
 * just the previous page of this site — it says nothing about where the visit
 * came from, and storing it would be noise in the leads table.
 *
 * Every storage call is wrapped: private windows, disabled site data and
 * embedded webviews all throw here, and attribution is metadata that must never
 * be able to cost somebody their inquiry. When storage is unavailable the
 * getter falls back to reading the live URL, which covers the common case of
 * landing on a campaign URL and submitting from that same page.
 */

/** Tab-scoped, and named like the one other thing this site stores. */
const KEY = "mishram-attribution";

/** The half that is remembered across a visit. `pagePath` is read at submit. */
type Stored = Record<UtmParam, string> & { referrer: string };

function utmsFrom(search: string): Record<UtmParam, string> {
  const params = new URLSearchParams(search);
  return Object.fromEntries(
    UTM_PARAMS.map((key) => [key, (params.get(key) ?? "").trim()]),
  ) as Record<UtmParam, string>;
}

/** `document.referrer`, but empty for anything on this origin. */
function externalReferrer(): string {
  const referrer = document.referrer;
  if (!referrer) return "";
  try {
    if (new URL(referrer).origin === window.location.origin) return "";
  } catch {
    return "";
  }
  return referrer;
}

function hasAnything(stored: Stored): boolean {
  return Boolean(stored.referrer) || UTM_PARAMS.some((key) => stored[key]);
}

export function useInquiryAttribution(): () => InquiryAttribution {
  // Capture on mount — the form is on every content route, so the first page a
  // campaign visitor lands on is one that runs this.
  useEffect(() => {
    try {
      // First touch wins: never overwrite an entry this visit already has.
      if (window.sessionStorage.getItem(KEY)) return;

      const stored: Stored = {
        ...utmsFrom(window.location.search),
        referrer: externalReferrer(),
      };

      // A direct visit with no campaign and no referrer has nothing to
      // remember. Writing an empty object would only claim a later page's
      // referrer as the source.
      if (!hasAnything(stored)) return;

      window.sessionStorage.setItem(KEY, JSON.stringify(stored));
    } catch {
      // Storage unavailable. The getter reads the URL directly instead.
    }
  }, []);

  return useCallback((): InquiryAttribution => {
    // The route the brief was actually submitted from — always current, never
    // stored, because it is a fact about the submission rather than the visit.
    const pagePath = window.location.pathname;

    try {
      const stored = window.sessionStorage.getItem(KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Stored>;
        const utms = Object.fromEntries(
          UTM_PARAMS.map((key) => [key, parsed[key] ?? ""]),
        ) as Record<UtmParam, string>;

        return { ...utms, referrer: parsed.referrer ?? "", pagePath };
      }
    } catch {
      // Unreadable or unavailable — fall through to the live URL.
    }

    return {
      ...EMPTY_ATTRIBUTION,
      ...utmsFrom(window.location.search),
      referrer: externalReferrer(),
      pagePath,
    };
  }, []);
}
