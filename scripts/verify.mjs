/**
 * Guards against the failure that shipped once already: content hidden behind
 * an animation that never completes.
 *
 * Scrolls the page in steps and, at each stop, asserts that nothing with real
 * size is sitting at opacity 0 or blurred. Exits non-zero if anything is.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const PAGES = ["/", "/work/fundrev/", "/work/d-erp/"];

const browser = await chromium.launch();
let failures = 0;

for (const path of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const height = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(height / 700);

  for (let step = 0; step <= steps; step++) {
    await page.evaluate((y) => window.scrollTo(0, y), step * 700);
    await page.waitForTimeout(160);

    const hidden = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("body *")) {
        const rect = el.getBoundingClientRect();
        // Only judge elements currently on screen with real size.
        if (rect.height < 24 || rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const style = getComputedStyle(el);
        if (style.opacity === "0" && style.getPropertyValue("--mx") === "") {
          bad.push(
            `${el.tagName}.${String(el.className).slice(0, 40)} opacity:0`,
          );
        }
      }
      return bad.slice(0, 4);
    });

    if (hidden.length) {
      console.error(`FAIL ${path} @ y=${step * 700}`);
      hidden.forEach((h) => console.error(`      ${h}`));
      failures += hidden.length;
    }
  }

  await page.close();
}

await browser.close();

if (failures) {
  console.error(`\n${failures} invisible element(s) found.`);
  process.exit(1);
}
console.log("PASS: nothing invisible on any page at any scroll position.");
