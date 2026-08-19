/**
 * What each page actually downloads, per device.
 *
 * This is the check the four-breakpoint sweep (vscodetodo_1.md, todo 18) did
 * not have, and its absence is why a `sizes` bug lived through it: every test
 * that sweep ran asks "is this correct?", and a wrong `sizes` renders a
 * pixel-perfect page. It is only wrong on the wire. The sweep's one look at
 * image URLs normalised `_next/image?url=…&w=1920` back to the source path to
 * check for 404s, which throws away the `w=` that is the whole bug.
 *
 * So this asks the other question: for a given viewport and device pixel
 * ratio, which srcset candidate does the browser choose, and how many bytes
 * is that? It works off the deployed HTML, so it tests what visitors get
 * rather than what the source implies.
 *
 * Why not drive a real browser: Chrome prefers an already-cached larger
 * candidate over the one `sizes` asks for, so a second run measures the first
 * run's cache. The selection algorithm is specified and deterministic —
 * applying it directly is the more reliable path, and the bytes are real
 * because the chosen variants are actually fetched.
 *
 *   node scripts/image-weight.mjs [origin]
 *
 * Defaults to the production site. Pass http://localhost:3000 to check a
 * build before it ships.
 */

import { get as httpsGet } from "node:https";
import { get as httpGet } from "node:http";

const ORIGIN = process.argv[2] ?? "https://chaigaifoon.vercel.app";
const ACCEPT = "image/avif,image/webp,image/apng,*/*";

/* Viewport is CSS px, dpr multiplies it into the device px srcset picks on.
   Both matter: the same phone width at 2x and 3x lands on different rungs. */
const DEVICES = [
  { name: "Galaxy A54 (mid-range)", vw: 360, dpr: 2 },
  { name: "iPhone SE 2022", vw: 375, dpr: 2 },
  { name: "Galaxy S23", vw: 360, dpr: 3 },
  { name: "iPhone 15", vw: 393, dpr: 3 },
  { name: "Pixel 8", vw: 412, dpr: 2.625 },
  { name: "iPhone 15 Pro Max", vw: 430, dpr: 3 },
  { name: "iPad mini", vw: 744, dpr: 2 },
  { name: 'iPad Pro 11"', vw: 834, dpr: 2 },
  { name: "Laptop 1280", vw: 1280, dpr: 1 },
  { name: "Laptop 1536 (Win 125%)", vw: 1536, dpr: 1.25 },
  { name: "Desktop 1920", vw: 1920, dpr: 1 },
];

const PAGES = ["/", "/artwork", "/resume", "/contact", "/artwork/character-model"];

const dec = (s) => s.replace(/&amp;/g, "&");
const kb = (n) => (n / 1024).toFixed(0);

/** First clause of a `sizes` list whose media condition matches, in CSS px. */
function resolveSizes(sizes, vw) {
  for (const part of sizes.split(",").map((s) => s.trim())) {
    const [, cond, value] = /^(?:\((.*?)\)\s+)?(.+)$/.exec(part);
    if (cond) {
      const max = /max-width:\s*([\d.]+)px/.exec(cond);
      const min = /min-width:\s*([\d.]+)px/.exec(cond);
      if (max && vw > parseFloat(max[1])) continue;
      if (min && vw < parseFloat(min[1])) continue;
    }
    const asVw = /^([\d.]+)vw$/.exec(value);
    const asPx = /^([\d.]+)px$/.exec(value);
    if (asVw) return (parseFloat(asVw[1]) / 100) * vw;
    if (asPx) return parseFloat(asPx[1]);
    return null;
  }
  return null;
}

/** The candidate a browser picks: smallest whose width covers css px * dpr. */
function chooseCandidate(srcset, cssPx, dpr) {
  const candidates = srcset
    .split(",")
    .map((s) => s.trim().split(/\s+/))
    .filter(([, d]) => /^\d+w$/.test(d))
    .map(([url, d]) => ({ url, w: parseInt(d) }))
    .sort((a, b) => a.w - b.w);
  if (!candidates.length) return null;
  return candidates.find((c) => c.w >= cssPx * dpr) ?? candidates.at(-1);
}

/**
 * Bytes on the wire.
 *
 * Not `fetch`: undici decompresses transparently and drops `content-length`
 * with it, so `arrayBuffer().byteLength` is the decompressed size — which for
 * the JS bundle is three times what is actually sent. A raw request hands the
 * Brotli body over untouched.
 */
function wireBytes(url) {
  return new Promise((resolve, reject) => {
    const target = new URL(url, ORIGIN);
    const lib = target.protocol === "https:" ? httpsGet : httpGet;
    lib(target, { headers: { "Accept-Encoding": "br, gzip" } }, (res) => {
      let n = 0;
      res.on("data", (c) => (n += c.length));
      res.on("end", () => resolve(n));
    }).on("error", reject);
  });
}

const seen = new Map();
function fetchBytes(url) {
  if (!seen.has(url)) {
    seen.set(
      url,
      fetch(ORIGIN + url, { headers: { Accept: ACCEPT } })
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`${r.status} ${url}`))))
        .then((b) => b.byteLength),
    );
  }
  return seen.get(url);
}

/** Images on a page, with enough context to pick a variant for any device. */
async function readPage(path) {
  const html = await (await fetch(ORIGIN + path)).text();
  const images = [];
  for (const tag of html.match(/<img[^>]*>/g) ?? []) {
    const srcset = /srcset="([^"]*)"/i.exec(tag);
    const sizes = /sizes="([^"]*)"/i.exec(tag);
    if (!srcset || !sizes) continue;
    if (!/\d+w(,|$|\s)/.test(dec(srcset[1]))) continue; // 1x/2x sets carry no width
    images.push({
      srcset: dec(srcset[1]),
      sizes: dec(sizes[1]),
      eager: !/loading="lazy"/.test(tag),
    });
  }

  /* Everything that is not an image, and does not vary by device: the markup
     plus the scripts, stylesheets and fonts, as served (Brotli where it
     applies; woff2 is already compressed). */
  const assets = new Set([
    ...(html.match(/\/_next\/static\/[^"]*?\.(?:js|css)/g) ?? []),
    ...(html.match(/\/_next\/static\/[^"]*?\.woff2/g) ?? []),
  ]);
  let fixed = await wireBytes(path);
  for (const a of assets) fixed += await wireBytes(a);
  return { path, images, fixed, assetCount: assets.size };
}

async function weigh(page, device) {
  let onArrival = 0;
  let whole = 0;
  for (const img of page.images) {
    const css = resolveSizes(img.sizes, device.vw);
    if (css == null) continue;
    const pick = chooseCandidate(img.srcset, css, device.dpr);
    if (!pick) continue;
    const bytes = await fetchBytes(pick.url);
    whole += bytes;
    if (img.eager) onArrival += bytes;
  }
  return { onArrival, whole };
}

const pages = [];
for (const p of PAGES) pages.push(await readPage(p));

console.log(`\nimage weight by device — ${ORIGIN}\n`);
console.log("  'on arrival' is the images fetched before any scrolling;");
console.log("  'whole page' adds every lazy one, i.e. scrolling to the end.");
console.log("  Neither includes the fixed cost, listed once at the bottom.\n");

for (const page of pages) {
  const lazy = page.images.filter((i) => !i.eager).length;
  console.log(`${page.path}   (${page.images.length} images, ${lazy} lazy)`);
  console.log(`  ${"device".padEnd(24)} ${"viewport".padEnd(12)} ${"on arrival".padStart(12)} ${"whole page".padStart(12)}`);
  for (const d of DEVICES) {
    const { onArrival, whole } = await weigh(page, d);
    console.log(
      `  ${d.name.padEnd(24)} ${`${d.vw}px @${d.dpr}x`.padEnd(12)} ` +
        `${(kb(onArrival) + " KB").padStart(12)} ${(kb(whole) + " KB").padStart(12)}`,
    );
  }
  console.log();
}

console.log("fixed cost per page (markup, JS, CSS, fonts — same on every device)");
for (const page of pages) {
  console.log(`  ${page.path.padEnd(30)} ${(kb(page.fixed) + " KB").padStart(9)}   (${page.assetCount} files)`);
}
console.log();
