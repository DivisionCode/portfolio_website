import { chromium } from "playwright";
const b = await chromium.launch();
for (const theme of ["dark", "light"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await p.addInitScript((t) => { try { localStorage.setItem("theme", t); } catch {} }, theme);
  await p.goto("http://localhost:3000/", { waitUntil: "load" });
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `screens/theme-${theme}.png` });
  const applied = await p.evaluate(() => document.documentElement.getAttribute("data-theme"));
  console.log(theme, "->", applied);
  await p.close();
}
await b.close();
