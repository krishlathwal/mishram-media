import {
  BRAND,
  CONTACT,
  SITE_URL,
  VERIFIED_SOCIAL_LINKS,
} from "./site";

/**
 * ORGANIZATION STRUCTURED DATA — and every field in it is already published
 * somewhere on this site.
 *
 * The site carried none, so a search engine had to infer the company's name,
 * contact details and social profiles from rendered copy. This states them.
 *
 * **`Organization`, not `ProfessionalService`.** The richer local-business
 * types expect `priceRange`, `openingHours` and an `areaServed`, and this
 * project has verified values for none of them — a schema is a machine-readable
 * claim, and padding one out is the same offence as inventing a statistic in
 * body copy. Every property below is drawn from `config/site.ts`, which §10s
 * records as user-confirmed first-party information:
 *
 * | Property | Source |
 * | --- | --- |
 * | `name`, `url` | `BRAND`, `SITE_URL` |
 * | `email`, `telephone` | `CONTACT` — the same pair the contact panel shows |
 * | `address` | `CONTACT.address` |
 * | `sameAs` | `VERIFIED_SOCIAL_LINKS` — the profiles that have a URL, so an unverified one can never leak in |
 * | `logo`, `image` | The approved wordmark and the social card |
 *
 * **No `aggregateRating`, no `review`, no `founder`, no `numberOfEmployees`,
 * no `foundingDate`.** The first two would be fabricated outright; the founder
 * is deliberately unnamed on this site (§10r); and the 2021/2023/2025
 * chronology is a set of milestones rather than an incorporation date, so
 * publishing one of them as `foundingDate` would be asserting something the
 * source does not say.
 */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND.name,
  alternateName: BRAND.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  description:
    "Mishram Media builds creators, brands and digital experiences designed to scale — social and personal brand growth, influencer marketing, performance marketing, web development and custom software.",
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address,
    addressCountry: "IN",
  },
  sameAs: VERIFIED_SOCIAL_LINKS.map((s) => s.href),
} as const;

/**
 * The site as a thing, pointed at the organisation that publishes it. Two
 * small objects rather than one overloaded node, which is what the two `@id`s
 * are for.
 */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
} as const;
