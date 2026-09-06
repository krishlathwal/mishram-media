import "server-only";

import { RELATIONSHIP_AUTHOR } from "@/config/feedback";
import type { Testimonial } from "@/config/testimonials";
import { leadStore } from "@/lib/supabase/server";

/**
 * THE PUBLIC READ — approved testimonials, on the server, and nowhere else.
 *
 * The homepage calls this while rendering (`app/page.tsx` revalidates hourly),
 * so the section is plain HTML by the time it reaches a browser: **no client
 * Supabase call, no subscription, no polling, no key in the bundle.** A row
 * appears on the site within an hour of somebody setting it `approved` in the
 * Table Editor, and disappears the same way.
 *
 * **It cannot fail the page.** No configuration, a network error or a database
 * error all resolve to an empty list, and an empty list is a homepage with no
 * Client Notes section — which is exactly the state the site shipped in for
 * forty revisions and is always an honest one. A missing section is never a
 * broken build.
 *
 * WHAT THE PUBLIC SHAPE HIDES. The row holds a name, an organisation and an
 * email; the shape handed to the component holds only what the person ticked
 * permission for. The name becomes the relationship line (*"A brand we worked
 * with"*) unless `display_name_allowed`; the organisation is dropped unless
 * `display_organization_allowed`; the email never leaves this function.
 */

const TABLE = "testimonials";

/** How many approved quotes the section will show at most. */
const MAX = 6;

type Row = {
  id: string;
  name: string;
  organization: string | null;
  role: string | null;
  relationship: string;
  testimonial: string;
  display_name_allowed: boolean;
  display_organization_allowed: boolean;
  featured: boolean;
};

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const store = leadStore();
  if (!store) return [];

  try {
    const { data, error } = await store
      .from(TABLE)
      .select(
        "id, name, organization, role, relationship, testimonial, display_name_allowed, display_organization_allowed, featured",
      )
      .eq("status", "approved")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(MAX);

    if (error || !data) {
      console.error(`[testimonials] read failed: ${error?.message ?? "no data"}`);
      return [];
    }

    return (data as Row[]).map(toPublic);
  } catch {
    console.error("[testimonials] read threw");
    return [];
  }
}

function toPublic(row: Row): Testimonial {
  const showName = row.display_name_allowed;
  const showOrg = row.display_organization_allowed && Boolean(row.organization);

  return {
    id: row.id,
    quote: row.testimonial,
    author: showName
      ? row.name
      : (RELATIONSHIP_AUTHOR[row.relationship] ?? RELATIONSHIP_AUTHOR.other),
    // A role is a fact about a named person; without the name it is dropped
    // rather than left hanging as "Founder" beside "A brand we worked with".
    role: showName && row.role ? row.role : undefined,
    company: showOrg ? (row.organization ?? undefined) : undefined,
    sourceNote: "Submitted through /feedback and approved in the Supabase Table Editor.",
  };
}
