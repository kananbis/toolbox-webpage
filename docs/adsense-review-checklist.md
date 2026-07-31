# AdSense Review Checklist

This checklist is for preparing `https://mfwtools.com` for Google AdSense review after a low-value-content rejection.

## Content Quality

- [x] Empty ad placeholders are removed when AdSense is disabled.
- [x] Tool pages no longer render a top ad slot before the main content.
- [x] The all-tools page does not render an ad slot before category content.
- [x] About page explains site purpose, browser processing, external library loading, format support, updates, and limits.
- [x] Contact page explains useful bug report details and does not show a broken contact form.
- [x] Privacy policy covers browser-side file processing, localStorage, analytics, AdSense, Cloudflare, external CDN loading, and contact handling.
- [x] Terms page covers reference-only results, professional-advice limits, file rights, copyright, browser limits, external library failure, and keeping originals.
- [x] Core tool pages have extra page-specific content sections.
- [x] Core tool FAQ is tool-specific instead of repeating only generic questions.
- [x] Audio, image, PDF, and converter category pages include selection guidance.

## Pages to Review Manually After Deployment

- [ ] `/ko/about/`
- [ ] `/ko/contact/`
- [ ] `/ko/privacy/`
- [ ] `/ko/terms/`
- [ ] `/ko/tools/audio/`
- [ ] `/ko/tools/image/`
- [ ] `/ko/tools/pdf/`
- [ ] `/ko/tools/converter/`
- [ ] `/ko/tools/audio-cutter/`
- [ ] `/ko/tools/audio-converter/`
- [ ] `/ko/tools/image-compressor/`
- [ ] `/ko/tools/pdf-merger/`
- [ ] English equivalents for the above pages

## Technical SEO

- [x] Canonical URLs use `https://mfwtools.com` and trailing slashes.
- [x] `hreflang` includes `ko`, `en`, and `x-default`.
- [x] No duplicate titles were found in the local audit.
- [x] No duplicate descriptions were found in the local audit.
- [x] No broken internal links were found in the local audit.
- [ ] Confirm deployed sitemap contains no `www`, `localhost`, or `pages.dev` URLs.
- [ ] Confirm deployed pages return `200 OK`.
- [ ] Confirm Search Console can fetch representative tool pages.

## Advertising

- [x] AdSense-disabled builds render no ad label or empty ad box.
- [x] Category pages and policy pages have no ad slot.
- [x] Tool pages have no top ad slot.
- [x] Only enhanced core tool pages may render one bottom ad slot after AdSense is enabled.
- [ ] After approval, verify real ad placement does not push the main tool below ads.

## C-Grade Candidate Pages

These pages are not noindexed in this pass because they have distinct functions and working routes, but they should be monitored:

- `/ko/tools/age-calculator/`
- `/ko/tools/bmi-calculator/`
- `/ko/tools/uuid-generator/`
- `/ko/tools/random-number-generator/`

Review these pages after Search Console data is available. If they have no impressions and remain thin, either add specific formulas/use cases or consider temporary `noindex` and sitemap exclusion.

## Before Requesting Re-review

- [ ] Deploy latest `main`.
- [ ] Wait for Cloudflare Pages deployment to complete.
- [ ] Test homepage and at least 10 representative tool pages on mobile.
- [ ] Re-run sitemap and robots checks on production.
- [ ] Use Search Console URL inspection for several updated pages.
- [ ] Wait a few days after deployment if Search Console still shows old content.
- [ ] Request AdSense re-review only after production pages show the updated content and no empty ad placeholders.
