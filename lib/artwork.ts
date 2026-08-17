/**
 * The Artwork page is a single scrolling canvas rather than a grid: every
 * piece is hand-placed in Figma, so the numbers below are frame coordinates
 * in px, exactly as designed.
 *
 * There are four hand-made layouts, not one layout at four sizes — the pieces
 * are genuinely re-arranged between them (`image 92`, for instance, moves from
 * (585, 1123) at 1440 to (1507, 177) at 1920). So every box is carried per
 * breakpoint and the CSS only picks which set to read.
 *
 *   w390   `Artwork  390` (514:1747)   390 x 3252
 *   w768   `Artwork  768` (473:1301)   768 x 4693
 *   w1440  `Artwork 1440` (328:488)   1440 x 9435
 *   w1920  `Artwork 1920` (454:1022)  1920 x 8582
 *
 * The four categories come from PROJECT_CONTEXT.md and are the fixed taxonomy
 * for the whole project — filtering, the detail pages and any future CMS all
 * use these same four ids.
 */

export type CategoryId = "visual-product" | "animation" | "studio-drawing" | "poster-design";

/** The four designed widths. Ordered narrow to wide. */
export type Bp = "w390" | "w768" | "w1440" | "w1920";
export const BREAKPOINTS: Bp[] = ["w390", "w768", "w1440", "w1920"];

export type Box = { x: number; y: number; w: number; h: number };
export type PerBp<T> = Record<Bp, T>;

/**
 * A Figma image fill set to "Crop" rather than "Fill". The numbers are the
 * generated CSS percentages of the tile box, so the exported (uncropped)
 * source can be re-framed exactly instead of being centre-cropped by
 * object-fit, which lands somewhere else entirely. Several tiles are cropped
 * differently per breakpoint, hence the per-breakpoint map.
 */
export type Crop = { left: number; top: number; width: number; height: number };

/** How an uncropped tile fills its box. Figma's "Fill" mode, top or bottom. */
export type Fit = "cover" | "bottom";

export type Work = {
  id: string;
  /** URL segment for the detail view. */
  slug: string;
  category: CategoryId;
  src: string;
  alt: string;
  box: PerBp<Box>;
  crop?: Partial<PerBp<Crop>>;
  fit?: Partial<PerBp<Fit>>;
  /**
   * YouTube id for a piece that is a moving image. The files are far too big
   * to ship from `public/`, so the ten animations are hosted on the owner's
   * channel and embedded (vscodetodo_1.md, todo 4 point 1 — option B).
   *
   * `src` stays the still that sits in the layout: the listing is a composed
   * canvas of stills and swapping one tile for a player would break it. The
   * embed lives on the detail view, which the tile links to.
   *
   * A video is enough on its own to open that detail view, unlike a still —
   * the work itself is the video, not the write-up around it.
   */
  youtubeId?: string;
  /**
   * Set when this tile is a second crop of a piece that already appears on
   * the page. The tile still renders — the design places both — but the copy,
   * the hover overlay and the detail page all belong to the slug named here,
   * so the piece is written once and has one URL.
   */
  sameAs?: string;
};

export type Category = {
  id: CategoryId;
  /** Sub-nav label, and the heading that opens the category's intro block. */
  label: string;
  intro: string;
  introBox: PerBp<Box>;
  /**
   * y at which the category begins. Used as the scroll-spy boundary, so it is
   * the top of the first thing that belongs to the category rather than the
   * top of the intro paragraph.
   */
  top: PerBp<number>;
  /**
   * The four intro blocks are not set identically in Figma — alignment, the
   * heading weight, tracking and leading all differ per category and per
   * breakpoint. They are carried rather than normalised because the
   * differences are in the design as drawn. Poster Design, for instance, is
   * centred at every width except 390, where it goes back to ranged left.
   */
  align: PerBp<"left" | "center">;
  headingWeight: 400 | 600;
  headingTrack: PerBp<number>;
  bodyTrack: PerBp<number>;
  bodyLeading: PerBp<number>;
};

/** Height of the designed canvas above the footer, per breakpoint. */
export const CANVAS_HEIGHT: PerBp<number> = {
  w390: 3149,
  w768: 4530,
  w1440: 9027,
  w1920: 8174,
};

/** Header band over the Artwork page. Taller than the other three pages. */
export const HEADER_H: PerBp<number> = { w390: 59, w768: 52, w1440: 113, w1920: 123 };

/** The two decorative curves, behind everything else in the stack. */
export const WAVES: { src: string; box: PerBp<Box> }[] = [
  {
    src: "/assets/decor/wave-artwork-mid.svg",
    box: {
      w390: { x: 0, y: 1175, w: 390, h: 561 },
      w768: { x: 0, y: 1803, w: 768, h: 1079 },
      w1440: { x: -1, y: 3412, w: 1441, h: 2027 },
      w1920: { x: 0, y: 2770, w: 1920, h: 1847.536 },
    },
  },
  {
    src: "/assets/decor/wave-artwork-bottom.svg",
    box: {
      w390: { x: 0, y: 2501, w: 390, h: 648 },
      w768: { x: 1, y: 3730, w: 767, h: 780 },
      w1440: { x: 0.5, y: 7613, w: 1441.5, h: 1373.716 },
      w1920: { x: 0, y: 6309, w: 1920, h: 1830 },
    },
  },
];

/**
 * Sub-nav geometry. The items are not on an even pitch below 1440 (Figma
 * resized the instances by hand), so each one carries its own top and size.
 */
export const SUBNAV: PerBp<{
  x: number;
  label: number;
  items: { top: number; w: number; h: number }[];
}> = {
  w1440: {
    x: 70,
    label: 15,
    items: [
      { top: 158, w: 139, h: 60 },
      { top: 225, w: 139, h: 60 },
      { top: 292, w: 139, h: 60 },
      { top: 359, w: 139, h: 60 },
    ],
  },
  w1920: {
    x: 96,
    label: 20,
    items: [
      { top: 185, w: 179, h: 60 },
      { top: 264, w: 234, h: 60 },
      { top: 343, w: 166, h: 60 },
      { top: 422, w: 139, h: 60 },
    ],
  },
  w768: {
    x: 38,
    label: 10,
    items: [
      { top: 71, w: 74, h: 37 },
      { top: 105, w: 94, h: 33 },
      { top: 142, w: 74, h: 32 },
      { top: 177, w: 74, h: 33 },
    ],
  },
  w390: {
    x: 23,
    label: 10,
    items: [
      { top: 82, w: 74, h: 33 },
      { top: 125, w: 93, h: 34 },
      { top: 169, w: 76, h: 36 },
      { top: 215, w: 68, h: 35 },
    ],
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "visual-product",
    label: "Visual Product",
    intro:
      "A mix of photography and 3D design capturing real moments and building digital ones, from portraits and architecture to rendered product and icons.",
    introBox: {
      w390: { x: 140, y: 103, w: 216, h: 83 },
      w768: { x: 198, y: 86, w: 174, h: 104 },
      w1440: { x: 372, y: 188, w: 264, h: 186 },
      w1920: { x: 472, y: 177, w: 300, h: 198 },
    },
    top: { w390: 82, w768: 71, w1440: 158, w1920: 185 },
    align: { w390: "left", w768: "left", w1440: "left", w1920: "left" },
    headingWeight: 600,
    headingTrack: { w390: 1.2, w768: 1.8, w1440: 2.4, w1920: 3 },
    bodyTrack: { w390: 0.96, w768: 0.96, w1440: 1.44, w1920: 1.8 },
    bodyLeading: { w390: 15, w768: 15, w1440: 29, w1920: 29 },
  },
  {
    id: "animation",
    label: "2D & 3D Animation",
    intro:
      "Bringing still images to life — logo animations, walk cycles, stop motion and short animated stories in both 2D and 3D.",
    introBox: {
      w390: { x: 140, y: 1237, w: 216, h: 68 },
      w768: { x: 530, y: 1957, w: 192, h: 95 },
      w1440: { x: 1033, y: 3703, w: 301, h: 155 },
      w1920: { x: 1533, y: 3129, w: 292, h: 185 },
    },
    top: { w390: 1315, w768: 1913, w1440: 3620, w1920: 3098 },
    align: { w390: "left", w768: "left", w1440: "left", w1920: "left" },
    headingWeight: 600,
    headingTrack: { w390: 2.4, w768: 2.4, w1440: 2.4, w1920: 2.4 },
    bodyTrack: { w390: 2.4, w768: 2.4, w1440: 2.4, w1920: 2.4 },
    bodyLeading: { w390: 15, w768: 15, w1440: 29, w1920: 29 },
  },
  {
    id: "studio-drawing",
    label: "Studio Drawing",
    intro:
      "Pencil, charcoal and paint on paper — observational studies and portraits made the traditional way, one mark at a time.",
    introBox: {
      w390: { x: 140, y: 1750, w: 216, h: 66 },
      w768: { x: 196, y: 2902, w: 170, h: 92 },
      w1440: { x: 357, y: 5487, w: 264, h: 173 },
      w1920: { x: 479, y: 4617, w: 331, h: 173 },
    },
    top: { w390: 1750, w768: 2902, w1440: 5487, w1920: 4617 },
    align: { w390: "left", w768: "left", w1440: "left", w1920: "left" },
    headingWeight: 400,
    headingTrack: { w390: 2.4, w768: 2.4, w1440: 2.4, w1920: 2.4 },
    bodyTrack: { w390: 0.96, w768: 0.96, w1440: 1.44, w1920: 1.8 },
    bodyLeading: { w390: 15, w768: 15, w1440: 36, w1920: 29 },
  },
  {
    id: "poster-design",
    label: "Poster Design",
    intro:
      "Where typography, imagery and layout come together to tell a story in a single frame — from film posters to product and calendar designs.",
    introBox: {
      w390: { x: 140, y: 2563, w: 207, h: 83 },
      w768: { x: 386, y: 4059, w: 156, h: 104 },
      w1440: { x: 718, y: 8176.58, w: 306, h: 174 },
      w1920: { x: 948, y: 7031, w: 413, h: 230 },
    },
    top: { w390: 2656, w768: 3865, w1440: 7815.58, w1920: 6553 },
    align: { w390: "left", w768: "center", w1440: "center", w1920: "center" },
    headingWeight: 400,
    headingTrack: { w390: 2.4, w768: 2.4, w1440: 2.4, w1920: 2.4 },
    bodyTrack: { w390: 0.96, w768: 0.96, w1440: 1.44, w1920: 1.8 },
    bodyLeading: { w390: 15, w768: 15, w1440: 36, w1920: 45 },
  },
];

const dir = "/assets/images/artwork";

/**
 * Alt text: only The Duck has a designed title, so the rest describe what the
 * image shows where that could be confirmed and their category otherwise.
 * Replace them with the real titles once the owner supplies them — the detail
 * template needs the same copy anyway.
 */
export const WORKS: Work[] = [
  // ---- Visual Product ----
  {
    id: "vp-01",
    slug: "vp-01",
    category: "visual-product",
    src: `${dir}/20_image_77.png`,
    alt: "Close-up of yellow ixora blossoms",
    box: {
      w390: { x: 140, y: 334, w: 124, h: 83 },
      w768: { x: 392, y: 80, w: 229, h: 153 },
      w1440: { x: 736, y: 177, w: 429, h: 286 },
      w1920: { x: 841, y: 177, w: 429, h: 286 },
    },
  },
  {
    id: "vp-02",
    slug: "vp-02",
    category: "visual-product",
    src: `${dir}/16_image_80.png`,
    alt: "Purple bougainvillea against a dark background",
    box: {
      w390: { x: 274, y: 194, w: 82, h: 74 },
      w768: { x: 631, y: 80, w: 99, h: 88 },
      w1440: { x: 1185, y: 177, w: 187, h: 165 },
      w1920: { x: 1295, y: 177, w: 187, h: 165 },
    },
    crop: {
      w390: { left: -33.03, top: 0, width: 134.35, height: 100 },
      w768: { left: -32.63, top: 0, width: 132.73, height: 100 },
      w1440: { left: -32.63, top: 0, width: 132.73, height: 100 },
      w1920: { left: -32.63, top: 0, width: 132.73, height: 100 },
    },
  },
  {
    id: "vp-03",
    slug: "vp-03",
    category: "visual-product",
    src: `${dir}/17_image_81.png`,
    alt: "A single red flower among green leaves",
    box: {
      w390: { x: 274, y: 278, w: 82, h: 77 },
      w768: { x: 631, y: 179, w: 100, h: 120 },
      w1440: { x: 1185, y: 362, w: 187, h: 225 },
      w1920: { x: 1295, y: 367, w: 187, h: 215 },
    },
    crop: {
      w390: { left: -13.7, top: -27.44, width: 180.14, height: 127.61 },
      w768: { left: -13.7, top: -0.13, width: 180.14, height: 100.26 },
      w1440: { left: -13.7, top: -0.13, width: 180.14, height: 100.26 },
      w1920: { left: -13.7, top: -3.64, width: 180.14, height: 104.92 },
    },
  },
  {
    id: "vp-the-duck",
    slug: "the-duck",
    category: "visual-product",
    src: `${dir}/49_the_duck_show_hover.png`,
    alt: "The Duck — a white duck standing on a mossy rock on grass",
    box: {
      w390: { x: 140, y: 194, w: 124, h: 131 },
      w768: { x: 198, y: 202, w: 182, h: 193 },
      w1440: { x: 370, y: 405, w: 344, h: 364 },
      w1920: { x: 472, y: 405, w: 344, h: 364 },
    },
    crop: {
      w390: { left: -33.68, top: 0, width: 158.95, height: 100 },
      w768: { left: -33.68, top: 0, width: 158.95, height: 100 },
      w1440: { left: -33.68, top: 0, width: 158.95, height: 100 },
      w1920: { left: -33.68, top: 0, width: 158.95, height: 100 },
    },
  },
  {
    id: "vp-04",
    slug: "vp-04",
    category: "visual-product",
    src: `${dir}/19_image_79.png`,
    alt: "Coral begonia flowers in shallow focus",
    box: {
      w390: { x: 274, y: 365, w: 82, h: 52 },
      w768: { x: 392, y: 244, w: 226.196, h: 151 },
      w1440: { x: 736, y: 483, w: 429, h: 286 },
      w1920: { x: 841, y: 488, w: 429, h: 281 },
    },
    crop: {
      w390: { left: 0, top: -4.56, width: 100, height: 105.27 },
      w1920: { left: 0, top: -1.85, width: 100, height: 101.92 },
    },
  },
  {
    id: "vp-05",
    slug: "vp-05",
    category: "visual-product",
    src: `${dir}/18_image_89.png`,
    alt: "A tapir standing on bare ground",
    box: {
      w390: { x: 140, y: 427, w: 69, h: 60 },
      w768: { x: 631, y: 309, w: 99, h: 86 },
      w1440: { x: 1185, y: 607, w: 187, h: 162 },
      w1920: { x: 1295, y: 607, w: 187, h: 162 },
    },
    crop: {
      w390: { left: -137.74, top: -52.72, width: 247.86, height: 190.6 },
      w768: { left: -137.74, top: -52.72, width: 247.86, height: 190.6 },
      w1440: { left: -137.74, top: -52.72, width: 247.86, height: 190.6 },
      w1920: { left: -137.74, top: -52.72, width: 247.86, height: 190.6 },
    },
  },
  {
    id: "vp-06",
    slug: "vp-06",
    category: "visual-product",
    src: `${dir}/10_image_87.png`,
    alt: "Architectural photograph",
    box: {
      w390: { x: 219, y: 529, w: 137, h: 84 },
      w768: { x: 198, y: 407, w: 270.675, h: 166 },
      w1440: { x: 370, y: 789, w: 512, h: 314 },
      w1920: { x: 472, y: 794, w: 512, h: 314 },
    },
    crop: {
      w390: { left: -0.04, top: -9.09, width: 100.68, height: 109.62 },
      w768: { left: -0.04, top: -9.09, width: 100.68, height: 109.62 },
      w1440: { left: -0.04, top: -9.09, width: 100.68, height: 109.62 },
      w1920: { left: -0.04, top: -9.09, width: 100.68, height: 109.62 },
    },
  },
  {
    id: "vp-07",
    slug: "vp-07",
    category: "visual-product",
    src: `${dir}/11_image_88.png`,
    alt: "Architectural photograph",
    box: {
      w390: { x: 219, y: 427, w: 137, h: 92 },
      w768: { x: 480, y: 407, w: 248.642, h: 166 },
      w1440: { x: 902, y: 789, w: 470, h: 314 },
      w1920: { x: 1012, y: 794, w: 470, h: 314 },
    },
  },
  {
    id: "vp-08",
    slug: "vp-08",
    category: "visual-product",
    src: `${dir}/47_image_96.png`,
    alt: "3D render of a stylised iceberg resting on stacked blue discs",
    box: {
      w390: { x: 140, y: 571, w: 69, h: 69 },
      w768: { x: 198, y: 585, w: 103, h: 136 },
      w1440: { x: 370, y: 1123, w: 195, h: 257 },
      w1920: { x: 472, y: 1133, w: 253, h: 333 },
    },
    crop: {
      w390: { left: -120.09, top: -256.97, width: 240.93, height: 356.81 },
      w768: { left: -168.38, top: -244.27, width: 307.65, height: 344.35 },
      w1440: { left: -168.38, top: -244.27, width: 307.65, height: 344.35 },
      w1920: { left: -168.38, top: -244.27, width: 307.65, height: 344.35 },
    },
  },
  {
    id: "vp-09",
    slug: "vp-09",
    category: "visual-product",
    src: `${dir}/24_image_92.png`,
    alt: "Portrait photograph",
    box: {
      w390: { x: 140, y: 650, w: 69, h: 56 },
      w768: { x: 312, y: 585, w: 213, h: 264 },
      w1440: { x: 585, y: 1123, w: 401, h: 498 },
      w1920: { x: 1507, y: 177, w: 318, h: 394 },
    },
    crop: {
      w390: { left: -72.32, top: -36.08, width: 244.11, height: 201.38 },
      w768: { left: -45.21, top: 0, width: 188.1, height: 101.74 },
      w1440: { left: -45.21, top: 0, width: 188.1, height: 101.74 },
      w1920: { left: -45.21, top: 0, width: 188.1, height: 101.74 },
    },
  },
  {
    id: "vp-10",
    slug: "vp-10",
    category: "visual-product",
    src: `${dir}/22_image_90.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 219, y: 623, w: 78, h: 66 },
      w768: { x: 535, y: 585, w: 195, h: 148 },
      w1440: { x: 1006, y: 1123, w: 366, h: 280 },
      w1920: { x: 1507, y: 596, w: 318, h: 243 },
    },
    crop: {
      w390: { left: -48.58, top: -32, width: 185.3, height: 147 },
      w768: { left: -44.06, top: -32, width: 168.06, height: 147 },
      w1440: { left: -44.06, top: -32, width: 168.06, height: 147 },
      w1920: { left: -44.06, top: -32, width: 168.06, height: 147 },
    },
  },
  {
    id: "vp-11",
    slug: "vp-11",
    category: "visual-product",
    // Same file as vp-08 — Figma places this piece twice, cropped to a
    // different disc each time. The duplicate export sits in _unused.
    src: `${dir}/47_image_96.png`,
    alt: "3D render of a stylised iceberg on stacked blue discs, a second view",
    sameAs: "vp-08",
    box: {
      w390: { x: 140, y: 497, w: 69, h: 74 },
      w768: { x: 198, y: 738, w: 104, h: 111 },
      w1440: { x: 370, y: 1413, w: 195, h: 208 },
      w1920: { x: 472, y: 1509, w: 253, h: 270 },
    },
    crop: {
      w390: { left: 0.02, top: -193.91, width: 240.93, height: 332.7 },
      w768: { left: 0.02, top: -193.91, width: 240.93, height: 332.7 },
      w1440: { left: 0.02, top: -193.91, width: 240.93, height: 332.7 },
      w1920: { left: 0.02, top: -193.91, width: 240.93, height: 332.7 },
    },
  },
  {
    id: "vp-12",
    slug: "vp-12",
    category: "visual-product",
    src: `${dir}/23_image_91.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 219, y: 699, w: 137, h: 84 },
      w768: { x: 535, y: 744, w: 195, h: 105 },
      w1440: { x: 1006, y: 1423, w: 366, h: 198 },
      w1920: { x: 1507, y: 864, w: 318, h: 244 },
    },
    crop: {
      w390: { left: -2.37, top: -16.04, width: 113.42, height: 122.61 },
      w768: { left: 0, top: -16.04, width: 100.25, height: 122.61 },
      w1440: { left: 0, top: -16.04, width: 100.25, height: 122.61 },
      w1920: { left: -21.07, top: -16.1, width: 142.49, height: 123.11 },
    },
  },
  {
    id: "vp-13",
    slug: "vp-13",
    category: "visual-product",
    src: `${dir}/25_image_95.png`,
    alt: "Portrait photograph",
    box: {
      w390: { x: 308, y: 623, w: 48, h: 66 },
      w768: { x: 198, y: 860, w: 252, h: 344 },
      w1440: { x: 370, y: 1641, w: 474, h: 646 },
      w1920: { x: 759, y: 1133, w: 474, h: 646 },
    },
    crop: {
      w390: { left: -11.6, top: -3.13, width: 123.21, height: 105.95 },
      w768: { left: -11.6, top: -3.13, width: 123.21, height: 105.95 },
      w1440: { left: -11.6, top: -3.13, width: 123.21, height: 105.95 },
      w1920: { left: -11.6, top: -3.13, width: 123.21, height: 105.95 },
    },
  },
  {
    id: "vp-14",
    slug: "vp-14",
    category: "visual-product",
    src: `${dir}/14_image_82.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 140, y: 716, w: 69, h: 67 },
      w768: { x: 461, y: 860, w: 270, h: 180 },
      w1440: { x: 864, y: 1641, w: 509.267, h: 340 },
      w1920: { x: 1267, y: 1133, w: 558, h: 372 },
    },
    crop: {
      w390: { left: -0.36, top: 0, width: 145.65, height: 100 },
    },
  },
  {
    id: "vp-15",
    slug: "vp-15",
    category: "visual-product",
    src: `${dir}/15_image_83.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 140, y: 793, w: 103, h: 69 },
      w768: { x: 461, y: 1051, w: 271, h: 181 },
      w1440: { x: 864, y: 2001, w: 508, h: 339 },
      w1920: { x: 1267, y: 1530, w: 557, h: 371 },
    },
    crop: {
      w390: { left: -0.11, top: 0, width: 100.22, height: 100.36 },
      w768: { left: -0.11, top: 0, width: 100.22, height: 100.36 },
      w1440: { left: -0.11, top: 0, width: 100.22, height: 100.36 },
      w1920: { left: -0.11, top: 0, width: 100.22, height: 100.36 },
    },
  },
  {
    id: "vp-16",
    slug: "vp-16",
    category: "visual-product",
    src: `${dir}/13_image_86.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 253, y: 793, w: 103, h: 69 },
      w768: { x: 198, y: 1213, w: 253, h: 169 },
      w1440: { x: 370, y: 2307, w: 474, h: 316 },
      w1920: { x: 469, y: 1804, w: 436, h: 291 },
    },
    crop: {
      w390: { left: 0, top: -0.07, width: 100, height: 100.14 },
      w768: { left: 0, top: -0.07, width: 100, height: 100.14 },
      w1440: { left: 0, top: -0.07, width: 100, height: 100.14 },
      w1920: { left: 0, top: -0.07, width: 100, height: 100.14 },
    },
  },
  {
    id: "vp-17",
    slug: "vp-17",
    category: "visual-product",
    src: `${dir}/21_image_84.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 253, y: 872, w: 103, h: 69 },
      w768: { x: 461, y: 1242, w: 270, h: 181 },
      w1440: { x: 864, y: 2360, w: 508, h: 339 },
      w1920: { x: 935, y: 1804, w: 307, h: 205 },
    },
  },
  {
    id: "vp-18",
    slug: "vp-18",
    category: "visual-product",
    src: `${dir}/12_image_85.png`,
    alt: "Photographic study",
    box: {
      w390: { x: 140, y: 872, w: 103, h: 69 },
      w768: { x: 198, y: 1393, w: 252, h: 169 },
      w1440: { x: 370, y: 2643, w: 474, h: 318 },
      w1920: { x: 935, y: 2034, w: 307, h: 206 },
    },
    crop: {
      w390: { left: -0.04, top: 0, width: 100.5, height: 100 },
      w768: { left: -0.04, top: 0, width: 100.5, height: 100 },
      w1440: { left: -0.04, top: 0, width: 100.5, height: 100 },
      w1920: { left: -0.04, top: 0, width: 100.5, height: 100 },
    },
  },
  {
    id: "vp-19",
    slug: "vp-19",
    category: "visual-product",
    src: `${dir}/28_screenshot_20250901_153156.png`,
    alt: "3D render",
    box: {
      w390: { x: 140, y: 951, w: 145, h: 86 },
      w768: { x: 461, y: 1434, w: 270, h: 159 },
      w1440: { x: 864, y: 2719, w: 508, h: 299 },
      w1920: { x: 1267, y: 1926, w: 557, h: 312 },
    },
    fit: {
      w1920: "bottom",
    },
  },
  {
    id: "vp-20",
    slug: "vp-20",
    category: "visual-product",
    src: `${dir}/27_image_98.png`,
    alt: "3D render",
    box: {
      w390: { x: 140, y: 1047, w: 65, h: 110 },
      w768: { x: 198, y: 1573, w: 113.185, h: 191 },
      w1440: { x: 370, y: 2981, w: 214, h: 361 },
      w1920: { x: 469, y: 2120, w: 436, h: 735 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "vp-21",
    slug: "vp-21",
    category: "visual-product",
    src: `${dir}/26_image_105.png`,
    alt: "3D render",
    box: {
      w390: { x: 215, y: 1047, w: 70, h: 128 },
      w768: { x: 323, y: 1573, w: 126, h: 234 },
      w1440: { x: 604, y: 2981, w: 239, h: 442 },
      w1920: { x: 930, y: 2265, w: 321, h: 595 },
    },
    crop: {
      w390: { left: 0, top: -0.55, width: 100, height: 101.11 },
      w1920: { left: 0, top: 0, width: 100.26, height: 100 },
    },
  },
  {
    id: "vp-22",
    slug: "vp-22",
    category: "visual-product",
    src: `${dir}/29_screenshot_20250901_153902.png`,
    alt: "3D render",
    box: {
      w390: { x: 295, y: 951, w: 61, h: 120 },
      w768: { x: 461, y: 1603, w: 137, h: 170 },
      w1440: { x: 865, y: 3038, w: 257, h: 320 },
      w1920: { x: 1531, y: 2263, w: 294, h: 366 },
    },
    fit: {
      w390: "bottom",
    },
  },
  {
    id: "vp-23",
    slug: "vp-23",
    category: "visual-product",
    src: `${dir}/30_947e4276_fdb2.png`,
    alt: "3D render",
    box: {
      w390: { x: 295, y: 1081, w: 61, h: 77 },
      w768: { x: 609, y: 1603, w: 122, h: 152 },
      w1440: { x: 1142, y: 3038, w: 230, h: 286 },
      w1920: { x: 1276, y: 2263, w: 230, h: 286 },
    },
    crop: {
      w390: { left: -0.32, top: 0, width: 101.68, height: 100 },
    },
  },

  // ---- 2D & 3D Animation ----
  {
    id: "an-01",
    slug: "an-01",
    category: "animation",
    src: `${dir}/05_FAD_logo_animation1.png`,
    youtubeId: "PD2BqAp6gFY",
    alt: "FAD logo animation",
    box: {
      w390: { x: 218, y: 1315, w: 138, h: 88 },
      w768: { x: 198, y: 1913, w: 302, h: 170 },
      w1440: { x: 370, y: 3620, w: 569, h: 320 },
      w1920: { x: 479, y: 3098, w: 564, h: 320 },
    },
  },
  {
    id: "an-02",
    slug: "an-02",
    category: "animation",
    src: `${dir}/03_FAD_logo_animation2.png`,
    youtubeId: "v_ij-gYtqHo",
    alt: "FAD logo animation",
    box: {
      w390: { x: 253, y: 1413, w: 103, h: 58 },
      w768: { x: 198, y: 2094, w: 263, h: 148 },
      w1440: { x: 370, y: 3960, w: 496, h: 279 },
      w1920: { x: 479, y: 3443, w: 564, h: 317 },
    },
  },
  {
    id: "an-03",
    slug: "an-03",
    category: "animation",
    src: `${dir}/06_FAD_logo_animation3.png`,
    youtubeId: "FfveeIXrr1M",
    alt: "FAD logo animation",
    box: {
      w390: { x: 140, y: 1413, w: 103, h: 65 },
      w768: { x: 472, y: 2095, w: 259, h: 146 },
      w1440: { x: 886, y: 3960, w: 496, h: 279 },
      w1920: { x: 480, y: 3785, w: 549, h: 291 },
    },
  },
  {
    id: "an-04",
    slug: "an-04",
    category: "animation",
    src: `${dir}/02_MV_yeren.png`,
    youtubeId: "Of31HehQg1I",
    alt: "Music video — 野人",
    box: {
      w390: { x: 140, y: 1488, w: 105, h: 60 },
      w768: { x: 196, y: 2253, w: 265, h: 149 },
      w1440: { x: 368, y: 4259, w: 496, h: 279 },
      w1920: { x: 1068, y: 3370, w: 752, h: 421 },
    },
  },
  {
    id: "an-05",
    slug: "an-05",
    category: "animation",
    src: `${dir}/04_stop_motion.png`,
    youtubeId: "gwD1F2Vcamk",
    alt: "Stop-motion animation",
    box: {
      w390: { x: 255, y: 1481, w: 101, h: 57 },
      w768: { x: 472, y: 2254, w: 259, h: 146 },
      w1440: { x: 886, y: 4259, w: 496, h: 279 },
      w1920: { x: 1068, y: 3098, w: 440, h: 247 },
    },
  },
  {
    id: "an-06",
    slug: "an-06",
    category: "animation",
    src: `${dir}/01_katana_show_video.png`,
    youtubeId: "bEGi2ncD3Jg",
    alt: "Katana showcase video",
    box: {
      w390: { x: 140, y: 1558, w: 105, h: 56 },
      w768: { x: 196, y: 2412, w: 332, h: 187 },
      w1440: { x: 368, y: 4558, w: 622, h: 350 },
      w1920: { x: 1053, y: 3816, w: 459, h: 258 },
    },
  },
  {
    id: "an-07",
    slug: "an-07",
    category: "animation",
    src: `${dir}/07_2d_front_walking_cycle.png`,
    youtubeId: "yNuLK-KMNM8",
    alt: "2D front walking cycle",
    box: {
      w390: { x: 140, y: 1315, w: 68, h: 88 },
      w768: { x: 538, y: 2414, w: 192, h: 129 },
      w1440: { x: 1010, y: 4558, w: 372, h: 250 },
      w1920: { x: 1539, y: 3816, w: 281, h: 258 },
    },
  },
  {
    id: "an-08",
    slug: "an-08",
    category: "animation",
    src: `${dir}/08_2d_talking_animation.png`,
    youtubeId: "CySX0Ps2Pac",
    alt: "2D talking animation",
    box: {
      w390: { x: 255, y: 1548, w: 101, h: 66 },
      w768: { x: 538, y: 2553, w: 192, h: 108 },
      w1440: { x: 1010, y: 4828, w: 372, h: 210 },
      w1920: { x: 1514, y: 4099, w: 308, h: 173 },
    },
  },
  {
    id: "an-09",
    slug: "an-09",
    category: "animation",
    src: `${dir}/09_2d_exam_show_animation.png`,
    youtubeId: "1ppnhdq5-aQ",
    alt: "2D exam showcase animation",
    box: {
      w390: { x: 262, y: 1624, w: 94, h: 62 },
      w768: { x: 196, y: 2609, w: 332, h: 187 },
      w1440: { x: 368, y: 4928, w: 622, h: 350 },
      w1920: { x: 479, y: 4099, w: 497, h: 280 },
    },
  },
  {
    id: "an-10",
    slug: "an-10",
    category: "animation",
    src: `${dir}/31_3d_animation_story.png`,
    youtubeId: "ciWffF7ccwY",
    alt: "3D animated short",
    box: {
      w390: { x: 140, y: 1624, w: 112, h: 64 },
      w768: { x: 538, y: 2671, w: 192, h: 108 },
      w1440: { x: 1010, y: 5058, w: 372, h: 209 },
      w1920: { x: 1001, y: 4099, w: 488, h: 274 },
    },
  },

  // ---- Studio Drawing ----
  {
    id: "sd-01",
    slug: "sd-01",
    category: "studio-drawing",
    src: `${dir}/32_screenshot_20260805_014758.png`,
    alt: "Charcoal landscape of a chalet below mountains",
    box: {
      w390: { x: 270, y: 1965, w: 86, h: 59 },
      w768: { x: 376, y: 2902, w: 354, h: 244 },
      w1440: { x: 657, y: 5487, w: 725, h: 499 },
      w1920: { x: 1196, y: 4617, w: 639, h: 489 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-02",
    slug: "sd-02",
    category: "studio-drawing",
    src: `${dir}/33_screenshot_20260805_014803.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 140, y: 1826, w: 120, h: 174 },
      w768: { x: 196, y: 3001, w: 170, h: 247 },
      w1440: { x: 357, y: 5693, w: 280, h: 408 },
      w1920: { x: 835, y: 4617, w: 336, h: 489 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-03",
    slug: "sd-03",
    category: "studio-drawing",
    src: `${dir}/38_screenshot_20260805_014808.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 270, y: 1826, w: 86, h: 129 },
      w768: { x: 376, y: 3156, w: 172, h: 255 },
      w1440: { x: 657, y: 6006, w: 356, h: 518 },
      w1920: { x: 835, y: 5131, w: 432, h: 628 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-04",
    slug: "sd-04",
    category: "studio-drawing",
    src: `${dir}/34_screenshot_20260805_014051.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 237, y: 2192, w: 119, h: 82 },
      w768: { x: 558, y: 3156, w: 172, h: 119 },
      w1440: { x: 1033, y: 6006, w: 349, h: 242 },
      w1920: { x: 1292, y: 5131, w: 543, h: 375 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-05",
    slug: "sd-05",
    category: "studio-drawing",
    src: `${dir}/39_image_119.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 140, y: 2010, w: 102, h: 172 },
      w768: { x: 196, y: 3258, w: 170, h: 244 },
      w1440: { x: 357, y: 6121, w: 280, h: 403 },
      w1920: { x: 479, y: 4815, w: 331, h: 477 },
    },
    crop: {
      w390: { left: -19.93, top: -1.58, width: 133.7, height: 105.88 },
      w768: { left: -9.52, top: -1.58, width: 114.6, height: 105.88 },
      w1440: { left: -9.52, top: -1.58, width: 114.6, height: 105.88 },
      w1920: { left: -9.52, top: -1.58, width: 114.6, height: 105.88 },
    },
  },
  {
    id: "sd-06",
    slug: "sd-06",
    category: "studio-drawing",
    src: `${dir}/35_screenshot_20260805_014047.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 237, y: 2284, w: 119, h: 102 },
      w768: { x: 558, y: 3285, w: 172, h: 126 },
      w1440: { x: 1033, y: 6268, w: 349, h: 256 },
      w1920: { x: 1292, y: 5531, w: 542, h: 398 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-07",
    slug: "sd-07",
    category: "studio-drawing",
    src: `${dir}/36_image_116.png`,
    alt: "Pointillist portrait in oil pastel with green hair",
    box: {
      w390: { x: 252, y: 2034, w: 104, h: 148 },
      w768: { x: 196, y: 3512, w: 170, h: 240 },
      w1440: { x: 357, y: 6544, w: 357, h: 504 },
      w1920: { x: 479, y: 5317, w: 331, h: 468 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-08",
    slug: "sd-08",
    category: "studio-drawing",
    src: `${dir}/41_screenshot_20260805_014753.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 140, y: 2326, w: 87, h: 60 },
      w768: { x: 526, y: 3421, w: 204, h: 140 },
      w1440: { x: 734, y: 6544, w: 648, h: 445 },
      w1920: { x: 860, y: 5784, w: 407, h: 279 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },
  {
    id: "sd-09",
    slug: "sd-09",
    category: "studio-drawing",
    src: `${dir}/40_screenshot_20260805_014749.png`,
    alt: "Studio drawing",
    box: {
      w390: { x: 140, y: 2396, w: 146, h: 105 },
      w768: { x: 526, y: 3571, w: 204, h: 147 },
      w1440: { x: 734, y: 7009, w: 648, h: 469 },
      w1920: { x: 1292, y: 5954, w: 542, h: 360 },
    },
    fit: {
      w1920: "bottom",
    },
  },
  {
    id: "sd-10",
    slug: "sd-10",
    category: "studio-drawing",
    src: `${dir}/37_image_117.png`,
    alt: "Pointillist portrait in oil pastel with pink hair",
    box: {
      w390: { x: 140, y: 2192, w: 87, h: 124 },
      w768: { x: 376, y: 3421, w: 140, h: 199 },
      w1440: { x: 359, y: 7068, w: 354, h: 504 },
      w1920: { x: 481, y: 5810, w: 354, h: 504 },
    },
    fit: {
      w390: "bottom",
      w768: "bottom",
      w1440: "bottom",
      w1920: "bottom",
    },
  },

  // ---- Poster Design ----
  {
    id: "pd-01",
    slug: "pd-01",
    category: "poster-design",
    src: `${dir}/43_D240074B_A3.jpeg`,
    alt: "Oppenheimer film poster, A3 portrait",
    box: {
      w390: { x: 253, y: 2656, w: 103, h: 146 },
      w768: { x: 196, y: 3865, w: 173, h: 244 },
      w1440: { x: 359, y: 7815.58, w: 333, h: 471 },
      w1920: { x: 481, y: 6553, w: 441, h: 623 },
    },
  },
  {
    id: "pd-02",
    slug: "pd-02",
    category: "poster-design",
    src: `${dir}/44_D240074B_landscape.jpeg`,
    alt: "Oppenheimer film poster, landscape",
    box: {
      w390: { x: 140, y: 2812, w: 216, h: 108 },
      w768: { x: 380, y: 3865, w: 350, h: 175 },
      w1440: { x: 712, y: 7815.58, w: 670, h: 335 },
      w1920: { x: 947, y: 6553, w: 886, h: 443 },
    },
  },
  {
    id: "pd-03",
    slug: "pd-03",
    category: "poster-design",
    src: `${dir}/42_poster_121.jpeg`,
    alt: "Japanese knife poster with a sushi platter",
    box: {
      w390: { x: 140, y: 2930, w: 103, h: 146 },
      w768: { x: 555, y: 4050, w: 175, h: 247 },
      w1440: { x: 1049, y: 8170.58, w: 333, h: 471 },
      w1920: { x: 1391, y: 7021, w: 442, h: 625 },
    },
  },
  {
    id: "pd-04",
    slug: "pd-04",
    category: "poster-design",
    src: `${dir}/45_train_2-01.jpeg`,
    alt: "November calendar poster with a red train illustration",
    box: {
      w390: { x: 140, y: 2656, w: 103, h: 146 },
      w768: { x: 196, y: 4118, w: 173, h: 245 },
      w1440: { x: 359, y: 8306.58, w: 333, h: 472 },
      w1920: { x: 481, y: 7202, w: 441, h: 623 },
    },
  },
  {
    id: "pd-05",
    slug: "pd-05",
    category: "poster-design",
    src: `${dir}/46_poster_fyp_2.png`,
    alt: "Water Bankruptcy — final-year project poster",
    box: {
      w390: { x: 253, y: 2930, w: 103, h: 146 },
      w768: { x: 380, y: 4175, w: 168, h: 238 },
      w1440: { x: 712, y: 8375.58, w: 317, h: 448 },
      w1920: { x: 947, y: 7293, w: 419, h: 593 },
    },
  },
];
