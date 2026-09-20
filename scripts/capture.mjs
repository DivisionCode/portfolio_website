/**
 * Captures a screenshot of each venture's live site into public/media/site/.
 *
 * These are Rohit's own products, so they are his to show. Re-run it whenever
 * one of the sites changes; the images are committed so the build never
 * depends on those sites being up.
 *
 *   node scripts/capture.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const SITES = [
  { slug: "fundrev", url: "https://fundrev.ai/" },
  { slug: "tunegram", url: "https://tunegramlive.in/" },
  { slug: "arthmala", url: "https://arthmala.vercel.app/" },
];

const OUT = "public/media/site";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const site of SITES) {
  const page = await browser.newPage({
    // 16:10 at 2x, so the shot stays sharp when it is shown at half width.
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  try {
    await page.goto(site.url, { waitUntil: "load", timeout: 45000 });
    // Let fonts settle and dismiss anything that animates in.
    await page.waitForTimeout(3500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    await page.screenshot({ path: `${OUT}/${site.slug}.jpg`, quality: 82, type: "jpeg" });
    console.log(`${site.slug.padEnd(10)} captured from ${site.url}`);
  } catch (error) {
    console.error(`${site.slug.padEnd(10)} FAILED  ${String(error).split("\n")[0]}`);
  }

  await page.close();
}

await browser.close();
