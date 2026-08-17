"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { NAV_ITEMS } from "@/lib/nav";
import s from "./Header.module.css";

/**
 * Width below which the inline nav collapses into the menu button. Every
 * designed frame (768, 1440, 1920) carries the inline nav, so this only
 * covers widths narrower than any of them.
 */
const NAV_BREAKPOINT = 768;

/**
 * The indicator's two edges are sprung separately (vscodetodo_1.md, todo 7).
 * The edge facing the direction of travel gets the stiff spring and the one
 * behind it the slack one, so the rule stretches on its way across and pulls
 * itself back to width once the trailing edge catches up — the stretch falls
 * out of the physics rather than being a scripted two-step. Both are slightly
 * under-damped, which is where the small settle-in bounce comes from.
 *
 * Mass is 1, so critical damping is 2·√k: 53 for the lead pair and 39 for the
 * trail pair. Sitting under those gives damping ratios of ~0.72 and ~0.87 —
 * the leading edge is the one allowed to visibly overshoot. Tuned against the
 * real nav geometry: every hop stretches to about a quarter of the distance
 * it covers and settles in 0.40s (Home ↔ Artwork) to 0.43s (Home ↔ Contact),
 * so the longer hops do take slightly longer, as todo 7 asks.
 */
const LEAD = { k: 700, c: 38 };
const TRAIL = { k: 380, c: 34 };

/** Integration sub-step. Fixed, so the spring is frame-rate independent. */
const STEP = 1 / 120;

/**
 * Shared header for all four pages.
 *
 * Home is deliberately the odd one out: its header scrolls away with the page
 * and sits transparent on top of the hero photo, while Artwork / Resume /
 * Contact pin theirs to the top over an opaque band. That exception is from
 * the design, not an oversight (see PROJECT_CONTEXT.md).
 */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isArtwork = pathname.startsWith("/artwork");

  const navRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [open, setOpen] = useState(false);

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );

  /**
   * Live state of the indicator: `a`/`b` are its left and right edges in nav
   * coordinates, `ta`/`tb` where they are heading, `va`/`vb` their velocities.
   * It is a ref, not state, because the spring writes a transform every frame
   * and React has no business re-rendering for that.
   */
  const anim = useRef({
    a: 0,
    b: 0,
    va: 0,
    vb: 0,
    ta: 0,
    tb: 0,
    base: 1,
    rightward: true,
    placed: false,
    raf: 0,
    last: 0,
  });

  const paint = useCallback(() => {
    const el = ruleRef.current;
    const st = anim.current;
    if (!el) return;
    // The rule keeps its designed width in layout and is stretched with
    // scaleX, so the whole animation stays on the compositor.
    const span = Math.max(st.b - st.a, 0.5);
    el.style.transform = `translateX(${st.a}px) scaleX(${span / st.base})`;
  }, []);

  const run = useCallback(() => {
    const st = anim.current;
    if (st.raf) return;

    function tick() {
      const now = performance.now();
      let dt = (now - st.last) / 1000;
      st.last = now;
      // A backgrounded tab hands back a huge delta; clamp so it resumes
      // rather than flinging the rule off the bar.
      if (dt > 0.05) dt = 0.05;

      const left = st.rightward ? TRAIL : LEAD;
      const right = st.rightward ? LEAD : TRAIL;

      for (let rest = dt; rest > 0; rest -= STEP) {
        const h = Math.min(rest, STEP);
        st.va += (-left.k * (st.a - st.ta) - left.c * st.va) * h;
        st.a += st.va * h;
        st.vb += (-right.k * (st.b - st.tb) - right.c * st.vb) * h;
        st.b += st.vb * h;
      }

      const settled =
        Math.abs(st.a - st.ta) < 0.1 &&
        Math.abs(st.b - st.tb) < 0.1 &&
        Math.abs(st.va) < 1 &&
        Math.abs(st.vb) < 1;

      if (settled) {
        st.a = st.ta;
        st.b = st.tb;
        st.va = 0;
        st.vb = 0;
        st.raf = 0;
        paint();
        return;
      }

      paint();
      st.raf = requestAnimationFrame(tick);
    }

    st.last = performance.now();
    st.raf = requestAnimationFrame(tick);
  }, [paint]);

  // The indicator is measured off the live DOM rather than hard-coded to the
  // Figma x-positions, so it stays correct once the nav goes fluid.
  const place = useCallback(
    (animate: boolean) => {
      const el = ruleRef.current;
      const link = linkRefs.current[activeIndex];
      if (!navRef.current || !el || !link || window.innerWidth < NAV_BREAKPOINT) return;

      const st = anim.current;
      // Computed width is the layout width, unaffected by the transform we
      // put on the element, so this survives re-measuring mid-animation.
      st.base = parseFloat(getComputedStyle(el).width) || 1;
      st.ta = link.offsetLeft;
      st.tb = st.ta + st.base;
      st.rightward = st.ta >= st.a;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!animate || !st.placed || reduced) {
        cancelAnimationFrame(st.raf);
        st.raf = 0;
        st.a = st.ta;
        st.b = st.tb;
        st.va = 0;
        st.vb = 0;
        st.placed = true;
        paint();
        return;
      }

      run();
    },
    [activeIndex, paint, run],
  );

  const placeRef = useRef(place);

  useLayoutEffect(() => {
    // First paint and every layout change snap; only a page change springs.
    placeRef.current = place;
    place(true);
  }, [place]);

  useEffect(() => {
    const st = anim.current;
    const snap = () => placeRef.current(false);
    // Biryani loads asynchronously and shifts the nav widths when it lands.
    // Registered once: re-running it on every page change would land a snap
    // on top of the spring that just started.
    document.fonts?.ready.then(snap);
    window.addEventListener("resize", snap);
    return () => {
      window.removeEventListener("resize", snap);
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`${s.header} ${isHome ? s.floating : s.pinned} ${isArtwork ? s.deep : ""}`}
      data-open={open}
    >
      <div className={s.bar}>
        <Link href="/" className={s.logo} aria-label="Chai Gai Foon — home">
          <Image src="/assets/brand/logo.png" alt="" width={44} height={50} priority />
        </Link>

        <button
          type="button"
          className={s.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="srOnly">{open ? "Close menu" : "Open menu"}</span>
          <span className={s.burger} aria-hidden />
        </button>

        <nav id="site-nav" className={s.nav} ref={navRef} aria-label="Main">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={s.link}
              aria-current={i === activeIndex ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <span className={s.rule} ref={ruleRef} aria-hidden />
        </nav>
      </div>

      <button
        type="button"
        className={s.scrim}
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
