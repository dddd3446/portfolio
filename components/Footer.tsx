"use client";

import { usePathname } from "next/navigation";

import { FOOTER_SOCIAL_ORDER, SITE, SOCIAL_LINKS } from "@/lib/site";
import s from "./Footer.module.css";

/**
 * Shared footer. Contact drops the social list on purpose — that page already
 * carries a row of large Facebook / Instagram / Youtube buttons in its body,
 * so repeating them here would be redundant (see PROJECT_CONTEXT.md).
 */
export default function Footer() {
  const pathname = usePathname();
  const showSocial = !pathname.startsWith("/contact");

  return (
    <footer className={s.footer}>
      {/* Plain <img>: next/image cannot optimise SVG, and this one is meant to
          stretch to the viewport, which trips its aspect-ratio warning. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.wave} src="/assets/decor/wave-footer.svg" alt="" aria-hidden />

      <div className={s.stage}>
        <p className={s.slogan}>{SITE.slogan}</p>

        {showSocial && (
          <ul className={s.social}>
            {FOOTER_SOCIAL_ORDER.map((id) => {
              const { label, url } = SOCIAL_LINKS[id];
              return (
                <li key={id}>
                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <p className={s.copyright}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={s.copyrightMark}
            src="/assets/icons/copyright.svg"
            alt=""
            aria-hidden
          />
          <span>
            {SITE.copyrightYear} copyright by {SITE.owner}
          </span>
        </p>
      </div>
    </footer>
  );
}
