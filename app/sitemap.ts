import type { MetadataRoute } from "next";

import { published } from "@/lib/published";
import { SITE_URL } from "@/lib/site";

/**
 * Every page this site has, for search engines.
 *
 * Worth having because 48 of the 52 are artwork detail pages, and the only
 * route to them is a tile on a 9000px canvas that lazy-loads — findable by a
 * person scrolling, much less certain for a crawler.
 *
 * The slugs come from `published()`, the same call `generateStaticParams`
 * uses, so this file cannot list a page that was never built.
 *
 * No `lastModified`: it would have to be the build time, and stamping all 52
 * as freshly changed on every deploy is a claim that isn't true. `priority`
 * and `changeFrequency` are left out for the same reason — Google ignores
 * both, so setting them would only be decoration.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string) => new URL(path, SITE_URL).href;

  return [
    { url: at("/") },
    { url: at("/artwork") },
    { url: at("/resume") },
    { url: at("/contact") },
    ...published().map((work) => ({ url: at(`/artwork/${work.slug}`) })),
  ];
}
