# Contributing

This is Rohit Singh's personal site. It is published for reference and is not open source (see [LICENSE](LICENSE)). Bug reports are welcome. Pull requests from others are reviewed at the owner's discretion. By opening one, you confirm that the work is your own and agree that it may be used in this repository under the terms of the LICENSE.

To report a security issue, follow [SECURITY.md](SECURITY.md). Do not open an issue for it.

## Contents

- [Set-up](#set-up)
- [Branches](#branches)
- [Commits](#commits)
- [Pull requests](#pull-requests)
- [House style](#house-style)
- [Engineering conventions](#engineering-conventions)
- [Checks](#checks)
- [Releases](#releases)

## Set-up

```bash
nvm use                           # Node 22, from .nvmrc
npm ci
npx next typegen                  # route types, needed before the first typecheck
npx playwright install chromium   # only for the browser checks
npm run dev
```

Next.js 16 differs from earlier versions. Before changing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`, as `AGENTS.md` asks.

## Branches

`master` is the default branch. Netlify deploys it to production, so it must always build. Never push to it directly; every change goes through a pull request.

Name each branch with a type prefix and a short description in kebab case:

| Prefix | For | Example |
| --- | --- | --- |
| `feature/` | New sections, pages, content types or tooling | `feature/experience-section` |
| `fix/` | Bugs, broken behaviour, wrong copy | `fix/nav-highlight-lag` |
| `chore/` | Dependencies, configuration, CI, releases | `chore/release-v2.1.0` |
| `docs/` | README, changelog and other documentation | `docs/deployment-notes` |

## Commits

New commits follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Commits before version 2.0.0 predate the convention and are left as they are.

```text
<type>(<optional scope>): <summary in the imperative, lower case, no full stop>

<optional body: what changed and why>

<optional footer, for example BREAKING CHANGE: ...>
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Suggested scopes:** `content`, `home`, `work`, `ui`, `theme`, `seo`, `netlify`, `scripts`, `deps`, `ci`, `release`.
- A change that breaks existing URLs or restructures the site carries `!` after the type, or a `BREAKING CHANGE:` footer.

Examples:

```text
feat(home): add the experience section
fix(netlify): allow the bare analytics.google.com host in connect-src
docs: document the release process
chore(release): v2.1.0
```

## Pull requests

1. Branch from an up-to-date `master`.
2. Keep each pull request to one concern.
3. Run the [checks](#checks) locally.
4. For user-visible changes, add an entry under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md).
5. Open the pull request into `master` and fill in the template. Include before and after screenshots for visual changes.
6. CI must pass: lint, typecheck, house style and build.
7. The code owner (see [`.github/CODEOWNERS`](.github/CODEOWNERS)) reviews and merges it. Prefer squash merging, with the pull request title written as a Conventional Commit.

## House style

These rules apply to site copy, code comments and documentation alike.

- **No dash-like characters other than the ASCII hyphen-minus (`-`).** That rules out the em dash, en dash, figure dash, horizontal bar, minus sign, Unicode hyphen, non-breaking hyphen and soft hyphen. Use a colon, a full stop or a comma instead. In site copy, a middle dot (`·`) separates title segments. A decorative 1px rule sitting next to text also counts, because it renders as an em dash.
  - `npm run dashes` enforces this for `.ts`, `.tsx`, `.css`, `.md`, `.json`, `.toml` and `.html` files. It skips dot-prefixed paths such as `.github/`, so follow the rule there by hand.
  - `AGENTS.md` and `CLAUDE.md` are exempt, because `next dev` writes their managed block.
- **British English:** optimise, colour, organise, licence (the noun), behaviour.
- **Plain, declarative prose.** No emoji, no marketing superlatives.
- **Never invent anything.** Every feature, URL, number, role and date must be true and checkable. Relationships must be described exactly: a business inside Sushraj Ventures is not the same as an engagement outside it.
- **Technologies only.** The stack and architecture content names technologies. It never names internal services or hostnames, or gives architecture detail from private repositories.
- **All copy lives in `lib/content/`.** Components do not hard-code copy.

## Engineering conventions

Each of these exists because breaking it has already caused a bug. The browser checks in `scripts/` guard most of them.

- **Animation never gates content.** Scroll reveals are declared only inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Anywhere else, the content is simply visible. `npm run verify` fails if anything settled on screen is faded or blurred.
- **No `overflow-hidden` on an ancestor of a `[data-reveal]` element.** It creates a scroll container, and the `view()` timeline binds to that instead of the viewport, leaving the reveal half finished. Use `overflow-clip`.
- **`animation-range` uses `cover 0%`, not `cover 0`.** A bare zero is invalid, and the whole declaration is dropped.
- **Sections pad the top only** (`pt-[var(--section-y)]`). Padding both sides doubles every gap. Contact keeps a bottom padding because the footer follows it. `npm run gaps` prints the real distances.
- **One scroll offset.** Each section carries its own `scroll-mt` (`scroll-mt-24` on most), and `<html>` sets no `scroll-padding-top`. Setting both adds them together and puts the nav highlight one section behind. `npm run navspy` and `npm run navclick` cover scrolling and clicking.
- **Keep `navLinks` in page order,** with each `href` pointing at a section `id`.
- **SVG draws in `currentColor`,** never a hard-coded colour, or it vanishes in the other theme.
- **Theme tokens** live on `:root` and flip under `:root[data-theme="light"]`. `@theme inline` in `app/globals.css` points Tailwind's utilities at them.
- **Monochrome, one typeface.** There is no accent hue; the green live dot is the only colour. Schibsted Grotesk is the only face, with no monospace. Hierarchy comes from size, weight, case and tracking, using the `label-mono` utility for uppercase eyebrows and `meta` for small metadata.
- **Full-screen fixed layers stay simple.** The grain overlay is a pre-rasterised PNG tile, with no `contain` and no `mix-blend-mode`, both of which halved the scroll frame rate.
- **Pointer handlers touch one element.** The spotlight updates only the card under the cursor. `npm run perf` reports the cost.
- **Server components by default.** Add `"use client"` only where the page is genuinely interactive.
- **Static export limits.** Nothing may need a server at request time. Images use `next/image` with explicit sizes, and optimisation stays off.

## Checks

CI runs the static checks on every pull request and on every push to `master`. Run them locally first:

```bash
npm run lint
npm run typecheck
npm run dashes
npm run build
```

With the site running (`npm run dev`, or `out/` behind a static server), run the browser checks relevant to the change: `verify`, `smoke`, `navspy`, `navclick`, `form`, `perf`, `gaps` and `shoot`. After a deploy that changes `netlify.toml` or analytics, run `npm run ga` against the live site. The [README](README.md#scripts) describes each script.

## Releases

Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (see [README](README.md#versioning-and-releases) for what counts as major, minor and patch).

1. Create a `chore/release-vX.Y.Z` branch from `master`.
2. Bump the version in `package.json` and `package-lock.json`, without creating a tag:

   ```bash
   npm version X.Y.Z --no-git-tag-version
   ```

3. In [CHANGELOG.md](CHANGELOG.md), move the `[Unreleased]` entries under a new `## [X.Y.Z] - YYYY-MM-DD` heading, and leave `## [Unreleased]` empty. Update the link references at the bottom: point `[Unreleased]` at `vX.Y.Z...HEAD`, and add `[X.Y.Z]` comparing the previous tag with `vX.Y.Z`.
4. Commit as `chore(release): vX.Y.Z`, open a pull request into `master`, and merge it once CI passes.
5. Tag the merge commit on `master` and push the tag:

   ```bash
   git checkout master && git pull
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   ```

6. Publish a GitHub Release for the tag, using that version's changelog section as the notes:

   ```bash
   gh release create vX.Y.Z --title "vX.Y.Z" --notes-file <file with the changelog section>
   ```
