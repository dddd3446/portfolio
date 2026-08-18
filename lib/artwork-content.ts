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
  /**
   * Marks a piece as one of a set that was made together and reads as a set —
   * the three Tesla portraits, the four still-life sketches.
   *
   * The listing places them where the design puts them, which interleaves the
   * two Studio Drawing sets down the canvas. That is the layout, not a
   * mistake, so it stays. But stepping through with the detail view's arrows
   * then alternated between the sets, and a series only makes sense read in
   * order, so the detail view pulls a series back together. Same string means
   * same series.
   */
  series?: string;
};

export const CONTENT: Record<string, WorkContent> = {
  // Note: a tile with `sameAs` in lib/artwork.ts has no entry here — it shares
  // the one belonging to the slug it points at, so a piece the design shows
  // twice is still written once.

  // ---- Visual Product ----
  // 20_image_77.png  —  Close-up of yellow ixora blossoms
  "vp-01": {
    title: "Yellow Ixora",
    description:
      "A whole hedge of them along the fence. I got close enough that only the front cluster stayed sharp and the rest of the garden went soft yellow behind it.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/4.5" },
      { label: "Exposure time", value: "1/200 sec." },
    ],
  },
  // 16_image_80.png  —  Purple bougainvillea against a dark background
  "vp-02": {
    title: "Bougainvillea",
    description:
      "Shot into the shade so the background dropped to almost black. Someone walked behind the plant while I was focusing — their legs are still in the blur.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/4.5" },
      { label: "Exposure time", value: "1/500 sec." },
    ],
  },
  // 17_image_81.png  —  A single red flower among green leaves
  "vp-03": {
    title: "One Red Flower",
    description:
      "On the entire plant, this is the only flower in full bloom, and there are no other flowers nearby.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/1.3" },
      { label: "Exposure time", value: "1/80 sec." },
    ],
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
  // 19_image_79.png  —  Red-orange flowers in shallow focus, dark background
  "vp-04": {
    title: "Red Cluster",
    description:
      "Dozens of flowers were blooming simultaneously in the shade, while only a few were bathed in sunlight.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/4.5" },
      { label: "Exposure time", value: "1/200 sec." },
    ],
  },
  // 18_image_89.png  —  A tapir standing on bare ground
  "vp-05": {
    title: "Malayan Tapir",
    description:
      "It walked the same line along the enclosure and never once looked up at the people watching. I got it as it crossed the only patch of open ground.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/6.3" },
      { label: "Exposure time", value: "1/50 sec." },
    ],
  },
  // 10_image_87.png  —  A peahen perched on a fence post in an aviary
  "vp-06": {
    title: "Peahen on a Post",
    description:
      "The green on its neck only becomes visible from certain angles; it doesn't seem to be afraid of people, so I was able to get very close and photograph it to my heart's content.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/5" },
      { label: "Exposure time", value: "1/50 sec." },
    ],
  },
  // 11_image_88.png  —  A cobra resting in the one strip of sunlight on sand
  "vp-07": {
    title: "Cobra in the Sun",
    description:
      "It found the single patch of sunlight on the terrarium and settled there. With the surrounding areas cast in shadow, the composition of the scene formed almost naturally.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-3200" },
      { label: "F-stop", value: "f/32" },
      { label: "Exposure time", value: "1/80 sec." },
    ],
  },
  // 47_image_96.png  —  3D iceberg render. Shown twice on the page (vp-08 and
  // vp-11), cropped differently; this entry covers both.
  "vp-08": {
    title: "Freshwater Shelf",
    description:
      "This image illustrates the composition of freshwater, including icebergs at the top, groundwater in the middle, and so on.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 24_image_92.png  —  Light painting — long-exposure torch drawing on black
  "vp-09": {
    title: "Light Painting I",
    description:
      "I used a flashlight to draw in a dark room using a long exposure. The lines didn't actually exist until the shutter closed, but the durian turned out quite well.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/22" },
      { label: "Exposure time", value: "11.3 sec." },
    ],
  },
  // 22_image_90.png  —  Light painting — long-exposure torch drawing on black
  "vp-10": {
    title: "Light Painting II",
    description:
      "For this banana, I slowed down the speed of my stroke to make the line thicker and brighter; the beginning of the stroke appears solid, while the trailing end remains fine and slender.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/25" },
      { label: "Exposure time", value: "25.8 sec." },
    ],
  },
  // vp-11 is the same 3D render as vp-08, cropped to a different disc.
  // Write it under "vp-08"; both tiles pick the copy up from there.
  // 23_image_91.png  —  Light painting — long-exposure torch drawing on black
  "vp-12": {
    title: "Light Painting III",
    description:
      "This depiction of a runner is a relatively simple piece, yet it conveys a dynamic sense of speed.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/25" },
      { label: "Exposure time", value: "15.4 sec." },
    ],
  },
  // 25_image_95.png  —  3D render — industry stacked on the globe. Same render as the Water
  // Bankruptcy poster (pd-05)
  "vp-13": {
    title: "A Planet Built Over",
    description:
      "Factories, tanks and towers stacked on the globe until the ground barely shows. The render on its own — it was built for the Water Bankruptcy poster.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 14_image_82.png  —  Architecture from below — glass corner against blue sky
  "vp-14": {
    title: "Glass Corner",
    description:
      "The building and the sky meet diagonally, separated by a Z-shaped line.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/6.3" },
      { label: "Exposure time", value: "1/800 sec." },
    ],
  },
  // 15_image_83.png  —  Architecture from below — glass curtain wall and sky
  "vp-15": {
    title: "Curtain Wall",
    description:
      "Every pane catches a slightly different piece of sky, so a flat wall ends up with a gradient running across it. The left half is left empty on purpose.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/5" },
      { label: "Exposure time", value: "1/400 sec." },
    ],
  },
  // 13_image_86.png  —  Architecture from below — concrete slabs and a vent pipe
  "vp-16": {
    title: "Concrete and Sky",
    description:
      "Multiple rectangular concrete buildings cut geometric shapes against the azure sky.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/6.3" },
      { label: "Exposure time", value: "1/800 sec." },
    ],
  },
  // 21_image_84.png  —  Architecture from below — canopy roofline with one cloud
  "vp-17": {
    title: "One Cloud",
    description:
      "Looking up, the monotonous architecture above offered no obstruction. A single cloud drifting in transformed the otherwise drab sky into an interesting sight.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/6.3" },
      { label: "Exposure time", value: "1/400 sec." },
    ],
  },
  // 12_image_85.png  —  Architecture from below — handrail shadow on a concrete wall
  "vp-18": {
    title: "Shadow of the Fence",
    description:
      "At high noon, the railing cast a row of sharp, straight shadows onto the wall. At this moment, the composition featured horizontal, vertical, and diagonal lines.",
    meta: [
      { label: "Camera model", value: "EOS R100" },
      { label: "ISO speed", value: "ISO-200" },
      { label: "F-stop", value: "f/5" },
      { label: "Exposure time", value: "1/1250 sec." },
    ],
  },
  // 28_screenshot_20250901_153156.png  —  3D render — guzheng, viewport view
  "vp-19": {
    title: "Guzheng",
    description:
      "Twenty-one strings, with the bridges stepped along a curve beneath them. That curve is what makes it read as a guzheng, so each bridge went in by hand.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 27_image_98.png  —  3D render — cat-eared character, neutral pose
  "vp-20": {
    title: "Character Model",
    description:
      "The base model in a neutral pose, before rigging. The wide sleeves and the pleated skirt took longest — they have to hold shape once the body moves.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 26_image_105.png  —  3D render — the same character posed beside a gold pillar
  "vp-21": {
    title: "The Golden Pillar",
    description:
      "The same character, posed and lit. Nearly the whole frame is black, so the only light comes off the gold inlay on the pillar and catches one side of the face.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 29_screenshot_20250901_153902.png  —  3D render — banjo, straight-on studio view
  "vp-22": {
    title: "Banjo",
    description:
      "Straight on against a plain backdrop, like a catalogue shot. The tension hooks were the fiddly part — two dozen of them, all on the same circle.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },
  // 30_947e4276_fdb2.png  —  3D render — domestic gas stove
  "vp-23": {
    title: "Gas Stove",
    description:
      "An object with nothing interesting about it, which was the point. The exercise was the proportions and the reflections on the enamel, not the design.",
    // Photography keeps the EXIF four. 3D renders: swap for software / brief.
    meta: [],
  },

  // ---- 2D & 3D Animation ----
  // 05_FAD_logo_animation1.png  —  FAD logo animation
  "an-01": {
    title: "Logo with a Face",
    description:
      "The logo given arms, legs and a bit of personality. It is a short loop, so the whole job is making a flat mark feel like it could move on its own.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 03_FAD_logo_animation2.png  —  FAD logo animation
  "an-02": {
    title: "Old YouTube Intro",
    description:
      "Made to look like the intro bumpers YouTubers used around 2012 — hard cuts, heavy glow, everything landing at once. The reference is the era, not a channel.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 06_FAD_logo_animation3.png  —  FAD logo animation
  "an-03": {
    title: "Logo in Tetris Blocks",
    description:
      "The logo assembled out of falling Tetris blocks. The pieces have to land in an order that reads as a game first and resolves into the mark second.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 02_MV_yeren.png  —  Music video — 野人
  "an-04": {
    title: "Savage",
    description:
      "A remake of the music video for Savage. The song and the cut are not mine — the exercise was matching animation to a track that already exists.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 04_stop_motion.png  —  Stop-motion animation
  "an-05": {
    title: "The Angry Dinosaur",
    description:
      "A dinosaur loses a lucky draw and takes the ramen shop apart. Stop motion, so every bit of that tantrum was moved and shot one frame at a time.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 01_katana_show_video.png  —  Katana showcase video
  "an-06": {
    title: "Katana",
    description:
      "A showcase for a katana model — blade, guard and wrapped handle. No story to it; the camera and the light move so you can read the edge and the metal.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 07_2d_front_walking_cycle.png  —  2D front walking cycle
  "an-07": {
    title: "Doraemon, Running",
    description:
      "A run cycle drawn front-on, using Doraemon. Facing the camera is the hard way — there is no profile to hide behind, so every frame has to hold the shape.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 08_2d_talking_animation.png  —  2D talking animation
  "an-08": {
    title: "Antarctic Adventure",
    description:
      "Line art redrawn frame by frame over a segment of the Doraemon Antarctic Adventure film. Tracing shows you where the original animator put the weight.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 09_2d_exam_show_animation.png  —  2D exam showcase animation
  "an-09": {
    title: "The Cheat Sheet",
    description:
      "Someone who did not revise decides to cheat instead. How that works out is the point of the piece, so it is better watched than described.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 31_3d_animation_story.png  —  3D animated short
  "an-10": {
    title: "Caught Sleeping",
    description:
      "He falls asleep in class. The teacher sees. Most of the work is the pause between those two things — long enough for you to know what is coming.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },

  // ---- Studio Drawing ----
  // 32_screenshot_20260805_014758.png  —  Charcoal landscape of a chalet below mountains
  "sd-01": {
    title: "Chalet Below the Peaks",
    description:
      "The mountains appear a flat gray. It is the fences and roads that push them into the distance; as they recede, they seem to shrink, and through this, the eye perceives the distance.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 33_screenshot_20260805_014803.png  —  Pencil — windmill reflected in water, lily pads in front
  "sd-02": {
    title: "The Windmill",
    description:
      "The reflection is not a simple replica of the upper section; it appears calmer and more reflective. Water lily leaves in the foreground interrupt the mirroring effect between the upper and lower parts.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 38_screenshot_20260805_014808.png  —  Toned paper with white highlights — balcony at night
  "sd-03": {
    title: "Afternoon Tea",
    description:
      "Drawn on toned paper, so the mid-grey is the paper itself and only the light is added. Two cups on the table and nobody sitting at it.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 34_screenshot_20260805_014051.png  —  Pencil still life — toy figure, holed block, two balls
  "sd-04": {
    title: "Still Life Sketch 1",
    series: "Still Life Sketch",
    description:
      "The setup in the classroom consists of a Crayon Shin-chan plush toy, a brick, and two standard tennis balls. The challenge lies in the holes—each is an ellipse of a different shape.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 39_image_119.png  —  Pointillist portrait in oil pastel — blue ground, yellow face
  "sd-05": {
    title: "Portrait of Tesla",
    series: "Portrait of Tesla",
    description:
      "This crayon work is composed of dots, without color blending. The orange-yellow face is set against a blue background; as these are complementary colors on the color wheel, the head stands out distinctly from the background.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 35_screenshot_20260805_014047.png  —  Pencil still life — jar, bottle and a cup on its side
  "sd-06": {
    title: "Still Life Sketch 2",
    series: "Still Life Sketch",
    description:
      "The casual arrangement of bottles and jars showcases the state of items in the home.Portrait of Tesla",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 36_image_116.png  —  Pointillist portrait in oil pastel — green ground, red figure
  "sd-07": {
    title: "Portrait of Tesla 2",
    series: "Portrait of Tesla",
    description:
      "The same portrait, red against green. Here the face and the ground pull equally hard, so the sheet vibrates instead of separating like the blue one.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 41_screenshot_20260805_014753.png  —  Charcoal still life — woven tray, bottle and pot
  "sd-08": {
    title: "Still Life Sketch 3",
    series: "Still Life Sketch",
    description:
      "Charcoal. The woven tray is the darkest thing in the set-up, so it went in first and everything else was judged against it.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 40_screenshot_20260805_014749.png  —  Charcoal still life — the same objects from another angle
  "sd-09": {
    title: "Still Life Sketch 4",
    series: "Still Life Sketch",
    description:
      "The same objects, further round to the side. The tray now sits behind the whole group and holds it together instead of standing on its own.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },
  // 37_image_117.png  —  Pointillist portrait in oil pastel — pink ground, magenta figure
  "sd-10": {
    title: "Portrait of Tesla 3",
    series: "Portrait of Tesla",
    description:
      "The third of the set, and the only one where the figure and the background share a colour family. Nothing pushes forward — which is the reason for doing all three.",
    // Medium and support, and whether it was course work or personal.
    meta: [],
  },

  // ---- Poster Design ----
  // 43_D240074B_A3.jpeg  —  Oppenheimer film poster, A3 portrait
  "pd-01": {
    title: "Oppenheimer Poster",
    description:
      "A class exercise in rebuilding a film poster from scratch, with my own photograph standing in for the lead. The tower, blast and type are composited.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 44_D240074B_landscape.jpeg  —  Oppenheimer film poster, landscape
  "pd-02": {
    title: "Oppenheimer, Wide",
    description:
      "The same brief laid out wide. Portrait framed the figure inside the tower; landscape has nothing to frame him, so the cloud takes that job.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 42_poster_121.jpeg  —  Japanese knife poster with a sushi platter
  "pd-03": {
    title: "Chef's Knife",
    description:
      "A product poster for Japanese kitchen knives. Six blades fanned across the dark half, the food they are meant for in the light half, and the type running down the seam.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 45_train_2-01.jpeg  —  November calendar poster with a red train illustration
  "pd-04": {
    title: "November",
    description:
      "A calendar page made only of flat shapes — the city, the sun and the locomotive are rectangles and circles, no outlines. One red holds it together.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },
  // 46_poster_fyp_2.png  —  Water Bankruptcy — final-year project poster
  "pd-05": {
    title: "Water Bankruptcy",
    description:
      "Graduation project poster. Less than 1% of the water on Earth is accessible fresh water, yet everything we build rests upon this meager resource.",
    // Software used, and whether it was course work or personal.
    meta: [],
  },};

/** A piece is published once someone has written a title for it. */
export function contentFor(slug: string): WorkContent | null {
  const entry = CONTENT[slug];
  return entry && entry.title ? entry : null;
}
