"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Swipe left and right through the pieces on the artwork detail view.
 *
 * The arrows are the same journey and stay where they are — this is the
 * gesture a phone expects for a thing you page through, not a replacement for
 * them. Renders nothing; it only listens.
 *
 * Touch events are the whole gate: they do not fire for a mouse, so the
 * gesture arrives on phones and tablets and stays out of the way everywhere
 * else without a media query having to guess.
 *
 * A swipe that begins on the YouTube player never reaches here — the iframe is
 * its own document and keeps its own gestures, which is the right way round.
 */

/** Far enough to be meant, rather than a stray finger while tapping. */
const MIN_DISTANCE = 60;

/** How much more horizontal than vertical the movement has to be. Keeps a
 *  diagonal drag from paging when the intent was probably something else. */
const DIRECTION_BIAS = 1.5;

export default function ArtworkSwipe({ prev, next }: { prev?: string; next?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!prev && !next) return;

    // Both neighbours are one gesture away, so fetch them now rather than at
    // the end of the swipe — the page should be there the moment it is asked
    // for, not after a round trip.
    for (const slug of [prev, next]) if (slug) router.prefetch(`/artwork/${slug}`);

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (event: TouchEvent) => {
      // A second finger means a pinch or a zoom, not a page turn.
      tracking = event.touches.length === 1;
      if (!tracking) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const onEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) < MIN_DISTANCE) return;
      if (Math.abs(dx) < Math.abs(dy) * DIRECTION_BIAS) return;

      // Swiping left pulls the next piece in from the right, the way a stack
      // of photographs would move.
      const target = dx < 0 ? next : prev;
      if (target) router.push(`/artwork/${target}`);
    };

    const onCancel = () => {
      tracking = false;
    };

    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onCancel, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onCancel);
    };
  }, [prev, next, router]);

  return null;
}
