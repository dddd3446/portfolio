"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BREAKPOINTS, CATEGORIES, SUBNAV, type CategoryId } from "@/lib/artwork";
import s from "./ArtworkNav.module.css";

/**
 * How long to ignore the scroll position after a click. A click sets the
 * pressed item straight away (vscodetodo_1.md, todo 5 point 3); without this
 * the sections scrolling past under the smooth scroll would flicker the
 * highlight through every category on the way.
 */
const CLICK_LOCK_MS = 700;

const BPS = BREAKPOINTS;
const rem = (px: number) => `${px / 16}rem`;

/** Each item is placed off the first one, so the nav can sit at one origin. */
function itemVars(index: number) {
  const vars: Record<string, string> = {};
  for (const bp of BPS) {
    const { items } = SUBNAV[bp];
    vars[`--top-${bp}`] = rem(items[index].top - items[0].top);
    vars[`--h-${bp}`] = rem(items[index].h);
    vars[`--w-${bp}`] = rem(items[index].w);
  }
  return vars;
}

const navVars = () => {
  const vars: Record<string, string> = {};
  for (const bp of BPS) {
    const { items } = SUBNAV[bp];
    const last = items[items.length - 1];
    vars[`--nav-h-${bp}`] = rem(last.top + last.h - items[0].top);
  }
  return vars;
};

/**
 * Category sub-nav for the Artwork page.
 *
 * Figma can drive the hover and click states but not the scroll-driven one,
 * so the Pressed variant is applied here from the scroll position instead
 * (vscodetodo_1.md, todo 5). Hover only recolours; Pressed also shifts the
 * label right and shows the small mark.
 */
export default function ArtworkNav() {
  const [active, setActive] = useState<CategoryId>(CATEGORIES[0].id);
  const lockedUntil = useRef(0);

  useEffect(() => {
    // Measured against a line 40% down the viewport rather than through an
    // IntersectionObserver: the four regions tile the canvas end to end, so
    // "which region is under the line" is exact and has no boundary case,
    // whereas an observer band wide enough to fire reliably also has two
    // regions intersecting at every seam.
    let frame = 0;

    const update = () => {
      frame = 0;
      if (Date.now() < lockedUntil.current) return;

      const line = window.innerHeight * 0.4;
      let current = CATEGORIES[0].id;
      for (const category of CATEGORIES) {
        const el = document.getElementById(`region-${category.id}`);
        if (el && el.getBoundingClientRect().top <= line) current = category.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const go = useCallback((id: CategoryId) => {
    setActive(id);
    lockedUntil.current = Date.now() + CLICK_LOCK_MS;

    const target = document.getElementById(`intro-${id}`);
    if (!target) return;

    // Clear the fixed header, plus a little air so the heading is not welded
    // to the underside of it.
    const header = document.querySelector("header");
    const offset = (header?.getBoundingClientRect().height ?? 113) + 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }, []);

  return (
    <nav
      className={s.nav}
      aria-label="Artwork categories"
      style={navVars() as React.CSSProperties}
    >
      {CATEGORIES.map((category, i) => (
        <button
          key={category.id}
          type="button"
          className={s.item}
          style={itemVars(i) as React.CSSProperties}
          data-pressed={category.id === active}
          aria-current={category.id === active ? "true" : undefined}
          onClick={() => go(category.id)}
        >
          <span className={s.label}>{category.label}</span>
          <span className={s.mark} aria-hidden />
        </button>
      ))}
    </nav>
  );
}
