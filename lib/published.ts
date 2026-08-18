import { WORKS, type Work } from "@/lib/artwork";
import { contentFor } from "@/lib/artwork-content";

/**
 * The pieces that have a detail page, in the order the arrows step through.
 *
 * This is the single answer to "which slugs exist". It lived inside
 * `app/artwork/[slug]/page.tsx` while that route was the only caller, but the
 * sitemap needs the same list, and a second copy of these rules would drift:
 * the sitemap would keep offering Google a URL that 404s, or quietly stop
 * offering one that works. Both callers read this file instead.
 */

/* One entry per piece: tiles that are a second crop of something already in
   the list (`sameAs`) are skipped, so prev/next never lands on the same work
   twice and there is only ever one URL for it.

   A piece is here once it has something to show: written copy, or a video.
   The animations qualify on the video alone — the work is the film, and
   gating it on a paragraph nobody has written yet would leave ten pieces
   unplayable for no gain. */
export const published = (): Work[] => {
  const list = WORKS.filter((work) => !work.sameAs && (contentFor(work.id) || work.youtubeId));

  /* WORKS is in layout order, which is reading order on the listing, and that
     is what the arrows should follow. The exception is a series: the design
     interleaves the four still-life sketches with the three Tesla portraits
     down the Studio Drawing canvas, so stepping through alternated between
     the two sets and neither read as a set. Emit each series as one block at
     the position of its first member; everything else keeps its place. */
  const out: Work[] = [];
  const placed = new Set<string>();
  for (const work of list) {
    const series = contentFor(work.id)?.series;
    if (!series) {
      out.push(work);
      continue;
    }
    if (placed.has(series)) continue;
    placed.add(series);
    out.push(...list.filter((item) => contentFor(item.id)?.series === series));
  }
  return out;
};
