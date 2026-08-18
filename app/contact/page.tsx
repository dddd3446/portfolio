import type { Metadata } from "next";

import { CONTACT_SOCIAL_ORDER, SITE, SOCIAL_LINKS } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className={s.page}>
      {/* 390 is drawn as its own shape in Figma rather than the wide one
          scaled down, so it gets its own file. `picture` rather than two
          images: only the matching source is fetched. */}
      <picture>
        <source media="(max-width: 767.98px)" srcSet="/assets/decor/wave-contact-390.svg" />
        <img className={s.wave} src="/assets/decor/wave-contact.svg" alt="" aria-hidden />
      </picture>

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
