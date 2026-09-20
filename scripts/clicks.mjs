/** Clicks the real interactive elements and reports what actually happens. */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "load" });
await page.waitForTimeout(600);

// What is actually on top at the point of each control?
const probe = await page.evaluate(() => {
  const results = [];
  const targets = [
    ['nav a[href="/#ventures"]', "nav: Ventures"],
    ['nav a[href="/#stack"]', "nav: Stack"],
    ['a[href="#contact"]', "hero CTA"],
    ['button[aria-label="Open command menu"]', "jump to"],
    ['a[href="/#contact"]', "header CTA"],
  ];
  for (const [selector, label] of targets) {
    const el = document.querySelector(selector);
    if (!el) {
      results.push({ label, status: "NOT FOUND" });
      continue;
    }
    const r = el.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    results.push({
      label,
      rect: `${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      topMost: top ? `${top.tagName}.${String(top.className).slice(0, 45)}` : "null",
      isSelfOrChild: el.contains(top) || el === top,
    });
  }
  return results;
});

console.log("--- hit testing ---");
for (const r of probe) console.log(JSON.stringify(r));

// Does clicking a nav link actually move the page?
console.log("\n--- nav click ---");
const before = await page.evaluate(() => window.scrollY);
try {
  await page.click('nav a[href="/#stack"]', { timeout: 4000 });
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => window.scrollY);
  console.log(`scrollY ${before} -> ${after} ${after !== before ? "OK" : "DID NOT MOVE"}`);
} catch (e) {
  console.log("click failed:", e.message.split("\n")[0]);
}

console.log("\n--- command palette ---");
try {
  await page.click('button[aria-label="Open command menu"]', { timeout: 4000 });
  await page.waitForTimeout(400);
  const open = await page.locator('[role="dialog"]').count();
  console.log(open ? "opens OK" : "DID NOT OPEN");
} catch (e) {
  console.log("click failed:", e.message.split("\n")[0]);
}

console.log("\n--- page errors ---");
console.log(errors.length ? errors.join("\n") : "(none)");

await browser.close();
