# Security policy

## Supported versions

Only the current release, deployed from `master` to [dcrohit-portfolio.netlify.app](https://dcrohit-portfolio.netlify.app), is supported. Fixes are not backported to earlier releases.

| Version | Supported |
| --- | --- |
| 2.x (current `master`) | Yes |
| 1.x (the hand-written site) | No |

## Reporting a vulnerability

Report vulnerabilities privately. **Do not open a public issue, pull request or discussion.**

Email **singh.rsingh.rohit@gmail.com** with the subject line `Security: rohit-singh-portfolio`, and include:

- what the issue is and where it is (URL, file or header),
- the steps to reproduce it, or a proof of concept,
- what an attacker could achieve with it, and
- whether you want to be credited, and under what name.

You will receive an acknowledgement. The report is then assessed, and you will be told whether it is accepted and, if it is, when a fix has been deployed. Please give reasonable time for a fix before disclosing anything publicly.

## Scope

In scope:

- this repository's source code, configuration and GitHub Actions workflow;
- the live site at `dcrohit-portfolio.netlify.app`, including the HTTP headers and Content Security Policy set in `netlify.toml`, the redirects, and the contact form's client-side behaviour.

Out of scope:

- vulnerabilities in third-party services the site uses, which should be reported to their owners: Netlify, FormSubmit, Google Analytics and GitHub;
- other websites linked from the portfolio, including the sites of the ventures it presents;
- findings that need physical access to a device, social engineering, or a compromised browser or extension;
- denial of service and volumetric testing. Do not run them against the live site.

## How the site is secured

- **No server-side code.** The site is a static export served from Netlify's CDN. There is no application server, database or user account, and no secret is stored in the repository or the build.
- **Security headers** on every path: `Strict-Transport-Security` with preload, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` and a restrictive `Permissions-Policy`.
- **Content Security Policy** limited to the site itself, Google Analytics and Google Tag Manager, and FormSubmit, with `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'` and a restricted `form-action`. Inline scripts and styles are allowed (`'unsafe-inline'`), because the exported pages depend on inline scripts. Google advertising endpoints are deliberately not allowed.
- **Contact form.** Submissions go straight from the browser to FormSubmit. A honeypot field filters simple bots.
- **Dependencies** are pinned by `package-lock.json` and installed with `npm ci` in CI.
- **CI** runs with read-only repository permissions.
