import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArtworkSwipe from "@/components/ArtworkSwipe";
import { WORKS } from "@/lib/artwork";
import { contentFor } from "@/lib/artwork-content";
import s from "./page.module.css";

/**
 * Detail view for one piece — frame `Artwork inside show 1440` (373:210).
 *
 * It is a full-screen overlay rather than a page in the site chrome: no
 * header, no footer, an opaque ground, a close control and prev/next arrows.
 * The route is real (not a modal) so the view has its own URL, the browser
 * back button works, and prev/next are ordinary links.
 *
 * All four widths are drawn: 390, 768, 1440 and 1920, every one of them 790
 * tall. The CSS scales that frame to whatever the viewport is, so it always
 * fills the screen without scrolling.
 */

/* One entry per piece: tiles that are a second crop of something already in
   the list (`sameAs`) are skipped, so prev/next never lands on the same work
   twice and there is only ever one URL for it.

   A piece is here once it has something to show: written copy, or a video.
   The animations qualify on the video alone — the work is the film, and
   gating it on a paragraph nobody has written yet would leave ten pieces
   unplayable for no gain. */
const published = () => {
  const list = WORKS.filter((work) => !work.sameAs && (contentFor(work.id) || work.youtubeId));

  /* WORKS is in layout order, which is reading order on the listing, and that
     is what the arrows should follow. The exception is a series: the design
     interleaves the four still-life sketches with the three Tesla portraits
     down the Studio Drawing canvas, so stepping through alternated between
     the two sets and neither read as a set. Emit each series as one block at
     the position of its first member; everything else keeps its place. */
  const out: typeof list = [];
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

/* Falls back to the alt text, which is a plain description of the piece, so a
   video that has no write-up yet still gets a heading rather than an empty
   one. Real titles replace these as todo 8 gets filled in. */
const titleFor = (work: (typeof WORKS)[number]) => contentFor(work.id)?.title ?? work.alt;

export function generateStaticParams() {
  return published().map((work) => ({ slug: work.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = published().find((item) => item.slug === slug);
  if (!work) return {};
  const content = contentFor(work.id);
  return { title: titleFor(work), description: content?.description };
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;

  const list = published();
  const index = list.findIndex((work) => work.slug === slug);
  const work = list[index];
  if (!work) notFound();
  const content = contentFor(work.id);

  // Wraps around the published order. With a single piece there is nowhere to
  // go, so the arrows are left out rather than rendered inert.
  const many = list.length > 1;
  const prev = many ? list[(index - 1 + list.length) % list.length] : null;
  const next = many ? list[(index + 1) % list.length] : null;

  return (
    <main className={s.page}>
      <ArtworkSwipe prev={prev?.slug} next={next?.slug} />

      <div className={s.stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.rings} src="/assets/decor/rings-detail.svg" alt="" aria-hidden />

        {/* Only the piece travels on a swipe. The rings, the arrows and the
            close control belong to the viewer rather than to the work, so
            they stay put and the page appears to turn inside them. */}
        <div className={s.piece} data-swipe-stage>
          <div className={s.figure}>
            {work.youtubeId ? (
              /* nocookie: YouTube then sets nothing until the visitor actually
                 presses play, which keeps the page clear of a consent banner.
                 The player is the one thing on this route worth a live frame,
                 so it is not lazy — it is the whole reason the page exists. */
              <iframe
                className={s.video}
                src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}?rel=0`}
                title={titleFor(work)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <Image
                src={work.src}
                alt={work.alt}
                fill
                sizes="(min-width: 1200px) 680px, (min-width: 768px) 454px, 278px"
                quality={90}
                priority
              />
            )}
          </div>

          <h1 className={s.title}>{titleFor(work)}</h1>
          {content?.description && <p className={s.description}>{content.description}</p>}

          {content && content.meta.length > 0 && (
            <dl className={s.meta}>
              {content.meta.map((field) => (
                <div className={s.metaField} key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {prev && (
          <Link className={`${s.arrow} ${s.prev}`} href={`/artwork/${prev.slug}`} rel="prev">
            <span className="srOnly">Previous piece</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/icons/chevron.svg" alt="" aria-hidden />
          </Link>
        )}

        {next && (
          <Link className={`${s.arrow} ${s.next}`} href={`/artwork/${next.slug}`} rel="next">
            <span className="srOnly">Next piece</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/icons/chevron.svg" alt="" aria-hidden />
          </Link>
        )}

        {/* Returns to the listing at the category the piece belongs to, which
            is as close to "where you were" as a plain link can get. */}
        <Link className={s.close} href={`/artwork#region-${work.category}`}>
          <span className="srOnly">Back to artwork</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/close.svg" alt="" aria-hidden />
        </Link>
      </div>
    </main>
  );
}
