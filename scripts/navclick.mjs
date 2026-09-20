/** Clicks each nav link the way a person does, smooth scroll and all. */
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE, { waitUntil: "load" });
await p.waitForTimeout(1200);

const links = await p.$$eval("header nav a", (as) =>
  as.map((a) => ({ href: a.getAttribute("href"), label: a.textContent.trim() })));

let fails = 0;
for (const { href, label } of links) {
  const id = href.replace("/#", "");
  await p.click(`header nav a[href="${href}"]`);
  await p.waitForTimeout(1800); // let the smooth scroll finish
  const state = await p.evaluate(() => {
    const a = document.querySelector('header nav a[aria-current="true"]');
    return { current: a ? a.getAttribute("href").replace("/#", "") : "none", y: Math.round(window.scrollY) };
  });
  const ok = state.current === id;
  if (!ok) fails++;
  console.log(`${ok ? "OK  " : "FAIL"} click ${label.padEnd(13)} y=${String(state.y).padStart(5)}  highlight=${state.current}`);
}
await b.close();
if (fails) { console.error(`\n${fails} failed.`); process.exit(1); }
console.log("\nPASS: clicking the nav leaves the right item highlighted.");
