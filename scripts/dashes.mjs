/**
 * House style: no em dash, and nothing that reads like one.
 *
 * Checks two things, because the last slip was neither an em dash in a string
 * nor visible to a grep:
 *   1. every dash-like character in the source and in the built HTML
 *   2. decorative elements styled as a short horizontal rule next to text,
 *      which render as an em dash even though no dash exists anywhere
 */
import { readFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";

const DASHES = {
  "‐": "HYPHEN",
  "‑": "NON-BREAKING HYPHEN",
  "‒": "FIGURE DASH",
  "–": "EN DASH",
  "—": "EM DASH",
  "―": "HORIZONTAL BAR",
  "−": "MINUS SIGN",
  "­": "SOFT HYPHEN",
};

const SOURCE_EXT = new Set([".ts", ".tsx", ".css", ".md", ".json", ".toml"]);
const SKIP_DIR = new Set(["node_modules", ".next", "out", ".git", "screens"]);

/*
  Written and rewritten by `next dev` itself, so editing them is futile and
  they are not site copy either way.
*/
const SKIP_FILE = new Set(["AGENTS.md", "CLAUDE.md"]);

/** A 1px-tall span a few units wide, sitting inline: that is an em dash. */
const FAUX_DASH = /className="[^"]*\bh-px\b[^"]*\bw-(?:2|3|4|5|6)\b[^"]*"/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".gitignore") continue;
    if (SKIP_DIR.has(entry.name)) continue;
    if (entry.isFile() && SKIP_FILE.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const problems = [];

for await (const path of walk(".")) {
  const isHtml = extname(path) === ".html";
  if (!SOURCE_EXT.has(extname(path)) && !isHtml) continue;

  const text = await readFile(path, "utf8");

  text.split("\n").forEach((line, i) => {
    for (const [char, name] of Object.entries(DASHES)) {
      if (line.includes(char)) {
        problems.push(`${path}:${i + 1}  ${name}  ${line.trim().slice(0, 80)}`);
      }
    }
    for (const match of line.matchAll(FAUX_DASH)) {
      problems.push(
        `${path}:${i + 1}  RULE THAT READS AS AN EM DASH  ${match[0].slice(0, 80)}`,
      );
    }
  });
}

if (problems.length) {
  console.error("House style: no em dashes, and nothing shaped like one.\n");
  problems.forEach((p) => console.error("  " + p));
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}

console.log("PASS: no dash characters, no rules masquerading as one.");
