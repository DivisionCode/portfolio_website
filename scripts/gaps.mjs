/** Measures the vertical gap between the last content in one section and the
    first content in the next, which is what actually reads as blank space. */
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE, { waitUntil: "load" });
await p.waitForTimeout(1200);

const rows = await p.evaluate(() => {
  const sections = [...document.querySelectorAll("main section, main > div > section")];
  const out = [];
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const r = s.getBoundingClientRect();
    const top = r.top + window.scrollY;
    const bottom = r.bottom + window.scrollY;
    // Where the ink actually starts and stops inside this section.
    let inkTop = bottom;
    let inkBottom = top;
    for (const el of s.querySelectorAll("*")) {
      const er = el.getBoundingClientRect();
      if (er.height === 0 || er.width === 0) continue;
      const hasInk = el.textContent?.trim() || el.tagName === "IMG" || el.tagName === "svg";
      if (!hasInk) continue;
      inkTop = Math.min(inkTop, er.top + window.scrollY);
      inkBottom = Math.max(inkBottom, er.bottom + window.scrollY);
    }
    out.push({ id: s.id || "(hero)", inkTop: Math.round(inkTop), inkBottom: Math.round(inkBottom) });
  }
  return out;
});

let prev = null;
for (const r of rows) {
  if (prev) {
    // gap = from where the previous section's ink stopped to this one's top edge of ink
    console.log(`${prev.id.padEnd(14)} -> ${r.id.padEnd(14)} gap ${String(r.inkTop - prev.inkBottom).padStart(4)}px`);
  }
  prev = r;
}
console.log("\ntotal page height", await p.evaluate(() => document.body.scrollHeight) + "px");
await b.close();
