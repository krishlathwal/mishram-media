import { Arrow } from "@/components/ui/Arrow";
import { PageLink } from "@/components/ui/PageLink";
import { adjacentServicePages } from "@/config/service-pages";

/**
 * PREVIOUS / NEXT SERVICE — built, and currently rendering nothing.
 *
 * `adjacentServicePages` reads `BUILT_SERVICE_PAGES`, so a neighbour whose
 * route does not exist comes back `null` and produces no link. Exactly one
 * service page is built today, so both neighbours are null and this returns
 * `null` — **the rail appears on its own the moment a second route ships, with
 * no change here.**
 *
 * That is the whole reason it exists now: the alternative is a rail added later
 * that has to be threaded through every page, or worse, four dead links to
 * routes that 404. Same argument as Recognition and Client Notes on the
 * homepage — no placeholder is the honest state.
 */
export function ServicePageNav({ slug }: { slug: string }) {
  const { previous, next } = adjacentServicePages(slug);
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Services"
      className="relative w-full border-t border-line bg-canvas"
    >
      <div className="page-x grid gap-y-px py-14 md:grid-cols-2 md:py-16">
        {previous ? (
          <PageLink href={previous.path} className="svp-pagenav group">
            <span className="caps text-ink-muted">Previous service</span>
            <span className="svp-pagenav-title">
              <Arrow
                size={13}
                className="rotate-180 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:-translate-x-1"
              />
              {previous.title}
            </span>
          </PageLink>
        ) : (
          <span aria-hidden />
        )}

        {next ? (
          <PageLink href={next.path} className="svp-pagenav svp-pagenav--end group">
            <span className="caps text-ink-muted">Next service</span>
            <span className="svp-pagenav-title">
              {next.title}
              <Arrow
                size={13}
                className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              />
            </span>
          </PageLink>
        ) : null}
      </div>
    </nav>
  );
}
