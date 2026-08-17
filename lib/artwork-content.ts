/**
 * Copy for the artwork detail view (`/artwork/[slug]`).
 *
 * Kept apart from lib/artwork.ts on purpose: that file is geometry taken from
 * Figma and is regenerated when the design moves, this one is written by hand
 * and should survive that.
 *
 * Only pieces with a `title` get a detail page and a hover overlay on the
 * listing — the other 48 are scaffolded below with the fields they need, so
 * filling one in is all it takes to switch it on. Nothing half-written ever
 * ships (vscodetodo_1.md, todo 6).
 *
 * `meta` is the row under the description. The design shows EXIF for the
 * photography, and todo 6 asks for different fields elsewhere — software used,
 * course work or personal — so it is a free label/value list rather than a
 * fixed shape.
 */

export type MetaField = { label: string; value: string };

export type WorkContent = {
  title: string;
  description: string;
  meta: MetaField[];
};

export const CONTENT: Record<string, WorkContent> = {
  // Note: a tile with `sameAs` in lib/artwork.ts has no entry here — it shares
  // the one belonging to the slug it points at, so a piece the design shows
  // twice is still written once.

  // ---- Visual Product ----
  // 20_image_77.png  —  Close-up of yellow ixora blossoms
  "vp-01": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 16_image_80.png  —  Purple bougainvillea against a dark background
  "vp-02": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 17_image_81.png  —  A single red flower among green leaves
  "vp-03": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 49_the_duck_show_hover.png  —  The Duck — a white duck standing on a mossy rock on grass
  "the-duck": {
    title: "The Duck",
    description:
      "It seemed to know someone was taking pictures, standing very properly on the rock, unlike the other ducks that had gone into the water.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-500" },
      { label: "F-stop", value: "f/6.3" },
      { label: "Exposure time", value: "1/400 sec." },
    ],
  },
  // 19_image_79.png  —  Coral begonia flowers in shallow focus
  "vp-04": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 18_image_89.png  —  A tapir standing on bare ground
  "vp-05": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 10_image_87.png  —  Architectural photograph
  "vp-06": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 11_image_88.png  —  Architectural photograph
  "vp-07": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 47_image_96.png  —  3D iceberg render. Shown twice on the page (vp-08 and
  // vp-11), cropped differently; this entry covers both.
  "vp-08": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 24_image_92.png  —  Portrait photograph
  "vp-09": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 22_image_90.png  —  Photographic study
  "vp-10": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // vp-11 is the same 3D render as vp-08, cropped to a different disc.
  // Write it under "vp-08"; both tiles pick the copy up from there.
  // 23_image_91.png  —  Photographic study
  "vp-12": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 25_image_95.png  —  Portrait photograph
  "vp-13": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 14_image_82.png  —  Photographic study
  "vp-14": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 15_image_83.png  —  Photographic study
  "vp-15": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 13_image_86.png  —  Photographic study
  "vp-16": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 21_image_84.png  —  Photographic study
  "vp-17": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 12_image_85.png  —  Photographic study
  "vp-18": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 28_screenshot_20250901_153156.png  —  3D render
  "vp-19": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 27_image_98.png  —  3D render
  "vp-20": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 26_image_105.png  —  3D render
  "vp-21": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 29_screenshot_20250901_153902.png  —  3D render
  "vp-22": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 30_947e4276_fdb2.png  —  3D render
  "vp-23": {
    title: "",
    description: "",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },

  // ---- 2D & 3D Animation ----
  // 05_FAD_logo_animation1.png  —  FAD logo animation
  "an-01": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 03_FAD_logo_animation2.png  —  FAD logo animation
  "an-02": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 06_FAD_logo_animation3.png  —  FAD logo animation
  "an-03": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 02_MV_yeren.png  —  Music video — 野人
  "an-04": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 04_stop_motion.png  —  Stop-motion animation
  "an-05": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 01_katana_show_video.png  —  Katana showcase video
  "an-06": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 07_2d_front_walking_cycle.png  —  2D front walking cycle
  "an-07": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 08_2d_talking_animation.png  —  2D talking animation
  "an-08": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 09_2d_exam_show_animation.png  —  2D exam showcase animation
  "an-09": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 31_3d_animation_story.png  —  3D animated short
  "an-10": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },

  // ---- Studio Drawing ----
  // 32_screenshot_20260805_014758.png  —  Charcoal landscape of a chalet below mountains
  "sd-01": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 33_screenshot_20260805_014803.png  —  Studio drawing
  "sd-02": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 38_screenshot_20260805_014808.png  —  Studio drawing
  "sd-03": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 34_screenshot_20260805_014051.png  —  Studio drawing
  "sd-04": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 39_image_119.png  —  Studio drawing
  "sd-05": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 35_screenshot_20260805_014047.png  —  Studio drawing
  "sd-06": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 36_image_116.png  —  Pointillist portrait in oil pastel with green hair
  "sd-07": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 41_screenshot_20260805_014753.png  —  Studio drawing
  "sd-08": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 40_screenshot_20260805_014749.png  —  Studio drawing
  "sd-09": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 37_image_117.png  —  Pointillist portrait in oil pastel with pink hair
  "sd-10": {
    title: "",
    description: "",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },

  // ---- Poster Design ----
  // 43_D240074B_A3.jpeg  —  Oppenheimer film poster, A3 portrait
  "pd-01": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 44_D240074B_landscape.jpeg  —  Oppenheimer film poster, landscape
  "pd-02": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 42_poster_121.jpeg  —  Japanese knife poster with a sushi platter
  "pd-03": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 45_train_2-01.jpeg  —  November calendar poster with a red train illustration
  "pd-04": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 46_poster_fyp_2.png  —  Water Bankruptcy — final-year project poster
  "pd-05": {
    title: "",
    description: "",
    // Software used, and whether it was course work or personal.
    meta: [],
  },};

/** A piece is published once someone has written a title for it. */
export function contentFor(slug: string): WorkContent | null {
  const entry = CONTENT[slug];
  return entry && entry.title ? entry : null;
}
