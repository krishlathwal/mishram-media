import type { Metadata } from "next";

import { LegalArticle } from "@/components/legal/LegalArticle";
import { getLegalDoc, legalPath } from "@/config/legal";
import { BRAND } from "@/config/site";

const DOC = getLegalDoc("privacy");

/**
 * Content, and the audit of what it replaced, live in `config/legal.ts`. This
 * route is the shell: the shared `LegalArticle`, the global Header, Footer V2
 * and the site-wide route transition, and nothing else.
 */
export const metadata: Metadata = {
  title: DOC.metadata.title,
  description: DOC.metadata.description,
  alternates: { canonical: legalPath(DOC.slug) },
  openGraph: {
    title: `${DOC.metadata.title} — ${BRAND.name}`,
    description: DOC.metadata.description,
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    url: legalPath(DOC.slug),
  },
};

export default function Page() {
  return <LegalArticle doc={DOC} />;
}
