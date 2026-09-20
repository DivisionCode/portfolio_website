/**
 * Measures what the page actually costs: long tasks on load, frame times
 * while scrolling, and the cost of a single pointer move across the cards.
 *
 * Reports the worst frames rather than the average, because jank is a tail
 * problem: a 60ms frame every so often is what reads as unresponsive, and an
 * average hides it completely.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Collect long tasks from the moment the document exists.
await page.addInitScript(() => {
  window.__long = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__long.push(Math.round(entry.duration));
    }
  }).observe({ entryTypes: ["longtask"] });
});

const start = Date.now();
await page.goto(BASE, { waitUntil: "load" });
const loadMs = Date.now() - start;
await page.waitForTimeout(2500);

const longTasks = await page.evaluate(() => window.__long);

// ── Frame times during a scripted scroll ────────────────────────────────────
const scroll = await page.evaluate(async () => {
  const frames = [];
  let last = performance.now();
  let running = true;

  const tick = (now) => {
    frames.push(now - last);
    last = now;
    if (running) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const total = document.body.scrollHeight - window.innerHeight;
  const steps = 90;
  for (let i = 0; i <= steps; i++) {
    window.scrollTo(0, (total * i) / steps);
    await new Promise((r) => requestAnimationFrame(r));
  }
  running = false;
  await new Promise((r) => setTimeout(r, 100));

  frames.sort((a, b) => a - b);
  const at = (q) => Math.round(frames[Math.floor(frames.length * q)] ?? 0);
  return {
    frames: frames.length,
    median: at(0.5),
    p90: at(0.9),
    p99: at(0.99),
    worst: Math.round(frames[frames.length - 1] ?? 0),
    over50ms: frames.filter((f) => f > 50).length,
  };
});

// ── Cost of one pointer move across the card grids ──────────────────────────
await page.evaluate(() => window.scrollTo(0, 1400));
await page.waitForTimeout(400);

const pointer = await page.evaluate(async () => {
  const target = document.querySelector("[data-spotlight]");
  if (!target) return null;
  const rect = target.getBoundingClientRect();

  /*
    Time the handler only. Waiting for a frame inside the window measures the
    frame, not the work, and hides whatever the handler actually costs.
  */
  const samples = [];
  for (let i = 0; i < 60; i++) {
    const event = new PointerEvent("pointermove", {
      bubbles: true,
      pointerType: "mouse",
      clientX: rect.left + 10 + (i % 50) * 4,
      clientY: rect.top + 20,
    });
    const t0 = performance.now();
    target.dispatchEvent(event);
    samples.push(performance.now() - t0);
    // Let the queued rAF flush between samples so work is not batched away.
    if (i % 10 === 9) await new Promise((r) => requestAnimationFrame(r));
  }
  samples.sort((a, b) => a - b);
  return {
    spotlightTargets: document.querySelectorAll("[data-spotlight]").length,
    median: Number(samples[Math.floor(samples.length / 2)].toFixed(3)),
    worst: Number(samples[samples.length - 1].toFixed(3)),
    total: Number(samples.reduce((a, b) => a + b, 0).toFixed(2)),
  };
});

// ── DOM weight ──────────────────────────────────────────────────────────────
const weight = await page.evaluate(() => ({
  nodes: document.querySelectorAll("*").length,
  animated: [...document.querySelectorAll("*")].filter((el) => {
    const name = getComputedStyle(el).animationName;
    return name && name !== "none";
  }).length,
  reveals: document.querySelectorAll("[data-reveal]").length,
}));

console.log(`load                 ${loadMs}ms`);
console.log(`long tasks on load   ${longTasks.length}${longTasks.length ? "  " + longTasks.join(", ") + "ms" : ""}`);
console.log("");
console.log(`scroll frames        ${scroll.frames}`);
console.log(`  median             ${scroll.median}ms`);
console.log(`  p90                ${scroll.p90}ms`);
console.log(`  p99                ${scroll.p99}ms`);
console.log(`  worst              ${scroll.worst}ms`);
console.log(`  frames over 50ms   ${scroll.over50ms}`);
console.log("");
if (pointer) {
  console.log(`spotlight targets    ${pointer.spotlightTargets}`);
  console.log(`pointermove median   ${pointer.median}ms`);
  console.log(`pointermove worst    ${pointer.worst}ms`);
  console.log(`60 moves total       ${pointer.total}ms`);
}
console.log("");
console.log(`DOM nodes            ${weight.nodes}`);
console.log(`always-animating     ${weight.animated}`);
console.log(`scroll reveals       ${weight.reveals}`);

await browser.close();
