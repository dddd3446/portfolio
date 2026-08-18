import type { Metadata } from "next";

import { CONTACT_SOCIAL_ORDER, SITE, SOCIAL_LINKS } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className={s.page}>
      {/* As on Artwork: the design opens on the email address rather than on
          a title, so the page's name is written rather than drawn. */}
      <h1 className="srOnly">Contact</h1>

      {/* 390 is drawn as its own shape in Figma rather than the wide one
          scaled down, so both ship and the CSS picks one — the same way Home
          carries its two curves. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${s.wave} ${s.waveWide}`}
        src="/assets/decor/wave-contact.svg"
        alt=""
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${s.wave} ${s.waveNarrow}`}
        src="/assets/decor/wave-contact-390.svg"
        alt=""
        aria-hidden
      />

      <div className={s.stage}>
        <a className={s.email} href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>

        <ul className={s.social}>
          {CONTACT_SOCIAL_ORDER.map((id) => {
            const { label, url, icon, width, height } = SOCIAL_LINKS[id];
            const glyph = (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={icon} alt={url ? "" : label} width={width} height={height} />
            );
            return (
              <li key={id} style={{ width: `${width / 16}rem`, height: `${height / 16}rem` }}>
                {url ? (
                  <a href={url} target="_blank" rel="noreferrer noopener" aria-label={label}>
                    {glyph}
                  </a>
                ) : (
                  glyph
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
