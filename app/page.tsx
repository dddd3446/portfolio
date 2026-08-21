import Image from "next/image";
import Link from "next/link";

import { SITE, SITE_URL } from "@/lib/site";
import s from "./page.module.css";

/* The name Google prints above the URL in a search result is its own guess,
   assembled from several signals — and on a *.vercel.app subdomain the guess
   has been "Vercel", beside Vercel's triangle, because the whole of vercel.app
   is one registrable domain and the platform is the loudest thing on it. The
   triangle was ours to fix (it was the untouched create-next-app default still
   sitting in app/favicon.ico); the name is not, but this is the input Google
   documents as the way to state it outright, and `openGraph.siteName` in the
   root layout already agrees with it.

   It goes on the home page and nowhere else: the site name describes the site
   rather than the page, and Google only looks for it here.

   No promises. Sharing a domain with every other deployment on vercel.app may
   keep the platform's own name winning until this sits on a domain of its
   own — and either way Search has to recrawl before anything visibly changes,
   which takes days to weeks. Stating it correctly costs nothing in the
   meantime, and it is the half that carries over to a real domain later. */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.owner,
  url: SITE_URL.href,
};

export default function HomePage() {
  return (
    <main className={s.hero}>
      <script
        type="application/ld+json"
        /* Rendered verbatim into the HTML. The content is JSON.stringify over
           two of our own constants — nothing here comes from a request. */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      {/* `fill` rather than width/height: the box is deliberately a different
          aspect ratio to the source and crops via object-fit. */}
      <div className={s.photo}>
        <Image
          src="/assets/images/home/hero.jpg"
          alt="Chai Gai Foon in a suit and wide-brimmed hat, lit against a bright circular backdrop"
          fill
          /* The box is half the frame plus the inset, which works out at about
             64% of the viewport at 768 and above, and the full width at 390.
             Saying 100vw everywhere asked for a variant two and a half times
             the pixels the box can show — invisible while the source was
             smaller than the box, and expensive now that it is far larger. */
          sizes="(max-width: 767.98px) 100vw, 64vw"
          /* 75, not 90. This is the largest thing the site asks anyone to
             download and the first thing they wait for. The photograph is a
             smooth studio gradient, which is what webp compresses best: at
             the width the box actually draws, 90 costs 524KB and 75 costs 76,
             and side by side there is nothing between them. */
          quality={75}
          priority
        />
      </div>
      {/* Plain <img>: next/image cannot optimise SVG, and this shape is meant
          to stretch to the viewport, which trips its aspect-ratio warning.
          390 draws a different curve, so both ship and the CSS picks one. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`${s.wave} ${s.waveWide}`} src="/assets/decor/wave-home.svg" alt="" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${s.wave} ${s.waveNarrow}`}
        src="/assets/decor/wave-home-390.svg"
        alt=""
        aria-hidden
      />

      <div className={s.stage}>
        <h1 className={s.title}>Do it practical！</h1>

        <p className={s.bio}>
          I&rsquo;m <strong>Chai Gai Foon</strong> &mdash; a multimedia design student
          who&rsquo;d rather make something that works than something that just looks
          good. Between photography, hand-drawn illustration, 3D and poster design,
          I&rsquo;m still figuring out which one I love most, so I do all of them.
        </p>

        <Link href="/artwork" className={s.cta}>
          <span>View my work</span>
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
