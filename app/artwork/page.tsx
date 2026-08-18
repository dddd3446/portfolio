import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ArtworkNav from "@/components/ArtworkNav";
import {
  BREAKPOINTS,
  CANVAS_HEIGHT,
  CATEGORIES,
  WAVES,
  WORKS,
  type Box,
  type Crop,
  type PerBp,
  type Work,
} from "@/lib/artwork";
import { contentFor } from "@/lib/artwork-content";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Artwork" };

/* Every measurement is a Figma px on that band's stage. Emitting rem keeps the
   composition proportional as the root font size scales with the viewport. */
const rem = (px: number) => `${px / 16}rem`;

type Vars = Record<string, string>;

/** Frame box per band, re-based onto the category region that contains it. */
function boxVars(box: PerBp<Box>, top: PerBp<number>, prefix = ""): Vars {
  const vars: Vars = {};
  for (const bp of BREAKPOINTS) {
    const b = box[bp];
    vars[`--${prefix}x-${bp}`] = rem(b.x);
    vars[`--${prefix}y-${bp}`] = rem(b.y - top[bp]);
    vars[`--${prefix}w-${bp}`] = rem(b.w);
    vars[`--${prefix}h-${bp}`] = rem(b.h);
  }
  return vars;
}

/* A tile cropped at any band is placed by hand at every band: where Figma has
   no crop the identity rect stands in, which matches object-fit: cover to
   within the aspect tolerance that made it uncropped in the first place. */
const IDENTITY: Crop = { left: 0, top: 0, width: 100, height: 100 };

function cropVars(work: Work): Vars {
  if (!work.crop) return {};
  const vars: Vars = {};
  for (const bp of BREAKPOINTS) {
    const c = work.crop[bp] ?? IDENTITY;
    vars[`--cl-${bp}`] = `${c.left}%`;
    vars[`--ct-${bp}`] = `${c.top}%`;
    vars[`--cw-${bp}`] = `${c.width}%`;
    vars[`--ch-${bp}`] = `${c.height}%`;
  }
  return vars;
}

function fitVars(work: Work): Vars {
  if (!work.fit) return {};
  const vars: Vars = {};
  for (const bp of BREAKPOINTS) {
    vars[`--pos-${bp}`] = work.fit[bp] === "bottom" ? "bottom" : "center";
  }
  return vars;
}

/** Widest rendered width across the bands, for the srcset hint. */
function widest(work: Work) {
  return Math.round(
    Math.max(
      ...(BREAKPOINTS).map(
        (bp) => work.box[bp].w * ((work.crop?.[bp]?.width ?? 100) / 100),
      ),
    ),
  );
}

const ZERO: PerBp<number> = { w390: 0, w768: 0, w1440: 0, w1920: 0 };

/** `--name-w390`, `--name-w768`, … from a per-band map. */
function perBp<T>(name: string, map: PerBp<T>, format: (v: T) => string): Vars {
  const vars: Vars = {};
  for (const bp of BREAKPOINTS) vars[`--${name}-${bp}`] = format(map[bp]);
  return vars;
}

export default function ArtworkPage() {
  // The regions tile each canvas end to end so the scroll-spy observer always
  // has exactly one of them under its trigger line, at every band.
  const regions = CATEGORIES.map((category, i) => {
    const next = CATEGORIES[i + 1];
    const height = {} as PerBp<number>;
    for (const bp of BREAKPOINTS) {
      height[bp] = (next ? next.top[bp] : CANVAS_HEIGHT[bp]) - category.top[bp];
    }
    return { category, top: category.top, height };
  });

  return (
    <main className={s.page}>
      {/* The design names this page through its four category headings rather
          than a title of its own, so the page's own name is written for the
          people who arrive at a heading list — a screen reader's first jump,
          and what a search engine reads as the subject. */}
      <h1 className="srOnly">Artwork</h1>

      {/* Both curves span their frame edge to edge, so only their vertical
          placement comes from the data — the CSS stretches them to whatever
          the viewport is, the same way the other pages handle their waves. */}
      {WAVES.map((wave) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={wave.src}
          className={s.wave}
          src={wave.src}
          alt=""
          aria-hidden
          style={boxVars(wave.box, ZERO)}
        />
      ))}

      <div className={s.stage}>
        {/* The wrapper spans the rest of the canvas so the nav can stick
            inside it and release before it would ride over the footer. */}
        <div className={s.subnav}>
          <div className={s.subnavInner}>
            <ArtworkNav />
          </div>
        </div>

        {regions.map(({ category, top, height }) => (
          <section
            key={category.id}
            id={`region-${category.id}`}
            className={s.region}
            style={
              {
                ...perBp("y", top, rem),
                ...perBp("h", height, rem),
              } as React.CSSProperties
            }
            aria-labelledby={`intro-${category.id}`}
          >
            <div
              className={s.intro}
              id={`intro-${category.id}`}
              style={
                {
                  ...boxVars(category.introBox, top),
                  ...perBp("align", category.align, (v) => v),
                  ...perBp("head-track", category.headingTrack, rem),
                  ...perBp("body-track", category.bodyTrack, rem),
                  ...perBp("body-lead", category.bodyLeading, rem),
                  "--heading-weight": category.headingWeight,
                } as React.CSSProperties
              }
            >
              <h2 className={s.introHeading}>{category.label}</h2>
              <p className={s.introBody}>{category.intro}</p>
            </div>

            {WORKS.filter((work) => work.category === category.id).map((work) => {
              // One source for the copy: a piece with a title written for it
              // gets the hover overlay and a detail view, both at once. A tile
              // that is a second crop of another piece borrows its copy and
              // its URL rather than carrying a duplicate set, so resolve to
              // the piece that owns them. `id` is the stable key the copy is
              // filed under; `slug` is only the public URL.
              const owner = work.sameAs ? (WORKS.find((item) => item.id === work.sameAs) ?? work) : work;
              const content = contentFor(owner.id);
              const slug = owner.slug;
              // A video opens its detail view whether or not the copy is
              // written — the film is the piece. Stills still wait for a title.
              const opens = content || work.youtubeId;
              const tile = (
                <>
                  <Image
                    className={work.crop ? s.imageCropped : s.image}
                    src={work.src}
                    alt={work.alt}
                    width={widest(work)}
                    height={Math.round(widest(work) * (work.box.w1440.h / work.box.w1440.w))}
                    sizes={`${widest(work)}px`}
                    /* 75 here alone. This page carries 49 of these down 9000px
                       and the largest is drawn 547 wide, where the step up to
                       90 is invisible and roughly doubles the bytes — which is
                       the wait a first visit spends scrolling past empty tiles.
                       The three pages that show one image at full size keep
                       90: there the difference is the point, and one image is
                       not what makes a page slow. */
                    quality={75}
                    /* The canvas runs to 9000px and lazy-loads; only the
                       pieces visible on arrival are worth fetching up front. */
                    priority={work.box.w1440.y < 800}
                  />

                  {/* Four of the ten animation stills are solid black frames
                      exported from Figma, so without this badge those tiles
                      read as broken images rather than as films. */}
                  {work.youtubeId && <span className={s.play} aria-hidden />}

                  {content && (
                    <figcaption className={s.overlay}>
                      <span className={s.overlayTitle}>{content.title}</span>
                      <span className={s.overlayBody}>{content.description}</span>
                    </figcaption>
                  )}
                </>
              );

              return (
                <figure
                  key={work.id}
                  className={s.work}
                  data-hover={content ? true : undefined}
                  style={
                    {
                      ...boxVars(work.box, top),
                      ...cropVars(work),
                      ...fitVars(work),
                      "--ar": `${work.box.w1440.w} / ${work.box.w1440.h}`,
                    } as React.CSSProperties
                  }
                >
                  {/* Stills open a detail view only once copy is written for
                      them; videos open regardless. The rest stay plain. */}
                  {opens ? (
                    <Link className={s.open} href={`/artwork/${slug}`}>
                      {tile}
                    </Link>
                  ) : (
                    tile
                  )}
                </figure>
              );
            })}
          </section>
        ))}
      </div>
    </main>
  );
}
