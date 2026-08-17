import Image from "next/image";
import Link from "next/link";

import s from "./page.module.css";

export default function HomePage() {
  return (
    <main className={s.hero}>
      {/* `fill` rather than width/height: the box is deliberately a different
          aspect ratio to the source and crops via object-fit. */}
      <div className={s.photo}>
        <Image
          src="/assets/images/home/hero.png"
          alt="Chai Gai Foon in a suit and wide-brimmed hat, lit against a bright circular backdrop"
          fill
          sizes="100vw"
          quality={90}
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
