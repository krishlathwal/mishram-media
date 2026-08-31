import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { MotionConfig } from "motion/react";

import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/config/schema";
import { BRAND, SITE_URL } from "@/config/site";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { ContactProvider } from "@/components/contact/ContactProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteTransition } from "@/components/transition/RouteTransition";
import { ThemeProvider, themeBootScript } from "@/components/theme/ThemeProvider";

import "./globals.css";

/** Display: tight, confident grotesque for the major statements. */
const display = Archivo({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

/** UI and body copy. */
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

/** Editorial accent — one italic word inside the headline. */
const accent = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--ff-accent",
  display: "swap",
});

export const metadata: Metadata = {
  /**
   * THE PRODUCTION ORIGIN, and every page inherits it.
   *
   * Each route writes `alternates.canonical` and `openGraph.url` as a **path**
   * (`/about`, `/services/…`); Next resolves them against this. Without it the
   * fallback is the deployment's own hostname, so a Vercel preview would
   * publish canonicals pointing at itself. One constant, in `config/site.ts`.
   */
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — Creative growth & digital studio`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "Mishram Media builds creators, brands and digital experiences designed to scale — social and personal brand growth, influencer marketing, performance marketing, web development and custom software.",
  applicationName: BRAND.name,
  /**
   * The homepage's own canonical. Every other route declares one in its own
   * `metadata` (§10j); the root had none, so `/` was the one page on the site
   * whose canonical was whatever origin served it. Relative, like the rest.
   */
  alternates: { canonical: "/" },
  openGraph: {
    title: `${BRAND.name} — Creative growth & digital studio`,
    description:
      "We build creators, brands and digital experiences designed to scale.",
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    url: "/",
  },
  robots: { index: true, follow: true },
  /**
   * The site had no Twitter card, so a share rendered as a bare link even
   * though `opengraph-image` now exists. `summary_large_image` is the only
   * honest card for a 1200×630 asset.
   */
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Creative growth & digital studio`,
    description:
      "We build creators, brands and digital experiences designed to scale.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable} ${accent.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets [data-theme] before first paint so the page never flashes
            the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
          suppressHydrationWarning
        />
        {/* Organisation and site identity, stated once for the whole site.
            Every property is drawn from `config/site.ts` — see the note in
            `config/schema.ts` for what is deliberately absent and why. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]),
          }}
        />
      </head>
      <body className="min-h-full">
        {/* reducedMotion="user" strips transform animation for visitors who ask
            for it, leaving the compositions intact with plain fades. */}
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <ContactProvider>
            {/* One transition for every internal route change on the site —
                service pages, legal pages and anything built later get it
                automatically, because it lives here rather than in a page. */}
            <RouteTransition>
            <a
              href="#hero"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-ink focus:px-4 focus:py-2 focus:text-[0.8125rem] focus:text-canvas"
            >
              Skip to content
            </a>
            <Header />
            <main>{children}</main>
            {/* Outside <main> on purpose: this is the page's footer, not a
                footer belonging to the last section in it. */}
            <Footer />
            <ContactPanel />
            </RouteTransition>
            </ContactProvider>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
