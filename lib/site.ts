/**
 * The site's own origin. Open Graph tags and the sitemap both have to carry
 * absolute URLs, and getting this wrong is invisible locally and broken in
 * public: a wrong origin means share cards fetch an image that isn't there,
 * and a sitemap that hands search engines a list of dead links.
 *
 * So it is not written down here. Vercel passes the production domain to the
 * build as `VERCEL_PROJECT_PRODUCTION_URL` (host only, no scheme), which means
 * renaming the project — or pointing a bought domain at it later — needs no
 * change to this file. `NEXT_PUBLIC_SITE_URL` overrides it for a domain Vercel
 * would not know about; `next dev` falls through to localhost.
 */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

export const SITE = {
  owner: "Chai Gai Foon",
  copyrightYear: 2026,
  slogan: "Design should be practical, not just pretty",
  email: "chaigaifoon@gmail.com",
  /**
   * Drop the PDF at public/assets/cv/ and put its path here to turn the
   * "Download CV" button into a real download (vscodetodo_1.md, todo 9).
   * While this is empty the button renders inert instead of 404-ing.
   */
  cvPath: "/assets/cv/chai-gai-foon-cv.pdf",
} as const;

export type SocialId = "facebook" | "instagram" | "youtube";

export type SocialLink = {
  label: string;
  /** Leave empty until the real profile URL is known — empty renders as plain text. */
  url: string;
  icon: string;
  /** Intrinsic size of the icon in the Contact page row. */
  width: number;
  height: number;
};

export const SOCIAL_LINKS: Record<SocialId, SocialLink> = {
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/gaifoon.chai",
    icon: "/assets/icons/facebook.svg",
    width: 39,
    height: 40,
  },
  instagram: {
    label: "Instagram",
    url: "https://www.instagram.com/gaifoonchai/",
    icon: "/assets/icons/instagram.svg",
    width: 35,
    height: 36,
  },
  youtube: {
    label: "Youtube",
    url: "https://www.youtube.com/@gaifoonchai424",
    icon: "/assets/icons/youtube.svg",
    width: 40,
    height: 28,
  },
};

/** The two pages list the same three accounts in different orders. */
export const FOOTER_SOCIAL_ORDER: SocialId[] = ["facebook", "youtube", "instagram"];
export const CONTACT_SOCIAL_ORDER: SocialId[] = ["facebook", "instagram", "youtube"];
