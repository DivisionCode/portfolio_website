/** Scrolls to each section and checks the nav highlights the right item. */
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE, { waitUntil: "load" });
await p.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
await p.waitForTimeout(900);

const ids = await p.$$eval("header nav a", (as) =>
  as.map((a) => a.getAttribute("href").replace("/#", "")));

let fails = 0;
for (const id of ids) {
  await p.evaluate((i) => {
    const el = document.getElementById(i);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100);
  }, id);
  await p.waitForTimeout(350);
  const current = await p.$eval("header nav", (nav) => {
    const a = nav.querySelector('a[aria-current="true"]');
    return a ? a.getAttribute("href").replace("/#", "") : "none";
  });
  const ok = current === id;
  if (!ok) fails++;
  console.log(`${ok ? "OK  " : "FAIL"} at ${id.padEnd(14)} nav shows: ${current}`);
}
await b.close();
if (fails) { console.error(`\n${fails} mismatched.`); process.exit(1); }
console.log("\nPASS: nav tracks the section you are in.");
