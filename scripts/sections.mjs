import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const OUT = "screens";
const IDS = ["ventures", "products", "approach", "stack", "credentials", "contact"];

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
});
await page.goto(BASE, { waitUntil: "load" });
await page.waitForTimeout(800);

for (const id of IDS) {
  const el = page.locator(`#${id}`);
  const box = await el.boundingBox();
  await el.screenshot({ path: `${OUT}/section-${id}.png` });
  console.log(`${id.padEnd(12)} ${Math.round(box.height)}px tall`);
}

await browser.close();
