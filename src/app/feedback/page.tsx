import type { Metadata } from "next";

import { FeedbackArticle } from "@/components/feedback/FeedbackArticle";
import { FEEDBACK_COPY, FEEDBACK_PATH } from "@/config/feedback";

/**
 * `/feedback` — the private testimonial intake (Revision 43).
 *
 * **Not a public page in the discovery sense.** It is not in the navigation,
 * the footer or the sitemap, and it answers `noindex`: Mishram sends the link
 * to a brand, creator, client or partner they have worked with, and that is
 * the only way anyone arrives here. It is still a real route on the real
 * domain, so it wears the site's header, footer and transition like every
 * other page.
 *
 * Copy and the form's shape live in `config/feedback.ts`; delivery is
 * `app/api/feedback/route.ts`; what happens to a submission afterwards is a
 * person's decision in the Supabase Table Editor, never this page's.
 */
export const metadata: Metadata = {
  title: FEEDBACK_COPY.metadata.title,
  description: FEEDBACK_COPY.metadata.description,
  robots: { index: false, follow: true },
  alternates: { canonical: FEEDBACK_PATH },
};

export default function Page() {
  return <FeedbackArticle />;
}
