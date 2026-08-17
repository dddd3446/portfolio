"use client";

import { useEffect, useRef, useState } from "react";

import { NAV_ITEMS } from "@/lib/nav";
import s from "./page.module.css";

/**
 * Dev-only device preview. Renders the real site in a same-origin iframe at a
 * chosen viewport width, so the responsive breakpoints can be checked without
 * DevTools or resizing the window. Safe to delete — nothing links to it.
 */
const DEVICES = [
  { label: "iPhone SE", width: 375, height: 667 },
  { label: "iPhone 15", width: 393, height: 852 },
  { label: "Phone L", width: 430, height: 932 },
  { label: "Tablet", width: 768, height: 1024 },
  { label: "iPad Air", width: 834, height: 1112 },
  { label: "Laptop", width: 1024, height: 720 },
  { label: "Laptop L", width: 1280, height: 800 },
  { label: "Desktop", width: 1440, height: 900 },
];

export default function PreviewPage() {
  const [device, setDevice] = useState(DEVICES[1]);
  const [route, setRoute] = useState("/");
  const [fit, setFit] = useState(true);
  const [scale, setScale] = useState(1);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const update = () => {
      const { width, height } = area.getBoundingClientRect();
      const next = Math.min(1, (width - 32) / device.width, (height - 32) / device.height);
      setScale(fit ? Math.max(next, 0.2) : 1);
    };
    const ro = new ResizeObserver(update);
    ro.observe(area);
    return () => ro.disconnect();
  }, [device, fit]);

  return (
    <div className={s.wrap}>
      <div className={s.bar}>
        <div className={s.group}>
          {DEVICES.map((d) => (
            <button
              key={d.label}
              type="button"
              className={s.chip}
              data-on={d.label === device.label}
              onClick={() => setDevice(d)}
            >
              {d.label} <small>{d.width}</small>
            </button>
          ))}
        </div>

        <div className={s.group}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              className={s.chip}
              data-on={item.href === route}
              onClick={() => setRoute(item.href)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className={s.chip} data-on={fit} onClick={() => setFit((v) => !v)}>
            Fit {Math.round(scale * 100)}%
          </button>
        </div>
      </div>

      <div className={s.area} ref={areaRef}>
        <div
          className={s.frame}
          style={{
            width: device.width,
            height: device.height,
            transform: `scale(${scale})`,
          }}
        >
          {/* key forces a fresh load when the width changes, so media queries
              are evaluated from scratch rather than mid-resize. */}
          <iframe
            key={`${device.label}-${route}`}
            src={route}
            title={`${route} at ${device.width}px`}
          />
        </div>
      </div>
    </div>
  );
}
