"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Swipe left and right through the pieces on the artwork detail view.
 *
 * The arrows are the same journey and stay where they are — this is the
 * gesture a phone expects for a thing you page through, not a replacement for
 * them. Renders nothing; it moves the stage and listens.
 *
 * The composition follows the finger while the gesture is happening, leaves in
 * the direction it was thrown, and the piece that replaces it arrives from the
 * far side. Without that the swipe was a switch rather than a movement: you
 * let go and the screen had already changed, with nothing to connect the two.
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

/** Movement before the gesture commits to an axis. Below this a touch is
 *  still ambiguous, and guessing early makes a tap feel like it slipped. */
const AXIS_LOCK = 10;

/** The stage trails the finger rather than matching it, so the drag has some
 *  weight and the edge of the screen never quite arrives. */
const DRAG_FOLLOW = 0.55;

const EXIT_MS = 190;
const ENTER_MS = 300;
const SETTLE_MS = 260;

/** Which way the last swipe threw the page, read by the page it lands on so
 *  the new piece can arrive from the side the old one left towards. */
const DIRECTION_KEY = "artwork-swipe-direction";

export default function ArtworkSwipe({ prev, next }: { prev?: string; next?: string }) {
  const router = useRouter();

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>("[data-swipe-stage]");
    if (!stage) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const move = (value: string, ms: number) => {
      stage.style.transition = ms ? `transform ${ms}ms cubic-bezier(0.22, 0.61, 0.36, 1)` : "none";
      stage.style.transform = `translateX(${value})`;
    };

    // Arriving from a swipe: come in from the side the last piece left towards.
    // Read and cleared whether or not it is used, so a reload does not inherit
    // an animation from a gesture made minutes ago.
    const arrivedFrom = sessionStorage.getItem(DIRECTION_KEY);
    sessionStorage.removeItem(DIRECTION_KEY);
    let backstop = 0;
    if (arrivedFrom && !still) {
      move(arrivedFrom === "next" ? "100%" : "-100%", 0);
      // Two frames: one for the browser to take the start position, one to
      // start animating from it. In one frame it collapses into no animation.
      requestAnimationFrame(() => requestAnimationFrame(() => move("0px", ENTER_MS)));

      // The entrance starts the piece off-screen, and a hidden tab freezes
      // both rAF and transitions — so a page that loads in the background
      // would have nothing to bring it back, and would show blank when it
      // was finally looked at. Clearing the transform lands on exactly the
      // resting state, so this is safe whether or not the animation ran.
      backstop = window.setTimeout(() => {
        stage.style.transition = "";
        stage.style.transform = "";
      }, ENTER_MS + 400);
    }

    // Nowhere to swipe to, but the entrance above still had to run.
    if (!prev && !next) return () => window.clearTimeout(backstop);

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let horizontal: boolean | null = null;
    let leaving = false;

    const onStart = (event: TouchEvent) => {
      if (leaving) return;
      // A second finger means a pinch or a zoom, not a page turn.
      tracking = event.touches.length === 1;
      horizontal = null;
      if (!tracking) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const onMove = (event: TouchEvent) => {
      if (!tracking || leaving) return;
      const touch = event.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (horizontal === null) {
        if (Math.abs(dx) < AXIS_LOCK && Math.abs(dy) < AXIS_LOCK) return;
        horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (!horizontal || still) return;
      move(`${dx * DRAG_FOLLOW}px`, 0);
    };

    const onEnd = (event: TouchEvent) => {
      if (!tracking || leaving) return;
      tracking = false;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      const far = Math.abs(dx) >= MIN_DISTANCE;
      const sideways = Math.abs(dx) >= Math.abs(dy) * DIRECTION_BIAS;
      const target = dx < 0 ? next : prev;

      if (!far || !sideways || !target) {
        // Not a page turn — fall back to where it started.
        if (!still) move("0px", SETTLE_MS);
        return;
      }

      sessionStorage.setItem(DIRECTION_KEY, dx < 0 ? "next" : "prev");

      if (still) {
        router.push(`/artwork/${target}`);
        return;
      }

      // Throw it the rest of the way, then navigate. Waiting lets the piece
      // leave rather than being cut off mid-flight by a prefetched page that
      // is ready sooner than the eye is.
      leaving = true;
      move(dx < 0 ? "-100%" : "100%", EXIT_MS);
      window.setTimeout(() => router.push(`/artwork/${target}`), EXIT_MS);
    };

    const onCancel = () => {
      if (!tracking || leaving) return;
      tracking = false;
      if (!still) move("0px", SETTLE_MS);
    };

    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onCancel, { passive: true });

    return () => {
      window.clearTimeout(backstop);
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onCancel);
    };
  }, [prev, next, router]);

  useEffect(() => {
    // Both neighbours are one gesture away, so fetch them now rather than at
    // the end of the swipe — the page should be there the moment it is asked
    // for, not after a round trip.
    for (const slug of [prev, next]) if (slug) router.prefetch(`/artwork/${slug}`);
  }, [prev, next, router]);

  return null;
}
