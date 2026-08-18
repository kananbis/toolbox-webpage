# AdSense Content Quality Audit

Last reviewed: 2026-08-18

## Scope

The audit covers the Korean and English home pages, tool index, ten category pages, tool pages, About, Contact, Privacy, Terms, sitemap, robots, canonical links, hreflang links, and shared tool content.

## Page Classes

The site currently has 74 distinct tool functions in each language.

| Class | Unique tools | Review decision |
| --- | ---: | --- |
| A - core tools | 19 | Keep indexed and add task-specific guidance, limits, and FAQ where it helps users make a decision. |
| B - focused utilities | 32 | Keep indexed because each page has a distinct user task; improve descriptions and category context rather than create duplicate guides. |
| C - small utilities | 23 | Keep indexed for now because every URL has its own usable interface and no equivalent replacement page. Avoid generic FAQ or keyword-only expansion. |

No page was noindexed in this review. There is no safe one-to-one replacement for the existing utility URLs, and no redirect or sitemap removal is required.

## Core Pages Strengthened

- Image compressor, resizer, format converter, cropper, rotate and flip, watermark, metadata editor, and color picker
- PDF merger
- Audio converter, cutter, compressor, merger, and ringtone maker
- Character counter, date calculator, loan interest calculator, percent calculator, and unit converter

The core pages use feature-specific sections such as selection criteria, result interpretation, practical limits, and distinct FAQs. They do not use the generic privacy/mobile/reliability FAQ block.

## Category Pages

Every category now includes a decision guide appropriate to its subject. The image, PDF, audio, and converter categories include format or workflow guidance. Text, calculator, generator, developer, electronics, and fun categories include task-selection and limitation guidance.

## Trust and Operations

- `/ko/updates/` and `/en/updates/` record deployed feature changes from 2026-08-18.
- The home page links to recent changes and explains browser-first processing, support limits, and preview-first workflows.
- The About page explains development, validation, privacy, external runtime loading, and the update process.
- Footer links include About, Contact, Privacy, Terms, and Updates.

## Repetition Reduction

- Bookmark prompts are no longer rendered on every tool or category page.
- The generic site-wide FAQ has been removed from short utilities. FAQ schema is emitted only where a page displays tool-specific FAQs.
- Browser-local processing remains a short operational note near file tools rather than a repeated FAQ answer.

## Second-Pass Precision Improvements

- The home-page bookmark help is now a compact, closed-by-default disclosure instead of a persistent multi-line prompt.
- The all-tools pages include a task-first selector that links directly to the relevant image, PDF, audio, and metadata tools.
- Eleven core pages now include concise decision tables or fixed mathematical examples: six image tools, five calculation/text tools.
- Recent update cards on the home page link directly to the affected tools as well as to the full update log.
- The About page now states the service motivation and clarifies that optional external runtimes do not receive selected files or metadata.
- No C-class tool was noindexed, deleted, merged, or redirected in this pass.

## Remaining Risks

- Some small calculators and generators intentionally have compact content because their user task is narrow.
- Search performance and AdSense assessment also depend on crawl history, visitor engagement, policy compliance, and content discovery outside this repository.
- External CDN availability can affect optional runtime components for some file formats.

## Validation

Run:

```powershell
npm run build
node scripts/adsense-audit.mjs
```

The audit script checks duplicate titles/descriptions, duplicate rendered introductions and FAQ blocks, canonical URLs, hreflang coverage, robots directives, internal links, bookmark-prompt repetition, and page classification counts.
