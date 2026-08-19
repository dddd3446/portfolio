import type { Bp, PerBp } from "@/lib/artwork";

/**
 * Building the `sizes` attribute for anything placed on one of the four
 * hand-made stages.
 *
 * Two things make a plain length wrong here, and a plain fraction only half
 * right.
 *
 * The layouts are placed in rem and the root font size is a share of the
 * viewport, so a box 124 Figma px wide on the 390 stage covers 124/390 of the
 * screen — a fraction, not a length. But that share only holds while the root
 * font size is still growing. Each band caps it (app/globals.css): the 390
 * band at 20px, which it reaches at a 487.5px viewport, the 768 band at 18.4px
 * at 883.2px, and the two desktop bands at 16px. Past the cap the layout stops
 * growing and pins, while a fraction keeps climbing — so `sizes` goes on
 * claiming the box is bigger than it is drawn.
 *
 * Below the cap that share is exact; above it the box is a fixed length. So
 * each band contributes both, and the media queries switch between them at the
 * viewport where the cap engages. Only lengths and width queries — no CSS
 * math functions, which a browser that cannot parse them would skip, falling
 * through to the 100vw default and undoing the whole point.
 */

/** Root font size ceiling per band, in px, from `html { font-size }`. */
const CAP_PX: PerBp<number> = { w390: 20, w768: 18.4, w1440: 16, w1920: 16 };

/** Design width of each band's stage, and where that band stops. */
const STAGE: PerBp<number> = { w390: 390, w768: 768, w1440: 1440, w1920: 1920 };
const UPPER: PerBp<number | null> = {
  w390: 767.98,
  w768: 1199.98,
  w1440: 1727.98,
  w1920: null,
};

const ORDER: Bp[] = ["w390", "w768", "w1440", "w1920"];

/* The rem ladder is `stage / 16`, so the cap is reached once the viewport is
   that many times the ceiling: 20px x 390/16 = 487.5, then 883.2, 1440, 1920.
   Backed off by the same 0.02 the stylesheet's own breakpoints sit on, which
   makes the 1440 one land exactly on globals.css's `max-width: 1439.98px`. The
   fraction owns everything strictly below the cap and the pinned length owns
   the cap itself — they agree to four decimal places right at the boundary. */
const capViewport = (bp: Bp) => (CAP_PX[bp] * STAGE[bp]) / 16 - 0.02;

/**
 * Two decimals, always — `25.00vw`, never `25vw`.
 *
 * Not cosmetic. Next prunes the srcset it generates by the smallest `vw` it
 * can find in `sizes`, and the regex it looks with only matches whole numbers
 * (`get-img-props.js`, `getWidths`). Our values are mostly fractional, so it
 * normally finds none and keeps the full ladder — which is what we want, since
 * the smallest tile on a phone wants the 128w rung.
 *
 * Emit one value that happens to be whole and it finds that one alone, decides
 * nothing on the page is ever narrower than it, and drops every rung below.
 * Two tiles lost their 128w and 256w cuts to exactly that: a trailing `.00`
 * stripped from 25.00, and Next pruning on a 25% floor while the real floor
 * was 17.44%. Keeping the decimals keeps every rung on the table.
 */
const round = (n: number) => n.toFixed(2);

/**
 * `sizes` for a box whose drawn width, in each band's Figma px, is `width`.
 *
 * Pass the width the image is actually painted at — for a cropped tile that is
 * wider than its frame, since the crop is a percentage of the box.
 */
export function bandSizes(width: PerBp<number>): string {
  const clauses: string[] = [];

  for (const bp of ORDER) {
    const w = width[bp];
    const cap = capViewport(bp);
    const upper = UPPER[bp];
    const share = `${round((w / STAGE[bp]) * 100)}vw`;
    const pinned = `${round((w * CAP_PX[bp]) / 16)}px`;

    // While the root font size is still growing, the box is a share.
    clauses.push(`(max-width: ${round(cap)}px) ${share}`);

    // From the cap to the end of the band it is that fixed length. The last
    // band has no upper bound, so its length is the fallback the list ends on.
    clauses.push(upper === null ? pinned : `(max-width: ${upper}px) ${pinned}`);
  }

  return clauses.join(", ");
}
