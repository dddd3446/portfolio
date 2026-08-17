export type NavItem = {
  label: string;
  href: string;
};

/** Order matches the header in the Figma file: Home / Artwork / Resume / Contact. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Artwork", href: "/artwork" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

/** The four categories every artwork belongs to (see PROJECT_CONTEXT.md). */
export const ARTWORK_CATEGORIES = [
  "Visual Product",
  "2D & 3D Animation",
  "Studio Drawing",
  "Poster Design",
] as const;

export type ArtworkCategory = (typeof ARTWORK_CATEGORIES)[number];
